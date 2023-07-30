import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(request) {
    // authorize roles
    console.log(request.nextUrl.pathname)
    console.log(request.nextauth.token)

    // if (
    //   request.nextUrl.pathname.startsWith('/me') &&
    //   request.nextauth.token?.role !== 'admin'
    // ) {
    //   return NextResponse.rewrite(new URL('/denied', request.url))
    // }
    if (
      request.nextUrl.pathname.startsWith('/userlist') &&
      request.nextauth.token?.role !== 'admin' &&
      request.nextauth.token?.role !== 'manager'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url))
    }
    if (
      request.nextUrl.pathname.startsWith('/servicelist') &&
      request.nextauth.token?.role !== 'admin'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url))
    }
    if (
      request.nextUrl.pathname.startsWith('/admin/sigaservices/new') &&
      request.nextauth.token?.role !== 'admin'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url))
    }
    if (
      request.nextUrl.pathname.startsWith('/admin/sigaservices') &&
      request.nextauth.token?.role !== 'admin'
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/me',
    '/userlist',
    '/admin/sigaservices/new',
    '/admin/sigaservices',
  ],
}
