'use client'

import { Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWishlist } from '@/context/WishlistContext'
import { useState } from 'react'

/**
 * WishlistButton - Botão de favoritos com animação
 * Monocromático design
 *
 * @param {Object} product - Produto para adicionar/remover da wishlist
 * @param {string} variant - 'icon' (só ícone) ou 'full' (ícone + texto)
 * @param {string} size - 'sm', 'md', 'lg'
 * @param {string} className - Classes CSS adicionais
 */
const WishlistButton = ({
  product,
  variant = 'icon',
  size = 'md',
  className = ''
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist()
  const [isAnimating, setIsAnimating] = useState(false)
  const isFavorited = isInWishlist(product.id)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 600)

    // Toggle wishlist
    toggleWishlist(product)
  }

  // Size variants
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  // Icon only variant
  if (variant === 'icon') {
    return (
      <motion.button
        onClick={handleClick}
        className={`
          relative flex items-center justify-center
          ${sizeClasses[size]}
          rounded-full
          ${isFavorited
            ? 'bg-white/20 text-white hover:bg-white/30'
            : 'bg-white/10 text-white hover:bg-white/20'
          }
          backdrop-blur-sm
          transition-all duration-300
          group
          ${className}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isFavorited ? 'Remover de favoritos' : 'Agregar a favoritos'}
      >
        {/* Heart icon with fill animation */}
        <motion.div
          animate={{
            scale: isAnimating ? [1, 1.3, 1] : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            size={iconSizes[size]}
            className={`
              transition-all duration-300
              ${isFavorited ? 'fill-white' : 'fill-transparent'}
            `}
            strokeWidth={2.5}
          />
        </motion.div>

        {/* Particles animation on favorite */}
        <AnimatePresence>
          {isAnimating && isFavorited && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: [0, Math.cos((i * Math.PI * 2) / 6) * 20],
                    y: [0, Math.sin((i * Math.PI * 2) / 6) * 20],
                    opacity: [1, 1, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.button>
    )
  }

  // Full button variant with text
  return (
    <motion.button
      onClick={handleClick}
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-lg
        ${isFavorited
          ? 'bg-white/20 text-white border-2 border-white/30 hover:bg-white/30'
          : 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20'
        }
        backdrop-blur-sm
        transition-all duration-300
        font-semibold uppercase text-sm
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={{
          scale: isAnimating ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          size={iconSizes[size]}
          className={`
            transition-all duration-300
            ${isFavorited ? 'fill-white' : 'fill-transparent'}
          `}
          strokeWidth={2.5}
        />
      </motion.div>
      <span>{isFavorited ? 'En Favoritos' : 'Agregar a Favoritos'}</span>
    </motion.button>
  )
}

export default WishlistButton

