"use client";

import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

const ROLE_THEME = {
  admin: {
    badge: "Admin Panel",
    badgeClass: "border-[#FF6B00]/40 bg-[#1a0800] text-[#FF6B00]",
    glow: "from-[#FF6B00]/20 via-transparent to-[#FF6B00]/5",
    ring: "border-[#FF6B00]/25 shadow-[0_0_40px_rgba(255,107,0,0.12)]",
    iconBg: "bg-gradient-to-br from-[#FF6B00] to-[#e05e00]",
    accent: "text-[#FF6B00]",
    dot: "bg-[#FF6B00]",
  },
  judge: {
    badge: "Judge Panel",
    badgeClass: "border-[#534AB7]/40 bg-[#0a0a1f] text-[#AFA9EC]",
    glow: "from-[#534AB7]/20 via-transparent to-[#534AB7]/5",
    ring: "border-[#534AB7]/25 shadow-[0_0_40px_rgba(83,74,183,0.15)]",
    iconBg: "bg-gradient-to-br from-[#534AB7] to-[#3d368a]",
    accent: "text-[#AFA9EC]",
    dot: "bg-[#534AB7]",
  },
} as const;

function LaptopPhoneIllustration({ role }: { role: "admin" | "judge" }) {
  const accent = role === "admin" ? "#FF6B00" : "#AFA9EC";
  const accentDim = role === "admin" ? "#FF6B00" : "#534AB7";

  return (
    <div className="relative mx-auto h-[100px] w-[140px]" aria-hidden="true">
      <span className="absolute left-2 top-3 flex h-14 w-9 -rotate-12 flex-col items-center justify-center rounded-xl border border-[#2a2a2a] bg-[#161616] opacity-60">
        <span className="mt-1 h-1 w-5 rounded-full bg-[#333]" />
        <span className="mt-2 text-[10px] text-[#555]">📱</span>
      </span>
      <span
        className="absolute left-0 top-8 flex h-5 w-5 items-center justify-center rounded-full bg-[#1a1a1a] text-[11px]"
        style={{ color: accent }}
      >
        ✕
      </span>
      <span
        className={cn(
          "absolute right-0 top-0 flex h-[72px] w-[100px] flex-col items-center justify-end rounded-xl border-2 pb-2",
          role === "admin" ? "border-[#FF6B00]/35 bg-[#111111]" : "border-[#534AB7]/35 bg-[#111111]"
        )}
      >
        <span className="mb-1.5 h-1 w-12 rounded-full bg-[#2a2a2a]" />
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: `${accentDim}22` }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="12" rx="2" stroke={accent} strokeWidth="1.5" />
            <path d="M8 20h8" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </span>
      <span
        className="absolute bottom-2 right-6 flex h-6 w-6 items-center justify-center rounded-full text-sm"
        style={{ background: `${accentDim}33`, color: accent }}
      >
        ✓
      </span>
      <span className="absolute -right-1 top-1 text-lg opacity-80">✨</span>
      <span className="absolute bottom-0 left-6 text-sm opacity-60">🎵</span>
    </div>
  );
}

interface MobileStaffNoticeProps {
  role?: UserRole | null;
  variant?: "page" | "inline";
  onExplore?: () => void;
  onSignOut?: () => void;
  className?: string;
}

export function MobileStaffNotice({
  role,
  variant = "page",
  onExplore,
  onSignOut,
  className,
}: MobileStaffNoticeProps) {
  const staffRole: "admin" | "judge" = role === "judge" ? "judge" : "admin";
  const theme = ROLE_THEME[staffRole];
  const isInline = variant === "inline";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] border text-center",
        theme.ring,
        isInline ? "px-5 py-6" : "mx-auto max-w-sm px-6 py-8",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-b",
          theme.glow
        )}
      />
      <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/[0.02]" />
      <div className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-white/[0.02]" />

      <div className="relative">
        <span
          className={cn(
            "inline-block rounded-[50px] border px-3 py-1 font-space text-[10px] font-bold uppercase tracking-[0.1em]",
            theme.badgeClass
          )}
        >
          {theme.badge}
        </span>

        <div className="mt-5">
          <LaptopPhoneIllustration role={staffRole} />
        </div>

        <h2
          className={cn(
            "mt-5 font-space font-extrabold text-white",
            isInline ? "text-base" : "text-xl"
          )}
        >
          Your workspace is on desktop
        </h2>

        <p className="mt-2.5 font-space text-[13px] leading-relaxed text-[#888888]">
          {staffRole === "admin" ? "Admin" : "Judge"} tools need a bigger screen — reviews,
          queues, and panels work best on a laptop.
        </p>

        <div className="mt-4 rounded-xl border border-[#1f1f1f] bg-[#0a0a0a]/80 px-3.5 py-3">
          <p className="font-space text-[11px] leading-relaxed text-[#666666]">
            <span className={cn("font-semibold", theme.accent)}>On your phone?</span>{" "}
            Muziika mobile is built for artists submitting tracks and fans exploring Rwanda&apos;s
            music scene.
          </p>
        </div>

        {!isInline && (onExplore || onSignOut) && (
          <div className="mt-6 flex flex-col gap-2.5">
            {onExplore && (
              <button
                type="button"
                onClick={onExplore}
                className="mobile-tap h-11 rounded-xl bg-[#FF6B00] font-space text-xs font-bold uppercase tracking-[0.06em] text-white shadow-[0_8px_24px_rgba(255,107,0,0.25)]"
              >
                Explore Muziika
              </button>
            )}
            {onSignOut && (
              <button
                type="button"
                onClick={onSignOut}
                className="mobile-tap h-11 rounded-xl border border-[#2a2a2a] bg-[#111111] font-space text-xs font-semibold text-[#888888]"
              >
                Sign out
              </button>
            )}
          </div>
        )}

        {isInline && (
          <>
            <p className={cn("mt-4 font-space text-[10px] uppercase tracking-[0.08em]", theme.accent)}>
              See you on the big screen
            </p>
            {onExplore && (
              <button
                type="button"
                onClick={onExplore}
                className="mobile-tap mt-4 font-space text-xs font-semibold text-[#888888] underline decoration-[#333] underline-offset-4"
              >
                Browse as explorer instead
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
