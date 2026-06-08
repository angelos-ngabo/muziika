export type UserRole = "artist" | "judge" | "admin";

export type SubmissionStatus = "pending" | "approved" | "rejected" | "featured";

export type FeaturedType = "FEATURED" | "TOP_PERFORMER" | "TRENDING" | null;

export type Genre =
  | "R&B"
  | "Rap"
  | "Afropop"
  | "Gospel"
  | "Pop"
  | "Songwriting";

export const GENRES: Genre[] = [
  "R&B",
  "Rap",
  "Afropop",
  "Gospel",
  "Pop",
  "Songwriting",
];

export interface User {
  id: string;
  name: string;
  stageName?: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface Submission {
  id: string;
  artistId: string;
  artistName: string;
  title: string;
  videoLink: string;
  genre: Genre;
  location: string;
  status: SubmissionStatus;
  score: number;
  judgeNotes: string;
  featuredType: FeaturedType;
  featuredOrder?: number;
  featuredVisible?: boolean;
  vocalScore?: number;
  stageScore?: number;
  creativityScore?: number;
  createdAt: Date;
}

export interface Judge {
  id: string;
  userId: string;
  name: string;
  genre: Genre;
  assignedBy: string;
}

export interface SubmissionStats {
  total: number;
  pending: number;
  approved: number;
  featured: number;
}

export interface CreateSubmissionInput {
  artistId?: string;
  artistName: string;
  title: string;
  videoLink: string;
  genre: Genre;
  location: string;
}

export interface CreateJudgeInput {
  name: string;
  email: string;
  password: string;
  genre: Genre;
}

export interface JudgeReviewInput {
  submissionId: string;
  vocalScore: number;
  stageScore: number;
  creativityScore: number;
  judgeNotes: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  role: UserRole | null;
  name: string | null;
}
