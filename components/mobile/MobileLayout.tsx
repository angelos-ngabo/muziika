"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MobileScrollContext } from "@/context/MobileScrollContext";
import { MobileStatusBar } from "@/components/mobile/MobileStatusBar";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";
import {
  MOBILE_STATUS_BAR_HEIGHT,
  useVisualViewportInsets,
} from "@/hooks/useVisualViewportInsets";

interface MobileLayoutProps {
  children: React.ReactNode;
  hideBottomNav?: boolean;
}

export function MobileLayout({ children, hideBottomNav = false }: MobileLayoutProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [portalReady, setPortalReady] = useState(false);
  useVisualViewportInsets();

  useEffect(() => {
    setPortalReady(true);
  }, []);

  return (
    <MobileScrollContext.Provider value={{ scrollRef }}>
      <div className="mobile-root flex min-h-0 flex-col bg-[#0a0a0a]">
        <MobileStatusBar />

        <div
          ref={scrollRef}
          className="mobile-content min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain"
          style={{
            paddingTop: MOBILE_STATUS_BAR_HEIGHT,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {children}
        </div>

        {portalReady &&
          !hideBottomNav &&
          createPortal(<MobileBottomNav />, document.body)}
      </div>
    </MobileScrollContext.Provider>
  );
}
