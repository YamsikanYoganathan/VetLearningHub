-- Enable RLS on all tables
ALTER TABLE public.academic_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.note_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Helper Function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.has_role(required_role public.app_role)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = required_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- PUBLIC POLICIES
-- ==========================================
-- Public can view active areas, subjects, topics, and published notes
CREATE POLICY "Public can view academic_areas" ON public.academic_areas FOR SELECT TO public USING (true);
CREATE POLICY "Public can view subjects" ON public.subjects FOR SELECT TO public USING (true);
CREATE POLICY "Public can view topics" ON public.topics FOR SELECT TO public USING (true);
CREATE POLICY "Public can view published notes" ON public.notes FOR SELECT TO public USING (status = 'published');
CREATE POLICY "Public can view tags" ON public.tags FOR SELECT TO public USING (true);
CREATE POLICY "Public can view note_tags" ON public.note_tags FOR SELECT TO public USING (true);

-- ==========================================
-- EDITOR POLICIES
-- ==========================================
-- Editors can select all notes (including drafts)
CREATE POLICY "Editors can view all notes" ON public.notes FOR SELECT TO authenticated USING (has_role('editor') OR has_role('admin'));
-- Editors can insert/update notes (but not delete)
CREATE POLICY "Editors can insert notes" ON public.notes FOR INSERT TO authenticated WITH CHECK (has_role('editor') OR has_role('admin'));
CREATE POLICY "Editors can update notes" ON public.notes FOR UPDATE TO authenticated USING (has_role('editor') OR has_role('admin'));

-- Editors can manage tags and note_tags
CREATE POLICY "Editors can manage tags" ON public.tags FOR ALL TO authenticated USING (has_role('editor') OR has_role('admin'));
CREATE POLICY "Editors can manage note_tags" ON public.note_tags FOR ALL TO authenticated USING (has_role('editor') OR has_role('admin'));

-- ==========================================
-- ADMIN POLICIES
-- ==========================================
-- Admins can do everything on all tables
CREATE POLICY "Admins can manage academic_areas" ON public.academic_areas FOR ALL TO authenticated USING (has_role('admin'));
CREATE POLICY "Admins can manage subjects" ON public.subjects FOR ALL TO authenticated USING (has_role('admin'));
CREATE POLICY "Admins can manage topics" ON public.topics FOR ALL TO authenticated USING (has_role('admin'));
CREATE POLICY "Admins can manage notes" ON public.notes FOR ALL TO authenticated USING (has_role('admin'));
CREATE POLICY "Admins can manage user_roles" ON public.user_roles FOR ALL TO authenticated USING (has_role('admin'));
