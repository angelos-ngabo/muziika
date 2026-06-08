"use client";

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function MicIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 13v4M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 7h1M9 11h1M9 15h1M14 7h1M14 11h1M14 15h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GavelIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14 4l6 6-3 3-6-6 3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 19l4-4M8 16l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 14v3a2 2 0 002 2h1M20 14v3a2 2 0 01-2 2h-1M4 14a8 8 0 0116 0" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke="#FF6B00" strokeWidth="1.5" />
      <circle cx="12" cy="18" r="1" fill="#FF6B00" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 16H6l1.5-1.5A4 4 0 019 11V8a3 3 0 116 0v3a4 4 0 01.5 3.5L18 16z" stroke="#FF6B00" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 004 0" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5a11 11 0 0114 0" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.5 16a6 6 0 017 0" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 20h.01" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const MOBILE_STEPS = [
  { n: 1, title: "Submit Link", desc: "Share your YouTube or TikTok performance link" },
  { n: 2, title: "Judges Review", desc: "Genre-assigned judges evaluate your talent" },
  { n: 3, title: "Get Scored", desc: "Receive scores across vocal, energy, and creativity" },
  { n: 4, title: "Get Featured", desc: "Top performers appear on the Muziika homepage" },
];

const MOBILE_FEATURES = [
  { icon: <HeadphonesIcon />, title: "Submit from anywhere", sub: "Paste your link directly on mobile" },
  { icon: <PhoneIcon />, title: "Track your status on the go", sub: "See approvals and features anytime" },
  { icon: <BellIcon />, title: "No desktop needed", sub: "Full platform works on any phone" },
  { icon: <WifiIcon />, title: "Low bandwidth friendly", sub: "We use links not uploads" },
];

const ROLE_CARDS = [
  {
    accent: true,
    icon: <MicIcon className="text-white" />,
    iconBg: "bg-hero-orange",
    title: "Artists",
    sub: "Singers, rappers, and songwriters looking to get discovered",
    bullets: ["Submit performance links", "Get judged by genre experts", "Appear on the homepage if featured"],
    cta: "Submit your talent →",
    href: "/submit",
  },
  {
    accent: false,
    icon: <BuildingIcon className="text-hero-orange" />,
    iconBg: "bg-[#1a1a1a] border border-[#2a2a2a]",
    title: "Industry",
    sub: "Labels, producers and scouts looking for fresh talent",
    bullets: ["Browse curated talent", "Filter by genre", "Contact via platform"],
    cta: "Browse artists →",
    href: "/explore",
  },
  {
    accent: false,
    icon: <GavelIcon className="text-hero-orange" />,
    iconBg: "bg-[#1a1a1a] border border-[#2a2a2a]",
    title: "Judges",
    sub: "Music professionals who evaluate and score submissions",
    bullets: ["Review genre-assigned submissions", "Score vocal, energy, creativity", "Recommend for featuring"],
    cta: "Apply as a judge →",
    href: "/register",
  },
];

export function MobileAboutPage() {
  return (
    <div className="pb-6">
      <section className="px-5 py-8">
        <p className="font-space text-[11px] font-semibold uppercase tracking-[0.15em] text-hero-orange">
          About Muziika
        </p>
        <h1 className="mt-3 font-space text-[36px] font-extrabold uppercase leading-[1.1] text-white">
          Rwanda&apos;s Talent
        </h1>
        <h1 className="font-space text-[36px] font-extrabold uppercase leading-[1.1] text-white">
          Discovery Platform
        </h1>
        <div className="mt-3 h-1 w-[60px] bg-hero-orange" />
        <p className="mt-4 font-space text-[13px] leading-relaxed text-[#888888]">
          We remove the walls between undiscovered talent and the music industry.
        </p>
      </section>

      <section className="grid grid-cols-3 gap-3 px-5 py-6">
        {[
          { num: "240+", label: "Artists submitted" },
          { num: "18", label: "Featured this month" },
          { num: "3", label: "Genres judged" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#1f1f1f] bg-[#111111] px-3 py-4 text-center"
          >
            <p className="font-space text-[26px] font-extrabold text-hero-orange">{stat.num}</p>
            <p className="mt-1 font-space text-[8px] uppercase leading-tight tracking-[0.08em] text-[#888888]">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <section className="bg-[#0f0f0f] px-5 py-8">
        <h2 className="mb-6 font-space text-2xl font-extrabold uppercase text-white">How It Works</h2>
        <div className="flex flex-col">
          {MOBILE_STEPS.map((step, i) => (
            <div key={step.n} className="flex gap-4 pb-6">
              <div className="flex flex-col items-center">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hero-orange font-space text-base font-extrabold text-white">
                  {step.n}
                </span>
                {i < MOBILE_STEPS.length - 1 && (
                  <span className="mt-1 min-h-8 w-0.5 flex-1 bg-[#1f1f1f]" />
                )}
              </div>
              <div className="pt-2">
                <p className="font-space text-[15px] font-bold uppercase text-white">{step.title}</p>
                <p className="mt-1 font-space text-[13px] leading-relaxed text-[#888888]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-8">
        <p className="font-space text-[11px] font-semibold uppercase tracking-[0.15em] text-hero-orange">
          Built For Your Pocket
        </p>
        <h2 className="mt-3 font-space text-[32px] font-extrabold uppercase leading-tight text-white">
          Do Everything
          <br />
          From Your Phone
        </h2>

        <div className="relative mx-auto my-8 h-[460px] w-[240px] overflow-hidden rounded-[44px] border-2 border-[#2a2a2a] bg-[#111111] shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
          <div className="absolute left-1/2 top-0 h-6 w-20 -translate-x-1/2 rounded-b-2xl bg-[#0a0a0a]" />
          <div className="flex h-full flex-col gap-2.5 bg-[#0a0a0a] px-4 pb-4 pt-9">
            <div className="flex items-center justify-between">
              <span className="font-space text-[10px] font-bold text-hero-orange">MUZIIKA</span>
              <span className="text-xs text-[#888888]">···</span>
            </div>
            <div>
              <p className="font-space text-sm font-extrabold text-white">DISCOVER</p>
              <p className="font-space text-sm font-extrabold text-hero-orange">STARS</p>
            </div>
            <div className="flex h-[100px] items-center justify-center rounded-2xl bg-hero-orange">
              <span className="font-space text-xs font-bold text-white">MUZIIKA</span>
            </div>
            {["A", "K"].map((letter) => (
              <div key={letter} className="flex items-center gap-2 rounded-lg bg-[#111111] px-2.5 py-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-hero-orange font-space text-[10px] font-bold text-white">
                  {letter}
                </span>
                <span className="font-space text-[10px] text-white">Artist Name</span>
              </div>
            ))}
            <div className="mt-auto rounded-[50px] bg-hero-orange py-2 text-center font-space text-[10px] font-bold text-white">
              EXPLORE TALENT
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {MOBILE_FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex items-center gap-3.5 rounded-[14px] border border-[#1f1f1f] bg-[#111111] px-4 py-3.5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#1a1a1a]">
                {f.icon}
              </span>
              <div>
                <p className="font-space text-[13px] font-bold text-white">{f.title}</p>
                <p className="mt-0.5 font-space text-[11px] text-[#888888]">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-8">
        <h2 className="mb-5 font-space text-2xl font-extrabold uppercase text-white">Who Is Muziika For?</h2>
        <div className="flex flex-col gap-3">
          {ROLE_CARDS.map((card) => (
            <div
              key={card.title}
              className={cn(
                "rounded-[20px] bg-[#111111] px-5 py-6",
                card.accent ? "border border-hero-orange" : "border border-[#1f1f1f]"
              )}
            >
              <div className="flex items-center gap-3.5">
                <span className={cn("flex h-12 w-12 items-center justify-center rounded-full", card.iconBg)}>
                  {card.icon}
                </span>
                <h3 className="font-space text-lg font-extrabold uppercase text-white">{card.title}</h3>
              </div>
              <p className="mt-3 font-space text-[13px] leading-relaxed text-[#888888]">{card.sub}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {card.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 font-space text-[13px] text-[#cccccc]">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-hero-orange" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                to={card.href}
                className="mt-4 block font-space text-[13px] font-semibold uppercase tracking-[0.06em] text-hero-orange no-underline"
              >
                {card.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#FF6B00] to-[#cc5500] px-5 py-12 text-center">
        <h2 className="font-space text-[36px] font-extrabold uppercase leading-[1.1] text-white">
          Ready To Be
          <br />
          Discovered?
        </h2>
        <p className="mt-3 font-space text-[13px] text-white/75">
          Join hundreds of Rwandan artists already on the platform
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <Link
            to="/submit"
            className="mobile-tap flex h-[52px] items-center justify-center rounded-[50px] bg-white font-space text-[13px] font-bold uppercase text-hero-orange no-underline"
          >
            Submit Performance
          </Link>
          <Link
            to="/explore"
            className="mobile-tap flex h-[52px] items-center justify-center rounded-[50px] border-2 border-white font-space text-[13px] font-bold uppercase text-white no-underline"
          >
            Explore Artists
          </Link>
        </div>
      </section>
    </div>
  );
}
