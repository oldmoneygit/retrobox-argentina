'use client'

import { useState, useEffect } from 'react'

const MAX_RECENT_PRODUCTS = 8
const STORAGE_KEY = 'retrobox_recently_viewed'

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setRecentlyViewed(parsed)
      }
    } catch (error) {
      console.error('Error loading recently viewed:', error)
    }
  }, [])

  // Add product to recently viewed
  const addToRecentlyViewed = (product) => {
    try {
      // Create simplified product object to save space
      const simplifiedProduct = {
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        image: product.image,
        timestamp: new Date().getTime(),
      }

      setRecentlyViewed((prev) => {
        // Remove if already exists
        const filtered = prev.filter((p) => p.id !== simplifiedProduct.id)

        // Add to beginning
        const updated = [simplifiedProduct, ...filtered]

        // Keep only MAX_RECENT_PRODUCTS
        const limited = updated.slice(0, MAX_RECENT_PRODUCTS)

        // Save to localStorage
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(limited))
        } catch (e) {
          console.error('Error saving to localStorage:', e)
        }

        return limited
      })
    } catch (error) {
      console.error('Error adding to recently viewed:', error)
    }
  }

  // Clear all recently viewed
  const clearRecentlyViewed = () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setRecentlyViewed([])
    } catch (error) {
      console.error('Error clearing recently viewed:', error)
    }
  }

  return {
    recentlyViewed,
    addToRecentlyViewed,
    clearRecentlyViewed,
  }
}
