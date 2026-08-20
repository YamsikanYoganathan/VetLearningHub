"use client";

import React, { useState } from "react";
import {
  Search,
  BookOpen,
  FileText,
  BookmarkCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export function HowVetulanWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      number: "01",
      title: "Choose Your Discipline",
      description:
        "Select from foundational veterinary disciplines including Clinical Sciences, Pre-Clinical Disciplines, Pathology, and Pharmacology.",
      icon: BookOpen,
      color: "sky",
    },
    {
      id: 1,
      number: "02",
      title: "Explore Core Subjects",
      description:
        "Navigate structured subject courses designed around clear academic curricula with topic modules.",
      icon: Search,
      color: "teal",
    },
    {
      id: 2,
      number: "03",
      title: "Read Structured Notes",
      description:
        "Study peer-referenced articles formatted with diagnostic algorithms, clinical callouts, and medication matrices.",
      icon: FileText,
      color: "indigo",
    },
    {
      id: 3,
      number: "04",
      title: "Apply Diagnostic Logic",
      description:
        "Utilize clinical pearls, review points, and downloadable PDF protocols during rotations and board preparations.",
      icon: BookmarkCheck,
      color: "emerald",
    },
  ];

  return (
    <section className="py-16 sm:py-20 relative">
      <div className="container-page">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-primary-subtle px-3.5 py-1.5 rounded-full border border-primary/20 mb-3.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDY METHODOLOGY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-3">
            How Vetulan Structures Your Study
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            A methodical 4-step learning path engineered to guide veterinary students from foundational knowledge to clinical decision making.
          </p>
        </div>

        {/* 4-Step Interactive Pathway */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                onMouseEnter={() => setActiveStep(step.id)}
                className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  activeStep === step.id
                    ? "bg-white border-primary/40 shadow-md -translate-y-1"
                    : "bg-white/80 border-border/80 hover:border-zinc-300 hover:shadow-xs"
                }`}
              >
                <div>
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-muted-foreground">
                      STEP {step.number}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-2xs transition-colors ${
                        activeStep === step.id
                          ? "bg-primary text-white border-primary"
                          : "bg-surface-subtle text-muted-foreground border-border group-hover:bg-primary-subtle group-hover:text-primary group-hover:border-primary/30"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-base text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/80 flex items-center text-xs font-semibold text-primary">
                  <span>Step {step.number} Protocol</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Bar */}
        <div className="mt-10 p-5 rounded-2xl bg-surface-subtle/80 border border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto shadow-2xs">
          <p className="text-xs sm:text-sm text-text-secondary text-center sm:text-left">
            Ready to explore? Browse our comprehensive academic disciplines.
          </p>
          <Link
            href="/subjects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline underline-offset-4 shrink-0"
          >
            <span>Open Syllabus Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
