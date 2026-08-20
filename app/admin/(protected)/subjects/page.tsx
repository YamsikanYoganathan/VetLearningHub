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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Subjects</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Core veterinary subjects grouped under parent academic areas.
          </p>
        </div>

        <Button asChild size="sm" className="rounded-xl">
          <Link href="/admin/subjects/new">
            <Plus className="w-3.5 h-3.5" />
            <span>New Subject</span>
          </Link>
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-border/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-subtle/80 border-b border-border/80 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-bold">Academic Area</th>
              <th className="px-6 py-4 font-bold">Subject Name</th>
              <th className="px-6 py-4 font-bold">Slug Identifier</th>
              <th className="px-6 py-4 font-bold">Order</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/80">
            {subjects?.map((subject) => {
              const area = Array.isArray(subject.academic_areas)
                ? subject.academic_areas[0]
                : (subject.academic_areas as any);

              return (
                <tr key={subject.id} className="hover:bg-surface-subtle/60 transition-colors">
                  <td className="px-6 py-4 text-xs text-text-secondary">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-surface-subtle border border-border/80 font-semibold text-foreground">
                      {area?.name || "Area"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-foreground">
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-secondary shrink-0" />
                      <span>{subject.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                    {subject.slug}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground text-xs font-medium">
                    {subject.sort_order || 0}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/subjects/${subject.id}/edit`}
                      className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-surface-subtle inline-flex items-center transition-colors"
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
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground text-xs">
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
              className="bg-white p-4.5 rounded-2xl border border-border/80 shadow-2xs space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">
                    {area?.name || "Academic Area"}
                  </span>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-secondary shrink-0" />
                    <span className="font-bold text-sm text-foreground">{subject.name}</span>
                  </div>
                </div>
                <Link
                  href={`/admin/subjects/${subject.id}/edit`}
                  className="p-1 text-primary hover:underline text-xs font-semibold"
                >
                  Edit
                </Link>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/80">
                <span className="font-mono text-[11px]">{subject.slug}</span>
                <span>Sort: {subject.sort_order || 0}</span>
              </div>
            </div>
          );
        })}
        {(!subjects || subjects.length === 0) && (
          <div className="p-8 text-center bg-white border border-border rounded-2xl text-muted-foreground text-xs">
            No subjects found.
          </div>
        )}
      </div>
    </div>
  );
}
