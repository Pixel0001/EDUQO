import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Resurse statice - verifică PRIMUL
  const isStaticResource = pathname.startsWith('/_next') || 
                          pathname.startsWith('/favicon') ||
                          pathname.endsWith('.ico') ||
                          pathname.endsWith('.png') ||
                          pathname.endsWith('.jpg') ||
                          pathname.endsWith('.svg') ||
                          pathname.endsWith('.css') ||
                          pathname.endsWith('.js')

  if (isStaticResource) {
    return NextResponse.next()
  }

  // Rutele publice - nu necesită autentificare
  const publicRoutes = ['/', '/login', '/inscriere', '/gdpr', '/termeni']
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/curs/')
  
  // API-urile publice
  const publicApiRoutes = ['/api/auth', '/api/public', '/api/health', '/api/inscrieri', '/api/contact', '/api/cron']
  const isPublicApi = publicApiRoutes.some(route => pathname.startsWith(route))

  // Permite accesul la rutele publice
  if (isPublicRoute || isPublicApi) {
    return NextResponse.next()
  }

  // Obține token-ul de autentificare (doar pentru rutele protejate)
  let token = null
  try {
    token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    })
  } catch (error) {
    console.error('Middleware token error:', error)
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
