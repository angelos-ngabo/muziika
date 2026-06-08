"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { MusicBackgroundDecorations } from "@/components/shared/MusicBackgroundDecorations";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MobileStaffBlocked } from "@/components/mobile/MobileStaffBlocked";
import { isStaffRole } from "@/lib/mobile-access";
import type { UserRole } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: UserRole;
}

function ProtectedLoading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-hero-bg font-space text-white">
      <MusicBackgroundDecorations />
      <div className="relative z-10 w-64 space-y-4">
        <Skeleton className="h-8 w-full bg-white/10" />
        <Skeleton className="h-32 w-full bg-white/10" />
        <Skeleton className="h-8 w-3/4 bg-white/10" />
      </div>
    </div>
  );
}

async function hasFirebaseSession(): Promise<boolean> {
  try {
    const { getFirebaseAuth } = await import("@/lib/firebase");
    const auth = await getFirebaseAuth();
    return Boolean(auth.currentUser);
  } catch {
    return false;
  }
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [resolving, setResolving] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    async function resolveAccess() {
      if (loading) return;

      if (user?.role === requiredRole) {
        if (!cancelled) setResolving(false);
        return;
      }

      if (user && user.role !== requiredRole) {
        if (!cancelled) {
          setResolving(false);
          navigate("/login", { replace: true });
        }
        return;
      }

      const sessionActive = await hasFirebaseSession();
      if (cancelled) return;

      if (sessionActive) {
        setResolving(true);
        retryTimer = setTimeout(() => {
          if (!cancelled) setResolving(false);
        }, 4000);
        return;
      }

      setResolving(false);
      navigate("/login", { replace: true });
    }

    void resolveAccess();

    return () => {
      cancelled = true;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [user, loading, requiredRole, navigate]);

  useEffect(() => {
    if (user?.role === requiredRole) {
      setResolving(false);
    }
  }, [user, requiredRole]);

  if (loading || resolving) {
    return <ProtectedLoading />;
  }

  if (!user || user.role !== requiredRole) {
    return null;
  }

  if (isMobile && isStaffRole(requiredRole)) {
    return <MobileStaffBlocked role={requiredRole} />;
  }

  return <>{children}</>;
}
