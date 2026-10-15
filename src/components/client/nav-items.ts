import { ui } from "@/data/ui-dictionary";
import type { LocalizedString } from "@/types/resort";

export const SECTION_IDS = {
  home: "home",
  stay: "luu-tru",
  events: "tiec-cuoi-hoi-nghi",
  dining: "am-thuc",
  amenities: "tien-ich",
  offers: "uu-dai",
  contact: "lien-he",
} as const;

export const ROUTES = {
  home: "/",
  services: "/dich-vu",
  news: "/tin-tuc",
  careers: "/tuyen-dung",
} as const;

export interface NavItem {
  id: string;
  href: string;
  label: LocalizedString;
  /** Homepage section tracked by the scroll spy; `null` for standalone pages. */
  sectionId: string | null;
  /** Active when the current pathname starts with this route. */
  route: string | null;
  /** Renders the services dropdown fed by `ResortFacility` data. */
  hasServicesMenu?: boolean;
}

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { id: "stay", href: `/#${SECTION_IDS.stay}`, label: ui.nav.stay, sectionId: SECTION_IDS.stay, route: null },
  { id: "events", href: `/#${SECTION_IDS.events}`, label: ui.nav.events, sectionId: SECTION_IDS.events, route: null },
  {
    id: "services",
    href: ROUTES.services,
    label: ui.nav.services,
    sectionId: null,
    route: ROUTES.services,
    hasServicesMenu: true,
  },
  { id: "news", href: ROUTES.news, label: ui.nav.news, sectionId: null, route: ROUTES.news },
  { id: "careers", href: ROUTES.careers, label: ui.nav.careers, sectionId: null, route: ROUTES.careers },
  { id: "contact", href: `/#${SECTION_IDS.contact}`, label: ui.nav.contact, sectionId: SECTION_IDS.contact, route: null },
];
