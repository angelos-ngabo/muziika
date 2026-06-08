"use client";

import { useDashboardMobile } from "@/context/DashboardMobileContext";
import { MobileCardSkeleton } from "@/components/mobile/MobileSkeleton";
import { SubmissionStatusBadge } from "@/components/dashboard/artist-dashboard-utils";
import { getInitials } from "@/lib/utils";
import type { Judge, Submission } from "@/types";
import { cn } from "@/lib/utils";

interface MobileJudgeDashboardProps {
  judge: Judge | null;
  submission: Submission | null;
  submissions: Submission[];
  currentIndex: number;
  loading: boolean;
  submitting: boolean;
  vocalScore: number;
  stageScore: number;
  creativityScore: number;
  notes: string;
  onVocalChange: (v: number) => void;
  onStageChange: (v: number) => void;
  onCreativityChange: (v: number) => void;
  onNotesChange: (v: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
  onSelectSubmission: (index: number) => void;
}

function ScoreSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-space text-[10px] uppercase tracking-[0.08em] text-[#888888]">
          {label}
        </span>
        <span className="font-space text-lg font-extrabold text-[#FF6B00]">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mobile-score-slider w-full"
      />
    </div>
  );
}

function QueueTab({
  judge,
  submission,
  submissions,
  loading,
  submitting,
  vocalScore,
  stageScore,
  creativityScore,
  notes,
  onVocalChange,
  onStageChange,
  onCreativityChange,
  onNotesChange,
  onSubmit,
  onSkip,
}: Omit<MobileJudgeDashboardProps, "currentIndex" | "onSelectSubmission">) {
  const pending = submissions.filter((s) => s.score === 0);
  const reviewed = submissions.filter((s) => s.score > 0).length;
  const total = submissions.length;
  const avgScore = Math.round(((vocalScore + stageScore + creativityScore) / 3) * 10) / 10;

  if (loading) {
    return (
      <div className="px-4 pt-3">
        <MobileCardSkeleton className="h-96" />
      </div>
    );
  }

  if (!submission) {
    return (
      <p className="px-4 py-16 text-center font-space text-sm text-[#888888]">
        No submissions to review in {judge?.genre}
      </p>
    );
  }

  return (
    <div className="pb-4">
      <div className="mx-4 mt-3 flex items-center justify-between rounded-[14px] border border-white/10 dashboard-glass px-4 py-3.5">
        <div>
          <p className="font-space text-[10px] uppercase text-[#555555]">Your Queue</p>
          <p className="mt-0.5 font-space text-[22px] font-extrabold text-white">
            {pending.length}
          </p>
          <p className="font-space text-[11px] text-[#888888]">submissions to review</p>
        </div>
        {judge && (
          <span className="rounded-[50px] border border-[#534AB7] bg-[#1a1a1a] px-4 py-2 font-space text-[11px] font-bold uppercase text-[#AFA9EC]">
            {judge.genre}
          </span>
        )}
      </div>

      <article className="mx-4 mt-0 overflow-hidden rounded-[20px] border border-white/10 dashboard-glass">
        <div className="h-1.5 bg-gradient-to-r from-[#534AB7] to-[#FF6B00]" />

        <div className="p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#534AB7] font-space text-lg font-bold text-white">
              {getInitials(submission.artistName).charAt(0)}
            </span>
            <div>
              <p className="font-space text-base font-extrabold text-white">
                {submission.artistName}
              </p>
              <p className="font-space text-[11px] uppercase text-[#888888]">
                {submission.genre} · {submission.location}
              </p>
            </div>
          </div>

          <a
            href={submission.videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-tap mt-3.5 flex items-center gap-3 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-3.5 no-underline"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FF6B00]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8 5v14l11-7L8 5z" fill="#ffffff" />
              </svg>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-space text-[11px] font-bold uppercase text-white">
                Watch Performance
              </span>
              <span className="block truncate font-space text-[10px] text-[#555555]">
                {submission.videoLink}
              </span>
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#555555]" aria-hidden="true">
              <path d="M14 3h7v7M10 14L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>

          <div className="mt-5 flex flex-col gap-4">
            <ScoreSlider label="Vocal" value={vocalScore} onChange={onVocalChange} />
            <ScoreSlider label="Energy" value={stageScore} onChange={onStageChange} />
            <ScoreSlider label="Creativity" value={creativityScore} onChange={onCreativityChange} />
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#1a1a1a] px-3.5 py-3.5">
            <span className="font-space text-[10px] uppercase text-[#555555]">Avg Score</span>
            <span>
              <span className="font-space text-[32px] font-extrabold text-[#FF6B00]">
                {avgScore}
              </span>
              <span className="font-space text-base text-[#555555]">/10</span>
            </span>
          </div>

          <textarea
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Private notes..."
            className="mt-3 min-h-[72px] w-full resize-none rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] px-3.5 py-3 font-space text-base text-white outline-none placeholder:text-[#555555]"
          />

          <div className="mt-3.5 grid grid-cols-[2fr_1fr] gap-2.5">
            <button
              type="button"
              onClick={onSubmit}
              disabled={submitting || submission.score > 0}
              className="mobile-tap flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#FF6B00] font-space text-[13px] font-bold uppercase text-white disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="mobile-tap h-12 rounded-xl border border-white/10 dashboard-glass font-space text-[13px] uppercase text-[#555555]"
            >
              Skip
            </button>
          </div>
        </div>
      </article>

      <div className="mx-4 mt-3 px-0">
        <div className="flex justify-between">
          <span className="font-space text-[10px] uppercase text-[#555555]">
            {reviewed} of {total} reviewed
          </span>
          <span className="font-space text-[10px] text-[#FF6B00]">
            {total - reviewed} remaining
          </span>
        </div>
        <div className="mt-1.5 h-1 rounded-sm bg-[#1a1a1a]">
          <div
            className="h-full rounded-sm bg-[#FF6B00] transition-all"
            style={{ width: total > 0 ? `${(reviewed / total) * 100}%` : "0%" }}
          />
        </div>
      </div>
    </div>
  );
}

export function MobileJudgeDashboard(props: MobileJudgeDashboardProps) {
  const { activeTab } = useDashboardMobile();
  const { judge, submissions } = props;

  const reviewedSubs = submissions.filter((s) => s.score > 0);
  const avgAll =
    reviewedSubs.length > 0
      ? Math.round(
          (reviewedSubs.reduce((sum, s) => sum + s.score, 0) / reviewedSubs.length) * 10
        ) / 10
      : 0;

  if (activeTab === "queue") {
    return <QueueTab {...props} />;
  }

  if (activeTab === "reviewed") {
    return (
      <div className="mx-4 mt-3 flex flex-col gap-2">
        {reviewedSubs.length > 0 ? (
          reviewedSubs.map((sub) => (
            <article
              key={sub.id}
              className="rounded-xl border border-white/10 dashboard-glass px-3.5 py-3"
            >
              <div className="flex items-center justify-between">
                <p className="font-space text-sm font-bold text-white">{sub.artistName}</p>
                <span className="font-space text-lg font-extrabold text-[#FF6B00]">
                  {sub.score}/10
                </span>
              </div>
              <p className="mt-1 font-space text-[11px] uppercase text-[#888888]">
                {sub.genre} · {sub.title}
              </p>
              {sub.judgeNotes && (
                <p className="mt-2 line-clamp-2 font-space text-xs text-[#888888]">
                  {sub.judgeNotes}
                </p>
              )}
            </article>
          ))
        ) : (
          <p className="py-12 text-center font-space text-sm text-[#888888]">No reviews yet</p>
        )}
      </div>
    );
  }

  if (activeTab === "genre") {
    return (
      <div className="mx-4 mt-3 rounded-[14px] border border-white/10 dashboard-glass p-4">
        <p className="font-space text-[10px] uppercase tracking-[0.1em] text-[#555555]">
          Assigned Genre
        </p>
        {judge ? (
          <>
            <p className="mt-2 font-space text-2xl font-extrabold text-[#AFA9EC]">{judge.genre}</p>
            <p className="mt-2 font-space text-sm text-[#888888]">
              You review {judge.genre} submissions in the pending and approved queue.
            </p>
            <div className="mt-4 rounded-xl border border-[#534AB7]/30 bg-[#534AB7]/10 px-3.5 py-3">
              <p className="font-space text-xs text-[#AFA9EC]">
                {submissions.filter((s) => s.score === 0).length} submissions waiting for your review
              </p>
            </div>
          </>
        ) : (
          <p className="mt-4 font-space text-sm text-[#888888]">Judge profile not found</p>
        )}
      </div>
    );
  }

  if (activeTab === "stats") {
    const pending = submissions.filter((s) => s.score === 0).length;
    return (
      <div className="mx-4 mt-3 grid grid-cols-2 gap-2">
        {[
          { label: "Total Queue", value: submissions.length },
          { label: "Reviewed", value: reviewedSubs.length },
          { label: "Remaining", value: pending },
          { label: "Avg Score", value: avgAll },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 dashboard-glass px-3.5 py-3 text-center"
          >
            <p className="font-space text-[26px] font-extrabold text-white">{stat.value}</p>
            <p className="mt-1 font-space text-[9px] uppercase tracking-[0.1em] text-[#555555]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
