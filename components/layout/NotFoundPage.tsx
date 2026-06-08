"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { redirectByRole } from "@/lib/auth-actions";
import { MusicBackgroundDecorations } from "@/components/shared/MusicBackgroundDecorations";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (user?.role) {
      redirectByRole(user.role, user.uid, navigate);
    }
  }, [user, loading, navigate]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-hero-bg px-6 font-space text-white">
      <MusicBackgroundDecorations />
      <div className="relative z-10 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-hero-orange">404</p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mt-2 max-w-md text-sm text-white/60">
          This route does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="orange" className="rounded-full lowercase">
            <Link to="/">Go home</Link>
          </Button>
          {!loading && !user && (
            <Button asChild variant="outline" className="rounded-full border-white/20 lowercase text-white">
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
