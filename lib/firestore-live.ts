import {
  collection,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  onSnapshot,
  serverTimestamp,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Timestamp,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import type {
  CreateJudgeInput,
  CreateSubmissionInput,
  FeaturedType,
  Genre,
  Judge,
  JudgeReviewInput,
  Submission,
  SubmissionStats,
  SubmissionStatus,
  User,
  UserRole,
} from "@/types";

const PAGE_SIZE = 20;
type Unsubscribe = () => void;

function sortSubmissions(
  submissions: Submission[],
  orderByScore?: boolean
): Submission[] {
  const sorted = [...submissions];
  if (orderByScore) {
    sorted.sort((a, b) => b.score - a.score);
  } else {
    sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  return sorted;
}

function hasFilteredQuery(filters: {
  status?: SubmissionStatus | SubmissionStatus[];
  genre?: Genre;
  featuredType?: FeaturedType;
}): boolean {
  return Boolean(filters.status || filters.genre || filters.featuredType);
}

function toDate(value: Timestamp | Date | undefined): Date {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  return value.toDate();
}

function mapSubmission(id: string, data: DocumentData): Submission {
  return {
    id,
    artistId: (data.artistId as string) ?? "",
    artistName: (data.artistName as string) ?? "",
    title: (data.title as string) ?? "",
    videoLink: (data.videoLink as string) ?? "",
    genre: (data.genre as Genre) ?? "Pop",
    location: (data.location as string) ?? "",
    status: (data.status as SubmissionStatus) ?? "pending",
    score: (data.score as number) ?? 0,
    judgeNotes: (data.judgeNotes as string) ?? "",
    featuredType: (data.featuredType as FeaturedType) ?? null,
    featuredOrder: data.featuredOrder as number | undefined,
    featuredVisible: data.featuredVisible as boolean | undefined,
    vocalScore: data.vocalScore as number | undefined,
    stageScore: data.stageScore as number | undefined,
    creativityScore: data.creativityScore as number | undefined,
    createdAt: toDate(data.createdAt as Timestamp),
  };
}

function mapJudge(id: string, data: DocumentData): Judge {
  return {
    id,
    userId: (data.userId as string) ?? "",
    name: (data.name as string) ?? "",
    genre: (data.genre as Genre) ?? "Pop",
    assignedBy: (data.assignedBy as string) ?? "",
  };
}

function mapUser(id: string, data: DocumentData): User {
  return {
    id,
    name: (data.name as string) ?? "",
    stageName: data.stageName as string | undefined,
    email: (data.email as string) ?? "",
    role: (data.role as UserRole) ?? "artist",
    createdAt: toDate(data.createdAt as Timestamp),
  };
}

export async function createSubmission(input: CreateSubmissionInput): Promise<string> {
  const db = await getFirebaseDb();
  const ref = await addDoc(collection(db, "submissions"), {
    artistId: input.artistId ?? `anon-${Date.now()}`,
    artistName: input.artistName,
    title: input.title,
    videoLink: input.videoLink,
    genre: input.genre,
    location: input.location,
    status: "pending",
    score: 0,
    judgeNotes: "",
    featuredType: null,
    featuredVisible: true,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export function subscribeToArtistSubmissions(
  artistId: string,
  callback: (submissions: Submission[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  let innerUnsub: Unsubscribe | undefined;
  let cancelled = false;

  void (async () => {
    try {
      const db = await getFirebaseDb();
      if (cancelled) return;

      const q = query(
        collection(db, "submissions"),
        where("artistId", "==", artistId),
        limit(PAGE_SIZE)
      );

      innerUnsub = onSnapshot(
        q,
        (snapshot) => {
          const submissions = snapshot.docs.map((d) => mapSubmission(d.id, d.data()));
          submissions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          callback(submissions);
        },
        (error) => onError?.(error)
      );
    } catch (error) {
      onError?.(error as Error);
    }
  })();

  return () => {
    cancelled = true;
    innerUnsub?.();
  };
}

export function subscribeToSubmissions(
  filters: {
    status?: SubmissionStatus | SubmissionStatus[];
    genre?: Genre;
    featuredType?: FeaturedType;
    orderByScore?: boolean;
  },
  callback: (submissions: Submission[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  let innerUnsub: Unsubscribe | undefined;
  let cancelled = false;

  void (async () => {
    try {
      const db = await getFirebaseDb();
      if (cancelled) return;

      const constraints = [];
      if (filters.status) {
        const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
        if (statuses.length === 1) {
          constraints.push(where("status", "==", statuses[0]));
        } else {
          constraints.push(where("status", "in", statuses));
        }
      }
      if (filters.genre) constraints.push(where("genre", "==", filters.genre));
      if (filters.featuredType) constraints.push(where("featuredType", "==", filters.featuredType));

      const sortClientSide = hasFilteredQuery(filters);
      if (!sortClientSide) {
        constraints.push(filters.orderByScore ? orderBy("score", "desc") : orderBy("createdAt", "desc"));
      }
      constraints.push(limit(PAGE_SIZE));

      const q = query(collection(db, "submissions"), ...constraints);
      innerUnsub = onSnapshot(
        q,
        (snapshot) => {
          const submissions = snapshot.docs.map((d) => mapSubmission(d.id, d.data()));
          callback(
            sortClientSide ? sortSubmissions(submissions, filters.orderByScore) : submissions
          );
        },
        (error) => onError?.(error)
      );
    } catch (error) {
      onError?.(error as Error);
    }
  })();

  return () => {
    cancelled = true;
    innerUnsub?.();
  };
}

export function subscribeToAllSubmissions(
  callback: (submissions: Submission[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  let innerUnsub: Unsubscribe | undefined;
  let cancelled = false;

  void (async () => {
    try {
      const db = await getFirebaseDb();
      if (cancelled) return;

      const attachListener = (q: ReturnType<typeof query>) => {
        innerUnsub?.();
        innerUnsub = onSnapshot(
          q,
          (snapshot) => {
            const submissions = snapshot.docs.map((d) => mapSubmission(d.id, d.data() as DocumentData));
            callback(sortSubmissions(submissions));
          },
          (error) => {
            const code = (error as { code?: string }).code;
            if (code === "failed-precondition") {
              attachListener(query(collection(db, "submissions"), limit(PAGE_SIZE)));
              return;
            }
            onError?.(error);
          }
        );
      };

      attachListener(query(collection(db, "submissions"), orderBy("createdAt", "desc"), limit(PAGE_SIZE)));
    } catch (error) {
      onError?.(error as Error);
    }
  })();

  return () => {
    cancelled = true;
    innerUnsub?.();
  };
}

export function subscribeToSubmissionStats(
  callback: (stats: SubmissionStats) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  let innerUnsub: Unsubscribe | undefined;
  let cancelled = false;

  void (async () => {
    try {
      const db = await getFirebaseDb();
      if (cancelled) return;
      innerUnsub = onSnapshot(
        query(collection(db, "submissions"), limit(PAGE_SIZE)),
        (snapshot) => {
          const submissions = snapshot.docs.map((d) => mapSubmission(d.id, d.data()));
          callback({
            total: submissions.length,
            pending: submissions.filter((s) => s.status === "pending").length,
            approved: submissions.filter((s) => s.status === "approved").length,
            featured: submissions.filter((s) => s.status === "featured").length,
          });
        },
        (error) => onError?.(error)
      );
    } catch (error) {
      onError?.(error as Error);
    }
  })();

  return () => {
    cancelled = true;
    innerUnsub?.();
  };
}

export async function getSubmissionsPaginated(
  filters?: {
    status?: SubmissionStatus | SubmissionStatus[];
    genre?: Genre;
    featuredType?: FeaturedType;
  },
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{ submissions: Submission[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null; hasMore: boolean }> {
  const db = await getFirebaseDb();
  const constraints = [];

  if (filters?.status) {
    const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
    if (statuses.length === 1) constraints.push(where("status", "==", statuses[0]));
    else constraints.push(where("status", "in", statuses));
  }
  if (filters?.genre) constraints.push(where("genre", "==", filters.genre));
  if (filters?.featuredType) constraints.push(where("featuredType", "==", filters.featuredType));
  constraints.push(orderBy("createdAt", "desc"));
  constraints.push(limit(PAGE_SIZE + 1));
  if (lastDoc) constraints.push(startAfter(lastDoc));

  const snapshot = await getDocs(query(collection(db, "submissions"), ...constraints));
  const docs = snapshot.docs;
  const hasMore = docs.length > PAGE_SIZE;
  const pageDocs = hasMore ? docs.slice(0, PAGE_SIZE) : docs;

  return {
    submissions: pageDocs.map((d) => mapSubmission(d.id, d.data())),
    lastDoc: pageDocs.length > 0 ? pageDocs[pageDocs.length - 1] : null,
    hasMore,
  };
}

export async function updateSubmissionStatus(submissionId: string, status: SubmissionStatus): Promise<void> {
  const db = await getFirebaseDb();
  await updateDoc(doc(db, "submissions", submissionId), { status });
}

export async function featureSubmission(submissionId: string, featuredType: FeaturedType): Promise<void> {
  const db = await getFirebaseDb();
  await updateDoc(doc(db, "submissions", submissionId), {
    status: "featured",
    featuredType,
    featuredVisible: true,
  });
}

export async function updateFeaturedVisibility(submissionId: string, visible: boolean): Promise<void> {
  const db = await getFirebaseDb();
  await updateDoc(doc(db, "submissions", submissionId), { featuredVisible: visible });
}

export async function updateFeaturedOrder(orders: { id: string; featuredOrder: number }[]): Promise<void> {
  const db = await getFirebaseDb();
  await Promise.all(
    orders.map(({ id, featuredOrder }) => updateDoc(doc(db, "submissions", id), { featuredOrder }))
  );
}

export async function submitJudgeReview(input: JudgeReviewInput, genre: Genre): Promise<void> {
  const db = await getFirebaseDb();
  const submissionRef = doc(db, "submissions", input.submissionId);
  const submissionSnap = await getDoc(submissionRef);
  if (!submissionSnap.exists()) throw new Error("Submission not found");

  const data = submissionSnap.data();
  if (data.genre !== genre) throw new Error("Cannot review submissions outside your assigned genre");

  const avgScore = (input.vocalScore + input.stageScore + input.creativityScore) / 3;
  await updateDoc(submissionRef, {
    vocalScore: input.vocalScore,
    stageScore: input.stageScore,
    creativityScore: input.creativityScore,
    score: Math.round(avgScore * 10) / 10,
    judgeNotes: input.judgeNotes,
  });
}

export async function getSubmissionById(id: string): Promise<Submission | null> {
  const db = await getFirebaseDb();
  const snap = await getDoc(doc(db, "submissions", id));
  if (!snap.exists()) return null;
  return mapSubmission(snap.id, snap.data());
}

export async function getUserById(uid: string): Promise<User | null> {
  const db = await getFirebaseDb();
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return mapUser(snap.id, snap.data());
}

export async function createUserDoc(
  uid: string,
  data: { name: string; stageName?: string; email: string; role: UserRole }
): Promise<void> {
  const db = await getFirebaseDb();
  await setDoc(doc(db, "users", uid), {
    id: uid,
    name: data.name,
    ...(data.stageName ? { stageName: data.stageName } : {}),
    email: data.email,
    role: data.role,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToJudges(
  callback: (judges: Judge[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  let innerUnsub: Unsubscribe | undefined;
  let cancelled = false;

  void (async () => {
    try {
      const db = await getFirebaseDb();
      if (cancelled) return;
      innerUnsub = onSnapshot(
        collection(db, "judges"),
        (snapshot) => callback(snapshot.docs.map((d) => mapJudge(d.id, d.data()))),
        (error) => onError?.(error)
      );
    } catch (error) {
      onError?.(error as Error);
    }
  })();

  return () => {
    cancelled = true;
    innerUnsub?.();
  };
}

export async function getJudgeByUserId(userId: string): Promise<Judge | null> {
  const db = await getFirebaseDb();
  const snap = await getDoc(doc(db, "judges", userId));
  if (!snap.exists()) return null;
  return mapJudge(snap.id, snap.data());
}

export async function createJudgeRecord(
  userId: string,
  input: CreateJudgeInput,
  assignedBy: string
): Promise<string> {
  const db = await getFirebaseDb();
  await setDoc(doc(db, "judges", userId), {
    userId,
    name: input.name,
    genre: input.genre,
    assignedBy,
  });
  return userId;
}

export async function deleteJudge(judgeId: string): Promise<void> {
  const db = await getFirebaseDb();
  await deleteDoc(doc(db, "judges", judgeId));
}
