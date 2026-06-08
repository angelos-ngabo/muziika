import { getInitials, stringToColor } from "@/lib/utils";

interface DashboardArtistRowProps {
  name: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export function DashboardArtistRow({ name, subtitle, actions }: DashboardArtistRowProps) {
  const initials = getInitials(name);

  return (
    <div className="flex items-center justify-between rounded-dashboard-card dashboard-glass-subtle px-4 py-3">
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-muziika-purple-light text-xs font-semibold text-white"
          style={{ backgroundColor: stringToColor(name) }}
        >
          {initials}
        </div>
        <div>
          <p className="font-inter text-base font-medium lowercase tracking-wide text-white">
            {name}
          </p>
          <p className="font-inter text-sm text-muziika-dashboard-muted">{subtitle}</p>
        </div>
      </div>
      {actions}
    </div>
  );
}
