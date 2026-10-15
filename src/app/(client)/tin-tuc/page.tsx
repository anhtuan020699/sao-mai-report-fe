import type { Metadata } from "next";
import { NewsListView } from "@/components/client/pages/NewsViews";
import { getAllPosts } from "@/services/resort-service";

export const metadata: Metadata = {
  title: "Tin tức & Ưu đãi",
  description: "Chương trình ưu đãi, sự kiện và tin tức mới nhất tại Sao Mai Phú Mỹ Resort.",
};

export default async function NewsPage() {
  const posts = await getAllPosts();
  return <NewsListView posts={posts} />;
}
