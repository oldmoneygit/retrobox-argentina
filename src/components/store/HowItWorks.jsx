'use client'

import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import { ShoppingCart, Truck, Shield, CheckCircle } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: 'Elige tu camiseta',
      description: 'Selecciona la camiseta retrô que más te guste de nuestra colección'
    },
    {
      icon: Truck,
      title: 'Envío rápido',
      description: 'Recibe tu pedido en tiempo récord en toda Argentina'
    },
    {
      icon: Shield,
      title: 'Calidad garantizada',
      description: 'Todas nuestras camisetas son de calidad premium y auténticas'
    },
    {
      icon: CheckCircle,
      title: 'Disfruta',
      description: 'Disfruta de tu nueva camiseta retrô favorita'
    }
  ]

  return (
    <section className="relative py-8 md:py-10 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="mb-4 md:mb-6">
          <SectionTitle
            title="Cómo"
            highlight="Funciona"
            subtitle="Proceso simple y rápido para obtener tu camiseta retrô"
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Card */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 h-full flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div className="relative mb-4 md:mb-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 shadow-lg">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={1.5} />
                    </div>
                    {/* Step Number Badge */}
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-7 h-7 md:w-8 md:h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs md:text-sm shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-base md:text-lg mb-2 md:mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (hidden on mobile, visible on lg) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent -translate-x-1/2 z-0" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

