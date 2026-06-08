import { MOCK_JUDGES } from "@/lib/mock-data";
import type { CreateJudgeInput, Genre, Judge } from "@/types";

export interface MockJudgeLogin {
  email: string;
  password: string;
  userId: string;
  name: string;
}

/** Pre-provisioned judge accounts (created by admin, with genre assignments). */
const BUILTIN_JUDGE_LOGINS: MockJudgeLogin[] = [
  {
    email: "sarah.judge@muziika.rw",
    password: "Judge@R&B2024",
    userId: "user-judge-1",
    name: "Sarah Williams",
  },
  {
    email: "david.judge@muziika.rw",
    password: "Judge@Afropop2024",
    userId: "user-judge-2",
    name: "David Okafor",
  },
];

const dynamicJudges: Judge[] = [];
const dynamicLogins: MockJudgeLogin[] = [];

export function getAllMockJudges(): Judge[] {
  return [...MOCK_JUDGES, ...dynamicJudges];
}

export function findMockJudgeLogin(
  email: string,
  password: string
): MockJudgeLogin | null {
  const normalized = email.trim().toLowerCase();
  return (
    [...BUILTIN_JUDGE_LOGINS, ...dynamicLogins].find(
      (account) =>
        account.email.toLowerCase() === normalized && account.password === password
    ) ?? null
  );
}

export function getMockJudgeByUserId(userId: string): Judge | null {
  return getAllMockJudges().find((judge) => judge.userId === userId) ?? null;
}

export function addMockJudgeAccount(
  input: CreateJudgeInput,
  assignedBy: string
): { userId: string; email: string } {
  const userId = `user-judge-${Date.now()}`;
  const judge: Judge = {
    id: `judge-${Date.now()}`,
    userId,
    name: input.name,
    genre: input.genre,
    assignedBy,
  };

  dynamicJudges.push(judge);
  dynamicLogins.push({
    email: input.email,
    password: input.password,
    userId,
    name: input.name,
  });

  return { userId, email: input.email };
}

export function removeMockJudge(judgeId: string): void {
  const judge = getAllMockJudges().find((j) => j.id === judgeId);
  if (!judge) return;

  const dynamicIndex = dynamicJudges.findIndex((j) => j.id === judgeId);
  if (dynamicIndex !== -1) {
    dynamicJudges.splice(dynamicIndex, 1);
    const loginIndex = dynamicLogins.findIndex((l) => l.userId === judge.userId);
    if (loginIndex !== -1) dynamicLogins.splice(loginIndex, 1);
  }
}

export function getJudgeGenreForUser(userId: string): Genre | null {
  return getMockJudgeByUserId(userId)?.genre ?? null;
}
