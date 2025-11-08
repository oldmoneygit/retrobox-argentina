import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '../.env.local') })

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
              altText
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
 * Verificar imagens dos produtos
 */
async function checkProductImages() {
  console.log('🔍 VERIFICANDO IMAGENS DOS PRODUTOS NA SHOPIFY\n')

  const processedHandles = new Set()
  const issues = []
  let totalProcessed = 0
  let productsWithAllImages = 0
  let productsWithMissingImages = 0

  for (const product of productosRetro) {
    const handle = generateHandle(product.nome_completo)

    // Pular duplicatas
    if (processedHandles.has(handle)) {
      continue
    }
    processedHandles.add(handle)

    totalProcessed++
    process.stdout.write(`\r[${totalProcessed}/${processedHandles.size}] Verificando...`)

    try {
      const shopifyProduct = await getProductByHandle(handle)

      if (!shopifyProduct) {
        continue
      }

      const imageCount = shopifyProduct.images.edges.length
      const imagePaths = getProductImagePaths(product)
      const expectedCount = imagePaths.length

      // Verificar arquivos locais
      const localImages = imagePaths.map((img, idx) => ({
        num: idx + 1,
        ext: img.ext,
        path: img.path,
        exists: fs.existsSync(img.path),
        size: fs.existsSync(img.path) ? fs.statSync(img.path).size : 0
      }))

      const missingLocal = localImages.filter(img => !img.exists)

      if (imageCount < expectedCount || missingLocal.length > 0) {
        productsWithMissingImages++
        issues.push({
          nome: product.nome_completo,
          handle: handle,
          shopifyId: shopifyProduct.id,
          imagesInShopify: imageCount,
          expectedImages: expectedCount,
          missing: expectedCount - imageCount,
          localImages: localImages,
          missingLocal: missingLocal
        })
      } else {
        productsWithAllImages++
      }

      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (error) {
      console.error(`\n❌ Erro ao verificar ${handle}: ${error.message}`)
    }
  }

  console.log('\n\n' + '='.repeat(70))
  console.log('📊 RELATÓRIO DE IMAGENS')
  console.log('='.repeat(70))
  console.log(`✅ Produtos com todas as imagens (7): ${productsWithAllImages}`)
  console.log(`⚠️  Produtos com imagens faltando: ${productsWithMissingImages}`)
  console.log(`📦 Total de produtos únicos verificados: ${totalProcessed}`)

  if (issues.length > 0) {
    console.log('\n' + '='.repeat(70))
    console.log('⚠️  PRODUTOS COM IMAGENS FALTANDO:')
    console.log('='.repeat(70))

    issues.forEach((issue, idx) => {
      console.log(`\n${idx + 1}. ${issue.nome}`)
      console.log(`   Handle: ${issue.handle}`)
      console.log(`   Shopify ID: ${issue.shopifyId}`)
      console.log(`   Imagens no Shopify: ${issue.imagesInShopify}/${issue.expectedImages} (faltam ${issue.missing})`)

      if (issue.missingLocal.length > 0) {
        console.log(`   ⚠️  Arquivos locais não encontrados:`)
        issue.missingLocal.forEach(img => {
          console.log(`      - ${String(img.num).padStart(3, '0')}.${img.ext}`)
        })
      } else {
        console.log(`   ✅ Todos os arquivos locais existem`)
        console.log(`   📝 Detalhes das imagens locais:`)
        issue.localImages.forEach(img => {
          const sizeKB = (img.size / 1024).toFixed(1)
          console.log(`      - ${String(img.num).padStart(3, '0')}.${img.ext}: ${sizeKB} KB`)
        })
      }
    })

    // Salvar em arquivo
    const report = {
      summary: {
        totalProducts: totalProcessed,
        productsWithAllImages,
        productsWithMissingImages
      },
      issues: issues.map(issue => ({
        nome: issue.nome,
        handle: issue.handle,
        shopifyId: issue.shopifyId,
        imagesInShopify: issue.imagesInShopify,
        expectedImages: issue.expectedImages,
        missing: issue.missing,
        missingLocalFiles: issue.missingLocal.map(img => `${String(img.num).padStart(3, '0')}.${img.ext}`)
      }))
    }

    fs.writeFileSync(
      path.join(__dirname, 'image-issues.json'),
      JSON.stringify(report, null, 2)
    )
    console.log('\n💾 Relatório detalhado salvo em: scripts/image-issues.json')
  } else {
    console.log('\n🎉 Todos os produtos têm todas as imagens!')
  }
}

checkProductImages().catch(error => {
  console.error('\n❌ Erro fatal:', error.message)
  process.exit(1)
})
