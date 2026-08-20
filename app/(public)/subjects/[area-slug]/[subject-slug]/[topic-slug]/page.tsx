import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hash, FileText } from "lucide-react";
import { getTopicBySlug, getPublishedNotesByTopic } from "@/lib/supabase/queries";
import { NoteRow } from "@/components/ui/NoteRow";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    "area-slug": string;
    "subject-slug": string;
    "topic-slug": string;
  }>;
}): Promise<Metadata> {
  const p = await params;
  const topic = await getTopicBySlug(p["topic-slug"]);

  if (!topic) return { title: "Topic Not Found | Vetulan Service" };

  return {
    title: `${topic.name} | Vetulan Service`,
    description:
      topic.description ||
      `Read clinical protocols and reference notes for ${topic.name}`,
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{
    "area-slug": string;
    "subject-slug": string;
    "topic-slug": string;
  }>;
}) {
  const p = await params;
  const topic = await getTopicBySlug(p["topic-slug"]);

  if (!topic) {
    notFound();
  }

  const subject = Array.isArray(topic.subjects)
    ? topic.subjects[0]
    : (topic.subjects as any);

  if (!subject || subject.slug !== p["subject-slug"]) {
    notFound();
  }

  const area = Array.isArray(subject.academic_areas)
    ? subject.academic_areas[0]
    : (subject.academic_areas as any);

  if (!area || area.slug !== p["area-slug"]) {
    notFound();
  }

  const notes = await getPublishedNotesByTopic(topic.id);

  return (
    <div className="container-page py-10 sm:py-14">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Syllabus Directory", href: "/subjects" },
          { label: area.name, href: `/subjects/${area.slug}` },
          {
            label: subject.name,
            href: `/subjects/${area.slug}/${subject.slug}`,
          },
          { label: topic.name, isCurrent: true },
        ]}
        className="mb-8"
      />

      {/* Editorial Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-subtle text-secondary border border-secondary/20 text-xs font-semibold tracking-tight mb-4 shadow-2xs">
          <Hash className="w-3.5 h-3.5" />
          <span>Topic Study Module</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
          {topic.name}
        </h1>
        {topic.description && (
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            {topic.description}
          </p>
        )}
      </div>

      {/* Notes List */}
      <section>
        <div className="flex items-center justify-between border-b border-border pb-3 mb-6">
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Reference Notes & Clinical Protocols
          </h2>
          <span className="text-xs font-semibold text-text-secondary bg-surface-subtle px-2.5 py-1 rounded-md border border-border">
            {notes.length} {notes.length === 1 ? "Note" : "Notes"}
          </span>
        </div>

        {notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <NoteRow
                key={note.id}
                title={note.title}
                snippet={
                  note.short_description ||
                  "Clinical reference and diagnostic protocols."
                }
                subSection={topic.name}
                subjectSlug={subject.slug}
                slug={note.slug}
                readingTime={note.reading_time || 5}
                status="published"
                date={new Date(
                  note.published_at || note.updated_at
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-border border-dashed rounded-2xl bg-surface-subtle text-muted-foreground text-sm">
            <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium text-foreground">
              No published notes in this topic yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Check back soon for updated clinical protocols.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
