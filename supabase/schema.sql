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

-- 3. Create Notes Table (Upgraded with sub_section per Task 4)
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    sub_section TEXT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Safely add sub_section column if table already exists without it
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS sub_section TEXT;

-- 4. Create Indexes for High-Performance Queries
CREATE INDEX IF NOT EXISTS idx_subjects_slug ON public.subjects(slug);
CREATE INDEX IF NOT EXISTS idx_notes_subject_id ON public.notes(subject_id);
CREATE INDEX IF NOT EXISTS idx_notes_sub_section ON public.notes(sub_section);
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
-- 7. PRODUCTION SEED DATA FOR CLINICAL SPECIALTIES (Exact 5 Subjects per Task 3 & 4)
-- ============================================================================
INSERT INTO public.subjects (name, slug, description, icon, color)
VALUES 
    ('Canine Anatomy & Surgery', 'canine-anatomy', 'Comprehensive structural anatomy references, surgical approach landmarks, and orthopaedic joint stabilization algorithms.', 'Dog', 'sky-600'),
    ('Feline Internal Medicine', 'feline-internal-medicine', 'Diagnostic protocols and treatment modalities for feline-specific endocrine, renal, and gastrointestinal pathologies.', 'Cat', 'sky-600'),
    ('Clinical Pharmacology', 'clinical-pharmacology', 'Dosage calculations, contraindications, and mechanism of action for common veterinary therapeutics.', 'Pill', 'sky-600'),
    ('Equine Lameness & Orthopedics', 'equine-orthopedics', 'Diagnostic nerve block mapping, joint injection techniques, and radiographic interpretation of the equine distal limb.', 'Bone', 'sky-600'),
    ('Emergency & Critical Care', 'emergency-critical-care', 'Triage protocols, fluid therapy calculations, and resuscitation algorithms for acute trauma and toxicological emergencies.', 'ShieldAlert', 'sky-600')
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color;
