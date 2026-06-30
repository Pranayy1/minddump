"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Check, Quote } from "lucide-react";
import type { Thought } from "@/content/thoughts";
import { CATEGORY_COLORS } from "@/content/thoughts-categories";

interface QuoteCardProps {
  thought: Thought;
  onToggleFavorite?: (slug: string) => void;
}

export function QuoteCard({ thought, onToggleFavorite }: QuoteCardProps) {
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(thought.favorite);

  const categoryColor =
    CATEGORY_COLORS[thought.category] ??
    "text-accent border-accent/20 bg-accent/5";

  const handleShare = async () => {
    const text = `"${thought.quote}" — ${thought.author ?? "Unknown"}`;

    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled or clipboard failed
    }
  };

  const handleFavorite = () => {
    setFavorited(!favorited);
    onToggleFavorite?.(thought.slug);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className="group relative border border-border rounded-xl p-6 md:p-8 transition-all duration-300 hover:border-accent/20 hover:bg-surface/30"
    >
      {/* Quote icon */}
      <Quote
        size={32}
        className="text-accent/10 mb-4"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      {/* Quote text */}
      <blockquote className="font-serif text-lg md:text-xl text-heading/90 leading-relaxed tracking-wide">
        &ldquo;{thought.quote}&rdquo;
      </blockquote>

      {/* Author */}
      {(thought.author || thought.source) && (
        <div className="mt-5 flex items-center gap-2">
          <span className="w-5 h-px bg-accent/40" />
          <p className="text-sm text-muted">
            {thought.author && <span>{thought.author}</span>}
            {thought.author && thought.source && (
              <span className="text-muted/50"> · </span>
            )}
            {thought.source && (
              <span className="italic text-muted/70">{thought.source}</span>
            )}
          </p>
        </div>
      )}

      {/* Footer: tags + actions */}
      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full border ${categoryColor}`}
          >
            {thought.category}
          </span>
          {thought.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted/60 bg-surface border border-border/50 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleFavorite}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            className={`p-1.5 rounded-md transition-colors duration-200 ${
              favorited
                ? "text-rose-400 hover:text-rose-300"
                : "text-muted/40 hover:text-rose-400"
            }`}
          >
            <Heart
              size={16}
              fill={favorited ? "currentColor" : "none"}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </button>
          <button
            onClick={handleShare}
            aria-label="Share quote"
            className="p-1.5 rounded-md text-muted/40 hover:text-accent transition-colors duration-200"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="inline-flex"
                >
                  <Check size={16} className="text-emerald-400" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="share"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="inline-flex"
                >
                  <Share2 size={16} strokeWidth={1.5} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
