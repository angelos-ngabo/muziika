"use client";

import { SubmissionStatusBadge } from "@/components/dashboard/artist-dashboard-utils";
import type { Submission, SubmissionStatus } from "@/types";
import { cn } from "@/lib/utils";

const STRIP_COLOR: Record<SubmissionStatus, string> = {
  pending: "bg-[#FF6B00]",
  approved: "bg-[#4ade80]",
  rejected: "bg-[#f87171]",
  featured: "bg-[#534AB7]",
};

export function MobileArtistPerformancesList({ submissions }: { submissions: Submission[] }) {
  if (submissions.length === 0) {
    return (
      <p className="py-12 text-center font-space text-sm text-[#888888]">No performances yet</p>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {submissions.map((sub) => (
        <article
          key={sub.id}
          className="overflow-hidden rounded-[14px] border border-[#1f1f1f] bg-[#111111]"
        >
          <div className={cn("h-1", STRIP_COLOR[sub.status])} />
          <div className="p-3.5">
            <div className="flex items-center justify-between">
              <p className="font-space text-sm font-bold text-white">{sub.title}</p>
              <SubmissionStatusBadge status={sub.status} />
            </div>
            <p className="mt-1.5 font-space text-[11px] uppercase text-[#888888]">
              {sub.genre} · {sub.location}
            </p>

            {sub.score > 0 && (
              <div className="mt-2.5">
                <p className="font-space text-[10px] uppercase text-[#555555]">Judge Score</p>
                <p className="font-space text-xl font-extrabold text-[#FF6B00]">
                  {sub.score}
                  <span className="text-xs text-[#555555]">/10</span>
                </p>
              </div>
            )}

            {sub.judgeNotes && (
              <div className="mt-2 rounded-lg bg-[#1a1a1a] px-3 py-2.5">
                <p className="line-clamp-2 font-space text-xs leading-relaxed text-[#888888]">
                  {sub.judgeNotes}
                </p>
              </div>
            )}

            <a
              href={sub.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-tap mt-3 flex h-10 items-center justify-center gap-2 rounded-lg border border-[#2a2a2a] font-space text-[11px] font-bold uppercase text-[#888888] no-underline active:border-[#FF6B00] active:text-[#FF6B00]"
            >
              Watch
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
