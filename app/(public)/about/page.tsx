import React from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BookOpen, AlertTriangle } from "lucide-react";
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

      <div className="mb-10 pb-6 border-b border-border/80">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-subtle text-primary border border-primary/20 text-xs font-bold tracking-tight mb-4 shadow-2xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>ACADEMIC MISSION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-4">
          About Vetulan Service
        </h1>
        <p className="text-base sm:text-lg text-text-secondary leading-relaxed text-balance">
          A structured knowledge platform built specifically to support veterinary students, clinical interns, and educators with clear, curriculum-aligned academic notes and reference protocols.
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-text-secondary leading-relaxed">
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-3">
            Our Educational Philosophy
          </h2>
          <p className="leading-relaxed mb-4">
            Veterinary medical education is extensive and multidimensional, spanning foundational anatomy, cellular pathology, clinical pharmacology, soft tissue surgery, and emergency triage. Vetulan organizes this vast body of knowledge into an intuitive 4-tier hierarchy:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
            <div className="p-5 rounded-2xl border border-border/80 bg-white shadow-2xs">
              <span className="font-mono text-xs font-bold text-primary block mb-1">01</span>
              <h3 className="font-bold text-sm text-foreground mb-1">Disciplines</h3>
              <p className="text-xs text-text-secondary">Broad academic divisions establishing fundamental clinical domains.</p>
            </div>
            <div className="p-5 rounded-2xl border border-border/80 bg-white shadow-2xs">
              <span className="font-mono text-xs font-bold text-secondary block mb-1">02</span>
              <h3 className="font-bold text-sm text-foreground mb-1">Subjects</h3>
              <p className="text-xs text-text-secondary">Course-level curriculum modules organized into targeted topic groups.</p>
            </div>
            <div className="p-5 rounded-2xl border border-border/80 bg-white shadow-2xs">
              <span className="font-mono text-xs font-bold text-indigo-500 block mb-1">03</span>
              <h3 className="font-bold text-sm text-foreground mb-1">Reference Notes</h3>
              <p className="text-xs text-text-secondary">High-density articles with diagnostic algorithms and clinical tables.</p>
            </div>
          </div>
        </section>

        <section className="pt-6 border-t border-border/80">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mb-3">
            Editorial Rigor & Content Quality
          </h2>
          <p className="leading-relaxed">
            Every reference note on Vetulan is developed within our dedicated editorial workspace. Notes emphasize clear visual hierarchy, diagnostic criteria, clinical callouts, and evidence-based medicine references to facilitate efficient review during academic rotations and board examinations.
          </p>
        </section>

        {/* Prominent Academic & Clinical Disclaimer */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 mt-10 flex items-start gap-3.5 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-900">Academic & Educational Reference Notice</p>
            <p className="leading-relaxed text-amber-800">
              For academic study and educational reference only. Consult licensed clinical protocols and professional diagnostic guidance for clinical interventions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
