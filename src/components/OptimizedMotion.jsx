'use client'

import { motion } from 'framer-motion'

/**
 * Optimized motion component that uses GPU-accelerated properties
 * to avoid layout shifts and improve performance
 */
export const OptimizedMotion = {
  div: ({ children, className = '', ...props }) => (
    <motion.div
      className={className}
      style={{ willChange: 'transform, opacity' }}
      {...props}
    >
      {children}
    </motion.div>
  ),
  
  span: ({ children, className = '', ...props }) => (
    <motion.span
      className={className}
      style={{ willChange: 'transform, opacity' }}
      {...props}
    >
      {children}
    </motion.span>
  ),
  
  button: ({ children, className = '', ...props }) => (
    <motion.button
      className={className}
      style={{ willChange: 'transform' }}
      {...props}
    >
      {children}
    </motion.button>
  ),
}

/**
 * Optimized fade-in animation using transform instead of y
 * This avoids layout shifts and uses GPU acceleration
 */
export const fadeInUp = {
  initial: { opacity: 0, transform: 'translateY(20px)' },
  animate: { opacity: 1, transform: 'translateY(0)' },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
}

/**
 * Optimized scale animation for hover effects
 */
export const scaleOnHover = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  whileTap: { scale: 0.95, transition: { duration: 0.1 } },
}

export default OptimizedMotion

