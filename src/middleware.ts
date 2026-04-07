import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protege `/cobranca` e `/admin`; restringe `/admin` a `role === ADMIN`.
 * Usa JWT no Edge (sem importar Prisma).
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const role = token?.role as string | undefined;

  if (pathname.startsWith("/login")) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/cobranca", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/cobranca")) {
    if (!isLoggedIn) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/cobranca", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/cobranca",
    "/cobranca/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
