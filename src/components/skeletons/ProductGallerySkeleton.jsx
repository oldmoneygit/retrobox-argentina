'use client'

const ProductGallerySkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Main Image */}
      <div className="relative aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-white/20 border-t-white/40 rounded-full animate-spin" />
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-white/10 rounded-lg border border-white/10"
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGallerySkeleton
