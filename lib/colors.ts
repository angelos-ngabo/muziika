/** Design tokens extracted from Figma — music website🎧 (Community) */
export const COLORS = {
  background: "#0a0a0a",
  heroOrange: "#FF6B00",
  heroOrangeHover: "#e05e00",
  surface: "#0a0a0a",
  surfaceElevated: "#1a1208",
  primary: "#D96319",
  primaryLight: "#FF8B06",
  accent: "#FF9D00",
  gray: "#707070",
  grayLight: "#D9D9D9",
  white: "#FFFFFF",
  white30: "rgba(255, 255, 255, 0.3)",
  white50: "rgba(255, 255, 255, 0.5)",
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.7)",
  textMuted: "rgba(255, 255, 255, 0.45)",
  border: "rgba(255, 255, 255, 0.1)",
  borderStrong: "rgba(255, 255, 255, 0.2)",
  purple: "#7209B7",
  purpleLight: "#B5179E",
  skeleton: "rgba(255, 255, 255, 0.1)",
  navbarSolid: "rgba(0, 0, 0, 0.95)",
  heroGlowOrange: "rgba(217, 99, 25, 0.3)",
  heroGlowWhite: "rgba(255, 255, 255, 0.15)",
  ctaBand: "rgba(217, 99, 25, 0.2)",
  speakerCard: "#FFFFFF",
  speakerCardText: "#000000",
} as const;

/** Figma reference width for the homepage component (px). Used to derive scale ratios. */
export const FIGMA_FRAME_WIDTH = 58996;

/** Convert Figma absolute px to responsive rem (base 16, ~1440 viewport). */
export function figmaPx(value: number, viewport = 1440): string {
  const scaled = (value / FIGMA_FRAME_WIDTH) * viewport;
  return `${(scaled / 16).toFixed(4)}rem`;
}
