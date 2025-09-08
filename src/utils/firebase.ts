// utils/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  User
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

/** Ensure there is a signed-in user (anonymous by default). */
export async function ensureAnonAuth(): Promise<User> {
  if (auth.currentUser) return auth.currentUser;
  await signInAnonymously(auth);
  return new Promise<User>((resolve) => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) { unsub(); resolve(u); }
    });
  });
}

/** Begin an email link sign-in flow (optional helper). */
export async function startEmailLinkSignIn(email: string) {
  const actionCodeSettings = {
    url: `${location.origin}/auth-complete`,
    handleCodeInApp: true,
  };
  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  localStorage.setItem("vantra-email-for-signin", email);
}

/** Complete email link sign-in on the redirect page (optional helper). */
export async function completeEmailLinkSignIn() {
  if (!isSignInWithEmailLink(auth, window.location.href)) return null;
  let email = localStorage.getItem("vantra-email-for-signin") || "";
  if (!email) email = window.prompt("Confirm your email for sign-in") || "";
  const cred = await signInWithEmailLink(auth, email, window.location.href);
  localStorage.removeItem("vantra-email-for-signin");
  return cred.user;
}
