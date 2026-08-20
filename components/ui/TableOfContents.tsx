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
      <div className={cn("border border-border rounded-xl bg-surface-subtle/80 mb-6", className)}>
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary cursor-pointer"
          aria-expanded={isMobileOpen}
        >
          <span className="flex items-center gap-2">
            <ListFilter className="w-3.5 h-3.5 text-primary" />
            <span>Table of Contents ({items.length} sections)</span>
          </span>
          <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isMobileOpen ? "rotate-180" : "")} />
        </button>

        {isMobileOpen && (
          <nav aria-label="Table of contents mobile" className="px-4 pb-4 pt-1 border-t border-border">
            <ul className="space-y-2 text-sm">
              {items.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id} style={{ paddingLeft: `${Math.max(0, (item.level - 2) * 12)}px` }}>
                    <button
                      type="button"
                      onClick={() => handleScrollTo(item.id)}
                      className={cn(
                        "text-left text-xs py-1 transition-colors block w-full truncate cursor-pointer",
                        isActive ? "text-primary font-semibold" : "text-text-secondary hover:text-foreground"
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
    <nav aria-label="Table of contents" className={cn("space-y-3 select-none", className)}>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
        <ListFilter className="w-3.5 h-3.5 text-primary" />
        <span>On this page</span>
      </div>

      <ul className="space-y-1 text-xs">
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
                  "text-left py-1.5 px-2.5 rounded-lg transition-all block w-full leading-snug truncate cursor-pointer",
                  isActive
                    ? "bg-primary-subtle text-primary font-semibold border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-subtle"
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
