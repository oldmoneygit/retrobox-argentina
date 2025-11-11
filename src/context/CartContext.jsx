'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createShopifyCheckout } from '@/lib/shopifyCheckout'
import { getVariantId } from '@/utils/getVariantId'
import { triggerInitiateCheckout } from '@/components/MetaPixelEvents'
import { getFacebookClickId, getFacebookBrowserId } from '@/utils/metaPixelUtils'

const normalizeKey = (value) =>
  (value ?? '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, '')
    .toLowerCase()

const buildVariantKey = (productId, size, customization = null) => {
  const sizeKey = normalizeKey(size)
  const customKey = customization?.enabled
    ? `custom::${normalizeKey(customization.playerName || '')}::${normalizeKey(customization.playerNumber || '')}`
    : ''
  return [productId, sizeKey, customKey].filter(Boolean).join('::')
}

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('retrobox_cart')
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart)
        if (Array.isArray(parsed)) {
          const normalizedItems = parsed.map((item) => {
            const variantKey = item.variantKey || buildVariantKey(item.id, item.size)
            return {
              ...item,
              variantKey,
            }
          })
          setCartItems(normalizedItems)
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('retrobox_cart', JSON.stringify(cartItems))
    }
  }, [cartItems, isLoaded])

  // Add item to cart or update quantity if already exists
  const addToCart = (product, size, quantity = 1, customization = null) => {
    setCartItems((prevItems) => {
      const variantKey = buildVariantKey(product.id, size, customization)

      const existingItemIndex = prevItems.findIndex((item) => item.variantKey === variantKey)

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        const newItem = {
          id: product.id,
          variantKey,
          name: product.name,
          slug: product.slug,
          image: product.image || product.gallery?.[0],
          price: product.price,
          size,
          quantity,
          customization: customization?.enabled ? customization : null,
          shopifyVariantId: product.shopifyVariantId || null,
          shopifyProductId: product.shopifyProductId || null,
        }

        return [...prevItems, newItem]
      }
    })
  }

  // Update quantity of an item
  const updateQuantity = (variantKey, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(variantKey)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.variantKey === variantKey ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // Remove item from cart
  const removeFromCart = (variantKey) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.variantKey !== variantKey))
  }

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([])
  }

  // Get total number of items in cart
  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  // Get total price of cart
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price
      const customizationPrice = item.customization?.enabled ? item.customization.price : 0
      return total + (itemPrice + customizationPrice) * item.quantity
    }, 0)
  }

  // Create checkout URL (Shopify integration)
  const createCheckout = async () => {
    try {
      if (cartItems.length === 0) {
        throw new Error('Carrinho vazio')
      }

      // 1. Disparar evento InitiateCheckout ANTES de redirecionar
      triggerInitiateCheckout(cartItems)

      // 2. Converter itens do carrinho para line items do Shopify
      const lineItems = []

      for (const item of cartItems) {
        // Buscar variant ID usando o slug e tamanho
        const variantId = getVariantId(item.slug, item.size)

        if (!variantId) {
          console.error(`Variant ID não encontrado para: ${item.slug} - ${item.size}`)
          throw new Error(`Produto ${item.name} (${item.size}) não está disponível no momento`)
        }

        lineItems.push({
          variantId: variantId,
          quantity: item.quantity
        })
      }

      // 3. Criar checkout no Shopify
      const checkout = await createShopifyCheckout(lineItems)

      // 4. Capturar fbc e fbp para passar para Shopify (CRÍTICO para tracking)
      const fbc = getFacebookClickId()
      const fbp = getFacebookBrowserId()

      // 5. Adicionar fbc e fbp como parâmetros na URL do checkout
      let checkoutUrl = checkout.webUrl

      if (fbc || fbp) {
        const url = new URL(checkoutUrl)
        if (fbc) url.searchParams.append('fbc', fbc)
        if (fbp) url.searchParams.append('fbp', fbp)
        checkoutUrl = url.toString()

        console.log('[Meta Pixel] Passing tracking params to Shopify:', { fbc, fbp })
      }

      return checkoutUrl
    } catch (error) {
      console.error('Erro ao criar checkout:', error)
      throw error
    }
  }

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemCount,
    getTotalPrice,
    createCheckout,
    isLoaded,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

