import React from "react";
import Link from "next/link";
import { Clock, ChevronRight, Layers } from "lucide-react";
import { Badge } from "./Badge";

export interface NoteRowProps {
  title: string;
  snippet: string;
  readingTime?: string;
  slug?: string;
  subjectSlug?: string;
  subSection?: string;
  status?: "published" | "draft";
  date?: string;
}

export function NoteRow({
  title,
  snippet,
  readingTime = "5 min read",
  slug = "skeletal-system",
  subjectSlug = "canine-anatomy",
  subSection,
  status = "published",
  date = "Oct 14, 2026",
}: NoteRowProps) {
  const href = `/subjects/${subjectSlug}/${slug}`;

  return (
    <Link
      href={href}
      className="group block p-5 sm:p-6 rounded-2xl border border-slate-200 ring-1 ring-slate-900/5 bg-white hover:bg-slate-50 hover:shadow-md hover:-translate-y-1 hover:ring-teal-600/30 transition-all duration-300 ease-in-out shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {subSection && (
              <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold bg-sky-50 text-sky-700 border border-sky-200 px-2.5 py-0.5 rounded-full tracking-normal">
                <Layers className="w-3 h-3 text-sky-600" />
                <span>{subSection}</span>
              </span>
            )}
            {status === "draft" && (
              <Badge variant="slate">Draft</Badge>
            )}
          </div>
          <h3 className="font-sans font-bold text-base sm:text-lg text-slate-900 group-hover:text-sky-600 transition-colors tracking-normal">
            {title}
          </h3>
          <p className="font-serif text-sm sm:text-base text-slate-600 leading-[1.4] mb-2 line-clamp-2">
            {snippet}
          </p>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end justify-between self-stretch sm:self-center flex-shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="flex items-center gap-1 text-xs font-sans font-medium text-slate-400 group-hover:text-slate-500 tracking-normal">
            <Clock className="w-3.5 h-3.5" />
            <span>{readingTime}</span>
          </div>
          <div className="text-sky-600 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 text-xs font-sans font-semibold tracking-normal">
            <span>Read Note</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
