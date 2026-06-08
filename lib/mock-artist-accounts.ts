import type { AuthUser } from "@/types";

interface MockArtistAccount {
  email: string;
  password: string;
  uid: string;
  name: string;
}

const artistAccounts: MockArtistAccount[] = [];

export function registerMockArtist(input: {
  name: string;
  email: string;
  password: string;
}): AuthUser {
  const account: MockArtistAccount = {
    email: input.email.trim().toLowerCase(),
    password: input.password,
    uid: `mock-artist-${Date.now()}`,
    name: input.name,
  };
  artistAccounts.push(account);
  return {
    uid: account.uid,
    email: account.email,
    role: "artist",
    name: account.name,
  };
}

export function findMockArtistLogin(
  email: string,
  password: string
): MockArtistAccount | null {
  const normalized = email.trim().toLowerCase();
  return (
    artistAccounts.find(
      (account) => account.email === normalized && account.password === password
    ) ?? null
  );
}
