"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { PublicPageLayout } from "@/components/home/PublicPageLayout";
import { RevealSection } from "@/components/shared/RevealSection";
import { MobileHowItWorksAccordion } from "@/components/mobile/submit/MobileHowItWorksAccordion";
import { createSubmission } from "@/lib/firestore";
import { GENRES } from "@/types";
import type { CreateSubmissionInput, Genre } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-[14px] border border-[#2a2a2a] bg-[#111111] px-4 py-3.5 font-space text-base text-white outline-none transition-colors duration-150 placeholder:text-[#555555] focus:border-hero-orange md:rounded-xl md:px-[18px] md:text-sm";

function PersonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="#888888" strokeWidth="1.5" />
      <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MusicNoteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 18V5l12-2v13" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" stroke="#888888" strokeWidth="1.5" />
      <circle cx="18" cy="16" r="3" stroke="#888888" strokeWidth="1.5" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z" stroke="#888888" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="11" r="2.5" stroke="#888888" strokeWidth="1.5" />
    </svg>
  );
}

function MicIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="2" width="6" height="11" rx="3" stroke="#FF6B00" strokeWidth="1.5" />
      <path d="M12 13v4M8 21h8M9 17h6" stroke="#FF6B00" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="#FF6B00" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="#FF6B00" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="#FF6B00" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="#888888" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="#888888" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function YouTubeLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000" />
      <path d="M10 9.5v5l5-2.5-5-2.5z" fill="#ffffff" />
    </svg>
  );
}

function TikTokLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M16 5c.5 1.5 1.5 2.5 3 3v3c-1.5 0-2.5-.5-3-1v5.5a5.5 5.5 0 11-5.5-5.5c.3 0 .7 0 1 .2v3a2.5 2.5 0 102.5 2.5V5h2z"
        fill="#ffffff"
      />
    </svg>
  );
}

function DriveLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 18l-4-7 4-7h8l4 7-4 7H7z" fill="#4285F4" opacity="0.9" />
      <path d="M7 18h10l2-3.5H9L7 18z" fill="#34A853" />
      <path d="M12 4L9 11h8l3-7H12z" fill="#FBBC04" />
    </svg>
  );
}

function SubmitInfoPanel() {
  const steps = [
    { n: 1, bold: "Paste your video link", rest: " — YouTube or TikTok URL" },
    { n: 2, bold: "Add your details", rest: " — name, title, genre, location" },
    { n: 3, bold: "Hit submit", rest: " — judges review your performance" },
  ];

  return (
    <aside className="hidden flex-col justify-center px-6 py-16 lg:flex md:sticky md:top-0 md:h-screen md:px-12 md:py-20 lg:px-12">
      <p className="mb-4 font-space text-[11px] font-semibold uppercase tracking-[0.15em] text-hero-orange">
        Submit Your Performance
      </p>
      <h1 className="font-space text-[40px] font-extrabold uppercase leading-[1.1] text-white md:text-[52px]">
        Get Discovered
      </h1>
      <h1 className="font-space text-[40px] font-extrabold uppercase leading-[1.1] text-hero-orange md:text-[52px]">
        By Rwanda
      </h1>
      <div className="mt-4 h-1 w-[60px] bg-hero-orange" />

      <div className="mt-10 rounded-[20px] border border-[#2a2a2a] bg-[#111111] p-7">
        <p className="mb-5 font-space text-[10px] font-bold uppercase tracking-[0.15em] text-hero-orange">
          How It Works
        </p>
        {steps.map((step) => (
          <div key={step.n} className="mb-4 flex items-start gap-3.5 last:mb-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hero-orange font-space text-[13px] font-bold text-white">
              {step.n}
            </span>
            <p className="font-space text-sm leading-snug">
              <span className="font-semibold text-white">{step.bold}</span>
              <span className="text-[#888888]">{step.rest}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-start gap-3.5 rounded-[14px] border border-[#2a2a2a] bg-[#111111] px-5 py-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-hero-orange bg-[#1a1a1a]">
            <TargetIcon />
          </span>
          <p className="font-space text-xs leading-relaxed">
            <span className="block text-[13px] font-bold text-white">Want to track feedback?</span>
            <Link to="/register" className="cursor-pointer text-hero-orange underline">
              Register as an artist
            </Link>
            <span className="text-[#888888]"> before submitting for a dashboard with scores.</span>
          </p>
        </div>

        <div className="flex items-start gap-3.5 rounded-[14px] border border-[#2a2a2a] bg-[#111111] px-5 py-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#888888] bg-[#1a1a1a]">
            <EyeIcon />
          </span>
          <p className="font-space text-xs leading-relaxed">
            <span className="block text-[13px] font-bold text-white">Just here for exposure?</span>
            <span className="text-[#888888]">
              No account needed — you may appear on Explore or Trending if featured.
            </span>
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-6">
        <div className="flex-1 rounded-xl border border-[#2a2a2a] bg-[#111111] px-5 py-4">
          <p className="font-space text-[28px] font-extrabold text-hero-orange">240+</p>
          <p className="mt-0.5 font-space text-[10px] uppercase tracking-[0.1em] text-[#888888]">
            Artists Submitted
          </p>
        </div>
        <div className="flex-1 rounded-xl border border-[#2a2a2a] bg-[#111111] px-5 py-4">
          <p className="font-space text-[28px] font-extrabold text-hero-orange">18</p>
          <p className="mt-0.5 font-space text-[10px] uppercase tracking-[0.1em] text-[#888888]">
            Featured This Month
          </p>
        </div>
      </div>
    </aside>
  );
}

function SubmitSuccessCard() {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center md:px-10">
      <div className="submit-success-check flex h-20 w-20 items-center justify-center rounded-full bg-hero-orange">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12l5 5L19 7"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className="mt-6 font-space text-2xl font-extrabold uppercase text-white">Submission Received</h2>
      <p className="mt-2 font-space text-sm text-[#888888]">
        Our judges will review your performance and reach out.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-[50px] border border-white px-8 py-3 font-space text-sm font-semibold uppercase tracking-[0.06em] text-white no-underline transition-colors hover:bg-white/10"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default function SubmitPage() {
  const [form, setForm] = useState<CreateSubmissionInput>({
    artistName: "",
    title: "",
    videoLink: "",
    genre: "Pop",
    location: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createSubmission(form);
      toast.success("Performance submitted successfully!");
      setSubmitted(true);
    } catch (error) {
      toast.error((error as Error).message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PublicPageLayout>
      <MobileHowItWorksAccordion />
      <div className="relative min-h-screen overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[42%_58%]">
          <RevealSection as="div" className="relative z-10 hidden lg:block">
            <SubmitInfoPanel />
          </RevealSection>

          <RevealSection as="div" className="relative z-10 flex flex-col justify-center px-5 py-8 md:px-12 md:py-20 lg:px-12">
            <div className="rounded-[24px] border border-[#1f1f1f] bg-[#0f0f0f] p-6 md:p-10">
              {submitted ? (
                <SubmitSuccessCard />
              ) : (
                <>
                  <h2 className="mb-8 flex items-center gap-2.5 font-space text-xl font-bold text-white">
                    <MicIcon />
                    Submit Your Performance
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="artistName" className="mb-2 flex items-center gap-2 font-space text-[11px] font-semibold uppercase tracking-[0.1em] text-[#888888]">
                        <PersonIcon />
                        Artist Name
                      </label>
                      <input
                        id="artistName"
                        value={form.artistName}
                        onChange={(e) => setForm({ ...form, artistName: e.target.value })}
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="title" className="mb-2 flex items-center gap-2 font-space text-[11px] font-semibold uppercase tracking-[0.1em] text-[#888888]">
                        <MusicNoteIcon />
                        Performance Title
                      </label>
                      <input
                        id="title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="videoLink" className="mb-2 flex items-center gap-2 font-space text-[11px] font-semibold uppercase tracking-[0.1em] text-[#888888]">
                        <LinkIcon className="text-[#888888]" />
                        Video Link
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#555555]">
                          <LinkIcon />
                        </span>
                        <input
                          id="videoLink"
                          type="url"
                          value={form.videoLink}
                          onChange={(e) => setForm({ ...form, videoLink: e.target.value })}
                          placeholder="https://youtube.com/watch?v=..."
                          className={cn(inputClass, "pl-11")}
                          required
                        />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="flex items-center gap-1.5 rounded-[50px] border border-[#2a2a2a] bg-[#1a1a1a] px-3.5 py-1.5 font-space text-[11px] text-[#888888]">
                          <YouTubeLogo />
                          YouTube
                        </span>
                        <span className="flex items-center gap-1.5 rounded-[50px] border border-[#2a2a2a] bg-[#1a1a1a] px-3.5 py-1.5 font-space text-[11px] text-[#888888]">
                          <TikTokLogo />
                          TikTok
                        </span>
                        <span className="flex items-center gap-1.5 rounded-[50px] border border-[#2a2a2a] bg-[#1a1a1a] px-3.5 py-1.5 font-space text-[11px] text-[#888888]">
                          <DriveLogo />
                          Drive
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="mb-2 block font-space text-[11px] font-semibold uppercase tracking-[0.1em] text-[#888888]">
                        Genre
                      </span>
                      <div className="grid grid-cols-3 gap-2 md:grid-cols-2 md:gap-2.5">
                        {GENRES.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setForm({ ...form, genre: g as Genre })}
                            className={cn(
                              "rounded-[50px] border px-3 py-3.5 text-center font-space text-xs font-semibold uppercase transition-all duration-150",
                              form.genre === g
                                ? "border-hero-orange bg-hero-orange text-white"
                                : "border-[#2a2a2a] bg-[#111111] text-[#888888] hover:border-[#444444]"
                            )}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="location" className="mb-2 flex items-center gap-2 font-space text-[11px] font-semibold uppercase tracking-[0.1em] text-[#888888]">
                        <MapPinIcon />
                        Location (Optional)
                      </label>
                      <input
                        id="location"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="e.g. Kigali, Rwanda"
                        className={inputClass}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-8 flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[50px] border-none bg-hero-orange py-[18px] font-space text-[15px] font-bold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:scale-[1.01] hover:bg-[#e05e00] disabled:cursor-not-allowed disabled:opacity-60 md:min-h-0"
                    >
                      {submitting ? (
                        <span className="submit-btn-spinner inline-block h-5 w-5 rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <>
                          Submit Performance
                          <ArrowRightIcon />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </RevealSection>
        </div>
      </div>
    </PublicPageLayout>
  );
}
