import React from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  BookOpen,
  Layers,
  FileText,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { NoteRow } from "@/components/ui/NoteRow";
import { HeroDocumentStack } from "@/components/ui/HeroDocumentStack";
import { AtmosphericBackground } from "@/components/ui/AtmosphericBackground";
import { CurriculumHierarchy } from "@/components/ui/CurriculumHierarchy";
import {
  getAcademicAreas,
  getRecentNotes,
  getPlatformCounts,
} from "@/lib/supabase/queries";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Vetulan Service | Veterinary Academic Knowledge Platform",
  description:
    "A structured clinical knowledge platform and academic study reference for veterinary medicine, surgery, and pharmacology.",
};

export default async function HomePage() {
  const [areas, recentNotes, counts] = await Promise.all([
    getAcademicAreas(),
    getRecentNotes(4),
    getPlatformCounts(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vetulan Service",
    url: "https://www.vetulanservice.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.vetulanservice.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section — Editorial Composition with 3D Depth Stack & Atmospheric Glow */}
      <section className="relative border-b border-slate-200/80 bg-white overflow-hidden py-16 sm:py-20 lg:py-24">
        {/* Atmospheric Blurred Glow & Subtle Geometric Motifs */}
        <AtmosphericBackground variant="hero" />

        {/* Subtle grid background overlay */}
        <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />

        <div className="container-page relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Editorial Headline & Search */}
            <div className="lg:col-span-7 space-y-7">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-semibold tracking-tight shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                <span>Veterinary Academic Knowledge Platform</span>
              </div>

              {/* Large Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] text-balance">
                A clearer way to study veterinary medicine.
              </h1>

              {/* Supporting Statement */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed text-balance">
                An authoritative, clinical reference library and curriculum syllabus organized across disciplines, core subjects, and structured diagnostic notes.
              </p>

              {/* Prominent Search Action Bar (Onboarding Step Target) */}
              <div id="tour-search-target" className="max-w-xl">
                <Link
                  href="/search"
                  className="flex items-center justify-between w-full h-12 px-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all duration-150 group text-left"
                >
                  <div className="flex items-center gap-3 text-slate-500">
                    <Search className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                    <span className="text-xs sm:text-sm font-normal text-slate-500 group-hover:text-slate-800">
                      Search by topic, disease, drug, or clinical sign...
                    </span>
                  </div>
                  <kbd className="hidden sm:inline-flex text-[10px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                    /
                  </kbd>
                </Link>
              </div>

              {/* Integrated Platform Metadata */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-semibold text-slate-800">{counts.areasCount}</span>
                  <span>Academic Areas</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                  <span className="font-semibold text-slate-800">{counts.subjectsCount}</span>
                  <span>Subjects</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span className="font-semibold text-slate-800">{counts.topicsCount}</span>
                  <span>Topics</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-800">{counts.notesCount}</span>
                  <span>Published Notes</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Depth Document Stack */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroDocumentStack />
            </div>
          </div>
        </div>
      </section>

      {/* Academic Areas Section (Onboarding Step Target) */}
      <section id="tour-academic-areas-target" className="relative py-16 sm:py-20 bg-slate-50/50 border-b border-slate-200/80">
        <AtmosphericBackground variant="subtle" />
        <div className="container-page relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200/80">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Knowledge Structure</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Academic Disciplines
              </h2>
            </div>
            <Link
              href="/subjects"
              className="group inline-flex items-center text-xs sm:text-sm font-semibold text-primary hover:underline underline-offset-4 transition-all"
            >
              <span>Explore complete syllabus</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {areas && areas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {areas.map((area, idx) => (
                <SubjectCard
                  key={area.id}
                  title={area.name}
                  description={
                    area.description ||
                    "Core veterinary disciplines, structured study modules, and clinical notes."
                  }
                  href={`/subjects/${area.slug}`}
                  indexNumber={idx + 1}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-slate-200 border-dashed rounded-xl bg-white text-slate-500 text-sm">
              Academic areas are currently being updated.
            </div>
          )}
        </div>
      </section>

      {/* Recently Published Notes (Onboarding Step Target) */}
      <section id="tour-recent-notes-target" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-200/80">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700 mb-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Feed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Recently Published Notes
              </h2>
            </div>
            <Link
              href="/search"
              className="group inline-flex items-center text-xs sm:text-sm font-semibold text-primary hover:underline underline-offset-4 transition-all"
            >
              <span>Search full index</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {recentNotes && recentNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {recentNotes.map((note) => {
                const topic = Array.isArray(note.topics)
                  ? note.topics[0]
                  : note.topics;
                const subject =
                  topic && Array.isArray(topic.subjects)
                    ? topic.subjects[0]
                    : topic?.subjects;

                return (
                  <NoteRow
                    key={note.id}
                    title={note.title}
                    snippet={
                      note.short_description ||
                      "Detailed clinical protocols, diagnostic criteria, and management guidelines."
                    }
                    subSection={topic?.name}
                    subjectSlug={subject?.slug}
                    slug={note.slug}
                    readingTime={note.reading_time || 5}
                    status={note.status as any}
                    date={new Date(
                      note.published_at || note.created_at
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-slate-200 border-dashed rounded-xl bg-slate-50 text-slate-500 text-sm">
              No published notes available yet.
            </div>
          )}
        </div>
      </section>

      {/* How Vetulan Works / Platform Organization */}
      <section id="tour-structure-target" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200/60">
        <div className="container-page max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Intelligent Learning Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Vetulan organizes complex veterinary medicine into a progressive 4-tier hierarchy for clear discoverability and sequential mastery.
            </p>
          </div>

          <CurriculumHierarchy />
        </div>
      </section>
    </div>
  );
}
