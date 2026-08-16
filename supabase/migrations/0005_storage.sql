-- Note: Requires Supabase Storage schema to be available. In local dev with CLI, it is.

-- 1. Create Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true) ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', true) ON CONFLICT (id) DO NOTHING;

-- 2. Create Storage Policies for 'media'
CREATE POLICY "Public can view media" ON storage.objects FOR SELECT TO public USING (bucket_id = 'media');
CREATE POLICY "Editors can manage media" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'media' AND (public.has_role('editor') OR public.has_role('admin')));

-- 3. Create Storage Policies for 'resources'
CREATE POLICY "Public can view resources" ON storage.objects FOR SELECT TO public USING (bucket_id = 'resources');
CREATE POLICY "Editors can manage resources" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'resources' AND (public.has_role('editor') OR public.has_role('admin')));
