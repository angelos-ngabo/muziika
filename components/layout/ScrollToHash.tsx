import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "@/lib/navigation";

/** Scroll to hash targets after route changes (e.g. /#featured). */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const timer = window.setTimeout(() => scrollToSection(id), 100);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
