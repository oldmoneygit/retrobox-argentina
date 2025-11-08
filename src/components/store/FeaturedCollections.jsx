'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from './ProductCard'
import { getAllProducts } from '@/utils/products'

const featuredCollections = [
  {
    id: 'boca-juniors',
    name: 'Boca Juniors',
    slug: 'boca-juniors',
    description: 'La Mitad + 1',
    logo: '/images/collections/boca-juniors-logo.png',
    bgGradient: 'from-blue-900/20 via-blue-800/20 to-yellow-600/20',
    textColor: 'text-yellow-400',
    keywords: ['Boca', 'Boca Juniors', 'CABJ']
  },
  {
    id: 'river-plate',
    name: 'River Plate',
    slug: 'river-plate',
    description: 'El Más Grande',
    logo: '/images/collections/river-plate-logo.png',
    bgGradient: 'from-red-700/20 via-red-600/20 to-white/10',
    textColor: 'text-red-500',
    keywords: ['River', 'River Plate', 'CARP']
  },
  {
    id: 'seleccion-argentina',
    name: 'Selección Argentina',
    slug: 'seleccion-argentina',
    description: 'Tri Campeón del Mundo',
    logo: '/images/collections/argentina-logo.png',
    bgGradient: 'from-sky-400/20 via-white/10 to-sky-400/20',
    textColor: 'text-sky-400',
    keywords: ['Argentina', 'Selección', 'Albiceleste', 'AFA']
  },
]

export default function FeaturedCollections() {
  const [collectionProducts, setCollectionProducts] = useState({})
  const [loading, setLoading] = useState(true)
  const scrollRefs = useRef({})

  useEffect(() => {
    async function loadProducts() {
      const allProducts = await getAllProducts()
      const productsByCollection = {}

      featuredCollections.forEach(collection => {
        const filtered = allProducts.filter(product => {
          const searchText = `${product.name} ${product.tags?.join(' ') || ''} ${product.collection || ''}`.toLowerCase()
          return collection.keywords.some(keyword => searchText.includes(keyword.toLowerCase()))
        })
        productsByCollection[collection.id] = filtered.slice(0, 8) // Limitar a 8 productos por colección
      })

      setCollectionProducts(productsByCollection)
      setLoading(false)
    }

    loadProducts()
  }, [])

  const scroll = (collectionId, direction) => {
    const container = scrollRefs.current[collectionId]
    if (container) {
      const scrollAmount = 300
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }
  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white/70 mt-4">Cargando colecciones...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Colecciones Icónicas
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Las camisetas que marcaron la historia del fútbol argentino
          </p>
        </motion.div>

        {/* Featured Collections Carousels */}
        <div className="space-y-16">
          {featuredCollections.map((collection, collectionIndex) => {
            const products = collectionProducts[collection.id] || []

            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: collectionIndex * 0.1 }}
                className="relative"
              >
                {/* Collection Header */}
                <div className="flex items-center gap-4 md:gap-6 mb-8">
                  {/* Logo */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                    <Image
                      src={collection.logo}
                      alt={collection.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>

                  {/* Name and Description */}
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-black ${collection.textColor} mb-1`}>
                      {collection.name}
                    </h3>
                    <p className="text-white/60 text-sm md:text-base">
                      {collection.description}
                    </p>
                  </div>
                </div>

                {/* Products Carousel */}
                {products.length > 0 ? (
                  <div className="relative group">
                    {/* Left Arrow */}
                    <button
                      onClick={() => scroll(collection.id, 'left')}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                      aria-label="Anterior"
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    {/* Products Container */}
                    <div
                      ref={el => scrollRefs.current[collection.id] = el}
                      className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {products.map((product, index) => (
                        <div key={product.id} className="flex-shrink-0 w-64">
                          <ProductCard product={product} index={index} />
                        </div>
                      ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                      onClick={() => scroll(collection.id, 'right')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                      aria-label="Siguiente"
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/50">No hay productos disponibles en esta colección</p>
                  </div>
                )}

                {/* View Full Collection Link */}
                <div className="mt-6 text-center">
                  <Link href={`/coleccion/${collection.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider hover:text-orange-400 transition-colors duration-300"
                    >
                      Ver Colección Completa
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
