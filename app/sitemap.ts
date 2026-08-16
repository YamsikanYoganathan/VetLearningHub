import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  
  // Base URL
  const baseUrl = 'https://www.vetulanservice.com'
  
  // 1. Static Routes
  const staticRoutes = ['', '/about', '/contact', '/privacy', '/terms', '/subjects', '/search'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))
  
  // 2. Academic Areas
  const { data: areas } = await supabase.from('academic_areas').select('slug, updated_at')
  const areaRoutes = (areas || []).map(area => ({
    url: `${baseUrl}/subjects/${area.slug}`,
    lastModified: new Date(area.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // 3. Subjects
  const { data: subjects } = await supabase.from('subjects').select('slug, updated_at, academic_areas!inner(slug)')
  const subjectRoutes = (subjects || []).map(subject => ({
    url: `${baseUrl}/subjects/${(subject.academic_areas as any).slug}/${subject.slug}`,
    lastModified: new Date(subject.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // 4. Topics
  const { data: topics } = await supabase.from('topics').select('slug, updated_at, subjects!inner(slug, academic_areas!inner(slug))')
  const topicRoutes = (topics || []).map(topic => {
    const s = topic.subjects as any
    const a = s.academic_areas as any
    return {
      url: `${baseUrl}/subjects/${a.slug}/${s.slug}/${topic.slug}`,
      lastModified: new Date(topic.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }
  })
  
  // 5. Published Notes
  const { data: notes } = await supabase
    .from('notes')
    .select('slug, updated_at')
    .eq('status', 'published')
    
  const noteRoutes = (notes || []).map(note => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: new Date(note.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.9, // Notes are very important
  }))
  
  return [
    ...staticRoutes,
    ...areaRoutes,
    ...subjectRoutes,
    ...topicRoutes,
    ...noteRoutes,
  ]
}
