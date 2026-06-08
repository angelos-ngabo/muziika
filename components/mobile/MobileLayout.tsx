"use client";

import { useRef } from "react";
import { MobileScrollContext } from "@/context/MobileScrollContext";
import { MobileStatusBar } from "@/components/mobile/MobileStatusBar";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";
import { useMobileNavAutoHide } from "@/hooks/useMobileNavAutoHide";
import {
  MOBILE_STATUS_BAR_HEIGHT,
  useVisualViewportInsets,
} from "@/hooks/useVisualViewportInsets";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
  hideBottomNav?: boolean;
}

export function MobileLayout({ children, hideBottomNav = false }: MobileLayoutProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navVisible = useMobileNavAutoHide(scrollRef);
  useVisualViewportInsets();

  return (
    <MobileScrollContext.Provider value={{ scrollRef }}>
      <div className="mobile-root flex flex-col overflow-hidden bg-[#0a0a0a]">
        <MobileStatusBar visible={navVisible} />

        <div
          ref={scrollRef}
          className="mobile-content min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain"
          style={{
            paddingTop: navVisible ? MOBILE_STATUS_BAR_HEIGHT : 0,
            WebkitOverflowScrolling: "touch",
            transition: "padding 300ms ease",
          }}
        >
          {children}
        </div>

        {!hideBottomNav && (
          <div
            className={cn(
              "mobile-bottom-nav-wrap shrink-0 overflow-hidden transition-[max-height] duration-300 ease-out",
              navVisible ? "max-h-[160px]" : "max-h-0"
            )}
          >
            <MobileBottomNav />
          </div>
        )}
      </div>
    </MobileScrollContext.Provider>
  );
}
