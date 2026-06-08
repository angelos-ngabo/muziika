"use client";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useDesktopNavAutoHide } from "@/hooks/useDesktopNavAutoHide";
import { MAIN_NAV, scrollToSection, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function isNavActive(item: NavItem, pathname: string, hash: string): boolean {
  if (item.type === "route") {
    if (item.to === "/") return pathname === "/";
    return pathname === item.to || pathname.startsWith(`${item.to}/`);
  }
  if (pathname !== "/") return false;
  return hash === `#${item.sectionId}`;
}

function NavLink({
  item,
  pathname,
  hash,
}: {
  item: NavItem;
  pathname: string;
  hash: string;
}) {
  const navigate = useNavigate();
  const active = isNavActive(item, pathname, hash);
  const className = cn(
    "font-space text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-150",
    active ? "text-hero-orange" : "text-white hover:text-hero-orange"
  );

  if (item.type === "route") {
    return (
      <Link to={item.to} className={className}>
        {item.label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (pathname !== "/") navigate(`/#${item.sectionId}`);
        else scrollToSection(item.sectionId);
      }}
      className={cn(className, "border-none bg-transparent p-0")}
    >
      {item.label}
    </button>
  );
}

export function Navbar() {
  const { user, loading } = useAuth();
  const { pathname, hash } = useLocation();
  const navVisible = useDesktopNavAutoHide();

  return (
    <>
      <div className="h-[72px] shrink-0" aria-hidden="true" />
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] h-[72px] bg-hero-bg/90 backdrop-blur-md transition-transform duration-300 ease-out",
          !navVisible && "-translate-y-full"
        )}
      >
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 md:px-12">
        <Link
          to="/"
          className="rounded-[50px] bg-hero-orange px-5 py-2 font-space text-base font-bold uppercase tracking-[0.05em] text-white"
        >
          MUZIIKA
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {MAIN_NAV.map((item) => (
            <NavLink key={item.label} item={item} pathname={pathname} hash={hash} />
          ))}
        </nav>

        <div className="flex items-center">
          {!loading && user ? (
            <Link
              to={
                user.role === "admin"
                  ? "/admin"
                  : user.role === "judge"
                    ? "/judge"
                    : user.role === "artist"
                      ? "/artist/dashboard"
                      : "/"
              }
              className={cn(
                "font-space text-sm font-medium uppercase tracking-[0.08em] transition-colors duration-150",
                pathname.startsWith("/admin") ||
                  pathname.startsWith("/judge") ||
                  pathname.startsWith("/artist/dashboard")
                  ? "text-hero-orange"
                  : "text-white hover:text-hero-orange"
              )}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={cn(
                  "mr-6 font-space text-sm font-medium uppercase tracking-[0.08em] transition-colors duration-150",
                  pathname === "/login"
                    ? "text-hero-orange"
                    : "text-white hover:text-hero-orange"
                )}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={cn(
                  "rounded-[50px] border-2 border-white px-7 py-2.5 font-space text-sm font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200 ease-in-out hover:border-hero-orange hover:bg-hero-orange",
                  pathname === "/register" && "border-hero-orange bg-hero-orange"
                )}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
    </>
  );
}

/** @deprecated use Navbar */
export const HomeNavbar = Navbar;
