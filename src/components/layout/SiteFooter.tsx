import { SITE } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted tracking-wide">
          &copy; {year} {SITE.name}
        </p>
        <p className="text-xs text-muted italic">
          {SITE.tagline}
        </p>
      </div>
    </footer>
  );
}
