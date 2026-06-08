import type { CreateJudgeInput } from "@/types";

/**
 * Creates a judge Auth user without signing out the current admin session.
 * Uses a short-lived secondary Firebase app instance.
 */
export async function createJudgeAccount(
  input: CreateJudgeInput,
  assignedBy: string
): Promise<void> {
  const [{ firebaseConfig }, { initializeApp, deleteApp }, { getAuth, createUserWithEmailAndPassword }] =
    await Promise.all([
      import("@/lib/firebase-config"),
      import("firebase/app"),
      import("firebase/auth"),
    ]);

  const secondaryApp = initializeApp(firebaseConfig, `judge-provision-${Date.now()}`);
  const secondaryAuth = getAuth(secondaryApp);

  try {
    const credential = await createUserWithEmailAndPassword(
      secondaryAuth,
      input.email,
      input.password
    );

    const { createUserDoc, createJudgeRecord } = await import("@/lib/firestore");

    await createUserDoc(credential.user.uid, {
      name: input.name,
      email: input.email,
      role: "judge",
    });

    await createJudgeRecord(credential.user.uid, input, assignedBy);
  } catch (error) {
    console.error("[Auth] createJudgeAccount failed:", input.email, error);
    throw error;
  } finally {
    await deleteApp(secondaryApp);
  }
}
