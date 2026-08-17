import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";
import { Database } from "../database.types";

const getPublicClient = () => {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
};

export type AcademicArea = Database["public"]["Tables"]["academic_areas"]["Row"];
export type Subject = Database["public"]["Tables"]["subjects"]["Row"];
export type Topic = Database["public"]["Tables"]["topics"]["Row"];
export type Note = Database["public"]["Tables"]["notes"]["Row"];

export const getAcademicAreas = cache(async () => {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from("academic_areas")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error("Error fetching academic areas:", error);
    return [];
  }
  return data;
});

export const getAreaBySlug = cache(async (slug: string) => {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from("academic_areas")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data;
});

export const getSubjectsByArea = cache(async (areaId: string) => {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from("subjects")
    .select("*, academic_areas!inner(*)")
    .eq("area_id", areaId)
    .eq("is_active", true)
    .eq("academic_areas.is_active", true)
    .order("sort_order");

  if (error) return [];
  return data;
});

export const getSubjectBySlug = cache(async (slug: string) => {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from("subjects")
    .select("*, academic_areas!inner(*)")
    .eq("slug", slug)
    .eq("is_active", true)
    .eq("academic_areas.is_active", true)
    .single();

  if (error) return null;
  return data;
});

export const getTopicsBySubject = cache(async (subjectId: string) => {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from("topics")
    .select("*, subjects!inner(*, academic_areas!inner(*))")
    .eq("subject_id", subjectId)
    .eq("is_active", true)
    .eq("subjects.is_active", true)
    .eq("subjects.academic_areas.is_active", true)
    .order("sort_order");

  if (error) return [];
  return data;
});

export const getTopicBySlug = cache(async (slug: string) => {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from("topics")
    .select("*, subjects!inner(*, academic_areas!inner(*))")
    .eq("slug", slug)
    .eq("is_active", true)
    .eq("subjects.is_active", true)
    .eq("subjects.academic_areas.is_active", true)
    .single();

  if (error) return null;
  return data;
});

export const getPublishedNotesByTopic = cache(async (topicId: string) => {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from("notes")
    .select("id, title, slug, short_description, reading_time, sort_order, updated_at, published_at, topics!inner(is_active, subjects!inner(is_active, academic_areas!inner(is_active)))")
    .eq("topic_id", topicId)
    .eq("status", "published")
    .eq("topics.is_active", true)
    .eq("topics.subjects.is_active", true)
    .eq("topics.subjects.academic_areas.is_active", true)
    .order("sort_order");

  if (error) return [];
  return data;
});

export const getNoteBySlug = cache(async (slug: string) => {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*, topics!inner(*, subjects!inner(*, academic_areas!inner(*)))")
    .eq("slug", slug)
    .eq("status", "published")
    .eq("topics.is_active", true)
    .eq("topics.subjects.is_active", true)
    .eq("topics.subjects.academic_areas.is_active", true)
    .single();

  if (error) return null;
  return data;
});

export const searchPublishedNotes = cache(async (
  query: string,
  filterArea?: string,
  filterSubject?: string,
  filterTopic?: string,
  pageSize: number = 20,
  pageNumber: number = 1
) => {
  const supabase = getPublicClient();
  const { data, error } = await supabase.rpc("search_published_notes", {
    search_query: query,
    filter_area: filterArea,
    filter_subject: filterSubject,
    filter_topic: filterTopic,
    page_size: pageSize,
    page_number: pageNumber,
  });

  if (error) {
    console.error("Search RPC Error:", error);
    return { results: [], totalCount: 0 };
  }

  const results = data || [];
  const totalCount = results.length > 0 ? Number(results[0].total_count) : 0;

  return { results, totalCount };
});

export const getRecentNotes = cache(async (limit: number = 4) => {
  const supabase = getPublicClient();
  const { data, error } = await supabase
    .from("notes")
    .select("*, topics!inner(name, is_active, subjects!inner(name, slug, is_active, academic_areas!inner(slug, is_active)))")
    .eq("status", "published")
    .eq("topics.is_active", true)
    .eq("topics.subjects.is_active", true)
    .eq("topics.subjects.academic_areas.is_active", true)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) return [];
  return data;
});

export const getPlatformCounts = cache(async () => {
  const supabase = getPublicClient();
  const [areasRes, subjectsRes, topicsRes, notesRes] = await Promise.all([
    supabase.from("academic_areas").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("subjects").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("topics").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("notes").select("id", { count: "exact", head: true }).eq("status", "published"),
  ]);

  return {
    areasCount: areasRes.count || 0,
    subjectsCount: subjectsRes.count || 0,
    topicsCount: topicsRes.count || 0,
    notesCount: notesRes.count || 0,
  };
});
