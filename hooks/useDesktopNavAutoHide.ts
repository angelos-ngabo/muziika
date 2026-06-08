"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_DOWN_THRESHOLD = 8;
const TOP_OFFSET = 24;
const SHOW_DELAY_MS = 200;

export function useDesktopNavAutoHide() {
  const [navVisible, setNavVisible] = useState(true);
  const navVisibleRef = useRef(true);
  const lastScrollTop = useRef(0);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setVisible = useCallback((visible: boolean) => {
    navVisibleRef.current = visible;
    setNavVisible(visible);
  }, []);

  const clearShowTimer = useCallback(() => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY || document.documentElement.scrollTop;
      const delta = current - lastScrollTop.current;
      const scrollingUp = delta < 0;
      const scrollingDown = delta > SCROLL_DOWN_THRESHOLD;
      const atTop = current <= TOP_OFFSET;

      if (atTop) {
        clearShowTimer();
        setVisible(true);
        lastScrollTop.current = current;
        return;
      }

      if (scrollingDown) {
        clearShowTimer();
        setVisible(false);
      } else if (scrollingUp && !navVisibleRef.current && !showTimer.current) {
        showTimer.current = setTimeout(() => {
          setVisible(true);
          showTimer.current = null;
        }, SHOW_DELAY_MS);
      }

      lastScrollTop.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearShowTimer();
    };
  }, [clearShowTimer, setVisible]);

  return navVisible;
}
