"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState<"enter" | "active">("active");

  useEffect(() => {
    if (!isMobile) return;
    setPhase("enter");
    const frame = requestAnimationFrame(() => setPhase("active"));
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, isMobile]);

  if (!isMobile) return <>{children}</>;

  return (
    <div
      key={location.pathname}
      className={cn(
        "min-h-full",
        phase === "enter" && "page-enter",
        phase === "active" && "page-enter-active"
      )}
    >
      {children}
    </div>
  );
}
