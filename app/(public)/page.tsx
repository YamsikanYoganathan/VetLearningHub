import React from "react";
import Link from "next/link";
import { Search, ArrowRight, BookOpen } from "lucide-react";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { NoteRow } from "@/components/ui/NoteRow";
import { getAcademicAreas, getRecentNotes } from "@/lib/supabase/queries";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Vetulan Service | Veterinary Knowledge Platform",
  description: "A premium clinical knowledge base for veterinary professionals.",
};

export default async function HomePage() {
  const areas = await getAcademicAreas();
  const recentNotes = await getRecentNotes(4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-surface border-b border-border-subtle pt-24 pb-20 md:pt-32 md:pb-28 px-4 relative overflow-hidden">
        <div className="container-page relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-tight mb-8 shadow-sm">
            <BookOpen className="w-4 h-4" />
            <span>Veterinary Clinical Knowledge</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-6 leading-tight">
            Evidence-based veterinary medicine, <span className="text-primary">simplified.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            The definitive clinical reference for veterinary professionals. Fast, accurate protocols and academic references designed for point-of-care decision making.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 text-base shadow-md">
              <Link href="/subjects">Browse Subjects</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-background/50 backdrop-blur">
              <Link href="/search">
                <Search className="w-4 h-4 mr-2" />
                Search Protocols
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-surface via-transparent to-surface pointer-events-none"></div>
      </section>

      {/* Academic Areas Section */}
      <section className="py-20 px-4 bg-background">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">Academic Areas</h2>
              <p className="text-muted-foreground">Comprehensive coverage across all veterinary disciplines.</p>
            </div>
            <Link 
              href="/subjects" 
              className="group inline-flex items-center text-sm font-semibold text-primary hover:underline underline-offset-4 transition-all"
            >
              View all directory
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {areas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areas.map((area) => (
                <SubjectCard
                  key={area.id}
                  title={area.name}
                  description={area.description || ""}
                  icon="Layers" // Fallback icon, could map based on slug
                  href={`/subjects/${area.slug}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-border-subtle border-dashed rounded-xl text-muted-foreground">
              No academic areas found. Please check database connectivity.
            </div>
          )}
        </div>
      </section>

      {/* Recent Notes Section */}
      <section className="py-20 px-4 bg-surface border-t border-border-subtle">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">Recently Published</h2>
              <p className="text-muted-foreground">The latest protocols and clinical references added to Vetulan.</p>
            </div>
          </div>
          
          {recentNotes.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentNotes.map((note) => {
                const topic = Array.isArray(note.topics) ? note.topics[0] : note.topics;
                const subject = topic && Array.isArray(topic.subjects) ? topic.subjects[0] : topic?.subjects;
                
                return (
                  <NoteRow
                    key={note.id}
                    title={note.title}
                    snippet={note.short_description || "No description available."}
                    subSection={topic?.name}
                    subjectSlug={subject?.slug || "general"}
                    slug={note.slug}
                    status={note.status as "draft" | "published"}
                    date={new Date(note.published_at || note.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-border-subtle border-dashed rounded-xl text-muted-foreground">
              No recently published notes found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
