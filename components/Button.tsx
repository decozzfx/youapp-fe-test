import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gradient?: boolean;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      gradient = false,
      variant = "default",
      size = "default",
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white",
          "disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-gradient-button text-white": gradient,
            "bg-gray-800 text-white hover:bg-gray-700":
              !gradient && variant === "default",
            "border border-gray-700 bg-transparent hover:bg-gray-800":
              variant === "outline",
            "h-9 px-4 py-2": size === "default",
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-8": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
