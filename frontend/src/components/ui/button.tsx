import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import "./../../app/globals.css";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          outline: "border border-input hover:bg-accent hover:text-accent-foreground",
          // more...
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 px-3",
          lg: "h-11 px-8",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
      return (
          <button
              className={cn(buttonVariants({ variant, size }), className)}
              ref={ref}
              {...props}
          />
      )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
