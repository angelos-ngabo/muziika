"use client";

import { Link } from "react-router-dom";
import { ArtistCard } from "@/components/cards/ArtistCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import type { Submission } from "@/types";

interface FeaturedArtistsProps {
  featured: Submission[];
  loading: boolean;
}

export function FeaturedArtists({ featured, loading }: FeaturedArtistsProps) {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="featured"
      ref={ref}
      className={cn(
        "py-20 transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl tracking-wider text-white md:text-4xl">
              FEATURED <span className="text-muziika-orange">ARTISTS</span>
            </h2>
            <p className="mt-2 font-galindo text-white/60">Hand-picked performances from our judges</p>
          </div>
          <Link
            to="/explore"
            className="hidden font-galindo text-sm text-muziika-orange-accent transition-colors hover:text-muziika-orange sm:inline-block"
          >
            View All →
          </Link>
        </div>

        <div className="mt-10">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {featured.map((sub) => (
                <ArtistCard key={sub.id} submission={sub} />
              ))}
            </div>
          ) : (
            <p className="font-galindo text-white/40">No featured artists yet. Check back soon!</p>
          )}
        </div>
      </div>
    </section>
  );
}
