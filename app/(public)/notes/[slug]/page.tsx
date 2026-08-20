import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Layers,
  ChevronLeft,
  ChevronRight,
  Hash,
  FileText,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { getNoteBySlug, getPublishedNotesByTopic } from "@/lib/supabase/queries";
import { ArticleRenderer } from "@/components/ui/ArticleRenderer";
import { NoteAttachments } from "@/components/ui/NoteAttachments";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { NoteUtilityBar } from "@/components/ui/NoteUtilityBar";

export const revalidate = 60; // 1-minute ISR cache

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

function extractHeadings(
  node: any
): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  if (!node) return headings;

  function traverse(n: any) {
    if (n.type === "heading" && n.content) {
      const text = n.content.map((c: any) => c.text).join("");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      headings.push({ id, text, level: n.attrs?.level || 2 });
    }
    if (n.content && Array.isArray(n.content)) {
      n.content.forEach(traverse);
    }
  }

  traverse(node);
  return headings;
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const topic: any = Array.isArray(note.topics) ? note.topics[0] : note.topics;
  const subject: any =
    topic && Array.isArray(topic.subjects)
      ? topic.subjects[0]
      : topic?.subjects;
  const area: any =
    subject && Array.isArray(subject.academic_areas)
      ? subject.academic_areas[0]
      : subject?.academic_areas;

  const siblingNotes = topic ? await getPublishedNotesByTopic(topic.id) : [];
  const currentIndex = siblingNotes.findIndex((n: any) => n.id === note.id);
  const prevNote: any = currentIndex > 0 ? siblingNotes[currentIndex - 1] : null;
  const nextNote: any =
    currentIndex >= 0 && currentIndex < siblingNotes.length - 1
      ? siblingNotes[currentIndex + 1]
      : null;

  const relatedNotes = siblingNotes.filter((n: any) => n.id !== note.id).slice(0, 4);

  const headings = extractHeadings(note.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description:
      note.short_description ||
      ("Clinical reference and study note for " + note.title),
    datePublished: note.published_at || note.created_at,
    dateModified: note.updated_at,
  };

  const breadcrumbItems = [];
  if (area)
    breadcrumbItems.push({
      label: area.name,
      href: "/subjects/" + area.slug,
    });
  if (subject && area)
    breadcrumbItems.push({
      label: subject.name,
      href: "/subjects/" + area.slug + "/" + subject.slug,
    });
  if (topic && subject && area)
    breadcrumbItems.push({
      label: topic.name,
      href: "/subjects/" + area.slug + "/" + subject.slug + "/" + topic.slug,
    });
  breadcrumbItems.push({ label: note.title, isCurrent: true });

  return (
    <div className="container-page py-8 sm:py-12 relative">
      <ReadingProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Trail */}
      <Breadcrumb items={breadcrumbItems} className="mb-6 sm:mb-8" />

      {/* Layout Grid: 3-column on xl+ (1280px+), responsive below */}
      <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-start relative">
        {/* Left Topic Navigator (Sticky on xl+, hidden on mobile/tablet) */}
        {topic && siblingNotes.length > 1 && (
          <aside className="hidden xl:block w-64 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <div className="rounded-2xl border border-border/80 bg-white p-5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary mb-2.5 pb-2.5 border-b border-border/80">
                <Hash className="w-3.5 h-3.5 text-secondary" />
                <span>Topic Navigator</span>
              </div>
              <h2
                className="font-bold text-foreground text-xs mb-3 truncate leading-snug"
                title={topic.name}
              >
                {topic.name}
              </h2>
              <ul className="space-y-1">
                {siblingNotes.map((sibling: any) => {
                  const isActive = sibling.id === note.id;
                  return (
                    <li key={sibling.id}>
                      <Link
                        href={"/notes/" + sibling.slug}
                        className={"flex items-start gap-2 px-3 py-2 rounded-xl text-xs transition-colors " + (
                          isActive
                            ? "bg-primary-subtle text-primary font-semibold border-l-2 border-primary"
                            : "text-text-secondary hover:bg-surface-subtle hover:text-foreground"
                        )}
                      >
                        <FileText
                          className={"w-3.5 h-3.5 shrink-0 mt-0.5 " + (
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                        <span className="leading-snug line-clamp-2">
                          {sibling.title}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        )}

        {/* Center Main Article — Strict 65-68ch reading measure */}
        <main className="flex-1 min-w-0 max-w-[68ch] mx-auto xl:mx-0 w-full">
          {/* Mobile TOC Accordion */}
          {headings.length > 0 && (
            <div className="xl:hidden">
              <TableOfContents items={headings} isMobile={true} />
            </div>
          )}

          {/* Article Editorial Header */}
          <header className="mb-8 pb-6 border-b border-border/80">
            {/* Top Toolbar Row */}
            <div className="flex items-center justify-between gap-4 mb-3">
              {subject && (
                <div className="flex items-center gap-2 text-xs font-semibold text-secondary bg-secondary-subtle border border-secondary/20 px-3 py-1 rounded-md w-fit">
                  <Layers className="w-3.5 h-3.5 text-secondary" />
                  <span>{subject.name}</span>
                </div>
              )}

              <NoteUtilityBar title={note.title} />
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-3 leading-tight text-balance">
              {note.title}
            </h1>

            {note.short_description && (
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-4 text-balance">
                {note.short_description}
              </p>
            )}

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-medium pt-2.5 border-t border-border/80">
              <div className="flex items-center gap-1.5 text-text-secondary font-medium">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{note.reading_time || 5} min study read</span>
              </div>
              <span className="text-border">•</span>
              <div>
                <span>
                  Updated{" "}
                  {new Date(note.updated_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </header>

          {/* Core TipTap Article Content */}
          <ArticleRenderer content={note.content} />

          {/* Attached Documents & Study Resources */}
          <NoteAttachments attachments={(note.content as any)?.attachments} />

          {/* Prev / Next Note Sequential Navigation */}
          {(prevNote || nextNote) && (
            <div className="mt-12 pt-6 border-t border-border/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevNote ? (
                <Link
                  href={"/notes/" + prevNote.slug}
                  className="group flex flex-col p-4 sm:p-5 rounded-2xl border border-border/80 bg-white hover:border-sky-300 hover:shadow-xs transition-all text-left shadow-2xs"
                >
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 group-hover:text-primary transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />{" "}
                    Previous in topic
                  </span>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {prevNote.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextNote && (
                <Link
                  href={"/notes/" + nextNote.slug}
                  className="group flex flex-col p-4 sm:p-5 rounded-2xl border border-border/80 bg-white hover:border-sky-300 hover:shadow-xs transition-all text-right sm:col-start-2 shadow-2xs"
                >
                  <span className="inline-flex items-center justify-end gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1 group-hover:text-primary transition-colors">
                    Next in topic{" "}
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {nextNote.title}
                  </span>
                </Link>
              )}
            </div>
          )}

          {/* Continue Studying / Related Notes Section */}
          {relatedNotes.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border/80">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-foreground mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Continue Studying in this Module</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedNotes.map((rel: any) => (
                  <Link
                    key={rel.id}
                    href={"/notes/" + rel.slug}
                    className="group p-4 sm:p-5 rounded-2xl border border-border/80 bg-white hover:border-sky-300 hover:shadow-xs transition-all flex flex-col justify-between shadow-2xs"
                  >
                    <div>
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                        {topic?.name || "Clinical Topic"}
                      </span>
                      <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {rel.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2.5 border-t border-border/80">
                      <span>{rel.reading_time || 5} min read</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Right Sticky Table of Contents (Desktop xl+) */}
        {headings.length > 0 && (
          <aside className="hidden xl:block w-56 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pl-2">
            <TableOfContents items={headings} />
          </aside>
        )}
      </div>
    </div>
  );
}
