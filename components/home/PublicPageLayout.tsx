"use client";

import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { MusicBackgroundDecorations } from "@/components/shared/MusicBackgroundDecorations";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface PublicPageLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  hideBottomNav?: boolean;
}

export function PublicPageLayout({
  children,
  hideNav = false,
  hideBottomNav = false,
}: PublicPageLayoutProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="relative min-h-screen bg-[#0a0a0a] font-space text-white">
        <MusicBackgroundDecorations />
        <div className="relative z-10 md:hidden">
          <MobileLayout hideBottomNav={hideBottomNav}>{children}</MobileLayout>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-hero-bg font-space text-white">
      <MusicBackgroundDecorations />
      <div className="relative z-10 hidden md:block">
        {!hideNav && <Navbar />}
        {children}
        <Footer />
      </div>
    </div>
  );
}
