'use client'

import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { BlackFridayProvider } from '@/context/BlackFridayContext'

export default function ClientProviders({ children }) {
  return (
    <BlackFridayProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </WishlistProvider>
    </BlackFridayProvider>
  )
}

