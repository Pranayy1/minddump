import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageHead } from "@/components/ui/PageHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { Heading } from "@/components/typography/Heading";
import { AccentLine } from "@/components/typography/AccentLine";
import { getAllPosts } from "@/content/posts";
import Link from "next/link";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <PageWrapper className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <PageHead
          title="Posts"
          subtitle="Thoughts, notes, and observations from a learning journey."
        />

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted italic">
              Nothing published yet. The first post is being written.
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group block py-6 border-b border-border/50 hover:border-accent/20 transition-colors duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <span className="text-xs text-muted tracking-wide shrink-0">
                      {formatDate(post.date)}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl font-serif text-heading group-hover:text-accent transition-colors duration-300 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted mt-1 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                    <span className="text-xs text-accent-dim shrink-0">
                      {post.readingTime}
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
