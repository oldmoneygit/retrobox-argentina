'use client'

const ProductCardSkeleton = () => {
  return (
    <div className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/10 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-gradient-to-br from-white/10 to-white/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white/40 rounded-full animate-spin" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-1/2" />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="h-3 bg-white/10 rounded w-1/3" />
          <div className="h-6 bg-white/10 rounded w-2/5" />
        </div>

        {/* Button */}
        <div className="h-10 bg-white/10 rounded-lg" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
