'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useBlackFriday } from '@/context/BlackFridayContext'
import { Flame } from 'lucide-react'

const PromotionalBanner = () => {
  const { packsRemaining, DAILY_PACK_LIMIT } = useBlackFriday()
  const isLowStock = packsRemaining < 15

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`w-full z-[60] bg-gradient-to-r ${
        isLowStock
          ? 'from-red-600 via-orange-600 to-red-600'
          : 'from-orange-500 via-yellow-400 to-orange-500'
      } border-b border-yellow-400/30 transition-all duration-300`}
    >
      <Link
        href="/#pack-insano"
        className="block w-full text-center py-3 px-4"
        aria-label="Pack Insano Promoción"
      >
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-black/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span className="text-white text-xs font-bold">LIVE</span>
          </div>

          <p className="text-black font-bold text-sm md:text-base tracking-wider uppercase">
            {isLowStock && <Flame className="inline w-4 h-4 mr-1 animate-pulse" fill="currentColor" />}
            PACK INSANO: 3x$49.900 - Solo quedan{' '}
            <span className={`${isLowStock ? 'animate-pulse text-red-900' : 'text-orange-900'} font-black`}>
              {packsRemaining}/{DAILY_PACK_LIMIT}
            </span>{' '}
            packs hoy
            {isLowStock && <Flame className="inline w-4 h-4 ml-1 animate-pulse" fill="currentColor" />}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default PromotionalBanner

