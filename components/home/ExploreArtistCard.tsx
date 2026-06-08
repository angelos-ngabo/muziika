"use client";

import { Link } from "react-router-dom";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Submission } from "@/types";

function StatusBadge({ submission }: { submission: Submission }) {
  if (submission.featuredType === "TRENDING") {
    return (
      <span className="rounded-[50px] border border-[#888888] bg-[#1a1a1a] px-3 py-1 text-[10px] font-semibold uppercase text-[#888888]">
        Trending
      </span>
    );
  }
  if (submission.featuredType === "TOP_PERFORMER" || submission.score > 0) {
    return (
      <span className="rounded-[50px] border border-hero-orange bg-[#1a1a1a] px-3 py-1 text-[10px] font-semibold uppercase text-hero-orange">
        Top Performer
      </span>
    );
  }
  if (submission.status === "featured" || submission.featuredType === "FEATURED") {
    return (
      <span className="rounded-[50px] bg-hero-orange px-3 py-1 text-[10px] font-semibold uppercase text-white">
        Featured
      </span>
    );
  }
  return null;
}

export function ExploreArtistCard({ submission }: { submission: Submission }) {
  const initials = getInitials(submission.artistName);

  return (
    <article className="group overflow-hidden rounded-[20px] border border-[#1f1f1f] bg-[#111111] transition-all duration-200 hover:-translate-y-1.5 hover:border-hero-orange">
      <div className="relative flex h-[180px] items-center justify-center bg-[#1a1a1a]">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-hero-orange text-[28px] font-bold text-white">
          {initials}
        </div>
        <span className="absolute right-3 top-3 rounded-[50px] border border-[#2a2a2a] bg-hero-bg px-3 py-1 text-[10px] uppercase text-[#888888]">
          {submission.genre}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-white">{submission.artistName}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.06em] text-[#888888]">
          {submission.genre} · {submission.location}
        </p>
        <div className="mt-3">
          <StatusBadge submission={submission} />
        </div>
        <Link
          to={`/artist/${submission.id}`}
          className="mt-4 block w-full rounded-[50px] border border-[#2a2a2a] py-2.5 text-center text-xs font-semibold uppercase tracking-[0.06em] text-[#888888] no-underline transition-all duration-200 hover:border-hero-orange hover:bg-hero-orange hover:text-white"
        >
          Watch Performance
        </Link>
      </div>
    </article>
  );
}

export function ExploreCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[20px] border border-[#1f1f1f] bg-[#111111]">
      <div className="h-[180px] bg-[#1a1a1a]" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-2/3 rounded bg-[#1a1a1a]" />
        <div className="h-3 w-1/2 rounded bg-[#1a1a1a]" />
        <div className="h-9 w-full rounded-[50px] bg-[#1a1a1a]" />
      </div>
    </div>
  );
}
