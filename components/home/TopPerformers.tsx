"use client";

import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { SkeletonRow } from "@/components/ui/SkeletonCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getInitials, stringToColor } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Submission } from "@/types";

interface TopPerformersProps {
  performers: Submission[];
  loading: boolean;
}

export function TopPerformers({ performers, loading }: TopPerformersProps) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="top-performers"
      ref={ref}
      className={cn(
        "bg-white/5 py-20 transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-3xl tracking-wider text-white md:text-4xl">
          TOP <span className="text-muziika-orange">PERFORMERS</span>
        </h2>

        <div className="mt-10 space-y-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
          ) : performers.length > 0 ? (
            performers.map((sub, index) => (
              <Link
                key={sub.id}
                to={`/artist/${sub.id}`}
                className="flex items-center gap-4 rounded-dashboard-card bg-muziika-dashboard-card p-4 transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg"
              >
                <span className="w-8 font-display text-2xl text-muziika-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: stringToColor(sub.artistName) }}
                >
                  {getInitials(sub.artistName)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-galindo text-base text-white">{sub.artistName}</p>
                  <p className="truncate font-galindo text-sm text-white/50">{sub.title}</p>
                </div>
                <span className="font-galindo text-sm text-muziika-orange-accent">
                  {sub.score.toFixed(1)}
                </span>
                <Play className="h-4 w-4 text-white/40" />
              </Link>
            ))
          ) : (
            <p className="font-galindo text-white/40">No scored performances yet.</p>
          )}
        </div>
      </div>
    </section>
  );
}
