"use client";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ProfileSheet } from "@/components/mobile/ProfileSheet";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CompassIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.5 9.5L10 14l4.5-4.5zM9.5 14.5L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20c0-3.314 2.686-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 20c0-2.761 1.79-5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ProfileOutlineIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "home", label: "HOME", path: "/", Icon: HomeIcon, center: false },
  { id: "explore", label: "EXPLORE", path: "/explore", Icon: CompassIcon, center: false },
  { id: "submit", label: "", path: "/submit", Icon: PlusIcon, center: true },
  { id: "artists", label: "ARTISTS", path: "/explore", Icon: UsersIcon, center: false },
] as const;

export function MobileBottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isLoggedIn = !!user;
  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "U";
  const initial = getInitials(displayName).charAt(0);

  const isActive = (path: string, id: string) => {
    if (id === "home") return location.pathname === "/";
    if (id === "artists") return location.pathname === "/explore";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleMeTap = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setSheetOpen(true);
  };

  const meActive =
    location.pathname === "/login" ||
    location.pathname.startsWith("/artist/dashboard") ||
    (location.pathname.startsWith("/artist/") && userRole === "artist");

  return (
    <>
      <nav className="mobile-bottom-nav z-[200] flex min-h-[72px] items-center justify-around border-t border-[#1f1f1f] bg-[#0f0f0f]">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path, item.id);

          if (item.center) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.path)}
                className="mobile-tap flex flex-1 flex-col items-center justify-center border-none bg-transparent p-2"
                aria-label="Submit"
              >
                <span className="flex h-[52px] w-[52px] -translate-y-3 items-center justify-center rounded-full bg-hero-orange text-white shadow-[0_8px_24px_rgba(255,107,0,0.4)]">
                  <PlusIcon />
                </span>
              </button>
            );
          }

          const Icon = item.Icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => navigate(item.path)}
              className="mobile-tap flex flex-1 flex-col items-center gap-1 border-none bg-transparent px-4 py-2"
            >
              {active && (
                <span className="mb-0.5 h-1 w-1 rounded-full bg-hero-orange" aria-hidden="true" />
              )}
              {!active && <span className="mb-0.5 h-1 w-1 opacity-0" aria-hidden="true" />}
              <span className={cn(active ? "text-hero-orange" : "text-[#555555]")}>
                <Icon active={active} />
              </span>
              <span
                className={cn(
                  "font-space text-[9px] font-semibold uppercase tracking-[0.08em]",
                  active ? "text-hero-orange" : "text-[#555555]"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={handleMeTap}
          className="mobile-tap flex flex-1 flex-col items-center gap-1 border-none bg-transparent px-4 py-2"
        >
          {meActive && isLoggedIn && (
            <span className="mb-0.5 h-1 w-1 rounded-full bg-hero-orange" aria-hidden="true" />
          )}
          {(!meActive || !isLoggedIn) && (
            <span className="mb-0.5 h-1 w-1 opacity-0" aria-hidden="true" />
          )}
          {isLoggedIn ? (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-hero-orange font-space text-[9px] font-bold text-white">
              {initial}
            </span>
          ) : (
            <span className="text-[#555555]">
              <ProfileOutlineIcon />
            </span>
          )}
          <span
            className={cn(
              "font-space text-[9px] font-semibold uppercase tracking-[0.08em]",
              isLoggedIn ? "text-hero-orange" : "text-[#555555]"
            )}
          >
            {isLoggedIn ? "ME" : "SIGN IN"}
          </span>
        </button>
      </nav>

      {isLoggedIn && <ProfileSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />}
    </>
  );
}
