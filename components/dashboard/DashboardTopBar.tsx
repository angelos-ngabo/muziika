"use client";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ROLE_BADGE: Record<UserRole, { text: string; className: string }> = {
  admin: {
    text: "ADMIN PANEL",
    className: "border-[#FF6B00] bg-[#1a0800] text-[#FF6B00]",
  },
  judge: {
    text: "JUDGE PANEL",
    className: "border-[#534AB7] bg-[#0a0a1f] text-[#AFA9EC]",
  },
  artist: {
    text: "ARTIST PORTAL",
    className: "border-[#4ade80] bg-[#0f1a0f] text-[#4ade80]",
  },
};

interface DashboardTopBarProps {
  role: UserRole;
}

export function DashboardTopBar({ role }: DashboardTopBarProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const badge = ROLE_BADGE[role];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-[200] flex h-[60px] shrink-0 items-center justify-between border-b border-white/10 bg-[#0a0a0a]/35 px-4 backdrop-blur-md">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mobile-tap flex items-center gap-2 border-none bg-transparent p-0"
      >
        <span className="text-[#888888]">
          <ChevronLeftIcon />
        </span>
        <span className="font-space text-[13px] font-extrabold tracking-[0.06em] text-[#FF6B00]">
          MUZIIKA
        </span>
      </button>

      <span
        className={cn(
          "rounded-[50px] border px-3.5 py-[5px] font-space text-[10px] font-bold uppercase tracking-[0.1em]",
          badge.className
        )}
      >
        {badge.text}
      </span>

      <button
        type="button"
        onClick={handleSignOut}
        className="mobile-tap flex h-9 w-9 items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] text-[#888888]"
        aria-label="Sign out"
      >
        <LogOutIcon />
      </button>
    </header>
  );
}
