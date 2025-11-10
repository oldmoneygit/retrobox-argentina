'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/store/SectionTitle'
import { ShoppingCart, Tag, Truck, CheckCircle } from 'lucide-react'
import { useBlackFriday } from '@/context/BlackFridayContext'

const steps = [
  {
    number: '1',
    icon: ShoppingCart,
    title: 'Elegí 4 Camisetas',
    description: 'Agregá al carrito tus 4 jerseys favoritos',
    iconColor: 'bg-blue-500',
  },
  {
    number: '2',
    icon: Tag,
    title: 'Precio Fijo',
    description: 'Las 4 camisetas juntas: ARS 59.900',
    iconColor: 'bg-orange-500',
  },
  {
    number: '3',
    icon: Truck,
    title: 'Envío GRATIS',
    description: 'Incluido en el precio, sin costos extra',
    iconColor: 'bg-green-500',
  },
  {
    number: '4',
    icon: CheckCircle,
    title: 'Recibí en 10 Días',
    description: 'Directo a tu casa',
    iconColor: 'bg-purple-500',
  },
]

const HowItWorksPackLoco = () => {
  const { PACK_LOCO_PRICE, PACK_LOCO_SIZE } = useBlackFriday()
  const pricePerItem = Math.round(PACK_LOCO_PRICE / PACK_LOCO_SIZE)

  return (
    <section className="py-6 md:py-8 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background decoration - Sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-yellow-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-black uppercase tracking-wider mb-3 md:mb-4 shadow-lg">
            <span>🔥</span>
            Black Friday
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 px-4 text-white">
            ¿Cómo Funciona el{' '}
            <em className="not-italic text-orange-400">PACK BLACK</em>?
          </h2>

          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto px-4">
            {PACK_LOCO_SIZE} camisetas por ARS {PACK_LOCO_PRICE.toLocaleString('es-AR')} con envío gratis = ${pricePerItem.toLocaleString()} cada una
          </p>
        </motion.div>

        {/* Steps Grid - Mobile First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Number Badge */}
              <div className="absolute -top-2 -left-2 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-orange-500 to-yellow-400 text-black rounded-full flex items-center justify-center font-black text-base md:text-lg z-10 shadow-lg">
                {step.number}
              </div>

              {/* Card */}
              <div className="bg-gradient-to-br from-gray-800 to-black border-2 border-white/10 rounded-xl p-5 md:p-6 h-full hover:border-orange-500/50 transition-all duration-300">
                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 ${step.iconColor} rounded-lg flex items-center justify-center mb-3 md:mb-4 shadow-lg`}>
                  <step.icon size={24} className="text-white md:w-7 md:h-7" />
                </div>

                {/* Content */}
                <h3 className="text-base md:text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Box - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-800 to-black border-2 border-orange-500/30 rounded-xl md:rounded-2xl p-6 md:p-8 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4">
                Preguntas Frecuentes
              </h3>
              <div className="space-y-2 md:space-y-3 text-gray-400">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm">
                    <strong className="text-white">¿Puedo mezclar equipos?</strong> Sí, cualquier combinación
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm">
                    <strong className="text-white">¿Si quiero 5 camisetas?</strong> 1 Pack Black ({PACK_LOCO_SIZE} camisetas) + la 5ta a precio normal
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm">
                    <strong className="text-white">¿El envío es gratis?</strong> Sí, 100% incluido
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm">
                    <strong className="text-white">¿Hay límite?</strong> No, podés comprar cuantos quieras
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.a
            href="#bestsellers"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="block w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-black uppercase text-sm md:text-lg py-3 md:py-4 px-6 md:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-center"
          >
            Empezar a Comprar
          </motion.a>
        </motion.div>

        {/* Bottom Badges - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6 md:mt-8"
        >
          <div className="flex items-center gap-1.5 md:gap-2 bg-orange-900/30 border border-orange-700/50 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold text-yellow-400">
            <CheckCircle size={14} className="md:w-4 md:h-4" />
            Descuento Automático
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 bg-orange-900/30 border border-orange-700/50 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold text-yellow-400">
            <CheckCircle size={14} className="md:w-4 md:h-4" />
            Sin Código
          </div>
          <div className="flex items-center gap-1.5 md:gap-2 bg-orange-900/30 border border-orange-700/50 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold text-yellow-400">
            <CheckCircle size={14} className="md:w-4 md:h-4" />
            100% Seguro
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorksPackLoco
