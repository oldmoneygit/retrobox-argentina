'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OptimizedImage from '@/components/OptimizedImage'
import SectionTitle from './SectionTitle'
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Instagram, ArrowRight } from 'lucide-react'
import { SOCIAL_LINKS } from '@/utils/constants'

const CustomerFeedbacks = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const feedbacks = [
    {
      id: 1,
      image: '/images/feedbacks/feedback-template.jpg',
      customer: 'cliente1',
      messages: [
        'Llegaron perfectos',
        'Muy buena calidad',
        '100% recomendable'
      ]
    },
    {
      id: 2,
      image: '/images/feedbacks/feedback-template.jpg',
      customer: 'cliente2',
      messages: [
        'Excelente atención',
        'Justo lo que esperaba',
        'Se ven increíbles 🔥'
      ]
    },
    {
      id: 3,
      image: '/images/feedbacks/feedback-template.jpg',
      customer: 'cliente3',
      messages: [
        'Todos perfectos',
        'Excelente calidad',
        'Super recomendado'
      ]
    },
    {
      id: 4,
      image: '/images/feedbacks/feedback-template.jpg',
      customer: 'cliente4',
      messages: [
        'Recibí la camiseta',
        'Está increíble',
        'Muchas gracias! 🔥'
      ]
    },
    {
      id: 5,
      image: '/images/feedbacks/feedback-template.jpg',
      customer: 'cliente5',
      messages: [
        'Increíble calidad',
        'Llegó súper rápido',
        'Los recomiendo 100%'
      ]
    },
  ]

  const stats = [
    { label: 'Clientes Satisfechos', value: '10K+' },
    { label: 'Pedidos Entregados', value: '25K+' },
    { label: 'Calificación Promedio', value: '4.9⭐' },
    { label: 'Tiempo de Entrega', value: '24-48h' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % feedbacks.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [feedbacks.length])

  const nextFeedback = () => {
    setCurrentIndex((prev) => (prev + 1) % feedbacks.length)
  }

  const prevFeedback = () => {
    setCurrentIndex((prev) => (prev - 1 + feedbacks.length) % feedbacks.length)
  }

  const currentFeedback = feedbacks[currentIndex]

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Lo que dicen"
          highlight="Nuestros Clientes"
          subtitle="Experiencias reales de clientes satisfechos"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Mobile Mockup com Feedback */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            {/* Phone Frame */}
            <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[660px]">
              {/* Phone Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-dark via-black to-gray-dark rounded-[3rem] p-3 shadow-2xl border-2 border-white/10">
                {/* Screen */}
                <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-8 bg-gradient-to-b from-gray-dark to-black flex items-center justify-between px-4 text-white text-[10px]">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Instagram Feed */}
                  <div className="h-full overflow-y-auto bg-black">
                    {/* Instagram Header */}
                    <div className="bg-gradient-to-b from-gray-dark to-black p-4 border-b border-white/10">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                          <span className="text-sm font-semibold">retrobox.arg</span>
                        </div>
                        <MessageCircle size={20} className="text-white" />
                      </div>
                    </div>

                    {/* Feedback Image */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentFeedback.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative aspect-square bg-gradient-to-br from-gray-dark to-black"
                      >
                        <OptimizedImage
                          src={currentFeedback.image}
                          alt={`Feedback ${currentFeedback.id}`}
                          fill
                          className="object-cover opacity-90"
                          sizes="(max-width: 768px) 280px, 320px"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Comments Section */}
                    <div className="p-4 bg-black">
                      <div className="space-y-3 mb-4">
                        {currentFeedback.messages.map((msg, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-2"
                          >
                            <div className="w-6 h-6 bg-white/20 rounded-full flex-shrink-0"></div>
                            <div className="flex-1">
                              <p className="text-white text-xs font-semibold">{currentFeedback.customer}</p>
                              <p className="text-white/80 text-xs">{msg}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Instagram Footer */}
                      <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                        <Heart size={16} className="text-white" />
                        <MessageCircle size={16} className="text-white" />
                        <Instagram size={16} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute inset-0 bg-white/5 blur-3xl -z-10 rounded-[3rem]"></div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevFeedback}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110 border border-white/20"
              aria-label="Previous feedback"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextFeedback}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full z-10 transition-all duration-300 hover:scale-110 border border-white/20"
              aria-label="Next feedback"
            >
              <ChevronRight size={20} />
            </button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center"
                >
                  <p className="text-white text-3xl md:text-4xl font-black mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-medium text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6"
            >
              <h3 className="text-white font-bold text-xl mb-3">
                Únete a nuestros clientes satisfechos
              </h3>
              <p className="text-gray-medium text-sm mb-6">
                Sigue nuestro Instagram para ver más testimonios y novedades
              </p>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-light transition-colors duration-200"
              >
                <Instagram size={20} />
                Seguir en Instagram
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {feedbacks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/30'
              }`}
              aria-label={`Go to feedback ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CustomerFeedbacks

