"use client";

import { useEffect } from "react";

/** Tracks iOS browser chrome (e.g. Chrome bottom bar) so fixed/flex bottom UI stays visible. */
export function useVisualViewportInsets() {
  useEffect(() => {
    const root = document.documentElement;

    const update = () => {
      const vv = window.visualViewport;
      if (!vv) {
        root.style.setProperty("--mobile-browser-bottom-inset", "0px");
        return;
      }

      const bottomInset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
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
      root.style.removeProperty("--mobile-browser-bottom-inset");
    };
  }, []);
}

export const MOBILE_BOTTOM_NAV_HEIGHT = 72;
export const MOBILE_STATUS_BAR_HEIGHT = 44;
