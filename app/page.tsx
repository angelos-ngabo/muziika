"use client";

import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { MusicBackgroundDecorations } from "@/components/shared/MusicBackgroundDecorations";
import { MobileLayout } from "@/components/mobile/MobileLayout";
import { MobileHomePage } from "@/components/mobile/home/MobileHomePage";
import { Hero } from "@/components/home/Hero";
import { FeaturedArtists } from "@/components/home/FeaturedArtists";
import { TopPerformers } from "@/components/home/TopPerformers";
import { TrendingSection } from "@/components/home/TrendingSection";
import { AboutSection } from "@/components/home/AboutSection";
import { SubmitCTA } from "@/components/home/SubmitCTA";
import { useHomepageData } from "@/hooks/useHomepageData";
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function HomePage() {
  const { featured, topPerformers, trending, loading } = useHomepageData();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="relative min-h-screen bg-[#0a0a0a] font-space text-white">
        <MusicBackgroundDecorations />
        <div className="relative z-10 md:hidden">
          <MobileLayout>
            <MobileHomePage featured={featured} topPerformers={topPerformers} loading={loading} />
          </MobileLayout>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-hero-bg font-space text-white">
      <MusicBackgroundDecorations />
      <div className="relative z-10 hidden md:block">
        <Navbar />
        <Hero topArtist={topPerformers[0] ?? null} />
        <FeaturedArtists featured={featured} loading={loading} />
        <TopPerformers performers={topPerformers} loading={loading} />
        <TrendingSection trending={trending} loading={loading} />
        <AboutSection />
        <SubmitCTA />
        <Footer />
      </div>
    </div>
  );
}
