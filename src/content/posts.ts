import path from "path";
import { getAllMDXFiles, getMDXFileBySlug, getSlugFromFileName } from "@/lib/mdx";
import { getReadingTime } from "@/lib/readingTime";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostMeta = {
  title: string;
  date: string;
  summary: string;
  draft?: boolean;
};

export type PostPreview = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  readingTime: string;
};

export type Post = PostPreview & {
  content: string;
};

export function getAllPosts(): PostPreview[] {
  const files = getAllMDXFiles<PostMeta>(POSTS_DIR);

  return files
    .filter((f) => !f.data.draft)
    .map((f) => {
      const slug = getSlugFromFileName(f.filePath);
      return {
        slug,
        title: f.data.title,
        date: f.data.date,
        summary: f.data.summary,
        readingTime: getReadingTime(f.content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | null {
  const source = getMDXFileBySlug<PostMeta>(POSTS_DIR, slug);
  if (!source) return null;

  return {
    slug,
    title: source.data.title,
    date: source.data.date,
    summary: source.data.summary,
    readingTime: getReadingTime(source.content),
    content: source.content,
  };
}

export function getRecentPosts(count = 3): PostPreview[] {
  return getAllPosts().slice(0, count);
}
