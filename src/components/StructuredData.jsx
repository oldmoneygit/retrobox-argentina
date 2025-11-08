import { generateStructuredData } from '@/utils/structuredData'

/**
 * StructuredData Component
 * Adds JSON-LD structured data to pages for better SEO
 * Works in both Server and Client components
 */
export default function StructuredData({ type, data }) {
  const structuredData = generateStructuredData(type, data)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

