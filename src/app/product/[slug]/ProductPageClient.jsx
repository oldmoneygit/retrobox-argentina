'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OptimizedImage from '@/components/OptimizedImage'
import { ChevronLeft, ChevronRight, Minus, Plus, ArrowLeft, ShoppingCart, Check, Heart, Ruler, X, Package, Truck, Shield, RotateCcw, Sparkles } from 'lucide-react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import Link from 'next/link'
import BlackFridayProductCard from '@/components/blackfriday/BlackFridayProductCard'
import ReservationCountdown from '@/components/blackfriday/ReservationCountdown'
import { DEFAULT_SIZES } from '@/utils/constants'
import useEmblaCarousel from 'embla-carousel-react'

// Size Guide Modal Component
const SizeGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-black border-2 border-white/10 rounded-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg">
                <Ruler className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white uppercase">Guía de Tallas</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Cerrar guía"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Nota importante */}
          <div className="mb-6 p-4 bg-white/5 border border-white/20 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shrink-0">
                <Check className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-white font-bold mb-1">¿No querés medir?</p>
                <p className="text-white/80 text-sm">
                  Podés elegir tu <strong className="text-white">talla habitual</strong> sin problemas.
                  Nuestras camisetas tienen un calce estándar y cómodo.
                </p>
              </div>
            </div>
          </div>

          {/* Size Chart Table */}
          <div className="mb-6">
            <h3 className="text-white font-bold mb-3 uppercase text-sm">Tabla de Medidas</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white/10">
                    <th className="px-4 py-3 text-left text-white font-bold uppercase text-sm border border-white/10">
                      Talla
                    </th>
                    <th className="px-4 py-3 text-left text-white font-bold uppercase text-sm border border-white/10">
                      Contorno Pecho
                    </th>
                    <th className="px-4 py-3 text-left text-white font-bold uppercase text-sm border border-white/10">
                      Largo Total
                    </th>
                    <th className="px-4 py-3 text-left text-white font-bold uppercase text-sm border border-white/10">
                      Equivalencia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white font-bold border border-white/10">S</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">88-93 cm</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">71 cm</td>
                    <td className="px-4 py-3 text-white/60 text-sm border border-white/10">Small / Pequeño</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white font-bold border border-white/10">M</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">94-99 cm</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">73 cm</td>
                    <td className="px-4 py-3 text-white/60 text-sm border border-white/10">Medium / Mediano</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white font-bold border border-white/10">L</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">100-105 cm</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">75 cm</td>
                    <td className="px-4 py-3 text-white/60 text-sm border border-white/10">Large / Grande</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white font-bold border border-white/10">XL</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">106-111 cm</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">77 cm</td>
                    <td className="px-4 py-3 text-white/60 text-sm border border-white/10">Extra Large</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white font-bold border border-white/10">XXL</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">112-117 cm</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">79 cm</td>
                    <td className="px-4 py-3 text-white/60 text-sm border border-white/10">2X Large</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white font-bold border border-white/10">3XL</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">118-123 cm</td>
                    <td className="px-4 py-3 text-white/80 border border-white/10">81 cm</td>
                    <td className="px-4 py-3 text-white/60 text-sm border border-white/10">3X Large</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cómo medir */}
          <div className="mb-6 p-4 bg-white/5 border border-white/20 rounded-xl">
            <h3 className="text-white font-bold mb-3 uppercase text-sm flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Cómo Medir Correctamente
            </h3>
            <div className="space-y-3 text-sm text-white/80">
              <div className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">1.</span>
                <div>
                  <strong className="text-white">Contorno de Pecho:</strong> Colocá la cinta métrica alrededor de la parte más ancha del pecho,
                  pasando por debajo de las axilas. Mantené la cinta horizontal y ajustada pero sin apretar.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">2.</span>
                <div>
                  <strong className="text-white">Largo Total:</strong> Medí desde el punto más alto del hombro (junto al cuello)
                  hasta el dobladillo inferior de la camiseta.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-white font-bold shrink-0">3.</span>
                <div>
                  <strong className="text-white">Consejo:</strong> Para mayor precisión, medí sobre una camiseta que te quede bien
                  y compará con nuestra tabla.
                </div>
              </div>
            </div>
          </div>

          {/* Tips adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 border border-white/20 rounded-xl">
              <h4 className="text-white font-bold mb-2 text-sm flex items-center gap-2">
                <Check className="w-4 h-4" />
                Recomendaciones
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                <li>• Si estás entre dos tallas, elegí la más grande</li>
                <li>• Para ajuste más holgado, elegí una talla más</li>
                <li>• Las medidas pueden variar ±2cm</li>
              </ul>
            </div>

            <div className="p-4 bg-white/5 border border-white/20 rounded-xl">
              <h4 className="text-white font-bold mb-2 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Información del Producto
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                <li>• Material: 100% Poliéster Premium</li>
                <li>• Calce: Regular / Estándar</li>
                <li>• Calidad: Réplica Premium 1:1</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Enhanced Product Gallery with Swipe and Zoom
const ProductGallery = ({ images = [], productName }) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  // Embla Carousel for main gallery with loop
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    dragFree: false
  })

  // Embla Carousel for thumbnails
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi || !emblaThumbsApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaApi.selectedScrollSnap())
  }, [emblaApi, emblaThumbsApi])

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaApi || !emblaThumbsApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi, emblaThumbsApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square bg-white/5 rounded-lg flex items-center justify-center">
        <p className="text-white/40 text-sm md:text-base">Sin imágenes disponibles</p>
      </div>
    )
  }

  const handleImageClick = () => {
    setIsZoomed(!isZoomed)
  }

  return (
    <div className="space-y-2 md:space-y-4">
      {/* Main Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg md:rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 relative aspect-square bg-gradient-to-br from-gray-dark to-black"
              >
                <div
                  className="absolute inset-0 cursor-zoom-in"
                  onClick={handleImageClick}
                >
                  <OptimizedImage
                    src={image}
                    alt={`${productName} - Imagen ${index + 1}`}
                    fill
                    className="object-contain p-2 md:p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                    quality={90}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Desktop only */}
        {images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="hidden md:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-black/70 hover:bg-black/90 text-white rounded-full items-center justify-center transition-all backdrop-blur-sm z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="hidden md:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-black/70 hover:bg-black/90 text-white rounded-full items-center justify-center transition-all backdrop-blur-sm z-10"
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-xs md:text-sm font-bold">
            {selectedIndex + 1} / {images.length}
          </div>
        )}

        {/* Swipe Indicator - Mobile only */}
        <div className="md:hidden absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          Deslizá
        </div>
      </div>

      {/* Thumbnails Carousel */}
      {images.length > 1 && (
        <div className="overflow-hidden" ref={emblaThumbsRef}>
          <div className="flex gap-1.5 md:gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onThumbClick(index)}
                className={`flex-[0_0_auto] w-14 h-14 md:w-16 md:h-16 relative rounded-md md:rounded-xl overflow-hidden bg-white/5 transition-all duration-200 ${
                  selectedIndex === index
                    ? 'ring-2 ring-white scale-105 shadow-lg shadow-white/30'
                    : 'ring-1 md:ring-2 ring-transparent hover:ring-white/30 opacity-60 hover:opacity-100'
                }`}
              >
                <OptimizedImage
                  src={image}
                  alt={`${productName} - Miniatura ${index + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                  quality={60}
                />
                {selectedIndex === index && (
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 md:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Cerrar zoom"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
            <div className="relative w-full h-full max-w-6xl max-h-[90vh]">
              <OptimizedImage
                src={images[selectedIndex]}
                alt={`${productName} - Zoom`}
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ProductPageClient({ product }) {
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(null)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [activeTab, setActiveTab] = useState('envio') // Tab control for Información Importante

  const images = product.gallery || [product.image]
  const sizes = product.sizes || DEFAULT_SIZES
  const inWishlist = isInWishlist(product.id)

  console.log('🖼️ [ProductPageClient] Images:', images.length, 'imagens')
  console.log('🖼️ [ProductPageClient] Gallery:', product.gallery?.length || 0, 'imagens na gallery')

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona un tamaño')
      return
    }
    addToCart(product, selectedSize, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <>
      <Header />

      {/* Size Guide Modal */}
      <SizeGuideModal isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} />

      <main className="min-h-screen bg-black pt-20">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-2 md:py-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm md:text-base font-semibold"
          >
            <ArrowLeft size={18} />
            Volver a la tienda
          </Link>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 pb-8 md:pb-12 pt-2 md:pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Left Column - Gallery */}
            <div>
              <ProductGallery images={images} productName={product.name} />
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <h1 className="text-white font-black text-2xl md:text-4xl mb-2 uppercase tracking-wide leading-tight">
                  {product.name}
                </h1>
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 text-white/80 rounded-lg text-xs font-semibold uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <p className="text-3xl md:text-4xl font-black text-white">
                    ${product.price.toLocaleString('es-AR')}
                  </p>
                  {product.regularPrice && product.regularPrice > product.price && (
                    <>
                      <p className="text-lg md:text-xl text-gray-medium line-through">
                        ${product.regularPrice.toLocaleString('es-AR')}
                      </p>
                      <span className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-white/30">
                        -{Math.round(((product.regularPrice - product.price) / product.regularPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Size Selector with Guide */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-white font-bold text-sm uppercase tracking-wide">
                    Seleccioná tu talla
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="flex items-center gap-2 text-white hover:text-gray-light transition-colors text-sm font-bold"
                  >
                    <Ruler size={16} />
                    Guía de tallas
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`relative py-4 px-4 rounded-xl font-bold text-base transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-white text-black shadow-lg shadow-white/30 scale-105'
                          : 'bg-white/5 text-white hover:bg-white/10 hover:scale-105 border-2 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {size}
                      {selectedSize === size && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-black rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {selectedSize && (
                  <p className="text-white/60 text-sm flex items-center gap-2">
                    <Check className="w-4 h-4 text-white" />
                    Talla seleccionada: <span className="text-white font-bold">{selectedSize}</span>
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="block text-white font-bold text-sm uppercase tracking-wide">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                      quantity <= 1
                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                        : 'bg-white/10 text-white hover:bg-white hover:text-black hover:scale-110'
                    }`}
                  >
                    <Minus size={20} />
                  </button>
                  <div className="flex-1 max-w-[100px]">
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-full h-12 bg-white/5 text-white text-center font-bold rounded-xl border-2 border-white/10 focus:border-white/50 focus:outline-none text-lg"
                    />
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                      quantity >= 10
                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                        : 'bg-white/10 text-white hover:bg-white hover:text-black hover:scale-110'
                    }`}
                  >
                    <Plus size={20} />
                  </button>
                  <span className="text-white/60 text-xs">
                    Máx. 10
                  </span>
                </div>
              </div>

              {/* Action Buttons - Cart + Wishlist in same row */}
              <div className="flex gap-3">
                {/* Add to Cart Button - Stylized */}
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart || !selectedSize}
                  className={`flex-1 py-5 px-6 rounded-xl font-black text-base uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-3 ${
                    addedToCart
                      ? 'bg-white text-black'
                      : !selectedSize
                        ? 'bg-white/10 text-white/50 cursor-not-allowed border-2 border-white/10'
                        : 'bg-white text-black hover:bg-gray-light hover:shadow-xl hover:shadow-white/20 active:scale-95 hover:scale-105'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check size={22} />
                      <span>Agregado</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={22} />
                      <span>Agregar al Carrito</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={handleToggleWishlist}
                  className={`py-5 px-6 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                    inWishlist
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white hover:bg-white/20 border-2 border-white/10'
                  }`}
                  aria-label={inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  <Heart size={22} fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Black Friday Product Card */}
              <BlackFridayProductCard />

              {/* Reservation Countdown */}
              <ReservationCountdown />

              {/* Product Details Section */}
              <div className="py-6 border-t border-white/10">
                <h3 className="text-white font-black text-lg mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Package className="w-5 h-5 text-white" />
                  Detalles del Producto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Material</p>
                    <p className="text-white font-bold">100% Poliéster Premium</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Calidad</p>
                    <p className="text-white font-bold">Réplica Premium 1:1</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Origen</p>
                    <p className="text-white font-bold">Importado</p>
                  </div>
                </div>
              </div>

              {/* Product Features - Enhanced Grid */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h3 className="text-white font-black text-lg uppercase tracking-wide flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-white" />
                  Beneficios
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 bg-gradient-to-br from-white/5 to-white/0 p-4 rounded-xl border border-white/10">
                    <div className="p-2 bg-white rounded-lg shrink-0">
                      <Sparkles className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm mb-1">Calidad Premium</p>
                      <p className="text-white/60 text-xs">Materiales de alta calidad con acabado profesional</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-gradient-to-br from-white/5 to-white/0 p-4 rounded-xl border border-white/10">
                    <div className="p-2 bg-white rounded-lg shrink-0">
                      <Truck className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm mb-1">Envío Express</p>
                      <p className="text-white/60 text-xs">Recibí tu pedido en 3-5 días hábiles</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-gradient-to-br from-white/5 to-white/0 p-4 rounded-xl border border-white/10">
                    <div className="p-2 bg-white rounded-lg shrink-0">
                      <Shield className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm mb-1">Compra Segura</p>
                      <p className="text-white/60 text-xs">Protección total en todas tus transacciones</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-gradient-to-br from-white/5 to-white/0 p-4 rounded-xl border border-white/10">
                    <div className="p-2 bg-white rounded-lg shrink-0">
                      <RotateCcw className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm mb-1">Garantía de Satisfacción</p>
                      <p className="text-white/60 text-xs">Cambios y devoluciones sin complicaciones</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Especificaciones Técnicas - Full Width Section */}
        <div className="bg-gradient-to-b from-black via-gray-dark to-black py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-white font-black text-3xl md:text-4xl mb-3 uppercase tracking-wide text-center">
                Especificaciones Técnicas
              </h3>
              <p className="text-white/60 text-center mb-10 text-base">
                Conocé todos los detalles de tu jersey
              </p>

              {/* Tech Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {/* Material */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 bg-white rounded-lg group-hover:shadow-lg group-hover:shadow-white/20 transition-shadow"
                    >
                      <Shield className="w-5 h-5 text-black" />
                    </motion.div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Material</p>
                      <p className="text-white font-black">Poliéster Premium 100%</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs group-hover:text-white/80 transition-colors">Tela de alta calidad con doble tejido</p>
                </motion.div>

                {/* Tecnología */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 bg-white rounded-lg group-hover:shadow-lg group-hover:shadow-white/20 transition-shadow"
                    >
                      <Sparkles className="w-5 h-5 text-black" />
                    </motion.div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Tecnología</p>
                      <p className="text-white font-black">Dri-FIT</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs group-hover:text-white/80 transition-colors">Absorbe la transpiración y se seca rápidamente</p>
                </motion.div>

                {/* Ventilación */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 bg-white rounded-lg group-hover:shadow-lg group-hover:shadow-white/20 transition-shadow"
                    >
                      <Package className="w-5 h-5 text-black" />
                    </motion.div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Ventilación</p>
                      <p className="text-white font-black">Mesh Estratégico</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs group-hover:text-white/80 transition-colors">Paneles de malla en zonas de alto calor</p>
                </motion.div>

                {/* Ajuste */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 bg-white rounded-lg group-hover:shadow-lg group-hover:shadow-white/20 transition-shadow"
                    >
                      <Sparkles className="w-5 h-5 text-black" />
                    </motion.div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Ajuste</p>
                      <p className="text-white font-black">Stadium Fit</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs group-hover:text-white/80 transition-colors">Corte anatómico para máxima movilidad</p>
                </motion.div>

                {/* Calidad */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 bg-white rounded-lg group-hover:shadow-lg group-hover:shadow-white/20 transition-shadow"
                    >
                      <Check className="w-5 h-5 text-black" />
                    </motion.div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Calidad</p>
                      <p className="text-white font-black">Premium 1:1</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs group-hover:text-white/80 transition-colors">Réplica idéntica a la versión oficial</p>
                </motion.div>

                {/* Temporada */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 bg-white rounded-lg group-hover:shadow-lg group-hover:shadow-white/20 transition-shadow"
                    >
                      <Sparkles className="w-5 h-5 text-black" />
                    </motion.div>
                    <div>
                      <p className="text-white/60 text-xs uppercase tracking-wide">Temporada</p>
                      <p className="text-white font-black">Retro Clásica</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs group-hover:text-white/80 transition-colors">Diseño oficial de la temporada histórica</p>
                </motion.div>
              </div>

              {/* Características Premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 mb-6"
              >
                <h4 className="text-white font-black text-xl md:text-2xl mb-6 flex items-center gap-2 justify-center">
                  <Sparkles className="w-6 h-6" />
                  Características Premium
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-white rounded-full shrink-0"></div>
                    <span>Escudo del equipo bordado en alta definición</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-white rounded-full shrink-0"></div>
                    <span>Logo del fabricante con detalles premium</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-white rounded-full shrink-0"></div>
                    <span>Cuello ergonómico con tecnología anti-rozaduras</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-white rounded-full shrink-0"></div>
                    <span>Costuras reforzadas para mayor durabilidad</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-white rounded-full shrink-0"></div>
                    <span>Tecnología anti-olor y antibacterial</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80 hover:text-white transition-colors">
                    <div className="w-2 h-2 bg-white rounded-full shrink-0"></div>
                    <span>Colores que no se destiñen con el lavado</span>
                  </div>
                </div>
              </motion.div>

              {/* Garantía de Autenticidad */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-xl p-6 md:p-8"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Shield className="w-7 h-7 text-white" />
                  <h4 className="text-white font-black text-xl md:text-2xl uppercase">Garantía de Autenticidad</h4>
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <p className="text-white/80 text-center text-base leading-relaxed">
                  Todos nuestros jerseys son réplicas premium 1:1 con los mismos materiales y
                  tecnologías que las versiones oficiales. Garantizamos la máxima calidad en cada detalle.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Información Importante - Full Width Tabs Section */}
        <div className="bg-black py-12 md:py-16 border-t border-white/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-white font-black text-3xl md:text-4xl mb-8 uppercase tracking-wide text-center">
                Información Importante
              </h3>

              {/* Tabs Navigation */}
              <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mb-8">
                <button
                  onClick={() => setActiveTab('envio')}
                  className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === 'envio'
                      ? 'bg-white text-black shadow-lg shadow-white/20'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span>Envío y Entrega</span>
                </button>
                <button
                  onClick={() => setActiveTab('garantia')}
                  className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === 'garantia'
                      ? 'bg-white text-black shadow-lg shadow-white/20'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span>Garantía y Devoluciones</span>
                </button>
                <button
                  onClick={() => setActiveTab('cuidados')}
                  className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === 'cuidados'
                      ? 'bg-white text-black shadow-lg shadow-white/20'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Cuidados del Producto</span>
                </button>
              </div>

              {/* Tabs Content */}
              <AnimatePresence mode="wait">
                {activeTab === 'envio' && (
                  <motion.div
                    key="envio"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 md:p-10"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-white rounded-xl">
                        <Truck className="w-7 h-7 text-black" />
                      </div>
                      <h4 className="text-white font-black text-2xl md:text-3xl">Envío Gratis a Todo el País</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Entrega Rápida</p>
                          <p className="text-white/80 text-sm">3-5 días hábiles en todo Argentina</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Envío Gratis</p>
                          <p className="text-white/80 text-sm">En todas las compras sin mínimo</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Seguimiento</p>
                          <p className="text-white/80 text-sm">Código de rastreo en tiempo real</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Embalaje</p>
                          <p className="text-white/80 text-sm">Packaging premium con protección completa</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'garantia' && (
                  <motion.div
                    key="garantia"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 md:p-10"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-white rounded-xl">
                        <Shield className="w-7 h-7 text-black" />
                      </div>
                      <h4 className="text-white font-black text-2xl md:text-3xl">Garantía y Devoluciones</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Garantía de Satisfacción</p>
                          <p className="text-white/80 text-sm">30 días para cambios y devoluciones</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Cambio de Talla</p>
                          <p className="text-white/80 text-sm">Sin costo adicional si elegiste mal</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Devolución Fácil</p>
                          <p className="text-white/80 text-sm">Proceso simple y rápido</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Reembolso Completo</p>
                          <p className="text-white/80 text-sm">Si el producto tiene algún defecto</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'cuidados' && (
                  <motion.div
                    key="cuidados"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-6 md:p-10"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-white rounded-xl">
                        <Sparkles className="w-7 h-7 text-black" />
                      </div>
                      <h4 className="text-white font-black text-2xl md:text-3xl">Cuidados del Producto</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Lavado</p>
                          <p className="text-white/80 text-sm">Lavar con agua fría (máx 30°C) y colores similares</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Secado</p>
                          <p className="text-white/80 text-sm">No usar secadora, secar al aire libre</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Planchado</p>
                          <p className="text-white/80 text-sm">Planchar del revés a temperatura baja</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <Check className="w-6 h-6 text-white shrink-0 mt-0.5" />
                        <div>
                          <p className="text-white font-bold mb-1 text-base">Importante</p>
                          <p className="text-white/80 text-sm">No usar blanqueador ni suavizante</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Description Section */}
        <div className="container mx-auto px-4 pb-8 md:pb-12">
          {product.description && (
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-white font-black text-lg mb-3 uppercase tracking-wide">Descripción</h3>
              <p className="text-white/70 leading-relaxed">{product.description}</p>
            </div>
          )}
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
