import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/store/Header'
import StoreHero from '@/components/store/StoreHero'
import StoreFooter from '@/components/store/StoreFooter'
import StructuredData from '@/components/StructuredData'

// Lazy load heavy components below the fold
const BestSellers = dynamic(() => import('@/components/store/BestSellers'), {
  loading: () => <div className="h-96 dark:bg-black bg-white animate-pulse" />,
  ssr: true,
})

const PromotionalBanner = dynamic(() => import('@/components/store/PromotionalBanner'), {
  loading: () => <div className="h-64 dark:bg-black bg-white animate-pulse" />,
  ssr: true,
})

const PackLocoPromo = dynamic(() => import('@/components/blackfriday/PackLocoPromo'), {
  loading: () => <div className="h-96 dark:bg-black bg-white animate-pulse" />,
  ssr: true,
})

const HowItWorksPackLoco = dynamic(() => import('@/components/blackfriday/HowItWorksPackLoco'), {
  loading: () => <div className="h-96 dark:bg-black bg-white animate-pulse" />,
  ssr: true,
})

const PackLocoLiveSlots = dynamic(() => import('@/components/blackfriday/PackLocoLiveSlots'), {
  loading: () => <div className="h-96 dark:bg-black bg-white animate-pulse" />,
  ssr: true,
})

const NuestrasColecciones = dynamic(() => import('@/components/store/NuestrasColecciones'), {
  loading: () => <div className="h-96 dark:bg-black bg-white animate-pulse" />,
  ssr: true,
})

const TeamProductsSection = dynamic(() => import('@/components/store/TeamProductsSection'), {
  loading: () => <div className="h-96 dark:bg-black bg-white animate-pulse" />,
  ssr: true,
})

const HowItWorks = dynamic(() => import('@/components/store/HowItWorks'), {
  loading: () => <div className="h-96 dark:bg-black bg-white animate-pulse" />,
  ssr: true,
})

const FeaturedProducts = dynamic(() => import('@/components/store/FeaturedProducts'), {
  loading: () => <div className="h-96 dark:bg-black bg-white animate-pulse" />,
  ssr: true,
})

const MysteryBoxBlackFriday = dynamic(() => import('@/components/store/MysteryBoxBlackFriday'), {
  loading: () => <div className="h-96 dark:bg-black bg-white animate-pulse" />,
  ssr: true,
})

const CustomerFeedbacks = dynamic(() => import('@/components/store/CustomerFeedbacks'), {
  loading: () => <div className="h-96 dark:bg-black bg-white animate-pulse" />,
  ssr: true,
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

        {/* Como Funciona o Pack Black */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <HowItWorksPackLoco />
        </Suspense>

        {/* Como Funciona (Geral) */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <HowItWorks />
        </Suspense>

        {/* Produtos Destacados */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <FeaturedProducts />
        </Suspense>

        {/* MysteryBox - Black Friday */}
        <div id="mysterybox">
          <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
            <MysteryBoxBlackFriday />
          </Suspense>
        </div>

        {/* Depoimentos de Clientes */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <CustomerFeedbacks />
        </Suspense>

        {/* Footer */}
        <StoreFooter />
      </main>
    </>
  )
}
