"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  GraduationCap,
  FolderOpen,
  FileText,
  ArrowRight,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export function HowVetulanWorks() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      stepNumber: "01",
      title: "Explore the Syllabus",
      shortTitle: "Syllabus",
      icon: Layers,
      description:
        "Start with your academic area and discover the subjects and curriculum modules organized inside it.",
      badge: "Step 01",
      ctaText: "Explore syllabus",
      ctaLink: "/subjects",
    },
    {
      id: 1,
      stepNumber: "02",
      title: "Choose a Subject",
      shortTitle: "Subject",
      icon: GraduationCap,
      description:
        "Open a veterinary subject to see its clinical topics, diagnostic frameworks, and structured learning units.",
      badge: "Step 02",
      ctaText: "View subjects",
      ctaLink: "/subjects",
    },
    {
      id: 2,
      stepNumber: "03",
      title: "Open a Topic",
      shortTitle: "Topic",
      icon: FolderOpen,
      description:
        "Find the exact medical condition or surgical concept you want to study without searching through endless textbooks.",
      badge: "Step 03",
      ctaText: "Search topics",
      ctaLink: "/search",
    },
    {
      id: 3,
      stepNumber: "04",
      title: "Study the Note",
      shortTitle: "Study Note",
      icon: FileText,
      description:
        "Read structured clinical notes formatted with diagnostic algorithms, medication tables, and core learning takeaways.",
      badge: "Step 04",
      ctaText: "Open Foundations of Anatomy →",
      ctaLink: "/notes/demo-foundations-of-comparative-anatomy",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80 relative">
      <div className="container-page">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary bg-sky-50 px-3 py-1 rounded-full border border-sky-100 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span>Structured Learning Path</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Study veterinary medicine without getting lost.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-balance">
            Explore your syllabus, open a subject, choose a topic, and study focused clinical reference notes.
          </p>
        </div>

        {/* 4-Step Horizontal Progression on Desktop, Vertical Stack on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                onMouseEnter={() => setActiveStep(step.id)}
                className={`group relative p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  activeStep === step.id
                    ? "bg-sky-50/40 border-sky-200 shadow-sm -translate-y-1"
                    : "bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-2xs"
                }`}
              >
                <div>
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-primary bg-white px-2.5 py-1 rounded-md border border-slate-200/80 shadow-2xs">
                      {step.stepNumber}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700 flex items-center justify-center group-hover:bg-sky-50 group-hover:text-primary group-hover:border-sky-200 transition-colors shadow-2xs">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Step Progression CTA */}
                <Link
                  href={step.ctaLink}
                  className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-primary transition-colors"
                >
                  <span>{step.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Visual Summary Progression */}
        <div className="mt-10 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-700 text-center">
          <span className="text-slate-400 font-normal">Educational Progression:</span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-800">
            <Layers className="w-3.5 h-3.5 text-primary" /> Academic Area
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-800">
            <GraduationCap className="w-3.5 h-3.5 text-teal-600" /> Subject
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-800">
            <FolderOpen className="w-3.5 h-3.5 text-indigo-600" /> Topic
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-800">
            <FileText className="w-3.5 h-3.5 text-emerald-600" /> Clinical Note
          </span>
        </div>
      </div>
    </section>
  );
}
