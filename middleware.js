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

  // Verifică doar existența sesiunii (fără decodare JWT în Edge)
  const sessionCookie =
    request.cookies.get('__Secure-next-auth.session-token') ||
    request.cookies.get('next-auth.session-token')

  if (!sessionCookie) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
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
