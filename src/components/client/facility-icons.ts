import { Flag, Trophy, UtensilsCrossed, WavesLadder, type LucideIcon } from "lucide-react";
import type { FacilityKind } from "@/types/resort";

export const FACILITY_ICONS: Record<FacilityKind, LucideIcon> = {
  RESTAURANT_BAR: UtensilsCrossed,
  POOL: WavesLadder,
  TENNIS_PICKLEBALL: Trophy,
  GOLF: Flag,
};
