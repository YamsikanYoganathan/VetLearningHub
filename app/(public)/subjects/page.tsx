import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import { getAcademicAreas } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata = {
  title: "Syllabus Directory | Vetulan Service",
  description:
    "Browse all veterinary academic disciplines, subjects, and study modules.",
};

export default async function SubjectsDirectoryPage() {
  const areas = await getAcademicAreas();
  const supabase = await createClient();

  // Fetch all active subjects to group under their respective areas
  const { data: subjects } = await supabase
    .from("subjects")
    .select("id, name, slug, description, area_id, sort_order")
    .eq("is_active", true)
    .order("sort_order");

  return (
    <div className="container-page py-10 sm:py-14">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[{ label: "Syllabus Directory", isCurrent: true }]}
        className="mb-8"
      />

      {/* Editorial Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-subtle text-primary border border-primary/20 text-xs font-bold tracking-tight mb-4 shadow-2xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>CURRICULUM DIRECTORY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          Academic Disciplines & Subjects
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
          The complete syllabus of veterinary medicine, organized hierarchically from broad foundational disciplines down to specialized courses and clinical topic modules.
        </p>
      </div>

      {/* Areas Section List */}
      <div className="space-y-8">
        {areas && areas.length > 0 ? (
          areas.map((area, idx) => {
            const areaSubjects =
              subjects?.filter((s) => s.area_id === area.id) || [];
            const indexStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <section
                key={area.id}
                className="border border-border/80 rounded-2xl overflow-hidden bg-white shadow-2xs"
              >
                {/* Area Header Bar */}
                <div className="p-6 sm:p-7 bg-surface-subtle/70 border-b border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-base font-bold text-primary mt-0.5">
                      {indexStr}
                    </span>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                        <Link
                          href={`/subjects/${area.slug}`}
                          className="hover:text-primary transition-colors focus-ring rounded"
                        >
                          {area.name}
                        </Link>
                      </h2>
                      {area.description && (
                        <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed max-w-2xl">
                          {area.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/subjects/${area.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4 shrink-0 transition-colors self-start sm:self-auto"
                  >
                    <span>
                      {areaSubjects.length}{" "}
                      {areaSubjects.length === 1 ? "subject" : "subjects"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Subjects Grid */}
                <div className="p-6 sm:p-7">
                  {areaSubjects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {areaSubjects.map((subject) => (
                        <Link
                          key={subject.id}
                          href={`/subjects/${area.slug}/${subject.slug}`}
                          className="group flex items-start justify-between gap-3 p-4 rounded-xl border border-border/80 bg-white hover:border-sky-300 hover:shadow-xs transition-all duration-150 focus-ring"
                        >
                          <div className="min-w-0">
                            <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                              {subject.name}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {subject.description || "View topics & reference notes"}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-muted-foreground italic py-2">
                      No published subjects in this discipline yet.
                    </p>
                  )}
                </div>
              </section>
            );
          })
        ) : (
          <div className="text-center py-16 border border-border border-dashed rounded-2xl bg-white text-muted-foreground text-sm">
            Academic directory is currently being updated.
          </div>
        )}
      </div>
    </div>
  );
}
