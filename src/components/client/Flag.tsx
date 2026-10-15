import type { Locale } from "@/types/resort";
import { cn } from "@/lib/utils";

const STAR = "M0,-1 L0.2245,-0.309 L0.951,-0.309 L0.363,0.118 L0.588,0.809 L0,0.382 L-0.588,0.809 L-0.363,0.118 L-0.951,-0.309 L-0.2245,-0.309 Z";

function Trigram({ x, y, rotate, broken }: { x: number; y: number; rotate: number; broken: boolean[] }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} fill="#000">
      {broken.map((isBroken, index) =>
        isBroken ? (
          <g key={index}>
            <rect x={-2.5} y={-2 + index * 1.6} width={2.2} height={1} />
            <rect x={0.3} y={-2 + index * 1.6} width={2.2} height={1} />
          </g>
        ) : (
          <rect key={index} x={-2.5} y={-2 + index * 1.6} width={5} height={1} />
        ),
      )}
    </g>
  );
}

export function Flag({ locale, className }: { locale: Locale; className?: string }) {
  const shared = cn("h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10", className);

  switch (locale) {
    case "vi":
      return (
        <svg viewBox="0 0 30 20" className={shared} aria-hidden>
          <rect width="30" height="20" fill="#DA251D" />
          <path d={STAR} transform="translate(15 10) scale(6)" fill="#FFFF00" />
        </svg>
      );
    case "zh":
      return (
        <svg viewBox="0 0 30 20" className={shared} aria-hidden>
          <rect width="30" height="20" fill="#EE1C25" />
          <path d={STAR} transform="translate(5 5) scale(3)" fill="#FFFF00" />
          <path d={STAR} transform="translate(10 2) scale(1) rotate(23)" fill="#FFFF00" />
          <path d={STAR} transform="translate(12 4) scale(1) rotate(46)" fill="#FFFF00" />
          <path d={STAR} transform="translate(12 7) scale(1) rotate(70)" fill="#FFFF00" />
          <path d={STAR} transform="translate(10 9) scale(1) rotate(20)" fill="#FFFF00" />
        </svg>
      );
    case "ko":
      return (
        <svg viewBox="0 0 30 20" className={shared} aria-hidden>
          <rect width="30" height="20" fill="#FFFFFF" />
          <g transform="translate(15 10) rotate(33.7)">
            <path d="M-5,0 A5,5 0 0 1 5,0 Z" fill="#CD2E3A" />
            <path d="M-5,0 A5,5 0 0 0 5,0 Z" fill="#0047A0" />
            <circle cx="-2.5" cy="0" r="2.5" fill="#CD2E3A" />
            <circle cx="2.5" cy="0" r="2.5" fill="#0047A0" />
          </g>
          <Trigram x={6} y={4.5} rotate={-56.3} broken={[false, false, false]} />
          <Trigram x={24} y={15.5} rotate={-56.3} broken={[true, true, true]} />
          <Trigram x={24} y={4.5} rotate={56.3} broken={[false, true, false]} />
          <Trigram x={6} y={15.5} rotate={56.3} broken={[true, false, true]} />
        </svg>
      );
    case "en":
      return (
        <svg viewBox="0 0 60 40" className={shared} aria-hidden>
          <rect width="60" height="40" fill="#012169" />
          <path d="M0,0 L60,40 M60,0 L0,40" stroke="#FFFFFF" strokeWidth="8" />
          <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="3" />
          <path d="M30,0 V40 M0,20 H60" stroke="#FFFFFF" strokeWidth="12" />
          <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="7" />
        </svg>
      );
  }
}
