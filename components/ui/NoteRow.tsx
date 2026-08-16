import React from "react";
import Link from "next/link";
import { Clock, ChevronRight, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      className="group block p-5 sm:p-6 rounded-2xl border border-border ring-1 ring-black/5 bg-background hover:bg-muted/50 hover:shadow-md hover:-translate-y-1 hover:ring-primary/30 transition-all duration-300 ease-in-out shadow-sm"
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-1">
          <div className="flex items-center gap-2 flex-wrap">

            {subSection && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-primary/5 text-primary border border-border-subtle px-2.5 py-0.5 rounded-full">
                <Layers className="w-3 h-3 text-primary" />
                <span>{subSection}</span>
              </span>
            )}
            {status === "draft" && (
              <Badge variant="secondary">Draft</Badge>
            )}
          </div>
          <h3 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors tracking-tight">
            {title}
          </h3>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-2 line-clamp-2">
          {snippet}
        </p>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-3">
          <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated {date}</span>
          </div>
          
          <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:underline underline-offset-4 transition-colors">
            <span>Read Protocol</span>
            <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
