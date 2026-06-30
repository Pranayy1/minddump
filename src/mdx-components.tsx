import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-serif text-2xl md:text-3xl font-normal text-heading mt-14 mb-6 leading-tight tracking-tight"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-serif text-xl md:text-2xl font-normal text-heading mt-10 mb-4 leading-snug tracking-tight"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-body/90 leading-relaxed mb-6 text-base"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-accent underline underline-offset-2 decoration-accent/30 hover:decoration-accent transition-colors duration-300"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="list-disc list-outside ml-5 mb-6 space-y-2 text-body/90"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-outside ml-5 mb-6 space-y-2 text-body/90"
      {...props}
    />
  ),
  li: (props) => (
    <li className="leading-relaxed pl-1" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-accent/60 pl-6 my-8 text-body/75 font-serif italic text-lg leading-relaxed"
      {...props}
    />
  ),
  hr: () => (
    <hr className="border-border/50 my-12" />
  ),
  code: (props) => {
    const isInline =
      typeof props.className === "undefined" ||
      !props.className?.includes("language-");

    if (isInline) {
      return (
        <code
          className="text-accent bg-surface border border-border/50 px-1.5 py-0.5 rounded text-[0.85em] font-mono"
          {...props}
        />
      );
    }

    return (
      <code className="font-mono text-sm" {...props} />
    );
  },
  pre: (props) => (
    <pre
      className="bg-surface border border-border/50 rounded-lg p-5 my-8 overflow-x-auto text-sm leading-relaxed"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="text-heading font-semibold" {...props} />
  ),
  em: (props) => (
    <em className="italic text-body/85" {...props} />
  ),
  img: (props) => (
    <img
      className="rounded-lg my-8 border border-border/30"
      {...props}
    />
  ),
};
