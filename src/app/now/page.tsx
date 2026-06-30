import { PageWrapper } from "@/components/layout/PageWrapper";
import { FadeIn } from "@/components/ui/FadeIn";
import { AccentLine } from "@/components/typography/AccentLine";
import { Heading } from "@/components/typography/Heading";
import nowData from "@/data/now.json";
import {
  GraduationCap,
  Hammer,
  BookOpen,
  Compass,
  Target,
  Check,
} from "lucide-react";

type NowData = {
  lastUpdated: string;
  learning: { title: string; detail: string }[];
  building: { title: string; detail: string; status?: string }[];
  reading: { title: string; author: string; progress: string }[];
  exploring: { title: string; detail: string }[];
  goals: { title: string; done: boolean }[];
};

const data = nowData as NowData;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  const styles: Record<string, string> = {
    active: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
    early: "text-amber-400 border-amber-400/20 bg-amber-400/5",
    paused: "text-muted border-border/50 bg-surface",
  };
  return (
    <span
      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${
        styles[status] ?? styles.paused
      }`}
    >
      {status}
    </span>
  );
}

function ProgressBadge({ progress }: { progress: string }) {
  const styles: Record<string, string> = {
    "in-progress": "text-sky-400 border-sky-400/20 bg-sky-400/5",
    completed: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
    queued: "text-muted border-border/50 bg-surface",
  };
  return (
    <span
      className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${
        styles[progress] ?? styles.queued
      }`}
    >
      {progress === "in-progress" ? "reading" : progress}
    </span>
  );
}

export const metadata = {
  title: "Now",
  description:
    "What I am currently focused on — learning, building, reading, exploring, and working toward.",
};

export default function NowPage() {
  return (
    <PageWrapper className="py-28 md:py-36 px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium mb-10">
            Now
          </p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <Heading as="h1" className="mb-4">
            What I&rsquo;m doing now
          </Heading>
        </FadeIn>

        <FadeIn delay={0.1}>
          <AccentLine className="mb-6" />
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="text-muted text-sm mb-14 leading-relaxed">
            A snapshot of my current focus. Inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent/70 hover:text-accent underline underline-offset-2 decoration-accent/20 hover:decoration-accent/50 transition-colors"
            >
              the now page movement
            </a>
            .
          </p>
        </FadeIn>

        {/* Learning */}
        <Section
          icon={<GraduationCap size={18} strokeWidth={1.5} />}
          title="Learning"
          delay={0.2}
        >
          <ul className="space-y-4">
            {data.learning.map((item) => (
              <li key={item.title}>
                <p className="text-heading text-[0.95rem] font-medium">
                  {item.title}
                </p>
                <p className="text-muted text-sm mt-0.5 leading-relaxed">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Building */}
        <Section
          icon={<Hammer size={18} strokeWidth={1.5} />}
          title="Building"
          delay={0.3}
        >
          <ul className="space-y-4">
            {data.building.map((item) => (
              <li key={item.title}>
                <div className="flex items-center gap-2.5">
                  <p className="text-heading text-[0.95rem] font-medium">
                    {item.title}
                  </p>
                  <StatusBadge status={item.status} />
                </div>
                <p className="text-muted text-sm mt-0.5 leading-relaxed">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Reading */}
        <Section
          icon={<BookOpen size={18} strokeWidth={1.5} />}
          title="Reading"
          delay={0.4}
        >
          <ul className="space-y-4">
            {data.reading.map((item) => (
              <li key={item.title}>
                <div className="flex items-center gap-2.5">
                  <p className="text-heading text-[0.95rem] font-medium">
                    {item.title}
                  </p>
                  <ProgressBadge progress={item.progress} />
                </div>
                <p className="text-muted text-sm mt-0.5">{item.author}</p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Exploring */}
        <Section
          icon={<Compass size={18} strokeWidth={1.5} />}
          title="Exploring"
          delay={0.5}
        >
          <ul className="space-y-4">
            {data.exploring.map((item) => (
              <li key={item.title}>
                <p className="text-heading text-[0.95rem] font-medium">
                  {item.title}
                </p>
                <p className="text-muted text-sm mt-0.5 leading-relaxed">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Goals */}
        <Section
          icon={<Target size={18} strokeWidth={1.5} />}
          title="Goals"
          delay={0.6}
        >
          <ul className="space-y-3">
            {data.goals.map((goal) => (
              <li key={goal.title} className="flex items-start gap-3">
                <span
                  role="checkbox"
                  aria-checked={goal.done}
                  aria-label={goal.title}
                  className={`mt-0.5 w-[18px] h-[18px] rounded border flex items-center justify-center shrink-0 ${
                    goal.done
                      ? "border-accent/40 bg-accent/10"
                      : "border-border/60 bg-surface"
                  }`}
                >
                  {goal.done && <Check size={12} className="text-accent" aria-hidden="true" />}
                </span>
                <span
                  className={`text-sm leading-relaxed ${
                    goal.done ? "text-muted line-through" : "text-body/85"
                  }`}
                >
                  {goal.title}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Last updated */}
        <FadeIn delay={0.7}>
          <div className="mt-16 pt-8 border-t border-border/30">
            <p className="text-[11px] text-muted/40 tracking-wide">
              Last updated {formatDate(data.lastUpdated)}
            </p>
          </div>
        </FadeIn>
      </div>
    </PageWrapper>
  );
}

/* ── Section wrapper ── */

function Section({
  icon,
  title,
  children,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <FadeIn delay={delay}>
      <div className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <span className="text-accent/60" aria-hidden="true">{icon}</span>
          <h2 className="font-serif text-xl text-heading tracking-tight">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </FadeIn>
  );
}
