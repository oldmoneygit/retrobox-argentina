'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

/**
 * ScrollToTopButton Component
 * Animated button to scroll back to top
 * Monocromático design
 */
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', toggleVisibility)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-[100px] md:bottom-[80px] right-4 md:right-6 z-40 
                     bg-gradient-to-br from-gray-dark via-black to-black
                     hover:from-white/10 hover:via-gray-dark hover:to-black
                     text-white p-3 md:p-4 rounded-full 
                     shadow-lg shadow-black/50
                     border border-white/10
                     transition-all duration-300
                     group"
          aria-label="Volver al inicio"
        >
          {/* Subtle glow effect background */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Arrow Icon */}
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10"
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6 font-bold" strokeWidth={3} />
          </motion.div>

          {/* Pulse ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/20"
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

