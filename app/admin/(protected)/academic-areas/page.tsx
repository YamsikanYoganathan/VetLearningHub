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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Academic Areas</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Top-level veterinary disciplines (e.g. Clinical Sciences, Paraclinical Studies).
          </p>
        </div>

        <Button asChild size="sm" className="rounded-xl">
          <Link href="/admin/academic-areas/new">
            <Plus className="w-3.5 h-3.5" />
            <span>New Academic Area</span>
          </Link>
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-border/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-subtle/80 border-b border-border/80 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-bold">Area Name</th>
              <th className="px-6 py-4 font-bold">Slug Identifier</th>
              <th className="px-6 py-4 font-bold">Sort Index</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/80">
            {areas?.map((area) => (
              <tr key={area.id} className="hover:bg-surface-subtle/60 transition-colors">
                <td className="px-6 py-4 font-semibold text-foreground">
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-primary shrink-0" />
                    <span>{area.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                  {area.slug}
                </td>
                <td className="px-6 py-4 text-muted-foreground text-xs font-medium">
                  {area.sort_order || 0}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/academic-areas/${area.id}/edit`}
                    className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-surface-subtle inline-flex items-center transition-colors"
                    title="Edit Area"
                  >
                    <PenLine className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
            {(!areas || areas.length === 0) && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground text-xs">
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
            className="bg-white p-4.5 rounded-2xl border border-border/80 shadow-2xs space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary shrink-0" />
                <span className="font-bold text-sm text-foreground">{area.name}</span>
              </div>
              <Link
                href={`/admin/academic-areas/${area.id}/edit`}
                className="p-1 text-primary hover:underline text-xs font-semibold"
              >
                Edit
              </Link>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/80">
              <span className="font-mono text-[11px]">{area.slug}</span>
              <span>Sort: {area.sort_order || 0}</span>
            </div>
          </div>
        ))}
        {(!areas || areas.length === 0) && (
          <div className="p-8 text-center bg-white border border-border rounded-2xl text-muted-foreground text-xs">
            No academic areas found.
          </div>
        )}
      </div>
    </div>
  );
}
