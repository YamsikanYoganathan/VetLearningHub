import * as React from "react"
import { AlertCircle, Lightbulb, Stethoscope, GraduationCap, AlertTriangle, BookMarked } from "lucide-react"
import { cn } from "@/lib/utils"

export type CalloutType = "key_point" | "important" | "clinical_note" | "exam_tip" | "definition" | "warning"

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CalloutType
  title?: string
}

const calloutConfig: Record<CalloutType, {
  icon: React.ElementType
  borderColor: string
  bg: string
  textColor: string
  titleColor: string
  defaultTitle: string
}> = {
  key_point: {
    icon: Lightbulb,
    borderColor: "border-l-sky-500",
    bg: "bg-sky-50/70 border-sky-100",
    textColor: "text-text-secondary",
    titleColor: "text-sky-900",
    defaultTitle: "Key Concept",
  },
  clinical_note: {
    icon: Stethoscope,
    borderColor: "border-l-teal-500",
    bg: "bg-teal-50/70 border-teal-100",
    textColor: "text-text-secondary",
    titleColor: "text-teal-900",
    defaultTitle: "Clinical Consideration",
  },
  important: {
    icon: AlertCircle,
    borderColor: "border-l-rose-500",
    bg: "bg-rose-50/70 border-rose-100",
    textColor: "text-text-secondary",
    titleColor: "text-rose-900",
    defaultTitle: "Important Note",
  },
  exam_tip: {
    icon: GraduationCap,
    borderColor: "border-l-indigo-500",
    bg: "bg-indigo-50/70 border-indigo-100",
    textColor: "text-text-secondary",
    titleColor: "text-indigo-900",
    defaultTitle: "Board Review Point",
  },
  definition: {
    icon: BookMarked,
    borderColor: "border-l-slate-400",
    bg: "bg-slate-50 border-slate-200",
    textColor: "text-text-secondary",
    titleColor: "text-foreground",
    defaultTitle: "Definition",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-l-amber-500",
    bg: "bg-amber-50/70 border-amber-100",
    textColor: "text-text-secondary",
    titleColor: "text-amber-900",
    defaultTitle: "Caution / Warning",
  },
}

export function Callout({
  className,
  type = "key_point",
  title,
  children,
  ...props
}: CalloutProps) {
  const config = calloutConfig[type] || calloutConfig.key_point
  const Icon = config.icon

  return (
    <aside
      className={cn(
        "my-6 rounded-r-2xl border border-l-[4px] p-4 transition-all duration-150 shadow-2xs",
        config.borderColor,
        config.bg,
        className
      )}
      role="note"
      {...props}
    >
      <div className="flex items-center gap-2 mb-1.5 font-semibold text-sm tracking-tight">
        <Icon className={cn("h-4 w-4 shrink-0", config.titleColor)} aria-hidden="true" />
        <span className={config.titleColor}>{title || config.defaultTitle}</span>
      </div>
      <div className={cn("text-sm leading-relaxed", config.textColor, "prose-p:my-1 prose-p:leading-relaxed")}>
        {children}
      </div>
    </aside>
  )
}
