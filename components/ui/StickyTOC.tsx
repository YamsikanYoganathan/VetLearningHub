import React from "react";
import { ListFilter } from "lucide-react";
import { clsx } from "clsx";

export interface TOCItem {
  id: string;
  label: string;
  level?: 2 | 3;
  active?: boolean;
}

export interface StickyTOCProps {
  items?: TOCItem[];
  activeId?: string;
}

export function StickyTOC({ items, activeId }: StickyTOCProps) {
  const defaultItems: TOCItem[] = [
    { id: "introduction", label: "Introduction & Overview", level: 2, active: true },
    { id: "forelimb-anatomy", label: "Forelimb Anatomy & Osteology", level: 2 },
    { id: "scapulohumeral-joint", label: "Scapulohumeral Joint Mechanics", level: 3 },
    { id: "hindlimb-anatomy", label: "Hindlimb Anatomy & Stifle", level: 2 },
    { id: "cranial-cruciate", label: "Cranial Cruciate Ligament (CrCL)", level: 3 },
    { id: "surgical-approaches", label: "Standard Surgical Approaches", level: 2 },
    { id: "clinical-pearls", label: "Clinical Diagnostic Pearls", level: 2 },
  ];

  const tocList = items || defaultItems;

  return (
    <nav aria-label="Table of contents" className="sticky top-24 space-y-3 pl-2 font-sans">
      <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-normal text-slate-900 border-b border-slate-200 pb-2">
        <ListFilter className="w-3.5 h-3.5 text-sky-600" />
        <span>On this page</span>
      </div>

      <ul className="space-y-1 text-xs font-sans border-l border-slate-200">
        {tocList.map((item) => {
          const isActive = activeId ? activeId === item.id : item.active;
          return (
            <li key={item.id} className={clsx(item.level === 3 ? "pl-3" : "")}>
              <a
                href={`#${item.id}`}
                className={clsx(
                  "block py-1.5 pl-3 -ml-px border-l-2 transition-all leading-normal tracking-normal",
                  isActive
                    ? "border-teal-600 text-teal-700 font-medium bg-teal-50/50 rounded-r-md"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="pt-4 border-t border-slate-100 text-[11px] font-sans text-slate-400 tracking-normal">
        <p className="mb-0">Press <kbd className="px-1 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200 tracking-normal">Cmd+K</kbd> to jump to any section.</p>
      </div>
    </nav>
  );
}
