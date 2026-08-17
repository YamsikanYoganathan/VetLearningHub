"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Loader2, SlidersHorizontal, X } from "lucide-react";

export interface CategoryData {
  areas: { id: string; name: string; slug: string }[];
  subjects: { id: string; name: string; slug: string; area_id: string }[];
  topics: { id: string; name: string; slug: string; subject_id: string }[];
}

export function SearchFilters({ data }: { data: CategoryData }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentQ = searchParams.get("q") || "";
  const currentArea = searchParams.get("area") || "";
  const currentSubject = searchParams.get("subject") || "";
  const currentTopic = searchParams.get("topic") || "";

  // Derived filtered options
  const selectedAreaObj = data.areas.find((a) => a.slug === currentArea);
  const selectedSubjectObj = data.subjects.find((s) => s.slug === currentSubject);

  const availableSubjects = selectedAreaObj
    ? data.subjects.filter((s) => s.area_id === selectedAreaObj.id)
    : data.subjects;

  const availableTopics = selectedSubjectObj
    ? data.topics.filter((t) => t.subject_id === selectedSubjectObj.id)
    : selectedAreaObj
    ? data.topics.filter((t) => availableSubjects.some((s) => s.id === t.subject_id))
    : data.topics;

  const handleFilterChange = (key: string, value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // Reset pagination

      // Clear child filters if parent changes
      if (key === "area" && value !== currentArea) {
        params.delete("subject");
        params.delete("topic");
      }
      if (key === "subject" && value !== currentSubject) {
        params.delete("topic");
      }

      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      const params = new URLSearchParams();
      if (currentQ) params.set("q", currentQ);
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const hasFilters = Boolean(currentArea || currentSubject || currentTopic);

  return (
    <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 sm:p-5 mb-8">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-700">
          <SlidersHorizontal className="w-3.5 h-3.5 text-sky-600" />
          <span>Filter by Curriculum Hierarchy</span>
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Area Filter */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">
            Academic Area
          </label>
          <select
            value={currentArea}
            onChange={(e) => handleFilterChange("area", e.target.value)}
            disabled={isPending}
            className="w-full px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
          >
            <option value="">All Academic Areas</option>
            {data.areas.map((a) => (
              <option key={a.id} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">
            Subject
          </label>
          <select
            value={currentSubject}
            onChange={(e) => handleFilterChange("subject", e.target.value)}
            disabled={isPending || availableSubjects.length === 0}
            className="w-full px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
          >
            <option value="">All Subjects</option>
            {availableSubjects.map((s) => (
              <option key={s.id} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Topic Filter */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 mb-1">
            Topic
          </label>
          <select
            value={currentTopic}
            onChange={(e) => handleFilterChange("topic", e.target.value)}
            disabled={isPending || availableTopics.length === 0}
            className="w-full px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
          >
            <option value="">All Topics</option>
            {availableTopics.map((t) => (
              <option key={t.id} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isPending && (
        <div className="flex items-center justify-center mt-3 text-xs text-slate-500">
          <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin text-sky-600" />
          <span>Updating results...</span>
        </div>
      )}
    </div>
  );
}
