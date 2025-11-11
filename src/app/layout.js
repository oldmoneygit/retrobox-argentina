import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'
import { SEO_DATA } from '@/utils/constants'
import ClientProviders from '@/components/ClientProviders'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import { Analytics } from '@vercel/analytics/next'
import StructuredData from '@/components/StructuredData'
import BlackFridayPopup from '@/components/blackfriday/BlackFridayPopup'
import MetaPixelScript from '@/components/MetaPixelScript'
import MetaPixel from '@/components/MetaPixel'
import ChatwootWidget from '@/components/ChatwootWidget'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'], // normal, medium, semibold, bold
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
  weight: '400',
  preload: true,
  fallback: ['Impact', 'Arial Black', 'sans-serif'],
  adjustFontFallback: true,
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
        {/* Theme Script - Apply dark mode by default before React hydrates - Minified */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var t=localStorage.getItem('retrobox-theme')||'dark';'dark'===t?document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark')}catch(e){document.documentElement.classList.add('dark')}}();`,
          }}
        />

        {/* Performance Optimization: Preconnect to critical external domains */}
        <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />

        {/* Defer non-critical connections */}
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Performance Optimization: Preload only CRITICAL above-the-fold images */}
        <link rel="preload" as="image" href="/images/logo/LOGO_BRANCO.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/images/hero/banner-hero-section.png" fetchPriority="high" />

        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>
      <body className="font-sans antialiased">
        {/* Structured Data - Organization */}
        <StructuredData type="organization" />

        {/* Meta Pixel Tracking */}
        <MetaPixelScript pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
        <MetaPixel />

        {/* Chatwoot Live Chat Widget */}
        <ChatwootWidget websiteToken={process.env.NEXT_PUBLIC_CHATWOOT_TOKEN} />

        {/* Fix auto-scroll bug - always start at top */}
        <ScrollToTop />
        <ClientProviders>
          {children}
          {/* Scroll to Top Button */}
          <ScrollToTopButton />
          {/* Black Friday Popup */}
          <BlackFridayPopup />
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}

