"use client";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PublicPageLayout } from "@/components/home/PublicPageLayout";
import { PageMiniHero } from "@/components/home/PageMiniHero";
import { ExploreArtistCard, ExploreCardSkeleton } from "@/components/home/ExploreArtistCard";
import { useSubmissions } from "@/hooks/useSubmissions";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { ExploreEmptyState } from "@/components/mobile/explore/ExploreEmptyState";
import { getInitials } from "@/lib/utils";
import type { Genre, Submission } from "@/types";
import { cn } from "@/lib/utils";

const FILTER_LABELS = ["ALL", "R&B", "RAP", "AFROPOP", "GOSPEL", "POP", "SONGWRITING"] as const;

const GENRE_MAP: Record<string, Genre | null> = {
  ALL: null,
  "R&B": "R&B",
  RAP: "Rap",
  AFROPOP: "Afropop",
  GOSPEL: "Gospel",
  POP: "Pop",
  SONGWRITING: "Songwriting",
};

function MobileExploreCard({ submission }: { submission: Submission }) {
  return (
    <Link
      to={`/artist/${submission.id}`}
      className="mobile-tap block overflow-hidden rounded-[20px] border border-[#1f1f1f] bg-[#111111] no-underline"
    >
      <div className="relative flex h-[120px] items-center justify-center bg-[#1a1a1a]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-hero-orange font-space text-xl font-bold text-white">
          {getInitials(submission.artistName)}
        </div>
      </div>
      <div className="p-3">
        <p className="truncate font-space text-sm font-bold text-white">{submission.artistName}</p>
        <p className="mt-0.5 font-space text-[10px] uppercase tracking-[0.06em] text-[#888888]">
          {submission.genre}
        </p>
      </div>
    </Link>
  );
}

export default function ExplorePage() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof FILTER_LABELS)[number]>("ALL");
  const genreFilter = GENRE_MAP[activeFilter] ?? undefined;

  const { submissions, loading } = useSubmissions({
    status: ["approved", "featured"],
    genre: genreFilter ?? undefined,
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return submissions;
    return submissions.filter(
      (s) =>
        s.artistName.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
    );
  }, [submissions, search]);

  if (isMobile) {
    return (
      <PublicPageLayout>
        <div className="sticky top-0 z-[100] w-full border-b border-[#111111] bg-[#0a0a0a] px-5 py-3">
          <div className="relative flex h-10 items-center">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search artists..."
              className="w-full rounded-[14px] border border-[#1f1f1f] bg-[#111111] py-3 pl-11 pr-4 font-space text-base text-white outline-none placeholder:text-[#555555] focus:border-hero-orange"
            />
          </div>
        </div>

        <div className="mobile-scroll-x sticky top-16 z-[99] flex gap-2 overflow-x-auto border-b border-[#111111] bg-[#0a0a0a] px-5 py-3 scrollbar-none">
          {FILTER_LABELS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveFilter(label)}
              className={cn(
                "mobile-tap shrink-0 snap-start rounded-[50px] border px-5 py-2.5 font-space text-[11px] font-semibold uppercase",
                activeFilter === label
                  ? "border-hero-orange bg-hero-orange text-white"
                  : "border-[#1f1f1f] bg-[#111111] text-[#888888]"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <main className="px-5 pb-6 pt-4">
          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="mobile-skeleton-shimmer h-[220px] rounded-[20px]" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((sub) => (
                <MobileExploreCard key={sub.id} submission={sub} />
              ))}
            </div>
          ) : (
            <ExploreEmptyState />
          )}
        </main>
      </PublicPageLayout>
    );
  }

  return (
    <PublicPageLayout>
      <PageMiniHero
        title="Explore Talent"
        subtitle="Discover Rwanda's rising stars across all genres"
      />

      <div className="flex h-14 items-center gap-3 border-b border-[#1f1f1f] bg-[#111111] px-6 md:px-12">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#555555]"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search artists..."
            className="w-[280px] rounded-[50px] border border-[#2a2a2a] bg-[#1a1a1a] py-2.5 pl-11 pr-5 font-space text-sm text-white outline-none transition-colors duration-150 placeholder:text-[#555555] focus:border-hero-orange"
          />
        </div>
        <div className="flex flex-1 gap-2 overflow-x-auto pb-1">
          {FILTER_LABELS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => setActiveFilter(label)}
              className={cn(
                "shrink-0 rounded-[50px] border px-5 py-2 font-space text-xs font-semibold uppercase tracking-[0.06em] transition-all duration-150",
                activeFilter === label
                  ? "border-hero-orange bg-hero-orange text-white"
                  : "border-[#2a2a2a] bg-[#1a1a1a] text-[#888888] hover:border-[#444444]"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <main className="px-6 py-10 md:px-12">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ExploreCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
            {filtered.map((sub) => (
              <ExploreArtistCard key={sub.id} submission={sub} />
            ))}
          </div>
        ) : (
          <p className="font-space text-[#888888]">No artists found.</p>
        )}
      </main>
    </PublicPageLayout>
  );
}
