import { cn } from "@/lib/utils";

interface AuthBlobsProps {
  className?: string;
  variant?: "panel" | "background";
}

export function AuthBlobs({ className, variant = "panel" }: AuthBlobsProps) {
  const scale = variant === "background" ? "scale-[0.85] md:scale-100" : "scale-100";

  return (
    <div
      className={cn(
        "pointer-events-none absolute overflow-visible",
        variant === "panel"
          ? "inset-0"
          : "left-1/2 top-0 h-[55%] w-full max-w-lg -translate-x-1/2 md:hidden",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className={cn(
          "absolute left-1/2 top-[8%] -translate-x-1/2",
          variant === "panel" ? "h-[85%] w-[95%]" : "h-full w-[120%]",
          scale
        )}
        viewBox="0 0 500 500"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M380 60C430 110 470 200 450 290C430 380 340 450 250 470C160 490 70 430 40 340C10 250 50 150 120 90C190 30 300 10 380 60Z"
          fill="#2a1408"
        />
        <path
          d="M350 100C395 145 420 215 400 285C380 355 310 405 245 420C180 435 115 395 90 330C65 265 95 195 150 145C205 95 285 70 350 100Z"
          fill="#4a240f"
          transform="translate(15, 20)"
        />
        <path
          d="M320 140C355 175 375 230 360 280C345 330 290 365 240 375C190 385 140 355 125 305C110 255 135 200 175 165C215 130 275 115 320 140Z"
          fill="#D96319"
          transform="translate(30, 40)"
        />
      </svg>
    </div>
  );
}
