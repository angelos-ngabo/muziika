import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-[#D96319] via-[#FF8B06] to-[#FF9D00]",
  "from-[#B85215] via-[#D96319] to-[#FF8B06]",
  "from-[#2a1408] via-[#D96319] to-[#FF9D00]",
  "from-[#FF8B06] via-[#FF9D00] to-[#D96319]",
];

interface DashboardGenreCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  loading?: boolean;
  index?: number;
  className?: string;
}

export function DashboardGenreCard({
  label,
  value,
  subtitle,
  loading,
  index = 0,
  className,
}: DashboardGenreCardProps) {
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <div
      className={cn(
        "relative h-[269px] w-full overflow-hidden rounded-dashboard-card shadow-dashboard",
        className
      )}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.62]", gradient)} />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-x-0 bottom-0 h-24 rounded-b-dashboard-card bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-6">
        {loading ? (
          <Skeleton className="h-10 w-20 bg-white/20" />
        ) : (
          <p className="font-inter text-4xl font-semibold text-white">{value}</p>
        )}
        <p className="mt-1 font-inter text-xl font-semibold lowercase tracking-wide text-white">
          {label}
        </p>
        {subtitle && (
          <p className="mt-1 font-inter text-sm text-muziika-dashboard-muted">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
