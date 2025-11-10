'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Flame, Check, Truck, Clock, Tag } from 'lucide-react'
import { useBlackFriday } from '@/context/BlackFridayContext'

export default function BlackFridayPopup() {
  const { hasSeenPopup, markPopupAsSeen, packsRemaining } = useBlackFriday()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!hasSeenPopup) {
      // Show popup after 2.5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 2500)

      return () => clearTimeout(timer)
    }
  }, [hasSeenPopup])

  const handleClose = () => {
    setIsOpen(false)
    markPopupAsSeen()
  }

  const handleAccept = () => {
    setIsOpen(false)
    markPopupAsSeen()

    // Scroll to products
    const productsSection = document.getElementById('bestsellers')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9998]"
          />

          {/* Popup */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="relative bg-gradient-to-br from-gray-dark via-black to-gray-dark rounded-3xl p-6 md:p-8 shadow-2xl border-2 border-orange-500">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Icon */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                  className="flex justify-center mb-4"
                >
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full">
                    <Flame className="w-12 h-12 text-white" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-black text-center uppercase mb-2 text-yellow-400">
                  🔥 PACK BLACK
                  <br />
                  BLACK FRIDAY
                </h2>

                <div className="text-center mb-6">
                  <p className="text-xl md:text-2xl font-black text-orange-500 mb-1">
                    4 CAMISETAS RETRO
                  </p>
                  <p className="text-3xl md:text-4xl font-black text-yellow-400">
                    ARS 59.900
                  </p>
                  <p className="text-sm text-green-400 mt-1 font-bold">
                    = $14.900 cada una
                  </p>
                  <p className="text-sm text-white/60 mt-1">(Envío gratis incluido)</p>
                </div>

                {/* Urgency Alert */}
                <div className="mb-6 p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-orange-500 rounded-xl">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Flame className="w-5 h-5 text-orange-400" />
                    <span className="text-white font-bold text-sm">ATENCIÓN</span>
                    <Flame className="w-5 h-5 text-orange-400" />
                  </div>
                  <p className="text-center text-white text-lg font-black">
                    Solo quedan{' '}
                    <span className="text-yellow-400 text-2xl">{packsRemaining}</span>
                    {' '}packs hoy
                  </p>
                  <p className="text-center text-white/60 text-xs mt-1">
                    Reset a las 00:00h • Oferta limitada
                  </p>
                </div>

                {/* Benefits - Simplified */}
                <div className="space-y-2 md:space-y-3 mb-6">
                  <div className="flex items-start gap-2 md:gap-3 bg-white/5 p-2.5 md:p-3 rounded-xl border border-white/10">
                    <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm md:text-base">Solo 15 packs diarios</p>
                      <p className="text-white/60 text-xs md:text-sm">Black Friday limitado</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3 bg-white/5 p-2.5 md:p-3 rounded-xl border border-white/10">
                    <Tag className="w-4 h-4 md:w-5 md:h-5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm md:text-base">Precio insuperable</p>
                      <p className="text-white/60 text-xs md:text-sm">4 camisetas por $59.900</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 md:gap-3 bg-white/5 p-2.5 md:p-3 rounded-xl border border-white/10">
                    <Truck className="w-4 h-4 md:w-5 md:h-5 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm md:text-base">Envío gratis</p>
                      <p className="text-white/60 text-xs md:text-sm">Incluido en el precio</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={handleAccept}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 md:py-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-black uppercase text-base md:text-lg rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
                >
                  ARMAR MI PACK BLACK
                </motion.button>

                <button
                  onClick={handleClose}
                  className="w-full mt-3 py-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
