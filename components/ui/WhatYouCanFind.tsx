import React from "react";
import {
  FileText,
  Activity,
  Pill,
  HeartPulse,
  Microscope,
  FileCheck,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export function WhatYouCanFind() {
  const categories = [
    {
      title: "Diagnostic Decision Trees",
      description:
        "Sequential clinical algorithms for acute abdomen, non-regenerative anemia, and acid-base emergencies.",
      icon: Activity,
      tag: "Diagnostic Matrix",
      href: "/search?q=diagnostic",
    },
    {
      title: "Pharmacological Formularies",
      description:
        "Emergency drug dosages, constant rate infusion (CRI) tables, and antimicrobial stewardship protocols.",
      icon: Pill,
      tag: "Formulary",
      href: "/search?q=pharmacology",
    },
    {
      title: "Surgical Approaches & Anatomy",
      description:
        "Regional landmark mapping, soft tissue celiotomy guidelines, and orthopedic joint stabilization.",
      icon: HeartPulse,
      tag: "Surgery",
      href: "/search?q=surgery",
    },
    {
      title: "Clinical Pathology & Lab Data",
      description:
        "Hematology reference intervals, cytology criteria of malignancy, and urinalysis sediment atlases.",
      icon: Microscope,
      tag: "Laboratory",
      href: "/search?q=pathology",
    },
    {
      title: "Curriculum-Aligned Notes",
      description:
        "Organized by academic year and discipline to support veterinary students during board preparation.",
      icon: FileText,
      tag: "Academic Notes",
      href: "/subjects",
    },
    {
      title: "Attached Clinical Resources",
      description:
        "High-resolution diagnostic algorithms, drug dosing charts, and clinical summaries available as PDF downloads.",
      icon: FileCheck,
      tag: "Downloadable PDF",
      href: "/resources",
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-subtle px-3.5 py-1.5 rounded-full border border-secondary/20 mb-3.5 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>KNOWLEDGE SCOPE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-3">
            What You Can Find Here
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Essential clinical and academic veterinary resources curated for rapid reference and deep curriculum study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group relative p-6 sm:p-7 rounded-2xl border border-border/80 bg-white hover:border-teal-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary-subtle text-secondary flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-secondary bg-secondary-subtle px-2.5 py-0.5 rounded-md border border-secondary/20">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/80 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Browse resources</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
