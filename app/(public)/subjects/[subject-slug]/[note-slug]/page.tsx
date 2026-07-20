import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Bookmark, Microscope, Info, Layers, ChevronDown } from "lucide-react";
import { SubjectSidebar } from "@/components/ui/SubjectSidebar";
import { StickyTOC } from "@/components/ui/StickyTOC";
import { Badge } from "@/components/ui/Badge";

export default async function NoteReadingPage({
  params,
}: {
  params: { "subject-slug": string; "note-slug": string };
}) {
  const subjectSlug = params["subject-slug"] || "canine-anatomy";
  const noteSlug = params["note-slug"] || "tplo-approach";

  const formatTitle = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const noteTitle = noteSlug === "tplo-approach" || noteSlug === "skeletal-system"
    ? "Cruciate Ligament Rupture (TPLO Approach)"
    : noteSlug === "iris-staging"
    ? "Feline Chronic Kidney Disease (IRIS Staging)"
    : noteSlug === "dexmedetomidine-cris"
    ? "Dexmedetomidine CRIs"
    : formatTitle(noteSlug);

  const subjectTitle = subjectSlug === "canine-anatomy"
    ? "Canine Anatomy & Surgery"
    : subjectSlug === "feline-internal-medicine" || subjectSlug === "feline-physiology"
    ? "Feline Internal Medicine"
    : subjectSlug === "clinical-pharmacology"
    ? "Clinical Pharmacology"
    : subjectSlug === "equine-orthopedics"
    ? "Equine Lameness & Orthopedics"
    : "Emergency & Critical Care";

  const subSectionTitle = noteSlug === "tplo-approach" || noteSlug === "skeletal-system"
    ? "Stifle & Hindlimb Orthopedics"
    : noteSlug === "iris-staging"
    ? "Renal & Endocrine Pathologies"
    : noteSlug === "dexmedetomidine-cris"
    ? "Sedation & Analgesia Protocols"
    : "Specialized Diagnostic Pathway";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 font-sans">
      {/* Breadcrumb / Back Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/subjects/${subjectSlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition-colors tracking-normal"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {subjectTitle}</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all">
            <Bookmark className="w-4 h-4" />
          </button>
          <button type="button" className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-all">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Collapsible sidebar on mobile */}
      <div className="lg:hidden mb-6">
        <details className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm group">
          <summary className="flex items-center justify-between cursor-pointer font-sans font-bold text-sm text-slate-800 list-none tracking-normal">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Switch Discipline ({subjectTitle})</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180" />
          </summary>
          <div className="pt-4 mt-3 border-t border-slate-100">
            <SubjectSidebar currentSubjectSlug={subjectSlug} />
          </div>
        </details>
      </div>

      {/* Three-column split on desktop (1 col mobile), gap-8 per Task 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="hidden lg:block lg:col-span-3">
          <SubjectSidebar currentSubjectSlug={subjectSlug} />
        </div>

        {/* Center Column: Main reading canvas */}
        <div className="lg:col-span-6 w-full">
          <article className="bg-white rounded-xl ring-1 ring-slate-200 shadow-sm p-8 md:p-12 max-w-3xl mx-auto">
            {/* Note Metadata Header */}
            <header className="border-b border-slate-100 pb-6 sm:pb-8 mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-4">
                <Badge variant="sky">{subjectTitle}</Badge>
                <span className="inline-flex items-center gap-1 text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-full tracking-normal">
                  <Layers className="w-3 h-3 text-sky-600" />
                  <span>Sub-section: {subSectionTitle}</span>
                </span>
                <span className="text-xs font-medium text-slate-400 flex items-center gap-1 tracking-normal">
                  <Clock className="w-3.5 h-3.5" />
                  <span>8 min read</span>
                </span>
              </div>

              {/* H1 Title: Inter Tight with normal tracking per Task 1 */}
              <h1 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-normal leading-[1.15] mb-4">
                {noteTitle}
              </h1>

              {/* H2 Subtitle: Aleo with leading-[1.4] mb-6 per Task 1 */}
              <h2 className="font-serif text-base sm:text-lg text-slate-600 leading-[1.4] mb-6 font-normal">
                A comprehensive clinical breakdown of surgical approach landmarks, joint articulation mechanics, radiographic reference markers, and therapeutic titration algorithms.
              </h2>
            </header>

            {/* Reading Content Canvas: Aleo with leading-[1.4] mb-6 per Task 1 */}
            <div className="font-serif text-slate-600 leading-[1.4] text-base sm:text-lg">
              <section id="introduction" className="scroll-mt-28">
                <h2 className="font-sans font-bold text-xl sm:text-2xl text-slate-900 tracking-normal border-b border-slate-100 pb-2 mb-4">
                  Introduction & Overview
                </h2>
                <p className="leading-[1.4] mb-6">
                  In veterinary orthopedic surgery and internal medicine, understanding precise biological systems and anatomical landmarks is paramount. This protocol provides an evidence-based clinical guide to diagnostic evaluation, surgical intervention, and post-operative therapeutic management.
                </p>
                <p className="leading-[1.4] mb-6">
                  Precise landmark identification minimizes soft tissue trauma during open reduction procedures and ensures optimal patient recovery. Clinical decision-making must integrate patient staging criteria, hemodynamic stability, and regional formulary guidelines.
                </p>

                {/* Clinical Callout Box */}
                <div className="my-6 p-4 sm:p-5 rounded-xl bg-sky-50/70 border border-sky-200/80 flex items-start gap-3 sm:gap-4 font-sans text-sm text-sky-900 shadow-sm">
                  <Info className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block mb-1 tracking-normal">Clinical Pearl</span>
                    <p className="font-serif text-xs sm:text-sm text-sky-900 leading-[1.4] mb-0">
                      Always evaluate joint stability under heavy sedation or general anesthesia when muscle guarding precludes accurate palpation of cranial drawer or tibial compression tests.
                    </p>
                  </div>
                </div>
              </section>

              <section id="forelimb-anatomy" className="scroll-mt-28 mt-8">
                <h2 className="font-sans font-bold text-xl sm:text-2xl text-slate-900 tracking-normal border-b border-slate-100 pb-2 mb-4">
                  Surgical Approach & Landmarks
                </h2>
                <p className="leading-[1.4] mb-6">
                  The surgical approach requires careful dissection along internervous planes to avoid neurovascular compromise. When exposing articular structures, absolute anatomical reduction is required to prevent secondary osteoarthritis and joint instability.
                </p>

                <h3 id="scapulohumeral-joint" className="font-sans font-bold text-lg sm:text-xl text-slate-900 tracking-normal pt-2 mb-3 scroll-mt-28">
                  Biomechanical Stabilization
                </h3>
                <p className="leading-[1.4] mb-6">
                  Stabilization techniques must counteract biomechanical thrust forces during weight-bearing stance. Implant selection is dictated by patient body condition score, bone mineral density, and anticipated post-operative activity levels.
                </p>

                <ul className="list-disc pl-6 space-y-2.5 font-serif text-slate-600 my-6 marker:text-sky-600 leading-[1.4]">
                  <li>
                    <strong className="font-sans font-bold text-slate-900 tracking-normal">Anatomical Alignment:</strong> Serves as the primary reference for restoring normal joint angulation and limb axial alignment.
                  </li>
                  <li>
                    <strong className="font-sans font-bold text-slate-900 tracking-normal">Articular Articulation:</strong> Bears significant concussive load during locomotion, requiring rigid internal fixation when compromised.
                  </li>
                  <li>
                    <strong className="font-sans font-bold text-slate-900 tracking-normal">Soft Tissue Preservation:</strong> Maintaining periosteal vascularization is critical for rapid callus formation and osteogenesis.
                  </li>
                </ul>

                <div className="my-8 rounded-2xl bg-slate-50 border border-slate-100 p-6 sm:p-8 text-center shadow-sm">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-600 text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Microscope className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <span className="text-xs font-sans font-bold uppercase tracking-normal text-sky-700 block mb-1">
                    Clinical Diagnostic Diagram
                  </span>
                  <p className="font-serif text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-[1.4] mb-0">
                    Figure 1.1: Topographical cross-section of anatomical landmarks, illustrating vascularization and optimal implant placement zones.
                  </p>
                </div>
              </section>

              <section id="hindlimb-anatomy" className="scroll-mt-28 mt-8">
                <h2 className="font-sans font-bold text-xl sm:text-2xl text-slate-900 tracking-normal border-b border-slate-100 pb-2 mb-4">
                  Diagnostic Staging & Protocols
                </h2>
                <p className="leading-[1.4] mb-6">
                  Accurate diagnostic staging directs therapeutic titration and establishes baseline prognostic indicators. Standardized scoring systems ensure continuity of care across multidisciplinary clinical teams.
                </p>
              </section>

              <section id="surgical-approaches" className="scroll-mt-28 mt-8">
                <h2 className="font-sans font-bold text-xl sm:text-2xl text-slate-900 tracking-normal border-b border-slate-100 pb-2 mb-4">
                  Therapeutic Titration
                </h2>
                <p className="leading-[1.4] mb-6">
                  Pharmacological management requires continuous monitoring of hemodynamic parameters and renal clearance rates. Adjust infusion protocols based on patient response and serial laboratory diagnostics.
                </p>
              </section>

              <section id="clinical-pearls" className="scroll-mt-28 mt-8">
                <h2 className="font-sans font-bold text-xl sm:text-2xl text-slate-900 tracking-normal border-b border-slate-100 pb-2 mb-4">
                  Summary & Recommendations
                </h2>
                <p className="leading-[1.4] mb-6">
                  Adherence to structured clinical algorithms improves patient survival rates and minimizes complications. Review protocols periodically against updated veterinary specialty consensus guidelines.
                </p>
              </section>
            </div>

            {/* Note Footer */}
            <footer className="mt-10 pt-6 sm:pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans tracking-normal">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-sm">
                  VLH
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-900 block tracking-normal">Editorial Board Review</span>
                  <span className="font-serif text-xs text-slate-500 leading-[1.4]">Verified against 2026 Specialty Standards</span>
                </div>
              </div>
              <Link
                href={`/subjects/${subjectSlug}`}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors tracking-normal"
              >
                Return to {subjectTitle}
              </Link>
            </footer>
          </article>
        </div>

        {/* Right Column: Sticky Table of Contents */}
        <div className="hidden lg:block lg:col-span-3">
          <StickyTOC activeId="introduction" />
        </div>
      </div>
    </div>
  );
}
