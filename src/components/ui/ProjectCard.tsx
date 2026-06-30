import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectStatus } from "@/content/projects";
import { AccentLine } from "@/components/typography/AccentLine";
import { ReducedMotion } from "@/components/ui/ReducedMotion";

const STATUS_STYLES: Record<ProjectStatus, { label: string; classes: string }> = {
  idea: {
    label: "Idea",
    classes: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  building: {
    label: "Building",
    classes: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  },
  completed: {
    label: "Completed",
    classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  archived: {
    label: "Archived",
    classes: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs tracking-wide px-2.5 py-1 rounded-full border ${s.classes}`}
      aria-label={`Status: ${s.label}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status === "building" && (
          <ReducedMotion>
            <span className="absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75 animate-ping" />
          </ReducedMotion>
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {s.label}
    </span>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group border border-border rounded-lg p-6 transition-all duration-300 hover:border-accent/30 hover:bg-surface/50">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
        <div>
          <h3 className="text-xl font-serif text-heading group-hover:text-accent transition-colors duration-300 leading-snug">
            {project.name}
          </h3>
          <p className="text-sm text-muted mt-2 leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {project.screenshots.length > 0 && (
        <div className="flex gap-3 mb-4 overflow-x-auto">
          {project.screenshots.map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-48 h-28 rounded-md border border-border/50 overflow-hidden bg-surface"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${project.name} screenshot ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs text-accent-dim bg-accent/5 border border-accent/10 px-2 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <AccentLine className="mb-4" />

      {project.lessons.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs uppercase tracking-widest text-muted mb-2">
            Lessons learned
          </h4>
          <ul className="space-y-1.5">
            {project.lessons.map((lesson, i) => (
              <li
                key={i}
                className="text-sm text-body/80 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55rem] before:w-1.5 before:h-1.5 before:rounded-full before:bg-accent/60"
              >
                {lesson}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border/50">
        <span>
          Started {formatDate(project.started)}
          {project.ended ? ` → ${formatDate(project.ended)}` : ""}
        </span>
        {project.github && (
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent-dim hover:text-accent transition-colors duration-300"
          >
            GitHub <ArrowUpRight size={12} aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
