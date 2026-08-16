"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/rbac";
import { revalidatePath } from "next/cache";

export async function createAcademicArea(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const sort_order = formData.get("sort_order") ? parseInt(formData.get("sort_order") as string) : 0;

  const { error } = await supabase.from("academic_areas").insert({
    name,
    slug,
    description,
    sort_order,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/academic-areas");
  revalidatePath("/");
  revalidatePath("/subjects");
  return { success: true };
}

export async function updateAcademicArea(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const sort_order = formData.get("sort_order") ? parseInt(formData.get("sort_order") as string) : 0;

  const { error } = await supabase.from("academic_areas").update({
    name,
    slug,
    description,
    sort_order,
  }).eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/academic-areas");
  revalidatePath("/");
  revalidatePath("/subjects");
  return { success: true };
}

export async function deleteAcademicArea(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("academic_areas").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/academic-areas");
  revalidatePath("/");
  revalidatePath("/subjects");
  return { success: true };
}
