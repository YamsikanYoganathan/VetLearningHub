import React from "react";
import NoteForm from "../../components/NoteForm";
import { requireEditor } from "@/lib/supabase/rbac";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
  await requireEditor();
  const { id } = await params;
  
  const supabase = await createClient();
  
  const { data: topics } = await supabase
    .from("topics")
    .select("id, name, subjects(name, academic_areas(name))")
    .order("subject_id")
    .order("sort_order");

  const { data: note } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (!note) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit Note: {note.title}</h1>
        <p className="text-sm text-slate-600 mt-1">
          Update the content and metadata for this clinical note.
        </p>
      </div>
      <NoteForm topics={topics || []} initialData={note} />
    </div>
  );
}
