import path from "path";
import { getAllMDXFiles, getMDXFileBySlug, getSlugFromFileName } from "@/lib/mdx";

const BOOKMARKS_DIR = path.join(process.cwd(), "content", "bookmarks");

export type BookmarkMeta = {
  title: string;
  url: string;
  date: string;
  note: string;
  tags?: string[];
};

export type Bookmark = {
  slug: string;
  title: string;
  url: string;
  date: string;
  note: string;
  tags: string[];
};

export function getAllBookmarks(): Bookmark[] {
  const files = getAllMDXFiles<BookmarkMeta>(BOOKMARKS_DIR);

  return files
    .map((f) => {
      const slug = getSlugFromFileName(f.filePath);
      return {
        slug,
        title: f.data.title,
        url: f.data.url,
        date: f.data.date,
        note: f.data.note,
        tags: f.data.tags ?? [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBookmarkBySlug(slug: string): Bookmark | null {
  const source = getMDXFileBySlug<BookmarkMeta>(BOOKMARKS_DIR, slug);
  if (!source) return null;

  return {
    slug,
    title: source.data.title,
    url: source.data.url,
    date: source.data.date,
    note: source.data.note,
    tags: source.data.tags ?? [],
  };
}
