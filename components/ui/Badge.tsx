import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type BadgeVariant = "sky" | "slate" | "outline" | "teal" | "amber" | "emerald";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

// All variants mapped strictly to disciplined Sky Blue or neutral Slate per Task 2
const variantStyles: Record<string, string> = {
  sky: "bg-sky-50 text-sky-700 border-sky-100 ring-1 ring-sky-700/10",
  teal: "bg-teal-50 text-teal-700 border-teal-100 ring-1 ring-teal-700/10",
  amber: "bg-amber-50 text-amber-700 border-amber-100 ring-1 ring-amber-700/10",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100 ring-1 ring-emerald-700/10",
  slate: "bg-slate-100 text-slate-700 border-slate-200 ring-1 ring-slate-700/10",
  outline: "bg-transparent text-slate-600 border-slate-300",
};

export function Badge({ variant = "sky", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          // CRITICAL TYPOGRAPHY UPDATE: Bold UI elements must use font-sans without tracking-tight
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold border tracking-normal shadow-sm transition-colors",
          variantStyles[variant] || variantStyles.sky,
          className
        )
      )}
      {...props}
    >
      {children}
    </span>
  );
}
