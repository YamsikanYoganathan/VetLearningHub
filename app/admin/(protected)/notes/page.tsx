import React from "react";
import Link from "next/link";
import { Plus, PenLine, ExternalLink, FileText, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireEditor } from "@/lib/supabase/rbac";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function NotesPage() {
  await requireEditor();
  const supabase = await createClient();

  const { data: notes } = await supabase
    .from("notes")
    .select("*, topics(name, subjects(name, academic_areas(name)))")
    .order("updated_at", { ascending: false });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge variant="success">Published</Badge>;
      case "in_review":
        return <Badge variant="primary">In Review</Badge>;
      case "archived":
        return <Badge variant="neutral">Archived</Badge>;
      case "draft":
      default:
        return <Badge variant="warning">Draft</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notes & Protocols</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage clinical study articles, surgical guides, and diagnostic reference protocols.
          </p>
        </div>

        <Button asChild size="sm">
          <Link href="/admin/notes/new">
            <Plus className="w-3.5 h-3.5" />
            <span>New Note</span>
          </Link>
        </Button>
      </div>

      {/* Desktop Table View (hidden on small mobile) */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Hierarchy Context</th>
              <th className="px-5 py-3 font-semibold">Title</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Last Modified</th>
              <th className="px-5 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {notes?.map((note) => {
              const topic = Array.isArray(note.topics) ? note.topics[0] : (note.topics as any);
              const subject = topic?.subjects
                ? Array.isArray(topic.subjects)
                  ? topic.subjects[0]
                  : topic.subjects
                : null;
              const area = subject?.academic_areas
                ? Array.isArray(subject.academic_areas)
                  ? subject.academic_areas[0]
                  : subject.academic_areas
                : null;

              return (
                <tr key={note.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 text-xs text-slate-500 max-w-[200px]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 truncate">
                        {area?.name || "Area"} / {subject?.name || "Subject"}
                      </span>
                      <span className="font-medium text-slate-700 truncate">
                        {topic?.name || "Topic"}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 font-medium text-slate-900 max-w-[280px]">
                    <Link
                      href={`/admin/notes/${note.id}/edit`}
                      className="hover:text-primary transition-colors block truncate"
                    >
                      {note.title}
                    </Link>
                  </td>

                  <td className="px-5 py-3.5">
                    {getStatusBadge(note.status)}
                  </td>

                  <td className="px-5 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                    {new Date(note.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>

                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      {note.status === "published" && (
                        <Link
                          href={`/notes/${note.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-md text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="View on public site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/notes/${note.id}/preview`}
                        className="p-1.5 rounded-md text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                        title="CMS Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/notes/${note.id}/edit`}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Edit note"
                      >
                        <PenLine className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}

            {(!notes || notes.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500 text-xs">
                  No reference notes created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View (optimized for small screens) */}
      <div className="md:hidden space-y-3">
        {notes?.map((note) => {
          const topic = Array.isArray(note.topics) ? note.topics[0] : (note.topics as any);

          return (
            <div
              key={note.id}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  {topic && (
                    <span className="text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100/80 mb-1 inline-block">
                      {topic.name}
                    </span>
                  )}
                  <h3 className="font-semibold text-sm text-slate-900 leading-snug">
                    {note.title}
                  </h3>
                </div>
                {getStatusBadge(note.status)}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
                <span>{new Date(note.updated_at).toLocaleDateString()}</span>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/notes/${note.id}/preview`}
                    className="p-1 text-sky-600 hover:underline text-xs font-semibold"
                  >
                    Preview
                  </Link>
                  <span className="text-slate-300">•</span>
                  <Link
                    href={`/admin/notes/${note.id}/edit`}
                    className="p-1 text-slate-700 hover:underline text-xs font-semibold"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {(!notes || notes.length === 0) && (
          <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-slate-500 text-xs">
            No notes found.
          </div>
        )}
      </div>
    </div>
  );
}
