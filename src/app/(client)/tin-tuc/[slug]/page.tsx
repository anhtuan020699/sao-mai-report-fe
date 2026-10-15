import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsDetailView } from "@/components/client/pages/NewsViews";
import { getAllPosts, getPostBySlug, getSiteSettings } from "@/services/resort-service";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/tin-tuc/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title.vi,
    description: post.excerpt.vi,
    openGraph: { images: [post.coverImage.url] },
  };
}

export default async function NewsDetailPage({ params }: PageProps<"/tin-tuc/[slug]">) {
  const { slug } = await params;
  const [post, posts, settings] = await Promise.all([getPostBySlug(slug), getAllPosts(), getSiteSettings()]);
  if (!post) notFound();

  const related = posts.filter((item) => item.id !== post.id).slice(0, 3);
  return <NewsDetailView post={post} related={related} settings={settings} />;
}
