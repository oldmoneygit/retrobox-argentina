import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const SHOPIFY_API_VERSION = '2024-10'
const SHOPIFY_ADMIN_API = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

/**
 * Fazer request GraphQL para Shopify Admin API
 */
async function shopifyRequest(query, variables = {}) {
  const response = await fetch(SHOPIFY_ADMIN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables })
  })

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()

  if (data.errors) {
    throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`)
  }

  return data.data
}

/**
 * Buscar todos os produtos com suas imagens (usando media)
 */
async function getAllProducts() {
  console.log('📦 Buscando todos os produtos da Shopify...\n')

  let allProducts = []
  let hasNextPage = true
  let cursor = null

  while (hasNextPage) {
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
              handle
              title
              media(first: 50) {
                edges {
                  node {
                    ... on MediaImage {
                      id
                      image {
                        url
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

    const data = await shopifyRequest(query, { cursor })
    const products = data.products.edges.map(edge => edge.node)
    allProducts = [...allProducts, ...products]

    hasNextPage = data.products.pageInfo.hasNextPage
    cursor = data.products.pageInfo.endCursor

    console.log(`   ✓ Carregados ${allProducts.length} produtos...`)
  }

  console.log(`\n✅ Total: ${allProducts.length} produtos encontrados\n`)
  return allProducts
}

/**
 * Extrair hash base do nome do arquivo
 */
function getImageHash(url) {
  const fileName = url.split('/').pop().split('?')[0]
  const fileHash = fileName.split('_')[0].split('.')[0]
  return fileHash
}

/**
 * Identificar imagens duplicadas
 */
function findDuplicates(images) {
  const seenHashes = new Map() // hash -> primeira imagem
  const duplicates = [] // imagens duplicadas para deletar

  for (const image of images) {
    const hash = getImageHash(image.url)

    if (seenHashes.has(hash)) {
      // Essa é uma duplicata
      duplicates.push(image)
    } else {
      // Primeira ocorrência
      seenHashes.set(hash, image)
    }
  }

  return {
    unique: Array.from(seenHashes.values()),
    duplicates
  }
}

/**
 * Deletar imagens duplicadas de um produto
 */
async function deleteProductImages(productId, imageIds) {
  if (imageIds.length === 0) return

  const mutation = `
    mutation productDeleteMedia($productId: ID!, $mediaIds: [ID!]!) {
      productDeleteMedia(productId: $productId, mediaIds: $mediaIds) {
        deletedMediaIds
        deletedProductImageIds
        product {
          id
        }
        mediaUserErrors {
          field
          message
        }
      }
    }
  `

  const data = await shopifyRequest(mutation, {
    productId: productId,
    mediaIds: imageIds
  })

  if (data.productDeleteMedia.mediaUserErrors.length > 0) {
    throw new Error(`Erro ao deletar imagens: ${JSON.stringify(data.productDeleteMedia.mediaUserErrors)}`)
  }

  return data.productDeleteMedia.deletedMediaIds
}

/**
 * Processar um produto
 */
async function processProduct(product, dryRun = true) {
  const media = product.media.edges.map(edge => edge.node).filter(node => node.image)

  if (media.length === 0) {
    return { product: product.handle, status: 'skip', reason: 'sem imagens' }
  }

  // Converter media para formato compatível com findDuplicates
  const images = media.map(m => ({
    id: m.id,
    url: m.image.url
  }))

  const { unique, duplicates } = findDuplicates(images)

  if (duplicates.length === 0) {
    return {
      product: product.handle,
      status: 'ok',
      total: images.length,
      unique: unique.length
    }
  }

  // Produto tem duplicatas
  console.log(`\n🔍 Produto: ${product.title}`)
  console.log(`   Handle: ${product.handle}`)
  console.log(`   Total de imagens: ${images.length}`)
  console.log(`   Imagens únicas: ${unique.length}`)
  console.log(`   Duplicatas: ${duplicates.length}`)

  if (dryRun) {
    console.log(`   🟡 [DRY RUN] Imagens que seriam deletadas:`)
    duplicates.forEach((img, i) => {
      console.log(`      ${i + 1}. ${img.url}`)
    })
    return {
      product: product.handle,
      status: 'duplicates_found',
      total: images.length,
      unique: unique.length,
      duplicates: duplicates.length
    }
  }

  // Deletar imagens duplicadas
  console.log(`   🗑️  Deletando ${duplicates.length} imagens duplicadas...`)
  const imageIds = duplicates.map(img => img.id)

  try {
    await deleteProductImages(product.id, imageIds)
    console.log(`   ✅ Duplicatas deletadas com sucesso!`)

    return {
      product: product.handle,
      status: 'cleaned',
      total: images.length,
      unique: unique.length,
      deleted: duplicates.length
    }
  } catch (error) {
    console.log(`   ❌ Erro ao deletar: ${error.message}`)
    return {
      product: product.handle,
      status: 'error',
      error: error.message
    }
  }
}

/**
 * Main
 */
async function main() {
  const args = process.argv.slice(2)
  const dryRun = !args.includes('--execute')

  console.log('🧹 Script de Limpeza de Imagens Duplicadas\n')
  console.log('=' .repeat(60))

  if (dryRun) {
    console.log('🟡 MODO DRY RUN (simulação)')
    console.log('   Nenhuma imagem será deletada.')
    console.log('   Use --execute para realmente deletar as duplicatas.\n')
  } else {
    console.log('🔴 MODO EXECUÇÃO')
    console.log('   As imagens duplicadas SERÃO DELETADAS!\n')
  }

  console.log('=' .repeat(60) + '\n')

  // Buscar todos os produtos
  const products = await getAllProducts()

  // Estatísticas
  const stats = {
    total: products.length,
    withoutImages: 0,
    clean: 0,
    withDuplicates: 0,
    cleaned: 0,
    errors: 0,
    totalImagesDeleted: 0
  }

  // Processar cada produto
  for (const product of products) {
    const result = await processProduct(product, dryRun)

    switch (result.status) {
      case 'skip':
        stats.withoutImages++
        break
      case 'ok':
        stats.clean++
        break
      case 'duplicates_found':
        stats.withDuplicates++
        break
      case 'cleaned':
        stats.cleaned++
        stats.totalImagesDeleted += result.deleted
        break
      case 'error':
        stats.errors++
        break
    }

    // Pequeno delay para não sobrecarregar a API
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  // Resumo final
  console.log('\n' + '='.repeat(60))
  console.log('📊 RESUMO FINAL\n')
  console.log(`Total de produtos: ${stats.total}`)
  console.log(`Produtos sem imagens: ${stats.withoutImages}`)
  console.log(`Produtos limpos (sem duplicatas): ${stats.clean}`)

  if (dryRun) {
    console.log(`Produtos com duplicatas encontradas: ${stats.withDuplicates}`)
  } else {
    console.log(`Produtos limpos: ${stats.cleaned}`)
    console.log(`Total de imagens deletadas: ${stats.totalImagesDeleted}`)
  }

  if (stats.errors > 0) {
    console.log(`⚠️  Produtos com erros: ${stats.errors}`)
  }

  console.log('='.repeat(60))

  if (dryRun) {
    console.log('\n💡 Para executar a limpeza, rode:')
    console.log('   node scripts/cleanDuplicateImages.mjs --execute\n')
  } else {
    console.log('\n✅ Limpeza concluída!\n')
  }
}

// Executar
main().catch(error => {
  console.error('❌ Erro fatal:', error)
  process.exit(1)
})
