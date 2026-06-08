"use client";

import { useEffect } from "react";
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

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login", { replace: true });
      } else if (user.role !== requiredRole) {
        navigate("/login", { replace: true });
      }
    }
  }, [user, loading, requiredRole, navigate]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-hero-bg font-space text-white">
        <MusicBackgroundDecorations />
        <div className="relative z-10 space-y-4 w-64">
          <Skeleton className="h-8 w-full bg-white/10" />
          <Skeleton className="h-32 w-full bg-white/10" />
          <Skeleton className="h-8 w-3/4 bg-white/10" />
        </div>
      </div>
    );
  }

  if (!user || user.role !== requiredRole) {
    return null;
  }

  if (isMobile && isStaffRole(requiredRole)) {
    return <MobileStaffBlocked role={requiredRole} />;
  }

  return <>{children}</>;
}
