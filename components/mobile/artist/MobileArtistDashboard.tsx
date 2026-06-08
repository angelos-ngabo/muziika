"use client";

import { useNavigate } from "react-router-dom";
import { SubmissionStatusBadge, deriveArtistStats } from "@/components/dashboard/artist-dashboard-utils";
import { MobileCardSkeleton } from "@/components/mobile/MobileSkeleton";
import { MobileArtistPerformancesList } from "@/components/mobile/artist/MobileArtistPerformancesList";
import { getInitials } from "@/lib/utils";
import type { Submission } from "@/types";

interface MobileArtistDashboardProps {
  userName: string;
  submissions: Submission[];
  loading: boolean;
}

export function MobileArtistDashboard({
  userName,
  submissions,
  loading,
}: MobileArtistDashboardProps) {
  const navigate = useNavigate();
  const stats = deriveArtistStats(submissions);
  const latest = submissions[0];
  const avgScore =
    submissions.filter((s) => s.score > 0).length > 0
      ? Math.round(
          (submissions.filter((s) => s.score > 0).reduce((sum, s) => sum + s.score, 0) /
            submissions.filter((s) => s.score > 0).length) *
            10
        ) / 10
      : 0;

  if (loading) {
    return (
      <div className="px-4 pt-3">
        <MobileCardSkeleton className="h-48" />
      </div>
    );
  }

  return (
    <div className="px-4 pb-4 pt-3">
      <div className="rounded-2xl border border-white/10 dashboard-glass p-4">
        <div className="flex items-center gap-3.5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-hero-orange font-space text-[22px] font-bold text-white">
            {getInitials(userName).charAt(0)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-space text-base font-extrabold text-white">{userName}</p>
            <p className="mt-0.5 font-space text-[11px] uppercase text-[#888888]">Artist</p>
            {latest && (
              <div className="mt-1.5">
                <SubmissionStatusBadge status={latest.status} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: "Submitted", value: stats.total },
          { label: "Approved", value: stats.approved },
          { label: "Avg Score", value: avgScore || "—" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-[10px] border border-white/10 dashboard-glass px-3 py-2.5 text-center"
          >
            <p className="font-space text-xl font-extrabold text-white">{stat.value}</p>
            <p className="mt-0.5 font-space text-[8px] uppercase tracking-[0.08em] text-[#555555]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate("/artist/dashboard/submit")}
        className="mobile-tap mt-3 w-full rounded-xl bg-[#FF6B00] py-3 font-space text-xs font-bold uppercase text-white"
      >
        Submit New Track
      </button>

      <div className="mt-5 flex items-center justify-between">
        <h2 className="font-space text-[11px] font-bold uppercase tracking-[0.12em] text-white">
          Recent Submissions
        </h2>
        {submissions.length > 0 && (
          <button
            type="button"
            onClick={() => navigate("/artist/dashboard/submissions")}
            className="mobile-tap border-none bg-transparent p-0 font-space text-[10px] text-[#FF6B00]"
          >
            See all →
          </button>
        )}
      </div>

      <div className="mt-3">
        {submissions.length > 0 ? (
          <MobileArtistPerformancesList submissions={submissions.slice(0, 3)} />
        ) : (
          <p className="py-8 text-center font-space text-sm text-[#888888]">
            No submissions yet. Tap Submit in the bottom nav or above to get started.
          </p>
        )}
      </div>
    </div>
  );
}
