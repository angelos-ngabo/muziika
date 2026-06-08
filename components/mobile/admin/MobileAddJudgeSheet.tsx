"use client";

import { useState, useEffect, useRef } from "react";
import { createJudgeAccount } from "@/lib/auth";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { GENRES } from "@/types";
import type { CreateJudgeInput, Genre } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const EMPTY_FORM: CreateJudgeInput = {
  name: "",
  email: "",
  password: "",
  genre: "R&B",
};

interface MobileAddJudgeSheetProps {
  open: boolean;
  onClose: () => void;
  assignedBy: string;
  onCreated?: () => void;
}

export function MobileAddJudgeSheet({
  open,
  onClose,
  assignedBy,
  onCreated,
}: MobileAddJudgeSheetProps) {
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<CreateJudgeInput>(EMPTY_FORM);
  const [creating, setCreating] = useState(false);
  const touchStartY = useRef(0);
  const [dragY, setDragY] = useState(0);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setDragY(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open && !mounted) return null;

  const handleCreate = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Please fill in name, email, and password.");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setCreating(true);
    try {
      await createJudgeAccount(
        {
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          genre: form.genre,
        },
        assignedBy
      );
      toast.success("Judge account created.");
      setForm(EMPTY_FORM);
      onCreated?.();
      onClose();
    } catch (error) {
      toast.error(getAuthErrorMessage(error));
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close"
        className={cn(
          "fixed inset-0 z-[299] border-none bg-black/60 transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[300] max-h-[85vh] overflow-y-auto rounded-t-[24px] bg-[#111111] pb-[env(safe-area-inset-bottom)] transition-transform duration-300 md:hidden",
          open ? "translate-y-0" : "translate-y-full"
        )}
        style={dragY > 0 ? { transform: `translateY(${dragY}px)` } : undefined}
        onTransitionEnd={() => {
          if (!open) setMounted(false);
        }}
        onTouchStart={(e) => {
          touchStartY.current = e.touches[0].clientY;
        }}
        onTouchMove={(e) => {
          const delta = e.touches[0].clientY - touchStartY.current;
          if (delta > 0) setDragY(delta);
        }}
        onTouchEnd={() => {
          if (dragY > 80) onClose();
          setDragY(0);
        }}
      >
        <div className="mx-auto mb-4 mt-3 h-1 w-10 rounded-sm bg-[#2a2a2a]" />
        <div className="px-5 pb-6">
          <h2 className="font-space text-base font-bold text-white">Add Judge</h2>
          <p className="mt-1 font-space text-xs text-[#888888]">
            Create a login for a genre judge.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="font-space text-[10px] uppercase tracking-[0.08em] text-[#555555]">
                Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                className="mt-1.5 w-full rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] px-3.5 py-3 font-space text-base text-white outline-none placeholder:text-[#555555]"
              />
            </div>
            <div>
              <label className="font-space text-[10px] uppercase tracking-[0.08em] text-[#555555]">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="judge@muziika.rw"
                className="mt-1.5 w-full rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] px-3.5 py-3 font-space text-base text-white outline-none placeholder:text-[#555555]"
              />
            </div>
            <div>
              <label className="font-space text-[10px] uppercase tracking-[0.08em] text-[#555555]">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Min. 8 characters"
                className="mt-1.5 w-full rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] px-3.5 py-3 font-space text-base text-white outline-none placeholder:text-[#555555]"
              />
            </div>
            <div>
              <label className="font-space text-[10px] uppercase tracking-[0.08em] text-[#555555]">
                Genre
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm({ ...form, genre: g as Genre })}
                    className={cn(
                      "mobile-tap rounded-[50px] border px-3 py-1.5 font-space text-[10px] font-bold uppercase",
                      form.genre === g
                        ? "border-[#FF6B00] bg-[#FF6B00] text-white"
                        : "border-[#2a2a2a] bg-[#1a1a1a] text-[#555555]"
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            disabled={creating}
            className="mobile-tap mt-6 flex h-12 w-full items-center justify-center rounded-xl bg-[#FF6B00] font-space text-sm font-bold uppercase text-white disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Judge"}
          </button>
        </div>
      </div>
    </>
  );
}
