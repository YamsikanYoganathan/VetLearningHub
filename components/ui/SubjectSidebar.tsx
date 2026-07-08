import React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import * as LucideIcons from "lucide-react";
import { BookOpen, ChevronRight, Layers } from "lucide-react";

export interface SubjectSidebarProps {
  currentSubjectSlug?: string;
}

export function SubjectSidebar({ currentSubjectSlug = "canine-anatomy" }: SubjectSidebarProps) {
  // Exactly 5 production subjects per Task 3
  const subjects = [
    {
      title: "Canine Anatomy & Surgery",
      slug: "canine-anatomy",
      iconName: "Dog",
      count: 18,
    },
    {
      title: "Feline Internal Medicine",
      slug: "feline-internal-medicine",
      iconName: "Cat",
      count: 14,
    },
    {
      title: "Clinical Pharmacology",
      slug: "clinical-pharmacology",
      iconName: "Pill",
      count: 24,
    },
    {
      title: "Equine Lameness & Orthopedics",
      slug: "equine-orthopedics",
      iconName: "Bone",
      count: 12,
    },
    {
      title: "Emergency & Critical Care",
      slug: "emergency-critical-care",
      iconName: "ShieldAlert",
      count: 21,
    },
  ];

  return (
    <aside aria-label="Clinical Disciplines" className="sticky top-24 space-y-6 font-sans">
      <div className="space-y-1">
        <div className="flex items-center justify-between px-3 py-2 text-xs font-sans font-bold uppercase tracking-normal text-slate-500 border-b border-slate-200">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>Disciplines</span>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold tracking-normal">5</span>
        </div>

        <nav className="pt-2 space-y-1">
          {subjects.map((sub) => {
            const isActive = currentSubjectSlug === sub.slug || (currentSubjectSlug === "feline-physiology" && sub.slug === "feline-internal-medicine");
            // @ts-ignore
            const IconComponent = LucideIcons[sub.iconName] || BookOpen;

            return (
              <Link
                key={sub.slug}
                href={`/subjects/${sub.slug}`}
                className={clsx(
                  "group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-sans transition-all duration-150 tracking-normal",
                  isActive
                    ? "bg-sky-600 text-white font-semibold shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm border border-transparent hover:border-slate-100"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={clsx(
                      "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                      isActive
                        ? "bg-sky-700/80 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600"
                    )}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="truncate">{sub.title}</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <span
                    className={clsx(
                      "text-[11px] px-1.5 py-0.5 rounded font-semibold tracking-normal",
                      isActive ? "bg-sky-700 text-sky-100" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                    )}
                  >
                    {sub.count}
                  </span>
                  <ChevronRight
                    className={clsx(
                      "w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5",
                      isActive ? "text-sky-200" : "text-slate-400 opacity-0 group-hover:opacity-100"
                    )}
                  />
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-5 rounded-xl bg-gradient-to-br from-sky-900 to-slate-900 text-white shadow-sm space-y-2 hidden sm:block">
        <span className="text-[10px] font-sans font-bold uppercase tracking-normal text-sky-300 block">
          Clinical Notice
        </span>
        <p className="font-serif text-xs text-slate-200 leading-[1.4] mb-0">
          All protocols undergo rigorous peer review against regional veterinary medical formulary standards.
        </p>
      </div>
    </aside>
  );
}

export default SubjectSidebar;
