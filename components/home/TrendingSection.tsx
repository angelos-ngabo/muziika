"use client";

import { ArtistCard } from "@/components/cards/ArtistCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import type { Submission } from "@/types";

interface TrendingSectionProps {
  trending: Submission[];
  loading: boolean;
}

export function TrendingSection({ trending, loading }: TrendingSectionProps) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="trending"
      ref={ref}
      className={cn(
        "py-20 transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-3xl tracking-wider text-white md:text-4xl">
          <span className="text-muziika-orange-accent">TRENDING</span> NOW
        </h2>

        <div className="mt-10">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : trending.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trending.map((sub) => (
                <ArtistCard key={sub.id} submission={sub} />
              ))}
            </div>
          ) : (
            <p className="font-galindo text-white/40">Nothing trending yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
