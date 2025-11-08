import productosRetro from '@/data/productos-retro.json'

/**
 * Get all products from the retro catalog
 * Removes duplicates based on pasta_album (same folder = same product)
 */
export function getAllRetroProducts() {
  // Remove duplicatas baseado na pasta_album (produtos apontando para mesma pasta)
  const seen = new Map()
  const unique = []

  for (const product of productosRetro) {
    const key = `${product.pasta_liga}/${product.pasta_time}/${product.pasta_album}`
    if (!seen.has(key)) {
      seen.set(key, true)
      unique.push(product)
    }
  }

  return unique
}

/**
 * Get all unique leagues (ligas)
 */
export function getAllLeagues() {
  const leagues = [...new Set(productosRetro.map(p => p.liga))]
  return leagues.sort()
}

/**
 * Get league data with product count
 */
export function getLeaguesWithCount() {
  const leagues = getAllLeagues()
  return leagues.map(league => {
    const products = getProductsByLeague(league)
    const teams = getTeamsByLeague(league)
    return {
      name: league,
      slug: slugify(league),
      folderName: league, // Nome exato da pasta
      productCount: products.length,
      teamCount: teams.length
    }
  })
}

/**
 * Get all products from a specific league
 * Removes duplicates based on pasta_album (same folder = same product)
 */
export function getProductsByLeague(leagueName) {
  const filtered = productosRetro.filter(p => p.liga === leagueName)

  // Remove duplicatas baseado na pasta_album
  const seen = new Map()
  const unique = []

  for (const product of filtered) {
    const key = `${product.pasta_liga}/${product.pasta_time}/${product.pasta_album}`
    if (!seen.has(key)) {
      seen.set(key, true)
      unique.push(product)
    }
  }

  return unique
}

/**
 * Get all unique teams from a specific league
 */
export function getTeamsByLeague(leagueName) {
  const products = getProductsByLeague(leagueName)
  const teams = [...new Set(products.map(p => p.time))]
  return teams.sort().map(team => {
    const teamProducts = products.filter(p => p.time === team)
    return {
      name: team,
      slug: slugify(team),
      folderName: teamProducts[0]?.pasta_time || team,
      productCount: teamProducts.length,
      league: leagueName
    }
  })
}

/**
 * Get all products from a specific team
 * Removes duplicates based on pasta_album (same folder = same product)
 */
export function getProductsByTeam(teamName, leagueName = null) {
  let filtered = productosRetro.filter(p => p.time === teamName)
  if (leagueName) {
    filtered = filtered.filter(p => p.liga === leagueName)
  }

  // Remove duplicatas baseado na pasta_album (produtos apontando para mesma pasta)
  const seen = new Map()
  const unique = []

  for (const product of filtered) {
    const key = `${product.pasta_liga}/${product.pasta_time}/${product.pasta_album}`
    if (!seen.has(key)) {
      seen.set(key, true)
      unique.push(product)
    }
  }

  return unique
}

/**
 * Get a single product by ID
 */
export function getProductById(id) {
  return productosRetro.find(p => p.id === parseInt(id))
}

/**
 * Get product images from the file system structure
 * Returns array of image paths
 */
export function getProductImages(product) {
  const basePath = `/images/retro/${product.pasta_liga}/${product.pasta_time}/${product.pasta_album}`

  // MLS uses a different image pattern (mostly .webp)
  // Standard MLS pattern: 001.jpg, 002-006.webp, 007.jpg
  if (product.pasta_liga === 'MLS') {
    return [
      `${basePath}/001.jpg`,
      `${basePath}/002.webp`,
      `${basePath}/003.webp`,
      `${basePath}/004.webp`,
      `${basePath}/005.webp`,
      `${basePath}/006.webp`,
      `${basePath}/007.jpg`
    ]
  }

  // Most other leagues use .jpg format (001-007.jpg)
  return [
    `${basePath}/001.jpg`,
    `${basePath}/002.jpg`,
    `${basePath}/003.jpg`,
    `${basePath}/004.jpg`,
    `${basePath}/005.jpg`,
    `${basePath}/006.jpg`,
    `${basePath}/007.jpg`
  ]
}

/**
 * Get the main product image (first one)
 */
export function getProductMainImage(product) {
  const images = getProductImages(product)
  return images[0]
}

/**
 * Create URL-friendly slug from text
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
}

/**
 * Create URL-friendly slug that can be reversed
 * Used for dynamic routes
 */
export function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/ã/g, 'a')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ü/g, 'u')
    .replace(/ñ/g, 'n')
}

/**
 * Get product by slug (from URL)
 */
export function getProductBySlug(slug) {
  return productosRetro.find(p => {
    const productSlug = slugify(p.nome_completo)
    return productSlug === slug
  })
}

/**
 * Search products by name or team
 * Removes duplicates based on pasta_album (same folder = same product)
 */
export function searchProducts(query) {
  const lowerQuery = query.toLowerCase()
  const filtered = productosRetro.filter(p =>
    p.nome_completo.toLowerCase().includes(lowerQuery) ||
    p.time.toLowerCase().includes(lowerQuery) ||
    p.liga.toLowerCase().includes(lowerQuery)
  )

  // Remove duplicatas baseado na pasta_album
  const seen = new Map()
  const unique = []

  for (const product of filtered) {
    const key = `${product.pasta_liga}/${product.pasta_time}/${product.pasta_album}`
    if (!seen.has(key)) {
      seen.set(key, true)
      unique.push(product)
    }
  }

  return unique
}

/**
 * Get formatted price for display
 * Regular jerseys: 36.900 ARS
 * Long Sleeve jerseys: 41.900 ARS
 */
export function getProductPrice(product = null) {
  if (!product) {
    return 36900 // Default price for regular jerseys
  }

  // Check if product has Long Sleeve in extras
  const isLongSleeve = product.extras && product.extras.includes('Long Sleeve')
  return isLongSleeve ? 41900 : 36900
}

/**
 * Get compare at price (original price before discount)
 * Black November promotion - 50% discount simulation
 */
export function getCompareAtPrice(product = null) {
  const currentPrice = getProductPrice(product)
  // Original price is 50% more expensive (showing 50% off)
  return Math.round(currentPrice * 1.5)
}

/**
 * Format price for display
 */
export function formatPrice(price) {
  return price.toLocaleString('es-AR')
}

/**
 * Get related products (same team, different year/type)
 * Removes duplicates based on pasta_album (same folder = same product)
 */
export function getRelatedProducts(product, limit = 4) {
  const filtered = productosRetro.filter(p => p.time === product.time && p.id !== product.id)

  // Remove duplicatas baseado na pasta_album
  const seen = new Map()
  const unique = []

  for (const relatedProduct of filtered) {
    const key = `${relatedProduct.pasta_liga}/${relatedProduct.pasta_time}/${relatedProduct.pasta_album}`
    if (!seen.has(key) && unique.length < limit) {
      seen.set(key, true)
      unique.push(relatedProduct)
    }
  }

  return unique
}

/**
 * Get product display name with proper formatting
 */
export function getProductDisplayName(product) {
  let name = `${product.time} ${product.ano} ${product.tipo}`
  if (product.extras && product.extras.length > 0) {
    name += ` ${product.extras.join(' ')}`
  }
  return name
}

/**
 * Get available sizes for all products
 */
export function getAvailableSizes() {
  return ['S', 'M', 'L', 'XL', 'XXL', '3XL']
}

/**
 * Generate product variants for each size (for Shopify import)
 * Each variant includes size, SKU, and availability
 */
export function getProductVariants(product) {
  const sizes = getAvailableSizes()
  const basePrice = getProductPrice(product)
  const comparePrice = getCompareAtPrice(product)

  return sizes.map((size, index) => ({
    id: `${product.id}-${size}`,
    productId: product.id,
    size: size,
    sku: `${product.pasta_liga.substring(0, 3).toUpperCase()}-${product.pasta_time.substring(0, 3).toUpperCase()}-${product.id}-${size}`,
    barcode: `RB${String(product.id).padStart(6, '0')}${index}`,
    price: basePrice,
    compareAtPrice: comparePrice,
    weight: 250, // gramas
    weightUnit: 'g',
    inventoryQuantity: 999,
    inventoryManagement: 'shopify',
    fulfillmentService: 'manual',
    requiresShipping: true,
    taxable: true,
    available: true
  }))
}

/**
 * Get product with all variants (Shopify-ready format)
 */
export function getProductWithVariants(product) {
  const images = getProductImages(product)
  const variants = getProductVariants(product)
  const price = getProductPrice(product)

  return {
    // Basic Info
    id: product.id,
    title: product.nome_completo,
    handle: slugify(product.nome_completo),
    bodyHtml: `Camiseta retro ${product.tipo} del ${product.time}, temporada ${product.ano}. Réplica de alta calidad con tecnología Dri-FIT.`,
    vendor: 'Retrobox Argentina',
    productType: 'Camiseta Retro',

    // Tags
    tags: [
      product.liga,
      product.time,
      product.tipo,
      product.ano,
      'retro',
      'football',
      'jersey',
      ...product.extras
    ].join(', '),

    // Status
    published: true,
    status: 'active',

    // Images
    images: images.map((img, index) => ({
      position: index + 1,
      src: img,
      alt: `${product.nome_completo} - Imagen ${index + 1}`
    })),

    // Variants (one per size)
    variants: variants,

    // Options
    options: [
      {
        name: 'Talla',
        position: 1,
        values: getAvailableSizes()
      }
    ],

    // Metadata
    metafields: [
      {
        namespace: 'custom',
        key: 'team',
        value: product.time,
        type: 'single_line_text_field'
      },
      {
        namespace: 'custom',
        key: 'league',
        value: product.liga,
        type: 'single_line_text_field'
      },
      {
        namespace: 'custom',
        key: 'season',
        value: product.ano,
        type: 'single_line_text_field'
      },
      {
        namespace: 'custom',
        key: 'type',
        value: product.tipo,
        type: 'single_line_text_field'
      }
    ]
  }
}

/**
 * Export all products with variants in Shopify CSV format
 */
export function generateShopifyCSV() {
  const products = getAllRetroProducts()
  const csvRows = []

  // CSV Header
  csvRows.push([
    'Handle',
    'Title',
    'Body (HTML)',
    'Vendor',
    'Type',
    'Tags',
    'Published',
    'Option1 Name',
    'Option1 Value',
    'Variant SKU',
    'Variant Grams',
    'Variant Inventory Tracker',
    'Variant Inventory Qty',
    'Variant Inventory Policy',
    'Variant Fulfillment Service',
    'Variant Price',
    'Variant Compare At Price',
    'Variant Requires Shipping',
    'Variant Taxable',
    'Variant Barcode',
    'Image Src',
    'Image Position',
    'Image Alt Text',
    'Status'
  ].join(','))

  // Generate rows for each product and variant
  products.forEach(product => {
    const productData = getProductWithVariants(product)
    const sizes = getAvailableSizes()

    sizes.forEach((size, variantIndex) => {
      const variant = productData.variants[variantIndex]
      const isFirstVariant = variantIndex === 0

      // Add image rows for first variant
      if (isFirstVariant) {
        productData.images.forEach((image, imgIndex) => {
          const row = [
            productData.handle,
            isFirstVariant && imgIndex === 0 ? productData.title : '',
            isFirstVariant && imgIndex === 0 ? `"${productData.bodyHtml}"` : '',
            isFirstVariant && imgIndex === 0 ? productData.vendor : '',
            isFirstVariant && imgIndex === 0 ? productData.productType : '',
            isFirstVariant && imgIndex === 0 ? `"${productData.tags}"` : '',
            isFirstVariant && imgIndex === 0 ? 'TRUE' : '',
            imgIndex === 0 ? 'Talla' : '',
            imgIndex === 0 ? size : '',
            imgIndex === 0 ? variant.sku : '',
            imgIndex === 0 ? variant.weight : '',
            imgIndex === 0 ? variant.inventoryManagement : '',
            imgIndex === 0 ? variant.inventoryQuantity : '',
            imgIndex === 0 ? 'deny' : '',
            imgIndex === 0 ? variant.fulfillmentService : '',
            imgIndex === 0 ? variant.price : '',
            imgIndex === 0 ? variant.compareAtPrice : '',
            imgIndex === 0 ? 'TRUE' : '',
            imgIndex === 0 ? 'TRUE' : '',
            imgIndex === 0 ? variant.barcode : '',
            image.src,
            image.position,
            `"${image.alt}"`,
            isFirstVariant && imgIndex === 0 ? 'active' : ''
          ]
          csvRows.push(row.join(','))
        })
      } else {
        // Subsequent variants (no images)
        const row = [
          productData.handle,
          '',
          '',
          '',
          '',
          '',
          '',
          'Talla',
          size,
          variant.sku,
          variant.weight,
          variant.inventoryManagement,
          variant.inventoryQuantity,
          'deny',
          variant.fulfillmentService,
          variant.price,
          variant.compareAtPrice,
          'TRUE',
          'TRUE',
          variant.barcode,
          '',
          '',
          '',
          ''
        ]
        csvRows.push(row.join(','))
      }
    })
  })

  return csvRows.join('\n')
}
