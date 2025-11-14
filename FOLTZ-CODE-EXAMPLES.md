# 💻 Exemplos de Código - Migração Foltz

Este documento complementa o `FOLTZ-MIGRATION-GUIDE.md` com exemplos práticos de código.

---

## 📁 Estrutura de Arquivos Completa

```
foltz-fanwear/
├── src/
│   ├── app/
│   │   ├── page.jsx                    ← ARQUIVO PRINCIPAL
│   │   ├── layout.jsx
│   │   └── globals.css
│   ├── components/
│   │   ├── store/
│   │   │   ├── Header.jsx
│   │   │   ├── StoreHero.jsx
│   │   │   ├── BestSellers.jsx
│   │   │   ├── NuestrasColecciones.jsx
│   │   │   ├── TopSellersWeek.jsx
│   │   │   ├── TeamProductsSection.jsx
│   │   │   ├── HowItWorks.jsx
│   │   │   ├── FeaturedProducts.jsx
│   │   │   ├── CustomerFeedbacks.jsx
│   │   │   ├── StoreFooter.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── SectionTitle.jsx
│   │   ├── LazySection.jsx
│   │   ├── StructuredData.jsx
│   │   └── OptimizedImage.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── lib/
│   │   └── shopifyCheckout.js
│   └── utils/
│       ├── products.js
│       └── getVariantId.js
├── public/
│   └── images/
│       ├── hero/
│       ├── teams/
│       ├── collections/
│       └── logo/
└── .env.local
```

---

## 🎯 page.jsx Completo (Versão Foltz Simplificada)

```jsx
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/store/Header'
import StoreHero from '@/components/store/StoreHero'
import StoreFooter from '@/components/store/StoreFooter'
import StructuredData from '@/components/StructuredData'
import LazySection from '@/components/LazySection'

// ============================================
// DYNAMIC IMPORTS - PRIORITY 1 (SSR enabled)
// ============================================

const BestSellers = dynamic(() => import('@/components/store/BestSellers'), {
  loading: () => <div className="h-96 bg-white dark:bg-black animate-pulse" />,
  ssr: true,
})

const NuestrasColecciones = dynamic(() => import('@/components/store/NuestrasColecciones'), {
  loading: () => <div className="h-96 bg-white dark:bg-black animate-pulse" />,
  ssr: true,
})

const TopSellersWeek = dynamic(() => import('@/components/store/TopSellersWeek'), {
  loading: () => <div className="h-96 bg-white dark:bg-black animate-pulse" />,
  ssr: true,
})

// ============================================
// DYNAMIC IMPORTS - PRIORITY 3 (Lazy Load)
// ============================================

const TeamProductsSection = dynamic(() => import('@/components/store/TeamProductsSection'), {
  loading: () => null,
  ssr: false,
})

const HowItWorks = dynamic(() => import('@/components/store/HowItWorks'), {
  loading: () => null,
  ssr: false,
})

const FeaturedProducts = dynamic(() => import('@/components/store/FeaturedProducts'), {
  loading: () => null,
  ssr: false,
})

const CustomerFeedbacks = dynamic(() => import('@/components/store/CustomerFeedbacks'), {
  loading: () => null,
  ssr: false,
})

// ============================================
// METADATA
// ============================================

export const metadata = {
  title: 'Foltz Fanwear - Camisetas de Fútbol Originales y Retro | Envío Gratis',
  description: 'Las mejores camisetas de fútbol del mundo. Barcelona, Real Madrid, Manchester United, Bayern y más. Envío gratis en todos los pedidos.',
  keywords: 'camisetas fútbol, camisetas retro, barcelona, real madrid, manchester united, foltz, fanwear',
  openGraph: {
    title: 'Foltz Fanwear - Camisetas de Fútbol Originales',
    description: 'Las mejores camisetas de fútbol. Envío gratis.',
    images: ['/images/logo/foltz-logo.webp'],
    locale: 'es_AR',
    type: 'website',
    siteName: 'Foltz Fanwear',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foltz Fanwear - Camisetas de Fútbol',
    description: 'Las mejores camisetas de fútbol. Envío gratis.',
    images: ['/images/logo/foltz-logo.webp'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://foltz-fanwear.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// ============================================
// HOME PAGE COMPONENT
// ============================================

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData type="webSite" />
      <StructuredData type="organization" />

      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        {/* Header - Always visible */}
        <Header />

        {/* Hero Section - Above the fold */}
        <StoreHero />

        {/* Los Más Vendidos - Priority 1 */}
        <Suspense fallback={<div className="h-96 bg-white dark:bg-black animate-pulse" />}>
          <BestSellers />
        </Suspense>

        {/* Nuestras Colecciones - Priority 1 */}
        <Suspense fallback={<div className="h-96 bg-white dark:bg-black animate-pulse" />}>
          <NuestrasColecciones />
        </Suspense>

        {/* Los Más Vendidos de esta Semana - Shopify Collection */}
        <Suspense fallback={<div className="h-96 bg-white dark:bg-black animate-pulse" />}>
          <TopSellersWeek />
        </Suspense>

        {/* Coleção Barcelona - Lazy Load */}
        <LazySection rootMargin="400px" fallback={<div className="h-96" />}>
          <Suspense fallback={<div className="h-96 animate-pulse" />}>
            <TeamProductsSection
              teamName="Barcelona"
              title="FC BARCELONA"
              subtitle="La magia del Barça en cada camiseta"
              filterKey="name"
              logo="/images/teams/barcelona-logo.png"
              titleColor="text-[#a50044]"
            />
          </Suspense>
        </LazySection>

        {/* Coleção Real Madrid - Lazy Load */}
        <LazySection rootMargin="400px" fallback={<div className="h-96" />}>
          <Suspense fallback={<div className="h-96 animate-pulse" />}>
            <TeamProductsSection
              teamName="Real Madrid"
              title="REAL MADRID"
              subtitle="El equipo blanco que conquistó el mundo"
              filterKey="name"
              logo="/images/teams/real-madrid-logo.png"
              titleColor="text-white"
            />
          </Suspense>
        </LazySection>

        {/* Coleção Manchester United - Lazy Load */}
        <LazySection rootMargin="400px" fallback={<div className="h-96" />}>
          <Suspense fallback={<div className="h-96 animate-pulse" />}>
            <TeamProductsSection
              teamName="Manchester United"
              title="MANCHESTER UNITED"
              subtitle="Los Diablos Rojos de Old Trafford"
              filterKey="name"
              logo="/images/teams/manchester-united-logo.png"
              titleColor="text-red-600"
            />
          </Suspense>
        </LazySection>

        {/* Como Funciona - Lazy Load */}
        <LazySection rootMargin="400px" fallback={<div className="h-96" />}>
          <Suspense fallback={<div className="h-96 animate-pulse" />}>
            <HowItWorks />
          </Suspense>
        </LazySection>

        {/* Productos Destacados - Lazy Load */}
        <LazySection rootMargin="400px" fallback={<div className="h-96" />}>
          <Suspense fallback={<div className="h-96 animate-pulse" />}>
            <FeaturedProducts />
          </Suspense>
        </LazySection>

        {/* Depoimentos de Clientes - Lazy Load */}
        <LazySection rootMargin="500px" fallback={<div className="h-96" />}>
          <Suspense fallback={<div className="h-96 animate-pulse" />}>
            <CustomerFeedbacks />
          </Suspense>
        </LazySection>

        {/* Footer */}
        <StoreFooter />
      </main>
    </>
  )
}
```

---

## 🎨 NuestrasColecciones.jsx (Adaptado para Foltz)

```jsx
'use client'

import Link from 'next/link'
import OptimizedImage from '@/components/OptimizedImage'
import SectionTitle from './SectionTitle'
import { motion } from 'framer-motion'

const collections = [
  {
    id: 1,
    name: 'Premier League',
    slug: 'premier-league',
    image: '/images/collections/premier-league.webp',
    description: 'Las mejores camisetas de la Premier League',
  },
  {
    id: 2,
    name: 'La Liga',
    slug: 'la-liga',
    image: '/images/collections/la-liga.webp',
    description: 'Camisetas de La Liga española',
  },
  {
    id: 3,
    name: 'Serie A',
    slug: 'serie-a',
    image: '/images/collections/serie-a.webp',
    description: 'Lo mejor del calcio italiano',
  },
  {
    id: 4,
    name: 'Bundesliga',
    slug: 'bundesliga',
    image: '/images/collections/bundesliga.webp',
    description: 'Camisetas de la liga alemana',
  },
  {
    id: 5,
    name: 'Ligue 1',
    slug: 'ligue-1',
    image: '/images/collections/ligue-1.webp',
    description: 'Camisetas de la liga francesa',
  },
  {
    id: 6,
    name: 'Brasileirão',
    slug: 'brasileirao',
    image: '/images/collections/brasileirao.webp',
    description: 'Camisetas del fútbol brasileño',
  },
  {
    id: 7,
    name: 'Argentina',
    slug: 'argentina',
    image: '/images/collections/argentina.webp',
    description: 'Camisetas del fútbol argentino',
  },
  {
    id: 8,
    name: 'Selecciones',
    slug: 'selecciones',
    image: '/images/collections/selecciones.webp',
    description: 'Camisetas de selecciones nacionales',
  },
]

export default function NuestrasColecciones() {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <SectionTitle
          title="Nuestras Colecciones"
          highlight="⚽"
          subtitle="Explora camisetas de las mejores ligas del mundo"
        />

        {/* Collections Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/coleccion/${collection.slug}`}
                className="group block relative overflow-hidden rounded-xl border-2 border-black/10 dark:border-white/10 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:scale-105"
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-900">
                  <OptimizedImage
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-black text-lg md:text-xl uppercase">
                    {collection.name}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm mt-1">
                    {collection.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 📊 utils/products.js (Funções Necessárias)

```javascript
import productsData from '@/data/products.json'

/**
 * Get all products
 */
export async function getAllProducts() {
  return productsData
}

/**
 * Get best selling products
 * @param {number} limit - Number of products to return
 * @returns {Array} Best selling products
 */
export async function getBestSellers(limit = 18) {
  const products = await getAllProducts()

  // Filter out Mystery Boxes
  const filtered = products.filter(
    (product) => !product.slug?.startsWith('mystery-box')
  )

  // Sort by sales (you need to track this metric)
  // For now, we'll use a random sort or manual flagging
  const sorted = filtered.sort((a, b) => {
    // If you have sales data:
    // return (b.sales || 0) - (a.sales || 0)

    // Temporary: products with bestSeller flag first
    if (a.bestSeller && !b.bestSeller) return -1
    if (!a.bestSeller && b.bestSeller) return 1
    return 0
  })

  return sorted.slice(0, limit)
}

/**
 * Get products by team name
 * @param {string} teamName - Team name to filter
 * @param {number} limit - Max products to return
 * @returns {Array} Products from that team
 */
export async function getProductsByTeam(teamName, limit = 20) {
  const products = await getAllProducts()

  const filtered = products.filter((product) =>
    product.name?.toLowerCase().includes(teamName.toLowerCase())
  )

  return filtered.slice(0, limit)
}

/**
 * Get featured products
 * @param {number} limit - Number of products
 * @returns {Array} Featured products
 */
export async function getFeaturedProducts(limit = 12) {
  const products = await getAllProducts()

  const featured = products.filter((product) => product.featured === true)

  return featured.slice(0, limit)
}
```

---

## 🎭 HowItWorks.jsx (Adaptado para Foltz)

```jsx
'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, CreditCard, Truck, Star } from 'lucide-react'
import SectionTitle from './SectionTitle'

const steps = [
  {
    id: 1,
    icon: ShoppingCart,
    title: 'Elige tu camiseta',
    description: 'Explora nuestra colección de camisetas de los mejores equipos del mundo',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    id: 2,
    icon: CreditCard,
    title: 'Pago seguro',
    description: 'Compra con total seguridad. Aceptamos todos los medios de pago',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    id: 3,
    icon: Truck,
    title: 'Envío gratis',
    description: 'Recibe tu pedido en tu casa. Envío gratis en todos los pedidos',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    id: 4,
    icon: Star,
    title: 'Disfruta',
    description: 'Luce tu camiseta favorita con orgullo. ¡Calidad garantizada!',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <SectionTitle
          title="¿Cómo funciona?"
          highlight="💡"
          subtitle="Comprar en Foltz es fácil y seguro"
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Card */}
                <div className="bg-white dark:bg-black border-2 border-black/10 dark:border-white/10 rounded-xl p-6 text-center h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-black text-sm">
                      {step.id}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 mt-2`}>
                    <Icon className={`w-8 h-8 ${step.color}`} />
                  </div>

                  {/* Title */}
                  <h3 className="font-black text-lg md:text-xl mb-2 text-black dark:text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-black/70 dark:text-white/70 text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (except last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-orange-500/30" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

---

## 🛒 CustomerFeedbacks.jsx (Exemplo)

```jsx
'use client'

import { useState, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionTitle from './SectionTitle'

const feedbacks = [
  {
    id: 1,
    name: 'Juan Pérez',
    location: 'Buenos Aires, Argentina',
    rating: 5,
    comment: 'Excelente calidad! La camiseta llegó perfecta y el envío fue rápido. Totalmente recomendado.',
    product: 'Camiseta Barcelona 2023',
  },
  {
    id: 2,
    name: 'María González',
    location: 'Madrid, España',
    rating: 5,
    comment: 'Me encantó! La tela es de muy buena calidad y el ajuste perfecto. Compraré más.',
    product: 'Camiseta Real Madrid Retro',
  },
  {
    id: 3,
    name: 'Carlos Rodríguez',
    location: 'São Paulo, Brasil',
    rating: 5,
    comment: 'Increíble atención al cliente y producto de primera. Volveré a comprar sin dudas.',
    product: 'Camiseta Manchester United',
  },
  // Add more feedbacks...
]

export default function CustomerFeedbacks() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="py-12 md:py-16 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Lo que dicen nuestros clientes"
          highlight="❤️"
          subtitle="Más de 10.000 clientes satisfechos"
        />

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
                >
                  <div className="bg-gray-50 dark:bg-gray-900 border-2 border-black/10 dark:border-white/10 rounded-xl p-6 h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>

                    {/* Comment */}
                    <p className="text-black/80 dark:text-white/80 mb-4 italic">
                      "{feedback.comment}"
                    </p>

                    {/* Author */}
                    <div className="border-t border-black/10 dark:border-white/10 pt-4">
                      <p className="font-bold text-black dark:text-white">
                        {feedback.name}
                      </p>
                      <p className="text-sm text-black/60 dark:text-white/60">
                        {feedback.location}
                      </p>
                      <p className="text-xs text-orange-500 mt-1">
                        Compró: {feedback.product}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black border-2 border-black/10 dark:border-white/10 p-4 rounded-full transition-all hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/90 hover:bg-white dark:hover:bg-black border-2 border-black/10 dark:border-white/10 p-4 rounded-full transition-all hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  )
}
```

---

## ⚙️ .env.local (Configuração)

```bash
# Shopify Storefront API
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=foltz-fanwear.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here

# Site URL
NEXT_PUBLIC_SITE_URL=https://foltz-fanwear.com

# Meta Pixel (opcional)
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id_here

# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🎨 Cores da Foltz (Tailwind Config)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Cores principais Foltz
        'foltz-primary': '#FF5722',    // Laranja principal
        'foltz-secondary': '#2196F3',  // Azul secundário
        'foltz-accent': '#FFC107',     // Amarelo destaque
      },
    },
  },
}
```

Substituir `orange-500` por `foltz-primary` em todos os componentes.

---

## 🚀 Scripts package.json

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "shopify:fetch-variants": "node scripts/fetchShopifyVariants.mjs"
  }
}
```

---

## ✅ Checklist Rápido de Implementação

### Dia 1: Setup e Componentes Base
- [ ] Criar estrutura de pastas
- [ ] Instalar dependências (`embla-carousel-react`, `framer-motion`)
- [ ] Copiar `LazySection.jsx`, `StructuredData.jsx`
- [ ] Copiar `SectionTitle.jsx`, `ProductCard.jsx`
- [ ] Adaptar `Header.jsx` e `Footer.jsx`
- [ ] Criar `StoreHero.jsx` para Foltz

### Dia 2: Seções de Produtos
- [ ] Implementar `BestSellers.jsx`
- [ ] Implementar `NuestrasColecciones.jsx` (adaptar categorias)
- [ ] Implementar `TopSellersWeek.jsx`
- [ ] Criar coleção "Los más vendidos" no Shopify
- [ ] Implementar `TeamProductsSection.jsx`
- [ ] Implementar `FeaturedProducts.jsx`

### Dia 3: Seções Informativas e Finalização
- [ ] Implementar `HowItWorks.jsx`
- [ ] Implementar `CustomerFeedbacks.jsx`
- [ ] Configurar `page.jsx` completo
- [ ] Testar performance (Lighthouse)
- [ ] Testar responsividade
- [ ] Deploy teste

---

## 📝 Notas de Implementação

### Substituições de Texto Necessárias

```javascript
// Global find/replace
'Retrobox' → 'Foltz Fanwear'
'retrobox' → 'foltz'
'Camisetas Retrô' → 'Camisetas de Fútbol'
'Pack Black' → 'Combo Foltz' (se aplicável)
```

### Times para TeamProductsSection

**Ordem sugerida:**
1. Barcelona (mais popular)
2. Real Madrid (mais popular)
3. Manchester United
4. Bayern Munich (opcional)
5. PSG (opcional)

**Não usar mais de 3-4 para manter simplicidade.**

---

**Este documento deve ser usado em conjunto com FOLTZ-MIGRATION-GUIDE.md**

Boa implementação! 🚀
