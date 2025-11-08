import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '../.env.local') })

console.log('📸 SHOPIFY IMAGE UPLOADER - RETROBOX ARGENTINA\n')

// Verificar credenciais
if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
  console.error('❌ ERRO: Credenciais da Shopify não configuradas!')
  console.error('   Verifique se o arquivo .env.local existe e contém:')
  console.error('   - SHOPIFY_STORE_DOMAIN')
  console.error('   - SHOPIFY_ADMIN_ACCESS_TOKEN')
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
 * Converter nome para handle (mesmo do script CSV)
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

  // MLS usa padrão diferente
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

  // Outras ligas usam .jpg
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
              url
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

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
  }

  return data.data?.productByHandle || null
}

/**
 * Adicionar imagem ao produto usando REST API
 */
async function addProductImage(productId, base64Image, altText = '') {
  // Extrair o ID numérico do GID
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

  if (data.errors) {
    throw new Error(`API errors: ${JSON.stringify(data.errors)}`)
  }

  return data.image || null
}

/**
 * Upload de imagens
 */
async function uploadImages() {
  let successCount = 0
  let errorCount = 0
  let skippedCount = 0
  let totalProducts = productosRetro.length
  let processedProducts = 0

  console.log(`✅ Total de produtos: ${totalProducts}`)
  console.log(`📸 Enviando todas as imagens (001-007) para CDN da Shopify`)
  console.log(`⏱️  Tempo estimado: ~${Math.ceil(totalProducts * 7 * 0.5 / 60)} minutos`)
  console.log('💡 Você pode deixar rodando em background.\n')
  console.log('─'.repeat(60))

  const startTime = Date.now()

  // Rastrear handles já processados para evitar duplicatas
  const processedHandles = new Set()

  // Processar cada produto
  for (const product of productosRetro) {
    processedProducts++
    const progress = `[${processedProducts}/${totalProducts}]`
    const handle = generateHandle(product.nome_completo)

    console.log(`\n${progress} 📦 ${product.nome_completo}`)
    console.log(`   Handle: ${handle}`)

    // Pular handles duplicados
    if (processedHandles.has(handle)) {
      console.log('   ⚠️  Handle duplicado - pulando')
      skippedCount++
      continue
    }
    processedHandles.add(handle)

    try {
      // 1. Buscar produto na Shopify
      console.log('   🔍 Buscando na Shopify...')
      const shopifyProduct = await getProductByHandle(handle)

      if (!shopifyProduct) {
        console.log('   ⚠️  Produto não encontrado - pulando')
        skippedCount++
        continue
      }

      console.log(`   ✅ Encontrado! ID: ${shopifyProduct.id}`)

      // Verificar quantas imagens já existem
      const existingImagesCount = shopifyProduct.images.edges.length
      if (existingImagesCount > 0) {
        console.log(`   ℹ️  Já tem ${existingImagesCount} imagens - adicionando mais imagens...`)
      }

      // 2. Obter caminhos de todas as imagens
      const imagePaths = getProductImagePaths(product)
      console.log(`   📸 Processando ${imagePaths.length} imagens para CDN...`)

      let uploadedImages = 0

      // 3. Fazer upload de cada imagem
      for (let i = 0; i < imagePaths.length; i++) {
        const { path: imagePath, ext } = imagePaths[i]
        const imageNum = String(i + 1).padStart(3, '0')

        // Verificar se existe
        if (!fs.existsSync(imagePath)) {
          console.log(`   ⚠️  ${imageNum}.${ext}: Não encontrada`)
          continue
        }

        console.log(`   ⏳ ${imageNum}.${ext}: Fazendo upload...`)

        try {
          // Ler imagem como base64
          const imageBuffer = fs.readFileSync(imagePath)
          const base64Image = imageBuffer.toString('base64')

          // Upload via REST API
          const result = await addProductImage(
            shopifyProduct.id,
            base64Image,
            `${product.nome_completo} - Imagem ${i + 1}`
          )

          if (result) {
            console.log(`   ✅ Enviada! URL: ${result.src}`)
            successCount++
            uploadedImages++
          } else {
            console.log(`   ❌ Erro ao enviar imagem`)
            errorCount++
          }

          // Rate limit: aguardar 500ms entre uploads
          await new Promise(resolve => setTimeout(resolve, 500))

        } catch (imgError) {
          console.log(`   ❌ Erro no upload: ${imgError.message}`)
          errorCount++
        }
      }

      console.log(`   ✅ Produto concluído! (${uploadedImages}/${imagePaths.length} imagens enviadas)`)

      // Progresso a cada 10 produtos
      if (processedProducts % 10 === 0) {
        const elapsed = Date.now() - startTime
        const avgTimePerProduct = elapsed / processedProducts
        const remaining = totalProducts - processedProducts
        const estimatedRemaining = (avgTimePerProduct * remaining) / 1000 / 60

        console.log('\n' + '─'.repeat(60))
        console.log(`⏱️  Progresso: ${processedProducts}/${totalProducts} produtos`)
        console.log(`   ✅ Imagens enviadas: ${successCount}`)
        console.log(`   ⚠️  Pulados: ${skippedCount}`)
        console.log(`   ❌ Erros: ${errorCount}`)
        console.log(`   ⏱️  Tempo restante estimado: ${Math.ceil(estimatedRemaining)} minutos`)
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
  console.log(`✅ Imagens enviadas com sucesso: ${successCount}`)
  console.log(`⚠️  Produtos pulados: ${skippedCount}`)
  console.log(`❌ Erros: ${errorCount}`)
  console.log(`📦 Produtos processados: ${processedProducts}/${totalProducts}`)
  console.log(`⏱️  Tempo total: ${totalTime} minutos`)
  console.log('='.repeat(60))

  if (successCount > 0) {
    console.log('\n🎉 Upload concluído!')
    console.log('🌐 Todas as imagens estão no Shopify CDN')
    console.log('📱 Acesse: https://2twsv4-hr.myshopify.com/admin/products')
  }

  if (errorCount > 0) {
    console.log(`\n⚠️  ${errorCount} uploads falharam`)
    console.log('💡 Você pode rodar o script novamente para tentar os que falharam')
  }

  console.log('\n🎯 PRÓXIMO PASSO:')
  console.log('   Execute: npm run shopify:fetch-variants')
  console.log('   Para gerar o mapeamento de Variant IDs\n')
}

// Executar
uploadImages().catch(error => {
  console.error('\n❌ Erro fatal:', error.message)
  process.exit(1)
})
