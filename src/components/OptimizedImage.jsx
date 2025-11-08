'use client'

import Image from 'next/image'

/**
 * OptimizedImage Component
 * Wrapper para Next.js Image com otimizações
 * Next.js Image já trata erros automaticamente (não renderiza se a imagem não existir)
 */
export default function OptimizedImage({ src, alt, fallback, className = '', ...props }) {
  // Se há fallback definido mas a imagem principal não existe, usar fallback
  // Caso contrário, Next.js Image vai simplesmente não renderizar nada se a imagem não existir
  const imageSrc = src || fallback

  return (
    <Image
      src={imageSrc}
      alt={alt || 'Image'}
      className={className}
      {...props}
    />
  )
}

