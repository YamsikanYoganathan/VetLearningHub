"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Layers,
  BookOpen,
  Tags,
  FileText,
  ArrowRight,
} from "lucide-react";

export function CurriculumHierarchy() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 0,
      stepNumber: "01",
      title: "Academic Discipline",
      subtitle: "Top-Level Veterinary Branch",
      icon: Layers,
      color: "sky",
      description:
        "Foundational divisions of veterinary medical education covering Clinical Sciences, Pre-Clinical Disciplines, and Paraclinical Studies.",
      example: "e.g. Clinical Sciences",
      linkText: "Browse Academic Disciplines",
      href: "/subjects",
    },
    {
      id: 1,
      stepNumber: "02",
      title: "Subject Course",
      subtitle: "Core Curriculum Discipline",
      icon: BookOpen,
      color: "teal",
      description:
        "Specialized clinical or preclinical subjects categorized under disciplines with defined learning outcomes.",
      example: "e.g. Small Animal Internal Medicine",
      linkText: "Explore Subjects",
      href: "/subjects",
    },
    {
      id: 2,
      stepNumber: "03",
      title: "Topic Module",
      subtitle: "Modular Clinical Cluster",
      icon: Tags,
      color: "indigo",
      description:
        "Focused study units and disease systems that group related clinical conditions and surgical approaches.",
      example: "e.g. Canine Gastroenterology",
      linkText: "Search Topics",
      href: "/search",
    },
    {
      id: 3,
      stepNumber: "04",
      title: "Clinical Reference Note",
      subtitle: "Structured Study Article",
      icon: FileText,
      color: "emerald",
      description:
        "Peer-referenced clinical notes formatted with diagnostic algorithms, medication matrices, tables, and key takeaway pearls.",
      example: "e.g. Acute Pancreatitis Diagnostic Protocol",
      linkText: "Search Reference Notes",
      href: "/search",
    },
  ];

  const current = steps[activeStep];
  const IconComponent = current.icon;

  return (
    <div className="rounded-2xl border border-border/80 bg-white p-6 sm:p-8 lg:p-10 shadow-xs">
      {/* Interactive Level Navigation Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {steps.map((step) => {
          const StepIcon = step.icon;
          const isActive = step.id === activeStep;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => setActiveStep(step.id)}
              onMouseEnter={() => setActiveStep(step.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-150 relative cursor-pointer ${
                isActive
                  ? "bg-primary-subtle border-primary/40 shadow-xs"
                  : "bg-surface-subtle border-border/80 hover:bg-white text-text-secondary"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`font-mono text-xs font-bold ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {step.stepNumber}
                </span>
                <StepIcon
                  className={`w-4 h-4 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>

              <div
                className={`text-xs sm:text-sm font-bold leading-tight ${
                  isActive ? "text-foreground" : "text-text-secondary"
                }`}
              >
                {step.title}
              </div>

              <div className="text-[11px] text-muted-foreground mt-0.5 truncate">
                {step.subtitle}
              </div>

              {isActive && (
                <div className="absolute -bottom-px left-4 right-4 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Dynamic Detail Card with Visual Hierarchy Progression */}
      <div className="p-6 sm:p-7 rounded-xl bg-surface-subtle border border-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-border/80 text-foreground shadow-2xs">
              <IconComponent className="w-3.5 h-3.5 text-primary" />
              <span>Level {current.stepNumber}</span>
            </span>
            <span className="text-xs font-semibold text-primary">
              {current.example}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            {current.title}
          </h3>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            {current.description}
          </p>
        </div>

        <Link
          href={current.href}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-hover text-xs sm:text-sm font-semibold transition-all shadow-xs shrink-0 group"
        >
          <span>{current.linkText}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
