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
 * Criar checkout na Shopify
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
  const mutation = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
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
        checkoutUserErrors {
          field
          message
        }
      }
    }
  `

  const data = await shopifyStorefrontRequest(mutation, {
    input: {
      lineItems: lineItems
    }
  })

  if (data.checkoutCreate.checkoutUserErrors.length > 0) {
    const error = data.checkoutCreate.checkoutUserErrors[0]
    throw new Error(`Checkout Error: ${error.message} (${error.field})`)
  }

  const checkout = data.checkoutCreate.checkout

  return {
    checkoutId: checkout.id,
    webUrl: checkout.webUrl,
    totalPrice: checkout.totalPriceV2,
    lineItems: checkout.lineItems.edges.map(edge => edge.node)
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

// Exportar funções
export default {
  createShopifyCheckout,
  updateShopifyCheckout,
  getCheckout,
  applyDiscountCode,
  convertCartItemsToShopify
}
