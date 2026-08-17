import { z } from "zod";

export const AcademicAreaSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").max(100),
  description: z.string().nullable().optional(),
  sort_order: z.coerce.number().int().default(0),
  is_active: z.coerce.boolean().default(true),
});

export const SubjectSchema = z.object({
  area_id: z.string().uuid("Invalid Area ID"),
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").max(100),
  description: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  sort_order: z.coerce.number().int().default(0),
  is_active: z.coerce.boolean().default(true),
});

export const TopicSchema = z.object({
  subject_id: z.string().uuid("Invalid Subject ID"),
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").max(100),
  description: z.string().nullable().optional(),
  sort_order: z.coerce.number().int().default(0),
  is_active: z.coerce.boolean().default(true),
});

export const NoteSchema = z.object({
  topic_id: z.string().uuid("Invalid Topic ID"),
  title: z.string().min(1, "Title is required").max(150),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").max(150),
  short_description: z.string().nullable().optional(),
  status: z.enum(["draft", "in_review", "published", "archived"]).default("draft"),
  sort_order: z.coerce.number().int().default(0),
  // Note: content and tags can be validated in the action itself if needed
});
