"use client";

import { useEffect, useState, useCallback } from "react";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardSearch } from "@/components/dashboard/DashboardSearch";
import { DashboardSectionTitle } from "@/components/dashboard/DashboardSectionTitle";
import { DashboardTrackRow } from "@/components/dashboard/DashboardTrackRow";
import { DashboardRightPanel } from "@/components/dashboard/DashboardRightPanel";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { getJudgeByUserId, subscribeToSubmissions, submitJudgeReview } from "@/lib/firestore";
import { useAuth } from "@/context/AuthContext";
import { VideoEmbed } from "@/components/VideoEmbed";
import type { Genre, Judge, Submission } from "@/types";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MobileJudgeDashboard } from "@/components/mobile/judge/MobileJudgeDashboard";

function JudgeDashboardContent() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [judge, setJudge] = useState<Judge | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  const [vocalScore, setVocalScore] = useState(5);
  const [stageScore, setStageScore] = useState(5);
  const [creativityScore, setCreativityScore] = useState(5);
  const [notes, setNotes] = useState("");

  const avgScore = Math.round(((vocalScore + stageScore + creativityScore) / 3) * 10) / 10;
  const currentSubmission = submissions[currentIndex] ?? null;
  const reviewedCount = submissions.filter((s) => s.score > 0).length;
  const pendingCount = submissions.filter((s) => s.score === 0).length;

  const loadJudge = useCallback(async () => {
    if (!user) return;
    try {
      setJudge(await getJudgeByUserId(user.uid));
    } catch (error) {
      toast.error((error as Error).message);
    }
  }, [user]);

  useEffect(() => {
    loadJudge();
  }, [loadJudge]);

  useEffect(() => {
    if (!judge) return;
    return subscribeToSubmissions(
      { genre: judge.genre as Genre, status: ["pending", "approved"] },
      (data) => {
        setSubmissions(data);
        setLoading(false);
      },
      (error) => {
        toast.error(error.message);
        setLoading(false);
      }
    );
  }, [judge]);

  useEffect(() => {
    setVocalScore(5);
    setStageScore(5);
    setCreativityScore(5);
    setNotes("");
  }, [currentIndex, currentSubmission?.id]);

  const handleSubmitReview = async () => {
    if (!currentSubmission || !judge) return;
    setSubmitting(true);
    try {
      await submitJudgeReview(
        {
          submissionId: currentSubmission.id,
          vocalScore,
          stageScore,
          creativityScore,
          judgeNotes: notes,
        },
        judge.genre
      );
      toast.success("Review submitted");
      const nextPending = submissions.findIndex((s, i) => i > currentIndex && s.score === 0);
      if (nextPending !== -1) setCurrentIndex(nextPending);
      else {
        const first = submissions.findIndex((s) => s.score === 0);
        setCurrentIndex(first !== -1 ? first : 0);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  const filterText = search.toLowerCase();
  const filtered = submissions.filter(
    (s) =>
      s.artistName.toLowerCase().includes(filterText) ||
      s.title.toLowerCase().includes(filterText)
  );

  const handleSkip = () => {
    const next = submissions.findIndex((s, i) => i > currentIndex && s.score === 0);
    if (next !== -1) setCurrentIndex(next);
    else {
      const first = submissions.findIndex((s) => s.score === 0);
      setCurrentIndex(first !== -1 ? first : 0);
    }
  };

  if (isMobile) {
    return (
      <DashboardShell
        role="judge"
        genre={judge?.genre}
        reviewedCount={reviewedCount}
        pendingCount={pendingCount}
      >
        <MobileJudgeDashboard
          judge={judge}
          submission={currentSubmission}
          submissions={submissions}
          currentIndex={currentIndex}
          loading={loading}
          submitting={submitting}
          vocalScore={vocalScore}
          stageScore={stageScore}
          creativityScore={creativityScore}
          notes={notes}
          onVocalChange={setVocalScore}
          onStageChange={setStageScore}
          onCreativityChange={setCreativityScore}
          onNotesChange={setNotes}
          onSubmit={handleSubmitReview}
          onSkip={handleSkip}
          onSelectSubmission={setCurrentIndex}
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      role="judge"
      genre={judge?.genre}
      reviewedCount={reviewedCount}
      pendingCount={pendingCount}
      rightPanel={
        <DashboardRightPanel subtitle={judge ? `${judge.genre} judge` : "genre judge"}>
          {currentSubmission ? (
            <div className="space-y-6">
              <div>
                <p className="font-inter text-xl font-semibold lowercase tracking-wide text-white">
                  score performance
                </p>
                <p className="mt-1 font-inter text-sm text-muziika-dashboard-muted">
                  {currentSubmission.artistName}
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between font-inter text-sm text-white">
                    <span>vocal / performance</span>
                    <span>{vocalScore}/10</span>
                  </div>
                  <Slider value={[vocalScore]} onValueChange={([v]) => setVocalScore(v)} max={10} step={0.5} className="mt-2" />
                </div>
                <div>
                  <div className="flex justify-between font-inter text-sm text-white">
                    <span>stage presence</span>
                    <span>{stageScore}/10</span>
                  </div>
                  <Slider value={[stageScore]} onValueChange={([v]) => setStageScore(v)} max={10} step={0.5} className="mt-2" />
                </div>
                <div>
                  <div className="flex justify-between font-inter text-sm text-white">
                    <span>creativity</span>
                    <span>{creativityScore}/10</span>
                  </div>
                  <Slider value={[creativityScore]} onValueChange={([v]) => setCreativityScore(v)} max={10} step={0.5} className="mt-2" />
                </div>
              </div>

              <div className="rounded-dashboard-card dashboard-glass-subtle p-4">
                <p className="font-inter text-sm text-muziika-dashboard-muted">average score</p>
                <p className="font-inter text-3xl font-bold text-muziika-purple-light">{avgScore}</p>
                <Progress value={avgScore * 10} className="mt-2" />
              </div>

              <div>
                <label className="font-inter text-sm text-white">private notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Your private review notes..."
                  className="mt-2 border-white/10 bg-white/5 text-white placeholder:text-white/30"
                  rows={4}
                />
              </div>

              <Button
                variant="purple"
                className="w-full rounded-full lowercase"
                onClick={handleSubmitReview}
                disabled={submitting || currentSubmission.score > 0}
              >
                {submitting ? "submitting..." : currentSubmission.score > 0 ? "already reviewed" : "submit review"}
              </Button>
            </div>
          ) : (
            <p className="font-inter text-sm text-muziika-dashboard-muted">
              No submission selected
            </p>
          )}
        </DashboardRightPanel>
      }
    >
      <div className="mb-8 max-w-3xl">
        <DashboardSearch
          placeholder="search performances in your genre"
          value={search}
          onChange={setSearch}
        />
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-64 w-full rounded-dashboard-card bg-white/10" />
          <Skeleton className="h-20 w-full bg-white/5" />
        </div>
      ) : !currentSubmission ? (
        <p className="py-16 text-center font-inter text-muziika-dashboard-muted">
          No submissions to review in {judge?.genre}
        </p>
      ) : (
        <>
          {/* Now playing / video area */}
          <div className="mb-10 overflow-hidden rounded-dashboard-card shadow-dashboard">
            {currentSubmission?.videoLink ? (
              <VideoEmbed
                url={currentSubmission.videoLink}
                title={currentSubmission.title}
                className="rounded-none"
              />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-black/50">
                <p className="text-muziika-dashboard-muted">Video unavailable</p>
              </div>
            )}
          </div>

          <DashboardSectionTitle title="review queue" />
          <div className="mt-4 space-y-1">
            {filtered.map((sub, i) => {
              const realIndex = submissions.indexOf(sub);
              return (
                <DashboardTrackRow
                  key={sub.id}
                  index={i + 1}
                  title={`${sub.artistName} — ${sub.title}`}
                  subtitle={`${sub.genre} · ${sub.location}`}
                  meta={sub.score > 0 ? `${sub.score}/10` : "pending"}
                  active={realIndex === currentIndex}
                  onClick={() => setCurrentIndex(realIndex)}
                />
              );
            })}
          </div>
        </>
      )}
    </DashboardShell>
  );
}

export default function JudgePage() {
  return (
    <ProtectedRoute requiredRole="judge">
      <JudgeDashboardContent />
    </ProtectedRoute>
  );
}
