"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MusicBackgroundDecorations } from "@/components/shared/MusicBackgroundDecorations";
import { DashboardMobileShell } from "@/components/dashboard/DashboardMobileShell";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import { useIsMobile } from "@/hooks/useMediaQuery";
import type { UserRole } from "@/types";

interface DashboardShellProps {
  role: UserRole;
  genre?: string;
  reviewedCount?: number;
  pendingCount?: number;
  rightPanel?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardShell({
  role,
  genre,
  reviewedCount,
  pendingCount,
  rightPanel,
  children,
}: DashboardShellProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    if (role === "artist") {
      return (
        <div className="relative min-h-screen bg-[#0a0a0a] font-space text-white md:hidden">
          <MusicBackgroundDecorations />
          <div className="relative z-10 md:hidden">
            <MobileLayout>{children}</MobileLayout>
          </div>
        </div>
      );
    }

    return (
      <div className="relative min-h-screen bg-[#0a0a0a] font-space text-white md:hidden">
        <MusicBackgroundDecorations />
        <div className="relative z-10 md:hidden">
          <DashboardMobileShell role={role}>{children}</DashboardMobileShell>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-hero-bg font-space text-white">
      <MusicBackgroundDecorations />
      <div className="relative z-10 hidden min-h-screen w-full md:flex">
        <DashboardSidebar
          role={role}
          genre={genre}
          reviewedCount={reviewedCount}
          pendingCount={pendingCount}
        />

        <div className="relative flex min-w-0 flex-1 flex-col bg-transparent">
          <main className="relative z-10 flex-1 overflow-y-auto bg-transparent px-5 py-6 md:px-8 md:py-8 lg:px-10">
            {children}
          </main>
        </div>

        {rightPanel}
      </div>
    </div>
  );
}
