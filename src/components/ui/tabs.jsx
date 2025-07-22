"use client"

import React from "react"

const Tabs = ({ value, onValueChange, children, className = "" }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child) => React.cloneElement(child, { value, onValueChange }))}
    </div>
  )
}

const TabsList = ({ children, className = "" }) => {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
    >
      {children}
    </div>
  )
}

const TabsTrigger = ({ value: triggerValue, children, value, onValueChange, className = "" }) => {
  const isActive = value === triggerValue
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive ? "bg-background text-foreground shadow-sm" : ""
      } ${className}`}
      onClick={() => onValueChange?.(triggerValue)}
    >
      {children}
    </button>
  )
}

const TabsContent = ({ value: contentValue, children, value, className = "" }) => {
  if (value !== contentValue) return null
  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </div>
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
