"use client";

import { useDashboardMobile, getTabsForRole, TAB_LABELS } from "@/context/DashboardMobileContext";
import { cn } from "@/lib/utils";

export function DashboardTabNav() {
  const { role, activeTab, setActiveTab } = useDashboardMobile();
  const tabs = getTabsForRole(role);

  return (
    <nav className="sticky top-[60px] z-[199] flex h-12 shrink-0 overflow-x-auto border-b border-white/10 bg-[#0a0a0a]/35 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={cn(
              "mobile-tap flex h-full shrink-0 items-center whitespace-nowrap border-b-2 px-5 font-space text-[11px] font-semibold uppercase tracking-[0.08em]",
              isActive
                ? "border-[#FF6B00] text-[#FF6B00]"
                : "border-transparent text-[#555555]"
            )}
          >
            {TAB_LABELS[tab]}
          </button>
        );
      })}
    </nav>
  );
}
