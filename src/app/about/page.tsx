import { PageWrapper } from "@/components/layout/PageWrapper";
import { FadeIn } from "@/components/ui/FadeIn";
import { AccentLine } from "@/components/typography/AccentLine";

export const metadata = {
  title: "About",
  description:
    "I am not an expert. I am a student. This website exists to document my learning journey publicly.",
};

export default function AboutPage() {
  return (
    <PageWrapper className="py-28 md:py-36 px-6">
      <div className="max-w-xl mx-auto">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium mb-10">
            About
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-heading leading-tight mb-4">
            I am not an expert.
            <br />
            <span className="text-accent">I am a student.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <AccentLine className="mb-10" />
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="space-y-6 text-body/85 text-base md:text-[1.05rem] leading-[1.8]">
            <p>
              This website exists to document my learning journey publicly.
            </p>

            <p>
              I learn programming, technology, networking, software engineering,
              cybersecurity, game development, and whatever captures my curiosity.
            </p>

            <p>
              Instead of waiting until I become an expert, I decided to share the
              journey.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="mt-16 pt-10 border-t border-border/40">
            <blockquote className="border-l-2 border-accent/50 pl-6">
              <p className="font-serif italic text-lg md:text-xl text-body/70 leading-relaxed">
                &ldquo;The only true wisdom is in knowing you know nothing.&rdquo;
              </p>
              <cite className="block mt-3 text-sm text-muted not-italic">
                — Socrates
              </cite>
            </blockquote>
          </div>
        </FadeIn>
      </div>
    </PageWrapper>
  );
}
