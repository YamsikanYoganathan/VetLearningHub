import React from "react";
import { SubjectCard } from "@/components/ui/SubjectCard";
import { Search, Activity, BookOpen, Layers, Award, CheckCircle2, ShieldCheck, Stethoscope, Folder } from "lucide-react";

export default function PublicHomePage() {
  // Task 3: Exact 5 production veterinary subjects and descriptions
  const mockedSubjects = [
    {
      title: "Canine Anatomy & Surgery",
      description: "Comprehensive structural anatomy references, surgical approach landmarks, and orthopaedic joint stabilization algorithms.",
      noteCount: 18,
      icon: "Dog",
      badgeVariant: "sky" as const,
      slug: "canine-anatomy",
    },
    {
      title: "Feline Internal Medicine",
      description: "Diagnostic protocols and treatment modalities for feline-specific endocrine, renal, and gastrointestinal pathologies.",
      noteCount: 14,
      icon: "Cat",
      badgeVariant: "sky" as const,
      slug: "feline-internal-medicine",
    },
    {
      title: "Clinical Pharmacology",
      description: "Dosage calculations, contraindications, and mechanism of action for common veterinary therapeutics.",
      noteCount: 24,
      icon: "Pill",
      badgeVariant: "sky" as const,
      slug: "clinical-pharmacology",
    },
    {
      title: "Equine Lameness & Orthopedics",
      description: "Diagnostic nerve block mapping, joint injection techniques, and radiographic interpretation of the equine distal limb.",
      noteCount: 12,
      icon: "Bone",
      badgeVariant: "sky" as const,
      slug: "equine-orthopedics",
    },
    {
      title: "Emergency & Critical Care",
      description: "Triage protocols, fluid therapy calculations, and resuscitation algorithms for acute trauma and toxicological emergencies.",
      noteCount: 21,
      icon: "ShieldAlert",
      badgeVariant: "sky" as const,
      slug: "emergency-critical-care",
    },
  ];

  return (
    <div className="bg-slate-50 flex flex-col font-sans">
      {/* Hero Section: Generous whitespace py-16 sm:py-24, normal tracking, sky-600 palette per Task 1, 2, 3 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 sm:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-sans font-semibold uppercase tracking-normal mb-8 shadow-sm">
            <Activity className="w-3.5 h-3.5" />
            <span>Evidence-Based Clinical Reference</span>
          </div>

          {/* H1: Exact production text, normal tracking per Task 1 & 3 */}
          <h1 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-normal leading-[1.12] mb-6 max-w-4xl mx-auto">
            Veterinary Medicine, Mastered.
          </h1>

          {/* Subheading: Exact production text, leading-[1.4] mb-6 per Task 1 & 3 */}
          <p className="font-serif text-base sm:text-xl text-slate-600 leading-[1.4] mb-10 max-w-2xl mx-auto">
            The definitive, clinical knowledge base for veterinary students and professionals. Access streamlined protocols, anatomical references, and pharmacological data instantly.
          </p>

          {/* Functional Search Form routing to /search?q=query */}
          <form action="/search" method="GET" className="max-w-2xl mx-auto">
            <div className="relative shadow-sm rounded-2xl bg-white border border-slate-200 ring-1 ring-slate-900/5 hover:border-sky-600 hover:ring-sky-600/20 transition-all duration-200 p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="pl-3.5 text-slate-400 hidden sm:flex items-center pointer-events-none">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="q"
                required
                placeholder="Search notes... (e.g., Canine Valvular Disease, Feline T4)"
                className="w-full py-3 px-3 text-slate-900 placeholder-slate-400 font-sans text-sm sm:text-base bg-transparent focus:outline-none tracking-normal"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-sans font-bold text-sm sm:text-base rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap tracking-normal"
              >
                <Search className="w-4 h-4 sm:hidden" />
                <span>Search Notes</span>
              </button>
            </div>
            <p className="font-serif text-xs text-slate-400 mt-3 mb-0 text-center leading-[1.4]">
              Enter any clinical symptom, drug formulary name, or anatomical structure to query the knowledge base.
            </p>
          </form>
        </div>
      </section>

      {/* Subjects Section: Generous whitespace py-16 sm:py-24, grid gap-8 per Task 1 */}
      <section id="subjects" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6">
            <div>
              <span className="text-xs font-sans font-bold text-sky-600 uppercase tracking-normal block mb-2">
                Specialized Disciplines
              </span>
              <h2 className="font-sans font-bold text-2xl sm:text-4xl text-slate-900 tracking-normal">
                Explore Clinical Subjects
              </h2>
            </div>
            <p className="font-serif text-sm sm:text-base text-slate-600 max-w-md mt-2 md:mt-0 leading-[1.4] mb-0">
              Select a clinical discipline to explore structured diagnostic pathways, surgical anatomy references, and therapeutic formularies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockedSubjects.map((subject) => (
              <SubjectCard
                key={subject.title}
                title={subject.title}
                description={subject.description}
                noteCount={subject.noteCount}
                icon={subject.icon}
                badgeVariant={subject.badgeVariant}
                href={`/subjects/${subject.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Task 3: "About the Platform" Section with generous whitespace py-16 sm:py-24, gap-8 */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-sans font-bold uppercase tracking-normal">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Dedicated Clinical Architecture</span>
              </div>
              <h2 className="font-sans font-bold text-2xl sm:text-4xl text-slate-900 tracking-normal leading-tight">
                Built for Clinical Excellence
              </h2>
              {/* Exact production text with leading-[1.4] mb-6 per Task 1 & 3 */}
              <p className="font-serif text-base sm:text-lg text-slate-600 leading-[1.4] mb-6">
                Veterinary medicine requires precise, rapid recall of complex biological systems and treatment protocols. This knowledge base is meticulously structured to cut through textbook density, delivering high-yield, peer-reviewed clinical data exactly when you need it—whether in the lecture hall or on the clinic floor.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-4 font-sans">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 flex-1 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-sky-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-sm text-slate-900 block tracking-normal">RLS Protected</span>
                    <span className="text-xs text-slate-500 font-serif leading-[1.4]">Verified Supabase security</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 flex-1 shadow-sm">
                  <Award className="w-6 h-6 text-sky-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-sm text-slate-900 block tracking-normal">Evidence-Based</span>
                    <span className="text-xs text-slate-500 font-serif leading-[1.4]">Regional formulary standards</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white shadow-sm space-y-6">
                <span className="text-xs font-sans font-bold text-sky-400 uppercase tracking-normal block">
                  Clinical Mission Statement
                </span>
                <blockquote className="font-serif text-lg sm:text-2xl leading-[1.4] italic text-slate-100 mb-6">
                  &ldquo;Our goal is to eliminate cognitive friction in veterinary practice. By combining modern clinical typography with high-legibility reading layouts, we ensure clinicians can retrieve critical dosages and surgical landmarks in seconds.&rdquo;
                </blockquote>
                <div className="pt-4 border-t border-slate-700/80 flex items-center justify-between font-sans tracking-normal">
                  <div>
                    <span className="font-bold text-sm text-white block">Veterinary Editorial Board</span>
                    <span className="text-xs text-sky-300">Small Animal & Equine Specializations</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-sky-600/30 border border-sky-500/50 flex items-center justify-center font-bold text-sky-300">
                    VLH
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task 3: "How to Use This Hub" Section with py-16 sm:py-24, gap-8 */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-sans font-bold text-sky-600 uppercase tracking-normal block mb-2">
              Streamlined Workflow
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-4xl text-slate-900 tracking-normal">
              How to Use This Hub
            </h2>
            <p className="font-serif text-base sm:text-lg text-slate-600 mt-4 leading-[1.4] mb-0">
              Designed for high-pressure clinical environments. Master veterinary protocols in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 - Search icon */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm relative flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-sm">
                  <Search className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-sans font-bold text-xs uppercase tracking-normal">
                  Step 01
                </div>
                <h3 className="font-sans font-bold text-lg sm:text-xl text-slate-900 tracking-normal">
                  Query the Database
                </h3>
                <p className="font-serif text-slate-600 leading-[1.4] text-sm sm:text-base mb-6">
                  Use the global search to instantly locate specific diseases, anatomical structures, or drug formularies.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-sans font-semibold text-sky-600 tracking-normal">
                <CheckCircle2 className="w-4 h-4" />
                <span>Instant keyword indexing</span>
              </div>
            </div>

            {/* Step 2 - Folder icon */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm relative flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-sm">
                  <Folder className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-sans font-bold text-xs uppercase tracking-normal">
                  Step 02
                </div>
                <h3 className="font-sans font-bold text-lg sm:text-xl text-slate-900 tracking-normal">
                  Navigate Specialties
                </h3>
                <p className="font-serif text-slate-600 leading-[1.4] text-sm sm:text-base mb-6">
                  Browse deeply categorized clinical disciplines, from small animal internal medicine to equine orthopedics.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-sans font-semibold text-sky-600 tracking-normal">
                <CheckCircle2 className="w-4 h-4" />
                <span>Structured anatomical hierarchy</span>
              </div>
            </div>

            {/* Step 3 - BookOpen icon */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm relative flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-sm">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="inline-block px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-sans font-bold text-xs uppercase tracking-normal">
                  Step 03
                </div>
                <h3 className="font-sans font-bold text-lg sm:text-xl text-slate-900 tracking-normal">
                  Review & Apply
                </h3>
                <p className="font-serif text-slate-600 leading-[1.4] text-sm sm:text-base mb-6">
                  Study high-contrast, distraction-free clinical notes structured for rapid comprehension and immediate practical application.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-sans font-semibold text-sky-600 tracking-normal">
                <CheckCircle2 className="w-4 h-4" />
                <span>Peer-reviewed clinical rigor</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
