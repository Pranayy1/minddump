import { type ElementType, type ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

const sizeMap: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-5xl lg:text-6xl leading-tight",
  h2: "text-2xl md:text-3xl lg:text-4xl leading-tight",
  h3: "text-xl md:text-2xl leading-snug",
  h4: "text-lg md:text-xl leading-snug",
};

interface HeadingProps {
  as?: HeadingLevel;
  children: ReactNode;
  className?: string;
}

export function Heading({
  as: Tag = "h2",
  children,
  className = "",
}: HeadingProps) {
  return (
    <Tag
      className={`font-serif font-normal tracking-tight text-heading ${sizeMap[Tag]} ${className}`}
    >
      {children}
    </Tag>
  );
}
