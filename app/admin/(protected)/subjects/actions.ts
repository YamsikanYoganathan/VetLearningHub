"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/rbac";
import { revalidatePath } from "next/cache";

export async function createSubject(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const area_id = formData.get("area_id") as string;
  const sort_order = formData.get("sort_order") ? parseInt(formData.get("sort_order") as string) : 0;

  const { error } = await supabase.from("subjects").insert({
    name,
    slug,
    description,
    area_id,
    sort_order,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/subjects");
  revalidatePath("/");
  revalidatePath("/subjects");
  return { success: true };
}

export async function updateSubject(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const area_id = formData.get("area_id") as string;
  const sort_order = formData.get("sort_order") ? parseInt(formData.get("sort_order") as string) : 0;

  const { error } = await supabase.from("subjects").update({
    name,
    slug,
    description,
    area_id,
    sort_order,
  }).eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/subjects");
  revalidatePath("/");
  revalidatePath("/subjects");
  return { success: true };
}

export async function deleteSubject(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("subjects").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/subjects");
  revalidatePath("/");
  revalidatePath("/subjects");
  return { success: true };
}
