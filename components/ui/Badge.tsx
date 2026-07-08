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
  sky: "bg-sky-50 text-sky-700 border-sky-200/80",
  teal: "bg-sky-50 text-sky-700 border-sky-200/80",
  amber: "bg-sky-50 text-sky-700 border-sky-200/80",
  emerald: "bg-sky-50 text-sky-700 border-sky-200/80",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
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
