'use client'

import { motion } from 'framer-motion'
import { Flame, Tag, Truck, Clock, ShoppingCart } from 'lucide-react'
import { useBlackFriday } from '@/context/BlackFridayContext'
import Link from 'next/link'

export default function PackInsanoPromo() {
  const { packsRemaining, PACK_INSANO_PRICE, DAILY_PACK_LIMIT } = useBlackFriday()

  const percentageSold = Math.round(((DAILY_PACK_LIMIT - packsRemaining) / DAILY_PACK_LIMIT) * 100)

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-gray-dark to-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,119,0,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,183,0,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block mb-4"
          >
            <Flame className="w-16 h-16 text-orange-500 mx-auto" fill="currentColor" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              PACK INSANO
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-white/80 font-bold">
            Oferta de Inauguración - Por Tiempo Limitado
          </p>
        </motion.div>

        {/* Main Promo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative bg-gradient-to-br from-gray-dark via-black to-gray-dark rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-orange-500">
            {/* Urgency Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-red-500 text-white font-black text-sm rounded-full shadow-lg">
              ⚡ SOLO {packsRemaining} PACKS DISPONIBLES HOY
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-4">
              {/* Left: Pricing */}
              <div className="text-center md:text-left">
                <div className="mb-6">
                  <p className="text-white/60 text-lg mb-2">Precio Normal</p>
                  <p className="text-3xl text-white/40 line-through font-bold">
                    ARS 110.700
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-orange-400 text-xl mb-2 font-bold">Pack Insano</p>
                  <div className="flex items-baseline justify-center md:justify-start gap-3">
                    <p className="text-5xl md:text-6xl font-black text-yellow-400">
                      ${(PACK_INSANO_PRICE / 1000).toFixed(1)}K
                    </p>
                    <span className="px-3 py-1 bg-red-500 text-white text-sm font-black rounded">
                      55% OFF
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mt-2">
                    3 Camisetas Retro + Envío Gratis
                  </p>
                </div>

                <div className="p-4 bg-green-500/10 border-2 border-green-500 rounded-xl mb-6">
                  <p className="text-green-400 font-bold text-center">
                    💰 Ahorrás ARS 60.800
                  </p>
                </div>

                {/* CTA Button */}
                <Link href="#bestsellers">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-black uppercase text-lg rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-xl transition-all"
                  >
                    <ShoppingCart className="w-6 h-6 inline-block mr-2" />
                    ARMAR MI PACK INSANO
                  </motion.button>
                </Link>
              </div>

              {/* Right: Benefits */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white mb-4">
                  ¿Por qué es insano?
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <Flame className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm">Solo 50 Packs Diarios</p>
                      <p className="text-white/60 text-xs">Reset a las 00:00h - Corre antes que se agoten</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <Tag className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm">55% de Descuento Real</p>
                      <p className="text-white/60 text-xs">Precio más bajo garantizado del mercado</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <Truck className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm">Envío Gratis Incluido</p>
                      <p className="text-white/60 text-xs">Sin cargos ocultos - Precio final</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <Clock className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm">Entrega Rápida</p>
                      <p className="text-white/60 text-xs">Hasta 10 días útiles en todo el país</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6 p-4 bg-black/50 rounded-xl border border-white/10">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/60">Vendidos Hoy</span>
                    <span className="text-orange-400 font-bold">{percentageSold}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-dark rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentageSold}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-white/60 mt-2 text-center">
                    {DAILY_PACK_LIMIT - packsRemaining} de {DAILY_PACK_LIMIT} packs vendidos
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-white/60 text-sm">
                ✓ Descuento aplicado automáticamente al agregar 3 productos al carrito
              </p>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12"
        >
          {[
            { icon: '🔒', text: 'Pago Seguro' },
            { icon: '✓', text: 'Calidad Premium' },
            { icon: '📦', text: 'Envío Gratis' },
            { icon: '💯', text: 'Satisfacción Garantizada' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-white/5 rounded-xl border border-white/10 text-center"
            >
              <p className="text-2xl mb-1">{item.icon}</p>
              <p className="text-white text-xs font-bold">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
