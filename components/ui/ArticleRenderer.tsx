import React from "react";
import { Callout, CalloutType } from "@/components/ui/callout";

// Standard TipTap JSON node interface
interface JSONNode {
  type: string;
  attrs?: Record<string, any>;
  content?: JSONNode[];
  marks?: { type: string; attrs?: Record<string, any> }[];
  text?: string;
}

export interface ArticleRendererProps {
  content: any;
  className?: string;
}

// Security: Prevent XSS from javascript: URIs
function isSafeUrl(url: string | undefined): boolean {
  if (!url) return false;
  const safeProtocols = /^(https?|mailto|tel):/i;
  return url.startsWith("/") || url.startsWith("#") || safeProtocols.test(url);
}

// Utility to render marks (bold, italic, code, link)
function renderTextWithMarks(node: JSONNode, key: string) {
  if (!node.marks || node.marks.length === 0) {
    return <React.Fragment key={key}>{node.text}</React.Fragment>;
  }

  let element: React.ReactNode = <React.Fragment key={key}>{node.text}</React.Fragment>;

  // Apply marks from inside out
  node.marks.forEach((mark, markIndex) => {
    const markKey = `${key}-mark-${markIndex}`;
    switch (mark.type) {
      case "bold":
        element = <strong key={markKey} className="font-bold text-foreground">{element}</strong>;
        break;
      case "italic":
        element = <em key={markKey} className="italic text-foreground/90">{element}</em>;
        break;
      case "strike":
        element = <del key={markKey} className="line-through text-muted-foreground">{element}</del>;
        break;
      case "code":
        element = (
          <code key={markKey} className="rounded-md bg-surface-subtle px-1.5 py-0.5 font-mono text-[0.875em] text-foreground border border-border">
            {element}
          </code>
        );
        break;
      case "link":
        let href = mark.attrs?.href || "#";
        if (!isSafeUrl(href)) {
          href = "#";
        }
        element = (
          <a
            key={markKey}
            href={href}
            target={mark.attrs?.target || (href.startsWith("http") ? "_blank" : undefined)}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-primary hover:underline underline-offset-4 font-medium transition-colors"
          >
            {element}
          </a>
        );
        break;
      default:
        break;
    }
  });

  return element;
}

// Recursive node renderer matching Note Reader & Editor
export function renderNode(node: JSONNode, index: number): React.ReactNode {
  const key = `node-${index}`;

  switch (node.type) {
    case "text":
      return renderTextWithMarks(node, key);

    case "paragraph":
      return (
        <p key={key} className="mb-4 text-base text-text-secondary leading-[1.8]">
          {node.content?.map((child, i) => renderNode(child, i)) || <br />}
        </p>
      );

    case "heading":
      const level = (node.attrs?.level || 2) as number;
      const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
      const textContent = node.content?.map((c) => c.text).join("") || "";
      const id = textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      const headingClasses: Record<number, string> = {
        1: "group relative text-2xl sm:text-3xl font-bold text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-border scroll-mt-24",
        2: "group relative text-xl sm:text-2xl font-bold text-foreground tracking-tight mt-8 mb-3 scroll-mt-24",
        3: "group relative text-lg sm:text-xl font-semibold text-foreground tracking-tight mt-6 mb-2 scroll-mt-24",
        4: "group relative text-base sm:text-lg font-semibold text-foreground mt-4 mb-2 scroll-mt-24",
      };

      const headingClass = headingClasses[level] || "group relative text-base font-semibold text-foreground mt-4 mb-2 scroll-mt-24";

      return (
        <HeadingTag key={key} id={id || undefined} className={headingClass}>
          {node.content?.map((child, i) => renderNode(child, i))}
          {id && (
            <a
              href={`#${id}`}
              aria-label={`Direct link to ${textContent}`}
              className="inline-block opacity-0 group-hover:opacity-100 focus:opacity-100 ml-2 text-muted-foreground hover:text-primary transition-opacity font-normal text-sm select-none"
            >
              #
            </a>
          )}
        </HeadingTag>
      );

    case "bulletList":
      return (
        <ul key={key} className="my-4 space-y-1.5 pl-6 list-disc text-text-secondary marker:text-muted-foreground leading-[1.75]">
          {node.content?.map((child, i) => renderNode(child, i))}
        </ul>
      );

    case "orderedList":
      return (
        <ol key={key} className="my-4 space-y-1.5 pl-6 list-decimal text-text-secondary marker:text-muted-foreground font-normal leading-[1.75]">
          {node.content?.map((child, i) => renderNode(child, i))}
        </ol>
      );

    case "listItem":
      return (
        <li key={key} className="pl-1">
          {node.content?.map((child, i) => renderNode(child, i))}
        </li>
      );

    case "blockquote":
      return (
        <blockquote key={key} className="my-5 pl-4 border-l-[3.5px] border-primary/40 italic text-text-secondary bg-surface-subtle/40 py-2 rounded-r-lg">
          {node.content?.map((child, i) => renderNode(child, i))}
        </blockquote>
      );

    case "horizontalRule":
      return <hr key={key} className="my-8 border-border" />;

    case "image":
      return (
        <figure key={key} className="my-6">
          <img
            src={node.attrs?.src}
            alt={node.attrs?.alt || "Clinical diagram"}
            title={node.attrs?.title}
            loading={index < 3 ? "eager" : "lazy"}
            decoding="async"
            width={node.attrs?.width}
            height={node.attrs?.height}
            style={{
              maxWidth: "100%",
              height: "auto",
              aspectRatio: node.attrs?.width && node.attrs?.height ? `${node.attrs.width}/${node.attrs.height}` : "auto",
            }}
            className="rounded-xl border border-border shadow-xs mx-auto object-contain max-h-[520px] bg-surface"
          />
          {node.attrs?.alt && (
            <figcaption className="text-center mt-2 text-xs text-muted-foreground font-medium">
              {node.attrs.alt}
            </figcaption>
          )}
        </figure>
      );

    case "table":
      return (
        <div key={key} className="my-6 overflow-x-auto rounded-xl border border-border shadow-xs">
          <table className="w-full text-sm text-left border-collapse bg-surface">
            {node.content?.map((child, i) => renderNode(child, i))}
          </table>
        </div>
      );

    case "tableRow":
      return (
        <tr key={key} className="border-b border-border/60 hover:bg-surface-subtle/60 transition-colors last:border-0">
          {node.content?.map((child, i) => renderNode(child, i))}
        </tr>
      );

    case "tableHeader":
      return (
        <th key={key} className="px-4 py-3 bg-surface-subtle font-semibold text-foreground border-b border-border text-xs uppercase tracking-wider">
          {node.content?.map((child, i) => renderNode(child, i))}
        </th>
      );

    case "tableCell":
      return (
        <td key={key} className="px-4 py-3 text-text-secondary text-sm align-top leading-normal">
          {node.content?.map((child, i) => renderNode(child, i))}
        </td>
      );

    case "callout":
      const type = (node.attrs?.type as CalloutType) || "clinical_note";
      const title = node.attrs?.title;
      return (
        <Callout key={key} type={type} title={title}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </Callout>
      );

    default:
      if (node.content) {
        return (
          <div key={key} className="my-2" data-node-type={node.type}>
            {node.content.map((child, i) => renderNode(child, i))}
          </div>
        );
      }
      return null;
  }
}

export function ArticleRenderer({ content, className }: ArticleRendererProps) {
  if (!content || typeof content !== "object" || !content.content || !Array.isArray(content.content)) {
    return (
      <div className="rounded-xl border border-border bg-surface-subtle p-6 text-sm text-muted-foreground italic">
        Content is currently being prepared for this reference note.
      </div>
    );
  }

  return (
    <div className={`article-content max-w-[68ch] w-full mx-auto ${className || ""}`}>
      {content.content.map((node: JSONNode, index: number) => renderNode(node, index))}
    </div>
  );
}
