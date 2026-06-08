import type { AuthUser, UserRole } from "@/types";

type Unsubscribe = () => void;

export { loginWithEmail, logout } from "@/lib/auth-login";
export { createJudgeAccount } from "@/lib/create-judge-account";

export function subscribeToAuthState(callback: (user: AuthUser | null) => void): Unsubscribe {
  let innerUnsub: Unsubscribe | undefined;
  let cancelled = false;

  void (async () => {
    const [{ getFirebaseAuth }, { onAuthStateChanged }, { getUserById }] = await Promise.all([
      import("@/lib/firebase"),
      import("firebase/auth"),
      import("@/lib/firestore"),
    ]);

    if (cancelled) return;
    const auth = await getFirebaseAuth();

    innerUnsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        callback(null);
        return;
      }

      try {
        const userDoc = await getUserById(firebaseUser.uid);
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: userDoc?.role ?? null,
          name: userDoc?.name ?? null,
        });
      } catch (error) {
        console.error("[Auth] subscribeToAuthState user fetch failed:", error);
        callback({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          role: null,
          name: null,
        });
      }
    });
  })();

  return () => {
    cancelled = true;
    innerUnsub?.();
  };
}

export function hasRole(user: AuthUser | null, role: UserRole): boolean {
  return user?.role === role;
}
