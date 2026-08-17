"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin, requireEditor } from "@/lib/supabase/rbac";
import { revalidatePath } from "next/cache";
import { TopicSchema } from "@/lib/validations";
import { z } from "zod";

export async function createTopic(formData: FormData) {
  await requireEditor();
  const supabase = await createClient();

  try {
    const rawData = {
      subject_id: formData.get("subject_id"),
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      sort_order: formData.get("sort_order"),
      is_active: formData.get("is_active") === "true",
    };

    const parsed = TopicSchema.parse(rawData);

    // Hierarchy check
    const { data: subjectCheck, error: subjectError } = await supabase
      .from("subjects")
      .select("id")
      .eq("id", parsed.subject_id)
      .single();
    if (subjectError || !subjectCheck) return { error: "Invalid subject." };

    const { error } = await supabase.from("topics").insert({
      subject_id: parsed.subject_id,
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description || null,
      sort_order: parsed.sort_order,
      is_active: parsed.is_active,
    });

    if (error) {
      if (error.code === '23505') return { error: "A topic with this slug already exists." };
      return { error: error.message };
    }

    revalidatePath("/admin/topics");
    revalidatePath("/", "layout");
    revalidatePath("/subjects");
    return { success: true };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return { error: (err as any).errors[0].message };
    }
    return { error: "An unexpected error occurred." };
  }
}

export async function updateTopic(id: string, formData: FormData) {
  await requireEditor();
  const supabase = await createClient();

  try {
    const rawData = {
      subject_id: formData.get("subject_id"),
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      sort_order: formData.get("sort_order"),
      is_active: formData.get("is_active") === "true",
    };

    const parsed = TopicSchema.parse(rawData);

    // Hierarchy check
    const { data: subjectCheck, error: subjectError } = await supabase
      .from("subjects")
      .select("id")
      .eq("id", parsed.subject_id)
      .single();
    if (subjectError || !subjectCheck) return { error: "Invalid subject." };

    const { error } = await supabase.from("topics").update({
      subject_id: parsed.subject_id,
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description || null,
      sort_order: parsed.sort_order,
      is_active: parsed.is_active,
      updated_at: new Date().toISOString()
    }).eq("id", id);

    if (error) {
      if (error.code === '23505') return { error: "A topic with this slug already exists." };
      return { error: error.message };
    }

    revalidatePath("/admin/topics");
    revalidatePath("/", "layout");
    revalidatePath("/subjects");
    return { success: true };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return { error: (err as any).errors[0].message };
    }
    return { error: "An unexpected error occurred." };
  }
}

export async function deleteTopic(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("topics").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/topics");
  revalidatePath("/", "layout");
  revalidatePath("/subjects");
  return { success: true };
}
