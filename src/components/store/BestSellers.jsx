'use client'

import { useState, useEffect } from 'react'
import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import OptimizedImage from '@/components/OptimizedImage'
import Link from 'next/link'
import SectionTitle from './SectionTitle'
import ProductCard from './ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getBestSellers } from '@/utils/products'

const BestSellers = () => {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    async function loadProducts() {
      const bestSellers = await getBestSellers(8)
      setProducts(bestSellers)
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
        '(min-width: 1024px)': { slidesToScroll: 3 }
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

  if (products.length === 0) return null

  return (
    <section className="relative py-20 bg-black overflow-hidden" id="bestsellers">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionTitle
          title="Los más vendidos"
          highlight="🔥"
          subtitle="Las camisetas retrô más populares de nuestra colección"
        />

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-[0_0_calc(50%-12px)] min-w-0 md:flex-[0_0_48%] lg:flex-[0_0_31%] xl:flex-[0_0_23%]"
                >
                  <ProductCard product={product} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full z-10 transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-4 rounded-full z-10 transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default BestSellers

