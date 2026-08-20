import React from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  BookOpen,
  Layers,
  FileText,
  Sparkles,
} from "lucide-react";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { NoteRow } from "@/components/ui/NoteRow";
import { HeroDocumentStack } from "@/components/ui/HeroDocumentStack";
import { AtmosphericBackground } from "@/components/ui/AtmosphericBackground";
import { CurriculumHierarchy } from "@/components/ui/CurriculumHierarchy";
import { QuickStudyEntry } from "@/components/ui/QuickStudyEntry";
import { HowVetulanWorks } from "@/components/ui/HowVetulanWorks";
import { WhatYouCanFind } from "@/components/ui/WhatYouCanFind";
import {
  getAcademicAreas,
  getRecentNotes,
  getPlatformCounts,
} from "@/lib/supabase/queries";

export const revalidate = 60; // 1-minute ISR cache

export default async function HomePage() {
  const [areas, recentNotes, counts] = await Promise.all([
    getAcademicAreas(),
    getRecentNotes(6),
    getPlatformCounts(),
  ]);

  return (
    <div className="relative overflow-hidden bg-background bg-atmosphere">
      {/* 1. Full-Height Editorial Hero Section (~85vh min-height) */}
      <section className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center pt-8 pb-16 lg:py-20 overflow-hidden">
        <AtmosphericBackground variant="hero" />

        <div className="container-page relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Clinical Platform Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-subtle border border-primary/20 text-primary text-xs font-bold tracking-wide shadow-2xs mb-3">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] sm:text-xs">VETERINARY ACADEMIC CURRICULUM & CLINICAL REFERENCE</span>
              </div>

              {/* Editorial Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12] text-balance mb-4">
                The authoritative knowledge platform for veterinary medicine.
              </h1>

              {/* Sub-Headline / Supporting Statement */}
              <p className="text-base sm:text-lg text-text-secondary font-normal leading-relaxed max-w-2xl text-balance">
                Structured clinical notes, curated diagnostic algorithms, and complete veterinary academic disciplines — organized sequentially for focused study.
              </p>

              {/* Primary CTA */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/subjects"
                  className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-hover font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Syllabus</span>
                </Link>
              </div>

              {/* Integrated Hero Search Trigger */}
              <div id="tour-search-target" className="pt-2 max-w-xl space-y-3">
                <Link
                  href="/search"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-border/80 bg-white/90 backdrop-blur-md shadow-2xs hover:border-sky-300 hover:shadow-xs transition-all duration-150 group"
                  aria-label="Search notes index"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-primary transition-colors" />
                    <span className="text-xs sm:text-sm font-normal text-muted-foreground group-hover:text-foreground">
                      Search by topic, disease, drug, or clinical sign...
                    </span>
                  </div>
                  <kbd className="hidden sm:inline-flex text-[10px] font-semibold text-muted-foreground bg-surface-subtle px-2 py-0.5 rounded border border-border shadow-2xs">
                    /
                  </kbd>
                </Link>

                {/* Quick Topic Search Chips */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-muted-foreground">Popular topics:</span>
                  {["Pancreatitis", "Cranial Cruciate", "Formulary", "Fluid Therapy"].map((term) => (
                    <Link
                      key={term}
                      href={`/search?q=${encodeURIComponent(term)}`}
                      className="px-2.5 py-1 rounded-lg bg-white border border-border/80 text-text-secondary hover:text-primary hover:border-sky-300 transition-colors shadow-2xs font-medium"
                    >
                      {term}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Integrated Platform Metadata Counters */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-text-secondary border-t border-border/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-bold text-foreground">{counts.areasCount}</span>
                  <span>Disciplines</span>
                </div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="font-bold text-foreground">{counts.subjectsCount}</span>
                  <span>Subjects</span>
                </div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="font-bold text-foreground">{counts.topicsCount}</span>
                  <span>Topic Modules</span>
                </div>
                <span className="text-border">•</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-foreground">{counts.notesCount}</span>
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

      {/* 2. Quick Study Access Bar */}
      <QuickStudyEntry />

      {/* 3. Academic Disciplines Section */}
      <section id="tour-academic-areas-target" className="relative py-16 sm:py-20">
        <div className="container-page relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-border/80">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-primary-subtle px-3 py-1 rounded-full border border-primary/20 mb-2.5 shadow-2xs">
                <Layers className="w-3.5 h-3.5" />
                <span>Knowledge Structure</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
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
            <div className="text-center py-12 border border-border border-dashed rounded-2xl bg-white text-text-secondary text-sm">
              Academic areas are currently being updated.
            </div>
          )}
        </div>
      </section>

      {/* 4. How Vetulan Works: 4-Step Learning Path */}
      <HowVetulanWorks />

      {/* 5. What You Can Find Here: Platform Resource Capabilities */}
      <WhatYouCanFind />

      {/* 6. Recently Published Notes */}
      <section id="recent-notes" className="py-16 sm:py-20 scroll-mt-16">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 pb-5 border-b border-border/80">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-subtle px-3 py-1 rounded-full border border-secondary/20 mb-2.5 shadow-2xs">
                <FileText className="w-3.5 h-3.5" />
                <span>Curriculum Feed</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentNotes.map((note, idx) => {
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
                    isFeatured={idx === 0}
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
            <div className="text-center py-12 border border-border border-dashed rounded-2xl bg-white text-text-secondary text-sm">
              No published notes available yet.
            </div>
          )}
        </div>
      </section>

      {/* 7. Intelligent Learning Architecture (Curriculum Hierarchy) */}
      <section id="tour-structure-target" className="py-16 sm:py-20">
        <div className="container-page max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-3">
              Intelligent Learning Architecture
            </h2>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
              Vetulan organizes complex veterinary medicine into a progressive 4-tier hierarchy for clear discoverability and sequential mastery.
            </p>
          </div>

          <CurriculumHierarchy />
        </div>
      </section>

      {/* 8. Strong Final Call to Action with Noticeable Blue/Teal Atmosphere */}
      <section className="py-16 sm:py-20 relative w-full">
        <div className="container-page">
          <div className="relative rounded-2xl border border-sky-200/80 bg-gradient-to-br from-white via-sky-50/60 to-teal-50/40 p-8 sm:p-14 lg:p-16 text-center max-w-7xl mx-auto shadow-md overflow-hidden">
            <AtmosphericBackground variant="cta" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/20 text-primary text-xs font-bold shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Begin Your Study Session</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight max-w-xl mx-auto leading-tight">
                Everything you need to master your veterinary curriculum.
              </h2>

              <p className="text-sm sm:text-base text-text-secondary max-w-lg mx-auto leading-relaxed">
                Explore comprehensive academic disciplines or instantly search clinical notes, surgical protocols, and pharmacology matrices.
              </p>

              <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
                <Link
                  href="/subjects"
                  className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-hover font-semibold text-xs sm:text-sm shadow-sm transition-all active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Syllabus</span>
                </Link>

                <Link
                  href="/search"
                  className="px-6 py-3 rounded-xl bg-white border border-border text-foreground hover:bg-surface-subtle hover:border-sky-300 font-semibold text-xs sm:text-sm shadow-2xs transition-all active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <Search className="w-4 h-4 text-primary" />
                  <span>Search Knowledge Base</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
