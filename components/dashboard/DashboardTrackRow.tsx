import { Play } from "lucide-react";
import { getInitials, stringToColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface DashboardTrackRowProps {
  index: number;
  title: string;
  subtitle?: string;
  meta?: string;
  active?: boolean;
  onClick?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export function DashboardTrackRow({
  index,
  title,
  subtitle,
  meta,
  active,
  onClick,
  actions,
  className,
}: DashboardTrackRowProps) {
  const initials = getInitials(title);
  const avatarColor = stringToColor(title);

  if (active) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl dashboard-glass-subtle shadow-dashboard",
          className
        )}
      >
        <div className="absolute inset-0 bg-muziika-orange-gradient opacity-25" />
        <div className="relative flex items-center gap-6 px-5 py-4">
          <span className="bg-muziika-orange-gradient bg-clip-text font-inter text-2xl font-medium text-transparent">
            {String(index).padStart(2, "0")}
          </span>
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-muziika-orange text-sm font-semibold text-white"
            style={{ backgroundColor: avatarColor }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate bg-muziika-orange-gradient bg-clip-text font-inter text-base font-medium lowercase tracking-wide text-transparent">
              {title}
            </p>
            {subtitle && (
              <p className="truncate font-inter text-sm text-muziika-dashboard-muted">{subtitle}</p>
            )}
          </div>
          {meta && (
            <span className="bg-muziika-orange-gradient bg-clip-text font-inter text-base text-transparent">
              {meta}
            </span>
          )}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muziika-orange-gradient"
            aria-label="Play"
          >
            <Play className="h-3.5 w-3.5 fill-white text-white" />
          </button>
          {actions}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-10 rounded-none dashboard-glass-subtle px-[17px] py-3 transition-colors hover:bg-white/[0.06]",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <span className="w-8 font-inter text-base font-medium text-muziika-dashboard-muted">
        {String(index).padStart(2, "0")}
      </span>
      <div
        className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
        style={{ backgroundColor: avatarColor }}
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-inter text-base font-medium lowercase tracking-wide text-muziika-dashboard-muted">
          {title}
        </p>
        {subtitle && (
          <p className="truncate font-inter text-sm text-muziika-dashboard-subtle">{subtitle}</p>
        )}
      </div>
      {meta && (
        <span className="font-inter text-base text-muziika-dashboard-muted">{meta}</span>
      )}
      <Play className="h-4 w-4 shrink-0 fill-muziika-dashboard-muted text-muziika-dashboard-muted" />
      {actions}
    </div>
  );
}
