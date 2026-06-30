import { notFound } from "next/navigation";
import Link from "next/link";
import { getLogEntryBySlug, getAllLogEntries } from "@/content/log";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FadeIn } from "@/components/ui/FadeIn";
import { AccentLine } from "@/components/typography/AccentLine";
import { ProseBody } from "@/components/typography/ProseBody";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";

interface LogEntryPageProps {
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
  const entries = getAllLogEntries();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: LogEntryPageProps) {
  const { slug } = await params;
  const entry = getLogEntryBySlug(slug);
  if (!entry) return { title: "Entry not found" };

  return {
    title: entry.title,
    description: entry.learned,
  };
}

export default async function LogEntryPage({ params }: LogEntryPageProps) {
  const { slug } = await params;
  const entry = getLogEntryBySlug(slug);

  if (!entry) notFound();

  return (
    <PageWrapper className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <Link
            href="/log"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors duration-300 mb-10"
          >
            <span>←</span>
            <span>Back to Log</span>
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={0.08}>
          <header className="mb-14">
            <time className="text-xs text-accent tracking-[0.15em] font-mono block mb-5">
              {formatDate(entry.date)}
            </time>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-heading leading-tight mb-6">
              {entry.title}
            </h1>
            <AccentLine />
          </header>
        </FadeIn>

        {/* Structured sections */}
        <div className="space-y-0 mb-14">
          {/* What I Learned */}
          <FadeIn delay={0.16}>
            <section className="pb-8 mb-8 border-b border-border/30">
              <h2 className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
                What I Learned
              </h2>
              <p className="text-body text-base leading-relaxed">
                {entry.learned}
              </p>
            </section>
          </FadeIn>

          {/* Problem Faced */}
          <FadeIn delay={0.22}>
            <section className="pb-8 mb-8 border-b border-border/30">
              <h2 className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
                Problem Faced
              </h2>
              <p className="text-body/85 text-base leading-relaxed">
                {entry.problem}
              </p>
            </section>
          </FadeIn>

          {/* Solution Found */}
          <FadeIn delay={0.28}>
            <section className="pb-8 mb-8 border-b border-border/30">
              <h2 className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
                Solution Found
              </h2>
              <p className="text-body/85 text-base leading-relaxed">
                {entry.solution}
              </p>
            </section>
          </FadeIn>

          {/* Resources Used */}
          {entry.resources.length > 0 && (
            <FadeIn delay={0.34}>
              <section className="pb-8 mb-8 border-b border-border/30">
                <h2 className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
                  Resources Used
                </h2>
                <ul className="space-y-1.5">
                  {entry.resources.map((resource, i) => (
                    <li
                      key={i}
                      className="text-body/80 text-sm leading-relaxed font-mono"
                    >
                      <span className="text-accent mr-2">→</span>
                      {resource}
                    </li>
                  ))}
                </ul>
              </section>
            </FadeIn>
          )}

          {/* Personal Reflection */}
          <FadeIn delay={0.4}>
            <section>
              <h2 className="text-[10px] uppercase tracking-[0.25em] text-accent font-medium mb-3">
                Reflection
              </h2>
              <blockquote className="border-l-2 border-accent/40 pl-5 italic font-serif text-body/75 text-lg leading-relaxed">
                {entry.reflection}
              </blockquote>
            </section>
          </FadeIn>
        </div>

        {/* Extended content via MDX */}
        {entry.content?.trim() && (
          <FadeIn delay={0.5}>
            <div className="pt-10 border-t border-border/30">
              <ProseBody>
                <MDXRemote source={entry.content} components={mdxComponents} />
              </ProseBody>
            </div>
          </FadeIn>
        )}
      </div>
    </PageWrapper>
  );
}
