import React from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  BookOpen,
  Layers,
  FileText,
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
    <div className="relative overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 border-b border-slate-200/80 overflow-hidden">
        <AtmosphericBackground variant="hero" />

        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Clinical Platform Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-primary text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span>Veterinary Academic Curriculum & Reference Platform</span>
              </div>

              {/* Editorial Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] text-balance">
                The authoritative knowledge platform for veterinary medicine.
              </h1>

              {/* Sub-Headline / Supporting Statement */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl text-balance">
                Structured clinical notes, curated diagnostic algorithms, and complete veterinary academic disciplines — organized sequentially for focused study.
              </p>

              {/* Integrated Hero Search Trigger */}
              <div id="tour-search-target" className="pt-2 max-w-xl">
                <Link
                  href="/search"
                  className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-150 group"
                  aria-label="Search notes index"
                >
                  <div className="flex items-center gap-3">
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

      {/* 2. Quick Study Entry Bar */}
      <QuickStudyEntry />

      {/* 3. Academic Areas Section */}
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

      {/* 4. How Vetulan Works: 4-Step Learning Path */}
      <HowVetulanWorks />

      {/* 5. What You Can Find Here: Platform Resource Capabilities */}
      <WhatYouCanFind />

      {/* 6. Recently Published Notes */}
      <section id="recent-notes" className="py-16 sm:py-20 bg-white border-b border-slate-200/80 scroll-mt-16">
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

      {/* 7. Intelligent Learning Architecture (Curriculum Hierarchy) */}
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
