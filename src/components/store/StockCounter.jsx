'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Package, TrendingDown, AlertTriangle, Flame } from 'lucide-react'
import { useRealisticStock } from '@/hooks/useRealisticStock'

export default function StockCounter({ productId, initialStock = 100, compact = false }) {
  const { stock, percentageLeft, urgencyLevel, urgencyMessage, isLowStock } = useRealisticStock(
    productId,
    initialStock
  )

  // Cores baseadas no nível de urgência
  const urgencyColors = {
    low: {
      bg: 'from-green-500/20 to-emerald-500/20',
      border: 'border-green-500/30',
      text: 'text-green-400',
      icon: 'text-green-400',
      bar: 'bg-green-500'
    },
    medium: {
      bg: 'from-yellow-500/20 to-amber-500/20',
      border: 'border-yellow-500/30',
      text: 'text-yellow-400',
      icon: 'text-yellow-400',
      bar: 'bg-yellow-500'
    },
    high: {
      bg: 'from-orange-500/20 to-red-500/20',
      border: 'border-orange-500/40',
      text: 'text-orange-400',
      icon: 'text-orange-400',
      bar: 'bg-orange-500'
    },
    critical: {
      bg: 'from-red-500/30 to-rose-500/30',
      border: 'border-red-500/50',
      text: 'text-red-400',
      icon: 'text-red-400',
      bar: 'bg-red-500'
    }
  }

  const colors = urgencyColors[urgencyLevel]

  // Ícone baseado no nível de urgência
  const UrgencyIcon = urgencyLevel === 'critical' ? Flame : urgencyLevel === 'high' ? AlertTriangle : TrendingDown

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${colors.bg} border ${colors.border}`}
      >
        <Package size={14} className={colors.icon} />
        <span className={`text-xs font-bold ${colors.text}`}>
          {stock} disponibles
        </span>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${colors.bg} border-2 ${colors.border} p-4`}
    >
      {/* Efeito de pulso para níveis críticos */}
      {urgencyLevel === 'critical' && (
        <motion.div
          className="absolute inset-0 bg-red-500/10"
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={urgencyLevel === 'critical' ? {
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
              } : {}}
              transition={{
                duration: 0.5,
                repeat: urgencyLevel === 'critical' ? Infinity : 0,
                repeatDelay: 2
              }}
            >
              <UrgencyIcon size={20} className={colors.icon} />
            </motion.div>
            <span className={`text-sm font-bold uppercase ${colors.text}`}>
              {urgencyMessage}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={stock}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`text-2xl font-black ${colors.text}`}
            >
              {stock}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Barra de Progresso */}
        <div className="mb-2">
          <div className="h-2 bg-black/30 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${colors.bar} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${percentageLeft}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Mensagem */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/70">
            {isLowStock ? 'Se agotan rápido' : 'unidades restantes'}
          </span>
          {urgencyLevel === 'critical' && (
            <motion.span
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`font-bold ${colors.text}`}
            >
              ¡Apúrate!
            </motion.span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
