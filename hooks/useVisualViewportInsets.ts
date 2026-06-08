"use client";

import { useEffect } from "react";

/** Syncs visual viewport metrics for iOS browser chrome (Chrome/Safari bottom bar). */
export function useVisualViewportInsets() {
  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      const vv = window.visualViewport;
      if (!vv) {
        root.style.setProperty("--mobile-vvh", "100dvh");
        root.style.setProperty("--mobile-browser-bottom-inset", "0px");
        return;
      }

      const bottomInset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      root.style.setProperty("--mobile-vvh", `${vv.height}px`);
      root.style.setProperty("--mobile-browser-bottom-inset", `${bottomInset}px`);
    };

    update();
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      root.style.removeProperty("--mobile-vvh");
      root.style.removeProperty("--mobile-browser-bottom-inset");
    };
  }, []);
}

export const MOBILE_BOTTOM_NAV_HEIGHT = 72;
export const MOBILE_STATUS_BAR_HEIGHT = 44;
