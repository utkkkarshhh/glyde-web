const Separator = ({ className = "", orientation = "horizontal" }) => {
  return (
    <div
      className={`shrink-0 bg-border ${
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]"
      } ${className}`}
    />
  )
}

export { Separator }
