/**
 * Get Shopify Variant ID Utility
 *
 * Utilitário para buscar Shopify Variant IDs a partir do mapeamento gerado
 *
 * O mapeamento é gerado pelo script: npm run shopify:fetch-variants
 * Arquivo: shopify-variant-mapping.json
 */

// IMPORTANTE: Este import só funcionará APÓS gerar o mapeamento
// Execute: npm run shopify:fetch-variants
let variantMapping = {}

try {
  // Tentar importar o mapeamento (pode não existir ainda)
  variantMapping = require('../../shopify-variant-mapping.json')
} catch (error) {
  console.warn('⚠️  Shopify variant mapping not found. Run: npm run shopify:fetch-variants')
  console.warn('   Checkout will not work until variant mapping is generated.')
}

/**
 * Gerar handle a partir do nome completo do produto
 * (mesmo método usado no script de geração de CSV)
 *
 * @param {string} nomeCompleto - Nome completo do produto
 * @returns {string} - Handle único (slug)
 *
 * @example
 * generateHandle("Inter Miami 25/26 Retro Away")
 * // => "inter-miami-25-26-retro-away"
 */
export function generateHandle(nomeCompleto) {
  return nomeCompleto
    .toLowerCase()
    .replace(/\//g, '-')  // / -> -
    .replace(/\s+/g, '-')  // espaços -> -
    .replace(/\((\d+)\)/g, '-$1')  // (2) -> -2
    .replace(/[^\w\s-]/g, '')  // remover caracteres especiais
    .replace(/-+/g, '-')  // múltiplos - -> um -
    .replace(/^-|-$/g, '')  // remover - do início/fim
}

/**
 * Buscar Shopify Variant ID a partir de handle e tamanho
 *
 * @param {string} handle - Handle único do produto (slug)
 * @param {string} size - Tamanho (S, M, L, XL, XXL)
 * @returns {string|null} - Shopify Variant ID ou null se não encontrado
 *
 * @example
 * const variantId = getVariantId('ac-milan-02-03-retro-home', 'M')
 * // => "gid://shopify/ProductVariant/1234567890"
 */
export function getVariantId(handle, size) {
  // Verificar se o mapeamento existe
  if (!variantMapping || Object.keys(variantMapping).length === 0) {
    console.error('❌ Variant mapping not loaded. Run: npm run shopify:fetch-variants')
    return null
  }

  const product = variantMapping[handle]

  if (!product) {
    console.error(`❌ Product not found in mapping: ${handle}`)
    console.error('   Make sure the product was imported to Shopify')
    console.error('   Run: npm run shopify:fetch-variants to update mapping')
    return null
  }

  const variant = product.variants[size]

  if (!variant) {
    console.error(`❌ Size not available: ${size} for ${handle}`)
    console.error(`   Available sizes: ${Object.keys(product.variants).join(', ')}`)
    return null
  }

  return variant.shopifyVariantId
}

/**
 * Buscar informações completas da variante
 *
 * @param {string} handle - Handle do produto
 * @param {string} size - Tamanho
 * @returns {Object|null} - Informações completas da variante
 *
 * @example
 * const info = getVariantInfo('ac-milan-02-03-retro-home', 'M')
 * // => {
 * //   shopifyVariantId: "gid://shopify/ProductVariant/123",
 * //   sku: "ac-milan-02-03-retro-home-M",
 * //   price: "369.00",
 * //   compareAtPrice: "553.50",
 * //   currency: "ARS",
 * //   availableForSale: true,
 * //   quantityAvailable: 100,
 * //   productTitle: "AC Milan 02/03 Retro Home",
 * //   productHandle: "ac-milan-02-03-retro-home"
 * // }
 */
export function getVariantInfo(handle, size) {
  const product = variantMapping[handle]
  if (!product) return null

  const variant = product.variants[size]
  if (!variant) return null

  return {
    ...variant,
    productTitle: product.title,
    productHandle: product.handle,
    productType: product.productType,
  }
}

/**
 * Buscar todos os tamanhos disponíveis para um produto
 *
 * @param {string} handle - Handle do produto
 * @returns {Array} - Array de tamanhos disponíveis
 *
 * @example
 * const sizes = getAvailableSizes('ac-milan-02-03-retro-home')
 * // => ['S', 'M', 'L', 'XL', 'XXL']
 */
export function getAvailableSizes(handle) {
  const product = variantMapping[handle]
  if (!product) return []

  return Object.keys(product.variants)
}

/**
 * Buscar informações do produto
 *
 * @param {string} handle - Handle do produto
 * @returns {Object|null} - Informações do produto
 *
 * @example
 * const product = getProductInfo('ac-milan-02-03-retro-home')
 * // => {
 * //   handle: "ac-milan-02-03-retro-home",
 * //   title: "AC Milan 02/03 Retro Home",
 * //   shopifyProductId: "gid://shopify/Product/123",
 * //   productType: "Serie A",
 * //   tags: ["Serie A", "AC Milan", "Home", "Retro", "Jersey"],
 * //   availableSizes: ['S', 'M', 'L', 'XL', 'XXL']
 * // }
 */
export function getProductInfo(handle) {
  const product = variantMapping[handle]
  if (!product) return null

  return {
    handle: product.handle,
    title: product.title,
    shopifyProductId: product.shopifyProductId,
    productType: product.productType,
    tags: product.tags,
    availableSizes: Object.keys(product.variants)
  }
}

/**
 * Verificar se o mapeamento está carregado
 *
 * @returns {boolean} - True se o mapeamento está disponível
 */
export function isMappingLoaded() {
  return variantMapping && Object.keys(variantMapping).length > 0
}

/**
 * Obter estatísticas do mapeamento
 *
 * @returns {Object} - Estatísticas
 *
 * @example
 * const stats = getMappingStats()
 * // => {
 * //   totalProducts: 464,
 * //   totalVariants: 2320,
 * //   averageVariantsPerProduct: 5
 * // }
 */
export function getMappingStats() {
  if (!isMappingLoaded()) {
    return {
      totalProducts: 0,
      totalVariants: 0,
      averageVariantsPerProduct: 0
    }
  }

  const products = Object.values(variantMapping)
  const totalProducts = products.length
  const totalVariants = products.reduce((sum, product) => {
    return sum + Object.keys(product.variants).length
  }, 0)

  return {
    totalProducts,
    totalVariants,
    averageVariantsPerProduct: Math.round(totalVariants / totalProducts)
  }
}

// Exportar funções
export default {
  generateHandle,
  getVariantId,
  getVariantInfo,
  getAvailableSizes,
  getProductInfo,
  isMappingLoaded,
  getMappingStats
}
