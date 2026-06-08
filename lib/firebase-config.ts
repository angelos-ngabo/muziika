import { publicEnvOr } from "@/lib/env";

export const firebaseConfig = {
  apiKey: publicEnvOr("NEXT_PUBLIC_FIREBASE_API_KEY", "AIzaSyBhoDByQDk2FkrIQlIkzTdfb-8dSeW-tLc"),
  authDomain: publicEnvOr("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "muziika.firebaseapp.com"),
  projectId: publicEnvOr("NEXT_PUBLIC_FIREBASE_PROJECT_ID", "muziika"),
  storageBucket: publicEnvOr("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", "muziika.firebasestorage.app"),
  messagingSenderId: publicEnvOr("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", "355038613656"),
  appId: publicEnvOr("NEXT_PUBLIC_FIREBASE_APP_ID", "1:355038613656:web:c308876026b9f2c60000ed"),
  measurementId: publicEnvOr("NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID", "G-FN4RTYQ6WJ"),
};

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
}
