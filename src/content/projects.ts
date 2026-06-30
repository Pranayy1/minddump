import path from "path";
import { getAllMDXFiles, getSlugFromFileName } from "@/lib/mdx";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectStatus = "idea" | "building" | "completed" | "archived";

export type ProjectMeta = {
  name: string;
  description: string;
  status: ProjectStatus;
  tech: string[];
  github?: string;
  screenshots?: string[];
  lessons: string[];
  started: string;
  ended?: string;
};

export type Project = {
  slug: string;
  name: string;
  description: string;
  status: ProjectStatus;
  tech: string[];
  github?: string;
  screenshots: string[];
  lessons: string[];
  started: string;
  ended?: string;
};

export function getAllProjects(): Project[] {
  const files = getAllMDXFiles<ProjectMeta>(PROJECTS_DIR);

  return files
    .map((f) => {
      const slug = getSlugFromFileName(f.filePath);
      return {
        slug,
        name: f.data.name,
        description: f.data.description,
        status: f.data.status,
        tech: f.data.tech ?? [],
        github: f.data.github,
        screenshots: f.data.screenshots ?? [],
        lessons: f.data.lessons ?? [],
        started: f.data.started,
        ended: f.data.ended,
      };
    })
    .sort((a, b) => {
      const statusOrder: Record<ProjectStatus, number> = {
        building: 0,
        idea: 1,
        completed: 2,
        archived: 3,
      };
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      return new Date(b.started).getTime() - new Date(a.started).getTime();
    });
}
