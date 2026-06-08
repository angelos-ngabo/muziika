import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToHash } from "@/components/layout/ScrollToHash";
import { SpaRedirectRestore } from "@/components/layout/SpaRedirectRestore";
import { PageTransition } from "@/components/mobile/PageTransition";
import { NotFoundPage } from "@/components/layout/NotFoundPage";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined;

const HomePage = lazy(() => import("@/app/page"));

const ExplorePage = lazy(() => import("@/app/explore/page"));
const SubmitPage = lazy(() => import("@/app/submit/page"));
const AboutPage = lazy(() => import("@/app/about/page"));
const LoginPage = lazy(() => import("@/app/auth/login/page"));
const RegisterPage = lazy(() => import("@/app/auth/register/page"));
const ForgotPasswordPage = lazy(() => import("@/app/auth/forgot-password/page"));
const ArtistProfilePage = lazy(() => import("@/app/artist/public/page"));
const AdminPage = lazy(() => import("@/app/admin/page"));
const AdminSubmissionsPage = lazy(() => import("@/app/admin/submissions/page"));
const JudgePage = lazy(() => import("@/app/judge/page"));
const ArtistDashboardPage = lazy(() => import("@/app/artist/dashboard/page"));
const ArtistSubmissionsPage = lazy(() => import("@/app/artist/dashboard/submissions/page"));
const ArtistSubmitPage = lazy(() => import("@/app/artist/dashboard/submit/page"));
const ArtistProfileDashboardPage = lazy(() => import("@/app/artist/dashboard/profile/page"));

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muziika-black">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muziika-orange/30 border-t-muziika-orange" />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <AuthProvider>
        <ScrollToHash />
        <SpaRedirectRestore />
        <PageTransition>
          <Suspense fallback={<PageLoader />}>
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/submit" element={<SubmitPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/login" element={<Navigate to="/login" replace />} />
            <Route path="/auth/register" element={<Navigate to="/register" replace />} />
            <Route path="/auth/forgot-password" element={<Navigate to="/forgot-password" replace />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/submissions" element={<AdminSubmissionsPage />} />
            <Route path="/judge" element={<JudgePage />} />
            <Route path="/artist/dashboard" element={<ArtistDashboardPage />} />
            <Route path="/artist/dashboard/submissions" element={<ArtistSubmissionsPage />} />
            <Route path="/artist/dashboard/submit" element={<ArtistSubmitPage />} />
            <Route path="/artist/dashboard/profile" element={<ArtistProfileDashboardPage />} />
            <Route path="/artist/:id" element={<ArtistProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </PageTransition>
        <Toaster richColors position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}
