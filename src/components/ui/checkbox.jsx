"use client"

import React from "react"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef(({ className = "", checked, onCheckedChange, ...props }, ref) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      ref={ref}
      className={`peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ${className}`}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      {checked && <Check className="h-4 w-4" />}
    </button>
  )
})

Checkbox.displayName = "Checkbox"

export { Checkbox }
