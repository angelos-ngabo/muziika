"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PublicPageLayout } from "@/components/home/PublicPageLayout";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MobileCardSkeleton } from "@/components/mobile/MobileSkeleton";
import { getSubmissionById } from "@/lib/firestore";
import { getInitials } from "@/lib/utils";
import { VideoEmbed } from "@/components/VideoEmbed";
import type { Submission } from "@/types";
import { toast } from "sonner";

function StatusBadge({ submission }: { submission: Submission }) {
  if (submission.featuredType === "TRENDING") {
    return (
      <span className="rounded-[50px] border border-[#888888] bg-[#1a1a1a] px-3 py-1 text-[10px] font-semibold uppercase text-[#888888]">
        Trending
      </span>
    );
  }
  if (submission.featuredType === "TOP_PERFORMER" || submission.score > 8) {
    return (
      <span className="rounded-[50px] border border-hero-orange bg-[#1a1a1a] px-3 py-1 text-[10px] font-semibold uppercase text-hero-orange">
        Top Performer
      </span>
    );
  }
  if (submission.status === "featured") {
    return (
      <span className="rounded-[50px] bg-hero-orange px-3 py-1 text-[10px] font-semibold uppercase text-white">
        Featured
      </span>
    );
  }
  return (
    <span className="rounded-[50px] border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1 text-[10px] font-semibold uppercase text-[#888888]">
      {submission.status}
    </span>
  );
}

function MobileArtistProfile({ submission }: { submission: Submission }) {
  const navigate = useNavigate();
  const videoHost = submission.videoLink.includes("tiktok") ? "TikTok" : "YouTube";

  return (
    <>
      <header className="bg-[#111111] px-5 pb-5 pt-2">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mobile-tap mb-5 border-none bg-transparent p-0 font-space text-xs uppercase text-[#888888]"
        >
          ← Back
        </button>

        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-[3px] border-hero-orange bg-hero-orange font-space text-[32px] font-bold text-white">
            {getInitials(submission.artistName)}
          </div>
          <div>
            <h1 className="font-space text-[22px] font-extrabold uppercase text-white">
              {submission.artistName}
            </h1>
            <p className="font-space text-[11px] uppercase tracking-[0.06em] text-[#888888]">
              {submission.genre} · {submission.location}
            </p>
            <div className="mt-2">
              <StatusBadge submission={submission} />
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-around border-t border-[#1f1f1f] pt-5">
          <div className="text-center">
            <p className="font-space text-[22px] font-extrabold text-white">{submission.score.toFixed(1)}</p>
            <p className="font-space text-[9px] uppercase tracking-[0.08em] text-[#888888]">Score</p>
          </div>
          <div className="text-center">
            <p className="font-space text-[22px] font-extrabold text-white">1</p>
            <p className="font-space text-[9px] uppercase tracking-[0.08em] text-[#888888]">Performance</p>
          </div>
          <div className="text-center">
            <p className="font-space text-[22px] font-extrabold text-white">{submission.genre.slice(0, 3)}</p>
            <p className="font-space text-[9px] uppercase tracking-[0.08em] text-[#888888]">Genre</p>
          </div>
        </div>
      </header>

      <section className="px-5 py-5">
        <h2 className="font-space text-[11px] font-bold uppercase tracking-[0.12em] text-white">
          Performances
        </h2>

        <article className="mt-4 rounded-2xl bg-[#111111] p-4">
          <div className="relative flex h-[120px] items-center justify-center rounded-xl bg-[#1a1a1a]">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-hero-orange">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8 5v14l11-7L8 5z" fill="#ffffff" />
              </svg>
            </span>
          </div>

          <h3 className="mt-3 font-space text-[15px] font-bold text-white">{submission.title}</h3>

          <div className="mt-2 flex gap-2">
            <span className="rounded-[50px] border border-[#2a2a2a] bg-[#1a1a1a] px-2.5 py-1 font-space text-[10px] uppercase text-[#888888]">
              {submission.genre}
            </span>
            <StatusBadge submission={submission} />
          </div>

          <a
            href={submission.videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-tap mt-3 block w-full rounded-[50px] border border-[#2a2a2a] py-3 text-center font-space text-xs uppercase text-[#888888] no-underline active:border-hero-orange active:text-hero-orange"
          >
            Watch on {videoHost}
          </a>
        </article>
      </section>
    </>
  );
}

export default function ArtistProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const isMobile = useIsMobile();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSubmissionById(id);
        setSubmission(data);
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (isMobile) {
    return (
      <PublicPageLayout>
        {loading ? (
          <div className="p-5">
            <MobileCardSkeleton className="h-64" />
          </div>
        ) : !submission ? (
          <p className="px-5 py-20 font-space text-[#888888]">Artist not found.</p>
        ) : (
          <MobileArtistProfile submission={submission} />
        )}
      </PublicPageLayout>
    );
  }

  return (
    <PublicPageLayout>
      <Link
        to="/explore"
        className="mx-6 mt-24 inline-flex items-center gap-2 font-space text-sm text-[#888888] no-underline transition-colors hover:text-white md:mx-12"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>

      {loading ? (
        <div className="mx-6 mt-8 animate-pulse space-y-6 md:mx-12">
          <div className="h-40 rounded-2xl bg-[#111111]" />
          <div className="h-64 rounded-2xl bg-[#111111]" />
        </div>
      ) : !submission ? (
        <p className="px-6 py-20 font-space text-[#888888] md:px-12">Artist not found.</p>
      ) : (
        <>
          <section className="mt-6 flex flex-col items-start gap-8 border-b border-[#1f1f1f] bg-[#111111] px-6 py-14 md:flex-row md:items-center md:gap-10 md:px-12">
            <div className="flex h-[120px] w-[120px] shrink-0 items-center justify-center rounded-full border-4 border-hero-orange bg-hero-orange text-[48px] font-bold text-white">
              {getInitials(submission.artistName)}
            </div>
            <div>
              <h1 className="text-[32px] font-extrabold uppercase leading-none text-white md:text-[42px]">
                {submission.artistName}
              </h1>
              <p className="mt-2 text-[13px] uppercase tracking-[0.08em] text-[#888888]">
                {submission.genre} · {submission.location}
              </p>
              <div className="mt-4">
                <StatusBadge submission={submission} />
              </div>
              <div className="mt-6 flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-white">{submission.score.toFixed(1)}</p>
                  <p className="text-[11px] uppercase text-[#888888]">Score</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{submission.title.length > 0 ? "1" : "0"}</p>
                  <p className="text-[11px] uppercase text-[#888888]">Performance</p>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-10 md:px-12">
            <h2 className="text-2xl font-extrabold uppercase text-white">Performances</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <article className="overflow-hidden rounded-[20px] border border-[#1f1f1f] bg-[#111111] transition-all duration-200 hover:border-hero-orange">
                <div className="border-b border-[#1f1f1f] p-5">
                  <h3 className="font-bold text-white">{submission.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.06em] text-[#888888]">
                    {submission.genre}
                  </p>
                </div>
                <div className="p-5">
                  {submission.videoLink ? (
                    <VideoEmbed url={submission.videoLink} title={submission.title} />
                  ) : (
                    <p className="text-sm text-[#888888]">No video available</p>
                  )}
                </div>
              </article>
            </div>
          </section>
        </>
      )}
    </PublicPageLayout>
  );
}
