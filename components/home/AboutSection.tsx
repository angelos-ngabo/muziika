"use client";

import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const { ref, visible } = useScrollReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={cn(
        "py-20 transition-all duration-500 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="overflow-hidden rounded-[36px] bg-white p-8 md:p-12">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <img
              src="/figma-assets/speaker.png"
              alt="Muziika main stage"
              className="h-32 w-32 shrink-0 rounded-full object-cover"
            />
            <div className="text-center md:text-left">
              <h3 className="font-galindo text-2xl text-muziika-black">muziika</h3>
              <p className="mt-1 font-galindo text-lg text-muziika-gray">main stage</p>
              <p className="mt-4 max-w-md font-galindo text-sm text-muziika-gray">
                The platform where emerging African artists get discovered, judged, and featured.
              </p>
              <Link
                to="/explore"
                className="mt-4 inline-block font-galindo text-sm text-muziika-orange-accent transition-colors hover:underline"
              >
                learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
