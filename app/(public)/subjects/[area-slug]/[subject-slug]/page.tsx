import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home, Layers, Hash } from "lucide-react";
import { getSubjectBySlug, getTopicsBySubject } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { NoteRow } from "@/components/ui/NoteRow";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ "area-slug": string; "subject-slug": string }> }): Promise<Metadata> {
  const p = await params;
  const subject = await getSubjectBySlug(p["subject-slug"]);
  
  if (!subject) return { title: "Not Found" };
  
  return {
    title: `${subject.name} | Vetulan Service`,
    description: subject.description || `Explore topics and notes for ${subject.name}`,
  };
}

export default async function SubjectPage({ params }: { params: Promise<{ "area-slug": string; "subject-slug": string }> }) {
  const p = await params;
  const subject = await getSubjectBySlug(p["subject-slug"]);
  
  if (!subject) {
    notFound();
  }

  const area = Array.isArray(subject.academic_areas) ? subject.academic_areas[0] : subject.academic_areas as any;
  if (!area || area.slug !== p["area-slug"]) {
    notFound();
  }

  const topics = await getTopicsBySubject(subject.id);
  
  // Fetch all published notes for these topics to display them grouped
  const supabase = await createClient();
  const { data: notes } = await supabase
    .from("notes")
    .select("id, title, slug, short_description, status, published_at, updated_at, topic_id")
    .eq("status", "published")
    .in("topic_id", topics.length > 0 ? topics.map(t => t.id) : ['00000000-0000-0000-0000-000000000000'])
    .order("sort_order");



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
        <span className="font-medium text-foreground">{subject.name}</span>
      </nav>

      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-tight mb-6">
          <Layers className="w-4 h-4" />
          <span>Subject</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
          {subject.name}
        </h1>
        {subject.description && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {subject.description}
          </p>
        )}
      </div>

      {/* Content grouped by Topic */}
      <div className="space-y-12">
        {topics.map((topic) => {
          const topicNotes = notes?.filter(n => n.topic_id === topic.id) || [];
          
          return (
            <div key={topic.id} className="scroll-mt-24" id={topic.slug}>
              <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-secondary text-secondary-foreground rounded-md">
                    <Hash className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">
                      <Link href={`/subjects/${area.slug}/${subject.slug}/${topic.slug}`} className="hover:text-primary transition-colors">
                        {topic.name}
                      </Link>
                    </h2>
                    {topic.description && (
                      <p className="text-sm text-muted-foreground mt-0.5">{topic.description}</p>
                    )}
                  </div>
                </div>
                <Badge variant={topicNotes.length > 0 ? "default" : "secondary"}>
                  {topicNotes.length} {topicNotes.length === 1 ? 'Note' : 'Notes'}
                </Badge>
              </div>

              {topicNotes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {topicNotes.map(note => (
                    <NoteRow
                      key={note.id}
                      title={note.title}
                      snippet={note.short_description || ""}
                      subSection={topic.name}
                      subjectSlug={subject.slug}
                      slug={note.slug}
                      status={note.status as "draft" | "published"}
                      date={new Date(note.published_at || note.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center bg-surface/30 border border-border-subtle border-dashed rounded-xl">
                  <p className="text-sm text-muted-foreground italic">No published notes in this topic yet.</p>
                </div>
              )}
            </div>
          );
        })}
        
        {topics.length === 0 && (
          <div className="text-center py-16 border border-border-subtle border-dashed rounded-xl bg-surface/50">
            <Layers className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No topics yet</h3>
            <p className="text-sm text-muted-foreground">Topics and notes for this subject will appear here once published.</p>
          </div>
        )}
      </div>
    </div>
  );
}
