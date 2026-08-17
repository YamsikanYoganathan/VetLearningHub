import React from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BookOpen, Award, ShieldCheck, Compass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Vetulan Service | Veterinary Academic Knowledge Platform",
  description:
    "Learn about Vetulan Service, our academic philosophy, curriculum structure, and educational reference standards.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-14 max-w-3xl">
      <Breadcrumb
        items={[{ label: "About Vetulan", isCurrent: true }]}
        className="mb-8"
      />

      <div className="mb-10 pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold tracking-tight mb-4">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          <span>Academic Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
          About Vetulan Service
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
          A structured knowledge platform built specifically to support veterinary students, clinical interns, and educators with clear, curriculum-aligned academic notes and reference protocols.
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
            Our Educational Philosophy
          </h2>
          <p className="leading-relaxed mb-4">
            Veterinary medical education is extensive and multidimensional, spanning foundational anatomy, cellular pathology, clinical pharmacology, soft tissue surgery, and emergency triage. Vetulan organizes this vast body of knowledge into an intuitive 3-tier hierarchy:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
              <span className="font-mono text-xs font-bold text-slate-400 block mb-1">01</span>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Disciplines</h3>
              <p className="text-xs text-slate-600">Broad academic divisions establishing fundamental clinical domains.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
              <span className="font-mono text-xs font-bold text-slate-400 block mb-1">02</span>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Subjects</h3>
              <p className="text-xs text-slate-600">Course-level curriculum modules organized into targeted topic groups.</p>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
              <span className="font-mono text-xs font-bold text-slate-400 block mb-1">03</span>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Reference Notes</h3>
              <p className="text-xs text-slate-600">High-density articles with diagnostic algorithms and clinical tables.</p>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
            Editorial Rigor & Content Quality
          </h2>
          <p className="leading-relaxed">
            Every reference note on Vetulan is developed within our dedicated editorial workspace. Notes emphasize clear visual hierarchy, diagnostic criteria, clinical callouts, and evidence-based medicine references to facilitate efficient review during academic rotations and board examinations.
          </p>
        </section>

        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 mt-10 space-y-1">
          <p className="font-semibold text-slate-800">Academic & Clinical Disclaimer</p>
          <p className="leading-relaxed">
            All materials published on Vetulan Service are intended strictly for educational and academic reference purposes. The platform does not provide automated diagnostic directives or replace the clinical examination and licensed judgment of a qualified veterinary practitioner.
          </p>
        </div>
      </div>
    </div>
  );
}
