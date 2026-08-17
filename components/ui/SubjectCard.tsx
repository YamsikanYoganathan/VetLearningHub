import React from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Layers, Microscope, Pill, Dna, Activity, HeartPulse, Scan, BookOpen } from "lucide-react";

export interface SubjectCardProps {
  title: string;
  description: string;
  noteCount?: number;
  icon?: React.ReactNode | string;
  href?: string;
  badgeLabel?: string;
  indexNumber?: number | string;
}

const disciplineFallbackIcons: Record<string, React.ElementType> = {
  anatomy: Dna,
  physiology: Activity,
  pathology: Microscope,
  pharmacology: Pill,
  surgery: HeartPulse,
  imaging: Scan,
  "clinical-sciences": Activity,
  "pre-clinical-disciplines": BookOpen,
  "paraclinical-studies": Microscope,
};

export function SubjectCard({
  title,
  description,
  noteCount,
  icon,
  href = "#",
  badgeLabel,
  indexNumber,
}: SubjectCardProps) {
  const renderIcon = () => {
    if (typeof icon === "string") {
      const slugKey = icon.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const SpecificIcon = disciplineFallbackIcons[slugKey];
      if (SpecificIcon) {
        return <SpecificIcon className="w-4 h-4" />;
      }

      const IconComponent =
        (LucideIcons as unknown as Record<string, React.ElementType>)[icon] ||
        Layers;
      return <IconComponent className="w-4 h-4" />;
    }
    return icon || <Layers className="w-4 h-4" />;
  };

  const formattedIndex =
    typeof indexNumber === "number"
      ? indexNumber < 10
        ? `0${indexNumber}`
        : `${indexNumber}`
      : indexNumber;

  const CardContent = (
    <div className="group relative h-full bg-white rounded-xl border border-slate-200/90 p-6 shadow-2xs hover:border-slate-300 hover:shadow-md hover:bg-gradient-to-b hover:from-white hover:to-slate-50/50 transition-all duration-200 flex flex-col justify-between cursor-pointer hover:-translate-y-1">
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            {formattedIndex && (
              <span className="font-mono text-xs font-semibold text-slate-400 group-hover:text-primary transition-colors">
                {formattedIndex}
              </span>
            )}
            <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/80 group-hover:bg-sky-50 group-hover:text-primary group-hover:border-sky-200 transition-colors shadow-2xs">
              {renderIcon()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {noteCount !== undefined && noteCount > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
                {noteCount} {noteCount === 1 ? "Subject" : "Subjects"}
              </span>
            )}
            {badgeLabel && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-100">
                {badgeLabel}
              </span>
            )}
          </div>
        </div>

        <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-primary transition-colors tracking-tight leading-snug">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-primary transition-colors">
        <span>Explore discipline</span>
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
      >
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
