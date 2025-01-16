import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (token.provider === "google") {
    return NextResponse.next();
  }

  if (!token.user?.emailVerified) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/overview/:path*", "/notes/:path*", "/categories/:path*"],
};
