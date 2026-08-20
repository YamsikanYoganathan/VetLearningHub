import React from "react";
import Link from "next/link";
import {
  FileText,
  Activity,
  HeartPulse,
  Pill,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function QuickStudyEntry() {
  const quickLinks = [
    {
      title: "Diagnostic Decision Trees",
      label: "Clinical Algorithms",
      icon: Activity,
      href: "/search?q=diagnostic",
      color: "text-sky-600 bg-sky-50 border-sky-200",
    },
    {
      title: "Pharmacology & Dosing",
      label: "Drug Matrices",
      icon: Pill,
      href: "/search?q=pharmacology",
      color: "text-teal-600 bg-teal-50 border-teal-200",
    },
    {
      title: "Surgical Protocols",
      label: "Surgical Suites",
      icon: HeartPulse,
      href: "/search?q=surgery",
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
    },
    {
      title: "Clinical Study Notes",
      label: "Curriculum Reference",
      icon: FileText,
      href: "/subjects",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
  ];

  return (
    <div className="container-page py-6">
      <div className="relative rounded-2xl bg-white border border-border/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-subtle text-primary flex items-center justify-center border border-primary/20 shrink-0 shadow-2xs">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
                Quick Access
              </span>
              <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight">
                Jump directly into key study matrices:
              </h3>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-2 p-2.5 sm:p-3 rounded-xl border border-border/80 bg-surface-subtle/60 hover:bg-white hover:border-sky-300 hover:shadow-2xs transition-all duration-150 group"
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${item.color}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {item.label}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
