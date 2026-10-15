import { BentoAmenities } from "@/components/client/BentoAmenities";
import { BrandStory } from "@/components/client/BrandStory";
import { HeroBookingBar } from "@/components/client/HeroBookingBar";
import { MiceWeddingSection } from "@/components/client/MiceWeddingSection";
import { LocationSection, PromotionsSection } from "@/components/client/PromotionsLocation";
import { RoomShowcase } from "@/components/client/RoomShowcase";
import { VideoTour } from "@/components/client/VideoTour";
import {
  getLandingPageData,
  getMediaCollections,
  getSiteSettings,
  getStayPolicy,
} from "@/services/resort-service";

export default async function HomePage() {
  const [data, media, settings, policy] = await Promise.all([
    getLandingPageData(),
    getMediaCollections(),
    getSiteSettings(),
    getStayPolicy(),
  ]);

  return (
    <>
      <HeroBookingBar slides={data.heroSlides} rooms={data.rooms} />
      <BrandStory stats={data.stats} partners={data.partners} images={media.story} settings={settings} />
      {settings.introVideo ? <VideoTour video={settings.introVideo} /> : null}
      <RoomShowcase rooms={data.rooms} policy={policy} />
      <MiceWeddingSection halls={data.halls} images={media.mice} />
      <BentoAmenities services={data.services} />
      <PromotionsSection posts={data.promotions} />
      <LocationSection landmarks={data.landmarks} settings={settings} />
    </>
  );
}
