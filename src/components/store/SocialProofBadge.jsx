'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Eye, ShoppingBag, TrendingUp } from 'lucide-react'
import { useSocialProof } from '@/hooks/useSocialProof'

export default function SocialProofBadge() {
  const { viewingNow, buyingNow, messageType, isHighActivity } = useSocialProof()

  return (
    <div className="relative h-full flex items-center">
      <AnimatePresence mode="wait">
        {messageType === 'viewing' ? (
          <motion.div
            key="viewing"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
          >
            <Eye className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-white text-xs font-semibold">
              <motion.span
                key={viewingNow}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-yellow-400"
              >
                {viewingNow}
              </motion.span>
              {' '}viendo ahora
            </span>
            {isHighActivity && (
              <TrendingUp className="w-3 h-3 text-orange-500 animate-pulse" />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="buying"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full border border-orange-500/40"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-white text-xs font-semibold">
              <motion.span
                key={buyingNow}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-orange-400"
              >
                {buyingNow}
              </motion.span>
              {' '}comprando ahora
            </span>
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
