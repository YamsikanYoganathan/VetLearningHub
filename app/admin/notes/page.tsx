import React from "react";
import Link from "next/link";
import { PlusCircle, Search, Filter, Layers, Edit, Trash2 } from "lucide-react";

export default function AdminNotesPage() {
  // Production notes with real clinical titles and exact 5 subjects per Task 4
  const mockedAdminNotes = [
    {
      id: "1",
      title: "Cruciate Ligament Rupture (TPLO Approach)",
      slug: "tplo-approach",
      subjectName: "Canine Anatomy & Surgery",
      subSection: "Stifle & Hindlimb Orthopedics",
      status: "published" as const,
      updatedAt: "2 hours ago",
    },
    {
      id: "2",
      title: "Feline Chronic Kidney Disease (IRIS Staging)",
      slug: "iris-staging",
      subjectName: "Feline Internal Medicine",
      subSection: "Renal & Endocrine Pathologies",
      status: "published" as const,
      updatedAt: "1 day ago",
    },
    {
      id: "3",
      title: "Dexmedetomidine CRIs",
      slug: "dexmedetomidine-cris",
      subjectName: "Clinical Pharmacology",
      subSection: "Sedation & Analgesia Protocols",
      status: "published" as const,
      updatedAt: "2 days ago",
    },
    {
      id: "4",
      title: "Diagnostic Abaxial Sesamoid Nerve Block Mapping",
      slug: "sesamoid-nerve-block",
      subjectName: "Equine Lameness & Orthopedics",
      subSection: "Diagnostic Nerve Blocks",
      status: "published" as const,
      updatedAt: "3 days ago",
    },
    {
      id: "5",
      title: "Acute GDV Triage & Resuscitation Algorithm",
      slug: "gdv-triage",
      subjectName: "Emergency & Critical Care",
      subSection: "Shock & Trauma Triage",
      status: "draft" as const,
      updatedAt: "4 days ago",
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-normal">
            Clinical Notes & Sub-sections
          </h1>
          <p className="text-sm font-serif text-slate-600 mt-1 leading-[1.4] mb-0">
            Organize veterinary protocols by discipline and anatomical or therapeutic sub-section.
          </p>
        </div>
        <Link
          href="/admin/notes/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-sm transition-all flex-shrink-0 tracking-normal"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Author New Protocol</span>
        </Link>
      </div>

      {/* Filter and Search Bar - Sky Blue focus, normal tracking */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by protocol title, discipline, or sub-section..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-sans text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 tracking-normal"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors tracking-normal"
          >
            <Filter className="w-4 h-4 text-slate-500" />
            <span>Filter Sub-sections</span>
          </button>
        </div>
      </div>

      {/* Responsive Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-normal">Protocol Registry</span>
          <span className="text-xs font-medium text-slate-500 tracking-normal">Total: {mockedAdminNotes.length} notes</span>
        </div>

        <div className="divide-y divide-slate-100">
          {mockedAdminNotes.map((note) => (
            <div
              key={note.id}
              className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-normal">
                    {note.subjectName}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-full tracking-normal">
                    <Layers className="w-3 h-3 text-sky-600" />
                    <span>Sub-section: {note.subSection}</span>
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate tracking-normal">
                  {note.title}
                </h3>
                <span className="text-xs font-serif text-slate-400 block leading-[1.4] mb-0">
                  Last updated {note.updatedAt}
                </span>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 flex-shrink-0">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-normal ${
                    note.status === "published"
                      ? "bg-sky-50 text-sky-700 border border-sky-200"
                      : "bg-slate-100 text-slate-700 border border-slate-200"
                  }`}
                >
                  {note.status === "published" ? "Published" : "Draft"}
                </span>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/notes/new?edit=${note.id}`}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Edit Protocol"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                    title="Delete Protocol"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
