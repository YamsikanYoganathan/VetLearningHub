import React from "react";
import Link from "next/link";
import { Plus, PenLine, Layers } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireEditor } from "@/lib/supabase/rbac";
import { Button } from "@/components/ui/button";

export default async function AcademicAreasPage() {
  await requireEditor();
  const supabase = await createClient();

  const { data: areas } = await supabase
    .from("academic_areas")
    .select("*")
    .order("sort_order");

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Areas</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Top-level veterinary disciplines (e.g. Clinical Sciences, Paraclinical Studies).
          </p>
        </div>

        <Button asChild size="sm">
          <Link href="/admin/academic-areas/new">
            <Plus className="w-3.5 h-3.5" />
            <span>New Academic Area</span>
          </Link>
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Area Name</th>
              <th className="px-5 py-3 font-semibold">Slug Identifier</th>
              <th className="px-5 py-3 font-semibold">Sort Index</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {areas?.map((area) => (
              <tr key={area.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="px-5 py-3.5 font-medium text-slate-900">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{area.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-500 font-mono text-xs">
                  {area.slug}
                </td>
                <td className="px-5 py-3.5 text-slate-500 text-xs">
                  {area.sort_order || 0}
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link
                    href={`/admin/academic-areas/${area.id}/edit`}
                    className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 inline-flex items-center transition-colors"
                    title="Edit Area"
                  >
                    <PenLine className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {(!areas || areas.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-500 text-xs">
                  No academic areas found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card List View */}
      <div className="md:hidden space-y-3">
        {areas?.map((area) => (
          <div
            key={area.id}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-semibold text-sm text-slate-900">{area.name}</span>
              </div>
              <Link
                href={`/admin/academic-areas/${area.id}/edit`}
                className="p-1 text-slate-600 hover:text-slate-900 text-xs font-semibold"
              >
                Edit
              </Link>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="font-mono text-[11px] text-slate-400">{area.slug}</span>
              <span>Sort: {area.sort_order || 0}</span>
            </div>
          </div>
        ))}
        {(!areas || areas.length === 0) && (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-slate-500 text-xs">
            No academic areas found.
          </div>
        )}
      </div>
    </div>
  );
}
