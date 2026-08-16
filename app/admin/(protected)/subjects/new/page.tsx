import React from "react";
import SubjectForm from "../components/SubjectForm";
import { requireAdmin } from "@/lib/supabase/rbac";
import { createClient } from "@/lib/supabase/server";

export default async function NewSubjectPage() {
  await requireAdmin();
  const supabase = await createClient();
  
  const { data: areas } = await supabase
    .from("academic_areas")
    .select("id, name")
    .order("sort_order");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create Subject</h1>
        <p className="text-sm text-slate-600 mt-1">
          Add a new subject to an academic area.
        </p>
      </div>
      <SubjectForm areas={areas || []} />
    </div>
  );
}
