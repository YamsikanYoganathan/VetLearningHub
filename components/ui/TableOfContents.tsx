"use client";

import React, { useEffect, useState } from "react";
import { ListFilter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
  isMobile?: boolean;
}

export function TableOfContents({ items, className, isMobile = false }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0% -70% 0%" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
      setIsMobileOpen(false);
    }
  };

  // Mobile Accordion View
  if (isMobile) {
    return (
      <div className={cn("border border-slate-200 rounded-lg bg-slate-50/80 mb-6", className)}>
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-700"
          aria-expanded={isMobileOpen}
        >
          <span className="flex items-center gap-2">
            <ListFilter className="w-3.5 h-3.5 text-sky-600" />
            <span>Table of Contents ({items.length} sections)</span>
          </span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMobileOpen ? "rotate-180" : "")} />
        </button>

        {isMobileOpen && (
          <nav aria-label="Table of contents mobile" className="px-4 pb-4 pt-1 border-t border-slate-200/80">
            <ul className="space-y-2 text-sm">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id} style={{ paddingLeft: `${Math.max(0, (item.level - 2) * 12)}px` }}>
                    <button
                      type="button"
                      onClick={() => handleScrollTo(item.id)}
                      className={cn(
                        "text-left text-xs py-1 transition-colors block w-full truncate",
                        isActive ? "text-primary font-semibold" : "text-slate-600 hover:text-slate-900"
                      )}
                    >
                      {item.text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    );
  }

  // Desktop Sticky Sidebar View
  return (
    <nav aria-label="Table of contents" className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-200">
        <ListFilter className="w-3.5 h-3.5 text-sky-600" />
        <span>On this page</span>
      </div>

      <ul className="space-y-1.5 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              style={{ paddingLeft: `${Math.max(0, (item.level - 2) * 10)}px` }}
            >
              <button
                type="button"
                onClick={() => handleScrollTo(item.id)}
                className={cn(
                  "text-left py-1 px-2 rounded-md transition-all block w-full leading-snug truncate",
                  isActive
                    ? "bg-sky-50 text-sky-800 font-semibold border-l-2 border-primary"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
