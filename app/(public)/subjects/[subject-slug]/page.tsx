import React from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { BookOpen, ArrowLeft, Search, Layers, ChevronDown } from "lucide-react";
import { NoteRow } from "@/components/ui/NoteRow";
import { SubjectSidebar } from "@/components/ui/SubjectSidebar";
import { Badge } from "@/components/ui/Badge";

// Helper to get subject metadata based on slug - EXACT 5 subjects per Task 3
function getSubjectBySlug(slug: string) {
  const subjectsMap: Record<string, { title: string; description: string; iconName: string; badgeVariant: "sky" | "slate" }> = {
    "canine-anatomy": {
      title: "Canine Anatomy & Surgery",
      description: "Comprehensive structural anatomy references, surgical approach landmarks, and orthopaedic joint stabilization algorithms.",
      iconName: "Dog",
      badgeVariant: "sky",
    },
    "feline-internal-medicine": {
      title: "Feline Internal Medicine",
      description: "Diagnostic protocols and treatment modalities for feline-specific endocrine, renal, and gastrointestinal pathologies.",
      iconName: "Cat",
      badgeVariant: "sky",
    },
    "feline-physiology": { // Backward compatibility mapping
      title: "Feline Internal Medicine",
      description: "Diagnostic protocols and treatment modalities for feline-specific endocrine, renal, and gastrointestinal pathologies.",
      iconName: "Cat",
      badgeVariant: "sky",
    },
    "clinical-pharmacology": {
      title: "Clinical Pharmacology",
      description: "Dosage calculations, contraindications, and mechanism of action for common veterinary therapeutics.",
      iconName: "Pill",
      badgeVariant: "sky",
    },
    "equine-orthopedics": {
      title: "Equine Lameness & Orthopedics",
      description: "Diagnostic nerve block mapping, joint injection techniques, and radiographic interpretation of the equine distal limb.",
      iconName: "Bone",
      badgeVariant: "sky",
    },
    "emergency-critical-care": {
      title: "Emergency & Critical Care",
      description: "Triage protocols, fluid therapy calculations, and resuscitation algorithms for acute trauma and toxicological emergencies.",
      iconName: "ShieldAlert",
      badgeVariant: "sky",
    },
  };

  return subjectsMap[slug] || {
    title: "Canine Anatomy & Surgery",
    description: "Comprehensive structural anatomy references, surgical approach landmarks, and orthopaedic joint stabilization algorithms.",
    iconName: "Dog",
    badgeVariant: "sky",
  };
}

export default async function SubjectDetailPage({
  params,
}: {
  params: { "subject-slug": string };
}) {
  const subjectSlug = params["subject-slug"] || "canine-anatomy";
  const subject = getSubjectBySlug(subjectSlug);

  // @ts-ignore
  const IconComponent = LucideIcons[subject.iconName] || BookOpen;

  // Production notes with real clinical titles per Task 4
  const mockedNotes = [
    {
      title: "Cruciate Ligament Rupture (TPLO Approach)",
      snippet: "Detailed surgical approach for tibial plateau leveling osteotomy, anatomical landmarks, and post-operative joint stabilization.",
      readingTime: "8 min read",
      slug: "tplo-approach",
      subSection: "Stifle & Hindlimb Orthopedics",
      status: "published" as const,
      date: "Oct 14, 2026",
    },
    {
      title: "Feline Chronic Kidney Disease (IRIS Staging)",
      snippet: "Diagnostic algorithms for staging chronic renal insufficiency, proteinuria assessment, and therapeutic dietary titration.",
      readingTime: "6 min read",
      slug: "iris-staging",
      subSection: "Renal & Endocrine Pathologies",
      status: "published" as const,
      date: "Oct 12, 2026",
    },
    {
      title: "Dexmedetomidine CRIs",
      snippet: "Continuous rate infusion calculations, alpha-2 agonist receptor physiology, and cardiovascular monitoring during sedation.",
      readingTime: "10 min read",
      slug: "dexmedetomidine-cris",
      subSection: "Sedation & Analgesia Protocols",
      status: "published" as const,
      date: "Oct 08, 2026",
    },
    {
      title: "Diagnostic Abaxial Sesamoid Nerve Block Mapping",
      snippet: "Step-by-step equine orthopedic nerve block technique for isolating distal limb lameness and synovial structures.",
      readingTime: "7 min read",
      slug: "sesamoid-nerve-block",
      subSection: "Diagnostic Nerve Blocks",
      status: "published" as const,
      date: "Oct 04, 2026",
    },
    {
      title: "Acute GDV Triage & Resuscitation Algorithm",
      snippet: "Emergency stabilization, shock fluid resuscitation therapy, and gastric decompression protocols for gastric dilatation-volvulus.",
      readingTime: "9 min read",
      slug: "gdv-triage",
      subSection: "Shock & Trauma Triage",
      status: "draft" as const,
      date: "Sep 28, 2026",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 font-sans">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors tracking-normal"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Subjects</span>
        </Link>
      </div>

      {/* Page Header: Cohesive padding, normal tracking, sky blue palette, leading-[1.4] mb-6 per Task 1 & 2 */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 w-full md:w-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 shadow-sm">
              <IconComponent className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <Badge variant={subject.badgeVariant}>Clinical Specialty</Badge>
                <span className="text-xs font-medium text-slate-400 tracking-normal">• {mockedNotes.length} Protocols</span>
              </div>
              <h1 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-normal">
                {subject.title}
              </h1>
              <p className="font-serif text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl leading-[1.4] mb-0">
                {subject.description}
              </p>
            </div>
          </div>

          <div className="w-full md:w-64 self-stretch md:self-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Filter protocols..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 tracking-normal"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible disciplines sidebar on mobile */}
      <div className="lg:hidden mb-8">
        <details className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm group">
          <summary className="flex items-center justify-between cursor-pointer font-sans font-bold text-sm text-slate-800 list-none tracking-normal">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Switch Discipline ({subject.title})</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180" />
          </summary>
          <div className="pt-4 mt-3 border-t border-slate-100">
            <SubjectSidebar currentSubjectSlug={subjectSlug} />
          </div>
        </details>
      </div>

      {/* Two-column split on desktop (1 col mobile), gap-8 per Task 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <SubjectSidebar currentSubjectSlug={subjectSlug} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-1 pb-3 border-b border-slate-200/80 gap-2">
            <h2 className="font-sans font-bold text-lg text-slate-900 flex items-center gap-2 tracking-normal">
              <span>Published Clinical Protocols</span>
              <span className="text-xs font-normal text-slate-400 tracking-normal">({mockedNotes.length} notes)</span>
            </h2>
            <div className="flex items-center gap-3 text-xs font-medium text-slate-500 tracking-normal">
              <span className="inline-flex items-center gap-1 bg-sky-50 text-sky-700 px-2.5 py-1 rounded-full border border-sky-200 tracking-normal">
                <Layers className="w-3 h-3 text-sky-600" />
                <span>Organized by Sub-section</span>
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {mockedNotes.map((note) => (
              <NoteRow
                key={note.slug}
                title={note.title}
                snippet={note.snippet}
                readingTime={note.readingTime}
                slug={note.slug}
                subjectSlug={subjectSlug}
                subSection={note.subSection}
                status={note.status}
                date={note.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
