"use client";

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";
import type { UserRole } from "@/types";

export type AdminTab = "overview" | "pending" | "approved" | "featured" | "judges";
export type JudgeTab = "queue" | "reviewed" | "genre" | "stats";
export type ArtistTab = "overview" | "performances" | "status" | "settings";
export type DashboardTab = AdminTab | JudgeTab | ArtistTab;

const ADMIN_TABS: AdminTab[] = ["overview", "pending", "approved", "featured", "judges"];
const JUDGE_TABS: JudgeTab[] = ["queue", "reviewed", "genre", "stats"];
const ARTIST_TABS: ArtistTab[] = ["overview", "performances", "status", "settings"];

function defaultTabForRole(role: UserRole): DashboardTab {
  if (role === "admin") return "overview";
  if (role === "judge") return "queue";
  return "overview";
}

interface DashboardMobileContextValue {
  role: UserRole;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  contentRef: React.RefObject<HTMLDivElement>;
}

const DashboardMobileContext = createContext<DashboardMobileContextValue | null>(null);

export function DashboardMobileProvider({
  role,
  children,
}: {
  role: UserRole;
  children: ReactNode;
}) {
  const [activeTab, setActiveTabState] = useState<DashboardTab>(() => defaultTabForRole(role));
  const contentRef = useRef<HTMLDivElement>(null);

  const setActiveTab = useCallback((tab: DashboardTab) => {
    setActiveTabState(tab);
    requestAnimationFrame(() => {
      contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, []);

  return (
    <DashboardMobileContext.Provider value={{ role, activeTab, setActiveTab, contentRef }}>
      {children}
    </DashboardMobileContext.Provider>
  );
}

export function useDashboardMobile() {
  const ctx = useContext(DashboardMobileContext);
  if (!ctx) {
    throw new Error("useDashboardMobile must be used within DashboardMobileProvider");
  }
  return ctx;
}

export function getTabsForRole(role: UserRole): DashboardTab[] {
  if (role === "admin") return ADMIN_TABS;
  if (role === "judge") return JUDGE_TABS;
  return ARTIST_TABS;
}

export const TAB_LABELS: Record<DashboardTab, string> = {
  overview: "Overview",
  pending: "Pending",
  approved: "Approved",
  featured: "Featured",
  judges: "Judges",
  queue: "Queue",
  reviewed: "Reviewed",
  genre: "My Genre",
  stats: "Stats",
  performances: "Performances",
  status: "Status",
  settings: "Settings",
};
