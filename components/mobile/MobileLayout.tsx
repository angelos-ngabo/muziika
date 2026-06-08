"use client";

import { useRef } from "react";
import { MobileScrollContext } from "@/context/MobileScrollContext";
import { MobileStatusBar } from "@/components/mobile/MobileStatusBar";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";
import { useMobileNavAutoHide } from "@/hooks/useMobileNavAutoHide";

interface MobileLayoutProps {
  children: React.ReactNode;
  hideBottomNav?: boolean;
}

export function MobileLayout({ children, hideBottomNav = false }: MobileLayoutProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navVisible = useMobileNavAutoHide(scrollRef);

  return (
    <MobileScrollContext.Provider value={{ scrollRef }}>
      <div className="mobile-root flex h-[100dvh] flex-col overflow-hidden bg-[#0a0a0a]">
        <MobileStatusBar visible={navVisible} />

        <div
          ref={scrollRef}
          className="mobile-content min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain"
          style={{
            paddingTop: navVisible ? 44 : 0,
            paddingBottom: hideBottomNav ? 0 : navVisible ? 72 : 0,
            WebkitOverflowScrolling: "touch",
            transition: "padding 300ms ease",
          }}
        >
          {children}
        </div>

        {!hideBottomNav && <MobileBottomNav visible={navVisible} />}
      </div>
    </MobileScrollContext.Provider>
  );
}
