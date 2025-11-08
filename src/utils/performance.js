/**
 * Performance utilities for mobile optimization
 */

// Detectar se é mobile
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

// Detectar se tem conexão lenta
export const isSlowConnection = () => {
  if (typeof navigator === 'undefined' || !navigator.connection) return false

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  // Se tiver info de conexão, considerar lento se effective type for 2g ou 3g
  if (connection.effectiveType) {
    return connection.effectiveType === '2g' || connection.effectiveType === '3g' || connection.effectiveType === 'slow-2g'
  }

  // Se salvar dados estiver ativado, considerar conexão lenta
  if (connection.saveData) {
    return true
  }

  return false
}

// Configurações de animação baseadas em performance
export const getAnimationConfig = () => {
  const mobile = isMobile()
  const slowConn = isSlowConnection()

  // Se mobile ou conexão lenta, desabilitar animações
  if (mobile || slowConn) {
    return {
      initial: false,
      animate: false,
      transition: { duration: 0 },
      whileHover: {},
      whileTap: {}
    }
  }

  return null // usar configurações padrão
}

// Configurações de imagem baseadas em posição
export const getImageConfig = (index, total) => {
  // Only first 4 images get priority to avoid overloading browser
  // This improves LCP (Largest Contentful Paint) metric
  const isPriority = index < 4

  return {
    loading: isPriority ? 'eager' : 'lazy',
    priority: isPriority,
    quality: isPriority ? 75 : 65 // Reduced quality for better performance
  }
}

