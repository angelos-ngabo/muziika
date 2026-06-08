import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getEmbedUrl, getVideoPlatform } from "@/lib/utils";

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

export function VideoEmbed({ url, title = "Performance video", className }: VideoEmbedProps) {
  const platform = getVideoPlatform(url);
  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    const platformLabel = platform === "tiktok" ? "TikTok" : "video";

    return (
      <div
        className={cn(
          "flex aspect-video flex-col items-center justify-center gap-4 rounded-[20px] bg-black/60 px-6 text-center",
          className
        )}
      >
        <p className="font-inter text-sm text-white/70">
          {platform === "tiktok"
            ? "This TikTok link can't be embedded (use the full tiktok.com/@user/video/… URL, not a vm.tiktok.com short link)."
            : "This video link can't be embedded."}
        </p>
        <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Open on {platformLabel}
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    );
  }

  const isTikTok = platform === "tiktok";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[20px] bg-black",
        isTikTok ? "mx-auto aspect-[9/16] max-h-[min(80vh,720px)] w-full max-w-sm" : "aspect-video w-full",
        className
      )}
    >
      <iframe
        src={embedUrl}
        className="h-full w-full border-0"
        allow={
          isTikTok
            ? "encrypted-media; fullscreen; picture-in-picture"
            : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        }
        allowFullScreen
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
