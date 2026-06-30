import { HeroSection } from "@/components/home/HeroSection";
import { RecentPosts } from "@/components/home/RecentPosts";
import { getRecentPosts } from "@/content/posts";

export default function HomePage() {
  const recentPosts = getRecentPosts(3);

  return (
    <>
      <HeroSection />
      <RecentPosts posts={recentPosts} />
    </>
  );
}
