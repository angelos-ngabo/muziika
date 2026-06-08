import type { UserRole } from "@/types";

const COOKIE_NAME = "muziika-role";
const MAX_AGE = 60 * 60 * 24 * 7;

export function setAuthCookie(role: UserRole): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${role}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

export function clearAuthCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
}
