import Link from "next/link";
import type { GardenNote } from "@/content/garden";

interface GardenCardProps {
  note: GardenNote;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function GardenCard({ note }: GardenCardProps) {
  return (
    <Link
      href={`/garden/${note.slug}`}
      className="group block border border-border/50 rounded-lg px-5 py-5 transition-all duration-300 hover:border-accent/20 hover:bg-surface/30"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-medium">
          {note.category}
        </span>
        <span className="text-border">·</span>
        <span className="text-[11px] text-muted">{formatDate(note.date)}</span>
        <span className="text-border">·</span>
        <span className="text-[11px] text-muted">{note.readingTime}</span>
      </div>

      <h3 className="text-base md:text-lg font-serif text-heading group-hover:text-accent transition-colors duration-300 leading-snug mb-2">
        {note.title}
      </h3>

      {note.summary && (
        <p className="text-sm text-muted leading-relaxed line-clamp-2">
          {note.summary}
        </p>
      )}

      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-accent-dim bg-accent/5 border border-accent/10 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
