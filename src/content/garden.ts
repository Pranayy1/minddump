import path from "path";
import { getAllMDXFiles, getMDXFileBySlug, getSlugFromFileName } from "@/lib/mdx";
import { getReadingTime } from "@/lib/readingTime";

export const GARDEN_CATEGORIES = [
  "Programming",
  "Life Lessons",
  "Technology",
  "Networking",
  "Cybersecurity",
  "Books",
  "Random Thoughts",
] as const;

export type GardenCategory = (typeof GARDEN_CATEGORIES)[number];

const GARDEN_DIR = path.join(process.cwd(), "content", "garden");

export type GardenMeta = {
  title: string;
  date: string;
  summary: string;
  category: GardenCategory;
  tags?: string[];
  draft?: boolean;
};

export type GardenNote = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  category: GardenCategory;
  tags: string[];
  readingTime: string;
};

export type GardenNoteFull = GardenNote & {
  content: string;
};

export function getAllGardenNotes(): GardenNote[] {
  const files = getAllMDXFiles<GardenMeta>(GARDEN_DIR);

  return files
    .filter((f) => !f.data.draft)
    .map((f) => {
      const slug = getSlugFromFileName(f.filePath);
      return {
        slug,
        title: f.data.title,
        date: f.data.date,
        summary: f.data.summary,
        category: f.data.category,
        tags: f.data.tags ?? [],
        readingTime: getReadingTime(f.content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getGardenNoteBySlug(slug: string): GardenNoteFull | null {
  const source = getMDXFileBySlug<GardenMeta>(GARDEN_DIR, slug);
  if (!source) return null;

  return {
    slug,
    title: source.data.title,
    date: source.data.date,
    summary: source.data.summary,
    category: source.data.category,
    tags: source.data.tags ?? [],
    readingTime: getReadingTime(source.content),
    content: source.content,
  };
}

export function getGardenNotesByCategory(category: GardenCategory): GardenNote[] {
  return getAllGardenNotes().filter((n) => n.category === category);
}

export function getAllGardenCategories(): GardenCategory[] {
  const notes = getAllGardenNotes();
  const used = new Set(notes.map((n) => n.category));
  return GARDEN_CATEGORIES.filter((c) => used.has(c));
}
