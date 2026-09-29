import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16 proxy (formerly middleware).
 *
 * Only a fast, optimistic redirect when no session cookie is present.
 * Real authentication and wedding authorization happen in route handlers
 * and page guards; never rely on this for access control.
 */
const SESSION_COOKIE = "mmm_session";

export function proxy(request: NextRequest) {
  if (!request.cookies.has(SESSION_COOKIE)) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/onboarding"],
};
