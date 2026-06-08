"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export function SubmitCTA() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="submit-cta"
      ref={ref}
      className={cn(
        "relative overflow-hidden py-24 transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <div className="absolute inset-0 bg-muziika-orange/20" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-4xl tracking-wider text-white md:text-5xl">
          GOT TALENT? <span className="text-muziika-orange">RWANDA IS LISTENING.</span>
        </h2>
        <p className="mt-4 font-galindo text-lg text-white/70">
          Submit your YouTube or TikTok performance link and get discovered by Rwanda&apos;s music
          industry.
        </p>
        <Button
          asChild
          className="mt-8 h-14 rounded-pill bg-muziika-orange px-10 font-display text-base transition-all duration-200 hover:scale-[1.03] hover:bg-muziika-orange/90"
        >
          <Link to="/submit">Submit Your Performance</Link>
        </Button>
      </div>
    </section>
  );
}
