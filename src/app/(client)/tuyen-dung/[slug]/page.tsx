import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobDetailView } from "@/components/client/pages/CareersViews";
import { getJobBySlug, getJobPostings, getMediaCollections, getSiteSettings } from "@/services/resort-service";

export async function generateStaticParams() {
  const jobs = await getJobPostings();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tuyen-dung/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return {};
  return { title: `Tuyển dụng: ${job.title.vi}`, description: job.summary.vi };
}

export default async function JobDetailPage({ params }: PageProps<"/tuyen-dung/[slug]">) {
  const { slug } = await params;
  const [job, settings, media] = await Promise.all([getJobBySlug(slug), getSiteSettings(), getMediaCollections()]);
  if (!job) notFound();

  return <JobDetailView job={job} settings={settings} heroImage={media.careersHero} />;
}
