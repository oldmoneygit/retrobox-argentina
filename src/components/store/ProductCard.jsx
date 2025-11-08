'use client'

import OptimizedImage from '@/components/OptimizedImage'
import Link from 'next/link'
import { getImageConfig } from '@/utils/performance'
import WishlistButton from '@/components/wishlist/WishlistButton'
import { motion } from 'framer-motion'

const ProductCard = ({ product, index = 0 }) => {
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

  const stockBadge = {
    available: { text: 'En Stock', color: 'bg-white/20' },
    limited: { text: 'Stock Limitado', color: 'bg-white/30' },
    soldout: { text: 'Agotado', color: 'bg-black/50' },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group h-full flex flex-col"
    >
      <Link href={productUrl} className="flex-1 flex flex-col">
        <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-4">
          {/* Discount Badge */}
          {regularPrice && regularPrice > price && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-2 left-2 z-10 bg-gradient-to-r from-orange-500 to-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-md shadow-lg shadow-orange-500/30"
            >
              -{Math.round(((regularPrice - price) / regularPrice) * 100)}%
            </motion.div>
          )}

          {stock !== 'available' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`absolute top-2 ${regularPrice && regularPrice > price ? 'left-16' : 'left-2'} z-10 ${stockBadge[stock].color} text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm`}
            >
              {stockBadge[stock].text}
            </motion.div>
          )}

          <div className="absolute top-2 right-2 z-10">
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

        <div className="space-y-2">
          <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 group-hover:text-white/80 transition-colors min-h-[2.5rem]">
            {name}
          </h3>

          <div className="space-y-1">
            {regularPrice && regularPrice > price && (
              <p className="text-gray-medium text-xs line-through">
                ${regularPrice.toLocaleString('es-AR')}
              </p>
            )}
            <p className="text-white font-bold text-lg md:text-xl">
              ${typeof price === 'number' ? price.toLocaleString('es-AR') : price}
            </p>
          </div>

          {stock === 'available' && (
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black font-bold py-2 md:py-2.5 rounded-full group-hover:bg-gray-light transition-all duration-300 transform uppercase text-[10px] md:text-xs text-center whitespace-nowrap"
            >
              VER DETALLES
            </motion.div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard

