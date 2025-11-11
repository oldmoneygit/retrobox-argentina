'use client'

import { useState } from 'react'
import OptimizedImage from '@/components/OptimizedImage'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { motion } from 'framer-motion'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { id, name, slug, image, price, size, quantity } = item

  const itemTotal = price * quantity

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(item.variantKey, quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < 10) {
      onUpdateQuantity(item.variantKey, quantity + 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dark:bg-white/5 dark:border-white/10 dark:hover:border-orange-500/30 bg-black/5 border border-black/10 rounded-xl p-4 md:p-6 hover:border-orange-500/30 transition-all duration-300"
    >
      <div className="flex gap-4 md:gap-6">
        {/* Product Image */}
        <Link
          href={`/product/${slug}`}
          className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 dark:bg-white/5 bg-black/5 rounded-lg overflow-hidden group"
        >
          <div className="relative w-full h-full">
            <OptimizedImage
              src={image || '/images/products/placeholder.jpg'}
              alt={name}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-300"
              sizes="128px"
            />
          </div>
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            {/* Product Name */}
            <Link
              href={`/product/${slug}`}
              className="block mb-2 hover:text-orange-500 transition-colors"
            >
              <h3 className="text-base md:text-lg font-bold dark:text-white text-black line-clamp-2">
                {name}
              </h3>
            </Link>

            {/* Size */}
            <p className="dark:text-white/60 text-black/60 text-sm mb-1">
              Talla: <span className="dark:text-white text-black font-semibold">{size}</span>
            </p>

            {/* Price */}
            <p className="dark:text-white text-black text-xl md:text-2xl font-bold">
              ${price.toLocaleString('es-AR')}
            </p>
          </div>

          {/* Quantity Controls & Remove */}
          <div className="flex items-center justify-between gap-4 mt-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2 dark:bg-black/50 dark:border-white/20 bg-white/50 border border-black/20 rounded-lg p-1">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 flex items-center justify-center dark:text-white dark:hover:text-orange-500 text-black hover:text-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity === 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="dark:text-white text-black font-bold text-base md:text-lg w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="w-8 h-8 flex items-center justify-center dark:text-white dark:hover:text-orange-500 text-black hover:text-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity === 10}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Item Total */}
            <div className="hidden md:block text-right">
              <p className="dark:text-white/60 text-black/60 text-xs mb-1">Total</p>
              <p className="dark:text-white text-black text-lg font-bold">
                ${itemTotal.toLocaleString('es-AR')}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => onRemove(item.variantKey)}
              className="w-9 h-9 flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
              aria-label="Eliminar producto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item Total - Mobile Only */}
          <div className="md:hidden mt-3 pt-3 dark:border-t dark:border-white/10 border-t border-black/10">
            <div className="flex items-center justify-between">
              <span className="dark:text-white/60 text-black/60 text-sm">Total del producto:</span>
              <span className="dark:text-white text-black text-lg font-bold">
                ${itemTotal.toLocaleString('es-AR')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CartItem
