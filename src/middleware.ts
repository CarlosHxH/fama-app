import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function safeInternalPath(raw: string | null, fallback: string): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return fallback;
  return raw;
}

/**
 * Protege `/cobranca` e `/admin`; restringe `/admin` a `role === ADMIN`.
 * Login admin: `/admin/login` (e-mail + palavra-passe). Titular: `/login` (CPF).
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
  const accountKind = token?.accountKind as string | undefined;

  if (pathname.startsWith("/login")) {
    if (isLoggedIn) {
      if (accountKind === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
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
    if (accountKind !== "portal") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/login")) {
    if (isLoggedIn && role === "ADMIN") {
      const cb = safeInternalPath(
        request.nextUrl.searchParams.get("callbackUrl"),
        "/admin",
      );
      return NextResponse.redirect(new URL(cb, request.url));
    }
    if (isLoggedIn && role === "USER") {
      return NextResponse.redirect(new URL("/cobranca", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
    if (role !== "ADMIN" || accountKind !== "admin") {
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
