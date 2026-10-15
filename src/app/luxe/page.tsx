import type { Metadata } from "next";
import { LuxeHome } from "@/components/luxe/LuxeHome";
import {
  getMediaCollections,
  getPromotionPosts,
  getResortFacilities,
  getResortStats,
  getRoomCategories,
  getSiteSettings,
} from "@/services/resort-service";

export const metadata: Metadata = {
  title: "Sao Mai Phú Mỹ Resort – Since 2005",
  robots: { index: false },
};

export default async function LuxePage() {
  const [media, stats, rooms, facilities, posts, settings] = await Promise.all([
    getMediaCollections(),
    getResortStats(),
    getRoomCategories(),
    getResortFacilities(),
    getPromotionPosts(3),
    getSiteSettings(),
  ]);

  return (
    <LuxeHome
      images={media.luxe}
      stats={stats}
      rooms={rooms}
      facilities={facilities}
      posts={posts}
      settings={settings}
    />
  );
}
