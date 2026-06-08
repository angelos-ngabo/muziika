# Muziika

A music talent platform for discovering, judging, and featuring African artists.

## Tech Stack

- Vite + React Router + TypeScript
- Firebase (Firestore, Auth)
- Tailwind CSS + Shadcn/UI

## Getting Started

1. Copy `.env.example` to `.env.local` and fill in your Firebase config.
2. Deploy `firestore.rules` to your Firebase project.
3. Install dependencies and run:

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Mock Data

When Firebase env vars are empty, the app runs with mock data so you can preview all pages.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Public homepage |
| `/explore` | Browse approved artists |
| `/submit` | Artist submission form (no login) |
| `/login` | Admin/Judge login |
| `/admin` | Admin dashboard (protected) |
| `/judge` | Judge scoring dashboard (protected) |
| `/artist/[id]` | Public artist profile |
