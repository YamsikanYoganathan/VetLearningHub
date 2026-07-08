-- ============================================================================
-- VETERINARY LEARNING HUB - SUPABASE RAW SQL SCHEMA
-- Execute this script directly in the Supabase SQL Editor (Dashboard -> SQL Editor)
-- ============================================================================

-- 1. Enable UUID Extension (standard in Supabase/PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Subjects Table
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    color TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Create Notes Table
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Create Indexes for High-Performance Queries
CREATE INDEX IF NOT EXISTS idx_subjects_slug ON public.subjects(slug);
CREATE INDEX IF NOT EXISTS idx_notes_subject_id ON public.notes(subject_id);
CREATE INDEX IF NOT EXISTS idx_notes_slug ON public.notes(slug);
CREATE INDEX IF NOT EXISTS idx_notes_status ON public.notes(status);

-- 5. Auto-Update Timestamp Trigger for Notes Table
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_notes_updated_at ON public.notes;
CREATE TRIGGER set_notes_updated_at
    BEFORE UPDATE ON public.notes
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on both tables
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Subjects Policies
-- Policy 1: Public can SELECT subjects
CREATE POLICY "Public can view subjects"
    ON public.subjects
    FOR SELECT
    TO public
    USING (true);

-- Policy 2: Authenticated users (admin) can perform ALL operations on subjects
CREATE POLICY "Authenticated users can manage subjects"
    ON public.subjects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Notes Policies
-- Policy 3: Public can SELECT notes where status = 'published'
CREATE POLICY "Public can view published notes"
    ON public.notes
    FOR SELECT
    TO public
    USING (status = 'published');

-- Policy 4: Authenticated users (admin) can perform ALL operations on notes
CREATE POLICY "Authenticated users can manage all notes"
    ON public.notes
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- ============================================================================
-- 7. OPTIONAL SEED DATA FOR CLINICAL SPECIALTIES
-- ============================================================================
INSERT INTO public.subjects (name, slug, description, icon, color)
VALUES 
    ('Canine Cardiology', 'canine-cardiology', 'Valvular disease protocols, ECG interpretation, congestive heart failure staging, and antiarrhythmic pharmacology.', 'HeartPulse', 'teal-600'),
    ('Equine Orthopedics', 'equine-orthopedics', 'Diagnostic nerve blocks, lameness scoring, joint sepsis therapeutics, and arthroscopic surgical approaches.', 'Bone', 'sky-600'),
    ('Feline Endocrinology', 'feline-endocrinology', 'Diabetes mellitus insulin titration, hyperthyroidism radioiodine & medical protocols, and adrenal disease diagnostics.', 'Activity', 'teal-600'),
    ('Emergency & Critical Care', 'emergency-critical-care', 'Acute triage algorithms, shock fluid resuscitation therapy, GDV emergency stabilization, and toxicology antidotes.', 'ShieldAlert', 'sky-600')
ON CONFLICT (slug) DO NOTHING;
