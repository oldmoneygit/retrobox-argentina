'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const BlackFridayContext = createContext()

// Constantes do Pack Black (Black Friday)
export const PACK_LOCO_PRICE = 59900 // ARS 59.900 por 4 camisetas
export const PACK_LOCO_SIZE = 4
export const SHIPPING_FEE = 0 // Envío gratis incluído
export const DAILY_PACK_LIMIT = 15 // 15 packs por dia

// Legacy exports para compatibilidade
export const PACK_INSANO_PRICE = PACK_LOCO_PRICE
export const PACK_INSANO_SIZE = PACK_LOCO_SIZE

export function BlackFridayProvider({ children }) {
  const [hasSeenPopup, setHasSeenPopup] = useState(false)
  const [blackFridayEnabled, setBlackFridayEnabled] = useState(true)
  const [packsRemaining, setPacksRemaining] = useState(DAILY_PACK_LIMIT)
  const [lastResetDate, setLastResetDate] = useState(null)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedPopup = localStorage.getItem('blackFridayPopupSeen') === 'true'
    setHasSeenPopup(savedPopup)

    // Carregar dados do pack insano
    const savedPacks = localStorage.getItem('packInsanoRemaining')
    const savedDate = localStorage.getItem('packInsanoResetDate')
    const today = new Date().toDateString()

    if (savedDate !== today) {
      // Novo dia = reset dos packs
      setPacksRemaining(DAILY_PACK_LIMIT)
      setLastResetDate(today)
      localStorage.setItem('packInsanoRemaining', DAILY_PACK_LIMIT.toString())
      localStorage.setItem('packInsanoResetDate', today)
    } else {
      // Mesmo dia = usar packs salvos
      const packs = savedPacks ? parseInt(savedPacks) : DAILY_PACK_LIMIT
      setPacksRemaining(packs)
      setLastResetDate(savedDate)
    }
  }, [])

  // Simular vendas realistas
  useEffect(() => {
    const interval = setInterval(() => {
      const savedDate = localStorage.getItem('packInsanoResetDate')
      const today = new Date().toDateString()

      // Só simular se for o mesmo dia
      if (savedDate === today) {
        const currentPacks = parseInt(localStorage.getItem('packInsanoRemaining') || DAILY_PACK_LIMIT)

        if (currentPacks > 0) {
          // Probabilidade de venda diminui conforme menos packs disponíveis
          const sellProbability = 0.03 * (currentPacks / DAILY_PACK_LIMIT)

          if (Math.random() < sellProbability) {
            const newCount = currentPacks - 1
            setPacksRemaining(newCount)
            localStorage.setItem('packInsanoRemaining', newCount.toString())
          }
        }
      }
    }, 30000) // Verificar a cada 30 segundos

    return () => clearInterval(interval)
  }, [])

  const markPopupAsSeen = () => {
    setHasSeenPopup(true)
    localStorage.setItem('blackFridayPopupSeen', 'true')
  }

  const purchasePack = () => {
    if (packsRemaining > 0) {
      const newCount = packsRemaining - 1
      setPacksRemaining(newCount)
      localStorage.setItem('packInsanoRemaining', newCount.toString())
      return true
    }
    return false
  }

  /**
   * Calcula o total com a lógica do Pack Black (Black Friday)
   *
   * Lógica:
   * - Se < 4 produtos: preço normal
   * - Se = 4 produtos: ARS 59.900 (Pack Black)
   * - Se > 4 produtos:
   *   - Divide em packs completos (cada 4 = ARS 59.900)
   *   - Produtos restantes pagam preço normal
   */
  const calculatePackInsanoTotals = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      return {
        itemCount: 0,
        hasPack: false,
        fullPacks: 0,
        remainingItems: 0,
        subtotalNormal: 0,
        subtotalWithPack: 0,
        savings: 0,
        total: 0,
        shipping: SHIPPING_FEE
      }
    }

    // Calcular quantidade total
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

    // Calcular subtotal normal (sem pack)
    const subtotalNormal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    // Se menos de 4 produtos, não tem pack
    if (itemCount < PACK_LOCO_SIZE) {
      return {
        itemCount,
        hasPack: false,
        fullPacks: 0,
        remainingItems: itemCount,
        subtotalNormal,
        subtotalWithPack: subtotalNormal,
        savings: 0,
        total: subtotalNormal + SHIPPING_FEE,
        shipping: SHIPPING_FEE,
        productsNeeded: PACK_LOCO_SIZE - itemCount
      }
    }

    // Calcular packs completos e items restantes
    const fullPacks = Math.floor(itemCount / PACK_LOCO_SIZE)
    const remainingItems = itemCount % PACK_LOCO_SIZE

    // Calcular preço com pack
    let subtotalWithPack = fullPacks * PACK_LOCO_PRICE

    // Adicionar preço dos produtos restantes (que não completam pack)
    if (remainingItems > 0) {
      const sortedByPrice = [...cartItems].sort((a, b) => b.price - a.price)
      let itemsToAdd = remainingItems

      for (const item of sortedByPrice) {
        if (itemsToAdd === 0) break
        const quantityToUse = Math.min(item.quantity, itemsToAdd)
        subtotalWithPack += item.price * quantityToUse
        itemsToAdd -= quantityToUse
      }
    }

    const savings = subtotalNormal - subtotalWithPack
    const total = subtotalWithPack + SHIPPING_FEE

    return {
      itemCount,
      hasPack: true,
      fullPacks,
      remainingItems,
      subtotalNormal,
      subtotalWithPack,
      savings,
      total,
      shipping: SHIPPING_FEE
    }
  }

  return (
    <BlackFridayContext.Provider
      value={{
        blackFridayEnabled,
        hasSeenPopup,
        markPopupAsSeen,
        calculatePackInsanoTotals,
        packsRemaining,
        purchasePack,
        PACK_LOCO_SIZE,
        PACK_LOCO_PRICE,
        PACK_INSANO_SIZE,
        PACK_INSANO_PRICE,
        SHIPPING_FEE,
        DAILY_PACK_LIMIT
      }}
    >
      {children}
    </BlackFridayContext.Provider>
  )
}

export function useBlackFriday() {
  const context = useContext(BlackFridayContext)
  if (!context) {
    throw new Error('useBlackFriday must be used within BlackFridayProvider')
  }
  return context
}
