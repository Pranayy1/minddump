import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type MDXSource<T> = {
  data: T;
  content: string;
  filePath: string;
};

function getMDXFiles(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
  } catch {
    return [];
  }
}

export function getMDXFileBySlug<T extends Record<string, unknown>>(
  dir: string,
  slug: string
): MDXSource<T> | null {
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);

  return {
    data: data as T,
    content,
    filePath,
  };
}

export function getAllMDXFiles<T extends Record<string, unknown>>(
  dir: string
): MDXSource<T>[] {
  const files = getMDXFiles(dir);
  return files
    .map((file) => {
      const filePath = path.join(dir, file);
      const source = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(source);
      return {
        data: data as T,
        content,
        filePath,
      };
    })
    .filter(Boolean);
}

export function getSlugFromFileName(fileName: string): string {
  return path.basename(fileName, path.extname(fileName));
}
