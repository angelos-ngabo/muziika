"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.56 2.98-2.26 5.5-4.82 7.2l7.73 6c4.51-4.18 7.13-10.33 7.13-17.67z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export function AuthSpinner() {
  return (
    <span
      className="inline-block h-[18px] w-[18px] animate-spin rounded-full border-2 border-white/30 border-t-white"
      aria-hidden="true"
    />
  );
}

interface AuthFieldProps {
  id: string;
  label: string;
  labelExtra?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocusClear?: () => void;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  autoComplete?: string;
}

export function AuthField({
  id,
  label,
  labelExtra,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  onFocusClear,
  error,
  leftIcon,
  rightIcon,
  autoComplete,
}: AuthFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1.5 font-inter text-[13px] font-medium text-white/80">
        {label}
        {labelExtra && <span className="ml-1 font-normal text-white/45">{labelExtra}</span>}
      </label>
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white/40">
            {leftIcon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setFocused(true);
            onFocusClear?.();
          }}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          autoComplete={autoComplete}
          className={cn(
            "h-[52px] w-full rounded-full border-[1.5px] bg-white/5 font-inter text-sm text-white outline-none transition-all duration-150 ease-in-out placeholder:text-white/35",
            leftIcon ? "pl-11 pr-[18px]" : "px-[18px]",
            rightIcon && "pr-11",
            error
              ? "border-[#E24B4A]"
              : focused
                ? "border-muziika-orange shadow-[0_0_0_3px_rgba(217,99,25,0.18)]"
                : "border-white/15"
          )}
        />
        {rightIcon && (
          <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">{rightIcon}</span>
        )}
      </div>
      {error && (
        <p className="animate-auth-fade-in mt-1 font-inter text-xs text-[#E24B4A] transition-opacity duration-200">
          {error}
        </p>
      )}
    </div>
  );
}

interface AuthPrimaryButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

export function AuthPrimaryButton({
  children,
  loading,
  disabled,
  type = "submit",
  onClick,
}: AuthPrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="flex h-[52px] w-full cursor-pointer items-center justify-center rounded-full border-none bg-auth-button-gradient font-inter text-[15px] font-semibold text-white transition-all duration-150 ease-in-out hover:scale-[1.005] hover:opacity-[0.92] active:scale-[0.998] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
    >
      {loading ? <AuthSpinner /> : children}
    </button>
  );
}

export function AuthGoogleButton({ onClick, loading }: { onClick: () => void; loading?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="flex h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border-[1.5px] border-white/15 bg-white/5 font-inter text-sm font-medium text-white transition-all duration-150 ease-in-out hover:border-muziika-orange hover:bg-white/10 disabled:opacity-60"
    >
      {loading ? (
        <span
          className="inline-block h-[18px] w-[18px] animate-spin rounded-full border-2 border-white/20 border-t-muziika-orange"
          aria-hidden="true"
        />
      ) : (
        <GoogleIcon />
      )}
      <span>Sign in with Google</span>
    </button>
  );
}

export function AuthDivider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 border-t border-white/15" />
      <span className="font-inter text-[13px] text-white/40">or</span>
      <div className="h-px flex-1 border-t border-white/15" />
    </div>
  );
}

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "Email is required.";
  if (!email.includes("@") || !email.includes(".")) return "Please enter a valid email address.";
  return undefined;
}

export function validatePassword(password: string): string | undefined {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return undefined;
}
