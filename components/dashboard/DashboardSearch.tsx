"use client";

import { Search } from "lucide-react";

interface DashboardSearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function DashboardSearch({
  placeholder = "search music, artist, genre",
  value,
  onChange,
}: DashboardSearchProps) {
  return (
    <div className="dashboard-search-bar flex items-center gap-[22px] rounded-dashboard-search px-[22px] py-[15px]">
      <Search className="h-4 w-4 shrink-0 text-muziika-dashboard-muted" strokeWidth={1.5} />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full bg-transparent font-inter text-sm lowercase tracking-wide text-muziika-dashboard-muted placeholder:text-muziika-dashboard-muted focus:outline-none"
      />
    </div>
  );
}
