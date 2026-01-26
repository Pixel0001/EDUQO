import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Routes that require authentication
const protectedRoutes = ['/admin', '/teacher']
// Routes that require specific roles
const adminRoutes = ['/admin']
const teacherRoutes = ['/teacher']

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip middleware if NEXTAUTH_SECRET is not configured
  if (!process.env.NEXTAUTH_SECRET) {
    return NextResponse.next()
  }

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

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  
  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Get the user token
  try {
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
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
    const isTeacherRoute = teacherRoutes.some(route => pathname.startsWith(route))

    // Admin routes require ADMIN or MANAGER role
    if (isAdminRoute && !['ADMIN', 'MANAGER'].includes(token.role)) {
      // If user is a teacher, redirect to teacher portal
      if (token.role === 'TEACHER') {
        return NextResponse.redirect(new URL('/teacher', request.url))
      }
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Teacher routes require any authenticated user with TEACHER, MANAGER, or ADMIN role
    if (isTeacherRoute && !['TEACHER', 'MANAGER', 'ADMIN'].includes(token.role)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    // If there's an error (e.g., missing secret), allow the request to continue
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
