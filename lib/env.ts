/** Read a public env var exposed by Vite (NEXT_PUBLIC_* or VITE_*). */
export function publicEnv(key: string): string | undefined {
  const value = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function publicEnvOr(key: string, fallback: string): string {
  return publicEnv(key) ?? fallback;
}
