'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const normalizeKey = (value) =>
  (value ?? '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, '')
    .toLowerCase()

const buildVariantKey = (productId, size) => {
  const sizeKey = normalizeKey(size)
  return [productId, sizeKey].filter(Boolean).join('::')
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
  const addToCart = (product, size, quantity = 1) => {
    setCartItems((prevItems) => {
      const variantKey = buildVariantKey(product.id, size)

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
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Create checkout URL (Shopify integration)
  const createCheckout = async () => {
    // TODO: Implement Shopify checkout creation
    // For now, return empty string
    return ''
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

