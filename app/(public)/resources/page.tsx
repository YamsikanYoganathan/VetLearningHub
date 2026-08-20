import React from "react";
import Link from "next/link";
import {
  Pill,
  HeartPulse,
  Microscope,
  Activity,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
} from "lucide-react";
import { getAcademicAreas } from "@/lib/supabase/queries";
import { AtmosphericBackground } from "@/components/ui/AtmosphericBackground";

export const metadata = {
  title: "Clinical Resources & Study Matrices | Vetulan Service",
  description:
    "Curated veterinary reference resources, clinical diagnostic algorithms, pharmacological formulary matrices, and surgical anatomical guides.",
};

export default async function ResourcesPage() {
  const areas = await getAcademicAreas();

  const resources = [
    {
      id: "pharmacology",
      title: "Veterinary Pharmacology & Formulary",
      icon: Pill,
      badge: "Clinical Reference",
      description:
        "Emergency drug dosage matrices, constant rate infusion (CRI) calculations, antibiotic susceptibility classifications, and anesthetic protocols.",
      items: [
        "Small Animal Emergency Drug Quick Reference",
        "Antimicrobial Spectrum & Stewardship Guidelines",
        "Opioid & Sedative Multimodal Anesthesia Matrix",
      ],
      href: "/search?q=pharmacology",
    },
    {
      id: "surgery",
      title: "Surgical Anatomy & Approaches",
      icon: HeartPulse,
      badge: "Surgical Suite",
      description:
        "Orthopedic landmark atlases, regional neurovascular mapping, soft tissue celiotomy guidelines, and tendon repair protocols.",
      items: [
        "Canine Stifle Joint & Extracapsular Stabilization",
        "Exploratory Laparotomy & Organ Biopsy Principles",
        "Feline Urethrostomy Surgical Protocols",
      ],
      href: "/search?q=surgery",
    },
    {
      id: "diagnostics",
      title: "Diagnostic Decision Trees",
      icon: Activity,
      badge: "Diagnostic Matrix",
      description:
        "Step-by-step clinical algorithms for canine acute abdomen, non-regenerative anemia evaluation, and arterial blood gas interpretation.",
      items: [
        "Acute Pancreatitis vs. Gastrointestinal Obstruction",
        "Acid-Base & Electrolyte Abnormality Algorithm",
        "Thoracic Radiography Cardiac Silhouette Evaluation",
      ],
      href: "/search?q=diagnostic",
    },
    {
      id: "pathology",
      title: "Clinical Pathology & Laboratory Reference",
      icon: Microscope,
      badge: "Laboratory Data",
      description:
        "Species-specific hematology reference intervals, urinalysis sediment atlases, cytological criteria of malignancy, and coagulation assays.",
      items: [
        "CBC & Peripheral Blood Smear Examination Guide",
        "Pleural & Peritoneal Fluid Analysis Flowchart",
        "Endocrine Testing Protocols (Cushing's & Addison's)",
      ],
      href: "/search?q=pathology",
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground bg-atmosphere">
      <AtmosphericBackground variant="subtle" />

      <div className="container-page py-12 sm:py-16 relative">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-subtle border border-primary/20 text-primary text-xs font-bold tracking-tight mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURRICULUM STUDY TOOLS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-4">
            Clinical Reference & Study Resources
          </h1>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Essential diagnostic algorithms, pharmacological formulary references, and anatomical guides designed for veterinary students and clinical interns.
          </p>
        </div>

        {/* Quick Search Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-white border border-border/80 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">
                Looking for a specific disease, surgical protocol, or drug?
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary">
                Search across all published notes and structured clinical matrices.
              </p>
            </div>

            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-semibold transition-all shadow-xs shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search Knowledge Base</span>
            </Link>
          </div>
        </div>

        {/* 4 Primary Resource Matrices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {resources.map((res, idx) => {
            const IconComponent = res.icon;
            const numberFormatted = `0${idx + 1}`;

            return (
              <div
                key={res.id}
                className="group relative bg-white rounded-2xl border border-border/80 p-6 sm:p-7 shadow-xs hover:border-sky-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-muted-foreground">
                        {numberFormatted}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-primary-subtle text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors shadow-2xs">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold text-secondary bg-secondary-subtle px-2.5 py-0.5 rounded-md border border-secondary/20">
                      {res.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                    {res.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-5">
                    {res.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-border/80 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Featured Modules:
                    </span>
                    {res.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs text-text-secondary"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={res.href}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-border/80 text-xs font-semibold text-primary group-hover:underline underline-offset-4"
                >
                  <span>Explore resource database</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Academic Syllabus Quick Overview */}
        {areas && areas.length > 0 && (
          <div className="rounded-2xl border border-border/80 bg-surface-subtle/70 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/80">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Curriculum Academic Disciplines
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Access notes structured sequentially by foundational and clinical branches.
                </p>
              </div>

              <Link
                href="/subjects"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4"
              >
                <span>View full syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
              {areas.map((area) => (
                <Link
                  key={area.id}
                  href={`/subjects/${area.slug}`}
                  className="p-4 rounded-xl bg-white border border-border/80 hover:border-sky-300 hover:shadow-2xs transition-all text-left"
                >
                  <span className="text-xs font-bold text-foreground block truncate">
                    {area.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                    Curriculum Branch
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
