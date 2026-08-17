-- 0011_restrict_deletion.sql

-- Drop existing CASCADE foreign keys
ALTER TABLE public.subjects DROP CONSTRAINT IF EXISTS subjects_area_id_fkey;
ALTER TABLE public.topics DROP CONSTRAINT IF EXISTS topics_subject_id_fkey;
ALTER TABLE public.notes DROP CONSTRAINT IF EXISTS notes_topic_id_fkey;

-- Re-add with RESTRICT to prevent accidental deletion of valuable content
ALTER TABLE public.subjects ADD CONSTRAINT subjects_area_id_fkey FOREIGN KEY (area_id) REFERENCES public.academic_areas(id) ON DELETE RESTRICT;
ALTER TABLE public.topics ADD CONSTRAINT topics_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subjects(id) ON DELETE RESTRICT;
ALTER TABLE public.notes ADD CONSTRAINT notes_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE RESTRICT;
