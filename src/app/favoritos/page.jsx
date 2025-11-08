'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import OptimizedImage from '@/components/OptimizedImage'
import { useWishlist } from '@/context/WishlistContext'
import WishlistButton from '@/components/wishlist/WishlistButton'

export default function FavoritesPage() {
  const { wishlistItems, removeFromWishlist, isLoaded } = useWishlist()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch
  if (!mounted || !isLoaded) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black text-white">
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </main>
        <StoreFooter />
      </>
    )
  }

  const hasItems = wishlistItems.length > 0

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Mis Favoritos
            </h1>
            <p className="text-gray-400">
              {hasItems
                ? `${wishlistItems.length} ${wishlistItems.length === 1 ? 'producto guardado' : 'productos guardados'}`
                : 'Aún no tienes productos favoritos'
              }
            </p>
          </motion.div>

          {/* Empty State */}
          {!hasItems && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-md mx-auto text-center py-12"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12">
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
                  Tu Lista de Favoritos está Vacía
                </h2>
                <p className="text-gray-300 mb-6">
                  Explora nuestro catálogo y guarda tus camisetas favoritas para encontrarlas fácilmente más tarde.
                </p>
                <Link
                  href="/tienda"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Explorar Tienda
                </Link>
              </div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-white font-bold mb-3">
                  ¿Cómo agregar favoritos?
                </h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <Heart className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <p>Haz clic en el ícono de corazón en cualquier producto</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-4 h-4 text-white flex-shrink-0 mt-0.5 fill-white" />
                    <p>Accede a tus favoritos en cualquier momento desde aquí</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Wishlist Grid */}
          {hasItems && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <AnimatePresence mode="popLayout">
                  {wishlistItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="group h-full flex flex-col"
                    >
                      <Link href={`/product/${item.slug}`} className="flex-1 flex flex-col">
                        <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-3">
                          {/* Wishlist Button */}
                          <div className="absolute top-2 right-2 z-10">
                            <WishlistButton
                              product={{
                                id: item.id,
                                name: item.name,
                                slug: item.slug,
                                price: item.price,
                                image: item.image
                              }}
                              size="sm"
                            />
                          </div>

                          {/* Product Image */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="w-full h-full"
                          >
                            <OptimizedImage
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover transition-transform duration-500"
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />
                          </motion.div>
                        </div>

                        <div className="space-y-2 flex-1 flex flex-col">
                          <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 group-hover:text-white/80 transition-colors flex-1">
                            {item.name}
                          </h3>

                          <p className="text-white font-bold text-lg md:text-xl">
                            ${typeof item.price === 'number' ? item.price.toLocaleString('es-AR') : item.price}
                          </p>

                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white text-black font-bold py-2 md:py-2.5 rounded-full group-hover:bg-gray-200 transition-all duration-300 transform uppercase text-[10px] md:text-xs text-center"
                          >
                            VER DETALLES
                          </motion.div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Continue Shopping CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8 text-center"
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  ¿Buscas Más Camisetas?
                </h3>
                <p className="text-gray-300 mb-6">
                  Explora nuestro catálogo completo y descubre más camisetas retro increíbles.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/tienda"
                    className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Ver Tienda Completa
                  </Link>
                  <Link
                    href="/colecciones"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-all border border-white/20"
                  >
                    Ver Colecciones
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
