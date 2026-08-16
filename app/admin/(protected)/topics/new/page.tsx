import React from "react";
import TopicForm from "../components/TopicForm";
import { requireAdmin } from "@/lib/supabase/rbac";
import { createClient } from "@/lib/supabase/server";

export default async function NewTopicPage() {
  await requireAdmin();
  const supabase = await createClient();
  
  const { data: areas } = await supabase
    .from("academic_areas")
    .select("id, name")
    .order("sort_order");

  const { data: subjects } = await supabase
    .from("subjects")
    .select("id, name, area_id")
    .order("sort_order");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create Topic</h1>
        <p className="text-sm text-slate-600 mt-1">
          Add a new topic to a subject.
        </p>
      </div>
      <TopicForm areas={areas || []} subjects={subjects || []} />
    </div>
  );
}
