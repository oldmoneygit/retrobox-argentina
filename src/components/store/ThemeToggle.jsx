'use client'

import { useTheme } from '@/context/ThemeContext'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg border-2 transition-all duration-300
                 dark:bg-white/10 dark:border-white/20 dark:hover:bg-white/20 dark:text-white
                 bg-black/10 border-black/20 hover:bg-black/20 text-black"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Alternar tema"
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            rotate: isDark ? 90 : 0,
            scale: isDark ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun
            size={20}
            className="text-black dark:text-white"
            strokeWidth={2.5}
          />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
            scale: isDark ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon
            size={20}
            className="text-white"
            strokeWidth={2.5}
          />
        </motion.div>
      </div>
    </motion.button>
  )
}

