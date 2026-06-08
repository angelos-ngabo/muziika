"use client";

import { memo, useState } from "react";
import { Play, Check, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { VideoEmbed } from "@/components/VideoEmbed";
import type { FeaturedType, Submission } from "@/types";

interface SubmissionRowProps {
  submission: Submission;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onFeature: (id: string, type: FeaturedType) => void;
}

function SubmissionRowComponent({
  submission,
  onApprove,
  onReject,
  onFeature,
}: SubmissionRowProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const [featureOpen, setFeatureOpen] = useState(false);

  return (
    <>
      <tr className="border-b border-white/5 hover:bg-white/5">
        <td className="p-4 font-inter text-sm text-white">{submission.artistName}</td>
        <td className="p-4 font-inter text-sm text-muziika-dashboard-muted">{submission.title}</td>
        <td className="p-4">
          <Badge variant="muted">{submission.genre}</Badge>
        </td>
        <td className="p-4 font-inter text-sm text-muziika-dashboard-muted">{submission.location}</td>
        <td className="p-4 font-inter text-sm text-muziika-dashboard-muted">
          {formatDate(submission.createdAt)}
        </td>
        <td className="p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setVideoOpen(true)}
            className="text-muziika-purple-light hover:text-white"
          >
            <Play className="mr-1 h-4 w-4" /> Preview
          </Button>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onApprove(submission.id)}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onReject(submission.id)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="purple"
              onClick={() => setFeatureOpen(true)}
            >
              <Star className="h-4 w-4" />
            </Button>
          </div>
        </td>
      </tr>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl bg-muziika-dashboard border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">
              {submission.artistName} — {submission.title}
            </DialogTitle>
          </DialogHeader>
          {submission.videoLink && (
            <VideoEmbed
              url={submission.videoLink}
              title={`${submission.artistName} performance`}
              className="rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={featureOpen} onOpenChange={setFeatureOpen}>
        <DialogContent className="bg-muziika-dashboard border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Feature Artist</DialogTitle>
          </DialogHeader>
          <Select
            onValueChange={(value) => {
              onFeature(submission.id, value as FeaturedType);
              setFeatureOpen(false);
            }}
          >
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Select feature type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FEATURED">Featured</SelectItem>
              <SelectItem value="TOP_PERFORMER">Top Performer</SelectItem>
              <SelectItem value="TRENDING">Trending</SelectItem>
            </SelectContent>
          </Select>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const SubmissionRow = memo(SubmissionRowComponent);
