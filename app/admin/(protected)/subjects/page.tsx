import React from "react";
import Link from "next/link";
import { Plus, PenLine, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireEditor } from "@/lib/supabase/rbac";
import { Button } from "@/components/ui/button";

export default async function SubjectsPage() {
  await requireEditor();
  const supabase = await createClient();

  const { data: subjects } = await supabase
    .from("subjects")
    .select("*, academic_areas(name)")
    .order("area_id")
    .order("sort_order");

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subjects</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Core veterinary subjects grouped under parent academic areas.
          </p>
        </div>

        <Button asChild size="sm">
          <Link href="/admin/subjects/new">
            <Plus className="w-3.5 h-3.5" />
            <span>New Subject</span>
          </Link>
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Academic Area</th>
              <th className="px-5 py-3 font-semibold">Subject Name</th>
              <th className="px-5 py-3 font-semibold">Slug Identifier</th>
              <th className="px-5 py-3 font-semibold">Order</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {subjects?.map((subject) => {
              const area = Array.isArray(subject.academic_areas)
                ? subject.academic_areas[0]
                : (subject.academic_areas as any);

              return (
                <tr key={subject.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 text-xs text-slate-600">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 font-medium">
                      {area?.name || "Area"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-900">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{subject.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 font-mono text-xs">
                    {subject.slug}
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs">
                    {subject.sort_order || 0}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/subjects/${subject.id}/edit`}
                      className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 inline-flex items-center transition-colors"
                      title="Edit Subject"
                    >
                      <PenLine className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
            {(!subjects || subjects.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-xs">
                  No subjects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card List View */}
      <div className="md:hidden space-y-3">
        {subjects?.map((subject) => {
          const area = Array.isArray(subject.academic_areas)
            ? subject.academic_areas[0]
            : (subject.academic_areas as any);

          return (
            <div
              key={subject.id}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
                    {area?.name || "Academic Area"}
                  </span>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-semibold text-sm text-slate-900">{subject.name}</span>
                  </div>
                </div>
                <Link
                  href={`/admin/subjects/${subject.id}/edit`}
                  className="p-1 text-slate-600 hover:text-slate-900 text-xs font-semibold"
                >
                  Edit
                </Link>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="font-mono text-[11px] text-slate-400">{subject.slug}</span>
                <span>Sort: {subject.sort_order || 0}</span>
              </div>
            </div>
          );
        })}
        {(!subjects || subjects.length === 0) && (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-slate-500 text-xs">
            No subjects found.
          </div>
        )}
      </div>
    </div>
  );
}
