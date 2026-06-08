"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { DashboardSectionTitle } from "@/components/dashboard/DashboardSectionTitle";
import { DashboardTrackRow } from "@/components/dashboard/DashboardTrackRow";
import { DashboardRightPanel } from "@/components/dashboard/DashboardRightPanel";
import { SubmissionStatusBadge } from "@/components/dashboard/artist-dashboard-utils";
import { MobileArtistPerformancesList } from "@/components/mobile/artist/MobileArtistPerformancesList";
import { MobileCardSkeleton } from "@/components/mobile/MobileSkeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { subscribeToArtistSubmissions } from "@/lib/firestore";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";
import type { Submission } from "@/types";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/useMediaQuery";

function ArtistSubmissionsContent() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    return subscribeToArtistSubmissions(
      user.uid,
      (data) => {
        setSubmissions(data);
        setLoading(false);
      },
      (error) => {
        toast.error(error.message);
        setLoading(false);
      }
    );
  }, [user?.uid]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return submissions;
    return submissions.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.genre.toLowerCase().includes(q) ||
        s.status.toLowerCase().includes(q)
    );
  }, [submissions, search]);

  if (isMobile) {
    return (
      <DashboardShell role="artist">
        <div className="px-4 pb-4 pt-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mobile-tap mb-3 border-none bg-transparent p-0 font-space text-xs uppercase text-[#888888]"
          >
            ← Back
          </button>
          <h1 className="font-space text-lg font-extrabold text-white">All Submissions</h1>
          {loading ? (
            <MobileCardSkeleton className="mt-4 h-48" />
          ) : (
            <div className="mt-4">
              <MobileArtistPerformancesList submissions={filtered} />
            </div>
          )}
          <button
            type="button"
            onClick={() => navigate("/artist/dashboard/submit")}
            className="mobile-tap mt-4 w-full rounded-xl bg-[#FF6B00] py-3 font-space text-xs font-bold uppercase text-white"
          >
            Submit Another Track
          </button>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      role="artist"
      rightPanel={
        <DashboardRightPanel subtitle="track your submissions">
          <p className="font-inter text-sm leading-relaxed text-muziika-dashboard-muted">
            Monitor review status, scores, and judge feedback for every track you submit.
          </p>
          <Button asChild variant="orange" className="mt-6 w-full rounded-full lowercase">
            <Link to="/artist/dashboard/submit">submit another track</Link>
          </Button>
        </DashboardRightPanel>
      }
    >
      <div className="mb-8 max-w-3xl">
        <DashboardSearch
          placeholder="search by title, genre, or status"
          value={search}
          onChange={setSearch}
        />
      </div>

      <DashboardSectionTitle title="all submissions" />

      <div className="mt-4 space-y-1">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[82px] w-full rounded-none bg-white/5" />
          ))
        ) : filtered.length > 0 ? (
          filtered.map((sub, i) => (
            <DashboardTrackRow
              key={sub.id}
              index={i + 1}
              title={sub.title}
              subtitle={`${sub.genre} · ${sub.location}${sub.score > 0 ? ` · score ${sub.score.toFixed(1)}` : ""}`}
              meta={formatDate(sub.createdAt)}
              actions={
                <div className="flex items-center gap-2">
                  <SubmissionStatusBadge status={sub.status} />
                  <Link
                    to={`/artist/${sub.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-muziika-orange/30 text-muziika-orange transition-colors hover:bg-muziika-orange/10"
                    title="View public profile"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              }
            />
          ))
        ) : (
          <div className="rounded-dashboard-card border border-dashed border-muziika-orange/25 py-12 text-center">
            <p className="font-inter text-sm text-muziika-dashboard-muted">
              You haven&apos;t submitted any tracks yet.
            </p>
            <Button asChild variant="orange" className="mt-4 rounded-full lowercase">
              <Link to="/artist/dashboard/submit">submit your first track</Link>
            </Button>
          </div>
        )}
      </div>

      {filtered.some((s) => s.judgeNotes) && (
        <div className="mt-12">
          <DashboardSectionTitle title="judge feedback" />
          <div className="mt-4 space-y-3">
            {filtered
              .filter((s) => s.judgeNotes)
              .map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-dashboard-card border border-muziika-orange/15 dashboard-glass p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-inter text-sm font-medium text-white">{sub.title}</p>
                    <SubmissionStatusBadge status={sub.status} />
                  </div>
                  <p className="mt-2 font-inter text-sm text-muziika-dashboard-muted">{sub.judgeNotes}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

export default function ArtistSubmissionsPage() {
  return (
    <ProtectedRoute requiredRole="artist">
      <ArtistSubmissionsContent />
    </ProtectedRoute>
  );
}
