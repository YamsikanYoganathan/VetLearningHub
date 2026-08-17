import React from "react";
import Link from "next/link";
import { Clock, ChevronRight, Hash } from "lucide-react";

export interface NoteRowProps {
  title: string;
  snippet: string;
  readingTime?: number | string;
  slug: string;
  subjectSlug?: string;
  subSection?: string;
  status?: "published" | "draft" | "in_review" | "archived";
  date?: string;
}

export function NoteRow({
  title,
  snippet,
  readingTime = 5,
  slug,
  subSection,
  status = "published",
  date,
}: NoteRowProps) {
  const readTimeFormatted =
    typeof readingTime === "number" ? `${readingTime} min read` : readingTime;

  return (
    <Link
      href={`/notes/${slug}`}
      className="group block p-5 sm:p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:-translate-y-0.5"
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2.5">
            {subSection ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                <Hash className="w-3 h-3 text-teal-600" />
                <span>{subSection}</span>
              </span>
            ) : (
              <div />
            )}

            {status !== "published" && (
              <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                {status}
              </span>
            )}
          </div>

          <h3 className="font-semibold text-base sm:text-lg text-slate-900 group-hover:text-primary transition-colors tracking-tight mb-2 leading-snug">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
            {snippet}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{readTimeFormatted}</span>
            </span>
            {date && <span className="hidden sm:inline text-slate-300">•</span>}
            {date && <span className="hidden sm:inline">{date}</span>}
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
