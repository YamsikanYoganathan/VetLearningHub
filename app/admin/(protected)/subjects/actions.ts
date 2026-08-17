"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin, requireEditor } from "@/lib/supabase/rbac";
import { revalidatePath } from "next/cache";
import { SubjectSchema } from "@/lib/validations";
import { z } from "zod";

export async function createSubject(formData: FormData) {
  await requireEditor();
  const supabase = await createClient();

  try {
    const rawData = {
      area_id: formData.get("area_id"),
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      icon: formData.get("icon"),
      color: formData.get("color"),
      sort_order: formData.get("sort_order"),
      is_active: formData.get("is_active") === "true",
    };

    const parsed = SubjectSchema.parse(rawData);

    // Hierarchy check
    const { data: areaCheck, error: areaError } = await supabase
      .from("academic_areas")
      .select("id")
      .eq("id", parsed.area_id)
      .single();
    if (areaError || !areaCheck) return { error: "Invalid academic area." };

    const { error } = await supabase.from("subjects").insert({
      area_id: parsed.area_id,
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description || null,
      icon: parsed.icon || null,
      color: parsed.color || null,
      sort_order: parsed.sort_order,
      is_active: parsed.is_active,
    });

    if (error) {
      if (error.code === '23505') return { error: "A subject with this slug already exists." };
      return { error: error.message };
    }

    revalidatePath("/admin/subjects");
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

export async function updateSubject(id: string, formData: FormData) {
  await requireEditor();
  const supabase = await createClient();

  try {
    const rawData = {
      area_id: formData.get("area_id"),
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      icon: formData.get("icon"),
      color: formData.get("color"),
      sort_order: formData.get("sort_order"),
      is_active: formData.get("is_active") === "true",
    };

    const parsed = SubjectSchema.parse(rawData);

    // Hierarchy check
    const { data: areaCheck, error: areaError } = await supabase
      .from("academic_areas")
      .select("id")
      .eq("id", parsed.area_id)
      .single();
    if (areaError || !areaCheck) return { error: "Invalid academic area." };

    const { error } = await supabase.from("subjects").update({
      area_id: parsed.area_id,
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description || null,
      icon: parsed.icon || null,
      color: parsed.color || null,
      sort_order: parsed.sort_order,
      is_active: parsed.is_active,
      updated_at: new Date().toISOString()
    }).eq("id", id);

    if (error) {
      if (error.code === '23505') return { error: "A subject with this slug already exists." };
      return { error: error.message };
    }

    revalidatePath("/admin/subjects");
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

export async function deleteSubject(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("subjects").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/subjects");
  revalidatePath("/", "layout");
  revalidatePath("/subjects");
  return { success: true };
}
