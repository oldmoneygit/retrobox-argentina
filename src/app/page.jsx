import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Header from '@/components/store/Header'
import StoreHero from '@/components/store/StoreHero'
import StoreFooter from '@/components/store/StoreFooter'
import StructuredData from '@/components/StructuredData'
import LazySection from '@/components/LazySection'

// Lazy load heavy components below the fold with aggressive optimization
// Priority 1: Above the fold or critical for SEO (SSR enabled)
const BestSellers = dynamic(() => import('@/components/store/BestSellers'), {
  loading: () => <div className="h-96 dark:bg-black bg-white" />,
  ssr: true,
})

// Priority 2: Important but below fold (SSR disabled for faster initial load)
const PromotionalBanner = dynamic(() => import('@/components/store/PromotionalBanner'), {
  loading: () => <div className="h-64 dark:bg-black bg-white" />,
  ssr: false,
})

const PackLocoPromo = dynamic(() => import('@/components/blackfriday/PackLocoPromo'), {
  loading: () => <div className="h-96 dark:bg-black bg-white" />,
  ssr: false,
})

const NuestrasColecciones = dynamic(() => import('@/components/store/NuestrasColecciones'), {
  loading: () => <div className="h-96 dark:bg-black bg-white" />,
  ssr: true, // Keep SSR for SEO (links to collections)
})

const TopSellersWeek = dynamic(() => import('@/components/store/TopSellersWeek'), {
  loading: () => <div className="h-96 dark:bg-black bg-white" />,
  ssr: true, // Keep SSR for SEO
})

// Priority 3: Lower priority components (SSR disabled, load on demand)
const HowItWorksPackLoco = dynamic(() => import('@/components/blackfriday/HowItWorksPackLoco'), {
  loading: () => null,
  ssr: false,
})

const PackLocoLiveSlots = dynamic(() => import('@/components/blackfriday/PackLocoLiveSlots'), {
  loading: () => null,
  ssr: false,
})

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

const MysteryBoxBlackFriday = dynamic(() => import('@/components/store/MysteryBoxBlackFriday'), {
  loading: () => null,
  ssr: false,
})

const CustomerFeedbacks = dynamic(() => import('@/components/store/CustomerFeedbacks'), {
  loading: () => null,
  ssr: false,
})

export const metadata = {
  title: 'Retrobox Argentina - Camisetas Retrô Exclusivas | Pack Black 4x59.900 Black Friday',
  description: 'Black Friday! Pack Black: 4 camisetas retrô por $59.900 con envío gratis. Solo 15 packs diarios. Boca Juniors, River Plate, Argentina y más.',
  keywords: 'camisetas retrô, pack black, black friday, camisetas fútbol, argentina, retrobox, camisetas vintage, fútbol argentino, boca juniors, river plate',
  openGraph: {
    title: 'Retrobox Argentina - Pack Black 4x59.900 Black Friday',
    description: '4 camisetas retrô por $59.900 con envío gratis. Solo 15 packs diarios.',
    images: ['/images/logo/LOGO_BRANCO.webp'],
    locale: 'es_AR',
    type: 'website',
    siteName: 'Retrobox Argentina',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retrobox Argentina - Pack Black 4x59.900',
    description: '4 camisetas retrô por $59.900 con envío gratis',
    images: ['/images/logo/LOGO_BRANCO.webp'],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://retrobox-argentina.vercel.app',
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

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData type="webSite" />
      <StructuredData type="organization" />

      <main className="min-h-screen dark:bg-black dark:text-white bg-white text-black transition-colors duration-300">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <StoreHero />

        {/* Aviso Importante - Instagram */}
        <section className="w-full py-6 md:py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Image
              src="/images/AVISO.png"
              alt="Aviso Importante - Nueva cuenta oficial de Instagram @retroboxargentina"
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-lg"
              priority={false}
              quality={90}
              loading="lazy"
            />
          </div>
        </section>

        {/* Los Más Vendidos */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <BestSellers />
        </Suspense>

        {/* Banner Promocional Black Friday */}
        <Suspense fallback={<div className="h-64 bg-black animate-pulse" />}>
          <PromotionalBanner />
        </Suspense>

        {/* Nuestras Colecciones: Ligas y Equipos */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <NuestrasColecciones />
        </Suspense>

        {/* Los Más Vendidos de esta Semana - Shopify Collection */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <TopSellersWeek />
        </Suspense>

        {/* Promoção Pack Black */}
        <div id="pack-black">
          <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
            <PackLocoPromo />
          </Suspense>
        </div>

        {/* Visualização em Tempo Real - Slots Disponíveis */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <PackLocoLiveSlots />
        </Suspense>

        {/* Colección Boca Juniors */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <TeamProductsSection
            teamName="Boca"
            title="BOCA JUNIORS"
            subtitle="Las camisetas más icónicas de La Bombonera"
            filterKey="name"
            logo="/images/collections/boca-juniors-logo.png"
            titleColor="text-[#ffed00]"
          />
        </Suspense>

        {/* Colección River Plate */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <TeamProductsSection
            teamName="River"
            title="RIVER PLATE"
            subtitle="La banda roja que conquistó América"
            filterKey="name"
            logo="/images/collections/river-plate-logo.png"
            titleColor="text-red-600"
          />
        </Suspense>

        {/* Colección Selección Argentina */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <TeamProductsSection
            teamName="Argentina"
            title="SELECCIÓN ARGENTINA"
            subtitle="La albiceleste campeona del mundo"
            filterKey="name"
            logo="/images/collections/argentina-logo.png"
            titleColor="text-[#75aadb]"
          />
        </Suspense>

        {/* Como Funciona o Pack Black - Lazy Load */}
        <LazySection rootMargin="400px" fallback={<div className="h-96 dark:bg-black bg-white" />}>
          <Suspense fallback={<div className="h-96 dark:bg-black bg-white animate-pulse" />}>
            <HowItWorksPackLoco />
          </Suspense>
        </LazySection>

        {/* Como Funciona (Geral) - Lazy Load */}
        <LazySection rootMargin="400px" fallback={<div className="h-96 dark:bg-black bg-white" />}>
          <Suspense fallback={<div className="h-96 dark:bg-black bg-white animate-pulse" />}>
            <HowItWorks />
          </Suspense>
        </LazySection>

        {/* Produtos Destacados - Lazy Load */}
        <LazySection rootMargin="400px" fallback={<div className="h-96 dark:bg-black bg-white" />}>
          <Suspense fallback={<div className="h-96 dark:bg-black bg-white animate-pulse" />}>
            <FeaturedProducts />
          </Suspense>
        </LazySection>

        {/* MysteryBox - Black Friday - Lazy Load */}
        <div id="mysterybox">
          <LazySection rootMargin="400px" fallback={<div className="h-96 dark:bg-black bg-white" />}>
            <Suspense fallback={<div className="h-96 dark:bg-black bg-white animate-pulse" />}>
              <MysteryBoxBlackFriday />
            </Suspense>
          </LazySection>
        </div>

        {/* Depoimentos de Clientes - Lazy Load quando próximo do viewport */}
        <LazySection rootMargin="500px" fallback={<div className="h-96 dark:bg-black bg-white" />}>
          <Suspense fallback={<div className="h-96 dark:bg-black bg-white animate-pulse" />}>
            <CustomerFeedbacks />
          </Suspense>
        </LazySection>

        {/* Footer */}
        <StoreFooter />
      </main>
    </>
  )
}
