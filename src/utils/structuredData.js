/**
 * Structured Data (JSON-LD) for SEO
 * Helps search engines understand the content better
 */

export const generateStructuredData = (type, data) => {
  const baseStructuredData = {
    '@context': 'https://schema.org',
  }

  switch (type) {
    case 'organization':
      return {
        ...baseStructuredData,
        '@type': 'Organization',
        name: 'Retrobox Argentina',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://retrobox-argentina.vercel.app',
        logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retrobox-argentina.vercel.app'}/images/logo/LOGO_BRANCO.webp`,
        description: 'Tienda de camisetas retrô de fútbol argentino',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Buenos Aires',
          addressRegion: 'CABA',
          addressCountry: 'AR',
        },
        sameAs: [
          data?.instagram || 'https://instagram.com/retrobox',
        ],
      }

    case 'product':
      return {
        ...baseStructuredData,
        '@type': 'Product',
        name: data.name,
        image: data.image,
        description: data.description,
        offers: {
          '@type': 'Offer',
          price: data.price,
          priceCurrency: 'ARS',
          availability: data.stock === 'available' 
            ? 'https://schema.org/InStock' 
            : 'https://schema.org/OutOfStock',
        },
        brand: {
          '@type': 'Brand',
          name: 'Retrobox',
        },
      }

    case 'webSite':
      return {
        ...baseStructuredData,
        '@type': 'WebSite',
        name: 'Retrobox Argentina',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://retrobox-argentina.vercel.app',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://retrobox-argentina.vercel.app'}/buscar?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }

    case 'breadcrumb':
      return {
        ...baseStructuredData,
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }

    default:
      return baseStructuredData
  }
}

