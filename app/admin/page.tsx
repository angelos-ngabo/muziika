"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { DashboardSectionTitle } from "@/components/dashboard/DashboardSectionTitle";
import { DashboardGenreCard } from "@/components/dashboard/DashboardGenreCard";
import { DashboardTrackRow } from "@/components/dashboard/DashboardTrackRow";
import { DashboardArtistRow } from "@/components/dashboard/DashboardArtistRow";
import { DashboardRightPanel } from "@/components/dashboard/DashboardRightPanel";
import { CreateJudgeDialog } from "@/components/admin/CreateJudgeDialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  subscribeToSubmissionStats,
  subscribeToSubmissions,
  subscribeToAllSubmissions,
  subscribeToJudges,
  updateSubmissionStatus,
  featureSubmission,
  updateFeaturedVisibility,
  updateFeaturedOrder,
  deleteJudge,
} from "@/lib/firestore";
import { useAuth } from "@/context/AuthContext";
import { formatDate } from "@/lib/utils";
import type { FeaturedType, Judge, Submission, SubmissionStats } from "@/types";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MobileAdminDashboard } from "@/components/mobile/admin/MobileAdminDashboard";

function SortableFeaturedItem({
  submission,
  onToggleVisibility,
}: {
  submission: Submission;
  onToggleVisibility: (id: string, visible: boolean) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: submission.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="flex items-center gap-4 rounded-dashboard-card dashboard-glass-subtle px-4 py-3"
    >
      <button {...attributes} {...listeners} className="cursor-grab text-muziika-dashboard-muted">
        <GripVertical className="h-5 w-5" />
      </button>
      <span className="flex-1 font-inter text-sm lowercase text-white">
        {submission.artistName} — {submission.title}
      </span>
      <Badge variant="purple">{submission.featuredType}</Badge>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onToggleVisibility(submission.id, submission.featuredVisible === false)}
      >
        {submission.featuredVisible !== false ? (
          <Eye className="h-4 w-4 text-green-400" />
        ) : (
          <EyeOff className="h-4 w-4 text-red-400" />
        )}
      </Button>
    </div>
  );
}

function AdminDashboardContent() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");

  const [search, setSearch] = useState("");
  const [stats, setStats] = useState<SubmissionStats>({ total: 0, pending: 0, approved: 0, featured: 0 });
  const [statsLoading, setStatsLoading] = useState(true);
  const [pending, setPending] = useState<Submission[]>([]);
  const [pendingLoading, setPendingLoading] = useState(true);
  const [approved, setApproved] = useState<Submission[]>([]);
  const [recent, setRecent] = useState<Submission[]>([]);
  const [featured, setFeatured] = useState<Submission[]>([]);
  const [judges, setJudges] = useState<Judge[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const unsubStats = subscribeToSubmissionStats(
      (data) => {
        setStats(data);
        setStatsLoading(false);
      },
      (error) => toast.error(error.message)
    );
    const unsubPending = subscribeToSubmissions(
      { status: "pending" },
      (data) => {
        setPending(data);
        setPendingLoading(false);
      },
      (error) => toast.error(error.message)
    );
    const unsubApproved = subscribeToSubmissions(
      { status: "approved" },
      (data) => setApproved(data),
      (error) => toast.error(error.message)
    );
    const unsubRecent = subscribeToAllSubmissions(
      (data) => setRecent(data),
      (error) => toast.error(error.message)
    );
    const unsubFeatured = subscribeToSubmissions(
      { status: "featured" },
      (data) => {
        setFeatured([...data].sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999)));
      },
      (error) => toast.error(error.message)
    );
    const unsubJudges = subscribeToJudges(
      (data) => setJudges(data),
      (error) => toast.error(error.message)
    );
    return () => {
      unsubStats();
      unsubPending();
      unsubApproved();
      unsubRecent();
      unsubFeatured();
      unsubJudges();
    };
  }, []);

  const filterText = search.toLowerCase();
  const filteredPending = pending.filter(
    (s) =>
      s.artistName.toLowerCase().includes(filterText) ||
      s.title.toLowerCase().includes(filterText) ||
      s.genre.toLowerCase().includes(filterText)
  );

  const handleApprove = async (id: string) => {
    try {
      await updateSubmissionStatus(id, "approved");
      toast.success("Submission approved");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateSubmissionStatus(id, "rejected");
      toast.success("Submission rejected");
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

  const handleDeleteJudge = async (judgeId: string) => {
    try {
      await deleteJudge(judgeId);
      toast.success("Judge removed");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleToggleVisibility = async (id: string, makeVisible: boolean) => {
    try {
      await updateFeaturedVisibility(id, makeVisible);
      toast.success(makeVisible ? "Visible on homepage" : "Hidden from homepage");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = featured.findIndex((s) => s.id === active.id);
    const newIndex = featured.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(featured, oldIndex, newIndex);
    setFeatured(reordered);
    try {
      await updateFeaturedOrder(reordered.map((s, i) => ({ id: s.id, featuredOrder: i + 1 })));
      toast.success("Featured order saved");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const showJudges = section === "judges";
  const showFeatured = section === "featured";

  if (isMobile) {
    return (
      <DashboardShell role="admin">
        <MobileAdminDashboard
          stats={stats}
          statsLoading={statsLoading}
          pending={filteredPending}
          approved={approved}
          featured={featured}
          recent={recent}
          judges={judges}
          pendingLoading={pendingLoading}
          assignedBy={user?.uid ?? ""}
          onApprove={handleApprove}
          onReject={handleReject}
          onFeature={handleFeature}
          onDeleteJudge={handleDeleteJudge}
          onToggleFeaturedVisibility={handleToggleVisibility}
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      role="admin"
      rightPanel={
        <DashboardRightPanel subtitle="platform admin">
          <p className="mb-4 font-inter text-xl font-semibold lowercase tracking-wide text-muziika-dashboard-muted">
            top judges
          </p>
          <div className="space-y-2">
            {judges.slice(0, 5).map((judge) => (
              <DashboardArtistRow
                key={judge.id}
                name={judge.name}
                subtitle={`${judge.genre} · assigned`}
              />
            ))}
            {judges.length === 0 && (
              <p className="font-inter text-sm text-muziika-dashboard-muted">No judges yet</p>
            )}
          </div>
          {user && (
            <CreateJudgeDialog
              assignedBy={user.uid}
              trigger={
                <Button variant="orange" className="mt-6 w-full rounded-full lowercase">
                  create judge
                </Button>
              }
            />
          )}
        </DashboardRightPanel>
      }
    >
      <div className="mb-8 max-w-3xl">
        <DashboardSearch
          placeholder="search submissions, artists, genres"
          value={search}
          onChange={setSearch}
        />
      </div>

      {!showJudges && !showFeatured && (
        <>
          <DashboardSectionTitle title="discover stats" />
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <DashboardGenreCard label="total submissions" value={stats.total} loading={statsLoading} index={0} />
            <DashboardGenreCard label="pending review" value={stats.pending} loading={statsLoading} index={1} />
            <DashboardGenreCard label="approved" value={stats.approved} loading={statsLoading} index={2} />
            <DashboardGenreCard label="featured" value={stats.featured} loading={statsLoading} index={3} />
          </div>

          {user && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-dashboard-card border border-muziika-orange/20 dashboard-glass px-6 py-4">
              <div>
                <p className="font-inter text-base font-medium lowercase text-white">judges</p>
                <p className="font-inter text-sm text-muziika-dashboard-muted">
                  {judges.length} active · provision genre judges for reviews
                </p>
              </div>
              <CreateJudgeDialog assignedBy={user.uid} />
            </div>
          )}

          <div className="mt-12">
            <DashboardSectionTitle title="pending queue" showMoreHref="/admin/submissions" />
            <div className="mt-4 space-y-1">
              {pendingLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-[82px] w-full rounded-none bg-white/5" />
                ))
              ) : filteredPending.length > 0 ? (
                filteredPending.slice(0, 6).map((sub, i) => (
                  <DashboardTrackRow
                    key={sub.id}
                    index={i + 1}
                    title={`${sub.artistName} — ${sub.title}`}
                    subtitle={`${sub.genre} · ${sub.location}`}
                    meta={formatDate(sub.createdAt)}
                    active={i === 0}
                    actions={
                      <div className="flex gap-1">
                        <Button size="sm" variant="purple" className="h-8 rounded-full text-xs" onClick={() => handleApprove(sub.id)}>
                          approve
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 rounded-full text-xs" onClick={() => handleReject(sub.id)}>
                          reject
                        </Button>
                      </div>
                    }
                  />
                ))
              ) : (
                <p className="py-8 text-center font-inter text-sm text-muziika-dashboard-muted">
                  No pending submissions
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {showJudges && (
        <div className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <DashboardSectionTitle title="judges management" />
            {user && (
              <CreateJudgeDialog assignedBy={user.uid} />
            )}
          </div>
          <p className="mt-2 font-inter text-sm text-muziika-dashboard-muted">
            Create judge accounts and assign them to a genre. Judges sign in at /login.
          </p>
          <div className="mt-6 space-y-2">
            {judges.map((judge) => (
              <DashboardArtistRow
                key={judge.id}
                name={judge.name}
                subtitle={`${judge.genre} genre`}
                actions={
                  <Button variant="destructive" size="sm" className="rounded-full" onClick={() => handleDeleteJudge(judge.id)}>
                    delete
                  </Button>
                }
              />
            ))}
            {judges.length === 0 && (
              <div className="rounded-dashboard-card border border-dashed border-muziika-orange/25 py-12 text-center">
                <p className="font-inter text-sm text-muziika-dashboard-muted">No judges yet</p>
                {user && (
                  <div className="mt-4 flex justify-center">
                    <CreateJudgeDialog assignedBy={user.uid} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {showFeatured && (
        <div className="mt-4">
          <DashboardSectionTitle title="featured content" />
          <p className="mt-2 font-inter text-sm text-muziika-dashboard-muted">
            Drag to reorder. Toggle visibility for homepage.
          </p>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={featured.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="mt-6 space-y-2">
                {featured.map((sub) => (
                  <SortableFeaturedItem
                    key={sub.id}
                    submission={sub}
                    onToggleVisibility={handleToggleVisibility}
                  />
                ))}
                {featured.length === 0 && (
                  <p className="font-inter text-sm text-muziika-dashboard-muted">No featured artists</p>
                )}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </DashboardShell>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <Suspense fallback={<div className="min-h-screen bg-muziika-dashboard" />}>
        <AdminDashboardContent />
      </Suspense>
    </ProtectedRoute>
  );
}
