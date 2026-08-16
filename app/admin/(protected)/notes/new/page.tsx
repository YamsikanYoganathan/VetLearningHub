import React from "react";
import NoteForm from "../components/NoteForm";
import { requireEditor } from "@/lib/supabase/rbac";
import { createClient } from "@/lib/supabase/server";

export default async function NewNotePage() {
  await requireEditor();
  const supabase = await createClient();
  
  const { data: topics } = await supabase
    .from("topics")
    .select("id, name, subjects(name, academic_areas(name))")
    .order("subject_id")
    .order("sort_order");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create Clinical Note</h1>
        <p className="text-sm text-slate-600 mt-1">
          Draft a new veterinary protocol or educational note.
        </p>
      </div>
      <NoteForm topics={topics || []} />
    </div>
  );
}
