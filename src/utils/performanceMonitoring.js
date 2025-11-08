/**
 * Performance monitoring utilities
 */

/**
 * Measure performance metrics
 */
export const measurePerformance = () => {
  if (typeof window === 'undefined' || !window.performance) return null

  const navigation = performance.getEntriesByType('navigation')[0]
  
  return {
    dns: navigation.dnsEnd - navigation.dnsStart,
    tcp: navigation.connectEnd - navigation.connectStart,
    request: navigation.responseStart - navigation.requestStart,
    response: navigation.responseEnd - navigation.responseStart,
    dom: navigation.domComplete - navigation.domLoading,
    load: navigation.loadEventEnd - navigation.loadEventStart,
    total: navigation.loadEventEnd - navigation.fetchStart,
  }
}

/**
 * Log performance metrics
 */
export const logPerformance = () => {
  const metrics = measurePerformance()
  if (metrics) {
    console.log('Performance Metrics:', metrics)
    
    // Send to analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'timing_complete', {
        name: 'page_load',
        value: Math.round(metrics.total),
      })
    }
  }
}

/**
 * Check if connection is slow
 */
export const isSlowConnection = () => {
  if (typeof navigator === 'undefined' || !navigator.connection) return false

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  if (connection.effectiveType) {
    return ['2g', 'slow-2g', '3g'].includes(connection.effectiveType)
  }

  if (connection.saveData) {
    return true
  }

  return false
}

