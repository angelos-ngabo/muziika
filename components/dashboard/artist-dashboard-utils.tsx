import type { SubmissionStatus } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<SubmissionStatus, string> = {
  pending: "bg-muziika-orange/20 text-muziika-orange-light border-muziika-orange/30",
  approved: "bg-green-500/15 text-green-400 border-green-500/30",
  rejected: "bg-red-500/15 text-red-400 border-red-500/30",
  featured: "bg-muziika-orange-accent/20 text-muziika-orange-accent border-muziika-orange-accent/30",
};

interface SubmissionStatusBadgeProps {
  status: SubmissionStatus;
  className?: string;
}

export function SubmissionStatusBadge({ status, className }: SubmissionStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-0.5 font-inter text-xs lowercase tracking-wide",
        STATUS_STYLES[status],
        className
      )}
    >
      {status}
    </span>
  );
}

export function deriveArtistStats(submissions: { status: SubmissionStatus; score: number }[]) {
  return {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved" || s.status === "featured").length,
    scored: submissions.filter((s) => s.score > 0).length,
  };
}
