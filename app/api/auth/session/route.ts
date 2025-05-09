import { authAdmin } from "@/lib/firebase.server";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const { idToken, csrfToken } = await request.json();

  // Prevent CSRF attacks
  if (csrfToken !== cookieStore.get("csrfToken")?.value) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  // Prevent replay attacks of idToken, can only continue within 5 minutes of being issued.
  try {
    const decodedIdToken = await authAdmin.verifyIdToken(idToken);
    if (new Date().getTime() / 1000 - decodedIdToken.auth_time > 5 * 60) {
      return new Response(
        JSON.stringify({ message: "Recent sign in required!" }),
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const expiresIn =
    60 * 60 * 24 * (Number(process.env.AUTH_SESSION_DURATION_DAYS) ?? 7);

  let sessionCookie;
  try {
    sessionCookie = await authAdmin.createSessionCookie(idToken, {
      expiresIn,
    });
  } catch (error) {
    console.error("Error creating session cookie:", error);
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  cookieStore.set("session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return new Response(JSON.stringify({}), {
    status: 200,
  });
}
