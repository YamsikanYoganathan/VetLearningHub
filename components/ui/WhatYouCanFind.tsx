import React from "react";
import Link from "next/link";
import {
  Layers,
  FileText,
  BookOpen,
  ListTree,
  Search,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function WhatYouCanFind() {
  const features = [
    {
      title: "Academic Syllabus",
      description: "Understand your complete veterinary curriculum structure and sequential study progression.",
      icon: Layers,
      href: "/subjects",
      tag: "Curriculum",
    },
    {
      title: "Structured Study Notes",
      description: "Read focused academic reference notes formatted with clinical callouts, tables, and takeaways.",
      icon: FileText,
      href: "#recent-notes",
      tag: "Notes",
    },
    {
      title: "Subject Library",
      description: "Browse comprehensive learning material organized by clinical and pre-clinical subjects.",
      icon: BookOpen,
      href: "/subjects",
      tag: "Disciplines",
    },
    {
      title: "Topic Explorer",
      description: "Move directly to the exact disease system, physiological mechanism, or clinical topic you need.",
      icon: ListTree,
      href: "/subjects",
      tag: "Modules",
    },
    {
      title: "Instant Search",
      description: "Find study notes quickly by topic, disease, diagnostic protocol, or clinical sign.",
      icon: Search,
      href: "/search",
      tag: "Search",
    },
    {
      title: "Clinical Reference Material",
      description: "Access organized veterinary study resources formatted for clear understanding and academic mastery.",
      icon: Sparkles,
      href: "/subjects",
      tag: "Reference",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/60 border-b border-slate-200/80">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            What You Can Find Here
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-balance">
            Structured veterinary study resources, organized academic notes, and complete curriculum disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <Link
                key={f.title}
                href={f.href}
                className="group p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center border border-slate-200/80 group-hover:bg-teal-50 group-hover:text-teal-700 group-hover:border-teal-100 transition-colors">
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/60">
                      {f.tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-2 group-hover:text-primary transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-primary transition-colors">
                  <span>Explore resource</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
