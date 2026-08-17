-- 0008_advanced_search.sql

-- 1. Add fts column to notes for native GIN indexing of the note's immediate metadata
ALTER TABLE public.notes 
ADD COLUMN IF NOT EXISTS fts tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(short_description, '')), 'C')
) STORED;

-- 2. Create GIN Index
CREATE INDEX IF NOT EXISTS idx_notes_fts ON public.notes USING GIN (fts);

-- 3. Create the Search RPC
CREATE OR REPLACE FUNCTION search_published_notes(
    search_query text,
    filter_area text DEFAULT NULL,
    filter_subject text DEFAULT NULL,
    filter_topic text DEFAULT NULL,
    page_size int DEFAULT 20,
    page_number int DEFAULT 1
)
RETURNS TABLE (
    id uuid,
    title text,
    slug text,
    short_description text,
    reading_time int,
    updated_at timestamptz,
    published_at timestamptz,
    topic_name text,
    topic_slug text,
    subject_name text,
    subject_slug text,
    area_name text,
    area_slug text,
    rank float4,
    total_count bigint
)
LANGUAGE plpgsql
AS $$
DECLARE
    ts_query tsquery := websearch_to_tsquery('english', search_query);
    query_is_empty boolean := search_query IS NULL OR trim(search_query) = '';
BEGIN
    RETURN QUERY
    WITH note_tags_agg AS (
        SELECT nt.note_id, string_agg(tag.name, ' ') as tags_text
        FROM public.note_tags nt
        JOIN public.tags tag ON nt.tag_id = tag.id
        GROUP BY nt.note_id
    ),
    search_matches AS (
        SELECT 
            n.id,
            n.title,
            n.slug,
            n.short_description,
            n.reading_time,
            n.updated_at,
            n.published_at,
            t.name as topic_name,
            t.slug as topic_slug,
            s.name as subject_name,
            s.slug as subject_slug,
            a.name as area_name,
            a.slug as area_slug,
            -- Combine pre-computed GIN vector (fts) with on-the-fly category/tag vector
            -- Categories = Weight B, Tags = Weight D
            n.fts ||
            setweight(to_tsvector('english', coalesce(t.name, '') || ' ' || coalesce(s.name, '') || ' ' || coalesce(a.name, '')), 'B') ||
            setweight(to_tsvector('english', coalesce(nta.tags_text, '')), 'D') as full_vector
        FROM public.notes n
        INNER JOIN public.topics t ON n.topic_id = t.id
        INNER JOIN public.subjects s ON t.subject_id = s.id
        INNER JOIN public.academic_areas a ON s.area_id = a.id
        LEFT JOIN note_tags_agg nta ON n.id = nta.note_id
        WHERE n.status = 'published'
          AND t.is_active = true
          AND s.is_active = true
          AND a.is_active = true
          AND (filter_area IS NULL OR filter_area = '' OR a.slug = filter_area)
          AND (filter_subject IS NULL OR filter_subject = '' OR s.slug = filter_subject)
          AND (filter_topic IS NULL OR filter_topic = '' OR t.slug = filter_topic)
    ),
    filtered_matches AS (
        SELECT 
            sm.*,
            CASE 
                WHEN query_is_empty THEN 0.0::float4
                ELSE ts_rank(sm.full_vector, ts_query)::float4 
            END as rank
        FROM search_matches sm
        WHERE query_is_empty OR sm.full_vector @@ ts_query
    ),
    total_count_cte AS (
        SELECT count(*) as total FROM filtered_matches
    )
    SELECT 
        fm.id,
        fm.title,
        fm.slug,
        fm.short_description,
        fm.reading_time,
        fm.updated_at,
        fm.published_at,
        fm.topic_name,
        fm.topic_slug,
        fm.subject_name,
        fm.subject_slug,
        fm.area_name,
        fm.area_slug,
        fm.rank,
        (SELECT total FROM total_count_cte) as total_count
    FROM filtered_matches fm
    ORDER BY 
        fm.rank DESC, 
        fm.published_at DESC NULLS LAST
    LIMIT page_size
    OFFSET (page_number - 1) * page_size;
END;
$$;
