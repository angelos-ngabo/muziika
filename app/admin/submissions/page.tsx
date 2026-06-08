"use client";

import { Suspense, useState } from "react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { DashboardSectionTitle } from "@/components/dashboard/DashboardSectionTitle";
import { DashboardTrackRow } from "@/components/dashboard/DashboardTrackRow";
import { DashboardRightPanel } from "@/components/dashboard/DashboardRightPanel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSubmissions } from "@/hooks/useSubmissions";
import { updateSubmissionStatus, featureSubmission } from "@/lib/firestore";
import { formatDate } from "@/lib/utils";
import type { FeaturedType } from "@/types";
import { toast } from "sonner";

function AllSubmissionsContent() {
  const { submissions, loading } = useSubmissions();
  const [search, setSearch] = useState("");

  const filterText = search.toLowerCase();
  const filtered = submissions.filter(
    (s) =>
      s.artistName.toLowerCase().includes(filterText) ||
      s.title.toLowerCase().includes(filterText) ||
      s.genre.toLowerCase().includes(filterText)
  );

  const handleApprove = async (id: string) => {
    try {
      await updateSubmissionStatus(id, "approved");
      toast.success("Approved");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateSubmissionStatus(id, "rejected");
      toast.success("Rejected");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleFeature = async (id: string, type: FeaturedType) => {
    try {
      await featureSubmission(id, type);
      toast.success(`Featured as ${type}`);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <DashboardShell
      role="admin"
      rightPanel={
        <DashboardRightPanel subtitle="all submissions">
          <p className="font-inter text-sm text-muziika-dashboard-muted">
            {submissions.length} total entries across all statuses.
          </p>
        </DashboardRightPanel>
      }
    >
      <div className="mb-8 max-w-3xl">
        <DashboardSearch value={search} onChange={setSearch} placeholder="search all submissions" />
      </div>

      <DashboardSectionTitle title="all submissions" />

      <div className="mt-4 space-y-1">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[82px] w-full bg-white/5" />
          ))
        ) : filtered.length > 0 ? (
          filtered.map((sub, i) => (
            <DashboardTrackRow
              key={sub.id}
              index={i + 1}
              title={`${sub.artistName} — ${sub.title}`}
              subtitle={`${sub.genre} · ${sub.status}`}
              meta={formatDate(sub.createdAt)}
              actions={
                sub.status === "pending" ? (
                  <div className="flex gap-1">
                    <Button size="sm" variant="purple" className="h-8 rounded-full text-xs" onClick={() => handleApprove(sub.id)}>
                      approve
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 rounded-full text-xs" onClick={() => handleReject(sub.id)}>
                      reject
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 rounded-full text-xs" onClick={() => handleFeature(sub.id, "FEATURED")}>
                      feature
                    </Button>
                  </div>
                ) : undefined
              }
            />
          ))
        ) : (
          <p className="py-8 text-center font-inter text-sm text-muziika-dashboard-muted">
            No submissions
          </p>
        )}
      </div>
    </DashboardShell>
  );
}

export default function AdminSubmissionsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <Suspense fallback={<div className="min-h-screen bg-muziika-dashboard" />}>
        <AllSubmissionsContent />
      </Suspense>
    </ProtectedRoute>
  );
}
