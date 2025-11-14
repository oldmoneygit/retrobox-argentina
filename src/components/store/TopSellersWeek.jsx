'use client'

import { useState, useEffect } from 'react'
import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import SectionTitle from './SectionTitle'
import ProductCard from './ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getCollectionProducts } from '@/lib/shopifyCheckout'

const TopSellersWeek = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)

        // Buscar produtos da coleção "Los más vendidos de esta semana" do Shopify
        const collectionProducts = await getCollectionProducts('los-mas-vendidos-de-esta-semana', 20)

        // Filtrar Mystery Boxes e limitar a 15 produtos
        const filteredProducts = collectionProducts
          .filter(product => !product.slug.startsWith('mystery-box'))
          .slice(0, 15)

        setProducts(filteredProducts)
      } catch (error) {
        console.error('Error loading top sellers:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 4 },
        '(min-width: 1280px)': { slidesToScroll: 5 }
      }
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // Loading state
  if (loading) {
    return (
      <section className="relative py-8 md:py-10 dark:bg-black bg-white overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </section>
    )
  }

  // Don't render if no products
  if (products.length === 0) return null

  return (
    <section className="relative py-8 md:py-10 dark:bg-black bg-white overflow-hidden transition-colors duration-300" id="top-sellers-week">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionTitle
          title="¡Los más vendidos de esta semana!"
          highlight="⚡"
          subtitle="Los productos que están arrasando esta semana"
        />

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-[0_0_calc(50%-12px)] min-w-0 md:flex-[0_0_48%] lg:flex-[0_0_24%] xl:flex-[0_0_19%]"
                >
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20 bg-black/10 hover:bg-black/20 text-black border border-black/20 backdrop-blur-sm p-4 rounded-full z-10 transition-all duration-300 hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20 bg-black/10 hover:bg-black/20 text-black border border-black/20 backdrop-blur-sm p-4 rounded-full z-10 transition-all duration-300 hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Ver Todos Button */}
        <div className="flex justify-center mt-6 md:mt-8">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 dark:bg-white dark:hover:bg-white/90 dark:text-black dark:hover:shadow-white/50 bg-black hover:bg-black/90 text-white hover:shadow-black/50 font-black uppercase text-sm md:text-base rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Ver Todos Los Productos
            <ChevronRight size={20} className="md:hidden" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopSellersWeek
