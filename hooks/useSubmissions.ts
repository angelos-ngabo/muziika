"use client";

import { useEffect, useState } from "react";
import { subscribeToSubmissions } from "@/lib/firestore";
import type { FeaturedType, Genre, Submission, SubmissionStatus } from "@/types";

interface UseSubmissionsOptions {
  status?: SubmissionStatus | SubmissionStatus[];
  genre?: Genre;
  featuredType?: FeaturedType;
  orderByScore?: boolean;
}

interface UseSubmissionsReturn {
  submissions: Submission[];
  loading: boolean;
}

export function useSubmissions(options: UseSubmissionsOptions = {}): UseSubmissionsReturn {
  const statusKey = Array.isArray(options.status)
    ? options.status.join(",")
    : options.status ?? "";

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToSubmissions(options, (data) => {
      setSubmissions(data);
      setLoading(false);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusKey, options.genre, options.featuredType, options.orderByScore]);

  return { submissions, loading };
}
