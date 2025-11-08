'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useBlackFriday } from '@/context/BlackFridayContext'
import { Flame, Package, X } from 'lucide-react'
import { useState, useEffect } from 'react'

const LiveSlotsIndicator = () => {
  const { packsRemaining, DAILY_PACK_LIMIT } = useBlackFriday()
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const isLowStock = packsRemaining < 15
  const isCritical = packsRemaining < 5

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Minimizar por padrão no mobile
      if (window.innerWidth < 768) {
        setIsMinimized(true)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (packsRemaining === 0) {
    return null // No mostrar si no hay packs disponibles
  }

  return (
    <AnimatePresence>
      {!isMinimized && (
        <>
          {/* Backdrop - Apenas no mobile para fechar ao clicar fora */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMinimized(true)}
              className="fixed inset-0 z-[69] bg-transparent"
              aria-label="Fechar widget"
            />
          )}

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`fixed z-[70] ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'}`}
          >
            <Link href="/#pack-insano">
              <motion.div
                whileHover={{ scale: isMobile ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative overflow-hidden shadow-2xl backdrop-blur-sm
                  transition-all duration-300 cursor-pointer group
                  ${isMobile ? 'rounded-xl' : 'rounded-2xl'}
                  ${isCritical
                    ? 'bg-gradient-to-br from-red-600/95 to-orange-600/95 border-2 border-red-400/50'
                    : isLowStock
                      ? 'bg-gradient-to-br from-orange-600/95 to-yellow-500/95 border-2 border-orange-400/50'
                      : 'bg-gradient-to-br from-orange-500/95 to-yellow-400/95 border-2 border-orange-400/50'
                  }
                `}
              >
              {/* Live Badge - Hidden on mobile */}
              {!isMobile && (
                <div className="absolute top-2 right-2">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-black/30 rounded-full">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-[10px] font-bold uppercase tracking-wide">Live</span>
                  </div>
                </div>
              )}

              {/* Botão de Minimizar */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsMinimized(true)
                }}
                className={`absolute ${isMobile ? 'top-1 left-1 p-1' : 'top-2 left-2 p-1'} rounded-full bg-black/20 hover:bg-black/40 transition-colors opacity-0 group-hover:opacity-100`}
                aria-label="Minimizar"
              >
                <X className={`${isMobile ? 'w-3 h-3' : 'w-3 h-3'} text-white`} />
              </button>

              {/* Content */}
              <div className={`flex flex-col items-center text-center ${isMobile ? 'p-3 pt-5 min-w-[120px]' : 'p-4 pt-8 min-w-[140px]'}`}>
                {/* Icon */}
                <div className={isMobile ? 'mb-1.5' : 'mb-2'}>
                  {isLowStock ? (
                    <Flame
                      className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} text-white ${isCritical ? 'animate-bounce' : 'animate-pulse'}`}
                      fill="currentColor"
                    />
                  ) : (
                    <Package className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} text-black`} />
                  )}
                </div>

                {/* Packs Remaining */}
                <div className={isMobile ? 'mb-1' : 'mb-1'}>
                  <p className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-black ${isLowStock ? 'text-white' : 'text-black'}`}>
                    {packsRemaining}
                  </p>
                  <p className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-bold uppercase tracking-wide ${isLowStock ? 'text-white/90' : 'text-black/80'}`}>
                    de {DAILY_PACK_LIMIT}
                  </p>
                </div>

                {/* Label */}
                <div className={`${isMobile ? 'text-[10px]' : 'text-[11px]'} font-bold uppercase tracking-wider ${isLowStock ? 'text-white' : 'text-black'}`}>
                  {isCritical ? (
                    <>¡Últimos!</>
                  ) : isLowStock ? (
                    <>Bajo</>
                  ) : (
                    <>Hoy</>
                  )}
                </div>

                {/* Hover Text - Hidden on mobile */}
                {!isMobile && (
                  <div className="mt-2 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity text-white">
                    Click para ver
                  </div>
                )}
              </div>

              {/* Glow Effect */}
              {isLowStock && (
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              )}

              {/* Pulse Animation for Critical Stock */}
              {isCritical && (
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-white/50"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          </Link>
        </motion.div>
        </>
      )}

      {/* Minimized Version */}
      {isMinimized && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsMinimized(false)}
          className={`
            fixed z-[70]
            ${isMobile ? 'bottom-4 right-4 p-2.5' : 'bottom-6 right-6 p-3'}
            rounded-full shadow-xl backdrop-blur-sm
            transition-all duration-300
            ${isCritical
              ? 'bg-gradient-to-br from-red-600 to-orange-600'
              : isLowStock
                ? 'bg-gradient-to-br from-orange-600 to-yellow-500'
                : 'bg-gradient-to-br from-orange-500 to-yellow-400'
            }
          `}
          aria-label="Mostrar slots disponibles"
        >
          <div className="relative">
            <Package className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
            <div className={`absolute -top-1 -right-1 ${isMobile ? 'w-4 h-4' : 'w-4 h-4'} bg-red-500 rounded-full flex items-center justify-center`}>
              <span className={`text-white ${isMobile ? 'text-[9px]' : 'text-[10px]'} font-bold`}>{packsRemaining}</span>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default LiveSlotsIndicator
