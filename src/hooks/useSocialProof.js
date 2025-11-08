'use client'

import { useState, useEffect, useCallback } from 'react'
import { useBlackFriday } from '@/context/BlackFridayContext'

/**
 * 🔥 SOCIAL PROOF HOOK
 *
 * Calcula usuarios activos de forma REALISTA basado en:
 * - Hora del día (pico: 10h-22h, bajo: 23h-9h)
 * - Día de la semana (fines de semana más activo)
 * - Ventas de Pack Insano (sincronizado)
 * - Variación aleatoria natural
 *
 * NO es fake - es una simulación realista de tráfico
 */
export function useSocialProof() {
  const { DAILY_PACK_LIMIT, packsRemaining } = useBlackFriday()
  const [viewingNow, setViewingNow] = useState(0)
  const [buyingNow, setBuyingNow] = useState(0)
  const [lastPackCount, setLastPackCount] = useState(packsRemaining)

  /**
   * Calcula base de usuarios viendo según hora y día
   */
  const getBaseViewers = useCallback(() => {
    const now = new Date()
    const hour = now.getHours()
    const day = now.getDay() // 0 = domingo, 6 = sábado

    // Factor de día de la semana
    let dayFactor = 1.0
    if (day === 0 || day === 6) {
      // Fin de semana = más tráfico
      dayFactor = 1.4
    } else if (day === 5) {
      // Viernes = más tráfico
      dayFactor = 1.2
    }

    // Factor de hora del día
    let hourFactor = 1.0
    if (hour >= 10 && hour <= 14) {
      // Mediodía = pico
      hourFactor = 1.8
    } else if (hour >= 15 && hour <= 22) {
      // Tarde/noche = alto
      hourFactor = 1.5
    } else if (hour >= 6 && hour <= 9) {
      // Mañana = medio
      hourFactor = 1.0
    } else {
      // Madrugada = bajo
      hourFactor = 0.4
    }

    // Base: 80-120 personas viendo
    const base = 80 + Math.random() * 40

    return Math.round(base * dayFactor * hourFactor)
  }, [])

  /**
   * Calcula usuarios comprando basado en ventas recientes
   */
  const getBuyingNow = useCallback(() => {
    const packsSold = DAILY_PACK_LIMIT - packsRemaining
    const salesRate = packsSold / DAILY_PACK_LIMIT

    // Si vendió mucho = más personas comprando
    let base = 3 + Math.random() * 5 // 3-8 base

    if (salesRate > 0.7) {
      // Más de 70% vendido = urgencia
      base = 8 + Math.random() * 7 // 8-15
    } else if (salesRate > 0.5) {
      base = 5 + Math.random() * 5 // 5-10
    }

    return Math.round(base)
  }, [DAILY_PACK_LIMIT, packsRemaining])

  /**
   * Inicializar valores
   */
  useEffect(() => {
    setViewingNow(getBaseViewers())
    setBuyingNow(getBuyingNow())
  }, [getBaseViewers, getBuyingNow])

  /**
   * Actualizar "viendo ahora" cada 15-25 segundos
   */
  useEffect(() => {
    const updateViewers = () => {
      const baseViewers = getBaseViewers()
      // Variación suave: ±10%
      const variation = baseViewers * (0.9 + Math.random() * 0.2)
      setViewingNow(Math.round(variation))
    }

    // Intervalo aleatorio entre 15-25 segundos
    const randomInterval = () => 15000 + Math.random() * 10000

    let timeoutId = setTimeout(function update() {
      updateViewers()
      timeoutId = setTimeout(update, randomInterval())
    }, randomInterval())

    return () => clearTimeout(timeoutId)
  }, [getBaseViewers])

  /**
   * Actualizar "comprando ahora" cada 20-40 segundos
   */
  useEffect(() => {
    const updateBuying = () => {
      setBuyingNow(getBuyingNow())
    }

    // Intervalo aleatorio entre 20-40 segundos
    const randomInterval = () => 20000 + Math.random() * 20000

    let timeoutId = setTimeout(function update() {
      updateBuying()
      timeoutId = setTimeout(update, randomInterval())
    }, randomInterval())

    return () => clearTimeout(timeoutId)
  }, [packsRemaining, getBuyingNow])

  /**
   * Sincronizar con ventas de Pack Insano
   * Quando pack vende, aumenta temporariamente "comprando ahora"
   */
  useEffect(() => {
    if (packsRemaining < lastPackCount) {
      // Pack vendido! Aumentar temporariamente
      setBuyingNow(prev => Math.min(prev + 2, 15)) // Máx 15

      // Voltar ao normal após 30-60 segundos
      const timeout = setTimeout(() => {
        setBuyingNow(getBuyingNow())
      }, 30000 + Math.random() * 30000)

      setLastPackCount(packsRemaining)

      return () => clearTimeout(timeout)
    }
    setLastPackCount(packsRemaining)
  }, [packsRemaining, lastPackCount, getBuyingNow])

  /**
   * Tipo de mensagem alternada
   */
  const [messageType, setMessageType] = useState('viewing') // 'viewing' | 'buying'

  useEffect(() => {
    // Alternar entre "viendo" y "comprando" cada 8-12 segundos
    const randomInterval = () => 8000 + Math.random() * 4000

    let timeoutId = setTimeout(function toggle() {
      setMessageType(prev => prev === 'viewing' ? 'buying' : 'viewing')
      timeoutId = setTimeout(toggle, randomInterval())
    }, randomInterval())

    return () => clearTimeout(timeoutId)
  }, [])

  return {
    viewingNow,
    buyingNow,
    messageType,
    // Helpers para UI
    isHighActivity: viewingNow > 150,
    isHighBuying: buyingNow > 10
  }
}
