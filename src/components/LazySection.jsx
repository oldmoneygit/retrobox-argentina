'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * LazySection - Component for lazy loading sections with Intersection Observer
 * Only renders children when they're about to enter the viewport
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Content to lazy load
 * @param {string} props.className - Optional className for the wrapper
 * @param {number} props.rootMargin - Margin before triggering load (default: 300px)
 * @param {number} props.threshold - Intersection threshold (default: 0)
 * @param {React.ReactNode} props.placeholder - Optional placeholder while loading
 */
export default function LazySection({
  children,
  className = '',
  rootMargin = '300px',
  threshold = 0,
  placeholder = null,
}) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    // Skip if already visible or no ref
    if (isVisible || !sectionRef.current) return

    // Skip if IntersectionObserver is not supported (load immediately)
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isVisible, rootMargin, threshold])

  return (
    <div ref={sectionRef} className={className}>
      {isVisible ? children : placeholder}
    </div>
  )
}
