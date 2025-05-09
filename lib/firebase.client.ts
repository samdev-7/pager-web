import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(clientCredentials);
const auth = getAuth(app);

function translateFirebaseError(error: unknown) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-email":
        return "The email address is badly formatted.";
      case "auth/user-disabled":
        return "This user is disabled.";
      case "auth/user-not-found":
        return "There is no user corresponding to the given email.";
      case "auth/wrong-password":
        return "The password is invalid for the given email.";
      case "auth/email-already-in-use":
        return "The email address is already in use by another account.";
      case "auth/popup-closed-by-user":
        return "The popup was closed before completion.";
      default:
        return `An unknown error occurred (${error.code})`;
    }
  }
  if (error instanceof Error) {
    return `An unknown error occurred (${error.message})`;
  }
  return "An unknown error occurred.";
}

export { app, auth, translateFirebaseError, clientCredentials };
