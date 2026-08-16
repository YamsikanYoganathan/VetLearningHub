import React from "react";
import Link from "next/link";
import { PlusCircle, Edit, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { requireEditor } from "@/lib/supabase/rbac";

export default async function NotesPage() {
  await requireEditor();
  const supabase = await createClient();

  const { data: notes } = await supabase
    .from("notes")
    .select("*, topics(name, subjects(name, academic_areas(name)))")
    .order("updated_at", { ascending: false });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">Published</span>;
      case 'in_review': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">In Review</span>;
      case 'archived': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">Archived</span>;
      case 'draft': 
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">Draft</span>;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Notes</h1>
        <Link
          href="/admin/notes/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Note</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">Location</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Title</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Last Updated</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {notes?.map((note) => {
                const topic = Array.isArray(note.topics) ? note.topics[0] : note.topics as any;
                const subject = topic?.subjects ? (Array.isArray(topic.subjects) ? topic.subjects[0] : topic.subjects) : null;
                const area = subject?.academic_areas ? (Array.isArray(subject.academic_areas) ? subject.academic_areas[0] : subject.academic_areas) : null;
                
                return (
                  <tr key={note.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400">{area?.name || "?"} / {subject?.name || "?"}</span>
                        <span className="inline-flex items-center w-fit px-2 py-0.5 rounded bg-slate-100 text-xs text-slate-700">
                          {topic?.name || "Unknown Topic"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{note.title}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(note.status)}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(note.updated_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/notes/${note.id}/preview`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-emerald-600 transition-colors"
                        title="Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/notes/${note.id}/edit`}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-sky-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {(!notes || notes.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No notes found.
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
