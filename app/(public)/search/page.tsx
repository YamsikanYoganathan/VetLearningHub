import React from "react";
import Link from "next/link";
import { ArrowLeft, Search, BookOpen, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export default function SearchResultsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  // Production notes matching query per Task 3 & 4
  const allNotes = [
    {
      title: "Cruciate Ligament Rupture (TPLO Approach)",
      snippet: "Detailed surgical approach for tibial plateau leveling osteotomy, anatomical landmarks, and post-operative joint stabilization.",
      readingTime: "8 min read",
      slug: "tplo-approach",
      subjectSlug: "canine-anatomy",
      subjectTitle: "Canine Anatomy & Surgery",
      subSection: "Stifle & Hindlimb Orthopedics",
      status: "published" as const,
    },
    {
      title: "Feline Chronic Kidney Disease (IRIS Staging)",
      snippet: "Diagnostic algorithms for staging chronic renal insufficiency, proteinuria assessment, and therapeutic dietary titration.",
      readingTime: "6 min read",
      slug: "iris-staging",
      subjectSlug: "feline-internal-medicine",
      subjectTitle: "Feline Internal Medicine",
      subSection: "Renal & Endocrine Pathologies",
      status: "published" as const,
    },
    {
      title: "Dexmedetomidine CRIs",
      snippet: "Continuous rate infusion calculations, alpha-2 agonist receptor physiology, and cardiovascular monitoring during sedation.",
      readingTime: "10 min read",
      slug: "dexmedetomidine-cris",
      subjectSlug: "clinical-pharmacology",
      subjectTitle: "Clinical Pharmacology",
      subSection: "Sedation & Analgesia Protocols",
      status: "published" as const,
    },
    {
      title: "Diagnostic Abaxial Sesamoid Nerve Block Mapping",
      snippet: "Step-by-step equine orthopedic nerve block technique for isolating distal limb lameness and synovial structures.",
      readingTime: "7 min read",
      slug: "sesamoid-nerve-block",
      subjectSlug: "equine-orthopedics",
      subjectTitle: "Equine Lameness & Orthopedics",
      subSection: "Diagnostic Nerve Blocks",
      status: "published" as const,
    },
    {
      title: "Acute GDV Triage & Resuscitation Algorithm",
      snippet: "Emergency stabilization, shock fluid resuscitation therapy, and gastric decompression protocols for gastric dilatation-volvulus.",
      readingTime: "9 min read",
      slug: "gdv-triage",
      subjectSlug: "emergency-critical-care",
      subjectTitle: "Emergency & Critical Care",
      subSection: "Shock & Trauma Triage",
      status: "published" as const,
    },
  ];

  const filteredResults = query
    ? allNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.snippet.toLowerCase().includes(query.toLowerCase()) ||
          note.subSection.toLowerCase().includes(query.toLowerCase()) ||
          note.subjectTitle.toLowerCase().includes(query.toLowerCase())
      )
    : allNotes;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 font-sans">
      {/* Back navigation */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-sans font-semibold text-slate-500 hover:text-sky-600 transition-colors tracking-normal"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Search Header */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-sans font-bold text-sky-600 uppercase tracking-normal block mb-1">
              Knowledge Base Search
            </span>
            <h1 className="font-sans font-bold text-3xl sm:text-4xl text-slate-900 tracking-normal">
              {query ? `Results for "${query}"` : "All Clinical Protocols"}
            </h1>
          </div>
          <Badge variant="sky">{filteredResults.length} Protocols Found</Badge>
        </div>

        {/* Search Refinement Form */}
        <form action="/search" method="GET" className="relative">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Refine search query..."
            className="w-full pl-11 pr-32 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 tracking-normal"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 px-5 bg-sky-600 hover:bg-sky-700 text-white font-sans font-semibold text-xs rounded-lg transition-colors tracking-normal"
          >
            Search
          </button>
        </form>
      </div>

      {/* Search Results List */}
      <div className="space-y-4">
        <h2 className="font-sans font-bold text-lg text-slate-900 px-1 tracking-normal">
          Matching Protocols & Sub-sections
        </h2>

        {filteredResults.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-sans font-bold text-lg text-slate-900 tracking-normal mb-2">No matching clinical notes found</h3>
            <p className="font-serif text-slate-600 max-w-md mx-auto leading-[1.4] mb-6">
              We could not find any protocols matching &ldquo;{query}&rdquo;. Try searching for broader terms like &ldquo;Canine&rdquo;, &ldquo;Feline&rdquo;, &ldquo;Pharmacology&rdquo;, or &ldquo;TPLO&rdquo;.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-sans font-semibold text-xs rounded-xl transition-colors tracking-normal"
            >
              Browse All Disciplines
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((note) => (
              <Link
                key={note.slug}
                href={`/subjects/${note.subjectSlug}/${note.slug}`}
                className="group block p-6 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-sky-600/40 transition-all duration-150 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <Badge variant="sky">{note.subjectTitle}</Badge>
                      <span className="text-xs font-sans font-semibold bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full tracking-normal border border-sky-200">
                        Sub-section: {note.subSection}
                      </span>
                    </div>
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-slate-900 group-hover:text-sky-600 transition-colors tracking-normal">
                      {note.title}
                    </h3>
                    <p className="font-serif text-base text-slate-600 leading-[1.4] mb-0">
                      {note.snippet}
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between self-stretch sm:self-center flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs font-sans font-medium text-slate-400 tracking-normal">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{note.readingTime}</span>
                    </div>
                    <div className="text-sky-600 font-sans font-semibold text-xs flex items-center gap-1 group-hover:translate-x-1 transition-transform tracking-normal">
                      <span>Read Protocol</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
