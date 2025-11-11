'use client'

import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { BlackFridayProvider } from '@/context/BlackFridayContext'
import { ThemeProvider } from '@/context/ThemeContext'

export default function ClientProviders({ children }) {
  return (
    <ThemeProvider>
      <BlackFridayProvider>
        <WishlistProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </WishlistProvider>
      </BlackFridayProvider>
    </ThemeProvider>
  )
}

