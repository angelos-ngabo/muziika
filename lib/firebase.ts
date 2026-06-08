import { firebaseConfig, isFirebaseConfigured } from "@/lib/firebase-config";
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { Analytics } from "firebase/analytics";

export { isFirebaseConfigured, firebaseConfig };

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let analytics: Analytics | undefined;

export async function getFirebaseApp(): Promise<FirebaseApp> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured.");
  }
  if (!app) {
    const { initializeApp, getApps } = await import("firebase/app");
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

export async function getFirebaseAuth(): Promise<Auth> {
  if (!auth) {
    const { getAuth } = await import("firebase/auth");
    auth = getAuth(await getFirebaseApp());
  }
  return auth;
}

export async function getFirebaseDb(): Promise<Firestore> {
  if (!db) {
    const { getFirestore, initializeFirestore, memoryLocalCache } = await import("firebase/firestore");
    const firebaseApp = await getFirebaseApp();
    try {
      // Avoid IndexedDB persistence — corrupted local cache can crash Chromium tabs.
      db = initializeFirestore(firebaseApp, { localCache: memoryLocalCache() });
    } catch {
      db = getFirestore(firebaseApp);
    }
  }
  return db;
}

export async function initFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined" || analytics) return analytics ?? null;

  const { getAnalytics, isSupported } = await import("firebase/analytics");
  if (!(await isSupported())) return null;

  analytics = getAnalytics(await getFirebaseApp());
  return analytics;
}
