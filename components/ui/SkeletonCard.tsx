import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <Skeleton
      className={cn("h-48 w-full rounded-dashboard-card bg-figma-skeleton", className)}
    />
  );
}

export function SkeletonRow() {
  return <Skeleton className="h-16 w-full rounded-dashboard-card bg-figma-skeleton" />;
}
