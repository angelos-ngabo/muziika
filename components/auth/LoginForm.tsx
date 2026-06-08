"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginWithEmail } from "@/lib/auth-login";
import { redirectByRole, signInWithGoogle } from "@/lib/auth-actions";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { isStaffRole } from "@/lib/mobile-access";
import { MobileStaffNotice } from "@/components/mobile/MobileStaffNotice";
import {
  AuthDivider,
  AuthField,
  AuthGoogleButton,
  AuthPrimaryButton,
  validateEmail,
  validatePassword,
} from "@/components/auth/auth-shared";

function AuthCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span className="h-4 w-4 rounded border-[1.5px] border-white/25 bg-white/5 transition-colors peer-checked:border-muziika-orange peer-checked:bg-muziika-orange" />
        {checked && (
          <svg
            className="pointer-events-none absolute h-2.5 w-2.5 text-white"
            viewBox="0 0 12 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 5.5L4.5 9L11 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="font-inter text-[13px] text-white/70">{label}</span>
    </label>
  );
}

export function LoginForm() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const isMobile = useIsMobile();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [staffBlockRole, setStaffBlockRole] = useState<"admin" | "judge" | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setStaffBlockRole(null);

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setEmailError(emailErr ?? "");
    setPasswordError(passwordErr ?? "");
    if (emailErr || passwordErr) return;

    setLoading(true);
    try {
      const user = await loginWithEmail(email, password);
      if (isMobile && isStaffRole(user.role)) {
        await signOut();
        setStaffBlockRole(user.role === "judge" ? "judge" : "admin");
        return;
      }
      redirectByRole(user.role, user.uid, navigate);
    } catch (error) {
      setFormError(getAuthErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setFormError("");
    setStaffBlockRole(null);
    setGoogleLoading(true);
    try {
      const user = await signInWithGoogle();
      if (isMobile && isStaffRole(user.role)) {
        await signOut();
        setStaffBlockRole(user.role === "judge" ? "judge" : "admin");
        return;
      }
      redirectByRole(user.role, user.uid, navigate);
    } catch (error) {
      const message = getAuthErrorMessage(error);
      if (message !== "Sign-in was cancelled.") {
        setFormError(message);
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="font-inter text-[26px] font-bold text-white md:text-[32px]">
          Welcome Back
        </h2>
        <p className="mt-1.5 font-inter text-sm text-white/55">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
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

          <AuthField
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            onBlur={() => setPasswordError(validatePassword(password) ?? "")}
            onFocusClear={() => setPasswordError("")}
            error={passwordError}
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
            autoComplete="current-password"
          />

          <div className="my-4 flex items-center justify-between">
            <AuthCheckbox checked={remember} onChange={setRemember} label="Remember me" />
            <Link
              to="/forgot-password"
              className="font-space text-[13px] text-hero-orange no-underline transition-colors hover:text-[#e05e00]"
            >
              Forgot Password
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {staffBlockRole && isMobile ? (
            <MobileStaffNotice
              role={staffBlockRole}
              variant="inline"
              onExplore={() => navigate("/explore")}
            />
          ) : (
            <AuthPrimaryButton loading={loading}>Sign in</AuthPrimaryButton>
          )}

          {formError && !staffBlockRole && (
            <p className="animate-auth-fade-in text-center font-inter text-xs text-[#E24B4A]">
              {formError}
            </p>
          )}

          {!staffBlockRole && (
            <>
              <AuthDivider />
              <AuthGoogleButton onClick={handleGoogleSignIn} loading={googleLoading} />
            </>
          )}
        </div>

        <p className="mt-6 text-center font-inter text-sm text-white/55">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-space text-sm font-medium text-hero-orange no-underline transition-colors hover:text-[#e05e00]"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
