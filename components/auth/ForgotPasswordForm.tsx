"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { sendPasswordReset } from "@/lib/auth-actions";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import {
  AuthField,
  AuthPrimaryButton,
  validateEmail,
} from "@/components/auth/auth-shared";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccess(false);

    const emailErr = validateEmail(email);
    setEmailError(emailErr ?? "");
    if (emailErr) return;

    setLoading(true);
    try {
      await sendPasswordReset(email.trim());
      setSuccess(true);
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="font-inter text-[26px] font-bold text-white md:text-[32px]">
          Reset Password
        </h2>
        <p className="mt-1.5 font-inter text-sm text-white/55">
          Enter your email and we&apos;ll send a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthField
          id="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={setEmail}
          onBlur={() => setEmailError(validateEmail(email) ?? "")}
          onFocusClear={() => setEmailError("")}
          error={emailError}
          leftIcon={<Mail className="h-4 w-4" />}
          autoComplete="email"
        />

        <div className="flex flex-col gap-4">
          <AuthPrimaryButton loading={loading}>Send reset link</AuthPrimaryButton>

          {formError && (
            <p className="animate-auth-fade-in text-center font-inter text-xs text-[#E24B4A]">
              {formError}
            </p>
          )}

          {success && (
            <p className="animate-auth-fade-in text-center font-inter text-xs text-[#2E9E5B]">
              Check your inbox for a reset link
            </p>
          )}
        </div>

        <Link
          to="/login"
          className="mt-6 text-center font-space text-[13px] text-hero-orange no-underline transition-colors hover:text-[#e05e00]"
        >
          ← Back to sign in
        </Link>
      </form>
    </div>
  );
}
