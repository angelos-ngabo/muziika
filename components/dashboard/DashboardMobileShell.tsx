"use client";

import type { UserRole } from "@/types";
import { DashboardMobileProvider, useDashboardMobile } from "@/context/DashboardMobileContext";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { DashboardTabNav } from "@/components/dashboard/DashboardTabNav";

interface DashboardMobileShellProps {
  role: UserRole;
  children: React.ReactNode;
}

function DashboardMobileShellInner({ role, children }: DashboardMobileShellProps) {
  const { contentRef } = useDashboardMobile();

  return (
    <div className="flex min-h-[100dvh] flex-col md:hidden">
      <DashboardTopBar role={role} />
      <DashboardTabNav />
      <div
        ref={contentRef}
        className="dash-mobile-content min-h-0 flex-1 overflow-y-auto overscroll-contain pb-6 [-webkit-overflow-scrolling:touch]"
      >
        {children}
      </div>
    </div>
  );
}

export function DashboardMobileShell({ role, children }: DashboardMobileShellProps) {
  return (
    <DashboardMobileProvider role={role}>
      <DashboardMobileShellInner role={role}>{children}</DashboardMobileShellInner>
    </DashboardMobileProvider>
  );
}

export function isDashboardRoute(pathname: string): boolean {
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/judge") ||
    pathname.startsWith("/artist/dashboard")
  );
}
