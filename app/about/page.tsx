"use client";

import { Link } from "react-router-dom";
import { PublicPageLayout } from "@/components/home/PublicPageLayout";
import { RevealSection } from "@/components/shared/RevealSection";
import { MobileAboutPage } from "@/components/mobile/about/MobileAboutPage";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

function MicIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 13v4M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20c0-3.314 2.686-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 20c0-2.761 1.79-5 4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3l2.4 5.5L20 9.5l-4.2 3.6L17 19l-5-3-5 3 1.2-5.9L4 9.5l5.6-1L12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="#FF6B00" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3" stroke="#FF6B00" strokeWidth="1.5" />
    </svg>
  );
}

function ScoreIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l2.4 5.5L20 9.5l-4.2 3.6L17 19l-5-3-5 3 1.2-5.9L4 9.5l5.6-1L12 3z" stroke="#FF6B00" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 10v4a2 2 0 002 2h1l5 4V6L7 10H6a2 2 0 00-2 2z" stroke="#FF6B00" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 8a4 4 0 010 8M18 6a6.5 6.5 0 010 12" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HeadphonesIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 14v3a2 2 0 002 2h1M20 14v3a2 2 0 01-2 2h-1M4 14a8 8 0 0116 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="18" r="1" fill="currentColor" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M18 16H6l1.5-1.5A4 4 0 019 11V8a3 3 0 116 0v3a4 4 0 01.5 3.5L18 16z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WifiIcon({ className }: { className?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12.5a11 11 0 0114 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.5 16a6 6 0 017 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 20h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 7h1M9 11h1M9 15h1M14 7h1M14 11h1M14 15h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GavelIcon({ className }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M14 4l6 6-3 3-6-6 3-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M5 19l4-4M8 16l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 21l2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FloatingPhoneIcon({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span
      className={cn(
        "absolute z-30 flex h-12 w-12 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#111111] shadow-[0_4px_16px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {children}
    </span>
  );
}

const HOW_STEPS = [
  {
    n: 1,
    icon: <UploadIcon />,
    title: "Submit Link",
    desc: "Share your YouTube or TikTok performance link",
  },
  {
    n: 2,
    icon: <ReviewIcon />,
    title: "Judges Review",
    desc: "Genre-assigned judges evaluate your talent",
  },
  {
    n: 3,
    icon: <ScoreIcon />,
    title: "Get Scored",
    desc: "Receive scores across vocal, energy, creativity",
  },
  {
    n: 4,
    icon: <MegaphoneIcon />,
    title: "Get Featured",
    desc: "Top performers appear on the homepage",
  },
];

const MOBILE_FEATURES = [
  {
    icon: <HeadphonesIcon className="text-hero-orange" />,
    title: "Submit from anywhere",
    sub: "Paste your link from YouTube or TikTok directly on mobile",
  },
  {
    icon: <PhoneIcon className="text-hero-orange" />,
    title: "Track your status on the go",
    sub: "See if you've been approved, featured, or trending — anytime",
  },
  {
    icon: <BellIcon className="text-hero-orange" />,
    title: "No desktop needed",
    sub: "The entire platform — submit, explore, profile — works on any phone",
  },
  {
    icon: <WifiIcon className="text-hero-orange" />,
    title: "Low bandwidth friendly",
    sub: "We don't host videos — just links. Fast on any connection.",
  },
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
    icon: <BuildingIcon className="text-[#888888]" />,
    iconBg: "bg-[#1a1a1a] border border-[#2a2a2a]",
    title: "Industry",
    sub: "Labels, producers and scouts looking for fresh talent",
    bullets: ["Browse curated talent", "Filter by genre", "Contact via platform"],
    cta: "Browse artists →",
    href: "/explore",
  },
  {
    accent: false,
    icon: <GavelIcon className="text-[#888888]" />,
    iconBg: "bg-[#1a1a1a] border border-[#2a2a2a]",
    title: "Judges",
    sub: "Music professionals who evaluate and score submissions",
    bullets: [
      "Review genre-assigned submissions",
      "Score vocal, energy, creativity",
      "Recommend for featuring",
    ],
    cta: "Apply as a judge →",
    href: "/register",
  },
];

export default function AboutPage() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <PublicPageLayout>
        <MobileAboutPage />
      </PublicPageLayout>
    );
  }

  return (
    <PublicPageLayout>
      <RevealSection className="relative z-10 bg-hero-bg px-6 pb-12 pt-4 md:px-12 md:pt-[80px]">
        <h1 className="font-space text-[40px] font-extrabold uppercase leading-none text-white md:text-[56px]">
          About Muziika
        </h1>
        <div className="mt-2 h-1 w-[120px] bg-hero-orange" />
        <p className="mt-4 font-space text-sm uppercase tracking-[0.08em] text-[#888888]">
          Rwanda&apos;s first digital talent discovery platform
        </p>
      </RevealSection>

      <RevealSection className="relative z-10 bg-hero-bg px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="block font-serif text-[120px] leading-[0.8] text-[#FF6B00] opacity-30">&ldquo;</span>
            <p className="max-w-[480px] font-space text-2xl font-bold leading-snug text-white md:text-[28px]">
              We exist to remove the walls between undiscovered talent and the music industry.
            </p>
            <p className="mt-5 font-space text-[13px] uppercase text-[#888888]">— Muziika, 2025</p>
          </div>

          <div className="flex flex-col gap-5">
            {[
              { icon: <MicIcon className="text-white" />, num: "240+", label: "Artists submitted" },
              { icon: <UsersIcon className="text-white" />, num: "18", label: "Featured this month" },
              { icon: <StarIcon className="text-white" />, num: "3", label: "Genres judged" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-5 rounded-2xl border border-[#2a2a2a] bg-[#111111] px-7 py-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-hero-orange">
                  {stat.icon}
                </span>
                <div>
                  <p className="font-space text-[32px] font-extrabold text-white">{stat.num}</p>
                  <p className="font-space text-xs uppercase tracking-[0.08em] text-[#888888]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="relative z-10 bg-[#0f0f0f] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center font-space text-[32px] font-extrabold uppercase text-white md:text-[40px]">
            How Muziika Works
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_STEPS.map((step, i) => (
              <div
                key={step.n}
                className="relative rounded-[20px] border border-[#2a2a2a] bg-[#111111] px-6 py-8 text-center"
              >
                <span className="absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-hero-orange font-space text-[13px] font-bold text-white">
                  {step.n}
                </span>
                <div className="flex justify-center">{step.icon}</div>
                <h3 className="mt-5 font-space text-base font-bold uppercase text-white">{step.title}</h3>
                <p className="mt-2 font-space text-[13px] leading-relaxed text-[#888888]">{step.desc}</p>
                {i < HOW_STEPS.length - 1 && (
                  <span className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 text-xl text-hero-orange lg:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="relative z-10 overflow-visible bg-[#0a0a0a] px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-space text-[11px] font-semibold uppercase tracking-[0.15em] text-hero-orange">
              Built For Your Pocket
            </p>
            <h2 className="font-space text-[32px] font-extrabold uppercase leading-tight text-white md:text-[40px]">
              Don&apos;t Leave Your Phone To Get Discovered
            </h2>
            <div className="mt-4 h-1 w-20 bg-hero-orange" />

            <div className="mt-10 flex flex-col gap-5">
              {MOBILE_FEATURES.map((f) => (
                <div key={f.title} className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#111111]">
                    {f.icon}
                  </span>
                  <div>
                    <p className="font-space text-[15px] font-bold text-white">{f.title}</p>
                    <p className="mt-0.5 font-space text-[13px] text-[#888888]">{f.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-30 mx-auto flex w-full max-w-[320px] items-center justify-center overflow-visible pb-8 pt-4 md:max-w-none">
            <div className="relative h-[540px] w-[280px] overflow-hidden rounded-[44px] border-2 border-[#2a2a2a] bg-[#111111] shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              <div className="absolute left-1/2 top-0 h-7 w-[100px] -translate-x-1/2 rounded-b-[20px] bg-[#0a0a0a]" />
              <div className="flex h-full flex-col gap-3 bg-[#0a0a0a] px-5 pb-5 pt-10">
                <div className="flex items-center justify-between">
                  <span className="font-space text-xs font-bold text-hero-orange">MUZIIKA</span>
                  <span className="text-[#888888]">···</span>
                </div>
                <div>
                  <p className="font-space text-base font-extrabold text-white">DISCOVER</p>
                  <p className="font-space text-base font-extrabold text-hero-orange">STARS</p>
                </div>
                <div className="flex h-[120px] items-center justify-center rounded-2xl bg-hero-orange">
                  <span className="font-space text-sm font-bold text-white">MUZIIKA</span>
                </div>
                {["A", "K"].map((letter) => (
                  <div
                    key={letter}
                    className="flex items-center gap-2 rounded-[10px] bg-[#111111] px-3 py-2.5"
                  >
                    <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-hero-orange font-space text-xs font-bold text-white">
                      {letter}
                    </span>
                    <span className="font-space text-[11px] text-white">Artist Name</span>
                  </div>
                ))}
                <div className="mt-auto rounded-[50px] bg-hero-orange py-2.5 text-center font-space text-[11px] font-bold text-white">
                  EXPLORE TALENT
                </div>
              </div>
            </div>

            <FloatingPhoneIcon className="left-2 top-8 md:left-[-30px] md:top-10">
              <HeadphonesIcon className="text-hero-orange" />
            </FloatingPhoneIcon>
            <FloatingPhoneIcon className="right-2 top-4 md:right-[-30px] md:top-5">
              <MicIcon className="text-hero-orange" />
            </FloatingPhoneIcon>
            <FloatingPhoneIcon className="left-0 top-[42%] text-xl text-hero-orange md:left-[-40px] md:top-[45%]">
              ♪
            </FloatingPhoneIcon>
            <FloatingPhoneIcon className="right-0 top-[38%] md:right-[-40px] md:top-[40%]">
              <PhoneIcon className="text-hero-orange" />
            </FloatingPhoneIcon>
            <FloatingPhoneIcon className="bottom-16 left-4 md:bottom-20 md:left-[-20px]">
              <StarIcon className="text-hero-orange" />
            </FloatingPhoneIcon>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="relative z-10 bg-[#0f0f0f] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-space text-[32px] font-extrabold uppercase text-white md:text-[40px]">
            Who Is Muziika For?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {ROLE_CARDS.map((card) => (
              <div
                key={card.title}
                className={cn(
                  "rounded-[24px] bg-[#111111] px-7 py-9",
                  card.accent ? "border border-hero-orange" : "border border-[#2a2a2a]"
                )}
              >
                <span
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full",
                    card.iconBg
                  )}
                >
                  {card.icon}
                </span>
                <h3 className="mt-5 font-space text-[22px] font-extrabold uppercase text-white">{card.title}</h3>
                <p className="mt-2 font-space text-sm text-[#888888]">{card.sub}</p>
                <ul className="mt-5 space-y-2">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 font-space text-sm text-[#888888]">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hero-orange" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to={card.href}
                  className="mt-5 inline-block font-space text-[13px] text-hero-orange no-underline hover:underline"
                >
                  {card.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      <RevealSection className="relative z-10 bg-gradient-to-br from-[#FF6B00] to-[#cc5500] px-6 py-20 text-center md:px-12">
        <h2 className="font-space text-[36px] font-extrabold uppercase text-white md:text-[48px]">
          Ready To Be Discovered?
        </h2>
        <p className="mt-3 font-space text-base text-white/75">
          Join hundreds of Rwandan artists already on the platform
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/submit"
            className="rounded-[50px] bg-white px-8 py-3.5 font-space text-sm font-bold uppercase tracking-[0.06em] text-hero-orange no-underline transition-transform hover:scale-[1.02]"
          >
            Submit Performance
          </Link>
          <Link
            to="/explore"
            className="rounded-[50px] border-2 border-white px-8 py-3.5 font-space text-sm font-bold uppercase tracking-[0.06em] text-white no-underline transition-colors hover:bg-white/10"
          >
            Explore Artists
          </Link>
        </div>
      </RevealSection>
    </PublicPageLayout>
  );
}
