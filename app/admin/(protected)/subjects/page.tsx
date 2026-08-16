import React from "react";
import Link from "next/link";
import { PlusCircle, Edit } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/rbac";

export default async function SubjectsPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: subjects } = await supabase
    .from("subjects")
    .select("*, academic_areas(name)")
    .order("area_id")
    .order("sort_order");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Subjects</h1>
        <Link
          href="/admin/subjects/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Subject</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">Area</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Subject Name</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Slug</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Order</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {subjects?.map((subject) => {
                const area = Array.isArray(subject.academic_areas) ? subject.academic_areas[0] : subject.academic_areas as any;
                return (
                  <tr key={subject.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-xs">
                        {area?.name || "Unknown Area"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{subject.name}</td>
                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">{subject.slug}</td>
                    <td className="px-6 py-4 text-slate-500">{subject.sort_order || 0}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/subjects/${subject.id}/edit`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-sky-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {(!subjects || subjects.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No subjects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
