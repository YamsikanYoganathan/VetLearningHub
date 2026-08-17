"use server";

import { createClient } from "@/lib/supabase/server";
import { requireEditor, requireAdmin } from "@/lib/supabase/rbac";
import { revalidatePath } from "next/cache";
import { NoteSchema } from "@/lib/validations";
import { z } from "zod";

export async function createNote(formData: FormData) {
  const { user } = await requireEditor();
  const supabase = await createClient();

  try {
    const rawData = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      topic_id: formData.get("topic_id") as string,
      status: formData.get("status") as string || "draft",
      sort_order: formData.get("sort_order"),
      short_description: formData.get("short_description") as string,
    };

    const parsed = NoteSchema.parse(rawData);
    
    // Additional validation for content
    let content = {};
    const rawContent = formData.get("content");
    if (rawContent && typeof rawContent === 'string') {
      try {
        content = JSON.parse(rawContent);
      } catch (e) {
        return { error: "Invalid JSON for content." };
      }
    }

    // Server-side hierarchy validation for topic_id
    const { data: topicCheck, error: topicCheckError } = await supabase
      .from("topics")
      .select("id")
      .eq("id", parsed.topic_id)
      .single();
      
    if (topicCheckError || !topicCheck) {
      return { error: "The selected topic does not exist. Hierarchy validation failed." };
    }

    const { error } = await supabase.from("notes").insert({
      title: parsed.title,
      slug: parsed.slug,
      topic_id: parsed.topic_id,
      status: parsed.status,
      short_description: parsed.short_description || null,
      content,
      sort_order: parsed.sort_order,
      author_id: user.id
    });

    if (error) {
      if (error.code === '23505') return { error: "A note with this slug already exists." };
      return { error: error.message };
    }

    revalidatePath("/admin/notes");
    revalidatePath("/admin");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return { error: (err as any).errors[0].message };
    }
    return { error: "An unexpected error occurred." };
  }
}

export async function updateNote(id: string, formData: FormData) {
  await requireEditor();
  const supabase = await createClient();

  try {
    const rawData = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      topic_id: formData.get("topic_id") as string,
      status: formData.get("status") as string || "draft",
      sort_order: formData.get("sort_order"),
      short_description: formData.get("short_description") as string,
    };

    const parsed = NoteSchema.parse(rawData);
    
    // Additional validation for content
    let content = {};
    const rawContent = formData.get("content");
    if (rawContent && typeof rawContent === 'string') {
      try {
        content = JSON.parse(rawContent);
      } catch (e) {
        return { error: "Invalid JSON for content." };
      }
    }

    // Server-side hierarchy validation for topic_id
    const { data: topicCheck, error: topicCheckError } = await supabase
      .from("topics")
      .select("id")
      .eq("id", parsed.topic_id)
      .single();
      
    if (topicCheckError || !topicCheck) {
      return { error: "The selected topic does not exist. Hierarchy validation failed." };
    }

    const { error } = await supabase.from("notes").update({
      title: parsed.title,
      slug: parsed.slug,
      topic_id: parsed.topic_id,
      status: parsed.status,
      short_description: parsed.short_description || null,
      content,
      sort_order: parsed.sort_order,
      updated_at: new Date().toISOString()
    }).eq("id", id);

    if (error) {
      if (error.code === '23505') return { error: "A note with this slug already exists." };
      return { error: error.message };
    }

    revalidatePath("/admin/notes");
    revalidatePath("/admin");
    revalidatePath("/", "layout");
    revalidatePath(`/notes/${parsed.slug}`); // public route
    return { success: true };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return { error: (err as any).errors[0].message };
    }
    return { error: "An unexpected error occurred." };
  }
}

export async function deleteNote(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/notes");
  revalidatePath("/admin");
  revalidatePath("/", "layout");
  return { success: true };
}
