import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '../.env.local') })

console.log('🔧 SHOPIFY IMAGE FIX - LIMPAR E REENVIAR\n')

// Verificar credenciais
if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
  console.error('❌ ERRO: Credenciais da Shopify não configuradas!')
  process.exit(1)
}

const SHOPIFY_API_VERSION = '2024-10'
const SHOPIFY_ADMIN_API = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

// Ler dados dos produtos
const productosRetro = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/productos-retro.json'), 'utf-8')
)

/**
 * Converter nome para handle
 */
function generateHandle(nomeCompleto) {
  return nomeCompleto
    .toLowerCase()
    .replace(/\//g, '-')
    .replace(/\s+/g, '-')
    .replace(/\((\d+)\)/g, '-$1')
    .replace(/[^\w\s-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Get product images based on liga
 */
function getProductImagePaths(product) {
  const basePath = path.join(__dirname, '../public/images/retro', product.pasta_liga, product.pasta_time, product.pasta_album)

  if (product.pasta_liga === 'MLS') {
    return [
      { path: path.join(basePath, '001.jpg'), ext: 'jpg' },
      { path: path.join(basePath, '002.webp'), ext: 'webp' },
      { path: path.join(basePath, '003.webp'), ext: 'webp' },
      { path: path.join(basePath, '004.webp'), ext: 'webp' },
      { path: path.join(basePath, '005.webp'), ext: 'webp' },
      { path: path.join(basePath, '006.webp'), ext: 'webp' },
      { path: path.join(basePath, '007.jpg'), ext: 'jpg' }
    ]
  }

  return [
    { path: path.join(basePath, '001.jpg'), ext: 'jpg' },
    { path: path.join(basePath, '002.jpg'), ext: 'jpg' },
    { path: path.join(basePath, '003.jpg'), ext: 'jpg' },
    { path: path.join(basePath, '004.jpg'), ext: 'jpg' },
    { path: path.join(basePath, '005.jpg'), ext: 'jpg' },
    { path: path.join(basePath, '006.jpg'), ext: 'jpg' },
    { path: path.join(basePath, '007.jpg'), ext: 'jpg' }
  ]
}

/**
 * Buscar produto na Shopify por handle
 */
async function getProductByHandle(handle) {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        images(first: 20) {
          edges {
            node {
              id
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
      variables: { handle }
    })
  })

  const data = await response.json()
  return data.data?.productByHandle || null
}

/**
 * Deletar imagem do produto
 */
async function deleteProductImage(productId, imageId) {
  const mutation = `
    mutation productDeleteImages($id: ID!, $imageIds: [ID!]!) {
      productDeleteImages(id: $id, imageIds: $imageIds) {
        deletedImageIds
        userErrors {
          field
          message
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
      query: mutation,
      variables: {
        id: productId,
        imageIds: [imageId]
      }
    })
  })

  const data = await response.json()
  return data.data?.productDeleteImages
}

/**
 * Adicionar imagem ao produto usando REST API
 */
async function addProductImage(productId, base64Image, altText = '') {
  const numericId = productId.split('/').pop()
  const SHOPIFY_REST_API = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/products/${numericId}/images.json`

  const response = await fetch(SHOPIFY_REST_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({
      image: {
        attachment: base64Image,
        alt: altText
      }
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP ${response.status}: ${errorText}`)
  }

  const data = await response.json()
  return data.image || null
}

/**
 * Fix product images
 */
async function fixImages() {
  let successCount = 0
  let errorCount = 0
  let skippedCount = 0
  let deletedCount = 0
  let totalProducts = productosRetro.length
  let processedProducts = 0

  console.log(`✅ Total de produtos: ${totalProducts}`)
  console.log(`🔧 Limpando e reenviando imagens\n`)
  console.log('─'.repeat(60))

  const startTime = Date.now()
  const processedHandles = new Set()

  for (const product of productosRetro) {
    processedProducts++
    const progress = `[${processedProducts}/${totalProducts}]`
    const handle = generateHandle(product.nome_completo)

    console.log(`\n${progress} 📦 ${product.nome_completo}`)
    console.log(`   Handle: ${handle}`)

    // Pular duplicatas
    if (processedHandles.has(handle)) {
      console.log('   ⚠️  Handle duplicado - pulando')
      skippedCount++
      continue
    }
    processedHandles.add(handle)

    try {
      // 1. Buscar produto na Shopify
      const shopifyProduct = await getProductByHandle(handle)

      if (!shopifyProduct) {
        console.log('   ⚠️  Produto não encontrado - pulando')
        skippedCount++
        continue
      }

      console.log(`   ✅ Encontrado! ID: ${shopifyProduct.id}`)

      // 2. Verificar arquivos locais ANTES de deletar
      const imagePaths = getProductImagePaths(product)
      const localImages = imagePaths.filter(img => fs.existsSync(img.path))

      if (localImages.length < imagePaths.length) {
        const missing = imagePaths.filter(img => !fs.existsSync(img.path))
        console.log(`   ⚠️  Arquivos locais faltando (${missing.length}/${imagePaths.length}) - pulando`)
        missing.forEach(img => {
          const num = path.basename(img.path)
          console.log(`      - ${num}`)
        })
        skippedCount++
        continue
      }

      // 3. Deletar todas as imagens existentes
      const existingImages = shopifyProduct.images.edges
      if (existingImages.length > 0) {
        console.log(`   🗑️  Deletando ${existingImages.length} imagens existentes...`)

        for (const edge of existingImages) {
          try {
            await deleteProductImage(shopifyProduct.id, edge.node.id)
            deletedCount++
            await new Promise(resolve => setTimeout(resolve, 300))
          } catch (delError) {
            console.log(`   ⚠️  Erro ao deletar imagem: ${delError.message}`)
          }
        }
        console.log(`   ✅ Imagens deletadas!`)
      }

      // 4. Upload das novas imagens
      console.log(`   📸 Fazendo upload de ${localImages.length} imagens...`)
      let uploadedImages = 0

      for (let i = 0; i < localImages.length; i++) {
        const { path: imagePath, ext } = localImages[i]
        const imageNum = String(i + 1).padStart(3, '0')

        console.log(`   ⏳ ${imageNum}.${ext}: Fazendo upload...`)

        try {
          const imageBuffer = fs.readFileSync(imagePath)
          const base64Image = imageBuffer.toString('base64')

          const result = await addProductImage(
            shopifyProduct.id,
            base64Image,
            `${product.nome_completo} - Imagem ${i + 1}`
          )

          if (result) {
            console.log(`   ✅ Enviada!`)
            successCount++
            uploadedImages++
          } else {
            console.log(`   ❌ Erro ao enviar`)
            errorCount++
          }

          await new Promise(resolve => setTimeout(resolve, 500))
        } catch (imgError) {
          console.log(`   ❌ Erro: ${imgError.message}`)
          errorCount++
        }
      }

      console.log(`   ✅ Produto concluído! (${uploadedImages}/${localImages.length} imagens)`)

      // Progresso a cada 10 produtos
      if (processedProducts % 10 === 0) {
        const elapsed = Date.now() - startTime
        const avgTimePerProduct = elapsed / processedProducts
        const remaining = totalProducts - processedProducts
        const estimatedRemaining = (avgTimePerProduct * remaining) / 1000 / 60

        console.log('\n' + '─'.repeat(60))
        console.log(`⏱️  Progresso: ${processedProducts}/${totalProducts} produtos`)
        console.log(`   ✅ Imagens enviadas: ${successCount}`)
        console.log(`   🗑️  Imagens deletadas: ${deletedCount}`)
        console.log(`   ⚠️  Pulados: ${skippedCount}`)
        console.log(`   ❌ Erros: ${errorCount}`)
        console.log(`   ⏱️  Tempo restante: ${Math.ceil(estimatedRemaining)} minutos`)
        console.log('─'.repeat(60))
      }

    } catch (error) {
      console.log(`   ❌ Erro: ${error.message}`)
      errorCount++
    }
  }

  // Resumo final
  const totalTime = ((Date.now() - startTime) / 1000 / 60).toFixed(1)

  console.log('\n' + '='.repeat(60))
  console.log('📊 RESUMO FINAL')
  console.log('='.repeat(60))
  console.log(`✅ Imagens enviadas: ${successCount}`)
  console.log(`🗑️  Imagens deletadas: ${deletedCount}`)
  console.log(`⚠️  Produtos pulados: ${skippedCount}`)
  console.log(`❌ Erros: ${errorCount}`)
  console.log(`📦 Produtos processados: ${processedProducts}/${totalProducts}`)
  console.log(`⏱️  Tempo total: ${totalTime} minutos`)
  console.log('='.repeat(60))

  if (successCount > 0) {
    console.log('\n🎉 Fix concluído!')
    console.log('🌐 Imagens corrigidas no Shopify CDN')
  }

  if (errorCount > 0) {
    console.log(`\n⚠️  ${errorCount} erros ocorreram`)
  }
}

// Executar
fixImages().catch(error => {
  console.error('\n❌ Erro fatal:', error.message)
  process.exit(1)
})
