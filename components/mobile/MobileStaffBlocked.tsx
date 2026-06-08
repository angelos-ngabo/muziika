"use client";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { PublicPageLayout } from "@/components/home/PublicPageLayout";
import { MobileStaffNotice } from "@/components/mobile/MobileStaffNotice";
import type { UserRole } from "@/types";

interface MobileStaffBlockedProps {
  role?: UserRole;
  embedded?: boolean;
}

export function MobileStaffBlocked({ role, embedded = false }: MobileStaffBlockedProps) {
  const navigate = useNavigate();
  const { signOut, userRole } = useAuth();
  const staffRole = role ?? userRole;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const content = (
    <div
      className={
        embedded
          ? "px-5 py-10"
          : "flex min-h-[65vh] flex-col items-center justify-center px-5 py-12"
      }
    >
      <MobileStaffNotice
        role={staffRole}
        variant="page"
        onExplore={() => navigate("/explore")}
        onSignOut={handleSignOut}
      />
    </div>
  );

  if (embedded) return content;

  return <PublicPageLayout>{content}</PublicPageLayout>;
}
