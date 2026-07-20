import React from "react";
import Link from "next/link";
import { BookOpen, FileText, CheckCircle2, Clock, AlertCircle, PlusCircle, Layers } from "lucide-react";

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8 max-w-6xl font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-slate-900 tracking-normal">
            Clinical Knowledge Overview
          </h1>
          <p className="text-sm font-serif text-slate-600 mt-1 leading-[1.4] mb-0">
            Manage veterinary disciplines, organize protocols by sub-section, and publish clinical reference notes.
          </p>
        </div>
        <Link
          href="/admin/notes/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-sans font-semibold text-sm shadow-sm hover:shadow transition-all flex-shrink-0 tracking-normal"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Author Protocol</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 ease-in-out cursor-default">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-sans font-bold text-slate-500 uppercase tracking-normal">Total Subjects</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-sm">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-sans font-bold text-slate-900 tracking-normal">5</div>
          <span className="text-xs font-serif text-slate-600 mt-1 block leading-[1.4] mb-0">Active clinical disciplines</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 ease-in-out cursor-default">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-sans font-bold text-slate-500 uppercase tracking-normal">Sub-sections</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-sm">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-sans font-bold text-slate-900 tracking-normal">24</div>
          <span className="text-xs font-serif text-teal-600 font-medium mt-1 block leading-[1.4] mb-0">Anatomical & disease staging</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 ease-in-out cursor-default">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-sans font-bold text-slate-500 uppercase tracking-normal">Published Notes</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-sans font-bold text-slate-900 tracking-normal">56</div>
          <span className="text-xs font-serif text-teal-600 font-medium mt-1 block leading-[1.4] mb-0">Publicly accessible via RLS</span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 ease-in-out cursor-default">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-sans font-bold text-slate-500 uppercase tracking-normal">System Status</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shadow-sm">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-sans font-bold text-teal-600 tracking-normal">RLS Active</div>
          <span className="text-xs font-serif text-slate-600 mt-1 block leading-[1.4] mb-0">Secure Supabase Auth</span>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="font-sans font-bold text-slate-900 text-lg tracking-normal">
            Recently Modified Clinical Notes & Sub-sections
          </h2>
          <span className="text-xs font-sans font-medium text-slate-500 tracking-normal">Showing last 4 protocols</span>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-sans font-bold text-sky-600 uppercase tracking-normal">Canine Anatomy & Surgery</span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs font-sans font-semibold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded tracking-normal">Sub-section: Stifle & Hindlimb Orthopedics</span>
              </div>
              <h3 className="text-sm font-sans font-bold text-slate-900 tracking-normal">Cruciate Ligament Rupture (TPLO Approach)</h3>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold bg-sky-50 text-sky-700 border border-sky-200 tracking-normal">
                Published
              </span>
              <span className="text-xs font-sans text-slate-400 tracking-normal">2h ago</span>
            </div>
          </div>

          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-sans font-bold text-sky-600 uppercase tracking-normal">Feline Internal Medicine</span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs font-sans font-semibold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded tracking-normal">Sub-section: Renal & Endocrine Pathologies</span>
              </div>
              <h3 className="text-sm font-sans font-bold text-slate-900 tracking-normal">Feline Chronic Kidney Disease (IRIS Staging)</h3>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold bg-sky-50 text-sky-700 border border-sky-200 tracking-normal">
                Published
              </span>
              <span className="text-xs font-sans text-slate-400 tracking-normal">1d ago</span>
            </div>
          </div>

          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-sans font-bold text-sky-600 uppercase tracking-normal">Clinical Pharmacology</span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs font-sans font-semibold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded tracking-normal">Sub-section: Sedation & Analgesia Protocols</span>
              </div>
              <h3 className="text-sm font-sans font-bold text-slate-900 tracking-normal">Dexmedetomidine CRIs</h3>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold bg-sky-50 text-sky-700 border border-sky-200 tracking-normal">
                Published
              </span>
              <span className="text-xs font-sans text-slate-400 tracking-normal">2d ago</span>
            </div>
          </div>

          <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-sans font-bold text-sky-600 uppercase tracking-normal">Equine Lameness & Orthopedics</span>
                <span className="text-xs text-slate-300">•</span>
                <span className="text-xs font-sans font-semibold bg-sky-50 text-sky-700 border border-sky-200 px-2 py-0.5 rounded tracking-normal">Sub-section: Diagnostic Nerve Blocks</span>
              </div>
              <h3 className="text-sm font-sans font-bold text-slate-900 tracking-normal">Diagnostic Abaxial Sesamoid Nerve Block Mapping</h3>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold bg-slate-100 text-slate-700 border border-slate-200 tracking-normal">
                Draft
              </span>
              <span className="text-xs font-sans text-slate-400 tracking-normal">3d ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
