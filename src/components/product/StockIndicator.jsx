'use client'

import { Package, TrendingUp, Flame } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Stock Indicator Component
 * Shows stock levels with urgency messaging to encourage purchases
 */
const StockIndicator = ({ stockLevel = 'high', compact = false }) => {
  const getStockConfig = () => {
    switch (stockLevel) {
      case 'low':
        return {
          icon: Flame,
          text: compact ? '¡Últimas!' : '¡Apenas 3 en stock!',
          bgColor: 'from-red-500/20 to-orange-500/20',
          borderColor: 'border-red-500/40',
          textColor: 'text-red-400',
          iconColor: 'text-red-400',
          animate: true,
        }
      case 'medium':
        return {
          icon: TrendingUp,
          text: compact ? 'Stock limitado' : 'Stock limitado - ¡Apurate!',
          bgColor: 'from-yellow-500/20 to-orange-400/20',
          borderColor: 'border-yellow-500/40',
          textColor: 'text-yellow-400',
          iconColor: 'text-yellow-400',
          animate: false,
        }
      case 'high':
        return {
          icon: Package,
          text: compact ? 'Disponible' : 'En Stock',
          bgColor: 'from-green-500/20 to-emerald-400/20',
          borderColor: 'border-green-500/30',
          textColor: 'text-green-400',
          iconColor: 'text-green-400',
          animate: false,
        }
      default:
        return null
    }
  }

  const config = getStockConfig()
  if (!config) return null

  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-gradient-to-r ${config.bgColor} border ${config.borderColor} ${
        config.animate ? 'animate-pulse' : ''
      }`}
    >
      <Icon className={`w-3 h-3 md:w-4 md:h-4 ${config.iconColor}`} />
      <span className={`text-xs md:text-sm font-bold ${config.textColor}`}>
        {config.text}
      </span>
    </motion.div>
  )
}

export default StockIndicator
