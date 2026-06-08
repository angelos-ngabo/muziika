"use client";

import { useNavigate } from "react-router-dom";

function MusicNoteEmptyIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      className="mx-auto mb-5"
      aria-hidden="true"
    >
      <path d="M9 18V5l12-2v13" stroke="#2a2a2a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="6" cy="18" r="3" stroke="#2a2a2a" strokeWidth="1.5" />
      <circle cx="18" cy="16" r="3" stroke="#2a2a2a" strokeWidth="1.5" />
    </svg>
  );
}

export function ExploreEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="px-5 py-[60px] text-center">
      <MusicNoteEmptyIcon />
      <h2 className="font-space text-lg font-extrabold uppercase text-white">No Artists Yet</h2>
      <p className="mt-2 font-space text-[13px] text-[#888888]">Be the first to submit a performance</p>
      <button
        type="button"
        onClick={() => navigate("/submit")}
        className="mobile-tap mt-6 inline-block rounded-[50px] bg-hero-orange px-8 py-3.5 font-space text-[13px] font-bold uppercase text-white"
      >
        Submit Now →
      </button>
    </div>
  );
}
