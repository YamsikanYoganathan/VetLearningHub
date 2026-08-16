-- Seed Data for 6 Academic Areas
INSERT INTO public.academic_areas (id, name, slug, description, sort_order) VALUES 
('11111111-1111-1111-1111-111111111111', 'Basic Science', 'basic-science', 'Foundational sciences including anatomy, physiology, and biochemistry.', 10),
('22222222-2222-2222-2222-222222222222', 'Animal Science', 'animal-science', 'Animal handling, welfare, nutrition, and production.', 20),
('33333333-3333-3333-3333-333333333333', 'Disease Science', 'disease-science', 'Pathology, parasitology, microbiology, and pharmacology.', 30),
('44444444-4444-4444-4444-444444444444', 'Clinical Science', 'clinical-science', 'Medicine and surgery across various species.', 40),
('55555555-5555-5555-5555-555555555555', 'Veterinary Clinical Practices', 'veterinary-clinical-practices', 'Practical clinical training and procedures.', 50),
('66666666-6666-6666-6666-666666666666', 'Environmental & Population Health', 'environmental-population-health', 'Wildlife health, aquaculture, and public health.', 60)
ON CONFLICT (slug) DO NOTHING;

-- Seed Data for some Subjects
INSERT INTO public.subjects (id, area_id, name, slug, description, sort_order) VALUES 
-- Basic Science Subjects
('77777777-7777-7777-7777-777777777771', '11111111-1111-1111-1111-111111111111', 'Anatomy', 'anatomy', 'Structure of animal bodies.', 10),
('77777777-7777-7777-7777-777777777772', '11111111-1111-1111-1111-111111111111', 'Physiology', 'physiology', 'Functions and mechanisms in a living system.', 20),
-- Animal Science Subjects
('77777777-7777-7777-7777-777777777773', '22222222-2222-2222-2222-222222222222', 'Animal Nutrition', 'animal-nutrition', 'Dietary needs of animals.', 10),
-- Disease Science Subjects
('77777777-7777-7777-7777-777777777774', '33333333-3333-3333-3333-333333333333', 'General Pathology', 'general-pathology', 'Basic disease processes.', 10),
-- Clinical Science Subjects
('77777777-7777-7777-7777-777777777775', '44444444-4444-4444-4444-444444444444', 'Companion Animal Medicine & Surgery', 'companion-animal-medicine-surgery', 'Health care for pets.', 10)
ON CONFLICT (slug) DO NOTHING;
