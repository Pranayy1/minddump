import type { Category } from "./thoughts";

export const CATEGORY_COLORS: Record<Category, string> = {
  attention: "text-amber-400 border-amber-400/20 bg-amber-400/5",
  craft: "text-orange-400 border-orange-400/20 bg-orange-400/5",
  decisions: "text-sky-400 border-sky-400/20 bg-sky-400/5",
  failure: "text-rose-400 border-rose-400/20 bg-rose-400/5",
  people: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
  systems: "text-violet-400 border-violet-400/20 bg-violet-400/5",
  writing: "text-pink-400 border-pink-400/20 bg-pink-400/5",
  learning: "text-teal-400 border-teal-400/20 bg-teal-400/5",
};
