'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import OptimizedImage from '@/components/OptimizedImage'
import { X, Minus, Plus, ShoppingCart, Heart, Ruler, Package, Truck, Shield } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import WishlistButton from '@/components/wishlist/WishlistButton'
import Link from 'next/link'
import { DEFAULT_SIZES } from '@/utils/constants'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [productImages, setProductImages] = useState([])
  const [isLoadingImages, setIsLoadingImages] = useState(false)
  const isSyncingRef = useRef(false)

  const {
    id,
    name,
    slug,
    price,
    regularPrice,
    image,
    gallery = [],
    description,
    stock = 'available',
    sizes = DEFAULT_SIZES,
  } = product

  const isWishlisted = isInWishlist(id)
  
  // Initialize refs after destructuring
  const initialGalleryRef = useRef(gallery && gallery.length > 0 ? gallery : [image])
  const initialImageRef = useRef(image)

  // Update refs when product changes
  useEffect(() => {
    initialGalleryRef.current = gallery && gallery.length > 0 ? gallery : [image]
    initialImageRef.current = image
  }, [gallery, image])

  // Load product gallery images when modal opens
  useEffect(() => {
    if (!isOpen) {
      // Reset to initial image when modal closes
      setProductImages(initialGalleryRef.current)
      return
    }

    if (!slug) return

    // If gallery is already loaded, use it
    if (initialGalleryRef.current.length > 1 || (initialGalleryRef.current.length === 1 && initialGalleryRef.current[0] !== initialImageRef.current)) {
      setProductImages(initialGalleryRef.current)
      setIsLoadingImages(false)
      return
    }

    // Otherwise, fetch from Shopify
    setIsLoadingImages(true)
    const loadProductImages = async () => {
      try {
        const { getProductByHandle } = await import('@/lib/shopifyAdmin')
        const shopifyProduct = await getProductByHandle(slug)

        if (shopifyProduct && shopifyProduct.images && shopifyProduct.images.edges.length > 0) {
          const galleryImages = shopifyProduct.images.edges.map(edge => edge.node.url)
          
          // Remove duplicates based on file hash
          const uniqueImages = []
          const seenHashes = new Set()

          for (const url of galleryImages) {
            const fileName = url.split('/').pop().split('?')[0]
            const fileHash = fileName.split('_')[0].split('.')[0]

            if (!seenHashes.has(fileHash)) {
              seenHashes.add(fileHash)
              uniqueImages.push(url)
            }
          }

          if (uniqueImages.length > 0) {
            setProductImages(uniqueImages)
          } else {
            setProductImages([initialImageRef.current])
          }
        } else {
          setProductImages([initialImageRef.current])
        }
      } catch (error) {
        console.error('Error loading product images:', error)
        setProductImages([initialImageRef.current])
      } finally {
        setIsLoadingImages(false)
      }
    }

    loadProductImages()
  }, [isOpen, slug])

  // Embla Carousel for main images
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    dragFree: false
  })

  // Embla Carousel for thumbnails
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: 'x'
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || !emblaThumbsApi) return
    
    const onSelect = () => {
      if (isSyncingRef.current) return
      const selected = emblaApi.selectedScrollSnap()
      setSelectedImageIndex(selected)
      
      // Sync thumbnails only if not already syncing
      if (!isSyncingRef.current && emblaThumbsApi.selectedScrollSnap() !== selected) {
        isSyncingRef.current = true
        emblaThumbsApi.scrollTo(selected)
        setTimeout(() => {
          isSyncingRef.current = false
        }, 150)
      }
    }
    
    const onThumbSelect = () => {
      if (isSyncingRef.current) return
      const selected = emblaThumbsApi.selectedScrollSnap()
      const mainSelected = emblaApi.selectedScrollSnap()
      if (mainSelected !== selected) {
        isSyncingRef.current = true
        setSelectedImageIndex(selected)
        emblaApi.scrollTo(selected)
        setTimeout(() => {
          isSyncingRef.current = false
        }, 150)
      }
    }
    
    emblaApi.on('select', onSelect)
    emblaThumbsApi.on('select', onThumbSelect)
    
    return () => {
      emblaApi.off('select', onSelect)
      emblaThumbsApi.off('select', onThumbSelect)
    }
  }, [emblaApi, emblaThumbsApi])

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaApi || isSyncingRef.current) return
      isSyncingRef.current = true
      emblaApi.scrollTo(index)
      setTimeout(() => {
        isSyncingRef.current = false
      }, 200)
    },
    [emblaApi]
  )

  // Reset state when modal opens/closes and reinit Embla
  useEffect(() => {
    if (isOpen) {
      setSelectedSize(null)
      setQuantity(1)
      setSelectedImageIndex(0)
    }
  }, [isOpen])

  // Reinit Embla when images are loaded or modal opens
  useEffect(() => {
    if (isOpen && productImages.length > 0 && !isLoadingImages && emblaApi && emblaThumbsApi) {
      isSyncingRef.current = true
      setTimeout(() => {
        if (emblaApi) {
          emblaApi.reInit()
          emblaApi.scrollTo(0)
        }
        if (emblaThumbsApi) {
          emblaThumbsApi.reInit()
          emblaThumbsApi.scrollTo(0)
        }
        setSelectedImageIndex(0)
        setTimeout(() => {
          isSyncingRef.current = false
        }, 200)
      }, 100)
    }
  }, [isOpen, productImages.length, isLoadingImages, emblaApi, emblaThumbsApi])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  // Only render portal on client side
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const originalPrice = regularPrice || Math.round(price * 1.5)
  const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100)

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Por favor, selecciona una talla')
      return
    }

    setIsAddingToCart(true)
    try {
      const cartItem = {
        id,
        name,
        slug,
        price,
        image,
        size: selectedSize,
        quantity,
        variantKey: `${id}::${selectedSize.toLowerCase()}`,
      }

      addToCart(cartItem)
      
      // Close modal after adding to cart
      setTimeout(() => {
        onClose()
        setIsAddingToCart(false)
      }, 500)
    } catch (error) {
      console.error('Error adding to cart:', error)
      setIsAddingToCart(false)
    }
  }

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 10))
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1))
  }

  if (!isOpen || !mounted) return null

  if (typeof window === 'undefined') return null

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 md:p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border-2 border-white/10 rounded-xl md:rounded-2xl w-full max-w-6xl max-h-[95vh] md:max-h-[90vh] overflow-hidden flex flex-col pointer-events-auto"
            >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
            <h2 className="text-lg md:text-2xl font-black text-white uppercase line-clamp-1 flex-1 pr-4">
              {name}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
              {/* Image Gallery */}
              <div className="space-y-3 md:space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-white/5 rounded-lg md:rounded-xl overflow-hidden">
                  {isLoadingImages ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-lg md:rounded-xl h-full" ref={emblaRef}>
                      <div className="flex h-full">
                        {productImages.length > 0 ? (
                          productImages.map((img, index) => (
                            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
                              {img ? (
                                <OptimizedImage
                                  src={img}
                                  alt={`${name} - Imagen ${index + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  fallback="/images/products/placeholder.jpg"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                                  <span className="text-white/40 text-sm">Sin imagen</span>
                                </div>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="relative flex-[0_0_100%] min-w-0 h-full">
                            <OptimizedImage
                              src={image}
                              alt={name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 50vw"
                              fallback="/images/products/placeholder.jpg"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Image Navigation */}
                  {!isLoadingImages && productImages.length > 1 && (
                    <>
                      <button
                        onClick={scrollPrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-2 rounded-full z-10 transition-all"
                        aria-label="Imagen anterior"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={scrollNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white p-2 rounded-full z-10 transition-all"
                        aria-label="Siguiente imagen"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Badges */}
                  <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
                    <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] md:text-xs font-black px-2 py-1 rounded shadow-lg uppercase">
                      🔥 BLACK NOV
                    </div>
                    <div className="bg-gradient-to-r from-white to-blue-100 text-black text-xs md:text-sm font-black px-2 py-1 rounded shadow-lg">
                      -{discountPercentage}%
                    </div>
                  </div>

                  {/* Wishlist Button */}
                  <div className="absolute top-2 right-2 z-10">
                    <WishlistButton product={product} size="sm" />
                  </div>
                </div>

                {/* Thumbnails with Swipe */}
                {!isLoadingImages && productImages.length > 1 && (
                  <div className="relative mt-3 md:mt-4">
                    <div className="overflow-hidden" ref={emblaThumbsRef}>
                      <div className="flex gap-2 touch-pan-x">
                        {productImages.map((img, index) => (
                          <div
                            key={index}
                            className="flex-[0_0_20%] min-w-0 md:flex-[0_0_16%]"
                          >
                            <button
                              onClick={() => onThumbClick(index)}
                              type="button"
                              className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                                selectedImageIndex === index
                                  ? 'border-white scale-105 shadow-lg shadow-white/20'
                                  : 'border-white/20 hover:border-white/40'
                              }`}
                            >
                              <div className="relative w-full h-full">
                                <OptimizedImage
                                  src={img}
                                  alt={`${name} - Thumbnail ${index + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 20vw, 16vw"
                                />
                              </div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-4 md:space-y-6">
                {/* Price */}
                <div className="space-y-1">
                  <p className="text-white/20 text-sm md:text-base line-through">
                    ${originalPrice.toLocaleString('es-AR')}
                  </p>
                  <p className="text-white font-black text-2xl md:text-3xl">
                    ${typeof price === 'number' ? price.toLocaleString('es-AR') : price}
                  </p>
                </div>

                {/* Promo Section - Discreet */}
                <div className="bg-gradient-to-r from-white/10 via-blue-100/5 to-white/10 border border-blue-200/20 rounded-lg p-3 md:p-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="p-1.5 md:p-2 bg-gradient-to-br from-white to-blue-100 rounded-lg shrink-0">
                      <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 text-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/90 text-xs md:text-sm font-bold uppercase">
                        🔥 Pack Black 4x$59.900
                      </p>
                      <p className="text-white/60 text-[10px] md:text-xs">
                        Agregá 4 camisetas y pagá solo $59.900
                      </p>
                    </div>
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-2 md:space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-white font-bold text-sm md:text-base uppercase">
                      Talla
                    </label>
                    <Link
                      href={`/product/${slug}`}
                      onClick={onClose}
                      className="text-white/60 hover:text-white text-xs md:text-sm underline"
                    >
                      Ver guía de tallas
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 md:py-3 rounded-lg font-bold text-sm md:text-base transition-all ${
                          selectedSize === size
                            ? 'bg-white text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-2 md:space-y-3">
                  <label className="text-white font-bold text-sm md:text-base uppercase block">
                    Cantidad
                  </label>
                  <div className="flex items-center gap-3 md:gap-4">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-white font-bold text-lg md:text-xl min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= 10}
                      className="p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 pt-2">
                  <div className="flex items-center gap-2 p-2 md:p-3 bg-white/5 rounded-lg">
                    <Package className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    <span className="text-white text-xs md:text-sm font-semibold">Envío Gratis</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 md:p-3 bg-white/5 rounded-lg">
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    <span className="text-white text-xs md:text-sm font-semibold">Garantía</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 md:p-3 bg-white/5 rounded-lg col-span-2 md:col-span-1">
                    <Truck className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    <span className="text-white text-xs md:text-sm font-semibold">Rápido</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                {stock === 'available' ? (
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedSize || isAddingToCart}
                    className="w-full bg-white text-black font-black uppercase py-3 md:py-4 rounded-lg hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Agregando...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        Agregar al Carrito
                      </>
                    )}
                  </button>
                ) : (
                  <div className="w-full bg-white/10 text-white font-bold uppercase py-3 md:py-4 rounded-lg text-center text-sm md:text-base">
                    Agotado
                  </div>
                )}

                {/* View Full Details Link */}
                <Link
                  href={`/product/${slug}`}
                  onClick={onClose}
                  className="block text-center text-white/60 hover:text-white text-sm md:text-base underline transition-colors"
                >
                  Ver página completa del producto
                </Link>
              </div>
            </div>
          </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

export default QuickViewModal

