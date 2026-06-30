import type { ReactNode } from "react";

interface ProseBodyProps {
  children: ReactNode;
  className?: string;
}

export function ProseBody({ children, className = "" }: ProseBodyProps) {
  return (
    <article
      className={`prose prose-invert prose-p:text-body/90 prose-p:leading-relaxed prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-heading prose-blockquote:border-l-accent prose-blockquote:text-body/80 prose-blockquote:font-serif prose-blockquote:italic prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-headings:font-serif prose-headings:text-heading prose-li:text-body/90 max-w-none ${className}`}
    >
      {children}
    </article>
  );
}
