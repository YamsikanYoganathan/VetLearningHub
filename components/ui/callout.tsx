import * as React from "react"
import { AlertCircle, Lightbulb, Stethoscope, BookOpen, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export type CalloutType = "key_point" | "important" | "clinical_note" | "exam_tip" | "definition" | "warning"

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: CalloutType
  title?: string
}

const calloutConfig = {
  key_point: {
    icon: Lightbulb,
    classes: "border-l-primary bg-primary/5 text-primary",
    defaultTitle: "Key Point",
  },
  important: {
    icon: AlertCircle,
    classes: "border-l-error bg-error/5 text-error",
    defaultTitle: "Important",
  },
  clinical_note: {
    icon: Stethoscope,
    classes: "border-l-info bg-info/5 text-info",
    defaultTitle: "Clinical Note",
  },
  exam_tip: {
    icon: BookOpen,
    classes: "border-l-success bg-success/5 text-success",
    defaultTitle: "Exam Tip",
  },
  definition: {
    icon: Info,
    classes: "border-l-secondary-foreground bg-secondary text-secondary-foreground",
    defaultTitle: "Definition",
  },
  warning: {
    icon: AlertTriangle,
    classes: "border-l-warning bg-warning/5 text-warning",
    defaultTitle: "Warning",
  },
}

export function Callout({
  className,
  type = "key_point",
  title,
  children,
  ...props
}: CalloutProps) {
  const config = calloutConfig[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "my-6 flex flex-col gap-2 rounded-r-lg border-l-4 p-4",
        config.classes,
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 font-semibold tracking-tight">
        <Icon className="h-5 w-5" />
        <span>{title || config.defaultTitle}</span>
      </div>
      <div className="text-sm leading-relaxed opacity-90 prose-p:my-0">
        {children}
      </div>
    </div>
  )
}
