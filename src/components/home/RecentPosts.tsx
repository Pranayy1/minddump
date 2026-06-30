import Link from "next/link";
import type { PostPreview } from "@/content/posts";
import { Heading } from "@/components/typography/Heading";
import { AccentLine } from "@/components/typography/AccentLine";
import { FadeIn } from "@/components/ui/FadeIn";

interface RecentPostsProps {
  posts: PostPreview[];
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function RecentPosts({ posts }: RecentPostsProps) {
  if (posts.length === 0) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Heading as="h2" className="mb-4">
            Writing
          </Heading>
          <AccentLine className="mx-auto mb-8" />
          <p className="text-muted italic">
            Thoughts being composed. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-14">
            <Heading as="h2" className="mb-4">
              Recent Writing
            </Heading>
            <AccentLine className="mx-auto" />
          </div>
        </FadeIn>

        <div className="space-y-0">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 0.1}>
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

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/posts"
              className="text-sm text-muted hover:text-accent transition-colors duration-300 underline underline-offset-4 decoration-border hover:decoration-accent"
            >
              View all posts
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
