import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXT_AUTH_SECRET;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({ req: request, secret });

  const isAuthRoute = pathname.startsWith("/auth");

  if (token && isAuthRoute) {
    // If logged in and visiting /auth (login/register), redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && isAuthRoute) {
    // If not logged in, allow visiting /auth pages
    // But make sure they aren't trying to access a protected subpage under /auth
    // e.g., /auth/protected should redirect to /auth/login
    const publicPaths = ["/auth/login", "/auth/signup"];
    const isPublicPath = publicPaths.includes(pathname);

    if (!isPublicPath) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next(); // Allow normal flow
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard", "/dashboard/:path*"],
};
