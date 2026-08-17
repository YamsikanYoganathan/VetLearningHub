-- 0010_note_rls_fix.sql

-- Ensure public cannot view published notes if the parent hierarchy is inactive
DROP POLICY IF EXISTS "Public can view published notes" ON public.notes;

CREATE POLICY "Public can view published notes" ON public.notes 
FOR SELECT TO public 
USING (
  status = 'published' AND
  EXISTS (
    SELECT 1 FROM public.topics t
    JOIN public.subjects s ON t.subject_id = s.id
    JOIN public.academic_areas a ON s.area_id = a.id
    WHERE t.id = notes.topic_id
      AND t.is_active = true
      AND s.is_active = true
      AND a.is_active = true
  )
);
