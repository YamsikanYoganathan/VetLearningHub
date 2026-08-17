-- 0006_storage_security.sql

-- 1. Update Bucket-Level Configurations (Defense in Depth)
UPDATE storage.buckets
SET allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[],
    file_size_limit = 5242880 -- 5 MB
WHERE id = 'media';

UPDATE storage.buckets
SET allowed_mime_types = ARRAY['application/pdf']::text[],
    file_size_limit = 20971520 -- 20 MB
WHERE id = 'resources';

-- 2. Drop the old overly permissive policies
DROP POLICY IF EXISTS "Editors can manage media" ON storage.objects;
DROP POLICY IF EXISTS "Editors can manage resources" ON storage.objects;

-- 3. Granular RLS Policies for Media
CREATE POLICY "Editors can insert media" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'media' 
    AND (public.has_role('editor') OR public.has_role('admin'))
);

CREATE POLICY "Editors can update media" ON storage.objects FOR UPDATE TO authenticated
USING (
    bucket_id = 'media' 
    AND (public.has_role('editor') OR public.has_role('admin'))
);

CREATE POLICY "Editors can delete media" ON storage.objects FOR DELETE TO authenticated
USING (
    bucket_id = 'media' 
    AND (public.has_role('editor') OR public.has_role('admin'))
);

-- 4. Granular RLS Policies for Resources
CREATE POLICY "Editors can insert resources" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'resources' 
    AND (public.has_role('editor') OR public.has_role('admin'))
);

CREATE POLICY "Editors can update resources" ON storage.objects FOR UPDATE TO authenticated
USING (
    bucket_id = 'resources' 
    AND (public.has_role('editor') OR public.has_role('admin'))
);

CREATE POLICY "Editors can delete resources" ON storage.objects FOR DELETE TO authenticated
USING (
    bucket_id = 'resources' 
    AND (public.has_role('editor') OR public.has_role('admin'))
);
