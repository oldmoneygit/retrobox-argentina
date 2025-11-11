'use client'

import { motion } from 'framer-motion'
import OptimizedImage from '@/components/OptimizedImage'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const StoreHero = () => {
  return (
    <section className="relative h-[70vh] md:h-[85vh] lg:h-screen w-full overflow-hidden" id="hero">
      {/* Background Image - Full Screen, Clean */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-black dark:via-gray-dark dark:to-black bg-gradient-to-br from-white via-gray-100 to-white">
        {/* Mobile Image */}
        <OptimizedImage
          src="/images/hero/banner-hero-section.png"
          alt="Retrobox - Camisetas Retrô"
          fill
          className="object-contain object-center md:hidden"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Desktop Image */}
        <OptimizedImage
          src="/images/hero/Banner-RetroboxDesktop-2.webp"
          alt="Retrobox - Camisetas Retrô"
          fill
          className="hidden md:block object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Subtle Bottom Gradient - Monocromático */}
      {/* Mobile: Gradiente mais forte para melhor legibilidade */}
      <div className="md:hidden absolute inset-0 dark:bg-gradient-to-t dark:from-black/90 dark:via-black/50 dark:to-transparent bg-gradient-to-t from-white/90 via-white/50 to-transparent z-[1]" />
      {/* Desktop: Gradiente mais sutil */}
      <div className="hidden md:block absolute inset-0 dark:bg-gradient-to-t dark:from-black/80 dark:via-black/40 dark:to-transparent bg-gradient-to-t from-white/80 via-white/40 to-transparent z-[1]" />

      {/* Minimal Content at Bottom */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-12 md:pb-20 px-4">
        <div className="container mx-auto text-center md:text-left">
          {/* Small Tag */}
          <motion.span
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            animate={{ opacity: 1, transform: 'translateY(0)' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{ willChange: 'transform, opacity' }}
            className="inline-block dark:text-white text-black text-xs md:text-sm font-bold uppercase tracking-wider mb-3 md:mb-4"
          >
            Camisetas Retrô Exclusivas
          </motion.span>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            animate={{ opacity: 1, transform: 'translateY(0)' }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{ willChange: 'transform, opacity' }}
            className="text-4xl md:text-6xl lg:text-8xl font-black dark:text-white text-black mb-4 md:mb-6 uppercase tracking-tight"
          >
            RETROBOX
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            animate={{ opacity: 1, transform: 'translateY(0)' }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{ willChange: 'transform, opacity' }}
            className="dark:text-white/80 text-black/80 text-lg md:text-xl mb-6 md:mb-8 max-w-2xl"
          >
            Descubre nuestras camisetas retrô de los mejores equipos del mundo
          </motion.p>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(20px)' }}
            animate={{ opacity: 1, transform: 'translateY(0)' }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.6, -0.05, 0.01, 0.99] }}
            style={{ willChange: 'transform, opacity' }}
          >
            <Link
              href="#products"
              className="inline-block px-6 py-3 md:px-8 md:py-4 dark:bg-white dark:text-black dark:hover:bg-gray-light bg-black text-white hover:bg-gray-dark font-bold uppercase tracking-wide text-xs md:text-sm rounded-full transition-colors duration-200 active:scale-95"
            >
              EXPLORAR COLECCIÓN
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{ willChange: 'opacity' }}
          className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ transform: 'translateY(0) translateY(10px) translateY(0)' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ willChange: 'transform' }}
          >
            <ChevronDown size={32} className="dark:text-white/60 text-black/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default StoreHero

