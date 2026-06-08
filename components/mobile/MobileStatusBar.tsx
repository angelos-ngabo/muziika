"use client";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MobileStatusBar() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="mobile-status-bar fixed left-0 right-0 top-0 z-[200] flex h-11 items-center justify-between bg-[#0a0a0a]/95 px-5 backdrop-blur-md">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <Link to="/" className="shrink-0">
          <img src="/logo.svg" alt="Muziika" className="h-7 w-auto" />
        </Link>
      </div>

      <div className="flex shrink-0 items-center gap-2 text-white">
        <button
          type="button"
          onClick={() => navigate("/explore")}
          className="mobile-tap flex h-10 w-10 items-center justify-center border-none bg-transparent p-0"
          aria-label="Explore"
        >
          <SearchIcon />
        </button>
        <button
          type="button"
          onClick={() => navigate("/about")}
          className="mobile-tap flex h-10 w-10 items-center justify-center border-none bg-transparent p-0 text-[#888888]"
          aria-label="About Muziika"
        >
          <InfoIcon />
        </button>
        {!user && (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mobile-tap flex h-10 w-10 items-center justify-center border-none bg-transparent p-0"
            aria-label="Sign in"
          >
            <UserIcon />
          </button>
        )}
      </div>
    </header>
  );
}
