'use client'

import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import ProductCard from '@/components/store/ProductCard'
import { Clock } from 'lucide-react'

const RecentlyViewed = ({ currentProductId }) => {
  const { recentlyViewed } = useRecentlyViewed()

  // Filter out current product if on product page
  const productsToShow = currentProductId
    ? recentlyViewed.filter((p) => p.id !== currentProductId)
    : recentlyViewed

  // Don't show if no products
  if (productsToShow.length === 0) {
    return null
  }

  return (
    <section className="py-8 md:py-12 bg-black">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="p-2 md:p-3 bg-white/5 rounded-lg border border-white/10">
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase">
              Vistos Recientemente
            </h2>
            <p className="text-xs md:text-sm text-white/60">
              Productos que has explorado
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {productsToShow.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                images: product.image ? [{ src: product.image, alt: product.title }] : [],
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentlyViewed
