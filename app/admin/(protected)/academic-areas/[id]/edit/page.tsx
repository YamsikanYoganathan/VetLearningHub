import React from "react";
import AreaForm from "../../components/AreaForm";
import { requireAdmin } from "@/lib/supabase/rbac";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditAcademicAreaPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  
  const supabase = await createClient();
  const { data: area } = await supabase
    .from("academic_areas")
    .select("*")
    .eq("id", id)
    .single();

  if (!area) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Edit Academic Area</h1>
        <p className="text-sm text-slate-600 mt-1">
          Update the details for {area.name}.
        </p>
      </div>
      <AreaForm initialData={area} />
    </div>
  );
}
