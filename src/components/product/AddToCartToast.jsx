'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, ShoppingCart, X, ArrowRight } from 'lucide-react'
import OptimizedImage from '@/components/OptimizedImage'
import Link from 'next/link'
import { useEffect } from 'react'

const AddToCartToast = ({ isOpen, onClose, product, size, quantity }) => {
  // Auto close after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  if (!product) return null

  // Formata o preço como "$ XX.XXX"
  const formatPrice = (value) => {
    return `$${value.toLocaleString('es-AR')}`
  }

  const formattedPrice = formatPrice(product.price)
  const totalPrice = formatPrice(product.price * quantity)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          {/* Toast Container - Top Right on Desktop, Bottom on Mobile */}
          <div className="fixed bottom-0 left-0 right-0 md:top-4 md:right-4 md:bottom-auto md:left-auto p-4 md:p-0 flex justify-center md:justify-end pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 50, x: 0 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 50, x: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg md:max-w-xl pointer-events-auto"
            >
              <div className="bg-[#0a0a0a] border-2 border-white/30 rounded-xl shadow-2xl shadow-white/10 overflow-hidden">
                {/* Header */}
                <div className="bg-white px-5 md:px-6 py-3.5 md:py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-9 md:h-9 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={3} />
                    </div>
                    <h3 className="text-black font-bold text-base md:text-lg">
                      ¡Agregado al Carrito!
                    </h3>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-7 h-7 flex items-center justify-center hover:bg-black/10 text-black rounded-lg transition-colors"
                    aria-label="Cerrar"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="bg-[#0a0a0a] p-5 md:p-6">
                  <div className="flex gap-4 md:gap-5">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                      <OptimizedImage
                        src={product.image || '/images/products/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                        sizes="96px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-base md:text-lg line-clamp-2 mb-2">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-3 md:gap-4 text-sm md:text-base text-white/70 mb-2">
                        <span>Talle: <span className="text-white font-semibold">{size}</span></span>
                        <span>•</span>
                        <span>Cantidad: <span className="text-white font-semibold">{quantity}</span></span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <p className="text-white font-bold text-lg md:text-xl">
                          {totalPrice}
                        </p>
                        {quantity > 1 && (
                          <span className="text-white/50 text-sm">
                            ({formattedPrice} c/u)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={onClose}
                      className="flex-1 px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-sm md:text-base font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap"
                    >
                      Seguir Comprando
                    </button>
                    <Link
                      href="/carrito"
                      className="flex-1 px-5 py-3 bg-white hover:bg-gray-200 text-black text-sm md:text-base font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group whitespace-nowrap"
                    >
                      <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Ver Carrito</span>
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="h-1 bg-white origin-left"
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AddToCartToast
