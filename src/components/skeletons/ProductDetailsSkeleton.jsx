'use client'

const ProductDetailsSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Breadcrumb */}
      <div className="h-4 bg-white/10 rounded w-1/3" />

      {/* Title */}
      <div className="space-y-2">
        <div className="h-8 bg-white/10 rounded w-3/4" />
        <div className="h-8 bg-white/10 rounded w-1/2" />
      </div>

      {/* Price */}
      <div className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/10">
        <div className="h-4 bg-white/10 rounded w-1/4" />
        <div className="h-10 bg-white/10 rounded w-2/5" />
      </div>

      {/* Size Selector */}
      <div className="space-y-3">
        <div className="h-5 bg-white/10 rounded w-1/4" />
        <div className="grid grid-cols-6 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-white/10 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="space-y-3">
        <div className="h-5 bg-white/10 rounded w-1/4" />
        <div className="h-12 bg-white/10 rounded-lg w-32" />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <div className="flex-1 h-14 bg-white/10 rounded-lg" />
        <div className="h-14 w-14 bg-white/10 rounded-lg" />
      </div>

      {/* Features */}
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-4 bg-white/10 rounded w-full" />
        ))}
      </div>
    </div>
  )
}

export default ProductDetailsSkeleton
