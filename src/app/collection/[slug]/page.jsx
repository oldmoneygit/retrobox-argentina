'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import ProductCard from '@/components/store/ProductCard'
import SectionTitle from '@/components/store/SectionTitle'
import { COLLECTIONS } from '@/utils/constants'
import { getProductsByCollection } from '@/utils/products'
import { motion } from 'framer-motion'

export default function CollectionPage() {
  const params = useParams()
  const collection = COLLECTIONS.find(c => c.slug === params.slug)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadProducts() {
      const collectionName = collection?.name || params.slug
      const prods = await getProductsByCollection(collectionName)
      setProducts(prods)
      setLoading(false)
    }
    if (collection) {
      loadProducts()
    }
  }, [collection, params.slug])

  if (!collection) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Colección no encontrada</h1>
            <a href="/" className="text-white hover:text-white/80 transition-colors">Volver a la tienda</a>
          </div>
        </div>
        <StoreFooter />
      </>
    )
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <SectionTitle
            title={collection.name}
            highlight="Colección"
            subtitle={collection.description}
          />

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p className="text-gray-medium mt-4">Cargando productos...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-medium">No hay productos en esta colección</p>
            </div>
          )}
        </div>
      </main>

      <StoreFooter />
    </>
  )
}

