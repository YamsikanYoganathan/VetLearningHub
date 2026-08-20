import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "destructive"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const variantStyles: Record<string, string> = {
  default:
    "bg-primary text-white hover:bg-primary-hover shadow-xs hover:shadow-sm border border-transparent",
  secondary:
    "bg-white border border-border text-foreground hover:bg-surface-subtle hover:border-sky-300 shadow-2xs",
  accent:
    "bg-secondary text-white hover:bg-secondary-hover shadow-xs",
  outline:
    "border border-border bg-transparent hover:bg-surface-subtle text-foreground hover:border-border",
  ghost:
    "hover:bg-surface-subtle text-text-secondary hover:text-foreground",
  destructive:
    "bg-error text-white hover:bg-error/90 shadow-xs",
  link:
    "text-primary underline-offset-4 hover:underline p-0 h-auto font-medium",
};

const sizeStyles: Record<string, string> = {
  default: "h-10 px-4 py-2 rounded-xl text-sm",
  sm: "h-8 px-3 text-xs rounded-lg",
  lg: "h-11 px-6 text-sm sm:text-base rounded-xl font-semibold",
  icon: "h-9 w-9 rounded-lg",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const combinedClassName = cn(
      "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-150 focus-ring disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98] cursor-pointer",
      variantStyles[variant] || variantStyles.default,
      sizeStyles[size] || sizeStyles.default,
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(combinedClassName, (children as React.ReactElement<any>).props.className),
        ref,
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
