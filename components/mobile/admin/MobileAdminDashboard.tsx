"use client";

import { useState } from "react";
import { useDashboardMobile } from "@/context/DashboardMobileContext";
import { MobileAddJudgeSheet } from "@/components/mobile/admin/MobileAddJudgeSheet";
import { getInitials } from "@/lib/utils";
import type { FeaturedType, Judge, Submission } from "@/types";
import { cn } from "@/lib/utils";

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

const STATUS_DOT: Record<string, string> = {
  pending: "bg-[#FF6B00]",
  approved: "bg-[#4ade80]",
  rejected: "bg-[#f87171]",
  featured: "bg-[#534AB7]",
};

const STATUS_TEXT: Record<string, string> = {
  pending: "text-[#FF6B00]",
  approved: "text-[#4ade80]",
  rejected: "text-[#f87171]",
  featured: "text-[#534AB7]",
};

const ACCENT_LINE: Record<string, string> = {
  Pending: "bg-[#FF6B00]",
  Approved: "bg-[#4ade80]",
  Featured: "bg-[#534AB7]",
  Judges: "bg-[#888888]",
};

function CompactStatCard({
  label,
  value,
  loading,
  accentKey,
  icon,
}: {
  label: string;
  value: number;
  loading: boolean;
  accentKey: keyof typeof ACCENT_LINE;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5 rounded-xl border border-white/10 dashboard-glass px-3.5 py-3">
      <div className="flex items-center justify-between">
        <span className="text-[#FF6B00]">{icon}</span>
      </div>
      <p className="mt-1 font-space text-[26px] font-extrabold leading-none text-white">
        {loading ? "—" : value}
      </p>
      <p className="font-space text-[9px] uppercase tracking-[0.1em] text-[#555555]">{label}</p>
      <div className={cn("mt-2 h-0.5 rounded-sm", ACCENT_LINE[accentKey])} />
    </div>
  );
}

function PendingIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7l3-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 20c0-3.314 2.686-6 6-6M16 11a3 3 0 100-6 3 3 0 000 6zM21 20c0-3.314-2.686-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="4" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 8H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07L13 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 3h7v7M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CompactPendingCard({
  submission,
  onApprove,
  onReject,
  onFeature,
}: {
  submission: Submission;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onFeature: (id: string, type: FeaturedType) => void;
}) {
  const [showFeatureMenu, setShowFeatureMenu] = useState(false);
  const [selectedType, setSelectedType] = useState<FeaturedType>("FEATURED");

  const featureOptions: { label: string; value: FeaturedType }[] = [
    { label: "Featured", value: "FEATURED" },
    { label: "Top", value: "TOP_PERFORMER" },
    { label: "Trending", value: "TRENDING" },
  ];

  return (
    <article className="rounded-[14px] border border-white/10 dashboard-glass p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <span className="font-space text-sm font-bold text-white">{submission.artistName}</span>
          <span className="ml-1.5 inline-block rounded-[50px] border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5 font-space text-[9px] uppercase text-[#888888]">
            {submission.genre}
          </span>
        </div>
        <span className="shrink-0 font-space text-[10px] text-[#555555]">
          {formatTimeAgo(submission.createdAt)}
        </span>
      </div>

      <p className="mt-1.5 font-space text-xs italic text-[#888888]">{submission.title}</p>

      <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-[#1a1a1a] px-2.5 py-2">
        <span className="text-[#555555]">
          <LinkIcon />
        </span>
        <span className="max-w-[200px] truncate font-space text-[11px] text-[#888888]">
          {submission.videoLink}
        </span>
        <a
          href={submission.videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 text-[#555555]"
          aria-label="Open video"
        >
          <ExternalIcon />
        </a>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        <button
          type="button"
          onClick={() => onApprove(submission.id)}
          className="mobile-tap flex h-[34px] items-center justify-center gap-1 rounded-lg border border-[rgba(74,222,128,0.2)] bg-[rgba(74,222,128,0.08)] font-space text-[11px] font-bold uppercase text-[#4ade80] active:bg-[rgba(74,222,128,0.15)]"
        >
          <CheckIcon /> Approve
        </button>
        <button
          type="button"
          onClick={() => onReject(submission.id)}
          className="mobile-tap flex h-[34px] items-center justify-center gap-1 rounded-lg border border-[rgba(248,113,113,0.2)] bg-[rgba(248,113,113,0.08)] font-space text-[11px] font-bold uppercase text-[#f87171] active:bg-[rgba(248,113,113,0.15)]"
        >
          <XIcon /> Reject
        </button>
        <button
          type="button"
          onClick={() => setShowFeatureMenu((v) => !v)}
          className="mobile-tap flex h-[34px] items-center justify-center gap-1 rounded-lg border border-[rgba(255,107,0,0.2)] bg-[rgba(255,107,0,0.08)] font-space text-[11px] font-bold uppercase text-[#FF6B00] active:bg-[rgba(255,107,0,0.15)]"
        >
          <StarIcon /> Feature
        </button>
      </div>

      {showFeatureMenu && (
        <div className="mt-1 rounded-[10px] border border-[#2a2a2a] bg-[#1a1a1a] p-2">
          <div className="flex gap-1.5">
            {featureOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedType(opt.value)}
                className={cn(
                  "mobile-tap flex-1 rounded-lg py-2 text-center font-space text-[10px] font-bold uppercase",
                  selectedType === opt.value
                    ? "bg-[#FF6B00] text-white"
                    : "text-[#555555]"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              onFeature(submission.id, selectedType);
              setShowFeatureMenu(false);
            }}
            className="mobile-tap mt-2 w-full rounded-lg bg-[#FF6B00] py-2 font-space text-[10px] font-bold uppercase text-white"
          >
            Confirm Feature
          </button>
        </div>
      )}
    </article>
  );
}

interface MobileAdminDashboardProps {
  stats: { total: number; pending: number; approved: number; featured: number };
  statsLoading: boolean;
  pending: Submission[];
  approved: Submission[];
  featured: Submission[];
  recent: Submission[];
  judges: Judge[];
  pendingLoading: boolean;
  assignedBy: string;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onFeature: (id: string, type: FeaturedType) => void;
  onDeleteJudge: (id: string) => void;
  onToggleFeaturedVisibility: (id: string, visible: boolean) => void;
}

export function MobileAdminDashboard({
  stats,
  statsLoading,
  pending,
  approved,
  featured,
  recent,
  judges,
  pendingLoading,
  assignedBy,
  onApprove,
  onReject,
  onFeature,
  onDeleteJudge,
  onToggleFeaturedVisibility,
}: MobileAdminDashboardProps) {
  const { activeTab, setActiveTab } = useDashboardMobile();
  const [judgeSheetOpen, setJudgeSheetOpen] = useState(false);

  const quickActions = [
    {
      label: "Review Queue",
      sub: "Pending reviews",
      tab: "pending" as const,
      icon: <ClipboardIcon />,
    },
    {
      label: "Feature Artists",
      sub: "Manage homepage",
      tab: "featured" as const,
      icon: <StarIcon size={18} />,
    },
    {
      label: "Manage Judges",
      sub: "Add or remove",
      tab: "judges" as const,
      icon: <UsersIcon />,
    },
    {
      label: "View Approved",
      sub: "All approved",
      tab: "approved" as const,
      icon: <CheckIcon size={18} />,
    },
  ];

  if (activeTab === "overview") {
    return (
      <div>
        <div className="mx-4 mt-3 grid grid-cols-2 gap-2">
          <CompactStatCard
            label="Pending"
            value={stats.pending}
            loading={statsLoading}
            accentKey="Pending"
            icon={<PendingIcon />}
          />
          <CompactStatCard
            label="Approved"
            value={stats.approved}
            loading={statsLoading}
            accentKey="Approved"
            icon={<CheckIcon />}
          />
          <CompactStatCard
            label="Featured"
            value={stats.featured}
            loading={statsLoading}
            accentKey="Featured"
            icon={<StarIcon />}
          />
          <CompactStatCard
            label="Judges"
            value={judges.length}
            loading={false}
            accentKey="Judges"
            icon={<UsersIcon />}
          />
        </div>

        <div className="mx-4 mb-4 mt-0 grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => setActiveTab(action.tab)}
              className="mobile-tap flex items-center gap-2.5 rounded-xl border border-white/10 dashboard-glass px-3 py-3.5 text-left active:bg-[#161616]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-[#FF6B00]">
                {action.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-space text-xs font-bold text-white">{action.label}</span>
                <span className="block font-space text-[10px] text-[#555555]">{action.sub}</span>
              </span>
              <span className="text-[#333333]">
                <ChevronRightIcon />
              </span>
            </button>
          ))}
        </div>

        <div className="mx-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-space text-[10px] uppercase tracking-[0.1em] text-[#555555]">
              Recent
            </span>
            <button
              type="button"
              onClick={() => setActiveTab("pending")}
              className="mobile-tap border-none bg-transparent p-0 font-space text-[10px] text-[#FF6B00]"
            >
              See all →
            </button>
          </div>

          <div className="flex flex-col gap-px">
            {recent.slice(0, 5).map((sub, i, arr) => (
              <div
                key={sub.id}
                className={cn(
                  "flex items-center gap-3 bg-[#111111] px-3.5 py-2.5",
                  i === 0 && "rounded-t-xl",
                  i === arr.length - 1 && "rounded-b-xl"
                )}
              >
                <span className={cn("h-2 w-2 shrink-0 rounded-full", STATUS_DOT[sub.status])} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-space text-[13px] font-semibold text-white">
                    {sub.artistName}
                  </p>
                  <p className="mt-0.5 font-space text-[10px] text-[#555555]">
                    {sub.genre} · {formatTimeAgo(sub.createdAt)}
                  </p>
                </div>
                <span
                  className={cn(
                    "shrink-0 font-space text-[9px] font-bold uppercase tracking-[0.08em]",
                    STATUS_TEXT[sub.status]
                  )}
                >
                  {sub.status}
                </span>
              </div>
            ))}
            {recent.length === 0 && (
              <p className="py-8 text-center font-space text-sm text-[#888888]">No activity yet</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "pending") {
    return (
      <div className="mx-4 mt-3 flex flex-col gap-2">
        {pendingLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mobile-skeleton-shimmer h-40 rounded-[14px]" />
          ))
        ) : pending.length > 0 ? (
          pending.map((sub) => (
            <CompactPendingCard
              key={sub.id}
              submission={sub}
              onApprove={onApprove}
              onReject={onReject}
              onFeature={onFeature}
            />
          ))
        ) : (
          <p className="py-12 text-center font-space text-sm text-[#888888]">No pending submissions</p>
        )}
      </div>
    );
  }

  if (activeTab === "approved") {
    return (
      <div className="mx-4 mt-3 flex flex-col gap-2">
        {approved.length > 0 ? (
          approved.map((sub) => (
            <article
              key={sub.id}
              className="rounded-[14px] border border-white/10 dashboard-glass p-3.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-space text-sm font-bold text-white">{sub.artistName}</p>
                  <p className="mt-0.5 font-space text-[10px] uppercase text-[#888888]">
                    {sub.genre} · {sub.location}
                  </p>
                </div>
                <span className="font-space text-[9px] font-bold uppercase text-[#4ade80]">
                  approved
                </span>
              </div>
              <p className="mt-2 font-space text-xs italic text-[#888888]">{sub.title}</p>
              {sub.score > 0 && (
                <p className="mt-2 font-space text-sm font-bold text-[#FF6B00]">
                  {sub.score}/10
                </p>
              )}
            </article>
          ))
        ) : (
          <p className="py-12 text-center font-space text-sm text-[#888888]">No approved submissions</p>
        )}
      </div>
    );
  }

  if (activeTab === "featured") {
    return (
      <div className="mx-4 mt-3 flex flex-col gap-2">
        {featured.length > 0 ? (
          featured.map((sub) => (
            <article
              key={sub.id}
              className="flex items-center gap-3 rounded-xl border border-white/10 dashboard-glass px-3.5 py-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#534AB7] font-space text-xs font-bold text-white">
                {getInitials(sub.artistName).charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-space text-[13px] font-bold text-white">
                  {sub.artistName}
                </p>
                <p className="font-space text-[10px] uppercase text-[#888888]">
                  {sub.featuredType ?? "FEATURED"}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onToggleFeaturedVisibility(sub.id, sub.featuredVisible === false)
                }
                className={cn(
                  "mobile-tap rounded-lg px-2.5 py-1 font-space text-[9px] font-bold uppercase",
                  sub.featuredVisible !== false
                    ? "border border-[#4ade80]/30 bg-[#4ade80]/10 text-[#4ade80]"
                    : "border border-[#555555]/30 text-[#555555]"
                )}
              >
                {sub.featuredVisible !== false ? "Visible" : "Hidden"}
              </button>
            </article>
          ))
        ) : (
          <p className="py-12 text-center font-space text-sm text-[#888888]">No featured artists</p>
        )}
      </div>
    );
  }

  if (activeTab === "judges") {
    return (
      <>
        <div className="mx-4 mt-3 flex flex-col gap-2">
          {judges.map((judge) => (
            <article
              key={judge.id}
              className="flex items-center gap-3 rounded-xl border border-white/10 dashboard-glass px-3.5 py-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#534AB7] font-space text-sm font-bold text-white">
                {getInitials(judge.name).charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-space text-[13px] font-bold text-white">{judge.name}</p>
                <span className="mt-0.5 inline-block rounded-[50px] border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-0.5 font-space text-[9px] uppercase text-[#888888]">
                  {judge.genre}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onDeleteJudge(judge.id)}
                className="mobile-tap flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg border border-[rgba(248,113,113,0.15)] bg-[rgba(248,113,113,0.08)] text-[#f87171]"
                aria-label={`Remove ${judge.name}`}
              >
                <XIcon size={14} />
              </button>
            </article>
          ))}
          {judges.length === 0 && (
            <p className="py-8 text-center font-space text-sm text-[#888888]">No judges yet</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setJudgeSheetOpen(true)}
          className="mobile-tap mx-4 mt-3 flex items-center justify-center gap-2 rounded-xl border border-[#FF6B00] bg-[#111111] px-3.5 py-3.5 font-space text-xs font-bold uppercase text-[#FF6B00]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add Judge
        </button>

        <MobileAddJudgeSheet
          open={judgeSheetOpen}
          onClose={() => setJudgeSheetOpen(false)}
          assignedBy={assignedBy}
        />
      </>
    );
  }

  return null;
}
