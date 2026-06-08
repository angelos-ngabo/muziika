"use client";

import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return <div className={cn("mobile-skeleton-shimmer rounded-[20px] bg-[#111111]", className)} />;
}

export function MobileFeaturedSkeleton() {
  return (
    <div className="flex gap-3 overflow-hidden px-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <Shimmer key={i} className="h-[240px] min-w-[180px] shrink-0" />
      ))}
    </div>
  );
}

export function MobileLeaderboardSkeleton() {
  return (
    <div className="flex flex-col gap-2.5 px-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Shimmer key={i} className="h-16 w-full rounded-2xl" />
      ))}
    </div>
  );
}

export function MobileGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 px-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <Shimmer key={i} className="h-[220px] w-full" />
      ))}
    </div>
  );
}

export function MobileCardSkeleton({ className }: { className?: string }) {
  return <Shimmer className={cn("h-40 w-full", className)} />;
}
