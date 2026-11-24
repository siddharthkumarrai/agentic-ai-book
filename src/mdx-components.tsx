import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function Heading({
  level,
  children,
  ...props
}: ComponentPropsWithoutRef<"h1"> & {
  level: 1 | 2 | 3 | 4;
  children: ReactNode;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return <Tag {...props}>{children}</Tag>;
}

export function getMDXComponents(): MDXComponents {
  return {
    h1: ({ children, ...props }) => <Heading level={1} {...props}>{children}</Heading>,
    h2: ({ children, ...props }) => <Heading level={2} {...props}>{children}</Heading>,
    h3: ({ children, ...props }) => <Heading level={3} {...props}>{children}</Heading>,
    h4: ({ children, ...props }) => <Heading level={4} {...props}>{children}</Heading>,
    table: (props) => (
      <div className="mdx-table-wrapper">
        <table {...props} />
      </div>
    ),
    pre: (props) => <pre className="mdx-code-block" {...props} />,
    code: (props) => <code className="mdx-code" {...props} />,
    blockquote: (props) => <blockquote className="mdx-callout" {...props} />,
    Callout: ({ children, title }: { children: ReactNode; title?: string }) => (
      <aside className="mdx-callout" aria-label={title ?? "Callout"}>
        {title ? <strong className="mb-1 block">{title}</strong> : null}
        {children}
      </aside>
    ),
    Diagram: ({ children, title }: { children: ReactNode; title: string }) => (
      <figure className="mdx-diagram">
        <div role="img" aria-label={title}>{children}</div>
        <figcaption>{title}</figcaption>
      </figure>
    ),
  };
}

export function useMDXComponents(): MDXComponents {
  return getMDXComponents();
}
