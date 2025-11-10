'use client'

import { useState } from 'react'
import OptimizedImage from '@/components/OptimizedImage'
import Link from 'next/link'
import { getImageConfig } from '@/utils/performance'
import WishlistButton from '@/components/wishlist/WishlistButton'
import QuickViewModal from '@/components/product/QuickViewModal'
import { motion } from 'framer-motion'

const ProductCard = ({ product, index = 0 }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const {
    name,
    slug,
    price,
    regularPrice,
    image,
    stock = 'available',
  } = product

  const productUrl = `/product/${slug}`
  const imageConfig = getImageConfig(index, 20) // Assume 20 total products max

  // Black November: Calculate original price (50% more expensive)
  const originalPrice = regularPrice || Math.round(price * 1.5)
  const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100)

  const stockBadge = {
    available: { text: 'En Stock', color: 'bg-white/20' },
    limited: { text: 'Stock Limitado', color: 'bg-white/30' },
    soldout: { text: 'Agotado', color: 'bg-black/50' },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className="group h-full flex flex-col"
    >
      <Link href={productUrl} className="flex-1 flex flex-col">
        <div className="relative aspect-[3/4] bg-white rounded-xl md:rounded-2xl overflow-hidden mb-3 md:mb-4">
          {/* Black November Badge - Mobile First */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1.5 left-1.5 md:top-2 md:left-2 z-10 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[8px] md:text-[10px] font-black px-1.5 py-0.5 md:px-2 md:py-1 rounded shadow-lg uppercase tracking-tight md:tracking-wide"
          >
            🔥 BLACK NOV
          </motion.div>

          {/* Discount Badge - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1.5 right-9 md:top-2 md:right-12 z-10 bg-gradient-to-r from-white to-blue-100 text-black text-[10px] md:text-xs font-black px-1.5 py-0.5 md:px-2 md:py-1 rounded shadow-lg"
          >
            -{discountPercentage}%
          </motion.div>

          {/* Stock Badge - Below Black November on Mobile */}
          {stock !== 'available' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`absolute top-8 left-1.5 md:top-12 md:left-2 z-10 ${stockBadge[stock].color} text-white text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 rounded backdrop-blur-sm`}
            >
              {stockBadge[stock].text}
            </motion.div>
          )}

          {/* Wishlist Button - Adjusted for mobile */}
          <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 z-10">
            <WishlistButton product={product} size="sm" />
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <OptimizedImage
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500"
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 45vw, 23vw"
              loading={imageConfig.loading}
              priority={imageConfig.priority}
              quality={imageConfig.quality}
            />
          </motion.div>
        </div>

        <div className="space-y-1.5 md:space-y-2">
          <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 group-hover:text-white/80 transition-colors min-h-[2.5rem]">
            {name}
          </h3>

          <div className="space-y-0.5 md:space-y-1">
            {/* Original Price (Always show for Black November) */}
            <p className="text-white/20 text-xs md:text-sm line-through">
              ${originalPrice.toLocaleString('es-AR')}
            </p>
            {/* Promotional Price */}
            <p className="text-white font-bold text-base md:text-lg lg:text-xl">
              ${typeof price === 'number' ? price.toLocaleString('es-AR') : price}
            </p>
          </div>
        </div>
      </Link>

      {/* Ver Detalles Button - Outside Link - More Discreet */}
      {stock === 'available' && (
        <motion.button
          onClick={() => setIsQuickViewOpen(true)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-2 md:py-2.5 rounded-lg hover:border-white/30 transition-all duration-300 text-[10px] md:text-xs text-center whitespace-nowrap mt-1.5 md:mt-2"
        >
          Ver Detalles
        </motion.button>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </motion.div>
  )
}

export default ProductCard

