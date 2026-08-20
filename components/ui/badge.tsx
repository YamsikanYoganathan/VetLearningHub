import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "success" | "warning" | "error" | "neutral"
}

const badgeVariants = {
  default: "border-border bg-surface-subtle text-foreground",
  neutral: "border-border bg-surface-subtle/80 text-muted-foreground",
  primary: "border-primary/25 bg-primary-subtle text-primary font-semibold",
  secondary: "border-secondary/25 bg-secondary-subtle text-secondary font-semibold",
  outline: "border-border bg-transparent text-text-secondary",
  success: "border-emerald-500/25 bg-emerald-50 text-emerald-700 font-semibold",
  warning: "border-amber-500/25 bg-amber-50 text-amber-800 font-semibold",
  error: "border-rose-500/25 bg-rose-50 text-rose-700 font-semibold",
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
