"use client";

import LandingNav from "@/components/NoAuthNav";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { auth, translateFirebaseError } from "@/lib/firebase.client";
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { CircleX, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Auth({ isSignup = false }: { isSignup?: boolean }) {
  const [error, setError] = useState("");
  const [authInProgress, setAuthInProgress] = useState(false);
  const router = useRouter();

  async function handleGitHubLogin() {
    const provider = new GithubAuthProvider();
    await handlePopupLogin(provider);
  }
  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    await handlePopupLogin(provider);
  }
  async function handleEmailLogin() {
    setError("Email login is coming soon!");
  }
  async function handlePopupLogin(provider: AuthProvider) {
    if (authInProgress) return;
    setAuthInProgress(true);
    setError("");
    let user;
    try {
      const result = await signInWithPopup(auth, provider);
      user = result.user;
    } catch (error) {
      console.error(error);
      setError(translateFirebaseError(error));
      setAuthInProgress(false);
      return;
    }

    try {
      const idToken = await user.getIdToken();

      const response = await fetch("/api/auth/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      router.refresh();

      if (!response.ok) {
        const error = await response.json();
        setError(error.message);
        setAuthInProgress(false);
        return;
      }
    } catch (error) {
      console.error(error);
    }

    setAuthInProgress(false);
    signOut(auth);
  }

  return (
    <>
      <LandingNav showSignup={!isSignup} showLogin={isSignup} />
      <div className="flex flex-col items-center space-y-6">
        <h2 className="font-semibold text-3xl">
          {isSignup ? "Sign up for" : "Log in to"} Pager
        </h2>
        {error && (
          <Alert variant="destructive" className="border-destructive">
            <CircleX className="h-4 w-4" />
            <AlertTitle>Uh oh!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 w-78 gap-3">
          <Button
            className="text-lg px-32 py-6"
            onClick={handleGitHubLogin}
            disabled={authInProgress}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="text-white size-5"
            >
              <title>GitHub</title>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Continue with GitHub
          </Button>
          <Button
            className="text-lg px-32 py-6 bg-[#4285F4] hover:bg-[#4285F4]/90"
            onClick={handleGoogleLogin}
            disabled={authInProgress}
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="text-white size-5"
            >
              <title>Google</title>
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Continue with Google
          </Button>
          <div className="w-full flex justify-center py-1">
            <div className="border w-48"></div>
          </div>
          <Button
            className="text-lg px-32 py-6"
            variant="outline"
            onClick={handleEmailLogin}
            disabled={authInProgress}
          >
            <Mail className="size-5 text-foreground" />
            Continue with email
          </Button>
        </div>
        <Link
          href={`/auth/${isSignup ? "login" : "signup"}`}
          className="text-sm text-muted-foreground"
        >
          {isSignup ? "Already" : "Don't"} have an account?{" "}
          <span className="text-primary underline">
            {isSignup ? "Log in" : "Sign up"}
          </span>
          .
        </Link>
      </div>
    </>
  );
}
