"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Restores client route after static host 404.html redirect (e.g. GitHub Pages). */
export function SpaRedirectRestore() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = sessionStorage.getItem("muziika-spa-redirect");
    if (!redirect) return;
    sessionStorage.removeItem("muziika-spa-redirect");
    navigate(redirect, { replace: true });
  }, [navigate]);

  return null;
}
