"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Layers,
  ArrowRight,
  BookOpen,
  Activity,
  Microscope,
  Pill,
  Dna,
  HeartPulse,
  Search,
  ChevronRight,
  Scan,
} from "lucide-react";
import { type AcademicArea } from "@/lib/supabase/queries";

interface SyllabusMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  areas: AcademicArea[];
}

// Icon mapping for academic disciplines
const disciplineIcons: Record<string, React.ElementType> = {
  anatomy: Dna,
  physiology: Activity,
  pathology: Microscope,
  pharmacology: Pill,
  surgery: HeartPulse,
  "internal-medicine": Activity,
  microbiology: Microscope,
  imaging: Scan,
  "clinical-sciences": Activity,
  "pre-clinical-disciplines": BookOpen,
  "paraclinical-studies": Microscope,
};

export function SyllabusMegaMenu({ isOpen, onClose, areas }: SyllabusMegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [, setActiveAreaId] = useState<string | null>(
    areas.length > 0 ? areas[0].id : null
  );

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Subtle Backdrop / Dim layer */}
      <div
        className="fixed inset-0 top-16 bg-slate-900/15 backdrop-blur-[2px] z-30 transition-opacity duration-200 animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mega Menu Dropdown Container */}
      <div
        ref={menuRef}
        id="syllabus-mega-menu"
        role="region"
        aria-label="Syllabus Navigation Menu"
        className="absolute top-full left-0 w-full bg-white/98 backdrop-blur-2xl border-b border-border shadow-float z-40 animate-in fade-in-0 slide-in-from-top-2 duration-200"
      >
        <div className="container-page py-7 lg:py-8">
          {/* Header row with curriculum meta */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <BookOpen className="w-3.5 h-3.5" />
                <span>VETERINARY SYLLABUS</span>
              </div>
              <h2 className="text-lg font-bold text-foreground tracking-tight">
                Explore veterinary disciplines, subjects, and clinical study modules.
              </h2>
            </div>

            <Link
              href="/subjects"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4 group"
            >
              <span>View full curriculum</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Multi-column grid of academic disciplines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {areas.map((area, idx) => {
              const IconComponent =
                disciplineIcons[area.slug] || Layers;
              const formattedIndex = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;

              return (
                <Link
                  key={area.id}
                  href={`/subjects/${area.slug}`}
                  onClick={onClose}
                  onMouseEnter={() => setActiveAreaId(area.id)}
                  className="group relative p-4 rounded-2xl border border-border/80 bg-surface-subtle/50 hover:bg-white hover:border-sky-300 hover:shadow-sm transition-all duration-150 flex items-start gap-3.5 text-left focus-ring"
                >
                  {/* Numbering & Icon */}
                  <div className="shrink-0 flex flex-col items-center gap-1.5 pt-0.5">
                    <span className="font-mono text-[11px] font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                      {formattedIndex}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center text-text-secondary group-hover:bg-primary-subtle group-hover:text-primary group-hover:border-primary/30 transition-colors shadow-2xs">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Discipline Title & Description */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                        {area.name}
                      </h3>
                      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                      {area.description ||
                        `Explore ${area.name.toLowerCase()} subjects and structured clinical notes.`}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer Navigation in Mega Menu */}
          <div className="mt-6 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-text-secondary">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/subjects"
                onClick={onClose}
                className="font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
              >
                <span>View complete syllabus</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
              <span className="text-border">•</span>
              <Link
                href="/search"
                onClick={onClose}
                className="font-semibold text-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Search notes</span>
                <ArrowRight className="w-3.5 h-3.5 text-primary" />
              </Link>
            </div>

            <span className="text-[11px] text-muted-foreground">
              Press <kbd className="font-mono bg-surface-subtle px-1.5 py-0.5 rounded border border-border">ESC</kbd> to close menu
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
