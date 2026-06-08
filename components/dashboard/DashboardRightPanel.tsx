"use client";

import { useAuth } from "@/context/AuthContext";
import { getInitials } from "@/lib/utils";
import type { UserRole } from "@/types";

interface DashboardRightPanelProps {
  subtitle?: string;
  children?: React.ReactNode;
}

const ROLE_LABELS: Record<UserRole, string> = {
  admin: "platform admin",
  judge: "genre judge",
  artist: "artist",
};

export function DashboardRightPanel({ subtitle, children }: DashboardRightPanelProps) {
  const { user, userRole } = useAuth();
  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "user";
  const initials = getInitials(displayName);

  return (
    <aside className="dashboard-right-panel hidden w-[348px] shrink-0 flex-col border-l border-white/5 xl:flex">
      <div className="border-b border-white/5 p-8 pt-10">
        <div className="flex items-center gap-6">
          <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-muziika-orange-gradient font-inter text-sm font-semibold text-white">
            {initials}
          </div>
          <div>
            <p className="font-inter text-xl font-medium lowercase tracking-wide text-white">
              {displayName}
            </p>
            <p className="font-inter text-sm lowercase tracking-wide text-muziika-dashboard-muted">
              {subtitle ?? (userRole ? ROLE_LABELS[userRole] : "muziika")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </aside>
  );
}
