import React from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Reference | Vetulan Service",
  description:
    "Terms of reference, educational scope, and clinical disclaimers for Vetulan Service.",
};

export default function TermsPage() {
  return (
    <div className="container-page py-10 sm:py-14 max-w-3xl">
      <Breadcrumb
        items={[{ label: "Terms of Reference", isCurrent: true }]}
        className="mb-8"
      />

      <div className="mb-10 pb-6 border-b border-slate-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">
          Terms of Reference
        </h1>
        <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
            1. Academic Scope & Clinical Non-Reliance
          </h2>
          <p>
            The educational notes, clinical algorithms, diagnostic protocols, and surgical summaries published on Vetulan Service are compiled for academic instruction and study reference only. They do not constitute veterinary medical directives. Licensed clinicians and surgeons bear sole responsibility for clinical diagnosis, drug calculation, and patient care.
          </p>
        </section>

        <section className="pt-6 border-t border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
            2. Curriculum Attribution & Copyright
          </h2>
          <p>
            All original structural organization, curriculum frameworks, and editorial summaries are proprietary to Vetulan Service and its authors, protected under applicable intellectual property laws and academic fair-use guidelines.
          </p>
        </section>

        <section className="pt-6 border-t border-slate-200">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mb-2">
            3. Platform Reliability
          </h2>
          <p>
            We maintain high standards for content accuracy and platform availability, but provide all materials on an &quot;as-is&quot; basis for academic exploration without express warranties.
          </p>
        </section>
      </div>
    </div>
  );
}
