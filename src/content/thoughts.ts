import path from "path";
import { getAllMDXFiles, getSlugFromFileName } from "@/lib/mdx";

const THOUGHTS_DIR = path.join(process.cwd(), "content", "thoughts");

export const CATEGORIES = [
  "attention",
  "craft",
  "decisions",
  "failure",
  "people",
  "systems",
  "writing",
  "learning",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type ThoughtMeta = {
  quote: string;
  author?: string;
  source?: string;
  category: Category;
  tags?: string[];
  favorite?: boolean;
  date: string;
};

export type Thought = {
  slug: string;
  quote: string;
  author?: string;
  source?: string;
  category: Category;
  tags: string[];
  favorite: boolean;
  date: string;
};

export function getAllThoughts(): Thought[] {
  const files = getAllMDXFiles<ThoughtMeta>(THOUGHTS_DIR);

  return files
    .map((f) => {
      const slug = getSlugFromFileName(f.filePath);
      return {
        slug,
        quote: f.data.quote,
        author: f.data.author,
        source: f.data.source,
        category: f.data.category,
        tags: f.data.tags ?? [],
        favorite: f.data.favorite ?? false,
        date: f.data.date,
      };
    })
    .sort((a, b) => {
      if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export function getAllCategories(): Category[] {
  const present = new Set<Category>();
  for (const t of getAllThoughts()) {
    present.add(t.category);
  }
  return CATEGORIES.filter((c) => present.has(c));
}

export { CATEGORY_COLORS } from "./thoughts-categories";
