"use client";

import { useState, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Heart, Sparkles, X } from "lucide-react";
import { QuoteCard } from "@/components/ui/QuoteCard";
import type { Category, Thought } from "@/content/thoughts";

type FilterMode = "all" | "favorites" | Category;

interface ThoughtVaultClientProps {
  allThoughts: Thought[];
  activeCategories: Category[];
  categories: readonly Category[];
}

export function ThoughtVaultClient({
  allThoughts,
  activeCategories,
  categories,
}: ThoughtVaultClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [favoriteSlugs, setFavoriteSlugs] = useState<Set<string>>(
    () => new Set(allThoughts.filter((t) => t.favorite).map((t) => t.slug))
  );

  const filteredThoughts = useMemo(() => {
    let results: Thought[] = allThoughts;

    if (searchQuery.trim()) {
      const lower = searchQuery.toLowerCase().trim();
      results = results.filter(
        (t) =>
          t.quote.toLowerCase().includes(lower) ||
          (t.author && t.author.toLowerCase().includes(lower)) ||
          t.tags.some((tag) => tag.toLowerCase().includes(lower)) ||
          (t.source && t.source.toLowerCase().includes(lower))
      );
    }

    if (filterMode === "favorites") {
      results = results.filter((t) => favoriteSlugs.has(t.slug));
    } else if (filterMode !== "all") {
      results = results.filter((t) => t.category === filterMode);
    }

    return results;
  }, [allThoughts, searchQuery, filterMode, favoriteSlugs]);

  const toggleFavorite = useCallback((slug: string) => {
    setFavoriteSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }, []);

  const favoriteCount = favoriteSlugs.size;

  return (
    <>
      {/* Search bar */}
      <div className="relative mb-8">
        <label htmlFor="thoughts-search" className="sr-only">
          Search quotes, authors, and tags
        </label>
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted/50"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <input
          id="thoughts-search"
          type="search"
          placeholder="Search quotes, authors, tags…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface border border-border rounded-xl pl-11 pr-10 py-3 text-body text-sm placeholder:text-muted/40 focus:outline-none focus:border-accent/40 transition-colors duration-300"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted/50 hover:text-body transition-colors"
            aria-label="Clear search"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <FilterChip
          active={filterMode === "all"}
          onClick={() => setFilterMode("all")}
          icon={<Sparkles size={13} />}
          label="All"
          count={allThoughts.length}
        />
        <FilterChip
          active={filterMode === "favorites"}
          onClick={() => setFilterMode("favorites")}
          icon={<Heart size={13} />}
          label="Favorites"
          count={favoriteCount}
        />

        {activeCategories.length > 0 && (
          <div className="w-px h-5 bg-border mx-1 hidden sm:block" />
        )}

        {categories.map((cat) => {
          const count = allThoughts.filter((t) => t.category === cat).length;
          if (count === 0) return null;
          return (
            <FilterChip
              key={cat}
              active={filterMode === cat}
              onClick={() => setFilterMode(cat)}
              label={cat}
              count={count}
            />
          );
        })}
      </div>

      {/* Quote cards */}
      {filteredThoughts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-muted italic text-lg">
            {searchQuery
              ? "No quotes match your search."
              : filterMode === "favorites"
                ? "No favorites yet. Heart a quote to save it here."
                : "The vault is quiet. Thoughts will gather here over time."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-sm text-accent hover:text-accent-dim transition-colors"
            >
              Clear search
            </button>
          )}
        </motion.div>
      ) : (
        <div className="space-y-5">
          <AnimatePresence mode="popLayout">
            {filteredThoughts.map((thought) => (
              <QuoteCard
                key={thought.slug}
                thought={{
                  ...thought,
                  favorite: favoriteSlugs.has(thought.slug),
                }}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Footer count */}
      {filteredThoughts.length > 0 && (
        <p className="text-center text-xs text-muted/40 mt-12 tracking-wide">
          {filteredThoughts.length}{" "}
          {filteredThoughts.length === 1 ? "thought" : "thoughts"}
          {filterMode !== "all" && " shown"}
        </p>
      )}
    </>
  );
}

/* ── Filter chip component ── */

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

function FilterChip({ active, onClick, label, count, icon }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs tracking-wide
        border transition-all duration-200 capitalize
        ${
          active
            ? "border-accent/30 bg-accent/10 text-accent"
            : "border-border/50 bg-surface/30 text-muted hover:text-body hover:border-border"
        }
      `}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
      {count !== undefined && (
        <span
          className={`ml-0.5 text-[10px] tabular-nums ${
            active ? "text-accent/60" : "text-muted/40"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
