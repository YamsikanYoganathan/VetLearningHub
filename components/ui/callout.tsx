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
    borderColor: "border-l-sky-600",
    bg: "bg-sky-50/50",
    textColor: "text-slate-700",
    titleColor: "text-sky-900",
    defaultTitle: "Key Concept",
  },
  clinical_note: {
    icon: Stethoscope,
    borderColor: "border-l-teal-600",
    bg: "bg-teal-50/50",
    textColor: "text-slate-700",
    titleColor: "text-teal-900",
    defaultTitle: "Clinical Consideration",
  },
  important: {
    icon: AlertCircle,
    borderColor: "border-l-rose-500",
    bg: "bg-rose-50/40",
    textColor: "text-slate-700",
    titleColor: "text-rose-900",
    defaultTitle: "Important Note",
  },
  exam_tip: {
    icon: GraduationCap,
    borderColor: "border-l-indigo-500",
    bg: "bg-indigo-50/40",
    textColor: "text-slate-700",
    titleColor: "text-indigo-900",
    defaultTitle: "Board Review Point",
  },
  definition: {
    icon: BookMarked,
    borderColor: "border-l-slate-400",
    bg: "bg-slate-50",
    textColor: "text-slate-700",
    titleColor: "text-slate-900",
    defaultTitle: "Definition",
  },
  warning: {
    icon: AlertTriangle,
    borderColor: "border-l-amber-500",
    bg: "bg-amber-50/40",
    textColor: "text-slate-700",
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
        "my-6 rounded-r-lg border border-l-[3.5px] border-slate-200/80 p-4 transition-all duration-150",
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
