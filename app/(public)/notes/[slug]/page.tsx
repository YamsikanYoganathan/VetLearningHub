import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home, Clock, Hash, FileText } from "lucide-react";
import { getNoteBySlug, getPublishedNotesByTopic } from "@/lib/supabase/queries";
import { ArticleRenderer } from "@/components/ui/ArticleRenderer";
import { TableOfContents } from "@/components/ui/TableOfContents";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await params;
  const note = await getNoteBySlug(p.slug);
  
  if (!note) return { title: "Not Found" };
  
  return {
    title: `${note.title} | Vetulan Service`,
    description: note.short_description || `Clinical protocol for ${note.title}`,
  };
}

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

export default async function NoteReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params;
  const note = await getNoteBySlug(p.slug);
  
  if (!note) {
    notFound();
  }

  const topic = Array.isArray(note.topics) ? note.topics[0] : note.topics as any;
  const subject = topic ? (Array.isArray(topic.subjects) ? topic.subjects[0] : topic.subjects as any) : null;
  const area = subject ? (Array.isArray(subject.academic_areas) ? subject.academic_areas[0] : subject.academic_areas as any) : null;

  // Fetch sibling notes for the left navigation
  const siblingNotes = topic ? await getPublishedNotesByTopic(topic.id) : [];

  const headings = extractHeadings(note.content);

  return (
    <div className="container-page py-6 md:py-10">
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 relative items-start">
        
        {/* Left Context Navigation (Desktop) / Collapsible (Mobile) */}
        <aside className="w-full lg:w-64 xl:w-72 shrink-0 lg:sticky lg:top-24 max-h-none lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
          {topic && (
            <div className="bg-surface rounded-xl border border-border-subtle p-4 lg:p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-tight text-muted-foreground mb-4 pb-4 border-b border-border-subtle">
                <Hash className="w-3.5 h-3.5" />
                <span>Topic Navigator</span>
              </div>
              <h3 className="font-bold text-foreground mb-4 text-sm leading-tight">{topic.name}</h3>
              <ul className="space-y-1">
                {siblingNotes.map((sibling) => {
                  const isActive = sibling.id === note.id;
                  return (
                    <li key={sibling.id}>
                      <Link 
                        href={`/notes/${sibling.slug}`}
                        className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <FileText className={`w-4 h-4 shrink-0 mt-0.5 ${isActive ? "text-primary" : "text-muted-foreground/70"}`} />
                        <span className="leading-snug">{sibling.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </aside>

        {/* Center Main Content */}
        <main className="flex-1 min-w-0 max-w-3xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span className="sr-only">Home</span>
            </Link>
            
            {area && (
              <>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <Link href={`/subjects/${area.slug}`} className="hover:text-primary transition-colors truncate max-w-[100px] sm:max-w-none">
                  {area.name}
                </Link>
              </>
            )}
            
            {subject && (
              <>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <Link href={`/subjects/${area?.slug}/${subject.slug}`} className="hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-none">
                  {subject.name}
                </Link>
              </>
            )}
            
            {topic && (
              <>
                <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                <Link href={`/subjects/${area?.slug}/${subject?.slug}/${topic.slug}`} className="hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-none">
                  {topic.name}
                </Link>
              </>
            )}
          </nav>

          {/* Header Metadata */}
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

          {/* Article Renderer */}
          <ArticleRenderer content={note.content} />
          
          {/* Related/Bottom Meta could go here */}
        </main>

        {/* Right TOC Navigation (Desktop) */}
        {headings.length > 0 && (
          <aside className="hidden xl:block w-56 shrink-0 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pl-4">
            <TableOfContents items={headings} />
          </aside>
        )}
      </div>
    </div>
  );
}
