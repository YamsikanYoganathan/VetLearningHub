import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Hash, FileText, AlertTriangle, ArrowLeft } from "lucide-react";
import { requireEditor } from "@/lib/supabase/rbac";
import { createClient } from "@/lib/supabase/server";
import { ArticleRenderer } from "@/components/ui/ArticleRenderer";
import { NoteAttachments } from "@/components/ui/NoteAttachments";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";

// Utility to extract headings from TipTap JSON for TOC
function extractHeadings(content: any) {
  const headings: { id: string; text: string; level: number }[] = [];

  if (!content || !content.content || !Array.isArray(content.content)) {
    return headings;
  }

  content.content.forEach((node: any) => {
    if (node.type === "heading" && node.content) {
      const text = node.content.map((c: any) => c.text).join("") || "";
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const level = node.attrs?.level || 2;
      if (text && id) {
        headings.push({ id, text, level });
      }
    }
  });

  return headings;
}

export default async function NotePreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireEditor();
  const { id } = await params;

  const supabase = await createClient();

  const { data: note } = await supabase
    .from("notes")
    .select("*, topics(id, name, slug, subjects(name, slug, academic_areas(name, slug)))")
    .eq("id", id)
    .single();

  if (!note) {
    notFound();
  }

  const topic = Array.isArray(note.topics) ? note.topics[0] : (note.topics as any);
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

  // Fetch sibling notes for topic preview
  const { data: siblingNotes } = await supabase
    .from("notes")
    .select("id, title, slug")
    .eq("topic_id", topic?.id)
    .order("sort_order")
    .order("title");

  const headings = extractHeadings(note.content);

  const breadcrumbItems = [];
  if (area) breadcrumbItems.push({ label: area.name });
  if (subject) breadcrumbItems.push({ label: subject.name });
  if (topic) breadcrumbItems.push({ label: topic.name });
  breadcrumbItems.push({ label: `${note.title} (Preview)`, isCurrent: true });

  return (
    <div className="bg-white min-h-screen">
      {/* Preview Warning Header */}
      <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2 flex items-center justify-between text-xs font-medium sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Author Preview:</strong> Displaying {note.status.toUpperCase()} version.
          </span>
        </div>
        <Link
          href={`/admin/notes/${note.id}/edit`}
          className="inline-flex items-center gap-1 font-semibold text-amber-900 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Editor</span>
        </Link>
      </div>

      <div className="container-page py-8 sm:py-12">
        <Breadcrumb items={breadcrumbItems} className="mb-6 sm:mb-8" />

        <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-start relative">
          {/* Left Topic Navigator */}
          {topic && siblingNotes && siblingNotes.length > 1 && (
            <aside className="hidden xl:block w-64 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 mb-2 pb-2 border-b border-slate-200">
                  <Hash className="w-3.5 h-3.5 text-teal-600" />
                  <span>Topic Navigator</span>
                </div>
                <h2 className="font-bold text-slate-900 text-xs mb-3 truncate leading-snug">
                  {topic.name}
                </h2>
                <ul className="space-y-1">
                  {siblingNotes.map((sibling) => {
                    const isActive = sibling.id === note.id;
                    return (
                      <li key={sibling.id}>
                        <div
                          className={`flex items-start gap-2 px-2.5 py-1.5 rounded-md text-xs ${
                            isActive
                              ? "bg-sky-50 text-sky-800 font-semibold border-l-2 border-primary"
                              : "text-slate-500"
                          }`}
                        >
                          <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span className="leading-snug line-clamp-2">{sibling.title}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>
          )}

          {/* Center Main Article */}
          <main className="flex-1 min-w-0 max-w-[68ch] mx-auto xl:mx-0 w-full">
            {headings.length > 0 && (
              <div className="xl:hidden">
                <TableOfContents items={headings} isMobile={true} />
              </div>
            )}

            <header className="mb-8 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={note.status === "published" ? "success" : "warning"}>
                  {note.status.toUpperCase()}
                </Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3 leading-tight">
                {note.title}
              </h1>

              {note.short_description && (
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4">
                  {note.short_description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{note.reading_time || 5} min study read</span>
                </div>
                <span className="text-slate-300">•</span>
                <div>
                  <span>Updated {new Date(note.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
            </header>

            <ArticleRenderer content={note.content} />

            <NoteAttachments attachments={(note.content as any)?.attachments} />
          </main>

          {/* Right Sticky TOC */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-56 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pl-2">
              <TableOfContents items={headings} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
