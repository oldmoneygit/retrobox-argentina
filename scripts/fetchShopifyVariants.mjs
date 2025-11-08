import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env.local') })

console.log('🗺️  SHOPIFY VARIANT MAPPING GENERATOR - RETROBOX ARGENTINA\n')

// Verificar credenciais
if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  console.error('❌ ERRO: Credenciais da Shopify não configuradas!')
  console.error('   Verifique se o arquivo .env.local existe e contém:')
  console.error('   - SHOPIFY_STORE_DOMAIN')
  console.error('   - SHOPIFY_STOREFRONT_ACCESS_TOKEN')
  process.exit(1)
}

const SHOPIFY_STORE = {
  domain: process.env.SHOPIFY_STORE_DOMAIN,
  storefrontToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
}

const API_VERSION = '2024-10'

console.log(`🔗 Conectando à loja: ${SHOPIFY_STORE.domain}\n`)

/**
 * GraphQL request helper
 */
async function shopifyGraphQL(query, variables = {}) {
  const url = `https://${SHOPIFY_STORE.domain}/api/${API_VERSION}/graphql.json`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STORE.storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  return json.data
}

/**
 * Buscar todos os produtos com paginação
 */
async function fetchAllProducts() {
  console.log('🔍 Buscando produtos da Shopify...\n')

  const allProducts = []
  let hasNextPage = true
  let cursor = null
  let pageCount = 0

  while (hasNextPage) {
    pageCount++
    console.log(`   Página ${pageCount}...`)

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
              productType
              tags
              variants(first: 100) {
                edges {
                  node {
                    id
                    title
                    sku
                    selectedOptions {
                      name
                      value
                    }
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    quantityAvailable
                  }
                }
              }
            }
          }
        }
      }
    `

    const data = await shopifyGraphQL(query, { cursor })

    const products = data.products.edges.map(edge => edge.node)
    allProducts.push(...products)

    hasNextPage = data.products.pageInfo.hasNextPage
    cursor = data.products.pageInfo.endCursor

    // Delay para rate limit
    if (hasNextPage) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  console.log(`\n✅ Total de produtos encontrados: ${allProducts.length}\n`)
  return allProducts
}

/**
 * Criar mapeamento
 */
async function main() {
  try {
    const shopifyProducts = await fetchAllProducts()

    if (shopifyProducts.length === 0) {
      console.error('⚠️  Nenhum produto encontrado!')
      process.exit(1)
    }

    console.log('🔗 Criando mapeamento de Variant IDs...\n')

    const mapping = {}
    let totalVariants = 0

    shopifyProducts.forEach((product) => {
      const handle = product.handle

      mapping[handle] = {
        handle: handle,
        title: product.title,
        shopifyProductId: product.id,
        productType: product.productType,
        tags: product.tags,
        variants: {},
      }

      // Mapear cada variante
      product.variants.edges.forEach((edge) => {
        const variant = edge.node

        // Encontrar opção de tamanho
        const sizeOption = variant.selectedOptions.find(
          opt => opt.name.toLowerCase() === 'size' ||
                 opt.name.toLowerCase() === 'tamanho'
        )

        const size = sizeOption ? sizeOption.value : 'Default'

        mapping[handle].variants[size] = {
          shopifyVariantId: variant.id,
          title: variant.title,
          sku: variant.sku,
          price: variant.price.amount,
          compareAtPrice: variant.compareAtPrice?.amount || null,
          currency: variant.price.currencyCode,
          availableForSale: variant.availableForSale,
          quantityAvailable: variant.quantityAvailable,
        }

        totalVariants++
      })

      console.log(`   ✓ ${product.title} (${product.variants.edges.length} variantes)`)
    })

    // Salvar mapeamento
    const mappingPath = path.join(__dirname, '../shopify-variant-mapping.json')
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), 'utf8')

    // Resumo
    console.log('\n' + '='.repeat(60))
    console.log('✅ MAPEAMENTO CRIADO COM SUCESSO!')
    console.log('='.repeat(60))
    console.log(`📁 Arquivo: shopify-variant-mapping.json`)
    console.log(`📊 Produtos mapeados: ${Object.keys(mapping).length}`)
    console.log(`🔢 Total de variantes: ${totalVariants}`)
    console.log('='.repeat(60))

    console.log('\n📖 Exemplo de uso:')
    console.log('```javascript')
    console.log('import mapping from "./shopify-variant-mapping.json"')
    console.log('')
    console.log('// Buscar variant ID')
    console.log('const handle = "ac-milan-02-03-retro-home"')
    console.log('const size = "M"')
    console.log('const variantId = mapping[handle].variants[size].shopifyVariantId')
    console.log('```')

    console.log('\n🎯 PRÓXIMO PASSO:')
    console.log('   Agora você pode integrar o checkout!')
    console.log('   As funções de checkout usarão este mapeamento para')
    console.log('   converter handle+size em Shopify Variant ID\n')

  } catch (error) {
    console.error('\n❌ Erro:', error.message)
    process.exit(1)
  }
}

main()
