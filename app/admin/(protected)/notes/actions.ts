"use server";

import { createClient } from "@/lib/supabase/server";
import { requireEditor } from "@/lib/supabase/rbac";
import { revalidatePath } from "next/cache";

export async function createNote(formData: FormData) {
  const { user } = await requireEditor();
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const topic_id = formData.get("topic_id") as string;
  const status = formData.get("status") as string || "draft";
  const content = formData.get("content") ? JSON.parse(formData.get("content") as string) : {};
  const sort_order = formData.get("sort_order") ? parseInt(formData.get("sort_order") as string) : 0;

  const { error } = await supabase.from("notes").insert({
    title,
    slug,
    topic_id,
    status,
    content,
    sort_order,
    author_id: user.id
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/notes");
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}

export async function updateNote(id: string, formData: FormData) {
  await requireEditor();
  const supabase = await createClient();

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const topic_id = formData.get("topic_id") as string;
  const status = formData.get("status") as string || "draft";
  const content = formData.get("content") ? JSON.parse(formData.get("content") as string) : {};
  const sort_order = formData.get("sort_order") ? parseInt(formData.get("sort_order") as string) : 0;

  const { error } = await supabase.from("notes").update({
    title,
    slug,
    topic_id,
    status,
    content,
    sort_order,
    updated_at: new Date().toISOString()
  }).eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/notes");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/notes/${slug}`); // public route
  return { success: true };
}

export async function deleteNote(id: string) {
  await requireEditor();
  const supabase = await createClient();

  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/notes");
  revalidatePath("/admin");
  revalidatePath("/");
  return { success: true };
}
