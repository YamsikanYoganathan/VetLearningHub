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
}

// Utility to render marks (bold, italic, code, link)
function renderTextWithMarks(node: JSONNode, key: string) {
  if (!node.marks || node.marks.length === 0) {
    return <React.Fragment key={key}>{node.text}</React.Fragment>;
  }

  let element = <React.Fragment key={key}>{node.text}</React.Fragment>;

  // Apply marks from inside out
  node.marks.forEach((mark) => {
    switch (mark.type) {
      case "bold":
        element = <strong key={key}>{element}</strong>;
        break;
      case "italic":
        element = <em key={key}>{element}</em>;
        break;
      case "strike":
        element = <del key={key}>{element}</del>;
        break;
      case "code":
        element = <code key={key}>{element}</code>;
        break;
      case "link":
        const href = mark.attrs?.href || "#";
        element = (
          <a key={key} href={href} target={mark.attrs?.target} rel="noopener noreferrer">
            {element}
          </a>
        );
        break;
      default:
        // Unknown mark, just pass through
        break;
    }
  });

  return element;
}

// Recursive node renderer
function renderNode(node: JSONNode, index: number): React.ReactNode {
  const key = `node-${index}`;

  switch (node.type) {
    case "text":
      return renderTextWithMarks(node, key);

    case "paragraph":
      return (
        <p key={key}>
          {node.content?.map((child, i) => renderNode(child, i)) || <br />}
        </p>
      );

    case "heading":
      const level = node.attrs?.level || 2;
      const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
      // Generate ID for TOC
      const id = node.content?.map((c) => c.text).join("").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return (
        <HeadingTag key={key} id={id}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </HeadingTag>
      );

    case "bulletList":
      return (
        <ul key={key}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </ul>
      );

    case "orderedList":
      return (
        <ol key={key}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </ol>
      );

    case "listItem":
      return (
        <li key={key}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </li>
      );

    case "blockquote":
      return (
        <blockquote key={key}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </blockquote>
      );

    case "horizontalRule":
      return <hr key={key} />;

    case "image":
      return (
        <figure key={key} className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={node.attrs?.src}
            alt={node.attrs?.alt || ""}
            title={node.attrs?.title}
            className="rounded-xl border border-border-subtle shadow-sm w-full h-auto"
          />
          {node.attrs?.alt && (
            <figcaption className="text-center mt-2 text-sm text-muted-foreground">
              {node.attrs.alt}
            </figcaption>
          )}
        </figure>
      );

    case "table":
      return (
        <div key={key} className="my-8 overflow-x-auto">
          <table className="w-full text-sm text-left">
            {node.content?.map((child, i) => renderNode(child, i))}
          </table>
        </div>
      );

    case "tableRow":
      return (
        <tr key={key} className="border-b border-border-subtle hover:bg-muted/50 transition-colors">
          {node.content?.map((child, i) => renderNode(child, i))}
        </tr>
      );

    case "tableHeader":
      return (
        <th key={key} className="p-3 bg-muted font-semibold text-foreground border-b-2 border-border-subtle">
          {node.content?.map((child, i) => renderNode(child, i))}
        </th>
      );

    case "tableCell":
      return (
        <td key={key} className="p-3">
          {node.content?.map((child, i) => renderNode(child, i))}
        </td>
      );

    // Custom Callout node support
    case "callout":
      const type = (node.attrs?.type as CalloutType) || "clinical_note";
      const title = node.attrs?.title;
      return (
        <Callout key={key} type={type} title={title}>
          {node.content?.map((child, i) => renderNode(child, i))}
        </Callout>
      );

    default:
      // Gracefully handle unknown blocks by diving into content if it exists
      if (node.content) {
        return (
          <div key={key} className="unknown-node-wrapper" data-node-type={node.type}>
            {node.content.map((child, i) => renderNode(child, i))}
          </div>
        );
      }
      return null;
  }
}

export function ArticleRenderer({ content }: ArticleRendererProps) {
  // Check if content is valid TipTap JSON
  if (!content || typeof content !== "object" || !content.content || !Array.isArray(content.content)) {
    return (
      <div className="text-muted-foreground italic border-l-4 border-warning pl-4 py-2">
        Content is currently unavailable or improperly formatted.
      </div>
    );
  }

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none w-full">
      {content.content.map((node: JSONNode, index: number) => renderNode(node, index))}
    </article>
  );
}
