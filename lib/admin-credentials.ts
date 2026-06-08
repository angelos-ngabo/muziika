import { publicEnvOr } from "@/lib/env";

/** Built-in admin account for local/demo use. Override via .env.local in production setups. */
export const BUILTIN_ADMIN_EMAIL = publicEnvOr("NEXT_PUBLIC_ADMIN_EMAIL", "admin@muziika.rw");

export const BUILTIN_ADMIN_PASSWORD = publicEnvOr("NEXT_PUBLIC_ADMIN_PASSWORD", "Muziika@Admin2024");

export function isBuiltinAdmin(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === BUILTIN_ADMIN_EMAIL.toLowerCase() &&
    password === BUILTIN_ADMIN_PASSWORD
  );
}
