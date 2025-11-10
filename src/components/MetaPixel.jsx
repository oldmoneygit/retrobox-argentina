'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initializeFacebookParams, trackPixelEvent } from '@/utils/metaPixelUtils'

/**
 * Meta Pixel Tracker
 *
 * Rastreia mudanças de rota e dispara PageView automaticamente
 * Captura fbc (fbclid) da URL no primeiro mount
 */
function MetaPixelTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Inicializar parâmetros do Facebook uma vez no mount
  useEffect(() => {
    initializeFacebookParams() // Captura fbc da URL se presente
  }, [])

  // Track PageView em toda mudança de rota
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      trackPixelEvent('PageView', {})
    }
  }, [pathname, searchParams]) // Re-executa em mudança de rota

  return null
}

export default function MetaPixel() {
  return (
    <Suspense fallback={null}>
      <MetaPixelTracker />
    </Suspense>
  )
}
