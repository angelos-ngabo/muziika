import type { UserRole } from "@/types";

export function isStaffRole(role: UserRole | null | undefined): boolean {
  return role === "admin" || role === "judge";
}
