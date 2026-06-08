"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { isStaffRole } from "@/lib/mobile-access";
import { getInitials } from "@/lib/utils";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

interface ProfileSheetProps {
  open: boolean;
  onClose: () => void;
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UserMenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function VideoMenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 10l4-2v8l-4-2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function SettingsMenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function roleLabel(role: UserRole | null): string {
  if (role === "artist") return "Artist";
  if (role === "admin") return "Admin";
  if (role === "judge") return "Judge";
  return "Member";
}

export function ProfileSheet({ open, onClose }: ProfileSheetProps) {
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [dragY, setDragY] = useState(0);
  const touchStartY = useRef(0);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setDragY(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open && !mounted) return null;

  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "User";
  const initials = getInitials(displayName);

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleSignOut = async () => {
    onClose();
    await signOut();
    navigate("/");
  };

  const profilePath =
    userRole === "artist"
      ? "/artist/dashboard"
      : userRole === "admin"
        ? "/admin"
        : userRole === "judge"
          ? "/judge"
          : "/login";

  const artistMenuItems = [
    { label: "About Muziika", icon: <InfoIcon />, onClick: () => go("/about"), danger: false },
    { label: "My Profile", icon: <UserMenuIcon />, onClick: () => go("/artist/dashboard"), danger: false },
    {
      label: "My Submissions",
      icon: <VideoMenuIcon />,
      onClick: () => go("/artist/dashboard/submissions"),
      danger: false,
    },
    { label: "Settings", icon: <SettingsMenuIcon />, onClick: () => go("/artist/dashboard/profile"), danger: false },
    { label: "Sign Out", icon: <LogOutIcon />, onClick: handleSignOut, danger: true },
  ];

  const staffMobileMenuItems = [
    { label: "Explore Muziika", icon: <InfoIcon />, onClick: () => go("/explore"), danger: false },
    { label: "About Muziika", icon: <InfoIcon />, onClick: () => go("/about"), danger: false },
    { label: "Sign Out", icon: <LogOutIcon />, onClick: handleSignOut, danger: true },
  ];

  const defaultMenuItems = [
    { label: "About Muziika", icon: <InfoIcon />, onClick: () => go("/about"), danger: false },
    { label: "My Profile", icon: <UserMenuIcon />, onClick: () => go(profilePath), danger: false },
    {
      label: "My Submissions",
      icon: <VideoMenuIcon />,
      onClick: () => go("/artist/dashboard/submissions"),
      danger: false,
    },
    { label: "Settings", icon: <SettingsMenuIcon />, onClick: () => go("/artist/dashboard/profile"), danger: false },
    { label: "Sign Out", icon: <LogOutIcon />, onClick: handleSignOut, danger: true },
  ];

  const menuItems =
    userRole === "artist"
      ? artistMenuItems
      : isMobile && isStaffRole(userRole)
        ? staffMobileMenuItems
        : defaultMenuItems;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) setDragY(delta);
  };

  const handleTouchEnd = () => {
    if (dragY > 80) onClose();
    setDragY(0);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close profile menu"
        className={cn(
          "fixed inset-0 z-[299] border-none bg-black/60 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[300] max-h-[60vh] rounded-t-[24px] bg-[#111111] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          open ? "translate-y-0" : "translate-y-full"
        )}
        style={dragY > 0 ? { transform: `translateY(${dragY}px)` } : undefined}
        onTransitionEnd={() => {
          if (!open) setMounted(false);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="mx-auto mb-5 mt-3 h-1 w-10 rounded-sm bg-[#2a2a2a]" />

        <div className="border-b border-[#1f1f1f] px-6 pb-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-hero-orange font-space text-2xl font-bold text-white">
            {initials.charAt(0)}
          </div>
          <p className="mt-3 font-space text-lg font-bold text-white">{displayName}</p>
          <p className="font-space text-xs text-[#888888]">{user?.email}</p>
          <span className="mt-2 inline-block rounded-[50px] border border-hero-orange bg-[#1a1a1a] px-3 py-1 font-space text-[10px] uppercase text-hero-orange">
            {roleLabel(userRole)}
          </span>
        </div>

        <div className="py-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className="mobile-tap flex w-full items-center gap-4 border-b border-[#111111] px-6 py-4 text-left active:bg-[#161616]"
            >
              <span className={item.danger ? "text-[#f87171]" : "text-[#888888]"}>{item.icon}</span>
              <span className={cn("font-space text-[15px]", item.danger ? "text-[#f87171]" : "text-white")}>
                {item.label}
              </span>
              {!item.danger && (
                <span className="ml-auto text-[#333333]">
                  <ChevronRightIcon />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
