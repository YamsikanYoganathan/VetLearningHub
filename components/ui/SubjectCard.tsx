import React from "react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface SubjectCardProps {
  title: string;
  description: string;
  noteCount?: number;
  icon?: React.ReactNode | string;
  href?: string;
}

export function SubjectCard({
  title,
  description,
  noteCount = 0,
  icon,
  href = "#",
}: SubjectCardProps) {
  const renderIcon = () => {
    if (typeof icon === "string") {
      const IconComponent =
        (LucideIcons as unknown as Record<string, React.ElementType>)[icon] ||
        LucideIcons.BookOpen;
      return <IconComponent className="w-6 h-6" />;
    }
    return icon || <LucideIcons.BookOpen className="w-6 h-6" />;
  };

  const CardContent = (
    <div className="group bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-teal-600 hover:ring-2 hover:ring-teal-600/30 transition-all duration-300 ease-in-out flex flex-col justify-between h-full cursor-pointer">
      <div>
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-sm group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
            {renderIcon()}
          </div>
          <Badge variant={noteCount > 0 ? "default" : "secondary"}>
            {noteCount} {noteCount === 1 ? "Note" : "Notes"}
          </Badge>
        </div>

        {/* Title: MUST be sans-serif with normal tracking per CRITICAL TYPOGRAPHY UPDATE */}
        <h3 className="font-semibold text-xl text-foreground mb-3 group-hover:text-primary transition-colors tracking-tight">
          {title}
        </h3>

        {/* Description: MUST be serif with exactly 1.4 line-height and mb-6 for maximum legibility */}
        <p className="text-base text-muted-foreground leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-sans font-semibold text-primary group-hover:underline underline-offset-4 transition-colors tracking-normal">
        <span>Explore Protocols</span>
        <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
