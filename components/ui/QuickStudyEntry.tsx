import React from "react";
import Link from "next/link";
import { BookOpen, Search, Clock, ArrowRight } from "lucide-react";

export function QuickStudyEntry() {
  return (
    <section className="border-b border-slate-200/80 bg-slate-50/60 py-4 sm:py-5">
      <div className="container-page flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sky-100 text-primary font-bold text-xs">
            ⚡
          </span>
          <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
            Start Studying
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full md:w-auto">
          <Link
            href="/subjects"
            className="group flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-2xs text-xs font-medium text-slate-700 hover:text-primary transition-all"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>Browse Syllabus</span>
            </div>
            <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 group-hover:text-primary transition-transform" />
          </Link>

          <Link
            href="/search"
            className="group flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-2xs text-xs font-medium text-slate-700 hover:text-primary transition-all"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Search Notes</span>
            </div>
            <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 group-hover:text-primary transition-transform" />
          </Link>

          <Link
            href="#recent-notes"
            className="group flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200/90 hover:border-slate-300 hover:shadow-2xs text-xs font-medium text-slate-700 hover:text-primary transition-all"
          >
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Recent Notes</span>
            </div>
            <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 group-hover:text-primary transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
