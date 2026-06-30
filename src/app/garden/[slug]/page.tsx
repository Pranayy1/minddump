import { notFound } from "next/navigation";
import Link from "next/link";
import { getGardenNoteBySlug, getAllGardenNotes } from "@/content/garden";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProseBody } from "@/components/typography/ProseBody";
import { AccentLine } from "@/components/typography/AccentLine";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";

interface GardenNotePageProps {
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
  const notes = getAllGardenNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: GardenNotePageProps) {
  const { slug } = await params;
  const note = getGardenNoteBySlug(slug);
  if (!note) return { title: "Note not found" };

  return {
    title: note.title,
    description: note.summary,
  };
}

export default async function GardenNotePage({ params }: GardenNotePageProps) {
  const { slug } = await params;
  const note = getGardenNoteBySlug(slug);

  if (!note) notFound();

  return (
    <PageWrapper className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <Link
            href="/garden"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors duration-300 mb-10"
          >
            <span>←</span>
            <span>Back to Garden</span>
          </Link>
        </FadeIn>

        <FadeIn delay={0.08}>
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">
                {note.category}
              </span>
              <span className="text-border">·</span>
              <span className="text-[11px] text-muted">
                {formatDate(note.date)}
              </span>
              <span className="text-border">·</span>
              <span className="text-[11px] text-muted">{note.readingTime}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-normal text-heading leading-tight mb-6">
              {note.title}
            </h1>
            <AccentLine />
          </header>
        </FadeIn>

        <FadeIn delay={0.18}>
          <ProseBody>
            <MDXRemote source={note.content} components={mdxComponents} />
          </ProseBody>
        </FadeIn>

        {note.tags.length > 0 && (
          <FadeIn delay={0.28}>
            <div className="mt-14 pt-8 border-t border-border/40">
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-accent-dim bg-accent/5 border border-accent/10 px-2.5 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </PageWrapper>
  );
}
