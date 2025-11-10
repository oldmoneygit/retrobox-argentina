'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OptimizedImage from '@/components/OptimizedImage'
import { ChevronLeft, ChevronRight, Star, MessageCircle, Instagram, ArrowRight } from 'lucide-react'
import { SOCIAL_LINKS } from '@/utils/constants'

const CustomerFeedbacks = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Array com todas as 19 imagens de feedback ordenadas numericamente
  const feedbacks = [
    { id: 1, image: '/images/feedbacks/1.png' },
    { id: 2, image: '/images/feedbacks/2.png' },
    { id: 3, image: '/images/feedbacks/3.png' },
    { id: 4, image: '/images/feedbacks/4.png' },
    { id: 5, image: '/images/feedbacks/5.png' },
    { id: 6, image: '/images/feedbacks/6.png' },
    { id: 7, image: '/images/feedbacks/7.png' },
    { id: 8, image: '/images/feedbacks/8.png' },
    { id: 9, image: '/images/feedbacks/9.png' },
    { id: 10, image: '/images/feedbacks/10.png' },
    { id: 11, image: '/images/feedbacks/11.png' },
    { id: 12, image: '/images/feedbacks/12.png' },
    { id: 13, image: '/images/feedbacks/13.png' },
    { id: 34, image: '/images/feedbacks/34.png' },
    { id: 35, image: '/images/feedbacks/35.png' },
    { id: 36, image: '/images/feedbacks/36.png' },
    { id: 37, image: '/images/feedbacks/37.png' },
    { id: 38, image: '/images/feedbacks/38.png' },
    { id: 39, image: '/images/feedbacks/39.png' },
    { id: 20, isInstagram: true }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length)
  }

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % feedbacks.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [feedbacks.length])

  // Swipe handlers
  const handleDragEnd = (event, info) => {
    const threshold = 50
    
    if (info.offset.x > threshold) {
      prevSlide()
    } else if (info.offset.x < -threshold) {
      nextSlide()
    }
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-gray-dark to-black overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-8">
            <MessageCircle className="w-5 h-5 text-white" />
            <span className="text-sm font-bold tracking-widest text-white uppercase">
              Clientes Satisfechos
            </span>
          </div>

          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-black leading-tight md:leading-relaxed mb-8">
              <span className="text-white">Más de </span>
              <span className="text-white font-black" style={{ filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.5))' }}>10K+ Clientes Satisfechos</span>
              <span className="text-white"> y </span>
              <span className="text-white font-black" style={{ filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.5))' }}>+25K Pedidos Entregados</span>
              <span className="text-white"> en toda Argentina con calidad premium</span>
            </h2>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[600px] md:h-[700px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
              >
                {feedbacks[currentIndex].isInstagram ? (
                  /* Instagram CTA Card */
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent blur-3xl scale-110" />

                    {/* Card Frame */}
                    <div className="relative w-[350px] md:w-[400px] h-[600px] md:h-[700px] bg-gradient-to-br from-gray-dark to-black rounded-[3rem] p-3 shadow-2xl border border-white/30">
                      {/* Screen */}
                      <div className="w-full h-full bg-gradient-to-br from-black via-gray-dark to-black rounded-[2.5rem] overflow-hidden relative flex flex-col items-center justify-center p-8 text-center">
                        {/* Instagram Icon Large */}
                        <div className="mb-8 relative">
                          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full" />
                          <Instagram className="w-24 h-24 text-white relative" strokeWidth={1.5} />
                        </div>

                        {/* Text */}
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                          Y más en Instagram
                        </h3>

                        <p className="text-gray-400 text-sm mb-8 max-w-xs">
                          Miles de testimonios reales de clientes satisfechos
                        </p>

                        {/* CTA Button */}
                        <a
                          href={SOCIAL_LINKS.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black text-sm hover:bg-gray-light transition-all duration-300 uppercase tracking-wider group"
                        >
                          <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                          {SOCIAL_LINKS.instagramHandle}
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </a>

                        {/* Tags */}
                        <div className="flex gap-2 mt-8 flex-wrap justify-center">
                          <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">Drops</span>
                          <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">Previews</span>
                          <span className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full">Behind the Scenes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Phone Mockup with Feedback */
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent blur-3xl scale-110" />

                    {/* Phone Frame */}
                    <div className="relative w-[350px] md:w-[400px] h-[600px] md:h-[700px] bg-gradient-to-br from-gray-dark to-black rounded-[3rem] p-3 shadow-2xl border border-white/20">
                      {/* Screen */}
                      <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                        {/* Feedback Image */}
                        <OptimizedImage
                          src={feedbacks[currentIndex].image}
                          alt={`Feedback ${feedbacks[currentIndex].id}`}
                          fill
                          className="object-cover"
                          sizes="400px"
                          priority={currentIndex < 3}
                        />

                        {/* Verified Badge */}
                        <div className="absolute top-4 right-4 bg-green-500 rounded-full p-3 shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10 border border-white/20"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-lg z-10 border border-white/20"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {feedbacks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Ir al feedback ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto"
        >
          <div className="bg-gradient-to-br from-gray-dark to-black border border-white/20 rounded-2xl p-6 text-center">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-white fill-white" />
              ))}
            </div>
            <p className="text-3xl font-black text-white mb-2">4.9</p>
            <p className="text-gray-400 text-sm">Calificación Promedio</p>
          </div>

          <div className="bg-gradient-to-br from-gray-dark to-black border border-white/20 rounded-2xl p-6 text-center">
            <p className="text-3xl font-black text-white mb-2">+10K</p>
            <p className="text-gray-400 text-sm">Clientes Satisfechos</p>
          </div>

          <div className="bg-gradient-to-br from-gray-dark to-black border border-white/20 rounded-2xl p-6 text-center">
            <p className="text-3xl font-black text-white mb-2">+25K</p>
            <p className="text-gray-400 text-sm">Pedidos Entregados</p>
          </div>

          <div className="bg-gradient-to-br from-gray-dark to-black border border-white/20 rounded-2xl p-6 text-center">
            <p className="text-3xl font-black text-white mb-2">98%</p>
            <p className="text-gray-400 text-sm">Tasa de Recomendación</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CustomerFeedbacks
