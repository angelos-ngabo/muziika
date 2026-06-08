"use client";

import { useState } from "react";

const STEPS = [
  { n: 1, bold: "Paste your video link", rest: " — YouTube or TikTok URL" },
  { n: 2, bold: "Add your details", rest: " — name, title, genre, location" },
  { n: 3, bold: "Hit submit", rest: " — judges review your performance" },
];

export function MobileHowItWorksAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-5 mt-4 rounded-2xl border border-[#1f1f1f] bg-[#111111] md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mobile-tap flex w-full items-center justify-between border-none bg-transparent px-5 py-4"
      >
        <span className="font-space text-xs font-bold uppercase tracking-[0.1em] text-hero-orange">
          How It Works
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className="text-[#888888] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="space-y-4 px-5 pb-4">
          {STEPS.map((step) => (
            <div key={step.n} className="flex items-start gap-3.5">
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
      )}
    </div>
  );
}
