/**
 * Domain types for Sao Mai Phú Mỹ Resort.
 *
 * Every entity mirrors a future Prisma model: string ids, ISO date strings,
 * UPPER_SNAKE enums and localized fields stored as JSON columns
 * (`Record<Locale, string>`), so the data layer can be swapped without
 * touching UI components.
 */

/* ------------------------------------------------------------------ */
/* i18n primitives                                                     */
/* ------------------------------------------------------------------ */

export type Locale = "vi" | "en" | "ko" | "zh";

export type LocalizedString = Record<Locale, string>;
export type LocalizedStringArray = Record<Locale, string[]>;

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

export interface BaseEntity {
  id: string;
  slug: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ResortImage {
  url: string;
  alt: LocalizedString;
}

/* ------------------------------------------------------------------ */
/* Accommodation                                                       */
/* ------------------------------------------------------------------ */

export type RoomType =
  | "FAMILY_VILLA"
  | "SUITE_VILLA"
  | "SWEETY"
  | "DELUXE"
  | "SUPERIOR"
  | "STANDARD_B"
  | "STANDARD_A";

export type RoomGroup = "VILLA" | "HOTEL";

export type ViewType = "LAKE" | "GARDEN" | "POOL";

export type AmenityKey =
  | "WIFI"
  | "AIR_CONDITIONING"
  | "SMART_TV"
  | "MINIBAR"
  | "BATHTUB"
  | "VERANDA"
  | "KITCHENETTE"
  | "WORK_DESK"
  | "COFFEE_MAKER"
  | "SAFE_BOX"
  | "BREAKFAST"
  | "PARKING";

export interface RoomCategory extends BaseEntity {
  type: RoomType;
  group: RoomGroup;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  features: LocalizedStringArray;
  badgeText: LocalizedString | null;
  bedType: LocalizedString;
  sizeSqm: number;
  viewType: ViewType;
  /** Guests included in the rate; extras are charged per `StayPolicy.surcharges`. */
  standardGuests: number;
  totalUnits: number;
  /** Published nightly rate (breakfast, service charge & VAT included). */
  basePriceVnd: number;
  /** Day-use rate for a `StayPolicy.hourlyBlockHours` block. */
  hourlyPriceVnd: number;
  monthlyPriceVnd: number;
  coverImage: ResortImage;
  gallery: ResortImage[];
  amenities: AmenityKey[];
}

export interface StaySurcharge {
  id: string;
  label: LocalizedString;
  /** `0` means free of charge; `null` means the note alone describes the rule. */
  priceVnd: number | null;
  unit: LocalizedString | null;
  note: LocalizedString | null;
}

export interface StayTimeRule {
  id: string;
  kind: "EARLY_CHECKIN" | "LATE_CHECKOUT";
  from: string;
  /** `null` means "from `from` onwards". */
  to: string | null;
  /** Percentage of the nightly rate; `0` means free (subject to availability). */
  surchargePercent: number;
}

export interface StayPolicy {
  effectiveFrom: string;
  checkInTime: string;
  checkOutTime: string;
  hourlyBlockHours: number;
  inclusions: LocalizedStringArray;
  surcharges: StaySurcharge[];
  timeRules: StayTimeRule[];
}

/* ------------------------------------------------------------------ */
/* MICE & Weddings                                                     */
/* ------------------------------------------------------------------ */

export interface HallCapacity {
  theater: number;
  banquet: number;
  classroom: number;
  uShape: number;
}

export interface EventHall extends BaseEntity {
  code: "SAO_MAI_CENTER_1" | "SAO_MAI_CENTER_2" | "VIP_MEETING_A";
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  features: LocalizedStringArray;
  badgeText: LocalizedString | null;
  areaSqm: number;
  ceilingHeightM: number;
  banquetTables: number;
  capacity: HallCapacity;
  isFlagship: boolean;
  coverImage: ResortImage;
  gallery: ResortImage[];
}

export type EventType =
  | "WEDDING"
  | "CUSTOMER_CONFERENCE"
  | "GALA_DINNER"
  | "TEAM_BUILDING"
  | "YEAR_END_PARTY";

export type GuestRange = "100_300" | "300_500" | "500_800" | "800_1200" | "1200_PLUS";

export type EventServiceOption =
  | "LED_SCREEN"
  | "SOUND_LIGHT"
  | "TEA_BREAK"
  | "CORPORATE_LUNCH"
  | "GROUP_STAY"
  | "DECORATION"
  | "TEAM_BUILDING_MC";

/* ------------------------------------------------------------------ */
/* Services (Dining, Sports, Wellness)                                 */
/* ------------------------------------------------------------------ */

export type ServiceCategory =
  | "DINING"
  | "SPORTS"
  | "POOL_NATURE"
  | "WELLNESS_ENTERTAINMENT";

export type ServiceCtaAction = "TABLE_BOOKING" | "COURT_BOOKING" | "STAY_BOOKING" | "NONE";

export interface ResortService extends BaseEntity {
  category: ServiceCategory;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  features: LocalizedStringArray;
  badgeText: LocalizedString | null;
  openingHours: LocalizedString;
  ctaAction: ServiceCtaAction;
  coverImage: ResortImage;
  gallery: ResortImage[];
}

/** Individual facility shown on the `/dich-vu` page; `slug` doubles as its anchor id. */
export type FacilityKind = "RESTAURANT_BAR" | "POOL" | "TENNIS_PICKLEBALL" | "GOLF" | "KARAOKE" | "GYM_SPA";

export interface ResortFacility extends BaseEntity {
  kind: FacilityKind;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  features: LocalizedStringArray;
  badgeText: LocalizedString | null;
  openingHours: LocalizedString;
  ctaAction: ServiceCtaAction;
  coverImage: ResortImage;
  gallery: ResortImage[];
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

export type PromotionCategory = "WEDDING" | "MICE" | "SPORTS" | "STAY" | "NEWS";

export interface PromotionPost extends BaseEntity {
  category: PromotionCategory;
  title: LocalizedString;
  excerpt: LocalizedString;
  /** Article paragraphs (rich text in Phase 3). */
  body: LocalizedStringArray;
  badgeText: LocalizedString | null;
  coverImage: ResortImage;
  publishedAt: string;
  validUntil: string | null;
}

export type EmploymentType = "FULL_TIME" | "PART_TIME" | "SEASONAL";

export interface JobPosting extends BaseEntity {
  title: LocalizedString;
  department: LocalizedString;
  employmentType: EmploymentType;
  headcount: number;
  salary: LocalizedString;
  summary: LocalizedString;
  responsibilities: LocalizedStringArray;
  requirements: LocalizedStringArray;
  benefits: LocalizedStringArray;
  publishedAt: string;
  deadline: string;
}

export interface HeroSlide extends BaseEntity {
  image: ResortImage;
  eyebrow: LocalizedString;
  title: LocalizedString;
  subtitle: LocalizedString;
}

export interface ResortStat {
  id: string;
  value: string;
  label: LocalizedString;
  description: LocalizedString;
}

export interface CorporatePartner {
  id: string;
  name: string;
  countryCode: "KR" | "JP" | "AU" | "VN" | "SG";
  industry: LocalizedString;
}

export type LandmarkUnit = "MIN" | "KM";

export type LandmarkKind = "INDUSTRIAL" | "PORT" | "PAGODA" | "BEACH" | "CITY" | "HIGHWAY";

export interface Landmark {
  id: string;
  kind: LandmarkKind;
  name: LocalizedString;
  value: number;
  unit: LandmarkUnit;
}

export interface SiteSettings {
  name: string;
  legalName: string;
  /** Uploaded logo (CMS). `null` renders the built-in vector logo. */
  logoUrl: string | null;
  address: LocalizedString;
  hotline: string;
  zalo: string;
  phones: string[];
  emails: {
    reception: string;
    sales: string;
  };
  social: {
    facebook: string;
    messenger: string;
    zalo: string;
  };
  mapEmbedUrl: string;
  mapLink: string;
  foundedYear: number;
  milestoneYear: number;
  /** Resort intro film on YouTube. `null` hides the video section. */
  introVideo: { youtubeId: string; title: LocalizedString } | null;
}

/* ------------------------------------------------------------------ */
/* Inquiries (future `Inquiry` Prisma models)                          */
/* ------------------------------------------------------------------ */

export type ContactChannel = "PHONE" | "ZALO" | "KAKAOTALK" | "WECHAT" | "WHATSAPP";

export type StaySpecialRequest =
  | "AIRPORT_TRANSFER"
  | "LONG_STAY_EXPERT"
  | "VAT_INVOICE"
  | "EARLY_CHECKIN"
  | "EXTRA_BED";

export interface BookingInquiryInput {
  roomType: RoomType;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  fullName: string;
  contactChannel: ContactChannel;
  contactValue: string;
  email: string;
  companyName: string;
  specialRequests: StaySpecialRequest[];
  note: string;
  locale: Locale;
}

export interface EventInquiryInput {
  eventType: EventType;
  hallCode: EventHall["code"] | "UNDECIDED";
  eventDate: string;
  guestRange: GuestRange;
  tables: number | null;
  services: EventServiceOption[];
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  note: string;
  locale: Locale;
}

export type ServiceReservationKind =
  | "VIP_ROOM"
  | "RESTAURANT_TABLE"
  | "KARAOKE"
  | "PICKLEBALL"
  | "TENNIS"
  | "GOLF";

export interface ServiceReservationInput {
  kind: ServiceReservationKind;
  date: string;
  time: string;
  people: number;
  fullName: string;
  phone: string;
  note: string;
  locale: Locale;
}

export interface JobApplicationInput {
  jobSlug: string;
  fullName: string;
  phone: string;
  email: string;
  /** Link to an online CV (Google Drive, LinkedIn…); file upload arrives with storage in Phase 3. */
  cvUrl: string;
  message: string;
  locale: Locale;
}

export interface ContactMessageInput {
  fullName: string;
  phone: string;
  email: string;
  message: string;
  locale: Locale;
}

export type InquiryResult =
  | { ok: true; referenceCode: string }
  | { ok: false; errorField: string };

/* ------------------------------------------------------------------ */
/* Aggregates                                                          */
/* ------------------------------------------------------------------ */

export interface LandingPageData {
  heroSlides: HeroSlide[];
  stats: ResortStat[];
  partners: CorporatePartner[];
  rooms: RoomCategory[];
  halls: EventHall[];
  services: ResortService[];
  promotions: PromotionPost[];
  landmarks: Landmark[];
}
