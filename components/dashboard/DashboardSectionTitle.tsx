import { Play } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardSectionTitleProps {
  title: string;
  showMoreHref?: string;
}

export function DashboardSectionTitle({ title, showMoreHref }: DashboardSectionTitleProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Play className="h-5 w-5 fill-muziika-orange text-muziika-orange" />
        <h2 className="font-inter text-[26px] font-semibold lowercase tracking-wide text-[#F1F1F1]">
          {title}
        </h2>
      </div>
      {showMoreHref && (
        <Link
          to={showMoreHref}
          className="font-inter text-sm lowercase tracking-wide text-[#7A7A7A] underline transition-colors hover:text-muziika-dashboard-muted"
        >
          show more &gt;&gt;
        </Link>
      )}
    </div>
  );
}
