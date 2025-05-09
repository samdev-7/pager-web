import { getTokens, Tokens } from "next-firebase-auth-edge";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const getTokensFromCookies = async (
  cookies: ReadonlyRequestCookies
): Promise<Tokens | null> => {
  return getTokens(cookies, {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    cookieName: "session",
    cookieSignatureKeys: [process.env.AUTH_COOKIE_SIGNATURE_KEY!],
    serviceAccount: {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!,
    },
  });
};

export const isLoggedIn = async (
  cookies: ReadonlyRequestCookies
): Promise<boolean> => {
  return !!(await getTokensFromCookies(cookies));
};
