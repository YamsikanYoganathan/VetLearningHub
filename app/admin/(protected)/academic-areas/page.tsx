import React from "react";
import Link from "next/link";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/rbac";

export default async function AcademicAreasPage() {
  await requireAdmin();
  const supabase = await createClient();

  const { data: areas } = await supabase
    .from("academic_areas")
    .select("*")
    .order("sort_order");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Academic Areas</h1>
        <Link
          href="/admin/academic-areas/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Area</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">Name</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Slug</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Sort Order</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {areas?.map((area) => (
                <tr key={area.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{area.name}</td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{area.slug}</td>
                  <td className="px-6 py-4 text-slate-500">{area.sort_order || 0}</td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/academic-areas/${area.id}/edit`}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-sky-600 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {(!areas || areas.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No academic areas found.
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
