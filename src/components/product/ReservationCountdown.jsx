'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, TrendingUp, AlertTriangle } from 'lucide-react'

export default function ReservationCountdown() {
  const TOTAL_TIME = 15 * 60 // 15 minutos em segundos
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [hasExpired, setHasExpired] = useState(false)

  useEffect(() => {
    // Verifica se já existe um timer salvo no localStorage
    const savedTime = localStorage.getItem('reservationTimer')
    const savedTimestamp = localStorage.getItem('reservationTimestamp')

    if (savedTime && savedTimestamp) {
      const elapsed = Math.floor((Date.now() - parseInt(savedTimestamp)) / 1000)
      const remaining = parseInt(savedTime) - elapsed

      if (remaining > 0) {
        setTimeLeft(remaining)
      } else {
        // Timer expirou, mostrar mensagem de expiração
        setHasExpired(true)
        setTimeout(() => {
          // Após 10 segundos, resetar tudo
          localStorage.removeItem('reservationTimer')
          localStorage.removeItem('reservationTimestamp')
          setTimeLeft(TOTAL_TIME)
          setHasExpired(false)
          localStorage.setItem('reservationTimestamp', Date.now().toString())
          localStorage.setItem('reservationTimer', TOTAL_TIME.toString())
        }, 10000)
      }
    } else {
      // Primeira vez, salvar timestamp
      localStorage.setItem('reservationTimestamp', Date.now().toString())
      localStorage.setItem('reservationTimer', TOTAL_TIME.toString())
    }
  }, [TOTAL_TIME])

  useEffect(() => {
    if (timeLeft <= 0 && !hasExpired) {
      setHasExpired(true)
      setTimeout(() => {
        // Após 10 segundos, resetar
        localStorage.removeItem('reservationTimer')
        localStorage.removeItem('reservationTimestamp')
        setTimeLeft(TOTAL_TIME)
        setHasExpired(false)
        localStorage.setItem('reservationTimestamp', Date.now().toString())
        localStorage.setItem('reservationTimer', TOTAL_TIME.toString())
      }, 10000)
      return
    }

    if (hasExpired) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1
        localStorage.setItem('reservationTimer', newTime.toString())
        return newTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, hasExpired, TOTAL_TIME])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progressPercentage = (timeLeft / TOTAL_TIME) * 100

  // Determinar el nivel de urgencia
  const isUrgent = timeLeft <= 180 && timeLeft > 60 // Últimos 3 minutos
  const isCritical = timeLeft <= 60 && timeLeft > 0 // Último minuto

  // Colores dinámicos basados en urgencia
  const borderColor = isCritical
    ? 'border-red-500/60'
    : isUrgent
      ? 'border-orange-500/60'
      : 'border-white/30'

  const glowColor = isCritical
    ? 'from-red-500/10'
    : isUrgent
      ? 'from-orange-500/10'
      : 'from-white/5'

  const iconBgColor = isCritical
    ? 'bg-red-500/30'
    : isUrgent
      ? 'bg-orange-500/30'
      : 'bg-white/20'

  const iconColor = isCritical
    ? 'text-red-500'
    : isUrgent
      ? 'text-orange-500'
      : 'text-white'

  const textColor = isCritical
    ? 'text-red-500'
    : isUrgent
      ? 'text-orange-500'
      : 'text-white'

  const progressColor = isCritical
    ? 'bg-red-500'
    : isUrgent
      ? 'bg-orange-500'
      : 'bg-white'

  return (
    <AnimatePresence mode="wait">
      {hasExpired ? (
        // Banner de Expiración
        <motion.div
          key="expired"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <motion.div
            animate={{ x: [0, -5, 5, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-lg bg-gradient-to-r from-red-950 to-red-900 border-2 border-red-500/60 shadow-xl shadow-red-500/20"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/20 to-transparent pointer-events-none" />

            <div className="relative z-10 px-4 py-4">
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center"
                >
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </motion.div>
                <h3 className="text-red-500 text-sm font-black uppercase tracking-wide">
                  ¡Tu Reserva Expiró!
                </h3>
              </div>
              <p className="text-white/90 text-xs leading-relaxed">
                Lo sentimos, el tiempo de reserva se agotó. <strong className="text-white font-bold">Agregá nuevamente el producto al carrito</strong> para continuar con tu compra.
              </p>
            </div>

            {/* Barra animada */}
            <motion.div
              className="h-1 bg-red-500"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 10, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        </motion.div>
      ) : (
        // Countdown Normal
        <motion.div
          key="countdown"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: isCritical ? [1, 1.02, 1] : 1
          }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            duration: 0.4,
            scale: {
              duration: 0.5,
              repeat: isCritical ? Infinity : 0,
              ease: "easeInOut"
            }
          }}
          className="mt-4"
        >
          <div className={`relative overflow-hidden rounded-lg bg-[#0a0a0a] border ${borderColor} shadow-xl transition-all duration-300`}>
            {/* Glow effect de fundo */}
            <div className={`absolute inset-0 bg-gradient-to-b ${glowColor} to-transparent pointer-events-none`} />

            <div className="relative z-10 px-4 py-3">
              {/* Header com ícone e título */}
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  animate={{
                    rotate: isCritical ? [0, 15, -15, 0] : [0, 10, -10, 0],
                    scale: isCritical ? [1, 1.1, 1] : 1
                  }}
                  transition={{
                    duration: isCritical ? 0.5 : 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`w-6 h-6 rounded-full ${iconBgColor} flex items-center justify-center transition-colors duration-300`}
                >
                  {isCritical ? (
                    <AlertTriangle className={`w-4 h-4 ${iconColor}`} />
                  ) : (
                    <Clock className={`w-4 h-4 ${iconColor}`} />
                  )}
                </motion.div>
                <h3 className={`${textColor} text-xs font-black uppercase tracking-widest flex items-center gap-1 transition-colors duration-300`}>
                  {isCritical ? '¡Apurate!' : isUrgent ? 'Reserva por Expirar' : 'Reserva Activa'}
                  <TrendingUp className="w-3 h-3" />
                </h3>
              </div>

              {/* Texto explicativo */}
              <p className="text-white/70 text-xs mb-3 leading-relaxed">
                {isCritical ? (
                  <strong className="text-red-500 font-bold">¡Quedan segundos!</strong>
                ) : isUrgent ? (
                  <strong className="text-orange-500 font-bold">¡Últimos minutos!</strong>
                ) : (
                  <strong className="text-white font-bold">Debido a la alta demanda</strong>
                )}{' '}
                {isCritical || isUrgent ? 'Completá tu compra ahora:' : 'tu producto está reservado. Completá tu compra antes de que expire:'}
              </p>

              {/* Countdown - Minutos e Segundos */}
              <div className="flex items-center justify-center gap-2">
                {/* Minutos */}
                <div className="flex flex-col items-center">
                  <motion.div
                    key={minutes}
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{
                      scale: isCritical ? [1, 1.05, 1] : 1,
                      opacity: 1
                    }}
                    transition={{
                      duration: 0.3,
                      scale: {
                        duration: 0.5,
                        repeat: isCritical ? Infinity : 0,
                        ease: "easeInOut"
                      }
                    }}
                    className="relative group"
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 ${isCritical ? 'bg-red-500' : isUrgent ? 'bg-orange-500' : 'bg-white'} opacity-0 group-hover:opacity-10 blur-lg transition-all duration-300`} />

                    {/* Card do número */}
                    <div className={`relative bg-gradient-to-b from-[#1a1a1a] to-black border ${borderColor} rounded-lg px-4 py-2 min-w-[60px] shadow-md transition-all duration-300`}>
                      <div className={`text-2xl md:text-3xl font-black ${textColor} font-mono text-center transition-colors duration-300`}>
                        {String(minutes).padStart(2, '0')}
                      </div>
                    </div>
                  </motion.div>
                  <span className={`${textColor} text-[9px] font-bold uppercase tracking-wider mt-1 transition-colors duration-300 opacity-60`}>
                    Minutos
                  </span>
                </div>

                {/* Separador */}
                <motion.div
                  animate={{
                    opacity: [1, 0.3, 1],
                  }}
                  transition={{
                    duration: isCritical ? 0.5 : 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`${textColor} text-2xl md:text-3xl font-black pb-5 transition-colors duration-300`}
                >
                  :
                </motion.div>

                {/* Segundos */}
                <div className="flex flex-col items-center">
                  <motion.div
                    key={seconds}
                    initial={{ scale: 1.15, opacity: 0 }}
                    animate={{
                      scale: isCritical ? [1, 1.05, 1] : 1,
                      opacity: 1
                    }}
                    transition={{
                      duration: 0.3,
                      scale: {
                        duration: 0.5,
                        repeat: isCritical ? Infinity : 0,
                        ease: "easeInOut"
                      }
                    }}
                    className="relative group"
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 ${isCritical ? 'bg-red-500' : isUrgent ? 'bg-orange-500' : 'bg-white'} opacity-0 group-hover:opacity-10 blur-lg transition-all duration-300`} />

                    {/* Card do número */}
                    <div className={`relative bg-gradient-to-b from-[#1a1a1a] to-black border ${borderColor} rounded-lg px-4 py-2 min-w-[60px] shadow-md transition-all duration-300`}>
                      <div className={`text-2xl md:text-3xl font-black ${textColor} font-mono text-center transition-colors duration-300`}>
                        {String(seconds).padStart(2, '0')}
                      </div>
                    </div>
                  </motion.div>
                  <span className={`${textColor} text-[9px] font-bold uppercase tracking-wider mt-1 transition-colors duration-300 opacity-60`}>
                    Segundos
                  </span>
                </div>
              </div>
            </div>

            {/* Barra de progresso na parte inferior */}
            <div className="relative h-1.5 bg-black/50 overflow-hidden">
              <motion.div
                className={`absolute top-0 left-0 h-full ${progressColor} transition-colors duration-300`}
                initial={{ width: '100%' }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Efeito de brilho na barra */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: isCritical ? 1 : 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
