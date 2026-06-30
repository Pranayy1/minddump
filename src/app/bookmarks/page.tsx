import { PageWrapper } from "@/components/layout/PageWrapper";
import { PageHead } from "@/components/ui/PageHead";
import { FadeIn } from "@/components/ui/FadeIn";
import { getAllBookmarks } from "@/content/bookmarks";
import { BookmarkCard } from "@/components/ui/BookmarkCard";

export const metadata = {
  title: "Bookmarks",
  description: "Curated links, resources, and things worth remembering.",
};

export default function BookmarksPage() {
  const bookmarks = getAllBookmarks();

  return (
    <PageWrapper className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <PageHead
          title="Bookmarks"
          subtitle="Curated links, resources, and things worth remembering."
        />

        {bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted italic">
              No bookmarks yet. The reading list is being assembled.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((bookmark, i) => (
              <FadeIn key={bookmark.slug} delay={i * 0.05}>
                <BookmarkCard bookmark={bookmark} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
