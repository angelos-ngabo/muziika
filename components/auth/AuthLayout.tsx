"use client";

import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { MusicBackgroundDecorations } from "@/components/shared/MusicBackgroundDecorations";
import { MobileLayout } from "@/components/mobile/MobileLayout";

interface AuthLayoutProps {
  children: React.ReactNode;
}

function CardHeading() {
  return (
    <h1 className="mt-2 font-sans">
      <span className="block text-[42px] font-extrabold leading-[1.15] text-white">Start Your</span>
      <span className="block text-[42px] font-extrabold leading-[1.15] text-hero-orange">Journey</span>
      <span className="block text-[42px] font-extrabold leading-[1.15] text-hero-orange">with Us</span>
    </h1>
  );
}

function DecorativeBlobs({ scale = 1 }: { scale?: number }) {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: 320 * scale,
          height: 320 * scale,
          background: "#2a1408",
          borderRadius: "50% 40% 60% 45%",
          bottom: -60 * scale,
          right: -60 * scale,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: 240 * scale,
          height: 240 * scale,
          background: "#4a240f",
          borderRadius: "45% 55% 40% 60%",
          bottom: 20 * scale,
          right: 20 * scale,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 160 * scale,
          height: 160 * scale,
          background: "#D96319",
          bottom: 80 * scale,
          right: 80 * scale,
        }}
      />
    </>
  );
}

function CardFooter() {
  return (
    <div className="absolute bottom-8 left-9 right-9 z-10 flex items-center gap-3">
      <img src="/logo.svg" alt="Muziika" width={40} height={40} className="h-10 w-10 shrink-0 object-contain" />
      <p className="max-w-[200px] text-[13px] leading-[1.4] text-muziika-orange-light/90">
        Rwanda&apos;s leading talent discovery platform
      </p>
    </div>
  );
}

function DesktopLeftPanel() {
  return (
    <aside className="relative flex min-h-screen w-[45%] shrink-0 items-center justify-center bg-transparent">
      <div
        className="relative overflow-hidden bg-[#140c08]/90 backdrop-blur-sm"
        style={{
          width: "85%",
          height: "85vh",
          borderRadius: 32,
          padding: "40px 36px",
        }}
      >
        <DecorativeBlobs />
        <div className="relative z-10">
          <CardHeading />
        </div>
        <CardFooter />
      </div>
    </aside>
  );
}

function MobileAuthContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45%] overflow-hidden" aria-hidden="true">
        <DecorativeBlobs scale={1.2} />
      </div>

      <Link
        to="/"
        aria-label="Close"
        className="absolute right-5 top-2 z-20 border-none bg-transparent p-0 text-white/70"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </Link>

      <div className="relative z-10 px-7 pb-4 pt-2">
        <div className="pb-6 pt-2">
          <CardHeading />
        </div>

        <div className="w-full rounded-t-[28px] border-t border-white/10 bg-muziika-dashboard/90 px-6 pb-8 pt-9 backdrop-blur-md">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="relative min-h-screen bg-hero-bg font-space text-white md:hidden">
        <MusicBackgroundDecorations />
        <div className="relative z-10 md:hidden">
          <MobileLayout>
            <MobileAuthContent>{children}</MobileAuthContent>
          </MobileLayout>
        </div>
      </div>

      <div className="relative hidden min-h-screen bg-hero-bg font-space text-white md:flex">
        <MusicBackgroundDecorations />
        <div className="relative z-10 flex min-h-screen w-full">
          <DesktopLeftPanel />

          <Link
            to="/"
            aria-label="Close"
            className="absolute right-7 top-6 z-50 border-none bg-transparent p-0 text-xl text-white/70 transition-opacity hover:text-white"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </Link>

          <main className="relative flex min-h-screen flex-1 flex-col bg-transparent md:w-[55%] md:items-center md:justify-center md:p-12">
            <div className="mt-auto w-full rounded-t-[28px] border-t border-white/10 bg-muziika-dashboard/90 px-6 pb-10 pt-9 backdrop-blur-md md:mt-0 md:max-w-[420px] md:rounded-none md:border-t-0 md:bg-transparent md:px-0 md:pb-0 md:pt-0 md:backdrop-blur-none">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
