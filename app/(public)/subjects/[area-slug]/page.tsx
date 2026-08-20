import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Layers, FolderOpen } from "lucide-react";
import { getAreaBySlug, getSubjectsByArea } from "@/lib/supabase/queries";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "area-slug": string }>;
}): Promise<Metadata> {
  const p = await params;
  const area = await getAreaBySlug(p["area-slug"]);

  if (!area) return { title: "Academic Area Not Found | Vetulan Service" };

  return {
    title: `${area.name} | Vetulan Service`,
    description:
      area.description || `Explore veterinary subjects within ${area.name}`,
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ "area-slug": string }>;
}) {
  const p = await params;
  const area = await getAreaBySlug(p["area-slug"]);

  if (!area) {
    notFound();
  }

  const subjects = await getSubjectsByArea(area.id);

  return (
    <div className="container-page py-10 sm:py-14">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Syllabus Directory", href: "/subjects" },
          { label: area.name, isCurrent: true },
        ]}
        className="mb-8"
      />

      {/* Editorial Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-subtle text-primary border border-primary/20 text-xs font-semibold tracking-tight mb-4 shadow-2xs">
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Academic Discipline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-4">
          {area.name}
        </h1>
        {area.description && (
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            {area.description}
          </p>
        )}
      </div>

      {/* Subjects Grid */}
      <section>
        <div className="flex items-center justify-between border-b border-border pb-3 mb-8">
          <h2 className="text-xl font-bold text-foreground tracking-tight">
            Curriculum Courses
          </h2>
          <span className="text-xs font-semibold text-text-secondary bg-surface-subtle px-2.5 py-1 rounded-md border border-border">
            {subjects.length} {subjects.length === 1 ? "Subject" : "Subjects"}
          </span>
        </div>

        {subjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, idx) => (
              <SubjectCard
                key={subject.id}
                title={subject.name}
                description={
                  subject.description ||
                  "Course modules, clinical topics, and diagnostic reference notes."
                }
                icon={subject.icon || "Layers"}
                href={`/subjects/${area.slug}/${subject.slug}`}
                indexNumber={idx + 1}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-border border-dashed rounded-2xl bg-surface-subtle text-muted-foreground text-sm">
            <Layers className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium text-foreground">No subjects currently active</p>
            <p className="text-xs text-muted-foreground mt-1">
              Subjects in this academic area will appear here once published.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
