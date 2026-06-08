"use client";

import { Link } from "react-router-dom";
import { getInitials } from "@/lib/utils";
import type { Submission } from "@/types";
import {
  MobileFeaturedSkeleton,
  MobileLeaderboardSkeleton,
} from "@/components/mobile/MobileSkeleton";

const WAVE_HEIGHTS = [6, 10, 16, 20, 14, 8, 18, 12, 6, 16, 10, 8];

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "GOOD MORNING 🌅";
  if (hour >= 12 && hour < 18) return "GOOD AFTERNOON ☀️";
  return "GOOD EVENING 🌙";
}

function FeaturedStatusBadge({ submission }: { submission: Submission }) {
  if (submission.featuredType === "TRENDING") {
    return (
      <span className="absolute right-2 top-2 rounded-[50px] bg-[#888888] px-2.5 py-1 font-space text-[9px] font-bold uppercase text-white">
        Trending
      </span>
    );
  }
  return (
    <span className="absolute right-2 top-2 rounded-[50px] bg-hero-orange px-2.5 py-1 font-space text-[9px] font-bold uppercase text-white">
      Featured
    </span>
  );
}

function MobileFeaturedCard({ submission }: { submission: Submission }) {
  return (
    <Link
      to={`/artist/${submission.id}`}
      className="mobile-tap relative block min-w-[180px] shrink-0 snap-start overflow-hidden rounded-[20px] border border-[#1f1f1f] bg-[#111111] no-underline"
    >
      <div className="relative flex h-[140px] items-center justify-center bg-[#1a1a1a]">
        <FeaturedStatusBadge submission={submission} />
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-hero-orange font-space text-[22px] font-bold text-white">
          {getInitials(submission.artistName)}
        </div>
      </div>
      <div className="p-3">
        <p className="font-space text-sm font-bold text-white">{submission.artistName}</p>
        <p className="mt-0.5 font-space text-[10px] uppercase tracking-[0.06em] text-[#888888]">
          {submission.genre}
        </p>
      </div>
    </Link>
  );
}

function rankColor(rank: number): string {
  if (rank === 1) return "text-hero-orange";
  if (rank === 2) return "text-[#888888]";
  if (rank === 3) return "text-[#666666]";
  return "text-[#333333]";
}

interface MobileHomePageProps {
  featured: Submission[];
  topPerformers: Submission[];
  loading: boolean;
}

export function MobileHomePage({ featured, topPerformers, loading }: MobileHomePageProps) {
  return (
    <div className="pb-6">
      <section className="relative min-h-[100vw] overflow-hidden bg-[#0a0a0a] px-5 pb-8 pt-6">
        <span
          className="pointer-events-none absolute -right-[60px] -top-10 select-none font-serif text-[300px] leading-none text-[#FF6B00] opacity-[0.04]"
          aria-hidden="true"
        >
          ♪
        </span>

        <div className="relative z-10">
          <div className="mb-8 flex items-center justify-between">
            <p className="font-space text-[11px] uppercase tracking-[0.1em] text-[#888888]">
              {getTimeGreeting()}
            </p>
          </div>

          <h1 className="font-space text-[48px] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-white">
            Discover
          </h1>
          <h1 className="font-space text-[48px] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-white">
            Rwanda&apos;s
          </h1>
          <h1 className="font-space text-[48px] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-hero-orange">
            Next Stars
          </h1>

          <p className="mt-3 font-space text-xs uppercase leading-relaxed tracking-[0.06em] text-[#888888]">
            Rwanda&apos;s first digital talent discovery platform
          </p>

          <div className="relative mt-7 h-[200px] w-full">
            <div
              className="absolute left-1/2 top-2.5 h-[180px] w-[85%] -translate-x-1/2 rotate-[-4deg] rounded-[24px] bg-[#2a2a2a]"
              aria-hidden="true"
            />
            <div
              className="absolute left-1/2 top-[5px] h-[185px] w-[92%] -translate-x-1/2 rotate-[-2deg] rounded-[24px] bg-[#1f1f1f]"
              aria-hidden="true"
            />
            <div className="absolute left-0 top-0 flex h-[190px] w-full items-center justify-center rounded-[24px] bg-hero-orange">
              <img src="/logo-white.svg" alt="Muziika" className="w-[180px]" />
            </div>

            <div className="absolute bottom-[-16px] right-3 flex items-center gap-2.5 rounded-[50px] bg-white px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-hero-orange">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M8 5v14l11-7L8 5z" fill="#ffffff" />
                </svg>
              </span>
              <div className="flex items-end gap-[3px]">
                {WAVE_HEIGHTS.map((h, i) => (
                  <span
                    key={i}
                    className="hero-wave-bar w-[2.5px] rounded-[2px] bg-[#333333]"
                    style={
                      {
                        "--wave-base": `${h}px`,
                        "--wave-peak": `${h + 8}px`,
                        height: `${h}px`,
                        animationDelay: `${i * 0.08}s`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/explore"
              className="mobile-tap flex w-full items-center justify-between rounded-[50px] bg-hero-orange px-7 py-4 font-space text-sm font-bold uppercase tracking-[0.08em] text-white no-underline"
            >
              Explore Talent
              <span>→</span>
            </Link>
            <Link
              to="/submit"
              className="mobile-tap flex w-full items-center justify-between rounded-[50px] border-[1.5px] border-[#2a2a2a] bg-transparent px-7 py-4 font-space text-sm font-bold uppercase text-white no-underline"
            >
              Submit Performance
              <span>♪</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between px-5">
          <h2 className="font-space text-[11px] font-bold uppercase tracking-[0.12em] text-white">
            Featured
          </h2>
          <Link to="/explore" className="font-space text-[11px] uppercase text-hero-orange no-underline">
            See All →
          </Link>
        </div>
        {loading ? (
          <MobileFeaturedSkeleton />
        ) : (
          <div className="mobile-scroll-x flex gap-3 overflow-x-auto px-5 pb-3">
            {(featured.length > 0 ? featured : topPerformers).slice(0, 8).map((sub) => (
              <MobileFeaturedCard key={sub.id} submission={sub} />
            ))}
            {featured.length === 0 && topPerformers.length === 0 && (
              <p className="px-5 font-space text-sm text-[#888888]">No featured artists yet.</p>
            )}
          </div>
        )}
      </section>

      <section className="mt-8 px-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-space text-[11px] font-bold uppercase tracking-[0.12em] text-white">
            Top Performers
          </h2>
          <Link to="/explore" className="font-space text-[11px] uppercase text-hero-orange no-underline">
            See All →
          </Link>
        </div>
        {loading ? (
          <MobileLeaderboardSkeleton />
        ) : (
          <div className="flex flex-col gap-2.5">
            {topPerformers.slice(0, 5).map((sub, i) => {
              const rank = i + 1;
              return (
                <Link
                  key={sub.id}
                  to={`/artist/${sub.id}`}
                  className="mobile-tap flex items-center gap-3.5 rounded-2xl border border-[#1f1f1f] bg-[#111111] px-4 py-3.5 no-underline active:bg-[#161616]"
                >
                  <span className={`min-w-8 font-space text-[22px] font-extrabold ${rankColor(rank)}`}>
                    {rank}
                  </span>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-space text-base font-bold text-white ${
                      rank === 1
                        ? "border-2 border-hero-orange bg-hero-orange"
                        : "border-2 border-[#2a2a2a] bg-[#1a1a1a]"
                    }`}
                  >
                    {getInitials(sub.artistName)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-space text-sm font-bold text-white">{sub.artistName}</p>
                    <p className="font-space text-[11px] uppercase text-[#888888]">{sub.genre}</p>
                  </div>
                  <span className="shrink-0 rounded-[50px] border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1.5 font-space text-[13px] font-bold text-hero-orange">
                    {sub.score.toFixed(1)}
                  </span>
                </Link>
              );
            })}
            {topPerformers.length === 0 && (
              <p className="font-space text-sm text-[#888888]">No scores yet.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
