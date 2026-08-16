"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/supabase/rbac";
import { revalidatePath } from "next/cache";

export async function createTopic(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const subject_id = formData.get("subject_id") as string;
  const sort_order = formData.get("sort_order") ? parseInt(formData.get("sort_order") as string) : 0;

  const { error } = await supabase.from("topics").insert({
    name,
    slug,
    description,
    subject_id,
    sort_order,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/topics");
  revalidatePath("/");
  revalidatePath("/subjects");
  return { success: true };
}

export async function updateTopic(id: string, formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;
  const description = formData.get("description") as string;
  const subject_id = formData.get("subject_id") as string;
  const sort_order = formData.get("sort_order") ? parseInt(formData.get("sort_order") as string) : 0;

  const { error } = await supabase.from("topics").update({
    name,
    slug,
    description,
    subject_id,
    sort_order,
  }).eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/topics");
  revalidatePath("/");
  revalidatePath("/subjects");
  return { success: true };
}

export async function deleteTopic(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("topics").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/topics");
  revalidatePath("/");
  revalidatePath("/subjects");
  return { success: true };
}
