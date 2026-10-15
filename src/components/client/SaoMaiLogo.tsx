import Image from "next/image";
import { cn } from "@/lib/utils";

interface SaoMaiLogoProps {
  /** Uploaded logo, e.g. `/images/logo.png`. Falls back to the vector mark. */
  src?: string | null;
  tone?: "default" | "light";
  compact?: boolean;
  className?: string;
}

export function SaoMaiEmblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Sao Mai emblem">
      <rect x="2" y="2" width="60" height="60" rx="11" fill="#FFFFFF" stroke="#B81414" strokeWidth="3" />
      {/* Three ascending pillars */}
      <rect x="13" y="31" width="10" height="14" rx="1" fill="#B81414" />
      <rect x="26" y="22" width="10" height="23" rx="1" fill="#B81414" />
      <rect x="39" y="10" width="12" height="35" rx="1" fill="#B81414" />
      {/* Morning star inside the tallest pillar */}
      <polygon
        fill="#FFFFFF"
        points="45,14.6 46.3,18.2 50.1,18.3 47.1,20.6 48.2,24.3 45,22.1 41.8,24.3 42.9,20.6 39.9,18.3 43.7,18.2"
      />
      {/* Orbit swoosh across the pillars */}
      <path
        d="M9 41.5C19 33 33 28.5 55 29.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* Double base lines */}
      <rect x="13" y="48.5" width="38" height="2.6" rx="1.3" fill="#B81414" />
      <rect x="13" y="53" width="38" height="2.6" rx="1.3" fill="#B81414" />
    </svg>
  );
}

export function SaoMaiLogo({ src, tone = "default", compact = false, className }: SaoMaiLogoProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt="Sao Mai Resort Phú Mỹ - Việt Nam"
        width={220}
        height={64}
        priority
        className={cn("h-12 w-auto object-contain", className)}
      />
    );
  }

  const isLight = tone === "light";

  return (
    <span className={cn("inline-flex items-center gap-2 sm:gap-2.5", className)}>
      <SaoMaiEmblem className={cn("shrink-0", compact ? "size-10" : "size-10 sm:size-12")} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-sans font-extrabold tracking-[0.06em] whitespace-nowrap uppercase",
            compact ? "text-[15px]" : "text-[13px] min-[360px]:text-[15px] sm:text-[19px]",
            isLight ? "text-white" : "text-crimson",
          )}
        >
          Sao Mai Resort
        </span>
        <span
          className={cn(
            "mt-1 font-sans font-semibold tracking-[0.22em] whitespace-nowrap uppercase",
            compact ? "text-[9px]" : "text-[8px] min-[360px]:text-[9px] sm:text-[10.5px]",
            isLight ? "text-white/70" : "text-charcoal",
          )}
        >
          Phú Mỹ - Việt Nam
        </span>
      </span>
    </span>
  );
}
