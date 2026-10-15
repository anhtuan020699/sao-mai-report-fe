import { cacheLife, cacheTag } from "next/cache";
import {
  corporatePartners,
  eventHalls,
  heroSlides,
  jobPostings,
  landmarks,
  miceShowcaseImages,
  promotionPosts,
  resortFacilities,
  resortServices,
  resortStats,
  roomCategories,
  siteSettings,
  stayPolicy,
  storyImages,
  careersHeroImage,
  luxeImages,
} from "@/data/mock-resort-data";
import type {
  CorporatePartner,
  EventHall,
  HeroSlide,
  JobPosting,
  LandingPageData,
  Landmark,
  PromotionPost,
  ResortFacility,
  ResortImage,
  ResortService,
  ResortStat,
  RoomCategory,
  SiteSettings,
  StayPolicy,
} from "@/types/resort";

/*
 * Data access layer. Each getter is the single seam between UI and storage:
 * in Phase 3 replace the mock body with a Prisma query, e.g.
 *   return prisma.roomCategory.findMany({ where: { isPublished: true }, orderBy: { sortOrder: "asc" } })
 * and call `revalidateTag("rooms", "max")` from the admin CMS after edits.
 */

function published<T extends { isPublished: boolean; sortOrder: number }>(items: T[]): T[] {
  return items.filter((item) => item.isPublished).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheLife("days");
  cacheTag("site-settings");
  return siteSettings;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("hero-slides");
  return published(heroSlides);
}

export async function getResortStats(): Promise<ResortStat[]> {
  "use cache";
  cacheLife("days");
  cacheTag("stats");
  return resortStats;
}

export async function getCorporatePartners(): Promise<CorporatePartner[]> {
  "use cache";
  cacheLife("days");
  cacheTag("partners");
  return corporatePartners;
}

export async function getRoomCategories(): Promise<RoomCategory[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("rooms");
  return published(roomCategories);
}

export async function getStayPolicy(): Promise<StayPolicy> {
  "use cache";
  cacheLife("days");
  cacheTag("stay-policy");
  return stayPolicy;
}

export async function getEventHalls(): Promise<EventHall[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("halls");
  return published(eventHalls);
}

export async function getResortServices(): Promise<ResortService[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("services");
  return published(resortServices);
}

export async function getResortFacilities(): Promise<ResortFacility[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("facilities");
  return published(resortFacilities);
}

function newestFirst<T extends { publishedAt: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Homepage teaser keeps the editorial `sortOrder`; `/tin-tuc` lists newest first. */
export async function getPromotionPosts(limit = 3): Promise<PromotionPost[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("promotions");
  return published(promotionPosts).slice(0, limit);
}

export async function getAllPosts(): Promise<PromotionPost[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("promotions");
  return newestFirst(published(promotionPosts));
}

export async function getPostBySlug(slug: string): Promise<PromotionPost | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("promotions", `promotion:${slug}`);
  return published(promotionPosts).find((post) => post.slug === slug) ?? null;
}

export async function getJobPostings(): Promise<JobPosting[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs");
  return newestFirst(published(jobPostings));
}

export async function getJobBySlug(slug: string): Promise<JobPosting | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("jobs", `job:${slug}`);
  return published(jobPostings).find((job) => job.slug === slug) ?? null;
}

export async function getLandmarks(): Promise<Landmark[]> {
  "use cache";
  cacheLife("days");
  cacheTag("landmarks");
  return landmarks;
}

export interface MediaCollections {
  story: ResortImage[];
  mice: { wedding: ResortImage[]; mice: ResortImage[] };
  careersHero: ResortImage;
  luxe: typeof luxeImages;
}

export async function getMediaCollections(): Promise<MediaCollections> {
  "use cache";
  cacheLife("days");
  cacheTag("media");
  return { story: storyImages, mice: miceShowcaseImages, careersHero: careersHeroImage, luxe: luxeImages };
}

export async function getLandingPageData(): Promise<LandingPageData> {
  const [heroSlidesData, stats, partners, rooms, halls, services, promotions, landmarksData] =
    await Promise.all([
      getHeroSlides(),
      getResortStats(),
      getCorporatePartners(),
      getRoomCategories(),
      getEventHalls(),
      getResortServices(),
      getPromotionPosts(),
      getLandmarks(),
    ]);

  return {
    heroSlides: heroSlidesData,
    stats,
    partners,
    rooms,
    halls,
    services,
    promotions,
    landmarks: landmarksData,
  };
}
