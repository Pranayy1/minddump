import { PageWrapper } from "@/components/layout/PageWrapper";
import { FadeIn } from "@/components/ui/FadeIn";
import { GardenCard } from "@/components/ui/GardenCard";
import {
  getAllGardenNotes,
  GARDEN_CATEGORIES,
  type GardenCategory,
} from "@/content/garden";

export const metadata = {
  title: "Digital Garden",
  description:
    "A public notebook of short notes and ideas — programming, technology, life lessons, and whatever captures my curiosity.",
};

interface GardenPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export default async function GardenPage({ searchParams }: GardenPageProps) {
  const { category, search } = await searchParams;

  let notes = getAllGardenNotes();
  const activeCategory = category as GardenCategory | undefined;
  const searchQuery = search?.trim().toLowerCase();

  if (activeCategory) {
    notes = notes.filter((n) => n.category === activeCategory);
  }

  if (searchQuery) {
    notes = notes.filter(
      (n) =>
        n.title.toLowerCase().includes(searchQuery) ||
        n.summary?.toLowerCase().includes(searchQuery) ||
        n.tags.some((t) => t.toLowerCase().includes(searchQuery))
    );
  }

  const availableCategories = GARDEN_CATEGORIES;

  return (
    <PageWrapper className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium mb-6">
            Digital Garden
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-heading leading-tight mb-3">
            A public notebook
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="text-muted text-base md:text-lg leading-relaxed mb-12 max-w-lg">
            Short notes and ideas — programming, technology, life lessons, and
            whatever captures my curiosity.
          </p>
        </FadeIn>

        {/* Search */}
        <FadeIn delay={0.2}>
          <form method="get" className="mb-8" role="search">
            <label htmlFor="garden-search" className="sr-only">
              Search notes
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="garden-search"
                type="search"
                name="search"
                defaultValue={search ?? ""}
                placeholder="Search notes&hellip;"
                className="flex-1 bg-surface border border-border/60 rounded-lg px-4 py-3 text-sm text-body placeholder:text-muted/60 focus:outline-none focus:border-accent/40 transition-colors duration-300"
              />
              {activeCategory && (
                <input type="hidden" name="category" value={activeCategory} />
              )}
              <button
                type="submit"
                className="text-sm text-heading border border-border rounded-lg px-5 py-3 hover:border-accent/40 hover:text-accent transition-colors duration-300 shrink-0"
              >
                Search
              </button>
            </div>
          </form>
        </FadeIn>

        {/* Category filters */}
        <FadeIn delay={0.26}>
          <div className="flex flex-wrap gap-2 mb-10">
            <a
              href="/garden"
              aria-current={!activeCategory ? "page" : undefined}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-300 ${
                !activeCategory
                  ? "border-accent/40 text-accent bg-accent/5"
                  : "border-border/50 text-muted hover:border-accent/20 hover:text-body"
              }`}
            >
              All
            </a>
            {availableCategories.map((cat) => (
              <a
                key={cat}
                href={`/garden?category=${encodeURIComponent(cat)}`}
                aria-current={activeCategory === cat ? "page" : undefined}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-300 ${
                  activeCategory === cat
                    ? "border-accent/40 text-accent bg-accent/5"
                    : "border-border/50 text-muted hover:border-accent/20 hover:text-body"
                }`}
              >
                {cat}
              </a>
            ))}
          </div>
        </FadeIn>

        {/* Notes list */}
        {notes.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20 border-t border-border/30">
              <p className="text-muted italic">
                {searchQuery || activeCategory
                  ? "No notes match your search. Try a different filter."
                  : "The garden is waiting to be planted. Notes coming soon."}
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="grid gap-4">
            {notes.map((note, i) => (
              <FadeIn key={note.slug} delay={0.04 * Math.min(i, 8)}>
                <GardenCard note={note} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
