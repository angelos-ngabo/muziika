"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardSectionTitle } from "@/components/dashboard/DashboardSectionTitle";
import { DashboardRightPanel } from "@/components/dashboard/DashboardRightPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSubmission } from "@/lib/firestore";
import { useAuth } from "@/context/AuthContext";
import { GENRES } from "@/types";
import type { CreateSubmissionInput, Genre } from "@/types";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

function ArtistSubmitContent() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateSubmissionInput>({
    artistName: user?.name ?? "",
    title: "",
    videoLink: "",
    genre: "Pop",
    location: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;

    setSubmitting(true);
    try {
      await createSubmission({
        ...form,
        artistId: user.uid,
        artistName: form.artistName || user.name || "Artist",
      });
      toast.success("Track submitted for review!");
      setSubmitted(true);
    } catch (error) {
      toast.error((error as Error).message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    if (isMobile) {
      return (
        <DashboardShell role="artist">
          <div className="px-4 py-10 text-center">
            <h1 className="font-space text-2xl font-extrabold text-[#FF6B00]">Submitted!</h1>
            <p className="mt-3 font-space text-sm text-[#888888]">
              Your performance is in the queue.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => navigate("/artist/dashboard/submissions")}
                className="mobile-tap rounded-xl bg-[#FF6B00] py-3 font-space text-xs font-bold uppercase text-white"
              >
                View Submissions
              </button>
              <button
                type="button"
                onClick={() => navigate("/artist/dashboard")}
                className="mobile-tap rounded-xl border border-[#2a2a2a] py-3 font-space text-xs font-bold uppercase text-[#888888]"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </DashboardShell>
      );
    }

    return (
      <DashboardShell
        role="artist"
        rightPanel={<DashboardRightPanel subtitle="submission sent" />}
      >
        <div className="mx-auto max-w-lg py-16 text-center">
          <h1 className="font-display text-4xl text-muziika-orange">SUBMITTED!</h1>
          <p className="mt-4 font-inter text-muziika-dashboard-muted">
            Your performance is in the queue. Track its status from your submissions page.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="orange" className="rounded-full lowercase">
              <Link to="/artist/dashboard/submissions">track submission</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-muziika-orange/30 lowercase text-white">
              <Link to="/artist/dashboard">back to dashboard</Link>
            </Button>
          </div>
        </div>
      </DashboardShell>
    );
  }

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
          <h1 className="font-space text-lg font-extrabold text-white">Submit Track</h1>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {[
              { label: "Artist / Stage Name", key: "artistName" as const, type: "text" },
              { label: "Track Title", key: "title" as const, type: "text" },
              { label: "Video Link", key: "videoLink" as const, type: "url", placeholder: "https://" },
              { label: "Location", key: "location" as const, type: "text", placeholder: "e.g. Kigali" },
            ].map((field) => (
              <div key={field.key}>
                <label className="font-space text-[10px] uppercase tracking-[0.08em] text-[#555555]">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  required
                  placeholder={field.placeholder}
                  className="mt-1.5 w-full rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] px-3.5 py-3 font-space text-base text-white outline-none placeholder:text-[#555555]"
                />
              </div>
            ))}

            <div>
              <label className="font-space text-[10px] uppercase tracking-[0.08em] text-[#555555]">
                Genre
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm({ ...form, genre: g as Genre })}
                    className={cn(
                      "mobile-tap rounded-[50px] border px-3 py-1.5 font-space text-[10px] font-bold uppercase",
                      form.genre === g
                        ? "border-[#FF6B00] bg-[#FF6B00] text-white"
                        : "border-[#2a2a2a] bg-[#1a1a1a] text-[#555555]"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mobile-tap mt-2 w-full rounded-xl bg-[#FF6B00] py-3.5 font-space text-sm font-bold uppercase text-white disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit for Review"}
            </button>
          </form>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      role="artist"
      rightPanel={
        <DashboardRightPanel subtitle="submit track">
          <p className="font-inter text-sm leading-relaxed text-muziika-dashboard-muted">
            Share a video link to your performance. Judges in your genre will review it and you can track progress from your dashboard.
          </p>
        </DashboardRightPanel>
      }
    >
      <DashboardSectionTitle title="submit new track" />

      <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-6">
        <div>
          <Label className="text-white">Artist / Stage Name</Label>
          <Input
            value={form.artistName}
            onChange={(e) => setForm({ ...form, artistName: e.target.value })}
            required
            className="mt-1 border-muziika-orange/20 dashboard-glass text-white"
          />
        </div>
        <div>
          <Label className="text-white">Track Title</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="mt-1 border-muziika-orange/20 dashboard-glass text-white"
          />
        </div>
        <div>
          <Label className="text-white">Video Link (YouTube, etc.)</Label>
          <Input
            type="url"
            value={form.videoLink}
            onChange={(e) => setForm({ ...form, videoLink: e.target.value })}
            required
            placeholder="https://"
            className="mt-1 border-muziika-orange/20 dashboard-glass text-white"
          />
        </div>
        <div>
          <Label className="text-white">Genre</Label>
          <Select value={form.genre} onValueChange={(v) => setForm({ ...form, genre: v as Genre })}>
            <SelectTrigger className="mt-1 border-muziika-orange/20 dashboard-glass text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {GENRES.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-white">Location</Label>
          <Input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
            placeholder="e.g. Kigali, Rwanda"
            className="mt-1 border-muziika-orange/20 dashboard-glass text-white"
          />
        </div>
        <Button type="submit" variant="orange" disabled={submitting} className="rounded-full lowercase">
          {submitting ? "Submitting..." : "submit for review"}
        </Button>
      </form>
    </DashboardShell>
  );
}

export default function ArtistSubmitPage() {
  return (
    <ProtectedRoute requiredRole="artist">
      <ArtistSubmitContent />
    </ProtectedRoute>
  );
}
