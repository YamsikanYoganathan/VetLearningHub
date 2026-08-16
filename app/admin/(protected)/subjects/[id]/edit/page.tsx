import React from "react";
import SubjectForm from "../../components/SubjectForm";
import { requireAdmin } from "@/lib/supabase/rbac";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditSubjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  
  const supabase = await createClient();
  
  const { data: areas } = await supabase
    .from("academic_areas")
    .select("id, name")
    .order("sort_order");

  const { data: subject } = await supabase
    .from("subjects")
    .select("*")
    .eq("id", id)
    .single();

  if (!subject) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit Subject</h1>
        <p className="text-sm text-slate-600 mt-1">
          Update the details for {subject.name}.
        </p>
      </div>
      <SubjectForm areas={areas || []} initialData={subject} />
    </div>
  );
}
