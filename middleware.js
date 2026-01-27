import { NextResponse } from 'next/server'

export async function middleware(request) {
  const { pathname } = request.nextUrl

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
  matcher: ['/admin/:path*', '/teacher/:path*', '/api/admin/:path*', '/api/teacher/:path*'],
}
