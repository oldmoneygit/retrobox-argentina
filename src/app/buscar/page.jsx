'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import ProductCard from '@/components/store/ProductCard'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { searchProducts } from '@/utils/products'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const results = await searchProducts(query)
      setFilteredProducts(results)
      setLoading(false)
    }
    loadProducts()
  }, [query])

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {query ? `Resultados para "${query}"` : 'Buscar Productos'}
            </h1>
            
            {query && (
              <p className="text-gray-medium">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              <p className="text-gray-medium mt-4">Buscando productos...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.01 }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12">
              <Search size={64} className="mx-auto mb-4 text-gray-medium" />
              <p className="text-xl text-gray-medium mb-4">No se encontraron productos</p>
              <p className="text-gray-medium">Intenta con otros términos de búsqueda</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <Search size={64} className="mx-auto mb-4 text-gray-medium" />
              <p className="text-xl text-gray-medium">Ingresa un término de búsqueda</p>
            </div>
          )}
        </div>
      </main>

      <StoreFooter />
    </>
  )
}

