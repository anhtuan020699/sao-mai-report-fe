import type { Metadata } from "next";
import { CareersListView } from "@/components/client/pages/CareersViews";
import { getJobPostings, getMediaCollections } from "@/services/resort-service";

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description: "Cơ hội việc làm tại Sao Mai Phú Mỹ Resort – lễ tân, nhà hàng, kinh doanh sự kiện, kỹ thuật.",
};

export default async function CareersPage() {
  const [jobs, media] = await Promise.all([getJobPostings(), getMediaCollections()]);
  return <CareersListView jobs={jobs} heroImage={media.careersHero} />;
}
