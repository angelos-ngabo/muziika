"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { subscribeToAuthState, logout as firebaseLogout } from "@/lib/auth";
import { clearAuthCookie, setAuthCookie } from "@/lib/auth-cookie";
import type { AuthUser, UserRole } from "@/types";

interface AuthContextValue {
  user: AuthUser | null;
  userRole: UserRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};
    const start = window.setTimeout(() => {
      unsubscribe = subscribeToAuthState((authUser) => {
        setUser(authUser);
        setLoading(false);
        if (authUser?.role) {
          setAuthCookie(authUser.role);
        } else {
          clearAuthCookie();
        }
      });
    }, 0);

    return () => {
      window.clearTimeout(start);
      unsubscribe();
    };
  }, []);

  const signOut = useCallback(async () => {
    await firebaseLogout();
    clearAuthCookie();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      userRole: user?.role ?? null,
      loading,
      signOut,
    }),
    [user, loading, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
