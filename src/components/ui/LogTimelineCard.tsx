import Link from "next/link";
import type { LogEntry } from "@/content/log";

interface LogTimelineCardProps {
  entry: LogEntry;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function LogTimelineCard({ entry }: LogTimelineCardProps) {
  return (
    <Link
      href={`/log/${entry.slug}`}
      className="group block"
    >
      <article className="relative pl-8 md:pl-10 pb-10 last:pb-0">
        {/* Timeline dot */}
        <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-accent/50 bg-bg group-hover:bg-accent group-hover:border-accent transition-colors duration-300 z-10" />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-3">
          <time className="text-[11px] text-muted tracking-wide shrink-0 font-mono">
            {formatDate(entry.date)}
          </time>
          <h3 className="text-base md:text-lg font-serif text-heading group-hover:text-accent transition-colors duration-300 leading-snug">
            {entry.title}
          </h3>
        </div>

        {/* What I learned — preview */}
        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-2">
          <span className="text-accent-dim font-medium">Learned: </span>
          {entry.learned}
        </p>

        {/* Problem preview */}
        <p className="text-sm text-muted/70 leading-relaxed line-clamp-1">
          <span className="text-accent-dim/60 font-medium">Problem: </span>
          {entry.problem}
        </p>
      </article>
    </Link>
  );
}
