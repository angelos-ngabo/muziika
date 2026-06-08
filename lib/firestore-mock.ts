import { MOCK_SUBMISSIONS } from "@/lib/mock-data";
import { getAllMockJudges, getMockJudgeByUserId, removeMockJudge } from "@/lib/mock-judge-accounts";
import type {
  CreateSubmissionInput,
  FeaturedType,
  Genre,
  Judge,
  Submission,
  SubmissionStats,
  SubmissionStatus,
} from "@/types";

type Unsubscribe = () => void;

function filterSubmissions(filters: {
  status?: SubmissionStatus | SubmissionStatus[];
  genre?: Genre;
  featuredType?: FeaturedType;
  orderByScore?: boolean;
}): Submission[] {
  let filtered = [...MOCK_SUBMISSIONS];
  if (filters.status) {
    const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
    filtered = filtered.filter((s) => statuses.includes(s.status));
  }
  if (filters.genre) {
    filtered = filtered.filter((s) => s.genre === filters.genre);
  }
  if (filters.featuredType) {
    filtered = filtered.filter((s) => s.featuredType === filters.featuredType);
  }
  if (filters.orderByScore) {
    filtered.sort((a, b) => b.score - a.score);
  }
  return filtered;
}

export function getMockSubmissions(): Submission[] {
  return MOCK_SUBMISSIONS;
}

export async function createSubmission(input: CreateSubmissionInput): Promise<string> {
  return `mock-${Date.now()}-${input.artistName}`;
}

export function subscribeToSubmissions(
  filters: {
    status?: SubmissionStatus | SubmissionStatus[];
    genre?: Genre;
    featuredType?: FeaturedType;
    orderByScore?: boolean;
  },
  callback: (submissions: Submission[]) => void
): Unsubscribe {
  callback(filterSubmissions(filters));
  return () => undefined;
}

export function subscribeToAllSubmissions(
  callback: (submissions: Submission[]) => void
): Unsubscribe {
  callback(MOCK_SUBMISSIONS);
  return () => undefined;
}

export function subscribeToSubmissionStats(
  callback: (stats: SubmissionStats) => void
): Unsubscribe {
  callback({
    total: MOCK_SUBMISSIONS.length,
    pending: MOCK_SUBMISSIONS.filter((s) => s.status === "pending").length,
    approved: MOCK_SUBMISSIONS.filter((s) => s.status === "approved").length,
    featured: MOCK_SUBMISSIONS.filter((s) => s.status === "featured").length,
  });
  return () => undefined;
}

export async function updateSubmissionStatus(): Promise<void> {
  return undefined;
}

export async function featureSubmission(): Promise<void> {
  return undefined;
}

export async function updateFeaturedVisibility(): Promise<void> {
  return undefined;
}

export async function updateFeaturedOrder(): Promise<void> {
  return undefined;
}

export async function submitJudgeReview(): Promise<void> {
  return undefined;
}

export async function getSubmissionById(id: string): Promise<Submission | null> {
  return MOCK_SUBMISSIONS.find((s) => s.id === id) ?? null;
}

export async function getUserById(): Promise<null> {
  return null;
}

export async function createUserDoc(): Promise<void> {
  return undefined;
}

export function subscribeToJudges(callback: (judges: Judge[]) => void): Unsubscribe {
  callback(getAllMockJudges());
  return () => undefined;
}

export async function getJudgeByUserId(userId: string): Promise<Judge | null> {
  return getMockJudgeByUserId(userId);
}

export async function createJudgeRecord(): Promise<string> {
  return `mock-judge-${Date.now()}`;
}

export async function deleteJudge(judgeId: string): Promise<void> {
  removeMockJudge(judgeId);
}
