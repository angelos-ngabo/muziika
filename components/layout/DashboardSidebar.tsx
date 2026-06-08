"use client";

import { Suspense } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  LayoutGrid,
  ListMusic,
  Users,
  Star,
  Gavel,
  Settings,
  LogOut,
  HelpCircle,
  Music2,
  Upload,
  Mic2,
  type LucideIcon,
} from "lucide-react";
import { logout } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { UserRole } from "@/types";

interface DashboardSidebarProps {
  role: UserRole;
  genre?: string;
  reviewedCount?: number;
  pendingCount?: number;
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  section?: string;
  exact?: boolean;
}

const adminNav: NavItem[] = [
  { href: "/admin", label: "dashboard", icon: LayoutGrid, exact: true },
  { href: "/admin/submissions", label: "submissions", icon: ListMusic },
  { href: "/admin?section=judges", label: "judges", icon: Users, section: "judges" },
  { href: "/admin?section=featured", label: "featured", icon: Star, section: "featured" },
];

const judgeNav: NavItem[] = [
  { href: "/judge", label: "dashboard", icon: LayoutGrid, exact: true },
  { href: "/judge", label: "review queue", icon: Gavel },
];

const artistNav: NavItem[] = [
  { href: "/artist/dashboard", label: "dashboard", icon: LayoutGrid, exact: true },
  { href: "/artist/dashboard/submissions", label: "my submissions", icon: ListMusic },
  { href: "/artist/dashboard/submit", label: "submit track", icon: Upload },
  { href: "/artist/dashboard/profile", label: "profile", icon: Mic2 },
];

function getDashboardRoot(role: UserRole): string {
  if (role === "admin") return "/admin";
  if (role === "judge") return "/judge";
  return "/artist/dashboard";
}

function NavLink({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      to={item.href}
      className={cn(
        "relative flex items-center gap-4 rounded-md px-5 py-2.5 font-inter text-base font-medium lowercase tracking-wide transition-colors",
        isActive
          ? "text-white"
          : "text-muziika-dashboard-muted hover:text-white"
      )}
    >
      {isActive && (
        <span className="absolute inset-0 rounded-md bg-muziika-orange-gradient" aria-hidden="true" />
      )}
      <Icon className="relative h-4 w-4 shrink-0" strokeWidth={1.5} />
      <span className="relative">{item.label}</span>
    </Link>
  );
}

function DashboardSidebarInner({
  role,
  genre,
  reviewedCount = 0,
  pendingCount = 0,
}: DashboardSidebarProps) {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");
  const links =
    role === "admin" ? adminNav : role === "judge" ? judgeNav : artistNav;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error((error as Error).message || "Logout failed");
    }
  };

  const isActive = (item: NavItem) => {
    if (item.section) {
      return pathname === "/admin" && section === item.section;
    }
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <aside className="dashboard-sidebar hidden h-screen w-[275px] shrink-0 flex-col md:flex">
      <div className="px-8 pt-10">
        <Link to={getDashboardRoot(role)} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muziika-orange-gradient">
            <Music2 className="h-5 w-5 text-white" />
          </div>
          <span className="bg-muziika-orange-gradient bg-clip-text font-display text-2xl tracking-wider text-transparent">
            MUZIIKA
          </span>
        </Link>
      </div>

      <nav className="mt-12 flex-1 space-y-1 px-6">
        <p className="mb-4 px-5 font-inter text-sm lowercase tracking-wide text-muziika-dashboard-muted">
          menu
        </p>

        {links.map((item) => (
          <NavLink key={`${item.href}-${item.label}`} item={item} isActive={isActive(item)} />
        ))}

        {role === "judge" && genre && (
          <div className="mt-8 rounded-dashboard-card border border-muziika-orange/20 dashboard-glass p-4">
            <p className="font-inter text-xs uppercase tracking-wider text-muziika-dashboard-muted">
              assigned genre
            </p>
            <p className="mt-2 font-inter text-base font-medium text-white">{genre}</p>
            <div className="mt-4 space-y-2 font-inter text-sm">
              <div className="flex justify-between text-muziika-dashboard-muted">
                <span>reviewed</span>
                <span className="text-white">{reviewedCount}</span>
              </div>
              <div className="flex justify-between text-muziika-dashboard-muted">
                <span>pending</span>
                <span className="text-muziika-orange-accent">{pendingCount}</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="px-6 pb-4">
        <div className="dashboard-divider mb-4" />
        <p className="mb-4 px-5 font-inter text-sm lowercase tracking-wide text-muziika-dashboard-muted">
          help
        </p>
        <button
          type="button"
          className="flex w-full items-center gap-4 rounded-md px-5 py-2.5 font-inter text-base font-medium lowercase tracking-wide text-muziika-dashboard-muted transition-colors hover:text-white"
        >
          <Settings className="h-4 w-4" strokeWidth={1.5} />
          settings
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-4 rounded-md px-5 py-2.5 font-inter text-base font-medium lowercase tracking-wide text-muziika-dashboard-muted transition-colors hover:text-white"
        >
          <HelpCircle className="h-4 w-4" strokeWidth={1.5} />
          FAQs
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-md px-5 py-2.5 font-inter text-base font-medium lowercase tracking-wide text-muziika-dashboard-muted transition-colors hover:text-muziika-orange-light"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
          sign out
        </button>
      </div>

      <p className="px-8 pb-8 font-inter text-sm lowercase tracking-wide text-muziika-dashboard-muted">
        version 5.5.1
      </p>
    </aside>
  );
}

export function DashboardSidebar(props: DashboardSidebarProps) {
  return (
    <Suspense
      fallback={
        <aside className="dashboard-sidebar hidden h-screen w-[275px] shrink-0 md:block" />
      }
    >
      <DashboardSidebarInner {...props} />
    </Suspense>
  );
}
