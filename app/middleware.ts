// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-storage")?.value;
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");
  const isRootPage = request.nextUrl.pathname === "/";

  // Redirect to /login if no token and not on auth page
  if (!token && !isAuthPage && !isRootPage) {
    // Add a query parameter for the toast message
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set(
      "toast",
      "You need to log in to access this page."
    );
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to /profile if token exists and on auth page
  if (token && isAuthPage) {
    const redirectUrl = new URL("/profile", request.url);
    redirectUrl.searchParams.set("toast", "You are already logged in!");
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
