'use client'

import { useBlackFriday } from '@/context/BlackFridayContext'
import { motion } from 'framer-motion'
import { Flame, Users, Clock, TrendingUp } from 'lucide-react'

export default function PackInsanoLiveSlots() {
  const { packsRemaining, DAILY_PACK_LIMIT } = useBlackFriday()

  const packsSold = DAILY_PACK_LIMIT - packsRemaining
  const percentageRemaining = (packsRemaining / DAILY_PACK_LIMIT) * 100
  const isLowStock = percentageRemaining < 30

  return (
    <section className="relative py-12 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-4">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-500 text-sm font-bold">LIVE</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
            Disponibilidad en Tiempo Real
          </h2>
          <p className="text-white/60">
            Monitorea los packs disponibles antes de que se agoten
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-8">
          {/* Packs Vendidos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-gradient-to-br from-gray-dark to-black rounded-2xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Vendidos Hoy</p>
                <p className="text-2xl font-black text-green-400">{packsSold}</p>
              </div>
            </div>
            <div className="h-1 bg-gray-dark rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(packsSold / DAILY_PACK_LIMIT) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="h-full bg-green-400"
              />
            </div>
          </motion.div>

          {/* Packs Restantes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`p-6 bg-gradient-to-br ${isLowStock ? 'from-red-500/20 to-orange-500/20 border-red-500' : 'from-orange-500/20 to-yellow-400/20 border-orange-500'} rounded-2xl border-2`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 ${isLowStock ? 'bg-red-500/20' : 'bg-orange-500/20'} rounded-lg`}>
                <Flame className={`w-5 h-5 ${isLowStock ? 'text-red-400' : 'text-orange-400'}`} fill="currentColor" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Disponibles Ahora</p>
                <motion.p
                  key={packsRemaining}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className={`text-3xl font-black ${isLowStock ? 'text-red-400' : 'text-yellow-400'}`}
                >
                  {packsRemaining}
                </motion.p>
              </div>
            </div>
            {isLowStock && (
              <p className="text-red-400 text-xs font-bold flex items-center gap-1">
                <Flame className="w-3 h-3" />
                ¡Últimos packs!
              </p>
            )}
          </motion.div>

          {/* Total */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-gradient-to-br from-gray-dark to-black rounded-2xl border border-white/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-xs">Límite Diario</p>
                <p className="text-2xl font-black text-blue-400">{DAILY_PACK_LIMIT}</p>
              </div>
            </div>
            <p className="text-white/60 text-xs">Packs totales por día</p>
          </motion.div>
        </div>

        {/* Visual Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="p-8 bg-gradient-to-br from-gray-dark via-black to-gray-dark rounded-2xl border-2 border-orange-500/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">Progreso del Día</h3>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-white/60 text-sm">Reset a las 00:00h</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-8 bg-gray-dark rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(packsSold / DAILY_PACK_LIMIT) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-yellow-400 to-orange-500 rounded-full"
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Current position indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-bold mix-blend-difference">
                  {Math.round((packsSold / DAILY_PACK_LIMIT) * 100)}% Vendido
                </span>
              </div>
            </div>

            {/* Slots Grid Visualization */}
            <div className="grid grid-cols-10 gap-2">
              {Array.from({ length: DAILY_PACK_LIMIT }).map((_, index) => {
                const isSold = index < packsSold
                const isRecent = index >= packsSold - 3 && index < packsSold

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.01 }}
                    className={`
                      aspect-square rounded-lg border-2 transition-all duration-300
                      ${isSold
                        ? isRecent
                          ? 'bg-yellow-400 border-yellow-400 animate-pulse'
                          : 'bg-green-500/20 border-green-500'
                        : 'bg-gray-dark border-white/10 hover:border-orange-500/50'
                      }
                    `}
                  />
                )
              })}
            </div>

            <div className="flex items-center justify-center gap-6 mt-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500/20 border-2 border-green-500 rounded" />
                <span className="text-white/60">Vendido</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 border-2 border-yellow-400 rounded" />
                <span className="text-white/60">Reciente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-dark border-2 border-white/10 rounded" />
                <span className="text-white/60">Disponible</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
