'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ScrollToTop Component
 * Ensures pages always load at the top position
 * Fixes auto-scroll bug on page load
 */
export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top instantly when route changes
    window.scrollTo(0, 0)
    
    // Disable browser's scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [pathname])

  // Also ensure scroll is at top on initial mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}

