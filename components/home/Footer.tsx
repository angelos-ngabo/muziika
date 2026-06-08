"use client";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "@/lib/navigation";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Top Artists", section: "top-performers" },
  { label: "Submit Performance", href: "/submit" },
  { label: "About", section: "about" },
];

const PLATFORM_LINKS = [
  { label: "Admin Login", href: "/login" },
  { label: "Judge Portal", href: "/login" },
  { label: "Artist Login", href: "/login" },
  { label: "Submit Talent", href: "/submit" },
];

function FooterLink({
  href,
  section,
  label,
}: {
  href?: string;
  section?: string;
  label: string;
}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (href) {
    return (
      <Link
        to={href}
        className="font-space text-sm text-[#888888] no-underline transition-colors duration-200 hover:text-white"
      >
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (section) {
          if (pathname !== "/") navigate(`/#${section}`);
          else scrollToSection(section);
        }
      }}
      className="border-none bg-transparent p-0 text-left font-space text-sm text-[#888888] transition-colors duration-200 hover:text-white"
    >
      {label}
    </button>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f] bg-[#0f0f0f] px-6 py-12 md:px-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <img src="/logo.svg" alt="Muziika" className="h-10 w-auto" />
          <p className="mt-4 max-w-xs font-space text-[13px] text-[#888888]">
            Rwanda&apos;s leading talent discovery platform
          </p>
          <div className="mt-5 flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] transition-colors duration-150 hover:text-hero-orange"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] transition-colors duration-150 hover:text-hero-orange"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888888] transition-colors duration-150 hover:text-hero-orange"
              aria-label="Telegram"
            >
              <TelegramIcon />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-space text-[11px] uppercase tracking-[0.12em] text-hero-orange">
            Explore
          </span>
          {EXPLORE_LINKS.map((link) => (
            <FooterLink key={link.label} href={link.href} section={link.section} label={link.label} />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-space text-[11px] uppercase tracking-[0.12em] text-hero-orange">
            Platform
          </span>
          {PLATFORM_LINKS.map((link) => (
            <FooterLink key={link.label} href={link.href} label={link.label} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-[#1f1f1f] pt-5 text-center">
        <p className="font-space text-xs text-[#555555]">
          &copy; 2025 Muziika · Rwanda&apos;s Talent Discovery Platform
        </p>
      </div>
    </footer>
  );
}
