import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "success" | "warning" | "error" | "neutral"
}

const badgeVariants = {
  default: "border-slate-200 bg-slate-100 text-slate-700",
  neutral: "border-slate-200 bg-slate-50 text-slate-600",
  primary: "border-sky-200/80 bg-sky-50 text-sky-700",
  secondary: "border-teal-200/80 bg-teal-50 text-teal-700",
  outline: "border-slate-200 bg-transparent text-slate-600",
  success: "border-emerald-200/80 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200/80 bg-amber-50 text-amber-700",
  error: "border-rose-200/80 bg-rose-50 text-rose-700",
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium tracking-tight select-none",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
