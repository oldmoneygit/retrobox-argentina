'use client'

import { useMemo, useState } from 'react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, ShoppingBag, Share2 } from 'lucide-react'
import Link from 'next/link'
import {
  getProductById,
  getAllLeagues,
  getTeamsByLeague,
  createSlug,
  getProductImages,
  getProductPrice,
  getCompareAtPrice,
  formatPrice,
  getRelatedProducts
} from '@/utils/retroProducts'
import OptimizedImage from '@/components/OptimizedImage'
import WishlistButton from '@/components/wishlist/WishlistButton'

export default function ProductDetailPage({ params }) {
  const { liga: ligaSlug, equipo: equipoSlug, id: productId } = params

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')

  // Get product data
  const product = useMemo(() => getProductById(productId), [productId])

  // Get league name
  const allLeagues = getAllLeagues()
  const leagueName = useMemo(() => {
    return allLeagues.find(league => createSlug(league) === ligaSlug)
  }, [ligaSlug, allLeagues])

  // Get team name
  const teamName = useMemo(() => {
    if (!leagueName) return null
    const teams = getTeamsByLeague(leagueName)
    const team = teams.find(t => createSlug(t.name) === equipoSlug)
    return team?.name
  }, [leagueName, equipoSlug])

  if (!product || !leagueName || !teamName) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
            <Link href="/colecciones" className="text-white/80 hover:text-white">
              Volver a Colecciones
            </Link>
          </div>
        </main>
        <StoreFooter />
      </>
    )
  }

  const images = getProductImages(product)
  const price = getProductPrice(product)
  const compareAtPrice = getCompareAtPrice(product)
  const relatedProducts = getRelatedProducts(product)

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL']

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.nome_completo,
          text: `Mirá esta camiseta retro: ${product.nome_completo}`,
          url: window.location.href
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    }
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-2 text-sm flex-wrap"
          >
            <Link href="/colecciones" className="text-gray-400 hover:text-white transition-colors">
              Colecciones
            </Link>
            <span className="text-gray-600">/</span>
            <Link href={`/colecciones/${ligaSlug}`} className="text-gray-400 hover:text-white transition-colors">
              {leagueName}
            </Link>
            <span className="text-gray-600">/</span>
            <Link href={`/colecciones/${ligaSlug}/${equipoSlug}`} className="text-gray-400 hover:text-white transition-colors">
              {teamName}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white truncate">{product.ano} {product.tipo}</span>
          </motion.div>

          {/* Product Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <OptimizedImage
                      src={images[selectedImageIndex]}
                      alt={`${product.nome_completo} - Imagen ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-[3/4] bg-white rounded-lg overflow-hidden ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-black'
                        : 'opacity-60 hover:opacity-100'
                    } transition-all`}
                  >
                    <OptimizedImage
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Title & Price */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    {product.nome_completo}
                  </h1>
                  <div className="flex gap-2">
                    <WishlistButton
                      product={{
                        id: product.id,
                        name: product.nome_completo,
                        slug: productId,
                        price: price,
                        image: images[0]
                      }}
                      size="md"
                    />
                    <button
                      onClick={handleShare}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                      aria-label="Compartir"
                    >
                      <Share2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Black November Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                  <span>🔥</span>
                  <span>BLACK NOVEMBER</span>
                  <span>33% OFF</span>
                </div>

                {/* Price Section */}
                <div className="space-y-1 mb-2">
                  <div className="flex items-center gap-3">
                    <p className="text-gray-400 text-2xl line-through">
                      ${formatPrice(compareAtPrice)}
                    </p>
                  </div>
                  <p className="text-4xl font-bold text-white">
                    ${formatPrice(price)}
                  </p>
                </div>
                <p className="text-gray-400 text-sm">
                  Envío gratis en compras superiores a $20.000
                </p>
              </div>

              {/* Product Details */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Equipo:</span>
                  <span className="text-white font-semibold">{product.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Temporada:</span>
                  <span className="text-white font-semibold">{product.ano}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tipo:</span>
                  <span className="text-white font-semibold">{product.tipo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Liga:</span>
                  <span className="text-white font-semibold">{product.liga}</span>
                </div>
                {product.extras && product.extras.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Extras:</span>
                    <span className="text-white font-semibold">{product.extras.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-white font-semibold mb-3">
                  Selecciona tu talle:
                </label>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <Link
                  href="/guia-de-tallas"
                  className="inline-block mt-3 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Ver guía de tallas
                </Link>
              </div>

              {/* Add to Cart */}
              <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-lg">
                <ShoppingBag className="w-5 h-5" />
                Agregar al Carrito
              </button>

              {/* Product Description */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-white font-bold mb-3">Descripción</h3>
                <p className="text-gray-300 leading-relaxed">
                  Camiseta retro {product.tipo.toLowerCase()} del {product.time}, temporada {product.ano}.
                  Réplica de alta calidad que te transportará a una época dorada del fútbol.
                  Ideal para coleccionistas y fanáticos que buscan revivir momentos históricos.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Más camisetas de {product.time}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/colecciones/${ligaSlug}/${equipoSlug}/${relatedProduct.id}`}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-3">
                      <OptimizedImage
                        src={getProductImages(relatedProduct)[0]}
                        alt={relatedProduct.nome_completo}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Black November Badge */}
                      <div className="absolute top-2 right-2 z-10">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                          🔥 33%
                        </div>
                      </div>
                    </div>
                    <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-white/80 transition-colors">
                      {relatedProduct.nome_completo}
                    </h3>
                    <div className="mt-2 space-y-0.5">
                      <p className="text-gray-400 text-xs line-through">
                        ${formatPrice(getCompareAtPrice(relatedProduct))}
                      </p>
                      <p className="text-white font-bold text-lg">
                        ${formatPrice(getProductPrice(relatedProduct))}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
