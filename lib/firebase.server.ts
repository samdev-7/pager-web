import admin, { ServiceAccount } from "firebase-admin";

const serviceAccountCredentials: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

function getFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountCredentials),
    });
  }

  return admin;
}

const firebaseAdmin = getFirebaseAdmin();
const authAdmin = firebaseAdmin.auth();

export {
  firebaseAdmin,
  authAdmin,
  getFirebaseAdmin,
  serviceAccountCredentials,
};
