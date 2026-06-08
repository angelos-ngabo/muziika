"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}

export function RevealSection({ children, className, id, as: Tag = "section" }: RevealSectionProps) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <Tag
      id={id}
      ref={ref as React.RefObject<HTMLDivElement & HTMLElement>}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}
