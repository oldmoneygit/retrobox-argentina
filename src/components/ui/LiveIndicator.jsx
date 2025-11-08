'use client'

import { motion } from 'framer-motion'

/**
 * LiveIndicator - Badge que indica informação em tempo real
 *
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} text - Texto do badge (default: 'EN VIVO')
 */
export default function LiveIndicator({ size = 'md', text = 'EN VIVO' }) {
  const sizeClasses = {
    sm: {
      badge: 'px-2 py-0.5 text-[8px] gap-0.5',
      dot: 'w-1 h-1'
    },
    md: {
      badge: 'px-3 py-1 text-xs gap-1.5',
      dot: 'w-2 h-2'
    },
    lg: {
      badge: 'px-4 py-1.5 text-sm gap-2',
      dot: 'w-2.5 h-2.5'
    }
  }

  const classes = sizeClasses[size] || sizeClasses.md

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center bg-red-600 rounded-full text-white font-black uppercase ${classes.badge}`}
    >
      <motion.span
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`bg-white rounded-full ${classes.dot}`}
      />
      {text}
    </motion.span>
  )
}
