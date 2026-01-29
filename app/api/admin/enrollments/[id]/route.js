import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAdmin } from '@/lib/session'

// GET - Obține o înscriere
export async function GET(request, { params }) {
  try {
    await requireAdmin()
    
    const { id } = await params

    const inscriere = await prisma.inscriere.findUnique({
      where: { id }
    })

    if (!inscriere) {
      return NextResponse.json(
        { error: 'Înscriere negăsită' },
        { status: 404 }
      )
    }

    return NextResponse.json(inscriere)
  } catch (error) {
    console.error('Error fetching enrollment:', error)
    return NextResponse.json(
      { error: 'Eroare la încărcarea înscrierii' },
      { status: 500 }
    )
  }
}

// PATCH - Actualizează o înscriere (status, notesList)
export async function PATCH(request, { params }) {
  try {
    await requireAdmin()
    
    const { id } = await params
    const data = await request.json()

    // Build update object
    const updateData = {}
    
    if (data.status !== undefined) {
      updateData.status = data.status
    }
    
    if (data.notesList !== undefined) {
      updateData.notesList = data.notesList
    }

    const inscriere = await prisma.inscriere.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json(inscriere)
  } catch (error) {
    console.error('Error updating enrollment:', error)
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    return NextResponse.json(
      { error: 'Eroare la actualizarea înscrierii' },
      { status: 500 }
    )
  }
}

// DELETE - Șterge o înscriere
export async function DELETE(request, { params }) {
  try {
    await requireAdmin()
    const { id } = await params

    await prisma.inscriere.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting enrollment:', error)
    if (error.message === 'Unauthorized' || error.message === 'Forbidden') {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    return NextResponse.json({ error: 'Eroare la ștergerea înscrierii' }, { status: 500 })
  }
}
