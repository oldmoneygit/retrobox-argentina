'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import ProductCard from '@/components/store/ProductCard'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { searchProducts } from '@/utils/products'

function SearchContent() {
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
    <main className="min-h-screen dark:bg-black bg-white dark:text-white text-black transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-black mb-4">
            {query ? `Resultados para "${query}"` : 'Buscar Productos'}
          </h1>
          
          {query && (
            <p className="dark:text-gray-medium text-gray-600">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 dark:border-b-2 dark:border-white border-b-2 border-black"></div>
            <p className="dark:text-gray-medium text-gray-600 mt-4">Buscando productos...</p>
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
            <Search size={64} className="mx-auto mb-4 dark:text-gray-medium text-gray-600" />
            <p className="text-xl dark:text-gray-medium text-gray-600 mb-4">No se encontraron productos</p>
            <p className="dark:text-gray-medium text-gray-600">Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <Search size={64} className="mx-auto mb-4 dark:text-gray-medium text-gray-600" />
            <p className="text-xl dark:text-gray-medium text-gray-600">Ingresa un término de búsqueda</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <main className="min-h-screen dark:bg-black bg-white dark:text-white text-black transition-colors duration-300">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 dark:border-b-2 dark:border-white border-b-2 border-black"></div>
              <p className="dark:text-gray-medium text-gray-600 mt-4">Cargando...</p>
            </div>
          </div>
        </main>
      }>
        <SearchContent />
      </Suspense>
      <StoreFooter />
    </>
  )
}

