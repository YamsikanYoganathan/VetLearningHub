import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  BookOpen,
  Activity,
  Layers,
  HeartPulse,
  Pill,
  Microscope,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export interface SubjectCardProps {
  title: string;
  description: string;
  icon?: string;
  href: string;
  notesCount?: number;
  indexNumber?: number;
}

const iconMap: Record<string, LucideIcon> = {
  Layers,
  BookOpen,
  Activity,
  HeartPulse,
  Pill,
  Microscope,
  Stethoscope,
};

export function SubjectCard({
  title,
  description,
  icon = "Layers",
  href,
  notesCount,
  indexNumber,
}: SubjectCardProps) {
  const IconComponent = iconMap[icon] || Layers;
  const numberFormatted =
    indexNumber !== undefined
      ? indexNumber < 10
        ? `0${indexNumber}`
        : `${indexNumber}`
      : null;

  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl border border-border/80 bg-white hover:border-sky-300 hover:shadow-md transition-all duration-200 focus-ring hover:-translate-y-0.5"
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            {numberFormatted && (
              <span className="font-mono text-xs font-bold text-muted-foreground">
                {numberFormatted}
              </span>
            )}
            <div className="w-10 h-10 rounded-xl bg-primary-subtle text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-2xs">
              <IconComponent className="w-5 h-5" />
            </div>
          </div>

          {notesCount !== undefined && (
            <span className="text-[11px] font-semibold text-text-secondary bg-surface-subtle px-2.5 py-0.5 rounded-md border border-border">
              {notesCount} {notesCount === 1 ? "Note" : "Notes"}
            </span>
          )}
        </div>

        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors tracking-tight mb-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-3 mb-6">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border/80 text-xs font-semibold text-primary">
        <span>Explore discipline</span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
