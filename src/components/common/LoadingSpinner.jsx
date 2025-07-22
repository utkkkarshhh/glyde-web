export function LoadingSpinner({ size = "md", color = "orange" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div
      className={`${sizeClasses[size]} border-2 border-[#FF7F00] border-t-transparent rounded-full animate-spin`}
    ></div>
  )
}

export function ServiceCardSkeleton() {
  return (
    <div className="animate-pulse bg-white/80 backdrop-blur-sm border-[#FF7F00]/10 rounded-lg p-4">
      <div className="flex gap-3">
        <div className="w-20 h-20 bg-[#FF7F00]/20 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="h-4 bg-[#FF7F00]/20 rounded w-32"></div>
              <div className="h-3 bg-[#FF7F00]/30 rounded w-16"></div>
            </div>
            <div className="h-4 bg-[#FF7F00]/40 rounded w-12"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          <div className="flex items-center gap-4">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#FF7F00]/20 rounded-full"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
