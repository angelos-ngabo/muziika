"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { DashboardSectionTitle } from "@/components/dashboard/DashboardSectionTitle";
import { DashboardGenreCard } from "@/components/dashboard/DashboardGenreCard";
import { DashboardTrackRow } from "@/components/dashboard/DashboardTrackRow";
import { DashboardRightPanel } from "@/components/dashboard/DashboardRightPanel";
import {
  deriveArtistStats,
  SubmissionStatusBadge,
} from "@/components/dashboard/artist-dashboard-utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { subscribeToArtistSubmissions } from "@/lib/firestore";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";
import type { Submission } from "@/types";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MobileArtistDashboard } from "@/components/mobile/artist/MobileArtistDashboard";

function ArtistDashboardContent() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
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

  const stats = useMemo(() => deriveArtistStats(submissions), [submissions]);

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

  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "Artist";

  if (isMobile) {
    return (
      <DashboardShell role="artist">
        <MobileArtistDashboard
          userName={displayName}
          submissions={submissions}
          loading={loading}
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      role="artist"
      rightPanel={
        <DashboardRightPanel subtitle="artist">
          <p className="mb-4 font-inter text-xl font-semibold lowercase tracking-wide text-muziika-dashboard-muted">
            quick actions
          </p>
          <div className="space-y-3">
            <Button asChild variant="orange" className="w-full rounded-full lowercase">
              <Link to="/artist/dashboard/submit">submit new track</Link>
            </Button>
            <Button asChild variant="outline" className="w-full rounded-full border-muziika-orange/30 lowercase text-white hover:bg-muziika-orange/10">
              <Link to="/artist/dashboard/submissions">view all submissions</Link>
            </Button>
          </div>
          {submissions[0] && (
            <div className="mt-8 rounded-dashboard-card border border-muziika-orange/20 dashboard-glass p-4">
              <p className="font-inter text-xs uppercase tracking-wider text-muziika-dashboard-muted">
                latest submission
              </p>
              <p className="mt-2 font-inter text-base font-medium text-white">{submissions[0].title}</p>
              <div className="mt-3">
                <SubmissionStatusBadge status={submissions[0].status} />
              </div>
            </div>
          )}
        </DashboardRightPanel>
      }
    >
      <div className="mb-8 max-w-3xl">
        <DashboardSearch
          placeholder="search your tracks, genres, status"
          value={search}
          onChange={setSearch}
        />
      </div>

      <DashboardSectionTitle title="your stats" />
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardGenreCard label="total submissions" value={stats.total} loading={loading} index={0} />
        <DashboardGenreCard label="pending review" value={stats.pending} loading={loading} index={1} />
        <DashboardGenreCard label="approved" value={stats.approved} loading={loading} index={2} />
        <DashboardGenreCard label="scored by judges" value={stats.scored} loading={loading} index={3} />
      </div>

      <div className="mt-12">
        <DashboardSectionTitle
          title="recent submissions"
          showMoreHref="/artist/dashboard/submissions"
        />
        <div className="mt-4 space-y-1">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[82px] w-full rounded-none bg-white/5" />
            ))
          ) : filtered.length > 0 ? (
            filtered.slice(0, 6).map((sub, i) => (
              <DashboardTrackRow
                key={sub.id}
                index={i + 1}
                title={sub.title}
                subtitle={`${sub.genre} · ${sub.location}`}
                meta={formatDate(sub.createdAt)}
                active={i === 0}
                actions={<SubmissionStatusBadge status={sub.status} />}
              />
            ))
          ) : (
            <div className="rounded-dashboard-card border border-dashed border-muziika-orange/25 py-12 text-center">
              <p className="font-inter text-sm text-muziika-dashboard-muted">
                No submissions yet. Submit your first track to get started.
              </p>
              <Button asChild variant="orange" className="mt-4 rounded-full lowercase">
                <Link to="/artist/dashboard/submit">submit track</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

export default function ArtistDashboardPage() {
  return (
    <ProtectedRoute requiredRole="artist">
      <ArtistDashboardContent />
    </ProtectedRoute>
  );
}
