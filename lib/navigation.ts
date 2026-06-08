/** Scroll to a section id on the current page or navigate home first. */
export function scrollToSection(sectionId: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior, block: "start" });
    return true;
  }
  return false;
}

export const HOME_SECTIONS = {
  featured: "featured",
  topPerformers: "top-performers",
  trending: "trending",
  about: "about",
  submitCta: "submit-cta",
} as const;

export type NavItem =
  | { type: "route"; label: string; to: string }
  | { type: "section"; label: string; sectionId: string; homePath?: string };

export const MAIN_NAV: NavItem[] = [
  { type: "route", label: "HOME", to: "/" },
  { type: "route", label: "EXPLORE", to: "/explore" },
  { type: "section", label: "TOP ARTISTS", sectionId: HOME_SECTIONS.topPerformers },
  { type: "route", label: "SUBMIT", to: "/submit" },
  { type: "route", label: "ABOUT", to: "/about" },
];

export const FOOTER_NAV: NavItem[] = [
  { type: "route", label: "Explore", to: "/explore" },
  { type: "route", label: "Submit", to: "/submit" },
  { type: "section", label: "Top Artists", sectionId: HOME_SECTIONS.topPerformers },
  { type: "route", label: "About", to: "/about" },
  { type: "route", label: "Admin Login", to: "/login" },
];
