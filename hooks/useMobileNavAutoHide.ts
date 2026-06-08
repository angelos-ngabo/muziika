"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SCROLL_DOWN_THRESHOLD = 8;
const TOP_OFFSET = 48;
const BOTTOM_OFFSET = 4;

export function useMobileNavAutoHide(scrollRef: React.RefObject<HTMLElement | null>) {
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

  const showNav = useCallback(() => {
    clearShowTimer();
    setVisible(true);
  }, [clearShowTimer, setVisible]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const current = el.scrollTop;
      const maxScroll = Math.max(0, el.scrollHeight - el.clientHeight);
      const atTop = current <= TOP_OFFSET;
      const atBottom = maxScroll - current <= BOTTOM_OFFSET;
      const delta = current - lastScrollTop.current;
      const scrollingUp = delta < 0;
      const scrollingDown = delta > SCROLL_DOWN_THRESHOLD;

      if (atTop) {
        clearShowTimer();
        setVisible(true);
        lastScrollTop.current = current;
        return;
      }

      if (atBottom) {
        if (scrollingUp) {
          showNav();
        } else if (scrollingDown) {
          clearShowTimer();
          setVisible(false);
        }
        lastScrollTop.current = current;
        return;
      }

      if (scrollingDown) {
        clearShowTimer();
        setVisible(false);
      } else if (scrollingUp) {
        showNav();
      }

      lastScrollTop.current = current;
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      clearShowTimer();
    };
  }, [scrollRef, clearShowTimer, showNav, setVisible]);

  return navVisible;
}
