import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Layers, Hash, FileText, ArrowRight } from "lucide-react";
import { getSubjectBySlug, getTopicsBySubject } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { NoteRow } from "@/components/ui/NoteRow";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "area-slug": string; "subject-slug": string }>;
}): Promise<Metadata> {
  const p = await params;
  const subject = await getSubjectBySlug(p["subject-slug"]);

  if (!subject) return { title: "Subject Not Found | Vetulan Service" };

  return {
    title: `${subject.name} | Vetulan Service`,
    description:
      subject.description ||
      `Explore clinical topics and notes for ${subject.name}`,
  };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ "area-slug": string; "subject-slug": string }>;
}) {
  const p = await params;
  const subject = await getSubjectBySlug(p["subject-slug"]);

  if (!subject) {
    notFound();
  }

  const area = Array.isArray(subject.academic_areas)
    ? subject.academic_areas[0]
    : (subject.academic_areas as any);

  if (!area || area.slug !== p["area-slug"]) {
    notFound();
  }

  const topics = await getTopicsBySubject(subject.id);

  // Fetch all published notes for these topics to display them grouped under topics
  const supabase = await createClient();
  const { data: notes } = await supabase
    .from("notes")
    .select(
      "id, title, slug, short_description, status, reading_time, published_at, updated_at, topic_id"
    )
    .eq("status", "published")
    .in(
      "topic_id",
      topics.length > 0
        ? topics.map((t) => t.id)
        : ["00000000-0000-0000-0000-000000000000"]
    )
    .order("sort_order");

  return (
    <div className="container-page py-10 sm:py-14">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Academic Directory", href: "/subjects" },
          { label: area.name, href: `/subjects/${area.slug}` },
          { label: subject.name, isCurrent: true },
        ]}
        className="mb-8"
      />

      {/* Editorial Subject Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-100 text-xs font-semibold tracking-tight mb-4">
          <Layers className="w-3.5 h-3.5 text-teal-600" />
          <span>Curriculum Subject</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          {subject.name}
        </h1>
        {subject.description && (
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {subject.description}
          </p>
        )}
      </div>

      {/* Content grouped by Topic */}
      <div className="space-y-12">
        {topics && topics.length > 0 ? (
          topics.map((topic, idx) => {
            const topicNotes =
              notes?.filter((n) => n.topic_id === topic.id) || [];
            const indexStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <section key={topic.id} className="scroll-mt-24" id={topic.slug}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 mb-6 gap-2">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-slate-400 mt-1">
                      {indexStr}
                    </span>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                        <Link
                          href={`/subjects/${area.slug}/${subject.slug}/${topic.slug}`}
                          className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                        >
                          {topic.name}
                        </Link>
                      </h2>
                      {topic.description && (
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                          {topic.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/subjects/${area.slug}/${subject.slug}/${topic.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4 shrink-0 self-start sm:self-auto"
                  >
                    <span>
                      {topicNotes.length}{" "}
                      {topicNotes.length === 1 ? "note" : "notes"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {topicNotes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topicNotes.map((note) => (
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
                        status={note.status as any}
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
                  <div className="py-8 text-center bg-slate-50 border border-slate-200 border-dashed rounded-xl text-slate-500 text-xs">
                    No published notes in this topic module yet.
                  </div>
                )}
              </section>
            );
          })
        ) : (
          <div className="text-center py-16 border border-slate-200 border-dashed rounded-xl bg-slate-50 text-slate-500 text-sm">
            <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="font-medium text-slate-700">
              No active topics found for this subject
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Clinical topics and study notes will appear here once published.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
