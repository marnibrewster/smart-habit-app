import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Correctly create the Supabase client for middleware
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if the user is not authenticated
  if (!user && !req.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/add-habit", "/habits", "/log-habit", "/api/:path*"], // Protect these routes
};
