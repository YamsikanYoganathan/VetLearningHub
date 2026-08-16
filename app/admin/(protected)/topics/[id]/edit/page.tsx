import React from "react";
import TopicForm from "../../components/TopicForm";
import { requireAdmin } from "@/lib/supabase/rbac";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditTopicPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  
  const supabase = await createClient();
  
  const { data: areas } = await supabase
    .from("academic_areas")
    .select("id, name")
    .order("sort_order");

  const { data: subjects } = await supabase
    .from("subjects")
    .select("id, name, area_id")
    .order("sort_order");

  const { data: topic } = await supabase
    .from("topics")
    .select("*")
    .eq("id", id)
    .single();

  if (!topic) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit Topic</h1>
        <p className="text-sm text-slate-600 mt-1">
          Update the details for {topic.name}.
        </p>
      </div>
      <TopicForm areas={areas || []} subjects={subjects || []} initialData={topic} />
    </div>
  );
}
