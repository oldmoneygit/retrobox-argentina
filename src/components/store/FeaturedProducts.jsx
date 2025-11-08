'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import ProductCard from './ProductCard'
import { getFeaturedProducts } from '@/utils/products'

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    async function loadProducts() {
      const featured = await getFeaturedProducts(6)
      setProducts(featured)
    }
    loadProducts()
  }, [])
  
  if (products.length === 0) return null

  return (
    <section className="relative py-20 bg-black" id="featured">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Productos"
          highlight="Destacados"
          subtitle="Selección especial de camisetas retrô exclusivas"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts

