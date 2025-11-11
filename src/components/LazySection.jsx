'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * LazySection - Componente que carrega conteúdo apenas quando próximo do viewport
 * Melhora significativamente o Speed Index ao adiar carregamento de conteúdo abaixo da dobra
 * 
 * @param {ReactNode} children - Conteúdo a ser carregado lazy
 * @param {string} rootMargin - Margem do viewport para trigger (ex: "300px")
 * @param {ReactNode} fallback - Componente a mostrar enquanto não visível
 */
export default function LazySection({ 
  children, 
  rootMargin = '300px',
  fallback = null 
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    // Se já foi visível, não precisa mais observar
    if (hasBeenVisible) return

    // Fallback para browsers sem IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      setHasBeenVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            setHasBeenVisible(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin,
        threshold: 0.01, // Trigger assim que 1% estiver visível
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, hasBeenVisible])

  return (
    <div ref={ref}>
      {isVisible ? children : fallback}
    </div>
  )
}
