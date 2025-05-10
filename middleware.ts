import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { getTokensFromCookies } from "./lib/auth.server";

const loginPath = "/auth/login";
const signupPath = "/auth/signup";

const authRequiredPathPrefixes = ["/~"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLoginPath = path === loginPath;
  const isSignupPath = path === signupPath;
  const isAuthRequiredPath = authRequiredPathPrefixes.some((prefix) =>
    path.startsWith(prefix)
  );
  const isRootPath = path === "/";

  if (isRootPath) {
    const tokens = await getTokensFromCookies(await cookies());

    if (!!tokens) {
      const nextUrl = new URL("/~", request.url);
      return NextResponse.redirect(nextUrl);
    }
  }

  if (isLoginPath || isSignupPath) {
    const tokens = await getTokensFromCookies(await cookies());

    if (!!tokens) {
      const nextQuery = request.nextUrl.searchParams.get("next");
      const nextUrl = nextQuery
        ? new URL(nextQuery, request.url)
        : new URL("/~", request.url);
      return NextResponse.redirect(nextUrl);
    }
  }

  if (isAuthRequiredPath) {
    const tokens = await getTokensFromCookies(await cookies());

    if (!tokens) {
      const nextUrl = new URL(loginPath, request.url);
      nextUrl.searchParams.set("next", request.nextUrl.pathname);
      return NextResponse.redirect(nextUrl);
    }
  }

  return authMiddleware(request, {
    loginPath: "/api/auth/login",
    logoutPath: "/api/auth/logout",
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    cookieName: "session",
    cookieSignatureKeys: [process.env.AUTH_COOKIE_SIGNATURE_KEY!],
    cookieSerializeOptions: {
      path: "/",
      maxAge:
        60 * 60 * 24 * (Number(process.env.AUTH_SESSION_DURATION_DAYS) ?? 7),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    },
    serviceAccount: {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!,
    },
  });
}

export const config = {
  matcher: [
    "/api/auth/login",
    "/api/auth/logout",
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
  ],
};
