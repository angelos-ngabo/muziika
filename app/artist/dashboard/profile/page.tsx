"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardSectionTitle } from "@/components/dashboard/DashboardSectionTitle";
import { DashboardRightPanel } from "@/components/dashboard/DashboardRightPanel";
import { MobileCardSkeleton } from "@/components/mobile/MobileSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserById } from "@/lib/firestore";
import { useAuth } from "@/context/AuthContext";
import { formatDate, getInitials } from "@/lib/utils";
import type { User } from "@/types";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/useMediaQuery";

function ArtistProfileContent() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    getUserById(user.uid)
      .then(setProfile)
      .catch((error) => toast.error((error as Error).message))
      .finally(() => setLoading(false));
  }, [user?.uid]);

  const displayName = profile?.stageName || profile?.name || user?.name || "Artist";
  const initials = getInitials(displayName);

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
          <h1 className="font-space text-lg font-extrabold text-white">Account Profile</h1>

          {loading ? (
            <MobileCardSkeleton className="mt-4 h-40" />
          ) : (
            <div className="mt-4 rounded-2xl border border-[#1f1f1f] bg-[#111111] p-4">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#4ade80] font-space text-xl font-bold text-black">
                  {initials.charAt(0)}
                </span>
                <div>
                  <p className="font-space text-base font-bold text-white">{displayName}</p>
                  <p className="font-space text-xs text-[#888888]">{profile?.email ?? user?.email}</p>
                </div>
              </div>
              <div className="mt-4 space-y-3 border-t border-[#1f1f1f] pt-4">
                <div>
                  <p className="font-space text-[10px] uppercase text-[#555555]">Role</p>
                  <p className="font-space text-sm text-[#FF6B00]">Artist</p>
                </div>
                {profile?.createdAt && (
                  <div>
                    <p className="font-space text-[10px] uppercase text-[#555555]">Member since</p>
                    <p className="font-space text-sm text-white">{formatDate(profile.createdAt)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      role="artist"
      rightPanel={
        <DashboardRightPanel subtitle="your profile">
          <p className="font-inter text-sm leading-relaxed text-muziika-dashboard-muted">
            This is your artist account on Muziika. Submissions are linked to this profile.
          </p>
        </DashboardRightPanel>
      }
    >
      <DashboardSectionTitle title="profile" />

      <div className="mt-8 max-w-xl rounded-dashboard-card border border-muziika-orange/20 dashboard-glass p-8">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-16 w-16 rounded-full bg-white/10" />
            <Skeleton className="h-6 w-48 bg-white/10" />
            <Skeleton className="h-4 w-full bg-white/10" />
          </div>
        ) : (
          <div className="flex items-start gap-6">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muziika-orange-gradient font-inter text-lg font-semibold text-white">
              {initials}
            </div>
            <div className="space-y-3 font-inter">
              <div>
                <p className="text-xs uppercase tracking-wider text-muziika-dashboard-muted">display name</p>
                <p className="text-xl font-medium text-white">{displayName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muziika-dashboard-muted">email</p>
                <p className="text-sm text-white">{profile?.email ?? user?.email}</p>
              </div>
              {profile?.stageName && profile.stageName !== profile.name && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muziika-dashboard-muted">legal name</p>
                  <p className="text-sm text-white">{profile.name}</p>
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-wider text-muziika-dashboard-muted">role</p>
                <p className="text-sm capitalize text-muziika-orange-light">artist</p>
              </div>
              {profile?.createdAt && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-muziika-dashboard-muted">member since</p>
                  <p className="text-sm text-white">{formatDate(profile.createdAt)}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

export default function ArtistProfilePage() {
  return (
    <ProtectedRoute requiredRole="artist">
      <ArtistProfileContent />
    </ProtectedRoute>
  );
}
