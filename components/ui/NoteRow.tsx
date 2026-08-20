import React from "react";
import Link from "next/link";
import { Clock, ChevronRight, Hash, FileText } from "lucide-react";

export interface NoteRowProps {
  title: string;
  snippet: string;
  readingTime?: number | string;
  slug: string;
  subjectSlug?: string;
  subSection?: string;
  status?: "published" | "draft" | "in_review" | "archived";
  date?: string;
  isFeatured?: boolean;
}

export function NoteRow({
  title,
  snippet,
  readingTime = 5,
  slug,
  subSection,
  status = "published",
  date,
  isFeatured = false,
}: NoteRowProps) {
  const readTimeFormatted =
    typeof readingTime === "number" ? `${readingTime} min read` : readingTime;

  return (
    <Link
      href={`/notes/${slug}`}
      className={`group block p-6 sm:p-7 rounded-2xl border border-border/80 bg-white hover:border-sky-300 hover:shadow-md transition-all duration-200 focus-ring hover:-translate-y-0.5 ${
        isFeatured ? "md:col-span-2 bg-gradient-to-br from-white via-white to-sky-50/50" : ""
      }`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            {subSection ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary bg-secondary-subtle px-2.5 py-0.5 rounded-md border border-secondary/20">
                <Hash className="w-3 h-3 text-secondary" />
                <span>{subSection}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary-subtle px-2.5 py-0.5 rounded-md border border-primary/20">
                <FileText className="w-3 h-3 text-primary" />
                <span>Clinical Protocol</span>
              </span>
            )}

            {status !== "published" && (
              <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                {status}
              </span>
            )}
          </div>

          <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors tracking-tight mb-2 leading-snug">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-2 mb-5">
            {snippet}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/80 text-xs text-muted-foreground font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{readTimeFormatted}</span>
            </span>
            {date && <span className="hidden sm:inline text-border">•</span>}
            {date && <span className="hidden sm:inline text-muted-foreground">{date}</span>}
          </div>

          <div className="flex items-center gap-1 font-semibold text-primary group-hover:underline underline-offset-4 transition-colors">
            <span>Read reference</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
