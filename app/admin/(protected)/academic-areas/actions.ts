"use server";

import { createClient } from "@/lib/supabase/server";
import { requireAdmin, requireEditor } from "@/lib/supabase/rbac";
import { revalidatePath } from "next/cache";
import { AcademicAreaSchema } from "@/lib/validations";
import { z } from "zod";

export async function createAcademicArea(formData: FormData) {
  await requireEditor();
  const supabase = await createClient();

  try {
    const rawData = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      sort_order: formData.get("sort_order"),
      is_active: formData.get("is_active") === "true",
    };

    const parsed = AcademicAreaSchema.parse(rawData);

    const { error } = await supabase.from("academic_areas").insert({
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description || null,
      sort_order: parsed.sort_order,
      is_active: parsed.is_active,
    });

    if (error) {
      if (error.code === '23505') return { error: "An area with this slug already exists." };
      return { error: error.message };
    }

    revalidatePath("/admin/academic-areas");
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

export async function updateAcademicArea(id: string, formData: FormData) {
  await requireEditor();
  const supabase = await createClient();

  try {
    const rawData = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      sort_order: formData.get("sort_order"),
      is_active: formData.get("is_active") === "true",
    };

    const parsed = AcademicAreaSchema.parse(rawData);

    const { error } = await supabase.from("academic_areas").update({
      name: parsed.name,
      slug: parsed.slug,
      description: parsed.description || null,
      sort_order: parsed.sort_order,
      is_active: parsed.is_active,
      updated_at: new Date().toISOString()
    }).eq("id", id);

    if (error) {
      if (error.code === '23505') return { error: "An area with this slug already exists." };
      return { error: error.message };
    }

    revalidatePath("/admin/academic-areas");
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

export async function deleteAcademicArea(id: string) {
  await requireAdmin();
  const supabase = await createClient();

  const { error } = await supabase.from("academic_areas").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/academic-areas");
  revalidatePath("/", "layout");
  revalidatePath("/subjects");
  return { success: true };
}
