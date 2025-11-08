import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'
import { SEO_DATA } from '@/utils/constants'
import ClientProviders from '@/components/ClientProviders'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { Analytics } from '@vercel/analytics/next'
import StructuredData from '@/components/StructuredData'
import BlackFridayPopup from '@/components/blackfriday/BlackFridayPopup'
import LiveSlotsIndicator from '@/components/store/LiveSlotsIndicator'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'], // normal, medium, semibold, bold
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
  weight: '400',
})

export const metadata = {
  metadataBase: new URL(SEO_DATA.url),
  title: SEO_DATA.title,
  description: SEO_DATA.description,
  keywords: SEO_DATA.keywords,
  authors: [{ name: 'Retrobox Argentina' }],
  creator: 'Retrobox Argentina',
  publisher: 'Retrobox Argentina',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SEO_DATA.url,
    title: SEO_DATA.title,
    description: SEO_DATA.description,
    siteName: 'Retrobox Argentina',
    images: [
      {
        url: SEO_DATA.ogImage,
        width: 1200,
        height: 630,
        alt: 'Retrobox Argentina - Camisetas Retrô',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_DATA.title,
    description: SEO_DATA.description,
    images: [SEO_DATA.ogImage],
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
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${bebasNeue.variable}`}>
      <head>
        <link rel="canonical" href={SEO_DATA.url} />

        {/* Performance Optimization: Preconnect to external domains */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />

        {/* Performance Optimization: Preload critical resources */}
        <link rel="preload" as="image" href={SEO_DATA.ogImage} />
        <link rel="preload" as="image" href="/images/logo/LOGO_BRANCO.webp" />

        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Performance Hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className="font-sans antialiased">
        {/* Structured Data - Organization */}
        <StructuredData type="organization" />
        
        {/* Fix auto-scroll bug - always start at top */}
        <ScrollToTop />
        <ClientProviders>
          {children}
          {/* Scroll to Top Button */}
          <ScrollToTopButton />
          {/* Black Friday Popup */}
          <BlackFridayPopup />
          {/* Live Slots Indicator */}
          <LiveSlotsIndicator />
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}

