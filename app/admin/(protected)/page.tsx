import React from "react";
import Link from "next/link";
import { BookOpen, FileText, CheckCircle2, Clock, Layers, ArrowRight, Tags } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  // Fetch counts
  const [{ count: areasCount }, { count: subjectsCount }, { count: topicsCount }, { count: notesCount }] = await Promise.all([
    supabase.from("academic_areas").select("*", { count: "exact", head: true }),
    supabase.from("subjects").select("*", { count: "exact", head: true }),
    supabase.from("topics").select("*", { count: "exact", head: true }),
    supabase.from("notes").select("*", { count: "exact", head: true })
  ]);

  const { count: publishedNotesCount } = await supabase.from("notes").select("*", { count: "exact", head: true }).eq("status", "published");
  const { count: draftNotesCount } = await supabase.from("notes").select("*", { count: "exact", head: true }).eq("status", "draft");

  // Fetch recent notes
  const { data: recentNotes } = await supabase
    .from("notes")
    .select("id, title, status, updated_at, slug")
    .order("updated_at", { ascending: false })
    .limit(5);

  return (
    <div className="space-y-8 max-w-6xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Clinical Knowledge Overview
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage veterinary disciplines and publish clinical reference notes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase">Areas</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{areasCount || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
            <Layers className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase">Subjects</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{subjectsCount || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase">Topics</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{topicsCount || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
            <Tags className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase">Total Notes</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{notesCount || 0}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                Recently Updated Protocols
              </h2>
              <Link href="/admin/notes" className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
            <div className="divide-y divide-slate-100">
              {recentNotes && recentNotes.length > 0 ? (
                recentNotes.map((note) => (
                  <Link href={`/admin/notes/${note.id}/edit`} key={note.id} className="block hover:bg-slate-50 transition-colors p-4 sm:px-6 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{note.title}</p>
                      <p className="text-xs text-slate-500 mt-1">Updated {new Date(note.updated_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                      note.status === 'published' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' :
                      note.status === 'draft' ? 'bg-amber-50 text-amber-700 border-amber-200/60' :
                      'bg-slate-100 text-slate-600 border-slate-200'
                    }`}>
                      {note.status === 'published' && <CheckCircle2 className="w-3 h-3" />}
                      {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="p-8 text-center text-slate-500 text-sm">No notes found.</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-900 mb-4">Note Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-slate-700">Published</span>
                  <span className="font-bold text-slate-900">{publishedNotesCount || 0}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${Math.min(100, ((publishedNotesCount || 0) / (notesCount || 1)) * 100)}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-slate-700">Drafts</span>
                  <span className="font-bold text-slate-900">{draftNotesCount || 0}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${Math.min(100, ((draftNotesCount || 0) / (notesCount || 1)) * 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
