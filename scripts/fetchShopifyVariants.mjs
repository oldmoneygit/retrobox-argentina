/**
 * Script para buscar Variant IDs do Shopify via GraphQL API
 *
 * Pré-requisito: Produtos já importados no Shopify
 *
 * Como usar:
 * npm run shopify:fetch-variants
 *
 * Irá gerar: shopify-variant-mapping.json
 */

import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: '.env.local' })

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
const API_VERSION = '2024-10'

if (!SHOPIFY_DOMAIN || !ACCESS_TOKEN) {
  console.error('❌ Erro: Variáveis de ambiente não configuradas!')
  console.error('Certifique-se de que .env.local contém:')
  console.error('  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=9wurf1-73.myshopify.com')
  console.error('  NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=...')
  process.exit(1)
}

console.log(`🔗 Conectando ao Shopify: ${SHOPIFY_DOMAIN}`)

// Carregar produtos locais
const productsPath = path.join(__dirname, '../src/data/products.json')
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'))

console.log(`📦 Produtos locais: ${productsData.length}`)

// Função para fazer request GraphQL
async function shopifyGraphQL(query, variables = {}) {
  const url = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const json = await response.json()

    if (json.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(json.errors, null, 2)}`)
    }

    return json.data
  } catch (error) {
    console.error('❌ Erro na requisição GraphQL:', error.message)
    throw error
  }
}

// Função para buscar todos os produtos (com paginação)
async function fetchAllProducts() {
  console.log('\n🔍 Buscando produtos do Shopify...')

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
            cursor
            node {
              id
              title
              handle
              variants(first: 100) {
                edges {
                  node {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                    availableForSale
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

    // Delay para não bater rate limit
    if (hasNextPage) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  console.log(`✅ Total de produtos no Shopify: ${allProducts.length}`)
  return allProducts
}

// Função principal
async function main() {
  try {
    // Buscar produtos do Shopify
    const shopifyProducts = await fetchAllProducts()

    if (shopifyProducts.length === 0) {
      console.error('\n⚠️  Nenhum produto encontrado no Shopify!')
      console.error('Certifique-se de que você já importou os produtos.')
      process.exit(1)
    }

    // Criar mapeamento
    console.log('\n🔗 Criando mapeamento de Variant IDs...')

    const mapping = {}
    let totalVariants = 0

    shopifyProducts.forEach((shopifyProduct) => {
      const handle = shopifyProduct.handle
      // Buscar produto local pelo slug (handle do Shopify é o mesmo que o slug)
      const localProduct = productsData.find(p => p.slug === handle)

      if (!localProduct) {
        console.warn(`⚠️  Produto não encontrado localmente: ${handle}`)
        return
      }

      // Inicializar mapeamento para este produto (usar handle como chave)
      mapping[handle] = {
        handle: localProduct.slug,
        title: shopifyProduct.title,
        shopifyProductId: shopifyProduct.id,
        productType: shopifyProduct.productType || '',
        tags: shopifyProduct.tags || [],
        variants: {},
      }

      // Mapear cada variante
      shopifyProduct.variants.edges.forEach((edge) => {
        const variant = edge.node

        // Encontrar opção "Tamanho" ou "Size"
        const sizeOption = variant.selectedOptions.find(
          opt => opt.name === 'Tamanho' || opt.name === 'Size'
        )

        const size = sizeOption ? sizeOption.value : variant.title

        mapping[handle].variants[size] = {
          shopifyVariantId: variant.id,
          sku: variant.sku || `${handle}-${size}`,
          price: variant.priceV2.amount,
          compareAtPrice: variant.compareAtPrice || null,
          currency: variant.priceV2.currencyCode,
          availableForSale: variant.availableForSale,
          quantityAvailable: 100, // Storefront API não retorna inventory
        }

        totalVariants++
      })
    })

    // Salvar mapeamento
    const mappingPath = path.join(__dirname, '../data/shopify-variant-mapping.json')
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), 'utf8')

    console.log('\n✅ Mapeamento criado com sucesso!')
    console.log(`📁 Arquivo: ${mappingPath}`)
    console.log(`📊 Produtos mapeados: ${Object.keys(mapping).length}`)
    console.log(`🔢 Total de variantes: ${totalVariants}`)

    console.log('\n🎯 Checkout do Shopify está pronto para uso!')
    console.log('   Os clientes agora podem finalizar compras diretamente no Shopify.\n')
  } catch (error) {
    console.error('\n❌ Erro:', error.message)
    process.exit(1)
  }
}

// Executar
main()
