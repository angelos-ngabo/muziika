"use client";

import { Link } from "react-router-dom";

interface FloatingArtistCardProps {
  artistName?: string;
  artistId?: string;
}

export function FloatingArtistCard({
  artistName = "Kalisa Bruce",
  artistId,
}: FloatingArtistCardProps) {
  const initial = artistName.trim()[0]?.toUpperCase() ?? "K";
  const watchHref = artistId ? `/artist/${artistId}` : "/explore";

  return (
    <div className="z-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hero-orange font-space text-lg font-bold text-white">
        {initial}
      </div>
      <div className="min-w-0">
        <p className="truncate font-space text-[13px] font-bold text-[#0a0a0a]">{artistName}</p>
        <p className="font-space text-[11px] uppercase text-[#888888]">Top Artist</p>
        <Link
          to={watchHref}
          className="font-space text-[11px] font-semibold uppercase text-hero-orange no-underline hover:underline"
        >
          Watch now
        </Link>
      </div>
    </div>
  );
}
