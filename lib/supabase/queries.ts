import { createClient } from "./server";
import { Database } from "../database.types";

export type AcademicArea = Database["public"]["Tables"]["academic_areas"]["Row"];
export type Subject = Database["public"]["Tables"]["subjects"]["Row"];
export type Topic = Database["public"]["Tables"]["topics"]["Row"];
export type Note = Database["public"]["Tables"]["notes"]["Row"];

export async function getAcademicAreas() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("academic_areas")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("Error fetching academic areas:", error);
    return [];
  }
  return data;
}

export async function getAreaBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("academic_areas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getSubjectsByArea(areaId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("area_id", areaId)
    .order("sort_order");

  if (error) return [];
  return data;
}

export async function getSubjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("subjects")
    .select("*, academic_areas(*)")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getTopicsBySubject(subjectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("topics")
    .select("*")
    .eq("subject_id", subjectId)
    .order("sort_order");

  if (error) return [];
  return data;
}

export async function getTopicBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("topics")
    .select("*, subjects(*, academic_areas(*))")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}

export async function getPublishedNotesByTopic(topicId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("id, title, slug, short_description, reading_time, sort_order, updated_at, published_at")
    .eq("topic_id", topicId)
    .eq("status", "published")
    .order("sort_order");

  if (error) return [];
  return data;
}

export async function getNoteBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*, topics(*, subjects(*, academic_areas(*)))")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}

export async function searchNotes(query: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*, topics(name, subjects(name, academic_areas(name)))")
    .eq("status", "published")
    .ilike("title", `%${query}%`)
    .order("updated_at", { ascending: false })
    .limit(20);

  if (error) return [];
  return data;
}

export async function getRecentNotes(limit: number = 4) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*, topics(name, subjects(name, slug, academic_areas(slug)))")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data;
}
