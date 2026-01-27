import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Obține token-ul de autentificare
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  })

  // Rutele publice - nu necesită autentificare
  const publicRoutes = ['/', '/login', '/inscriere', '/gdpr', '/termeni', '/curs']
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith('/curs/')
  )
  
  // API-urile publice
  const publicApiRoutes = ['/api/auth', '/api/public', '/api/health', '/api/inscrieri', '/api/contact']
  const isPublicApi = publicApiRoutes.some(route => pathname.startsWith(route))

  // Resurse statice
  const isStaticResource = pathname.startsWith('/_next') || 
                          pathname.startsWith('/favicon') ||
                          pathname.includes('.') // fișiere cu extensie

  // Permite accesul la rutele publice și resursele statice
  if (isPublicRoute || isPublicApi || isStaticResource) {
    return NextResponse.next()
  }

  // Verifică autentificarea pentru rutele protejate
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verifică accesul la admin
  if (pathname.startsWith('/admin')) {
    if (!['ADMIN', 'MANAGER'].includes(token.role)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Verifică accesul la teacher
  if (pathname.startsWith('/teacher')) {
    if (!['ADMIN', 'MANAGER', 'TEACHER'].includes(token.role)) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Verifică accesul la API admin
  if (pathname.startsWith('/api/admin')) {
    if (!['ADMIN', 'MANAGER'].includes(token.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  // Verifică accesul la API teacher
  if (pathname.startsWith('/api/teacher')) {
    if (!['ADMIN', 'MANAGER', 'TEACHER'].includes(token.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
