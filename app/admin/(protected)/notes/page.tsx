import React from "react";
import Link from "next/link";
import { Plus, PenLine, ExternalLink } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Notes & Protocols</h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Manage clinical study articles, surgical guides, and diagnostic reference protocols.
          </p>
        </div>

        <Button asChild size="sm" className="rounded-xl">
          <Link href="/admin/notes/new">
            <Plus className="w-3.5 h-3.5" />
            <span>New Note</span>
          </Link>
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-border/80 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-subtle/80 border-b border-border/80 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-bold">Hierarchy Context</th>
              <th className="px-6 py-4 font-bold">Title</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Last Modified</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/80">
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
                <tr key={note.id} className="hover:bg-surface-subtle/60 transition-colors">
                  <td className="px-6 py-4 text-xs text-text-secondary max-w-[200px]">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground truncate">
                        {area?.name || "Area"} / {subject?.name || "Subject"}
                      </span>
                      <span className="font-semibold text-foreground truncate">
                        {topic?.name || "Topic"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 font-semibold text-foreground max-w-[280px]">
                    <Link
                      href={`/admin/notes/${note.id}/edit`}
                      className="hover:text-primary transition-colors block truncate"
                    >
                      {note.title}
                    </Link>
                  </td>

                  <td className="px-6 py-4">
                    {getStatusBadge(note.status)}
                  </td>

                  <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap font-medium">
                    {new Date(note.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>

                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      {note.status === "published" && (
                        <Link
                          href={`/notes/${note.slug}`}
                          target="_blank"
                          className="p-2 rounded-xl text-muted-foreground hover:text-emerald-600 hover:bg-surface-subtle transition-colors"
                          title="View on public site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/notes/${note.id}/preview`}
                        className="p-2 rounded-xl text-muted-foreground hover:text-primary hover:bg-surface-subtle transition-colors"
                        title="CMS Preview"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/notes/${note.id}/edit`}
                        className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors"
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
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground text-xs">
                  No reference notes created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden space-y-3">
        {notes?.map((note) => {
          const topic = Array.isArray(note.topics) ? note.topics[0] : (note.topics as any);

          return (
            <div
              key={note.id}
              className="bg-white p-4.5 rounded-2xl border border-border/80 shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  {topic && (
                    <span className="text-[11px] font-semibold text-secondary bg-secondary-subtle px-2 py-0.5 rounded-md border border-secondary/20 mb-1 inline-block">
                      {topic.name}
                    </span>
                  )}
                  <h3 className="font-bold text-sm text-foreground leading-snug">
                    {note.title}
                  </h3>
                </div>
                {getStatusBadge(note.status)}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/80 text-xs text-muted-foreground">
                <span>{new Date(note.updated_at).toLocaleDateString()}</span>

                <div className="flex items-center gap-2 font-semibold">
                  <Link
                    href={`/admin/notes/${note.id}/preview`}
                    className="p-1 text-primary hover:underline text-xs"
                  >
                    Preview
                  </Link>
                  <span className="text-border">•</span>
                  <Link
                    href={`/admin/notes/${note.id}/edit`}
                    className="p-1 text-foreground hover:underline text-xs"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {(!notes || notes.length === 0) && (
          <div className="p-8 text-center bg-white border border-border rounded-2xl text-muted-foreground text-xs">
            No notes found.
          </div>
        )}
      </div>
    </div>
  );
}
