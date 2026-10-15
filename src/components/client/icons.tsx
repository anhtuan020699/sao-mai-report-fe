import {
  AirVent,
  Bath,
  CircleParking,
  Coffee,
  CookingPot,
  Croissant,
  Fence,
  Laptop,
  Tv,
  Vault,
  Wifi,
  Wine,
  type LucideIcon,
} from "lucide-react";
import type { AmenityKey } from "@/types/resort";

export const AMENITY_ICONS: Record<AmenityKey, LucideIcon> = {
  WIFI: Wifi,
  AIR_CONDITIONING: AirVent,
  SMART_TV: Tv,
  MINIBAR: Wine,
  BATHTUB: Bath,
  VERANDA: Fence,
  KITCHENETTE: CookingPot,
  WORK_DESK: Laptop,
  COFFEE_MAKER: Coffee,
  SAFE_BOX: Vault,
  BREAKFAST: Croissant,
  PARKING: CircleParking,
};

export function ZaloIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect width="48" height="48" rx="12" fill="#0068FF" />
      <text
        x="24"
        y="29.5"
        textAnchor="middle"
        fill="#fff"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="14"
        fontWeight="700"
      >
        Zalo
      </text>
    </svg>
  );
}

export function MessengerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.14.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.98-.87a.8.8 0 0 1 .54-.04c.91.25 1.87.38 2.9.38 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z"
      />
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.5V4.46A20 20 0 0 0 14.3 4.3c-2.17 0-3.66 1.33-3.66 3.76v2.44H8.2v3h2.44V21h2.86Z"
      />
    </svg>
  );
}
