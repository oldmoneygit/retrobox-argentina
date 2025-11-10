'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import SectionTitle from './SectionTitle'
import ProductCard from './ProductCard'
import { getFeaturedProducts } from '@/utils/products'

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    async function loadProducts() {
      const featured = await getFeaturedProducts(15)
      setProducts(featured)
    }
    loadProducts()
  }, [])
  
  if (products.length === 0) return null

  return (
    <section className="relative py-8 md:py-10 bg-black" id="featured">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Productos"
          highlight="Destacados"
          subtitle="Selección especial de camisetas retrô exclusivas"
        />

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Ver Colección Completa Button */}
        <div className="flex justify-center mt-6 md:mt-8">
          <Link
            href="/coleccion/productos-destacados"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white hover:bg-white/90 text-black font-black uppercase text-sm md:text-base rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-white/50"
          >
            Ver Colección Completa
            <ChevronRight size={20} className="md:hidden" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts

