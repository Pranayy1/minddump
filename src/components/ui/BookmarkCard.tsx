import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Bookmark } from "@/content/bookmarks";
import { AccentLine } from "@/components/typography/AccentLine";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  return (
    <Link
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-border rounded-lg px-5 py-4 transition-all duration-300 hover:border-accent/30 hover:bg-surface/50"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-heading group-hover:text-accent transition-colors duration-300 truncate">
            {bookmark.title}
          </h3>
          <p className="text-sm text-muted mt-1 line-clamp-2">
            {bookmark.note}
          </p>
        </div>
        <ArrowUpRight
          size={16}
          className="text-muted group-hover:text-accent transition-colors duration-300 mt-1 shrink-0"
          aria-hidden="true"
        />
      </div>
      {bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {bookmark.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-accent-dim bg-accent/5 border border-accent/10 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export function BookmarkCardSkeleton() {
  return (
    <div className="border border-border rounded-lg px-5 py-4">
      <div className="h-5 w-3/4 bg-surface rounded" />
      <div className="h-4 w-full bg-surface rounded mt-2" />
      <AccentLine className="mt-4" />
      <p className="text-sm text-muted mt-3 italic">Bookmarks coming soon.</p>
    </div>
  );
}
