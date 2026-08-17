-- 0007_active_status.sql

-- 1. Add is_active column to hierarchy tables
ALTER TABLE public.academic_areas ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.subjects ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE public.topics ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;

-- 2. Update RLS policies for Public (only active)
DROP POLICY IF EXISTS "Public can view academic_areas" ON public.academic_areas;
CREATE POLICY "Public can view active academic_areas" ON public.academic_areas FOR SELECT TO public USING (is_active = true);

DROP POLICY IF EXISTS "Public can view subjects" ON public.subjects;
CREATE POLICY "Public can view active subjects" ON public.subjects FOR SELECT TO public USING (is_active = true);

DROP POLICY IF EXISTS "Public can view topics" ON public.topics;
CREATE POLICY "Public can view active topics" ON public.topics FOR SELECT TO public USING (is_active = true);

-- 3. Add RLS policies for Editors (can view all, including inactive)
-- Admins already have "FOR ALL" policies on these tables in 0003_rls.sql
CREATE POLICY "Editors can view all academic_areas" ON public.academic_areas FOR SELECT TO authenticated USING (public.has_role('editor'));
CREATE POLICY "Editors can view all subjects" ON public.subjects FOR SELECT TO authenticated USING (public.has_role('editor'));
CREATE POLICY "Editors can view all topics" ON public.topics FOR SELECT TO authenticated USING (public.has_role('editor'));
