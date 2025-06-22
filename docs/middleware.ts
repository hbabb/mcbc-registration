import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { auth } from "@/server/auth";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = await auth();

  /* admin-only */
  if (pathname.startsWith("/admin")) {
    if (session?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
