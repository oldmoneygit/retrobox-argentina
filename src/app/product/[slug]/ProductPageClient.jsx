'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OptimizedImage from '@/components/OptimizedImage'
import { ChevronLeft, ChevronRight, Minus, Plus, ArrowLeft, ShoppingCart, Check, Heart, Ruler, X, Package, Truck, Shield, RotateCcw, Sparkles, Layers, Zap, Wind, Target, Award, Calendar, BadgeCheck } from 'lucide-react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import Link from 'next/link'
import BlackFridayProductCard from '@/components/blackfriday/BlackFridayProductCard'
import ReservationCountdown from '@/components/blackfriday/ReservationCountdown'
import CustomerFeedbacks from '@/components/store/CustomerFeedbacks'
import RelatedProducts from '@/components/product/RelatedProducts'
import { DEFAULT_SIZES } from '@/utils/constants'
import useEmblaCarousel from 'embla-carousel-react'
import AddToCartToast from '@/components/product/AddToCartToast'
import ProductCustomization from '@/components/product/ProductCustomization'

// Size Guide Modal Component
const SizeGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 dark:bg-black/95 bg-white/95 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="dark:bg-black dark:border-white/10 bg-white border-2 border-black/10 rounded-xl md:rounded-2xl p-4 md:p-8 max-w-3xl w-full max-h-[92vh] md:max-h-[90vh] overflow-y-auto transition-colors duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 bg-white rounded-lg">
                <Ruler className="w-4 h-4 md:w-5 md:h-5 text-black" />
              </div>
              <h2 className="text-lg md:text-3xl font-black dark:text-white text-black uppercase">Guía de Tallas</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 md:p-2 dark:hover:bg-white/10 hover:bg-black/10 rounded-lg transition-colors"
              aria-label="Cerrar guía"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 dark:text-white text-black" />
            </button>
          </div>

          {/* Nota importante */}
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white/5 border border-white/20 rounded-lg md:rounded-xl">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="p-1.5 md:p-2 bg-white rounded-lg shrink-0">
                <Check className="w-4 h-4 md:w-5 md:h-5 text-black" />
              </div>
              <div>
                <p className="dark:text-white text-black font-bold mb-1 text-xs md:text-base">¿No querés medir?</p>
                <p className="dark:text-white/80 text-black/80 text-xs md:text-sm leading-relaxed">
                  Podés elegir tu <strong className="dark:text-white text-black">talla habitual</strong> sin problemas.
                  Nuestras camisetas tienen un calce estándar y cómodo.
                </p>
              </div>
            </div>
          </div>

          {/* Size Chart Table */}
          <div className="mb-4 md:mb-6">
            <h3 className="dark:text-white text-black font-bold mb-2 md:mb-3 uppercase text-xs md:text-sm">Tabla de Medidas</h3>

            {/* Mobile: Cards Layout */}
            <div className="md:hidden space-y-2">
              {[
                { size: 'S', chest: '88-93 cm', length: '71 cm', equiv: 'Small' },
                { size: 'M', chest: '94-99 cm', length: '73 cm', equiv: 'Medium' },
                { size: 'L', chest: '100-105 cm', length: '75 cm', equiv: 'Large' },
                { size: 'XL', chest: '106-111 cm', length: '77 cm', equiv: 'Extra Large' },
                { size: 'XXL', chest: '112-117 cm', length: '79 cm', equiv: '2X Large' },
                { size: '3XL', chest: '118-123 cm', length: '81 cm', equiv: '3X Large' }
              ].map((item) => (
                <div key={item.size} className="dark:bg-white/5 dark:border-white/10 bg-black/5 border border-black/10 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="dark:text-white text-black font-bold text-lg">{item.size}</span>
                    <span className="dark:text-white/60 text-black/60 text-[10px] uppercase">{item.equiv}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="dark:text-white/60 text-black/60 text-[10px] uppercase block">Pecho</span>
                      <span className="dark:text-white/90 text-black/90">{item.chest}</span>
                    </div>
                    <div>
                      <span className="dark:text-white/60 text-black/60 text-[10px] uppercase block">Largo</span>
                      <span className="dark:text-white/90 text-black/90">{item.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Table Layout */}
            <div className="hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="dark:bg-white/10 bg-black/10">
                    <th className="px-4 py-3 text-left dark:text-white text-black font-bold uppercase text-sm dark:border-white/10 border border-black/10">
                      Talla
                    </th>
                    <th className="px-4 py-3 text-left text-white font-bold uppercase text-sm border border-white/10">
                      Pecho
                    </th>
                    <th className="px-4 py-3 text-left text-white font-bold uppercase text-sm border border-white/10">
                      Largo
                    </th>
                    <th className="px-4 py-3 text-left text-white font-bold uppercase text-sm border border-white/10">
                      Equivalencia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="dark:hover:bg-white/5 hover:bg-black/5 transition-colors">
                    <td className="px-4 py-3 dark:text-white text-black font-bold dark:border-white/10 border border-black/10">S</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">88-93 cm</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">71 cm</td>
                    <td className="px-4 py-3 dark:text-white/60 text-black/60 text-sm dark:border-white/10 border border-black/10">Small</td>
                  </tr>
                  <tr className="dark:hover:bg-white/5 hover:bg-black/5 transition-colors">
                    <td className="px-4 py-3 dark:text-white text-black font-bold dark:border-white/10 border border-black/10">M</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">94-99 cm</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">73 cm</td>
                    <td className="px-4 py-3 dark:text-white/60 text-black/60 text-sm dark:border-white/10 border border-black/10">Medium</td>
                  </tr>
                  <tr className="dark:hover:bg-white/5 hover:bg-black/5 transition-colors">
                    <td className="px-4 py-3 dark:text-white text-black font-bold dark:border-white/10 border border-black/10">L</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">100-105 cm</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">75 cm</td>
                    <td className="px-4 py-3 dark:text-white/60 text-black/60 text-sm dark:border-white/10 border border-black/10">Large</td>
                  </tr>
                  <tr className="dark:hover:bg-white/5 hover:bg-black/5 transition-colors">
                    <td className="px-4 py-3 dark:text-white text-black font-bold dark:border-white/10 border border-black/10">XL</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">106-111 cm</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">77 cm</td>
                    <td className="px-4 py-3 dark:text-white/60 text-black/60 text-sm dark:border-white/10 border border-black/10">Extra Large</td>
                  </tr>
                  <tr className="dark:hover:bg-white/5 hover:bg-black/5 transition-colors">
                    <td className="px-4 py-3 dark:text-white text-black font-bold dark:border-white/10 border border-black/10">XXL</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">112-117 cm</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">79 cm</td>
                    <td className="px-4 py-3 dark:text-white/60 text-black/60 text-sm dark:border-white/10 border border-black/10">2X Large</td>
                  </tr>
                  <tr className="dark:hover:bg-white/5 hover:bg-black/5 transition-colors">
                    <td className="px-4 py-3 dark:text-white text-black font-bold dark:border-white/10 border border-black/10">3XL</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">118-123 cm</td>
                    <td className="px-4 py-3 dark:text-white/80 text-black/80 dark:border-white/10 border border-black/10">81 cm</td>
                    <td className="px-4 py-3 dark:text-white/60 text-black/60 text-sm dark:border-white/10 border border-black/10">3X Large</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cómo medir */}
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white/5 border border-white/20 rounded-lg md:rounded-xl">
            <h3 className="text-white font-bold mb-2 md:mb-3 uppercase text-xs md:text-sm flex items-center gap-1.5 md:gap-2">
              <Ruler className="w-3.5 h-3.5 md:w-4 md:h-4" />
              Cómo Medir Correctamente
            </h3>
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-white/80">
              <div className="flex items-start gap-1.5 md:gap-2">
                <span className="text-white font-bold shrink-0 text-xs md:text-sm">1.</span>
                <div className="leading-relaxed">
                  <strong className="text-white">Contorno de Pecho:</strong> Colocá la cinta métrica alrededor de la parte más ancha del pecho,
                  pasando por debajo de las axilas. Mantené la cinta horizontal y ajustada pero sin apretar.
                </div>
              </div>
              <div className="flex items-start gap-1.5 md:gap-2">
                <span className="text-white font-bold shrink-0 text-xs md:text-sm">2.</span>
                <div className="leading-relaxed">
                  <strong className="text-white">Largo Total:</strong> Medí desde el punto más alto del hombro (junto al cuello)
                  hasta el dobladillo inferior de la camiseta.
                </div>
              </div>
              <div className="flex items-start gap-1.5 md:gap-2">
                <span className="text-white font-bold shrink-0 text-xs md:text-sm">3.</span>
                <div className="leading-relaxed">
                  <strong className="text-white">Consejo:</strong> Para mayor precisión, medí sobre una camiseta que te quede bien
                  y compará con nuestra tabla.
                </div>
              </div>
            </div>
          </div>

          {/* Tips adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="p-3 md:p-4 bg-white/5 border border-white/20 rounded-lg md:rounded-xl">
              <h4 className="text-white font-bold mb-1.5 md:mb-2 text-xs md:text-sm flex items-center gap-1.5 md:gap-2">
                <Check className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Recomendaciones
              </h4>
              <ul className="space-y-1.5 md:space-y-2 text-[11px] md:text-xs text-white/80 leading-relaxed">
                <li>• Si estás entre dos tallas, elegí la más grande</li>
                <li>• Para ajuste más holgado, elegí una talla más</li>
                <li>• Las medidas pueden variar ±2cm</li>
              </ul>
            </div>

            <div className="p-3 md:p-4 bg-white/5 border border-white/20 rounded-lg md:rounded-xl">
              <h4 className="text-white font-bold mb-1.5 md:mb-2 text-xs md:text-sm flex items-center gap-1.5 md:gap-2">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />
                Información del Producto
              </h4>
              <ul className="space-y-1.5 md:space-y-2 text-[11px] md:text-xs text-white/80 leading-relaxed">
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
      <div className="w-full aspect-square dark:bg-white/5 bg-black/5 rounded-lg flex items-center justify-center">
        <p className="dark:text-white/40 text-black/40 text-sm md:text-base">Sin imágenes disponibles</p>
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
        <div className="overflow-hidden rounded-2xl md:rounded-3xl" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 relative aspect-square"
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
              className="hidden md:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 dark:bg-black/70 dark:hover:bg-black/90 dark:text-white bg-white/70 hover:bg-white/90 text-black rounded-full items-center justify-center transition-all backdrop-blur-sm z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="hidden md:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 dark:bg-black/70 dark:hover:bg-black/90 dark:text-white bg-white/70 hover:bg-white/90 text-black rounded-full items-center justify-center transition-all backdrop-blur-sm z-10"
              aria-label="Imagen siguiente"
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 dark:bg-black/70 dark:text-white bg-white/70 text-black backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-xs md:text-sm font-bold">
            {selectedIndex + 1} / {images.length}
          </div>
        )}

        {/* Swipe Indicator - Mobile only */}
        <div className="md:hidden absolute bottom-2 left-2 dark:bg-black/70 dark:text-white bg-white/70 text-black backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1.5">
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
                className={`flex-[0_0_auto] w-14 h-14 md:w-16 md:h-16 relative rounded-md md:rounded-xl overflow-hidden dark:bg-white/5 bg-black/5 transition-all duration-200 ${
                  selectedIndex === index
                    ? 'dark:ring-2 dark:ring-white dark:shadow-white/30 ring-2 ring-black scale-105 shadow-lg shadow-black/30'
                    : 'ring-1 md:ring-2 ring-transparent dark:hover:ring-white/30 hover:ring-black/30 opacity-60 hover:opacity-100'
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
                  <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-white/20 dark:to-transparent bg-gradient-to-t from-black/20 to-transparent" />
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
            className="fixed inset-0 z-50 dark:bg-black/95 bg-white/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 md:p-3 dark:bg-white/10 dark:hover:bg-white/20 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
              aria-label="Cerrar zoom"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 dark:text-white text-black" />
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
  const [toastOpen, setToastOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('envio') // Tab control for Información Importante
  const [customization, setCustomization] = useState(null)

  const images = product.gallery || [product.image]
  // Handle Mystery Box sizes from mysteryBoxData
  const sizes = product.isMysteryBox
    ? product.mysteryBoxData?.sizes || DEFAULT_SIZES
    : product.sizes || DEFAULT_SIZES
  const inWishlist = isInWishlist(product.id)

  // Black November: Calculate original price (50% more expensive)
  const originalPrice = product.regularPrice || Math.round(product.price * 1.5)
  const discountPercentage = Math.round(((originalPrice - product.price) / originalPrice) * 100)

  console.log('🖼️ [ProductPageClient] Images:', images.length, 'imagens')
  console.log('🖼️ [ProductPageClient] Gallery:', product.gallery?.length || 0, 'imagens na gallery')

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona un tamaño')
      return
    }
    addToCart(product, selectedSize, quantity, customization)
    setAddedToCart(true)
    setToastOpen(true)
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

      <main className="min-h-screen dark:bg-black bg-white pt-14 md:pt-20 transition-colors duration-300">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-0 md:py-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 dark:text-white/60 dark:hover:text-white text-black/60 hover:text-black transition-colors text-sm md:text-base font-semibold"
          >
            <ArrowLeft size={18} />
            Volver a la tienda
          </Link>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 pb-8 md:pb-10 pt-0 md:pt-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-6 lg:gap-8">
            {/* Left Column - Gallery */}
            <div>
              <ProductGallery images={images} productName={product.name} />
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-3 md:space-y-4">
              {/* Product Name */}
              <div>
                <h1 className="dark:text-white text-black font-black text-xl md:text-3xl lg:text-4xl uppercase tracking-wide leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price - Black November */}
              <div className="dark:bg-gradient-to-r dark:from-white/5 dark:to-transparent dark:border-white/10 bg-gradient-to-r from-black/5 to-transparent border border-black/10 rounded-lg md:rounded-xl p-3 md:p-4">
                {/* Black November Badge */}
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] md:text-xs font-black px-2 py-1 md:px-3 md:py-1.5 rounded shadow-lg uppercase tracking-wide">
                    🔥 BLACK NOVEMBER
                  </span>
                  <span className="inline-flex items-center bg-gradient-to-r from-white to-blue-100 text-black text-[10px] md:text-xs font-black px-2 py-1 md:px-3 md:py-1.5 rounded shadow-lg">
                    -{discountPercentage}% OFF
                  </span>
                </div>

                {/* Prices */}
                <div className="space-y-1">
                  {/* Original Price (Always show for Black November) */}
                  <p className="text-sm md:text-base lg:text-lg dark:text-white/20 text-black/20 line-through">
                    ${originalPrice.toLocaleString('es-AR')}
                  </p>
                  {/* Promotional Price */}
                  <p className="text-2xl md:text-3xl lg:text-4xl font-black dark:text-white text-black">
                    ${product.price.toLocaleString('es-AR')}
                  </p>
                </div>
              </div>

              {/* Size Selector with Guide */}
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block dark:text-white text-black font-bold text-xs md:text-sm uppercase tracking-wide">
                    Seleccioná tu talla
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="flex items-center gap-1 dark:text-white dark:hover:text-gray-light text-black hover:text-gray-dark transition-colors text-xs md:text-sm font-bold"
                  >
                    <Ruler size={14} className="md:w-4 md:h-4" />
                    Guía de tallas
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`relative py-2 px-2 md:py-2.5 md:px-3 rounded-lg font-bold text-sm transition-all duration-200 ${
                        selectedSize === size
                          ? 'dark:bg-white dark:text-black dark:shadow-white/30 bg-black text-white shadow-lg shadow-black/30 scale-105'
                          : 'dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/30 bg-black/5 text-black hover:bg-black/10 hover:scale-105 border border-black/10 hover:border-black/30'
                      }`}
                    >
                      {size}
                      {selectedSize === size && (
                        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 dark:bg-black bg-white rounded-full flex items-center justify-center">
                          <Check className="w-2 h-2 dark:text-white text-black" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {selectedSize && (
                  <p className="dark:text-white/60 text-black/60 text-xs flex items-center gap-2">
                    <Check className="w-3 h-3 dark:text-white text-black" />
                    Talla seleccionada: <span className="dark:text-white text-black font-bold">{selectedSize}</span>
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="space-y-2 md:space-y-3">
                <label className="block dark:text-white text-black font-bold text-xs md:text-sm uppercase tracking-wide">
                  Cantidad
                </label>
                <div className="flex items-center gap-2 md:gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      quantity <= 1
                        ? 'dark:bg-white/5 dark:text-white/30 bg-black/5 text-black/30 cursor-not-allowed'
                        : 'dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black bg-black/10 text-black hover:bg-black hover:text-white hover:scale-110'
                    }`}
                  >
                    <Minus size={16} className="md:w-4 md:h-4" />
                  </button>
                  <div className="flex-1 max-w-[70px] md:max-w-[80px]">
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="w-full h-10 md:h-11 dark:bg-white/5 dark:text-white dark:border-white/10 dark:focus:border-white/50 bg-black/5 text-black text-center font-bold rounded-lg border-2 border-black/10 focus:border-black/50 focus:outline-none text-base md:text-lg"
                    />
                  </div>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      quantity >= 10
                        ? 'dark:bg-white/5 dark:text-white/30 bg-black/5 text-black/30 cursor-not-allowed'
                        : 'dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black bg-black/10 text-black hover:bg-black hover:text-white hover:scale-110'
                    }`}
                  >
                    <Plus size={16} className="md:w-4 md:h-4" />
                  </button>
                  <span className="dark:text-white/60 text-black/60 text-xs">
                    Máx. 10
                  </span>
                </div>
              </div>

              {/* Product Customization */}
              <ProductCustomization
                onCustomizationChange={setCustomization}
                customizationPrice={0}
              />

              {/* Action Buttons - Cart + Wishlist in same row */}
              <div className="flex gap-2 md:gap-3">
                {/* Add to Cart Button - Stylized */}
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart || !selectedSize}
                  className={`flex-1 py-3 px-4 md:py-4 md:px-5 rounded-lg md:rounded-xl font-black text-sm md:text-base uppercase tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                    addedToCart
                      ? 'dark:bg-white dark:text-black bg-black text-white'
                      : !selectedSize
                        ? 'dark:bg-white/10 dark:text-white/50 dark:border-white/10 bg-black/10 text-black/50 cursor-not-allowed border-2 border-black/10'
                        : 'dark:bg-white dark:text-black dark:hover:bg-gray-light dark:hover:shadow-white/20 bg-black text-white hover:bg-gray-dark hover:shadow-xl hover:shadow-black/20 active:scale-95 hover:scale-105'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check size={18} className="md:w-5 md:h-5" />
                      <span className="hidden sm:inline">Agregado</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} className="md:w-5 md:h-5" />
                      <span className="hidden sm:inline">Agregar al Carrito</span>
                      <span className="sm:hidden">Agregar</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={handleToggleWishlist}
                  className={`py-3 px-4 md:py-4 md:px-5 rounded-lg md:rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                    inWishlist
                      ? 'dark:bg-white dark:text-black bg-black text-white'
                      : 'dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:border-white/10 bg-black/10 text-black hover:bg-black/20 border-2 border-black/10'
                  }`}
                  aria-label={inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  <Heart size={18} className="md:w-5 md:h-5" fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Reservation Countdown - Above Black Friday */}
              <ReservationCountdown />

              {/* Customer Feedbacks Section - Below Reserva Activa */}
              <div className="mt-6 md:mt-8">
                <CustomerFeedbacks />
              </div>

              {/* Black Friday Product Card */}
              <BlackFridayProductCard />

              {/* Product Details Section */}
              <div className="py-6 dark:border-t dark:border-white/10 border-t border-black/10">
                <h3 className="dark:text-white text-black font-black text-lg mb-4 uppercase tracking-wide flex items-center gap-2">
                  <Package className="w-5 h-5 dark:text-white text-black" />
                  Detalles del Producto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="dark:bg-white/5 dark:border-white/10 bg-black/5 rounded-lg p-4 border border-black/10">
                    <p className="dark:text-white/60 text-black/60 text-xs uppercase tracking-wide mb-1">Material</p>
                    <p className="dark:text-white text-black font-bold">100% Poliéster Premium</p>
                  </div>
                  <div className="dark:bg-white/5 dark:border-white/10 bg-black/5 rounded-lg p-4 border border-black/10">
                    <p className="dark:text-white/60 text-black/60 text-xs uppercase tracking-wide mb-1">Calidad</p>
                    <p className="dark:text-white text-black font-bold">Réplica Premium 1:1</p>
                  </div>
                  <div className="dark:bg-white/5 dark:border-white/10 bg-black/5 rounded-lg p-4 border border-black/10">
                    <p className="dark:text-white/60 text-black/60 text-xs uppercase tracking-wide mb-1">Origen</p>
                    <p className="dark:text-white text-black font-bold">Importado</p>
                  </div>
                </div>
              </div>

              {/* Product Features - Enhanced Grid */}
              <div className="space-y-4 pt-6 dark:border-t dark:border-white/10 border-t border-black/10">
                <h3 className="dark:text-white text-black font-black text-lg uppercase tracking-wide flex items-center gap-2">
                  <Sparkles className="w-5 h-5 dark:text-white text-black" />
                  Beneficios
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border-white/10 bg-gradient-to-br from-black/5 to-black/0 p-4 rounded-xl border border-black/10">
                    <div className="p-2 dark:bg-white bg-black rounded-lg shrink-0">
                      <Sparkles className="w-5 h-5 dark:text-black text-white" />
                    </div>
                    <div>
                      <p className="dark:text-white text-black font-bold text-sm mb-1">Calidad Premium</p>
                      <p className="dark:text-white/60 text-black/60 text-xs">Materiales de alta calidad con acabado profesional</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border-white/10 bg-gradient-to-br from-black/5 to-black/0 p-4 rounded-xl border border-black/10">
                    <div className="p-2 dark:bg-white bg-black rounded-lg shrink-0">
                      <Truck className="w-5 h-5 dark:text-black text-white" />
                    </div>
                    <div>
                      <p className="dark:text-white text-black font-bold text-sm mb-1">Envío Express</p>
                      <p className="dark:text-white/60 text-black/60 text-xs">Recibí tu pedido en 3-5 días hábiles</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border-white/10 bg-gradient-to-br from-black/5 to-black/0 p-4 rounded-xl border border-black/10">
                    <div className="p-2 dark:bg-white bg-black rounded-lg shrink-0">
                      <Shield className="w-5 h-5 dark:text-black text-white" />
                    </div>
                    <div>
                      <p className="dark:text-white text-black font-bold text-sm mb-1">Compra Segura</p>
                      <p className="dark:text-white/60 text-black/60 text-xs">Protección total en todas tus transacciones</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 dark:bg-gradient-to-br dark:from-white/5 dark:to-white/0 dark:border-white/10 bg-gradient-to-br from-black/5 to-black/0 p-4 rounded-xl border border-black/10">
                    <div className="p-2 dark:bg-white bg-black rounded-lg shrink-0">
                      <RotateCcw className="w-5 h-5 dark:text-black text-white" />
                    </div>
                    <div>
                      <p className="dark:text-white text-black font-bold text-sm mb-1">Garantía de Satisfacción</p>
                      <p className="dark:text-white/60 text-black/60 text-xs">Cambios y devoluciones sin complicaciones</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Especificaciones Técnicas - Full Width Section */}
        <div className="dark:bg-gradient-to-b dark:from-black dark:via-gray-dark dark:to-black bg-gradient-to-b from-white via-gray-100 to-white py-12 md:py-16 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="dark:text-white text-black font-black text-3xl md:text-4xl mb-3 uppercase tracking-wide text-center">
                Especificaciones Técnicas
              </h3>
              <p className="dark:text-white/60 text-black/60 text-center mb-10 text-base">
                Conocé todos los detalles de tu jersey
              </p>

              {/* Tech Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {/* Material */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20 bg-black/5 border border-black/10 rounded-xl p-5 hover:bg-black/10 hover:border-black/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 dark:bg-white dark:group-hover:shadow-white/20 bg-black group-hover:shadow-lg group-hover:shadow-black/20 transition-shadow rounded-lg"
                    >
                      <Layers className="w-5 h-5 dark:text-black text-white" />
                    </motion.div>
                    <div>
                      <p className="dark:text-white/60 text-black/60 text-xs uppercase tracking-wide">Material</p>
                      <p className="dark:text-white text-black font-black">Poliéster Premium 100%</p>
                    </div>
                  </div>
                  <p className="dark:text-white/60 dark:group-hover:text-white/80 text-black/60 group-hover:text-black/80 text-xs transition-colors">Tela de alta calidad con doble tejido</p>
                </motion.div>

                {/* Tecnología */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20 bg-black/5 border border-black/10 rounded-xl p-5 hover:bg-black/10 hover:border-black/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 dark:bg-white dark:group-hover:shadow-white/20 bg-black group-hover:shadow-lg group-hover:shadow-black/20 transition-shadow rounded-lg"
                    >
                      <Zap className="w-5 h-5 dark:text-black text-white" />
                    </motion.div>
                    <div>
                      <p className="dark:text-white/60 text-black/60 text-xs uppercase tracking-wide">Tecnología</p>
                      <p className="dark:text-white text-black font-black">Dri-FIT</p>
                    </div>
                  </div>
                  <p className="dark:text-white/60 dark:group-hover:text-white/80 text-black/60 group-hover:text-black/80 text-xs transition-colors">Absorbe la transpiración y se seca rápidamente</p>
                </motion.div>

                {/* Ventilación */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20 bg-black/5 border border-black/10 rounded-xl p-5 hover:bg-black/10 hover:border-black/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 dark:bg-white dark:group-hover:shadow-white/20 bg-black group-hover:shadow-lg group-hover:shadow-black/20 transition-shadow rounded-lg"
                    >
                      <Wind className="w-5 h-5 dark:text-black text-white" />
                    </motion.div>
                    <div>
                      <p className="dark:text-white/60 text-black/60 text-xs uppercase tracking-wide">Ventilación</p>
                      <p className="dark:text-white text-black font-black">Mesh Estratégico</p>
                    </div>
                  </div>
                  <p className="dark:text-white/60 dark:group-hover:text-white/80 text-black/60 group-hover:text-black/80 text-xs transition-colors">Paneles de malla en zonas de alto calor</p>
                </motion.div>

                {/* Ajuste */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20 bg-black/5 border border-black/10 rounded-xl p-5 hover:bg-black/10 hover:border-black/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 dark:bg-white dark:group-hover:shadow-white/20 bg-black group-hover:shadow-lg group-hover:shadow-black/20 transition-shadow rounded-lg"
                    >
                      <Target className="w-5 h-5 dark:text-black text-white" />
                    </motion.div>
                    <div>
                      <p className="dark:text-white/60 text-black/60 text-xs uppercase tracking-wide">Ajuste</p>
                      <p className="dark:text-white text-black font-black">Stadium Fit</p>
                    </div>
                  </div>
                  <p className="dark:text-white/60 dark:group-hover:text-white/80 text-black/60 group-hover:text-black/80 text-xs transition-colors">Corte anatómico para máxima movilidad</p>
                </motion.div>

                {/* Calidad */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20 bg-black/5 border border-black/10 rounded-xl p-5 hover:bg-black/10 hover:border-black/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 dark:bg-white dark:group-hover:shadow-white/20 bg-black group-hover:shadow-lg group-hover:shadow-black/20 transition-shadow rounded-lg"
                    >
                      <Award className="w-5 h-5 dark:text-black text-white" />
                    </motion.div>
                    <div>
                      <p className="dark:text-white/60 text-black/60 text-xs uppercase tracking-wide">Calidad</p>
                      <p className="dark:text-white text-black font-black">Premium 1:1</p>
                    </div>
                  </div>
                  <p className="dark:text-white/60 dark:group-hover:text-white/80 text-black/60 group-hover:text-black/80 text-xs transition-colors">Réplica idéntica a la versión oficial</p>
                </motion.div>

                {/* Temporada */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20 bg-black/5 border border-black/10 rounded-xl p-5 hover:bg-black/10 hover:border-black/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2.5 dark:bg-white dark:group-hover:shadow-white/20 bg-black group-hover:shadow-lg group-hover:shadow-black/20 transition-shadow rounded-lg"
                    >
                      <Calendar className="w-5 h-5 dark:text-black text-white" />
                    </motion.div>
                    <div>
                      <p className="dark:text-white/60 text-black/60 text-xs uppercase tracking-wide">Temporada</p>
                      <p className="dark:text-white text-black font-black">Retro Clásica</p>
                    </div>
                  </div>
                  <p className="dark:text-white/60 dark:group-hover:text-white/80 text-black/60 group-hover:text-black/80 text-xs transition-colors">Diseño oficial de la temporada histórica</p>
                </motion.div>
              </div>

              {/* Características Premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="dark:bg-white/5 dark:border-white/10 bg-black/5 border border-black/10 rounded-xl p-6 md:p-8 mb-6"
              >
                <h4 className="dark:text-white text-black font-black text-xl md:text-2xl mb-6 flex items-center gap-2 justify-center">
                  <Sparkles className="w-6 h-6 dark:text-white text-black" />
                  Características Premium
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-sm dark:text-white/80 dark:hover:text-white text-black/80 hover:text-black transition-colors">
                    <div className="w-2 h-2 dark:bg-white bg-black rounded-full shrink-0"></div>
                    <span>Escudo del equipo bordado en alta definición</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm dark:text-white/80 dark:hover:text-white text-black/80 hover:text-black transition-colors">
                    <div className="w-2 h-2 dark:bg-white bg-black rounded-full shrink-0"></div>
                    <span>Logo del fabricante con detalles premium</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm dark:text-white/80 dark:hover:text-white text-black/80 hover:text-black transition-colors">
                    <div className="w-2 h-2 dark:bg-white bg-black rounded-full shrink-0"></div>
                    <span>Cuello ergonómico con tecnología anti-rozaduras</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm dark:text-white/80 dark:hover:text-white text-black/80 hover:text-black transition-colors">
                    <div className="w-2 h-2 dark:bg-white bg-black rounded-full shrink-0"></div>
                    <span>Costuras reforzadas para mayor durabilidad</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm dark:text-white/80 dark:hover:text-white text-black/80 hover:text-black transition-colors">
                    <div className="w-2 h-2 dark:bg-white bg-black rounded-full shrink-0"></div>
                    <span>Tecnología anti-olor y antibacterial</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm dark:text-white/80 dark:hover:text-white text-black/80 hover:text-black transition-colors">
                    <div className="w-2 h-2 dark:bg-white bg-black rounded-full shrink-0"></div>
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
                className="dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 dark:border-white/20 bg-gradient-to-br from-black/10 to-black/5 border-2 border-black/20 rounded-xl p-6 md:p-8"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Shield className="w-7 h-7 dark:text-white text-black" />
                  <h4 className="dark:text-white text-black font-black text-xl md:text-2xl uppercase">Garantía de Autenticidad</h4>
                  <Shield className="w-7 h-7 dark:text-white text-black" />
                </div>
                <p className="dark:text-white/80 text-black/80 text-center text-base leading-relaxed">
                  Todos nuestros jerseys son réplicas premium 1:1 con los mismos materiales y
                  tecnologías que las versiones oficiales. Garantizamos la máxima calidad en cada detalle.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Aviso Importante: Sin Costos Aduaneros */}
        <div className="dark:bg-gradient-to-br dark:from-green-900/30 dark:to-green-950/20 dark:border-green-500/30 bg-gradient-to-br from-green-50 to-green-100 border-t-4 border-green-500 py-8 md:py-12 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="dark:bg-green-500/10 dark:border-green-500/20 bg-white/80 border-2 border-green-500/30 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-sm">
                {/* Header with Icon */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  <BadgeCheck className="w-8 h-8 md:w-10 md:h-10 text-green-600 dark:text-green-400" />
                  <h3 className="text-green-800 dark:text-green-300 font-black text-2xl md:text-3xl uppercase tracking-wide text-center">
                    ¡Sin Costos Aduaneros!
                  </h3>
                  <BadgeCheck className="w-8 h-8 md:w-10 md:h-10 text-green-600 dark:text-green-400" />
                </div>

                {/* Main Message */}
                <div className="text-center mb-6">
                  <p className="text-green-900 dark:text-green-100 text-lg md:text-xl font-bold mb-3">
                    Nosotros nos hacemos cargo de TODOS los trámites aduaneros
                  </p>
                  <p className="text-green-800 dark:text-green-200 text-base md:text-lg leading-relaxed">
                    <strong className="font-black">Solo pagas el precio de la camiseta.</strong> Nos encargamos de{' '}
                    <span className="font-bold underline decoration-green-500">todos los impuestos, tributos y costos de importación</span>.{' '}
                    Sin sorpresas, sin costos adicionales al recibir tu pedido.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3 p-4 dark:bg-green-500/5 dark:border-green-500/20 bg-green-50 border border-green-200 rounded-xl">
                    <Check className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-900 dark:text-green-100 font-bold text-sm mb-1">Sin Impuestos</p>
                      <p className="text-green-800 dark:text-green-200 text-xs">Cubrimos todos los tributos aduaneros</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 dark:bg-green-500/5 dark:border-green-500/20 bg-green-50 border border-green-200 rounded-xl">
                    <Check className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-900 dark:text-green-100 font-bold text-sm mb-1">Sin Trámites</p>
                      <p className="text-green-800 dark:text-green-200 text-xs">Gestionamos todo el proceso de importación</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 dark:bg-green-500/5 dark:border-green-500/20 bg-green-50 border border-green-200 rounded-xl">
                    <Check className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-900 dark:text-green-100 font-bold text-sm mb-1">Sin Sorpresas</p>
                      <p className="text-green-800 dark:text-green-200 text-xs">El precio final es el que ves en el carrito</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Note */}
                <div className="mt-6 pt-6 border-t-2 border-green-500/30">
                  <p className="text-center text-green-800 dark:text-green-200 text-sm">
                    <strong className="font-black">100% Transparente:</strong> El precio que ves incluye{' '}
                    <span className="font-bold">TODO</span>. Recibís tu pedido sin ningún cargo extra en la puerta de tu casa.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Información Importante - Full Width Tabs Section */}
        <div className="dark:bg-black dark:border-white/10 bg-white py-12 md:py-16 border-t border-black/10 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="dark:text-white text-black font-black text-3xl md:text-4xl mb-8 uppercase tracking-wide text-center">
                Información Importante
              </h3>

              {/* Tabs Navigation */}
              <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 mb-8">
                <button
                  onClick={() => setActiveTab('envio')}
                  className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === 'envio'
                      ? 'dark:bg-white dark:text-black dark:shadow-white/20 bg-black text-white shadow-lg shadow-black/20'
                      : 'dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20 bg-black/5 text-black hover:bg-black/10 border border-black/10 hover:border-black/20'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span>Envío y Entrega</span>
                </button>
                <button
                  onClick={() => setActiveTab('garantia')}
                  className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === 'garantia'
                      ? 'dark:bg-white dark:text-black dark:shadow-white/20 bg-gray-600 text-white shadow-lg shadow-gray-600/20'
                      : 'dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span>Garantía y Devoluciones</span>
                </button>
                <button
                  onClick={() => setActiveTab('cuidados')}
                  className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                    activeTab === 'cuidados'
                      ? 'dark:bg-white dark:text-black dark:shadow-white/20 bg-gray-600 text-white shadow-lg shadow-gray-600/20'
                      : 'dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 hover:border-gray-400'
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
                    className="dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent dark:border-white/10 bg-gradient-to-br from-black/5 to-transparent border border-black/10 rounded-2xl p-6 md:p-10"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 dark:bg-white bg-black rounded-xl">
                        <Truck className="w-7 h-7 dark:text-black text-white" />
                      </div>
                      <h4 className="dark:text-white text-black font-black text-2xl md:text-3xl">Envío Gratis a Todo el País</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Entrega Rápida</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">3-5 días hábiles en todo Argentina</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Envío Gratis</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">En todas las compras sin mínimo</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Seguimiento</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">Código de rastreo en tiempo real</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Embalaje</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">Packaging premium con protección completa</p>
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
                    className="dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent dark:border-white/10 bg-gradient-to-br from-black/5 to-transparent border border-black/10 rounded-2xl p-6 md:p-10"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 dark:bg-white bg-black rounded-xl">
                        <Shield className="w-7 h-7 dark:text-black text-white" />
                      </div>
                      <h4 className="dark:text-white text-black font-black text-2xl md:text-3xl">Garantía y Devoluciones</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Garantía de Satisfacción</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">30 días para cambios y devoluciones</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Cambio de Talla</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">Sin costo adicional si elegiste mal</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Devolución Fácil</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">Proceso simple y rápido</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Reembolso Completo</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">Si el producto tiene algún defecto</p>
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
                    className="dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent dark:border-white/10 bg-gradient-to-br from-black/5 to-transparent border border-black/10 rounded-2xl p-6 md:p-10"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 dark:bg-white bg-black rounded-xl">
                        <Sparkles className="w-7 h-7 dark:text-black text-white" />
                      </div>
                      <h4 className="dark:text-white text-black font-black text-2xl md:text-3xl">Cuidados del Producto</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Lavado</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">Lavar con agua fría (máx 30°C) y colores similares</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Secado</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">No usar secadora, secar al aire libre</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Planchado</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">Planchar del revés a temperatura baja</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 rounded-xl hover:bg-black/10 transition-colors">
                        <Check className="w-6 h-6 dark:text-white text-black shrink-0 mt-0.5" />
                        <div>
                          <p className="dark:text-white text-black font-bold mb-1 text-base">Importante</p>
                          <p className="dark:text-white/80 text-black/80 text-sm">No usar blanqueador ni suavizante</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Description Section - Hidden */}
        {/* <div className="container mx-auto px-4 pb-8 md:pb-12">
          {product.description && (
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-white font-black text-lg mb-3 uppercase tracking-wide">Descripción</h3>
              <p className="text-white/70 leading-relaxed">{product.description}</p>
            </div>
          )}
        </div> */}

        {/* Related Products Section */}
        <RelatedProducts currentProduct={product} limit={4} />
      </main>

      {/* Add to Cart Toast Notification */}
      <AddToCartToast
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        product={product}
        size={selectedSize}
        quantity={quantity}
      />

      <StoreFooter />
    </>
  )
}
