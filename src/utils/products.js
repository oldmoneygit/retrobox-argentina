/**
 * Utilitário para carregar produtos do arquivo JSON
 */

import { getProductByHandle } from '@/lib/shopifyAdmin'

let productsCache = null
let productsByCollectionCache = null

export async function getAllProducts() {
  if (productsCache) {
    return productsCache
  }

  try {
    const productsData = await import('@/data/products.json')
    productsCache = Array.isArray(productsData.default) ? productsData.default : (Array.isArray(productsData) ? productsData : [])
    return productsCache
  } catch (error) {
    console.error('Error loading products:', error)
    return []
  }
}

export async function getProductBySlug(slug) {
  const products = await getAllProducts()
  const product = products.find(p => p.slug === slug)

  if (!product) return null

  console.log(`🔍 [getProductBySlug] Buscando imagens para: ${slug}`)

  // Buscar imagens adicionais do Shopify
  try {
    const shopifyProduct = await getProductByHandle(slug)

    console.log(`📦 [getProductBySlug] Shopify product:`, shopifyProduct ? 'Encontrado' : 'Não encontrado')

    if (shopifyProduct && shopifyProduct.images && shopifyProduct.images.edges.length > 0) {
      // Extrair URLs das imagens (array de strings)
      const galleryImages = shopifyProduct.images.edges.map(edge => edge.node.url)

      console.log(`📸 [getProductBySlug] Imagens encontradas: ${galleryImages.length}`)
      console.log(`📸 [getProductBySlug] Todas as URLs:`, galleryImages)

      // Remover duplicatas baseado no hash do arquivo (antes do underscore e extensão)
      const uniqueImages = []
      const seenHashes = new Set()

      for (const url of galleryImages) {
        // Extrair o nome do arquivo da URL
        const fileName = url.split('/').pop().split('?')[0]

        // Extrair o hash base (parte antes do primeiro underscore ou da extensão)
        // Ex: "d2f10c0122984574ffda04c430b5d981_abc123.jpg" -> "d2f10c0122984574ffda04c430b5d981"
        const fileHash = fileName.split('_')[0].split('.')[0]

        if (!seenHashes.has(fileHash)) {
          seenHashes.add(fileHash)
          uniqueImages.push(url)
        }
      }

      console.log(`✨ [getProductBySlug] Imagens únicas após filtrar: ${uniqueImages.length} (de ${galleryImages.length})`)

      // Adicionar array de imagens ao produto
      product.gallery = uniqueImages
    } else {
      console.log(`⚠️ [getProductBySlug] Nenhuma imagem na Shopify, usando fallback`)
      // Fallback: usar apenas a imagem principal
      product.gallery = [product.image]
    }
  } catch (error) {
    console.error(`❌ [getProductBySlug] Error fetching images from Shopify for "${slug}":`, error.message)
    // Fallback: usar apenas a imagem principal
    product.gallery = [product.image]
  }

  console.log(`✅ [getProductBySlug] Gallery final:`, product.gallery?.length || 0, 'imagens')

  return product
}

export async function getProductsByCollection(collection) {
  if (productsByCollectionCache) {
    return productsByCollectionCache[collection] || []
  }
  
  try {
    const collectionsData = await import('@/data/productsByCollection.json')
    productsByCollectionCache = collectionsData.default || collectionsData
    return productsByCollectionCache[collection] || []
  } catch (error) {
    console.error('Error loading products by collection:', error)
    return []
  }
}

export async function searchProducts(query) {
  const products = await getAllProducts()
  if (!query) return []
  
  const lowerQuery = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    product.description.toLowerCase().includes(lowerQuery)
  )
}

export async function getFeaturedProducts(limit = 8) {
  const products = await getAllProducts()
  // Retornar primeiros produtos (pode ser melhorado com lógica de featured)
  return products.slice(0, limit)
}

export async function getBestSellers(limit = 8) {
  const products = await getAllProducts()
  // Por enquanto retornar primeiros produtos (pode ser melhorado com dados reais de vendas)
  return products.slice(0, limit)
}

export function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price)
}

