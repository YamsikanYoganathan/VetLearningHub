-- 0009_rbac_fixes.sql

-- Allow Editors to INSERT and UPDATE hierarchy tables
CREATE POLICY "Editors can insert academic_areas" ON public.academic_areas FOR INSERT TO authenticated WITH CHECK (public.has_role('editor') OR public.has_role('admin'));
CREATE POLICY "Editors can update academic_areas" ON public.academic_areas FOR UPDATE TO authenticated USING (public.has_role('editor') OR public.has_role('admin'));

CREATE POLICY "Editors can insert subjects" ON public.subjects FOR INSERT TO authenticated WITH CHECK (public.has_role('editor') OR public.has_role('admin'));
CREATE POLICY "Editors can update subjects" ON public.subjects FOR UPDATE TO authenticated USING (public.has_role('editor') OR public.has_role('admin'));

CREATE POLICY "Editors can insert topics" ON public.topics FOR INSERT TO authenticated WITH CHECK (public.has_role('editor') OR public.has_role('admin'));
CREATE POLICY "Editors can update topics" ON public.topics FOR UPDATE TO authenticated USING (public.has_role('editor') OR public.has_role('admin'));
