/**
 * Utility functions for SEO optimization
 */

/**
 * Generate meta tags for a page
 */
export const generateMetaTags = (pageData) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://retrobox-argentina.vercel.app'
  
  return {
    title: pageData.title || 'Retrobox Argentina - Camisetas Retrô Exclusivas',
    description: pageData.description || 'Descubre las camisetas retrô más exclusivas',
    keywords: pageData.keywords || 'camisetas retrô, camisetas fútbol, argentina',
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      images: pageData.image ? [{ url: pageData.image }] : [],
      url: pageData.url || baseUrl,
      type: pageData.type || 'website',
      locale: 'es_AR',
      siteName: 'Retrobox Argentina',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      images: pageData.image ? [pageData.image] : [],
    },
    alternates: {
      canonical: pageData.url || baseUrl,
    },
  }
}

/**
 * Generate breadcrumb structured data
 */
export const generateBreadcrumbData = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

