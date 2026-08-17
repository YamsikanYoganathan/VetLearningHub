import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Layers, ChevronRight } from "lucide-react";
import { getAcademicAreas } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata = {
  title: "Academic Directory | Vetulan Service",
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
        items={[{ label: "Academic Directory", isCurrent: true }]}
        className="mb-8"
      />

      {/* Editorial Header */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold tracking-tight mb-4">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          <span>Curriculum Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          Academic Disciplines & Subjects
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          The complete syllabus of veterinary medicine, organized hierarchically from broad foundational areas down to specialized courses and topic modules.
        </p>
      </div>

      {/* Areas Section List */}
      <div className="space-y-12">
        {areas && areas.length > 0 ? (
          areas.map((area, idx) => {
            const areaSubjects =
              subjects?.filter((s) => s.area_id === area.id) || [];
            const indexStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <section
                key={area.id}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
              >
                {/* Area Header Bar */}
                <div className="p-6 sm:p-7 bg-slate-50/70 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-base font-bold text-slate-400 mt-0.5">
                      {indexStr}
                    </span>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                        <Link
                          href={`/subjects/${area.slug}`}
                          className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                        >
                          {area.name}
                        </Link>
                      </h2>
                      {area.description && (
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed max-w-2xl">
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
                          className="group flex items-start justify-between gap-3 p-4 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <div className="min-w-0">
                            <h3 className="font-semibold text-sm text-slate-900 group-hover:text-primary transition-colors truncate">
                              {subject.name}
                            </h3>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {subject.description || "View topics & reference notes"}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-500 italic py-2">
                      No published subjects in this discipline yet.
                    </p>
                  )}
                </div>
              </section>
            );
          })
        ) : (
          <div className="text-center py-16 border border-slate-200 border-dashed rounded-xl bg-slate-50 text-slate-500 text-sm">
            Academic directory is currently being updated.
          </div>
        )}
      </div>
    </div>
  );
}
