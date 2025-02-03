import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  const isAuthorization = cookies().get('Authorization');
  if (!isAuthorization) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// This config ensures that the middleware only applies to the `/home` route
export const config = {
  matcher: '/((?!api/|_next/|static/|public/|google/callback|login|register|logo/|image|favicon.ico).*)'
};
