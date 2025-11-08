import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '../.env.local') })

console.log('🛍️  SHOPIFY PRODUCT FETCHER\n')

if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
  console.error('❌ ERRO: Credenciais da Shopify não configuradas!')
  process.exit(1)
}

const SHOPIFY_API_VERSION = '2024-10'
const SHOPIFY_ADMIN_API = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

/**
 * Buscar produtos da Shopify
 */
async function fetchProducts(cursor = null) {
  const query = `
    query getProducts($cursor: String) {
      products(first: 50, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            title
            handle
            description
            tags
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                  inventoryQuantity
                }
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch(SHOPIFY_ADMIN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { cursor }
    })
  })

  const data = await response.json()

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
  }

  return data.data.products
}

/**
 * Converter produto Shopify para formato do site
 */
function transformProduct(shopifyProduct) {
  const { node } = shopifyProduct
  const variant = node.variants.edges[0]?.node
  const image = node.images.edges[0]?.node

  // Determinar stock
  let stock = 'available'
  if (!variant?.availableForSale) {
    stock = 'soldout'
  } else if (variant?.inventoryQuantity !== null && variant?.inventoryQuantity < 10) {
    stock = 'limited'
  }

  // Preços
  const price = parseFloat(node.priceRange.minVariantPrice.amount)
  const compareAtPrice = null // Shopify não expõe compareAtPrice facilmente via GraphQL

  return {
    id: node.id,
    name: node.title,
    slug: node.handle,
    price: Math.round(price),
    regularPrice: compareAtPrice ? Math.round(compareAtPrice) : null,
    image: image?.url || '/images/placeholder.jpg',
    imageAlt: image?.altText || node.title,
    description: node.description || '',
    tags: node.tags || [],
    stock: stock
  }
}

/**
 * Fetch all products
 */
async function fetchAllProducts() {
  console.log('📥 Buscando produtos da Shopify...\n')

  const allProducts = []
  let hasNextPage = true
  let cursor = null
  let page = 1

  while (hasNextPage) {
    console.log(`📄 Página ${page}...`)

    const productsData = await fetchProducts(cursor)

    const transformedProducts = productsData.edges.map(transformProduct)
    allProducts.push(...transformedProducts)

    hasNextPage = productsData.pageInfo.hasNextPage
    cursor = productsData.pageInfo.endCursor
    page++

    console.log(`   ✅ ${transformedProducts.length} produtos encontrados`)

    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log(`\n✅ Total: ${allProducts.length} produtos\n`)

  return allProducts
}

/**
 * Agrupar produtos por coleção (tags)
 */
function groupByCollection(products) {
  const collections = {}

  products.forEach(product => {
    product.tags.forEach(tag => {
      const collectionKey = tag.toLowerCase().replace(/\s+/g, '-')

      if (!collections[collectionKey]) {
        collections[collectionKey] = []
      }

      collections[collectionKey].push(product)
    })
  })

  return collections
}

/**
 * Main
 */
async function main() {
  try {
    // 1. Fetch products
    const products = await fetchAllProducts()

    // 2. Save products.json
    console.log('💾 Salvando products.json...')
    const productsPath = path.join(__dirname, '../src/data/products.json')
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2))
    console.log(`✅ Salvo: ${productsPath}\n`)

    // 3. Group by collection
    console.log('🏷️  Agrupando por coleções...')
    const collections = groupByCollection(products)
    const collectionsCount = Object.keys(collections).length
    console.log(`✅ ${collectionsCount} coleções criadas\n`)

    // 4. Save productsByCollection.json
    console.log('💾 Salvando productsByCollection.json...')
    const collectionsPath = path.join(__dirname, '../src/data/productsByCollection.json')
    fs.writeFileSync(collectionsPath, JSON.stringify(collections, null, 2))
    console.log(`✅ Salvo: ${collectionsPath}\n`)

    // 5. Summary
    console.log('='.repeat(60))
    console.log('🎉 SUCESSO!')
    console.log('='.repeat(60))
    console.log(`📦 ${products.length} produtos importados`)
    console.log(`🏷️  ${collectionsCount} coleções criadas`)
    console.log(`💾 Arquivos salvos em src/data/`)
    console.log('='.repeat(60))
    console.log('\n🎯 Próximo passo: npm run dev')

  } catch (error) {
    console.error('\n❌ Erro:', error.message)
    process.exit(1)
  }
}

main()
