// src/components/ui/input.tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  withIcon?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, withIcon = false, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex items-center",
          withIcon ? "pl-10" : "",
          className
        )}
      >
        {withIcon && (
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-md border border-input bg-background px-4 py-2",
            "text-sm placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
