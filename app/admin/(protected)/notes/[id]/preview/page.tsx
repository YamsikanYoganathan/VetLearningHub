import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home, Clock, Hash, FileText, AlertTriangle } from "lucide-react";
import { requireEditor } from "@/lib/supabase/rbac";
import { createClient } from "@/lib/supabase/server";
import { ArticleRenderer } from "@/components/ui/ArticleRenderer";
import { TableOfContents } from "@/components/ui/TableOfContents";

// Utility to extract headings from TipTap JSON
function extractHeadings(content: any) {
  const headings: { id: string; text: string; level: number }[] = [];
  
  if (!content || !content.content || !Array.isArray(content.content)) {
    return headings;
  }

  content.content.forEach((node: any) => {
    if (node.type === "heading" && node.content) {
      const text = node.content.map((c: any) => c.text).join("");
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const level = node.attrs?.level || 2;
      headings.push({ id, text, level });
    }
  });

  return headings;
}

export default async function NotePreviewPage({ params }: { params: Promise<{ id: string }> }) {
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

  const topic = Array.isArray(note.topics) ? note.topics[0] : note.topics as any;
  const subject = topic ? (Array.isArray(topic.subjects) ? topic.subjects[0] : topic.subjects as any) : null;
  const area = subject ? (Array.isArray(subject.academic_areas) ? subject.academic_areas[0] : subject.academic_areas as any) : null;

  // Fetch sibling notes (without published filter for preview context)
  const { data: siblingNotes } = await supabase
    .from("notes")
    .select("id, title, slug")
    .eq("topic_id", topic?.id)
    .order("sort_order")
    .order("title");

  const headings = extractHeadings(note.content);

  return (
    <div className="bg-background min-h-screen">
      {/* Preview Warning Banner */}
      <div className="bg-amber-500 text-amber-950 px-4 py-2 flex items-center justify-center gap-2 text-sm font-bold shadow-sm sticky top-0 z-50">
        <AlertTriangle className="w-4 h-4" />
        ADMIN PREVIEW MODE ({note.status.toUpperCase()})
        <Link href={`/admin/notes/${note.id}/edit`} className="ml-4 underline hover:text-amber-900 font-semibold">
          Return to Editor
        </Link>
      </div>

      <div className="container-page py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative items-start">
          
          <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-24 max-h-none lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            {topic && (
              <div className="bg-surface rounded-xl border border-border-subtle p-4 lg:p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-tight text-muted-foreground mb-4 pb-4 border-b border-border-subtle">
                  <Hash className="w-3.5 h-3.5" />
                  <span>Topic Navigator</span>
                </div>
                <h3 className="font-bold text-foreground mb-4 text-sm leading-tight">{topic.name}</h3>
                <ul className="space-y-1">
                  {siblingNotes?.map((sibling) => {
                    const isActive = sibling.id === note.id;
                    return (
                      <li key={sibling.id}>
                        <div 
                          className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "text-muted-foreground"
                          }`}
                        >
                          <FileText className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? "text-primary" : "text-muted-foreground/70"}`} />
                          <span className="leading-snug">{sibling.title}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </aside>

          <main className="flex-1 min-w-0 max-w-3xl">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap pb-2">
              <div className="flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span className="sr-only">Home</span>
              </div>
              
              {area && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate max-w-[100px] sm:max-w-none">{area.name}</span>
                </>
              )}
              
              {subject && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{subject.name}</span>
                </>
              )}
              
              {topic && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{topic.name}</span>
                </>
              )}
            </nav>

            <header className="mb-8 pb-8 border-b border-border-subtle">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4 leading-tight">
                {note.title}
              </h1>
              
              {note.short_description && (
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
                  {note.short_description}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 bg-muted/50 px-2.5 py-1 rounded-md">
                  <Clock className="w-4 h-4" />
                  <span>{note.reading_time || 5} min read</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Updated: {new Date(note.updated_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>
            </header>

            <ArticleRenderer content={note.content} />
          </main>

          {headings.length > 0 && (
            <aside className="hidden xl:block w-56 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pl-4">
              <TableOfContents items={headings} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
