import { getAuthErrorMessage } from "@/lib/auth-errors";
import { setAuthCookie, clearAuthCookie } from "@/lib/auth-cookie";
import type { AuthUser } from "@/types";

export async function loginWithEmail(
  email: string,
  password: string
): Promise<AuthUser> {
  try {
    const [{ getFirebaseAuth }, { signInWithEmailAndPassword }, { getUserById }] =
      await Promise.all([
        import("@/lib/firebase"),
        import("firebase/auth"),
        import("@/lib/firestore"),
      ]);

    const auth = await getFirebaseAuth();
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getUserById(credential.user.uid);

    if (!userDoc?.role) {
      throw new Error("Account not set up. Contact support.");
    }

    const user: AuthUser = {
      uid: credential.user.uid,
      email: credential.user.email,
      role: userDoc.role,
      name: userDoc.name ?? null,
    };
    setAuthCookie(userDoc.role);
    return user;
  } catch (error) {
    console.error("[Auth] loginWithEmail failed:", email, error);
    throw new Error(getAuthErrorMessage(error));
  }
}

export async function logout(): Promise<void> {
  clearAuthCookie();
  try {
    const [{ getFirebaseAuth }, { signOut }] = await Promise.all([
      import("@/lib/firebase"),
      import("firebase/auth"),
    ]);
    const auth = await getFirebaseAuth();
    await signOut(auth);
  } catch (error) {
    console.error("[Auth] logout failed:", error);
    throw error;
  }
}
