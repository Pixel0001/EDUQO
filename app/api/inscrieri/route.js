import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { notifyNewEnrollment } from '@/lib/telegram'
import { checkRateLimit, getClientIP } from '@/lib/rate-limit'

export async function POST(request) {
  try {
    // Rate limiting: 2 requests per minute
    const clientIP = getClientIP(request)
    const rateLimitKey = `inscrieri:${clientIP}`
    const { success, remaining, resetIn } = checkRateLimit(rateLimitKey, 2, 60000)

    if (!success) {
      return NextResponse.json(
        { error: `Prea multe cereri. Încercați din nou în ${Math.ceil(resetIn / 1000)} secunde.` },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(resetIn / 1000))
          }
        }
      )
    }

    const data = await request.json()

    const { numeParinte, numeCopil, email, telefon, clasa, cursuriSelectate, mesaj } = data

    // Validare
    if (!numeParinte || !numeCopil || !email || !telefon || !clasa || !cursuriSelectate) {
      return NextResponse.json(
        { error: 'Toate câmpurile obligatorii trebuie completate' },
        { status: 400 }
      )
    }

    // Convertește cursuri în array dacă e string
    let cursuriArray = cursuriSelectate
    if (typeof cursuriSelectate === 'string') {
      cursuriArray = [cursuriSelectate]
    } else if (!Array.isArray(cursuriSelectate)) {
      cursuriArray = []
    }

    // Obține denumirile cursurilor pentru notificare
    let cursuriNume = []
    if (cursuriArray.includes('selectam-impreuna')) {
      cursuriNume = ['Selectăm împreună']
    } else {
      // Caută cursurile în baza de date pentru a obține denumirile
      const cursuri = await prisma.course.findMany({
        where: {
          id: { in: cursuriArray }
        },
        select: { id: true, title: true }
      })
      cursuriNume = cursuriArray.map(id => {
        const curs = cursuri.find(c => c.id === id)
        return curs ? curs.title : id
      })
    }

    // Salvare în baza de date (salvăm denumirile, nu ID-urile)
    const inscriere = await prisma.inscriere.create({
      data: {
        numeParinte,
        numeCopil,
        email,
        telefon,
        clasa,
        cursuri: cursuriNume,
        mesaj: mesaj || '',
        status: 'NOU'
      }
    })

    // Trimite notificare pe Telegram
    await notifyNewEnrollment(
      numeCopil,
      numeParinte,
      telefon,
      email,
      cursuriNume.join(', '),
      mesaj
    )

    return NextResponse.json({ success: true, id: inscriere.id })
  } catch (error) {
    console.error('Eroare la înscriere:', error)
    return NextResponse.json(
      { error: 'A apărut o eroare la procesarea cererii' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    const inscrieri = await prisma.inscriere.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(inscrieri)
  } catch (error) {
    console.error('Eroare la obținerea înscrierilor:', error)
    return NextResponse.json(
      { error: 'A apărut o eroare' },
      { status: 500 }
    )
  }
}
