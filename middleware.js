import { NextResponse } from 'next/server'

export async function middleware(request) {
  // Skip middleware entirely if NEXTAUTH_SECRET is not configured
  if (!process.env.NEXTAUTH_SECRET) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  // Skip middleware for API routes, static files, and public routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/uploads/') ||
    pathname.includes('.') ||
    pathname === '/login' ||
    pathname === '/inscriere' ||
    pathname === '/'
  ) {
    return NextResponse.next()
  }

  // Routes that require authentication
  const protectedRoutes = ['/admin', '/teacher']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Dynamic import to avoid issues when env is not set
  try {
    const { getToken } = await import('next-auth/jwt')
    
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    })

    // Redirect to login if not authenticated
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check role-based access
    const adminRoutes = ['/admin']
    const teacherRoutes = ['/teacher']
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
    const isTeacherRoute = teacherRoutes.some(route => pathname.startsWith(route))

    // Admin routes require ADMIN or MANAGER role
    if (isAdminRoute && !['ADMIN', 'MANAGER'].includes(token.role)) {
      if (token.role === 'TEACHER') {
        return NextResponse.redirect(new URL('/teacher', request.url))
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Teacher routes require TEACHER, MANAGER, or ADMIN role
    if (isTeacherRoute && !['TEACHER', 'MANAGER', 'ADMIN'].includes(token.role)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
