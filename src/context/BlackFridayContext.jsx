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

// Tabela de preços Mystery Box (desconto progressivo)
export const MYSTERYBOX_PRICE_TIERS = [
  { quantity: 1, price: 23900, pricePerBox: 23900, discount: 0 },
  { quantity: 2, price: 39900, pricePerBox: 19950, discount: 16 },
  { quantity: 3, price: 47700, pricePerBox: 15900, discount: 33 },
  { quantity: 4, price: 55600, pricePerBox: 13900, discount: 42 },
  { quantity: 5, price: 59500, pricePerBox: 11900, discount: 50 },
]

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
   * Calcula o total com a lógica do Pack Black (Black Friday) e Mystery Box
   *
   * Lógica:
   * - Mystery Boxes: desconto progressivo (1-5 boxes)
   * - Jerseys normais: Pack Black (4x59.900)
   * - Ambos podem coexistir no mesmo carrinho
   */
  const calculatePackInsanoTotals = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      return {
        itemCount: 0,
        hasPack: false,
        hasMysteryBox: false,
        fullPacks: 0,
        remainingItems: 0,
        subtotalNormal: 0,
        subtotalWithPack: 0,
        savings: 0,
        total: 0,
        shipping: SHIPPING_FEE,
        mysteryBoxCount: 0,
        mysteryBoxDiscount: 0
      }
    }

    // Separar Mystery Boxes de jerseys normais
    const mysteryBoxItems = cartItems.filter(item =>
      item.slug && item.slug.startsWith('mystery-box-')
    )
    const regularItems = cartItems.filter(item =>
      !item.slug || !item.slug.startsWith('mystery-box-')
    )

    // Contar Mystery Boxes
    const mysteryBoxCount = mysteryBoxItems.reduce((sum, item) => sum + item.quantity, 0)
    const regularCount = regularItems.reduce((sum, item) => sum + item.quantity, 0)
    const itemCount = mysteryBoxCount + regularCount

    // Calcular subtotal normal (sem descontos)
    const subtotalNormal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

    let subtotalWithPack = 0
    let savings = 0
    let mysteryBoxDiscount = 0
    let hasMysteryBox = false
    let hasPack = false

    // CALCULAR DESCONTO DOS MYSTERY BOXES
    if (mysteryBoxCount > 0) {
      hasMysteryBox = true
      // Pegar o tier correto (máximo 5)
      const tierQuantity = Math.min(mysteryBoxCount, 5)
      const tier = MYSTERYBOX_PRICE_TIERS.find(t => t.quantity === tierQuantity)
        || MYSTERYBOX_PRICE_TIERS[0]

      const mysteryBoxNormalPrice = mysteryBoxItems.reduce((sum, item) =>
        sum + (item.price * item.quantity), 0
      )
      const mysteryBoxDiscountedPrice = tier.price
      mysteryBoxDiscount = mysteryBoxNormalPrice - mysteryBoxDiscountedPrice

      subtotalWithPack += mysteryBoxDiscountedPrice
      savings += mysteryBoxDiscount
    }

    // CALCULAR DESCONTO DO PACK BLACK (JERSEYS NORMAIS)
    if (regularCount >= PACK_LOCO_SIZE) {
      hasPack = true
      const fullPacks = Math.floor(regularCount / PACK_LOCO_SIZE)
      const remainingItems = regularCount % PACK_LOCO_SIZE

      // Preço com pack
      subtotalWithPack += fullPacks * PACK_LOCO_PRICE

      // Adicionar preço dos produtos restantes (que não completam pack)
      if (remainingItems > 0) {
        const sortedByPrice = [...regularItems].sort((a, b) => b.price - a.price)
        let itemsToAdd = remainingItems

        for (const item of sortedByPrice) {
          if (itemsToAdd === 0) break
          const quantityToUse = Math.min(item.quantity, itemsToAdd)
          subtotalWithPack += item.price * quantityToUse
          itemsToAdd -= quantityToUse
        }
      }

      const regularNormalPrice = regularItems.reduce((sum, item) =>
        sum + (item.price * item.quantity), 0
      )
      const packSavings = regularNormalPrice - (subtotalWithPack - (hasMysteryBox ? MYSTERYBOX_PRICE_TIERS.find(t => t.quantity === Math.min(mysteryBoxCount, 5))?.price || 0 : 0))
      savings += packSavings
    } else {
      // Jerseys normais sem pack (preço normal)
      const regularNormalPrice = regularItems.reduce((sum, item) =>
        sum + (item.price * item.quantity), 0
      )
      subtotalWithPack += regularNormalPrice
    }

    const total = subtotalWithPack + SHIPPING_FEE

    return {
      itemCount,
      hasPack,
      hasMysteryBox,
      mysteryBoxCount,
      mysteryBoxDiscount,
      fullPacks: regularCount >= PACK_LOCO_SIZE ? Math.floor(regularCount / PACK_LOCO_SIZE) : 0,
      remainingItems: regularCount % PACK_LOCO_SIZE,
      subtotalNormal,
      subtotalWithPack,
      savings,
      total,
      shipping: SHIPPING_FEE,
      productsNeeded: regularCount < PACK_LOCO_SIZE ? PACK_LOCO_SIZE - regularCount : 0
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
