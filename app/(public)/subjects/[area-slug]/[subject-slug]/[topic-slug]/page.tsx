import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home, Hash, FileText } from "lucide-react";
import { getTopicBySlug, getPublishedNotesByTopic } from "@/lib/supabase/queries";
import { NoteRow } from "@/components/ui/NoteRow";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ "area-slug": string; "subject-slug": string; "topic-slug": string }> }): Promise<Metadata> {
  const p = await params;
  const topic = await getTopicBySlug(p["topic-slug"]);
  
  if (!topic) return { title: "Not Found" };
  
  return {
    title: `${topic.name} | Vetulan Service`,
    description: topic.description || `Read protocols and notes about ${topic.name}`,
  };
}

export default async function TopicPage({ params }: { params: Promise<{ "area-slug": string; "subject-slug": string; "topic-slug": string }> }) {
  const p = await params;
  const topic = await getTopicBySlug(p["topic-slug"]);
  
  if (!topic) {
    notFound();
  }

  const subject = Array.isArray(topic.subjects) ? topic.subjects[0] : topic.subjects as any;
  if (!subject || subject.slug !== p["subject-slug"]) {
    notFound();
  }

  const area = Array.isArray(subject.academic_areas) ? subject.academic_areas[0] : subject.academic_areas as any;
  if (!area || area.slug !== p["area-slug"]) {
    notFound();
  }

  const notes = await getPublishedNotesByTopic(topic.id);

  return (
    <div className="container-page py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Home className="w-4 h-4" />
          <span className="sr-only">Home</span>
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/subjects" className="hover:text-primary transition-colors">
          Directory
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/subjects/${area.slug}`} className="hover:text-primary transition-colors">
          {area.name}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/subjects/${area.slug}/${subject.slug}`} className="hover:text-primary transition-colors">
          {subject.name}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="font-medium text-foreground">{topic.name}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold uppercase tracking-tight mb-6">
          <Hash className="w-4 h-4" />
          <span>Topic</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
          {topic.name}
        </h1>
        {topic.description && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {topic.description}
          </p>
        )}
      </div>

      {/* Notes List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Protocols & Notes</h2>
          <span className="text-sm font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
          </span>
        </div>
        
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {notes.map(note => (
              <NoteRow
                key={note.id}
                title={note.title}
                snippet={note.short_description || ""}
                subSection={topic.name}
                subjectSlug={subject.slug}
                slug={note.slug}
                status="published"
                date={new Date(note.published_at || note.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-border-subtle border-dashed rounded-xl bg-surface/50">
            <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No notes yet</h3>
            <p className="text-sm text-muted-foreground">Protocols for this topic will appear here once published.</p>
          </div>
        )}
      </div>
    </div>
  );
}
