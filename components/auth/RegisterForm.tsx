"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Mic } from "lucide-react";
import { registerWithEmail, redirectByRole } from "@/lib/auth-actions";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import {
  AuthField,
  AuthPrimaryButton,
  validateEmail,
  validatePassword,
} from "@/components/auth/auth-shared";

export function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [stageName, setStageName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const setFieldError = (key: string, value: string) => {
    setFieldErrors((prev) => ({ ...prev, [key]: value }));
  };

  const validateAll = (): boolean => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Full name is required.";
    errors.email = validateEmail(email) ?? "";
    errors.password = validatePassword(password) ?? "";
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }
    const cleaned = Object.fromEntries(
      Object.entries(errors).filter(([, v]) => v)
    );
    setFieldErrors(cleaned);
    return Object.keys(cleaned).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!validateAll()) return;

    setLoading(true);
    try {
      const user = await registerWithEmail({
        name: name.trim(),
        stageName: stageName.trim() || undefined,
        email: email.trim(),
        password,
      });
      redirectByRole(user.role, user.uid, navigate);
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
          Create Account
        </h2>
        <p className="mt-1.5 font-inter text-sm text-white/55">
          Sign up as an artist to submit performances and build your profile
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <AuthField
            id="name"
            label="Full name"
            placeholder="Your full name"
            value={name}
            onChange={setName}
            onBlur={() => setFieldError("name", !name.trim() ? "Full name is required." : "")}
            onFocusClear={() => setFieldError("name", "")}
            error={fieldErrors.name}
            leftIcon={<User className="h-4 w-4" />}
            autoComplete="name"
          />

          <AuthField
            id="stageName"
            label="Stage name"
            labelExtra="(optional)"
            placeholder="Your stage name"
            value={stageName}
            onChange={setStageName}
            leftIcon={<Mic className="h-4 w-4" />}
            autoComplete="nickname"
          />

          <AuthField
            id="email"
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={setEmail}
            onBlur={() => setFieldError("email", validateEmail(email) ?? "")}
            onFocusClear={() => setFieldError("email", "")}
            error={fieldErrors.email}
            leftIcon={<Mail className="h-4 w-4" />}
            autoComplete="email"
          />

          <AuthField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            value={password}
            onChange={setPassword}
            onBlur={() => setFieldError("password", validatePassword(password) ?? "")}
            onFocusClear={() => setFieldError("password", "")}
            error={fieldErrors.password}
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="border-none bg-transparent text-white/40 transition-colors hover:text-muziika-orange"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            autoComplete="new-password"
          />

          <AuthField
            id="confirmPassword"
            label="Confirm password"
            type={showConfirm ? "text" : "password"}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            onBlur={() => {
              if (!confirmPassword) {
                setFieldError("confirmPassword", "Please confirm your password.");
              } else if (confirmPassword !== password) {
                setFieldError("confirmPassword", "Passwords do not match.");
              } else {
                setFieldError("confirmPassword", "");
              }
            }}
            onFocusClear={() => setFieldError("confirmPassword", "")}
            error={fieldErrors.confirmPassword}
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="border-none bg-transparent text-white/40 transition-colors hover:text-muziika-orange"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            autoComplete="new-password"
          />
        </div>

        <div className="flex flex-col gap-4">
          <AuthPrimaryButton loading={loading}>Create account</AuthPrimaryButton>

          {formError && (
            <p className="animate-auth-fade-in text-center font-inter text-xs text-[#E24B4A]">
              {formError}
            </p>
          )}
        </div>

        <p className="text-center font-inter text-[13px] text-white/45">
          Judges are invited and assigned by the Muziika admin team.
        </p>

        <p className="mt-6 text-center font-inter text-sm text-white/55">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-hero-orange no-underline transition-colors hover:text-[#e05e00]"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
