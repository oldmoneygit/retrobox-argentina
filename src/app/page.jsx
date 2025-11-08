import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/store/Header'
import StoreHero from '@/components/store/StoreHero'
import StoreFooter from '@/components/store/StoreFooter'
import StructuredData from '@/components/StructuredData'

// Lazy load heavy components below the fold
const BestSellers = dynamic(() => import('@/components/store/BestSellers'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />,
  ssr: true,
})

const PackInsanoPromo = dynamic(() => import('@/components/blackfriday/PackInsanoPromo'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />,
  ssr: true,
})

const HowItWorksBlackFriday = dynamic(() => import('@/components/blackfriday/HowItWorksBlackFriday'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />,
  ssr: true,
})

const PackInsanoLiveSlots = dynamic(() => import('@/components/blackfriday/PackInsanoLiveSlots'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />,
  ssr: true,
})

const NuestrasColecciones = dynamic(() => import('@/components/store/NuestrasColecciones'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />,
  ssr: true,
})

const HowItWorks = dynamic(() => import('@/components/store/HowItWorks'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />,
  ssr: true,
})

const FeaturedProducts = dynamic(() => import('@/components/store/FeaturedProducts'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />,
  ssr: true,
})

const MysteryBox = dynamic(() => import('@/components/store/MysteryBox'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />,
  ssr: true,
})

const CustomerFeedbacks = dynamic(() => import('@/components/store/CustomerFeedbacks'), {
  loading: () => <div className="h-96 bg-black animate-pulse" />,
  ssr: true,
})

export const metadata = {
  title: 'Retrobox Argentina - Camisetas Retrô Exclusivas | Pack Insano 3x49.900',
  description: 'Descubre las camisetas retrô más exclusivas. Pack Insano: 3 camisetas por $49.900 con envío gratis. Solo 50 packs diarios. Boca Juniors, River Plate, Argentina y más.',
  keywords: 'camisetas retrô, pack insano, camisetas fútbol, argentina, retrobox, camisetas vintage, fútbol argentino, boca juniors, river plate',
  openGraph: {
    title: 'Retrobox Argentina - Pack Insano 3x49.900',
    description: '3 camisetas retrô por $49.900 con envío gratis. Solo 50 packs diarios.',
    images: ['/images/logo/LOGO_BRANCO.webp'],
    locale: 'es_AR',
    type: 'website',
    siteName: 'Retrobox Argentina',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retrobox Argentina - Pack Insano 3x49.900',
    description: '3 camisetas retrô por $49.900 con envío gratis',
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

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <StoreHero />

        {/* Los Más Vendidos */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <BestSellers />
        </Suspense>

        {/* Nuestras Colecciones: Ligas y Equipos */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <NuestrasColecciones />
        </Suspense>

        {/* Promoção Pack Insano */}
        <div id="pack-insano">
          <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
            <PackInsanoPromo />
          </Suspense>
        </div>

        {/* Como Funciona o Pack Insano */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <HowItWorksBlackFriday />
        </Suspense>

        {/* Visualização em Tempo Real - Slots Disponíveis */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <PackInsanoLiveSlots />
        </Suspense>

        {/* Como Funciona (Geral) */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <HowItWorks />
        </Suspense>

        {/* Produtos Destacados */}
        <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
          <FeaturedProducts />
        </Suspense>

        {/* MysteryBox - Caja Sorpresa */}
        <div id="mysterybox">
          <Suspense fallback={<div className="h-96 bg-black animate-pulse" />}>
            <MysteryBox />
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
