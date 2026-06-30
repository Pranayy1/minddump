import path from "path";
import { getAllMDXFiles, getMDXFileBySlug, getSlugFromFileName } from "@/lib/mdx";

const LOG_DIR = path.join(process.cwd(), "content", "log");

export type LogMeta = {
  title: string;
  date: string;
  learned: string;
  problem: string;
  solution: string;
  resources?: string[];
  reflection: string;
  draft?: boolean;
};

export type LogEntry = {
  slug: string;
  title: string;
  date: string;
  learned: string;
  problem: string;
  solution: string;
  resources: string[];
  reflection: string;
};

export type LogEntryFull = LogEntry & {
  content: string;
};

export function getAllLogEntries(): LogEntry[] {
  const files = getAllMDXFiles<LogMeta>(LOG_DIR);

  return files
    .filter((f) => !f.data.draft)
    .map((f) => {
      const slug = getSlugFromFileName(f.filePath);
      return {
        slug,
        title: f.data.title,
        date: f.data.date,
        learned: f.data.learned,
        problem: f.data.problem,
        solution: f.data.solution,
        resources: f.data.resources ?? [],
        reflection: f.data.reflection,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getLogEntryBySlug(slug: string): LogEntryFull | null {
  const source = getMDXFileBySlug<LogMeta>(LOG_DIR, slug);
  if (!source) return null;

  return {
    slug,
    title: source.data.title,
    date: source.data.date,
    learned: source.data.learned,
    problem: source.data.problem,
    solution: source.data.solution,
    resources: source.data.resources ?? [],
    reflection: source.data.reflection,
    content: source.content,
  };
}
