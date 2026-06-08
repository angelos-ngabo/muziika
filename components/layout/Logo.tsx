import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string | null;
}

const sizes = {
  sm: { width: 120, height: 30 },
  md: { width: 160, height: 40 },
  lg: { width: 200, height: 50 },
};

export function Logo({ className, size = "md", href = "/" }: LogoProps) {
  const dims = sizes[size];
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt="Muziika"
      width={dims.width}
      height={dims.height}
      className={cn("object-contain", className)}
      loading="eager"
      decoding="async"
    />
  );

  if (href !== null) {
    return (
      <Link to={href} className="inline-flex shrink-0">
        {img}
      </Link>
    );
  }

  return img;
}
