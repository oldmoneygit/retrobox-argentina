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
    <section className="relative py-20 bg-black">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Cómo"
          highlight="Funciona"
          subtitle="Proceso simple y rápido para obtener tu camiseta retrô"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6 flex justify-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                    <Icon size={32} className="text-white" />
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-medium text-sm">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

