"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AudioPlayer } from "@/components/home/AudioPlayer";
import { FloatingArtistCard } from "@/components/home/FloatingArtistCard";
import { HeroSocialIcons } from "@/components/home/HeroSocialIcons";
import { cn } from "@/lib/utils";
import type { Submission } from "@/types";

interface HeroProps {
  topArtist?: Submission | null;
}

function useHeroReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return { ref, visible };
}

const BADGES = [
  { label: "TOP PERFORMER", variant: "dark" as const },
  { label: "FEATURED", variant: "orange" as const },
  { label: "TRENDING", variant: "dark" as const },
];

export function Hero({ topArtist }: HeroProps) {
  const left = useHeroReveal(0);
  const right = useHeroReveal(150);
  const badges = useHeroReveal(400);
  const artistCard = useHeroReveal(500);
  const audio = useHeroReveal(600);

  return (
    <section className="relative grid min-h-[calc(100vh-72px)] grid-cols-1 items-center overflow-visible px-6 md:grid-cols-2 md:px-12">
      {/* LEFT COLUMN */}
      <div
        ref={left.ref}
        className={cn(
          "py-12 pr-0 transition-all duration-500 ease-out md:py-0 md:pr-[60px]",
          left.visible ? "translate-x-0 opacity-100" : "-translate-x-[30px] opacity-0"
        )}
      >
        <h1 className="text-[44px] font-extrabold uppercase leading-none tracking-[-0.02em] md:text-[72px]">
          <span className="block text-white">Discover</span>
          <span className="block text-white">Rwanda&apos;s Next</span>
          <span className="block text-hero-orange">Stars</span>
        </h1>

        <p className="mt-6 max-w-[420px] text-[13px] font-medium uppercase leading-[1.6] tracking-[0.08em] text-[#888888]">
          Submit your performance. Get discovered.
          <br />
          Rwanda&apos;s music industry is watching.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/explore"
            className="inline-flex items-center justify-center gap-3 rounded-[50px] bg-hero-orange px-9 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 ease-in-out hover:scale-[1.02] hover:bg-[#e05e00]"
          >
            Explore Talent
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            to="/submit"
            className="inline-flex items-center justify-center gap-3 rounded-[50px] border-2 border-white bg-transparent px-9 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 ease-in-out hover:border-hero-orange hover:text-hero-orange"
          >
            Submit Now
            <span className="text-hero-orange" aria-hidden="true">
              ♪
            </span>
          </Link>
        </div>

        <HeroSocialIcons />
      </div>

      {/* RIGHT COLUMN — card stack wrapper */}
      <div
        ref={right.ref}
        className={cn(
          "relative flex items-center justify-center overflow-visible py-8 md:py-0",
          right.visible ? "translate-x-0 opacity-100" : "translate-x-[30px] opacity-0",
          "transition-all duration-500 ease-out"
        )}
      >
        <div className="relative mx-auto h-[360px] w-full max-w-[340px] md:h-[480px] md:w-[560px]">
          {/* LISTEN / SUBMIT circles */}
          <div
            className="absolute left-[40%] top-[-30px] z-30 hidden -translate-x-1/2 md:block"
            aria-hidden="true"
          >
            <div className="relative h-[80px] w-[130px]">
              <div className="absolute left-0 top-0 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-[#333333] bg-[#1a1a1a]">
                <span className="text-[9px] font-bold uppercase tracking-[0.1em]">Listen</span>
                <span className="mt-1 h-2 w-2 rounded-full bg-hero-orange" />
              </div>
              <div className="absolute left-[50px] top-1 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-[#333333] bg-[#222222]">
                <span className="text-[9px] font-bold uppercase tracking-[0.1em]">Submit</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-1">
                  <rect x="4.5" y="1" width="3" height="6" rx="1.5" fill="#FF6B00" />
                  <path d="M3 8h6v1.5H3V8z" fill="#FF6B00" />
                </svg>
              </div>
            </div>
          </div>

          {/* Gray card layer 1 */}
          <div
            className="absolute left-1/2 top-1/2 hidden h-[420px] w-[480px] rounded-[32px] bg-[#2a2a2a] md:block"
            style={{
              zIndex: 0,
              transform: "translate(-50%, -50%) rotate(-10deg) translate(-50px, 15px)",
            }}
            aria-hidden="true"
          />

          {/* Gray card layer 2 */}
          <div
            className="absolute left-1/2 top-1/2 hidden h-[430px] w-[500px] rounded-[32px] bg-[#1f1f1f] md:block"
            style={{
              zIndex: 1,
              transform: "translate(-50%, -50%) rotate(-5deg) translate(-25px, 8px)",
            }}
            aria-hidden="true"
          />

          {/* Main orange card */}
          <div
            className="absolute left-1/2 top-1/2 z-[2] flex h-[280px] w-full max-w-[320px] -translate-x-1/2 -translate-y-1/2 rotate-[2deg] items-center justify-center rounded-[32px] bg-hero-orange md:h-[440px] md:w-[520px]"
          >
            <img src="/logo-white.svg" alt="Muziika" className="w-[180px] md:w-[240px]" />
          </div>

          {/* Three dots */}
          <div
            className="absolute right-[-30px] top-1/2 z-[5] hidden -translate-y-1/2 flex-col gap-2 md:flex"
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-2.5 w-2.5 rounded-full bg-[#444444]" />
            ))}
          </div>

          {/* Badge pills */}
          <div
            ref={badges.ref}
            className={cn(
              "absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 md:flex",
              badges.visible ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0",
              "transition-all duration-500 ease-out"
            )}
          >
            {BADGES.map((badge) => (
              <span
                key={badge.label}
                className={cn(
                  "whitespace-nowrap rounded-[50px] px-[18px] py-2 text-xs font-semibold uppercase tracking-[0.06em] shadow-lg",
                  badge.variant === "orange"
                    ? "bg-hero-orange text-white"
                    : "border border-[#333333] bg-[#1a1a1a] text-white"
                )}
              >
                {badge.label}
              </span>
            ))}
          </div>

          {/* Floating artist card */}
          <div
            ref={artistCard.ref}
            className={cn(
              "absolute bottom-[-20px] left-[20px] z-20",
              artistCard.visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              "transition-all duration-500 ease-out"
            )}
          >
            <FloatingArtistCard artistName={topArtist?.artistName} artistId={topArtist?.id} />
          </div>

          {/* Audio player */}
          <div
            ref={audio.ref}
            className={cn(
              "absolute bottom-[-20px] right-[20px] z-20",
              audio.visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              "transition-all duration-500 ease-out"
            )}
          >
            <AudioPlayer />
          </div>
        </div>
      </div>
    </section>
  );
}
