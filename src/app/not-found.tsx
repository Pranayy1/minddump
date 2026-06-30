import Link from "next/link";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { AccentLine } from "@/components/typography/AccentLine";

export default function NotFound() {
  return (
    <PageWrapper className="py-28 md:py-36 px-6">
      <div className="max-w-md mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-accent font-medium mb-6">
          404
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-normal text-heading leading-tight mb-4">
          Page not found
        </h1>
        <AccentLine className="mx-auto mb-6" />
        <p className="text-muted text-base leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-heading border border-border rounded-full px-7 py-3 hover:border-accent/40 hover:text-accent transition-colors duration-300"
        >
          Back to home
        </Link>
      </div>
    </PageWrapper>
  );
}
