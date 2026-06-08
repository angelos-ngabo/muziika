"use client";

const WAVE_HEIGHTS = [8, 14, 20, 24, 18, 12, 22, 16, 10, 20, 8, 14, 20, 24, 18, 12, 22, 16, 10, 20];

export function AudioPlayer() {
  return (
    <div className="flex items-center gap-3 rounded-[50px] bg-[#f0f0f0] px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-hero-orange">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 2.5v9l8-4.5-8-4.5z" fill="#ffffff" />
        </svg>
      </div>
      <div className="flex h-6 items-center gap-[3px]" aria-hidden="true">
        {WAVE_HEIGHTS.map((height, index) => (
          <span
            key={index}
            className="hero-wave-bar w-[3px] rounded-[2px] bg-[#333333]"
            style={{
              height: `${height}px`,
              animationDelay: `${index * 80}ms`,
              ["--wave-peak" as string]: `${Math.max(4, Math.round(height * 0.4))}px`,
              ["--wave-base" as string]: `${height}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
