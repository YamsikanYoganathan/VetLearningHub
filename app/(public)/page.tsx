import React from "react";
import Link from "next/link";
import { ArrowRight, Search, Activity, HeartPulse, Stethoscope, Bone, ShieldAlert, Sparkles } from "lucide-react";

export default function PublicHomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section: Grounded in veterinary vernacular and disciplined typography */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-slate-50 to-slate-50 pt-16 pb-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-teal-700 text-xs font-semibold uppercase tracking-wider mb-6">
              <Activity className="w-3.5 h-3.5" />
              <span>Evidence-Based Veterinary Medicine</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.15] mb-6">
              A disciplined clinical knowledge base for veterinary practice.
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed mb-8">
              Instant access to peer-reviewed diagnostic protocols, surgical notes, and pharmacology reference guides across small animal, equine, and exotic specializations.
            </p>

            {/* Interactive Clinical Search Bar */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search clinical notes (e.g., Canine Valvular Disease, Feline T4, Equine Lameness)..."
                className="w-full pl-11 pr-28 py-4 rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent shadow-sm transition-all"
              />
              <div className="absolute inset-y-1.5 right-1.5 flex items-center">
                <button
                  type="button"
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm"
                >
                  Search Reference
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Subjects Catalog Section */}
      <section id="subjects" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold text-sky-600 uppercase tracking-widest block mb-2">
                Specialized Disciplines
              </span>
              <h2 className="text-3xl font-serif font-bold text-slate-900">
                Clinical Subject Specialties
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-md mt-2 md:mt-0">
              Select a clinical discipline to explore structured diagnostic pathways, surgical anatomy notes, and therapeutic formularies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Subject Card 1: Canine Cardiology */}
            <div className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-teal-600/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                  Canine Cardiology
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Valvular disease protocols, ECG interpretation, congestive heart failure staging, and antiarrhythmic pharmacology.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-teal-600">
                <span>12 Published Notes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Subject Card 2: Equine Orthopedics */}
            <div className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-sky-600/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Bone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  Equine Orthopedics
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Diagnostic nerve blocks, lameness scoring, joint sepsis therapeutics, and arthroscopic surgical approaches.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-sky-600">
                <span>8 Published Notes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Subject Card 3: Feline Endocrinology */}
            <div className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-teal-600/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                  Feline Endocrinology
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Diabetes mellitus insulin titration, hyperthyroidism radioiodine & medical protocols, and adrenal disease diagnostics.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-teal-600">
                <span>15 Published Notes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Subject Card 4: Emergency & Critical Care */}
            <div className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-sky-600/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  Emergency & Critical Care
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  Acute triage algorithms, shock fluid resuscitation therapy, GDV emergency stabilization, and toxicology antidotes.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-sky-600">
                <span>21 Published Notes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
