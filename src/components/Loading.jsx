'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Loading Component for pages
 * Shows a skeleton loader while page content loads
 */
export default function PageLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white/60">Cargando...</p>
      </div>
    </div>
  )
}

/**
 * Loading component for sections
 */
export function SectionLoading() {
  return (
    <div className="h-96 bg-black animate-pulse flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
    </div>
  )
}

