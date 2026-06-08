import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 45%)`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export type VideoPlatform = "youtube" | "tiktok" | "unknown";

export function getVideoPlatform(url: string): VideoPlatform {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("youtube.com") || host === "youtu.be") return "youtube";
    if (host.includes("tiktok.com")) return "tiktok";
  } catch {
    /* invalid url */
  }
  return "unknown";
}

function extractTikTokVideoId(url: string): string | null {
  const patterns = [
    /tiktok\.com\/@[^/]+\/video\/(\d+)/i,
    /tiktok\.com\/v\/(\d+)/i,
    /tiktok\.com\/embed\/v2\/(\d+)/i,
    /tiktok\.com\/embed\/(\d+)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export function getEmbedUrl(url: string): string | null {
  try {
    const platform = getVideoPlatform(url);

    if (platform === "youtube") {
      const parsed = new URL(url);
      const videoId = parsed.hostname.includes("youtu.be")
        ? parsed.pathname.slice(1).split("/")[0]
        : parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    }

    if (platform === "tiktok") {
      const videoId = extractTikTokVideoId(url);
      // TikTok blocks normal page URLs in iframes — must use the embed player URL.
      return videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : null;
    }

    return null;
  } catch {
    return null;
  }
}
