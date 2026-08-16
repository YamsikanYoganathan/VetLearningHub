import React from "react";
import AreaForm from "../components/AreaForm";
import { requireAdmin } from "@/lib/supabase/rbac";

export default async function NewAcademicAreaPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Create Academic Area</h1>
        <p className="text-sm text-slate-600 mt-1">
          Add a new top-level discipline to the knowledge base.
        </p>
      </div>
      <AreaForm />
    </div>
  );
}
