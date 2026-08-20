import React from "react";
import Link from "next/link";
import { BookOpen, FileText, CheckCircle2, Clock, Layers, ArrowRight, Tags, Plus, PenLine, Paperclip } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function getDynamicGreeting(): string {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Colombo",
    hour: "numeric",
    hour12: false,
  });
  const hour = parseInt(formatter.format(new Date()), 10);

  if (hour >= 5 && hour < 12) {
    return "Good morning, welcome back.";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon, welcome back.";
  } else {
    return "Good evening, welcome back.";
  }
}

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const greeting = getDynamicGreeting();

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {greeting}
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage your veterinary knowledge base, curriculum structure, and clinical notes.
          </p>
        </div>

        <div id="cms-tour-create-note" className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-xl">
            <Link href="/admin/notes/new">
              <Plus className="w-3.5 h-3.5" />
              <span>Create Note</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div id="cms-tour-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-border/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Academic Areas</p>
            <p className="text-2xl font-extrabold text-foreground mt-1">{areasCount || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary-subtle text-primary flex items-center justify-center border border-primary/20 shadow-2xs">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Subjects</p>
            <p className="text-2xl font-extrabold text-foreground mt-1">{subjectsCount || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-secondary-subtle text-secondary flex items-center justify-center border border-secondary/20 shadow-2xs">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Topics</p>
            <p className="text-2xl font-extrabold text-foreground mt-1">{topicsCount || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-surface-subtle text-text-secondary flex items-center justify-center border border-border shadow-2xs">
            <Tags className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Total Notes</p>
            <p className="text-2xl font-extrabold text-foreground mt-1">{notesCount || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200 shadow-2xs">
            <FileText className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Notes & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recently Updated Notes Table */}
        <div id="cms-tour-notes" className="lg:col-span-8 bg-white rounded-2xl border border-border/80 shadow-2xs overflow-hidden">
          <div className="px-6 py-4.5 border-b border-border/80 flex items-center justify-between bg-surface-subtle/50">
            <div className="flex items-center gap-2 font-bold text-sm text-foreground">
              <Clock className="w-4 h-4 text-primary" />
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

          <div className="divide-y divide-border/80">
            {recentNotes && recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-surface-subtle/40 transition-colors"
                >
                  <div className="min-w-0 pr-4">
                    <Link
                      href={`/admin/notes/${note.id}/edit`}
                      className="font-bold text-xs sm:text-sm text-foreground hover:text-primary transition-colors block truncate"
                    >
                      {note.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-muted-foreground font-medium">
                      <span>
                        Updated{" "}
                        {new Date(note.updated_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                        note.status === "published"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {note.status}
                    </span>
                    <Link
                      href={`/admin/notes/${note.id}/edit`}
                      className="p-1.5 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-subtle transition-colors"
                      title="Edit note"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-muted-foreground">
                No recent notes found.
              </div>
            )}
          </div>
        </div>

        {/* Status Distribution & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Note Status Breakdown */}
          <div className="bg-white rounded-2xl border border-border/80 shadow-2xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-foreground">
              Publication Status
            </h2>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-text-secondary">Published</span>
                  <span className="font-bold text-foreground">{publishedNotesCount || 0}</span>
                </div>
                <div className="w-full bg-surface-subtle rounded-full h-2 overflow-hidden border border-border/40">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, ((publishedNotesCount || 0) / (notesCount || 1)) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-text-secondary">Drafts</span>
                  <span className="font-bold text-foreground">{draftNotesCount || 0}</span>
                </div>
                <div className="w-full bg-surface-subtle rounded-full h-2 overflow-hidden border border-border/40">
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
          <div className="bg-white rounded-2xl border border-border/80 shadow-2xs p-6">
            <h2 className="text-sm font-bold text-foreground mb-3.5">
              Quick Management
            </h2>

            <div className="space-y-2">
              <Link
                id="cms-tour-areas"
                href="/admin/academic-areas"
                className="flex items-center justify-between p-3 rounded-xl text-xs font-semibold text-text-secondary hover:bg-surface-subtle border border-border/80 hover:border-sky-300 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-primary" />
                  <span>Academic Areas</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>

              <Link
                id="cms-tour-subjects"
                href="/admin/subjects"
                className="flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-text-secondary hover:bg-surface-subtle border border-border/80 hover:border-teal-300 transition-all"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-secondary" />
                  <span>Subjects</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>

              <Link
                href="/admin/topics"
                className="flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-text-secondary hover:bg-surface-subtle border border-border/80 hover:border-sky-300 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Tags className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Topics</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>

              <Link
                id="cms-tour-attachments"
                href="/admin/notes"
                className="flex items-center justify-between p-3 rounded-2xl text-xs font-semibold text-text-secondary hover:bg-surface-subtle border border-border/80 hover:border-sky-300 transition-all"
              >
                <span className="flex items-center gap-2">
                  <Paperclip className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Media & Attachments</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
