"use client";

import { useEffect, useState } from "react";
import { subscribeToAllSubmissions } from "@/lib/firestore";
import type { Submission } from "@/types";

interface HomepageData {
  featured: Submission[];
  topPerformers: Submission[];
  trending: Submission[];
  loading: boolean;
}

function deriveHomepageData(submissions: Submission[]): Omit<HomepageData, "loading"> {
  const featured = submissions.filter(
    (s) => s.status === "featured" && s.featuredVisible !== false
  );
  const topPerformers = submissions
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  const trending = submissions.filter(
    (s) => s.featuredType === "TRENDING" && s.featuredVisible !== false
  );
  return { featured, topPerformers, trending };
}

export function useHomepageData(): HomepageData {
  const [data, setData] = useState<HomepageData>({
    featured: [],
    topPerformers: [],
    trending: [],
    loading: true,
  });

  useEffect(() => {
    let unsubscribe = () => {};

    const start = window.setTimeout(() => {
      unsubscribe = subscribeToAllSubmissions(
        (submissions) => {
          setData({ ...deriveHomepageData(submissions), loading: false });
        },
        (error) => {
          console.error("[Homepage] submissions subscription failed:", error);
          setData((prev) => ({ ...prev, loading: false }));
        }
      );
    }, 0);

    return () => {
      window.clearTimeout(start);
      unsubscribe();
    };
  }, []);

  return data;
}
