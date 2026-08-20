import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center gap-1.5 text-xs sm:text-sm text-text-muted overflow-x-auto whitespace-nowrap py-1 select-none",
        className
      )}
    >
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-text-muted hover:text-primary transition-colors focus-ring rounded px-1 py-0.5"
        title="Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1 || item.isCurrent;

        return (
          <React.Fragment key={`${item.label}-${index}`}>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" aria-hidden="true" />
            {isLast || !item.href ? (
              <span
                className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none px-1 py-0.5"
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-text-secondary hover:text-primary transition-colors truncate max-w-[150px] sm:max-w-none focus-ring rounded px-1 py-0.5"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
