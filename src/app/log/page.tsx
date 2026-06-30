import { PageWrapper } from "@/components/layout/PageWrapper";
import { FadeIn } from "@/components/ui/FadeIn";
import { LogTimelineCard } from "@/components/ui/LogTimelineCard";
import { getAllLogEntries } from "@/content/log";

export const metadata = {
  title: "Learning Log",
  description:
    "An engineering journal — daily learning progress, problems faced, solutions found, and reflections.",
};

export default function LearningLogPage() {
  const entries = getAllLogEntries();

  return (
    <PageWrapper className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium mb-6">
            Learning Log
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-heading leading-tight mb-3">
            Engineering journal
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="text-muted text-base md:text-lg leading-relaxed mb-16 max-w-lg">
            What I learned, what broke, how I fixed it, and what it taught me.
          </p>
        </FadeIn>

        {entries.length === 0 ? (
          <FadeIn>
            <div className="text-center py-20 border-t border-border/30">
              <p className="text-muted italic">
                The journal is empty. First entry coming soon.
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[4.5px] top-3 bottom-0 w-px bg-border/40" />

            <div className="space-y-0">
              {entries.map((entry, i) => (
                <FadeIn key={entry.slug} delay={0.05 * Math.min(i, 6)}>
                  <LogTimelineCard entry={entry} />
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
