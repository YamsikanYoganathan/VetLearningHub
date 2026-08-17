import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Hash, FileText, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { getNoteBySlug, getPublishedNotesByTopic } from "@/lib/supabase/queries";
import { ArticleRenderer } from "@/components/ui/ArticleRenderer";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = await params;
  const note = await getNoteBySlug(p.slug);

  if (!note) return { title: "Note Not Found | Vetulan Service" };

  return {
    title: `${note.title} | Vetulan Service`,
    description:
      note.short_description ||
      `Clinical reference and study note for ${note.title}`,
    openGraph: {
      title: note.title,
      description:
        note.short_description ||
        `Clinical reference and study note for ${note.title}`,
      type: "article",
      publishedTime: note.published_at || note.created_at,
      modifiedTime: note.updated_at,
    },
    twitter: {
      card: "summary",
      title: note.title,
      description:
        note.short_description ||
        `Clinical reference and study note for ${note.title}`,
    },
  };
}

// Utility to extract headings from TipTap JSON for TOC
function extractHeadings(content: any) {
  const headings: { id: string; text: string; level: number }[] = [];

  if (!content || !content.content || !Array.isArray(content.content)) {
    return headings;
  }

  content.content.forEach((node: any) => {
    if (node.type === "heading" && node.content) {
      const text = node.content.map((c: any) => c.text).join("") || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const level = node.attrs?.level || 2;
      if (text && id) {
        headings.push({ id, text, level });
      }
    }
  });

  return headings;
}

export default async function NoteReaderPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = await params;
  const note = await getNoteBySlug(p.slug);

  if (!note) {
    notFound();
  }

  const topic = Array.isArray(note.topics)
    ? note.topics[0]
    : (note.topics as any);
  const subject = topic
    ? Array.isArray(topic.subjects)
      ? topic.subjects[0]
      : (topic.subjects as any)
    : null;
  const area = subject
    ? Array.isArray(subject.academic_areas)
      ? subject.academic_areas[0]
      : (subject.academic_areas as any)
    : null;

  // Fetch sibling notes for topic navigation
  const siblingNotes = topic ? await getPublishedNotesByTopic(topic.id) : [];

  // Find currentIndex, prevNote, nextNote for sequential study navigation
  const currentIndex = siblingNotes.findIndex((s) => s.id === note.id);
  const prevNote = currentIndex > 0 ? siblingNotes[currentIndex - 1] : null;
  const nextNote =
    currentIndex >= 0 && currentIndex < siblingNotes.length - 1
      ? siblingNotes[currentIndex + 1]
      : null;

  const headings = extractHeadings(note.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description:
      note.short_description ||
      `Clinical reference and study note for ${note.title}`,
    datePublished: note.published_at || note.created_at,
    dateModified: note.updated_at,
  };

  const breadcrumbItems = [];
  if (area)
    breadcrumbItems.push({
      label: area.name,
      href: `/subjects/${area.slug}`,
    });
  if (subject && area)
    breadcrumbItems.push({
      label: subject.name,
      href: `/subjects/${area.slug}/${subject.slug}`,
    });
  if (topic && subject && area)
    breadcrumbItems.push({
      label: topic.name,
      href: `/subjects/${area.slug}/${subject.slug}/${topic.slug}`,
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

      {/* Layout Grid: 3-column strictly on xl+ (1280px+), responsive below */}
      <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-start relative">
        {/* Left Topic Navigator (Sticky on xl+, hidden on mobile/tablet) */}
        {topic && siblingNotes.length > 1 && (
          <aside className="hidden xl:block w-64 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 pb-2 border-b border-slate-200">
                <Hash className="w-3.5 h-3.5 text-teal-600" />
                <span>Topic Navigator</span>
              </div>
              <h2
                className="font-bold text-slate-900 text-xs mb-3 truncate leading-snug"
                title={topic.name}
              >
                {topic.name}
              </h2>
              <ul className="space-y-1">
                {siblingNotes.map((sibling) => {
                  const isActive = sibling.id === note.id;
                  return (
                    <li key={sibling.id}>
                      <Link
                        href={`/notes/${sibling.slug}`}
                        className={`flex items-start gap-2 px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                          isActive
                            ? "bg-sky-50 text-sky-800 font-semibold border-l-2 border-primary"
                            : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                        }`}
                      >
                        <FileText
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isActive ? "text-primary" : "text-slate-400"
                          }`}
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
          <header className="mb-8 pb-6 border-b border-slate-200">
            {/* Discipline Tag */}
            {subject && (
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-md w-fit mb-3">
                <Layers className="w-3.5 h-3.5 text-teal-600" />
                <span>{subject.name}</span>
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3 leading-tight text-balance">
              {note.title}
            </h1>

            {note.short_description && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4 text-balance">
                {note.short_description}
              </p>
            )}

            {/* Metadata Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{note.reading_time || 5} min study read</span>
              </div>
              <span className="text-slate-300">•</span>
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

          {/* Prev / Next Note Sequential Navigation */}
          {(prevNote || nextNote) && (
            <div className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevNote ? (
                <Link
                  href={`/notes/${prevNote.slug}`}
                  className="group flex flex-col p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition-all text-left"
                >
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 group-hover:text-primary transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />{" "}
                    Previous in topic
                  </span>
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                    {prevNote.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {nextNote && (
                <Link
                  href={`/notes/${nextNote.slug}`}
                  className="group flex flex-col p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition-all text-right sm:col-start-2"
                >
                  <span className="inline-flex items-center justify-end gap-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1 group-hover:text-primary transition-colors">
                    Next in topic{" "}
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
                    {nextNote.title}
                  </span>
                </Link>
              )}
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
