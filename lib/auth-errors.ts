export function getAuthErrorMessage(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code: string }).code)
      : "";

  switch (code) {
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Wrong password. Try again or reset it.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password must be at least 8 characters.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      if (error instanceof Error && error.message) {
        return error.message;
      }
      return "Something went wrong. Please try again.";
  }
}
