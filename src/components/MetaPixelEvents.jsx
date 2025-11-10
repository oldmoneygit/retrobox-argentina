'use client'

import { useEffect } from 'react'
import { trackPixelEvent, formatProductData, formatCartData } from '@/utils/metaPixelUtils'

/**
 * ViewContent Event
 *
 * Dispara quando usuário visualiza página de produto
 * Previne duplicatas com sessionStorage
 */
export function ViewContent({ product }) {
  useEffect(() => {
    if (!product) return

    // Prevenir duplicatas com sessionStorage
    const productId = product.id || product.slug
    const tracked = sessionStorage.getItem(`viewcontent_${productId}`)

    if (!tracked) {
      const eventData = formatProductData(product)
      trackPixelEvent('ViewContent', eventData)

      // Marcar como rastreado
      sessionStorage.setItem(`viewcontent_${productId}`, Date.now().toString())
    }
  }, [product])

  return null
}

/**
 * AddToCart Event
 *
 * Dispara quando usuário adiciona produto ao carrinho
 */
export function triggerAddToCart(product, quantity = 1) {
  if (!product) return

  const eventData = {
    ...formatProductData(product),
    quantity,
  }

  trackPixelEvent('AddToCart', eventData)
}

/**
 * InitiateCheckout Event
 *
 * Dispara quando usuário clica em "Finalizar Compra"
 */
export function triggerInitiateCheckout(cartItems) {
  if (!cartItems || cartItems.length === 0) return

  const eventData = formatCartData(cartItems)
  trackPixelEvent('InitiateCheckout', eventData)
}

/**
 * AddToWishlist Event
 *
 * Dispara quando usuário adiciona aos favoritos
 */
export function triggerAddToWishlist(product) {
  if (!product) return

  const eventData = formatProductData(product)
  trackPixelEvent('AddToWishlist', eventData)
}

/**
 * Search Event
 *
 * Dispara quando usuário faz busca
 */
export function triggerSearch(searchQuery) {
  if (!searchQuery) return

  trackPixelEvent('Search', {
    search_string: searchQuery,
  })
}
