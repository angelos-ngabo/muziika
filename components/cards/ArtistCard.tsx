"use client";

import { memo } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getInitials, stringToColor } from "@/lib/utils";
import type { Submission } from "@/types";

interface ArtistCardProps {
  submission: Submission;
  rank?: number;
}

function ArtistCardComponent({ submission, rank }: ArtistCardProps) {
  const initials = getInitials(submission.artistName);
  const avatarColor = stringToColor(submission.artistName);

  return (
    <Link
      to={`/artist/${submission.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[20px] bg-muziika-dashboard-card p-4 transition-all duration-200 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg"
    >
      {rank !== undefined && (
        <span className="absolute right-4 top-4 font-inter text-2xl font-bold text-muziika-purple-light">
          {String(rank).padStart(2, "0")}
        </span>
      )}

      <div
        className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold text-white"
        style={{ backgroundColor: avatarColor }}
      >
        {initials}
      </div>

      <h3 className="text-center font-inter text-base font-semibold text-white group-hover:text-muziika-purple-light">
        {submission.artistName}
      </h3>
      <p className="mt-1 text-center font-inter text-sm text-muziika-dashboard-muted">
        {submission.title}
      </p>

      <div className="mt-3 flex items-center justify-center gap-2">
        <Badge variant="muted" className="text-xs">
          {submission.genre}
        </Badge>
        {submission.score > 0 && (
          <Badge variant="purple" className="text-xs">
            {submission.score.toFixed(1)}
          </Badge>
        )}
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muziika-gradient opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-4 w-4 fill-white text-white" />
        </div>
      </div>
    </Link>
  );
}

export const ArtistCard = memo(ArtistCardComponent);
