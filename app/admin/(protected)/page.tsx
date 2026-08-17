import React from "react";
import Link from "next/link";
import { BookOpen, FileText, CheckCircle2, Clock, Layers, ArrowRight, Tags, Plus, PenLine } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  // Fetch real counts from Supabase
  const [
    { count: areasCount },
    { count: subjectsCount },
    { count: topicsCount },
    { count: notesCount },
  ] = await Promise.all([
    supabase.from("academic_areas").select("*", { count: "exact", head: true }),
    supabase.from("subjects").select("*", { count: "exact", head: true }),
    supabase.from("topics").select("*", { count: "exact", head: true }),
    supabase.from("notes").select("*", { count: "exact", head: true }),
  ]);

  const { count: publishedNotesCount } = await supabase
    .from("notes")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  const { count: draftNotesCount } = await supabase
    .from("notes")
    .select("*", { count: "exact", head: true })
    .eq("status", "draft");

  // Fetch recently updated notes
  const { data: recentNotes } = await supabase
    .from("notes")
    .select("id, title, status, updated_at, slug")
    .order("updated_at", { ascending: false })
    .limit(6);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Good morning.
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage your veterinary knowledge base, curriculum structure, and clinical notes.
          </p>
        </div>

        <div id="cms-tour-create-note" className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href="/admin/notes/new">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Note</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div id="cms-tour-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Academic Areas</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{areasCount || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-100">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subjects</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{subjectsCount || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Topics</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{topicsCount || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200">
            <Tags className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Notes</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{notesCount || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Notes & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recently Updated Notes Table */}
        <div id="cms-tour-notes" className="lg:col-span-8 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <Clock className="w-4 h-4 text-sky-600" />
              <span>Recently Updated Notes</span>
            </div>
            <Link
              href="/admin/notes"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View all notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {recentNotes && recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 hover:bg-slate-50/80 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/admin/notes/${note.id}/edit`}
                      className="font-medium text-sm text-slate-900 hover:text-primary transition-colors block truncate"
                    >
                      {note.title}
                    </Link>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Updated {new Date(note.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge
                      variant={
                        note.status === "published"
                          ? "success"
                          : note.status === "draft"
                          ? "warning"
                          : "default"
                      }
                    >
                      {note.status === "published" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {note.status.charAt(0).toUpperCase() + note.status.slice(1)}
                    </Badge>

                    <Link
                      href={`/admin/notes/${note.id}/edit`}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                      title="Edit note"
                    >
                      <PenLine className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs">
                No notes created yet.
              </div>
            )}
          </div>
        </div>

        {/* Status Distribution & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Note Status Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900">
              Publication Status
            </h2>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">Published</span>
                  <span className="font-bold text-slate-900">{publishedNotesCount || 0}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, ((publishedNotesCount || 0) / (notesCount || 1)) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">Drafts</span>
                  <span className="font-bold text-slate-900">{draftNotesCount || 0}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, ((draftNotesCount || 0) / (notesCount || 1)) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Management Links */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3">
              Quick Management
            </h2>

            <div className="space-y-2">
              <Link
                id="cms-tour-areas"
                href="/admin/academic-areas"
                className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  <span>Academic Areas</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                id="cms-tour-subjects"
                href="/admin/subjects"
                className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>Subjects</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/admin/topics"
                className="flex items-center justify-between p-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Tags className="w-3.5 h-3.5 text-slate-600" />
                  <span>Topics</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
