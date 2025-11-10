/**
 * Shopify Checkout Helper Functions
 *
 * Funções para criar e gerenciar checkouts via Storefront API
 */

const SHOPIFY_API_VERSION = '2024-10'

/**
 * Get Shopify configuration
 */
function getShopifyConfig() {
  return {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    storefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  }
}

/**
 * Make a GraphQL request to Storefront API
 */
async function shopifyStorefrontRequest(query, variables = {}) {
  const config = getShopifyConfig()

  if (!config.domain || !config.storefrontToken) {
    throw new Error('Shopify Storefront credentials not configured. Check environment variables.')
  }

  const url = `https://${config.domain}/api/${SHOPIFY_API_VERSION}/graphql.json`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': config.storefrontToken,
    },
    body: JSON.stringify({ query, variables })
  })

  if (!response.ok) {
    throw new Error(`Shopify Storefront API HTTP Error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  if (data.errors) {
    throw new Error(`Shopify GraphQL Error: ${JSON.stringify(data.errors)}`)
  }

  return data.data
}

/**
 * Criar checkout na Shopify usando Cart API
 *
 * @param {Array} lineItems - Array de itens do carrinho
 * @param {string} lineItems[].variantId - Shopify Variant ID (gid://shopify/ProductVariant/...)
 * @param {number} lineItems[].quantity - Quantidade do item
 *
 * @returns {Object} - { checkoutId, webUrl }
 *
 * @example
 * const checkout = await createShopifyCheckout([
 *   { variantId: "gid://shopify/ProductVariant/123", quantity: 2 },
 *   { variantId: "gid://shopify/ProductVariant/456", quantity: 1 }
 * ])
 *
 * window.location.href = checkout.webUrl
 */
export async function createShopifyCheckout(lineItems) {
  // Converter lineItems para o formato da Cart API
  const lines = lineItems.map(item => ({
    merchandiseId: item.variantId,
    quantity: item.quantity
  }))

  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const data = await shopifyStorefrontRequest(mutation, {
    input: {
      lines: lines
    }
  })

  if (data.cartCreate.userErrors.length > 0) {
    const error = data.cartCreate.userErrors[0]
    throw new Error(`Checkout Error: ${error.message} (${error.field})`)
  }

  const cart = data.cartCreate.cart

  return {
    checkoutId: cart.id,
    webUrl: cart.checkoutUrl,
    totalPrice: cart.cost.totalAmount,
    lineItems: cart.lines.edges.map(edge => edge.node)
  }
}

/**
 * Atualizar checkout existente (adicionar/remover itens)
 *
 * @param {string} checkoutId - ID do checkout (gid://shopify/Checkout/...)
 * @param {Array} lineItems - Novos itens
 *
 * @returns {Object} - Checkout atualizado
 */
export async function updateShopifyCheckout(checkoutId, lineItems) {
  const mutation = `
    mutation checkoutLineItemsReplace($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          webUrl
          totalPriceV2 {
            amount
            currencyCode
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const data = await shopifyStorefrontRequest(mutation, {
    checkoutId,
    lineItems
  })

  if (data.checkoutLineItemsReplace.userErrors.length > 0) {
    const error = data.checkoutLineItemsReplace.userErrors[0]
    throw new Error(`Checkout Update Error: ${error.message}`)
  }

  return data.checkoutLineItemsReplace.checkout
}

/**
 * Buscar checkout existente por ID
 *
 * @param {string} checkoutId - ID do checkout
 * @returns {Object|null} - Dados do checkout ou null se não encontrado
 */
export async function getCheckout(checkoutId) {
  const query = `
    query getCheckout($id: ID!) {
      node(id: $id) {
        ... on Checkout {
          id
          webUrl
          completedAt
          totalPriceV2 {
            amount
            currencyCode
          }
          lineItems(first: 50) {
            edges {
              node {
                title
                quantity
                variant {
                  title
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const data = await shopifyStorefrontRequest(query, { id: checkoutId })
    return data.node
  } catch (error) {
    console.error('Error fetching checkout:', error)
    return null
  }
}

/**
 * Aplicar código de desconto ao checkout
 *
 * @param {string} checkoutId - ID do checkout
 * @param {string} discountCode - Código de desconto
 * @returns {Object} - Checkout com desconto aplicado
 */
export async function applyDiscountCode(checkoutId, discountCode) {
  const mutation = `
    mutation checkoutDiscountCodeApplyV2($checkoutId: ID!, $discountCode: String!) {
      checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) {
        checkout {
          id
          webUrl
          totalPriceV2 {
            amount
            currencyCode
          }
          discountApplications(first: 10) {
            edges {
              node {
                ... on DiscountCodeApplication {
                  code
                  applicable
                }
              }
            }
          }
        }
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `

  const data = await shopifyStorefrontRequest(mutation, {
    checkoutId,
    discountCode
  })

  if (data.checkoutDiscountCodeApplyV2.checkoutUserErrors.length > 0) {
    const error = data.checkoutDiscountCodeApplyV2.checkoutUserErrors[0]
    throw new Error(`Discount Code Error: ${error.message}`)
  }

  return data.checkoutDiscountCodeApplyV2.checkout
}

/**
 * Converter itens do carrinho local para formato Shopify
 *
 * @param {Array} cartItems - Itens do carrinho local
 * @param {Function} getVariantIdFn - Função para buscar variant ID (handle, size) => variantId
 *
 * @returns {Array} - Line items no formato Shopify
 *
 * @example
 * import { getVariantId } from '@/utils/getVariantId'
 *
 * const lineItems = convertCartItemsToShopify(cartItems, getVariantId)
 */
export function convertCartItemsToShopify(cartItems, getVariantIdFn) {
  return cartItems.map(item => {
    const variantId = getVariantIdFn(item.handle, item.size)

    if (!variantId) {
      throw new Error(`Variant not found: ${item.handle} - ${item.size}`)
    }

    return {
      variantId: variantId,
      quantity: item.quantity
    }
  })
}

/**
 * Buscar produtos de uma coleção do Shopify usando Storefront API
 *
 * @param {string} collectionHandle - Handle da coleção (ex: "best-sellers")
 * @param {number} limit - Número máximo de produtos (default: 50)
 * @returns {Promise<Array>} - Array de produtos formatados
 */
export async function getCollectionProducts(collectionHandle, limit = 50) {
  const query = `
    query getCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        id
        title
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              availableForSale
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    id
                    url
                    altText
                    width
                    height
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const data = await shopifyStorefrontRequest(query, { 
      handle: collectionHandle, 
      first: limit 
    })

    if (!data.collectionByHandle) {
      console.warn(`Collection "${collectionHandle}" not found`)
      return []
    }

    // Transformar produtos do Shopify para o formato esperado pelo ProductCard
    return data.collectionByHandle.products.edges.map(edge => {
      const product = edge.node
      const firstImage = product.images.edges[0]?.node
      const firstVariant = product.variants.edges[0]?.node
      
      // Calcular preço promocional e preço original
      // Shopify Storefront API retorna preços como strings decimais (ex: "369.00" = ARS 369.00)
      // O sistema local espera preços em centavos (ex: 36900)
      const minPriceRaw = parseFloat(product.priceRange.minVariantPrice.amount)
      const maxComparePriceRaw = product.compareAtPriceRange?.maxVariantPrice?.amount 
        ? parseFloat(product.compareAtPriceRange.maxVariantPrice.amount)
        : null
      
      // Converter preço do Shopify para centavos
      // IMPORTANTE: O sistema espera preços em centavos (ex: 36900 para ARS 369.00)
      // Shopify Storefront API normalmente retorna preços como strings decimais (ex: "369.00")
      // Mas pode retornar já em centavos dependendo da configuração
      
      // Se o valor for >= 1000, provavelmente já está em centavos (não multiplicar)
      // Se for < 1000, está em unidades decimais e precisa converter
      const minPrice = minPriceRaw >= 1000
        ? Math.round(minPriceRaw) // Já está em centavos
        : Math.round(minPriceRaw * 100) // Converter de decimal para centavos (369.00 -> 36900)
      
      // Se tem compareAtPrice, usar como preço original
      const regularPrice = maxComparePriceRaw && maxComparePriceRaw > minPriceRaw
        ? (maxComparePriceRaw >= 1000
            ? Math.round(maxComparePriceRaw) // Já está em centavos
            : Math.round(maxComparePriceRaw * 100)) // Converter
        : Math.round(minPrice * 1.5) // Fallback: 50% mais caro (Black November)

      return {
        id: product.id,
        name: product.title,
        slug: product.handle,
        price: minPrice, // Já em centavos
        regularPrice: regularPrice, // Já em centavos
        image: firstImage?.url || '/images/placeholder.jpg',
        description: product.description || '',
        stock: product.availableForSale ? 'available' : 'soldout',
        tags: [],
        metadata: {
          shopifyProductId: product.id,
          shopifyVariantId: firstVariant?.id
        }
      }
    })
  } catch (error) {
    console.error(`Error fetching collection "${collectionHandle}":`, error)
    return []
  }
}

// Exportar funções
export default {
  createShopifyCheckout,
  updateShopifyCheckout,
  getCheckout,
  applyDiscountCode,
  convertCartItemsToShopify,
  getCollectionProducts
}
