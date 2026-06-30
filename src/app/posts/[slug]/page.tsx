import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/content/posts";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProseBody } from "@/components/typography/ProseBody";
import { AccentLine } from "@/components/typography/AccentLine";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <PageWrapper className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-4">
              {formatDate(post.date)} &middot; {post.readingTime}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-heading leading-tight mb-6">
              {post.title}
            </h1>
            <AccentLine />
          </header>
        </FadeIn>

        <FadeIn delay={0.15}>
          <ProseBody>
            <MDXRemote source={post.content} components={mdxComponents} />
          </ProseBody>
        </FadeIn>
      </div>
    </PageWrapper>
  );
}
