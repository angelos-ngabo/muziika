import type { NavigateFunction } from "react-router-dom";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { setAuthCookie } from "@/lib/auth-cookie";
import { getFirebaseAuth } from "@/lib/firebase";
import { createUserDoc, getUserById } from "@/lib/firestore";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import type { AuthUser, UserRole } from "@/types";

export interface RegisterInput {
  name: string;
  stageName?: string;
  email: string;
  password: string;
}

export function redirectByRole(
  role: UserRole | null,
  uid: string,
  navigate: NavigateFunction
): void {
  if (role === "admin") {
    navigate("/admin");
  } else if (role === "judge") {
    navigate("/judge");
  } else if (role === "artist") {
    navigate("/artist/dashboard");
  } else {
    navigate("/");
  }
}

export async function signInWithGoogle(): Promise<AuthUser> {
  const auth = await getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  const credential = await signInWithPopup(auth, provider);
  const { uid, email, displayName } = credential.user;

  let userDoc = await getUserById(uid);
  if (!userDoc) {
    await createUserDoc(uid, {
      name: displayName ?? "Artist",
      email: email ?? "",
      role: "artist",
    });
    userDoc = await getUserById(uid);
  }

  const user: AuthUser = {
    uid,
    email,
    role: userDoc?.role ?? "artist",
    name: userDoc?.name ?? displayName,
  };
  if (user.role) setAuthCookie(user.role);
  return user;
}

/** Public registration — artists only. Judges are provisioned by admin. */
export async function registerWithEmail(input: RegisterInput): Promise<AuthUser> {
  const auth = await getFirebaseAuth();
  const credential = await createUserWithEmailAndPassword(auth, input.email, input.password);

  await createUserDoc(credential.user.uid, {
    name: input.name,
    stageName: input.stageName,
    email: input.email,
    role: "artist",
  });

  const userDoc = await getUserById(credential.user.uid);
  const user: AuthUser = {
    uid: credential.user.uid,
    email: credential.user.email,
    role: userDoc?.role ?? "artist",
    name: userDoc?.name ?? input.name,
  };
  setAuthCookie("artist");
  return user;
}

export async function sendPasswordReset(email: string): Promise<void> {
  const auth = await getFirebaseAuth();
  await sendPasswordResetEmail(auth, email);
}

export async function loginAndRedirect(
  email: string,
  password: string,
  navigate: NavigateFunction
): Promise<AuthUser> {
  const { loginWithEmail } = await import("@/lib/auth-login");
  try {
    const user = await loginWithEmail(email, password);
    if (user.role) setAuthCookie(user.role);
    redirectByRole(user.role, user.uid, navigate);
    return user;
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}
