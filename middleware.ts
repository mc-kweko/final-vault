import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user && (request.nextUrl.pathname.startsWith('/student') || request.nextUrl.pathname.startsWith('/teacher'))) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // Redirect based on role to prevent loops
    if (request.nextUrl.pathname.startsWith('/student') && profile?.role === 'teacher') {
      return NextResponse.redirect(new URL('/teacher/dashboard', request.url))
    }
    
    if (request.nextUrl.pathname.startsWith('/teacher') && profile?.role === 'student') {
      return NextResponse.redirect(new URL('/student/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/student/:path*', '/teacher/:path*'],
}
