/**
 * Shopify Admin API Helper Functions
 *
 * Funções para interagir com a Shopify Admin API
 * - Buscar produtos
 * - Upload de imagens
 * - Gerenciamento de produtos
 */

// Configuração da API
const getShopifyConfig = () => {
  // Em ambiente Node.js (scripts), usar process.env direto
  if (typeof process !== 'undefined' && process.env) {
    return {
      domain: process.env.SHOPIFY_STORE_DOMAIN,
      adminToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN
    }
  }

  // Em ambiente Next.js, usar variáveis públicas
  return {
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    adminToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN
  }
}

const SHOPIFY_API_VERSION = '2024-10'

/**
 * Fazer request GraphQL para Shopify Admin API
 */
async function shopifyAdminRequest(query, variables = {}) {
  const config = getShopifyConfig()

  if (!config.domain || !config.adminToken) {
    throw new Error('Shopify credentials not configured. Check .env.local file.')
  }

  const url = `https://${config.domain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': config.adminToken,
    },
    body: JSON.stringify({ query, variables })
  })

  if (!response.ok) {
    throw new Error(`Shopify API HTTP Error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  if (data.errors) {
    throw new Error(`Shopify GraphQL Error: ${JSON.stringify(data.errors)}`)
  }

  return data.data
}

/**
 * Buscar produto por handle
 * @param {string} handle - Handle único do produto (slug)
 * @returns {Object|null} - Dados do produto ou null se não encontrado
 */
export async function getProductByHandle(handle) {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        vendor
        productType
        tags
        status
        images(first: 20) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }
        variants(first: 100) {
          edges {
            node {
              id
              title
              sku
              price
              compareAtPrice
              inventoryQuantity
            }
          }
        }
      }
    }
  `

  try {
    const data = await shopifyAdminRequest(query, { handle })
    return data.productByHandle
  } catch (error) {
    console.error(`Error fetching product by handle "${handle}":`, error.message)
    return null
  }
}

/**
 * Buscar produto por ID
 * @param {string} productId - ID global do produto (gid://shopify/Product/...)
 * @returns {Object|null} - Dados do produto ou null se não encontrado
 */
export async function getProductById(productId) {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        handle
        descriptionHtml
        images(first: 20) {
          edges {
            node {
              id
              url
              altText
            }
          }
        }
      }
    }
  `

  try {
    const data = await shopifyAdminRequest(query, { id: productId })
    return data.product
  } catch (error) {
    console.error(`Error fetching product by ID "${productId}":`, error.message)
    return null
  }
}

/**
 * Adicionar imagem a um produto
 * @param {string} productId - ID global do produto (gid://shopify/Product/...)
 * @param {string} imageDataUri - Data URI da imagem (data:image/jpeg;base64,...)
 * @param {string} altText - Texto alternativo para a imagem
 * @returns {Object} - Resultado da mutation (com imagem ou userErrors)
 */
export async function addProductImage(productId, imageDataUri, altText = '') {
  const mutation = `
    mutation productImageCreate($productId: ID!, $image: ImageInput!) {
      productImageCreate(productId: $productId, image: $image) {
        image {
          id
          url
          altText
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  try {
    const data = await shopifyAdminRequest(mutation, {
      productId,
      image: {
        src: imageDataUri,
        altText
      }
    })

    return data.productImageCreate
  } catch (error) {
    console.error(`Error adding image to product "${productId}":`, error.message)
    return {
      image: null,
      userErrors: [{ message: error.message }]
    }
  }
}

/**
 * Deletar imagem de um produto
 * @param {string} productId - ID global do produto
 * @param {string} imageId - ID global da imagem
 * @returns {Object} - Resultado da mutation
 */
export async function deleteProductImage(productId, imageId) {
  const mutation = `
    mutation productImageDelete($productId: ID!, $imageId: ID!) {
      productImageDelete(productId: $productId, imageId: $imageId) {
        deletedImageId
        userErrors {
          field
          message
        }
      }
    }
  `

  try {
    const data = await shopifyAdminRequest(mutation, { productId, imageId })
    return data.productImageDelete
  } catch (error) {
    console.error(`Error deleting image "${imageId}":`, error.message)
    return {
      deletedImageId: null,
      userErrors: [{ message: error.message }]
    }
  }
}

/**
 * Buscar todos os produtos (com paginação)
 * @param {number} limit - Número máximo de produtos por página (max 250)
 * @param {string} cursor - Cursor para paginação (opcional)
 * @returns {Object} - { products: [], pageInfo: { hasNextPage, endCursor } }
 */
export async function getAllProducts(limit = 50, cursor = null) {
  const query = `
    query getProducts($limit: Int!, $cursor: String) {
      products(first: $limit, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            handle
            productType
            status
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `

  try {
    const data = await shopifyAdminRequest(query, { limit, cursor })
    return {
      products: data.products.edges.map(edge => edge.node),
      pageInfo: data.products.pageInfo
    }
  } catch (error) {
    console.error('Error fetching all products:', error.message)
    return {
      products: [],
      pageInfo: { hasNextPage: false, endCursor: null }
    }
  }
}

/**
 * Atualizar produto
 * @param {string} productId - ID global do produto
 * @param {Object} input - Dados para atualizar (title, descriptionHtml, etc)
 * @returns {Object} - Produto atualizado ou userErrors
 */
export async function updateProduct(productId, input) {
  const mutation = `
    mutation productUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  try {
    const data = await shopifyAdminRequest(mutation, {
      input: {
        id: productId,
        ...input
      }
    })

    return data.productUpdate
  } catch (error) {
    console.error(`Error updating product "${productId}":`, error.message)
    return {
      product: null,
      userErrors: [{ message: error.message }]
    }
  }
}

// Exportar funções
export default {
  getProductByHandle,
  getProductById,
  addProductImage,
  deleteProductImage,
  getAllProducts,
  updateProduct
}
