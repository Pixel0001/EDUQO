import { NextResponse } from 'next/server'

export function middleware(request) {
  // Completely skip middleware if no NEXTAUTH_SECRET
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
}
