import type { AuthUser } from "@/types";

let mockUser: AuthUser | null = null;
const listeners = new Set<(user: AuthUser | null) => void>();

export function setMockUser(user: AuthUser | null): void {
  mockUser = user;
  listeners.forEach((listener) => listener(user));
}

export function getMockUser(): AuthUser | null {
  return mockUser;
}

export function subscribeMockAuth(callback: (user: AuthUser | null) => void): () => void {
  callback(mockUser);
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}
