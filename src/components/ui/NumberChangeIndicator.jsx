'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { TrendingDown } from 'lucide-react'

/**
 * NumberChangeIndicator - Mostra feedback visual quando um número muda
 *
 * @param {number} value - Valor a monitorar
 * @param {string} position - 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
 */
export default function NumberChangeIndicator({ value, position = 'top-right' }) {
  const [hasChanged, setHasChanged] = useState(false)
  const [previousValue, setPreviousValue] = useState(value)

  useEffect(() => {
    if (value !== previousValue) {
      setHasChanged(true)
      setPreviousValue(value)

      // Reset após animação
      const timeout = setTimeout(() => {
        setHasChanged(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [value, previousValue])

  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0'
  }

  return (
    <div className={`absolute ${positionClasses[position]} pointer-events-none`}>
      <AnimatePresence>
        {hasChanged && (
          <>
            {/* Ripple Effect */}
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 bg-red-500 rounded-full"
            />

            {/* Icon with text */}
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-lg"
            >
              <TrendingDown className="w-3 h-3" />
              <span>-1</span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
