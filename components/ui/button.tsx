import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link" | "danger"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const buttonVariants = {
  variant: {
    default: "bg-primary text-white hover:bg-primary-hover shadow-xs active:scale-[0.985] transition-all",
    secondary: "bg-secondary text-white hover:bg-secondary-hover shadow-xs active:scale-[0.985] transition-all",
    outline: "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 shadow-xs active:scale-[0.985] transition-all",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.985] transition-all",
    link: "text-primary underline-offset-4 hover:underline p-0 h-auto font-normal",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-xs active:scale-[0.985] transition-all",
  },
  size: {
    default: "h-9 px-4 py-2 text-xs sm:text-sm font-medium rounded-md",
    sm: "h-8 px-3 text-xs font-medium rounded-md",
    lg: "h-11 px-5 text-sm sm:text-base font-medium rounded-md",
    icon: "h-9 w-9 p-0 rounded-md",
  },
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const combinedClasses = cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
      buttonVariants.variant[variant],
      buttonVariants.size[size],
      className
    )

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(combinedClasses, (children.props as any).className),
        ...props,
      })
    }

    return (
      <button
        className={combinedClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
