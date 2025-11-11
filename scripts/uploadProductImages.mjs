import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { promisify } from 'util'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carregar variáveis de ambiente do .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const readdir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)

// Configuração Shopify
const SHOPIFY_STORE = process.env.SHOPIFY_STORE_DOMAIN || '2twsv4-hr.myshopify.com'
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

if (!ADMIN_TOKEN) {
  console.error('❌ SHOPIFY_ADMIN_ACCESS_TOKEN não encontrado no .env.local')
  process.exit(1)
}

// Ler products.json
const productsPath = path.join(__dirname, '../src/data/products.json')
const allProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))

// Pegar os últimos 38 produtos (os que acabamos de adicionar)
const newProducts = allProducts.slice(-38)

// Path base das imagens: RETRO/[Liga]/[Time]/[Produto]/
const IMAGES_BASE_PATH = 'C:\\Users\\PC\\Documents\\Retrobox\\RETRO'

console.log(`📸 UPLOAD DE IMAGENS PARA SHOPIFY\n`)
console.log(`Total de produtos: ${newProducts.length}\n`)

// Mapeamento de nomes de liga para nomes de pasta
const leagueMapping = {
  'Serie A': 'Serie A',
  'Bundesliga': 'Bundesliga',
  'La Liga': 'La Liga',
  'Primera División Argentina': 'Primera División Argentina',
  'Premier League': 'Premier League',
  'Ligue 1': 'Ligue 1',
  'MLS': 'MLS',
  'Brasileirão': 'Brasileirão',
  'Eredivisie': 'Eredivisie',
  'Primeira Liga': 'Primeira Liga',
  'Süper Lig': 'Süper Lig',
  'Selecciones': 'Selecciones'
}

// Função para buscar produto na Shopify pelo handle
async function getProductByHandle(handle) {
  const query = `
    query getProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        images(first: 1) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `

  const response = await fetch(`https://${SHOPIFY_STORE}/admin/api/2024-01/graphql.json`, {
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

  if (data.errors) {
    console.error(`❌ Erro ao buscar produto ${handle}:`, data.errors)
    return null
  }

  return data.data?.productByHandle
}

// Função para fazer upload de imagem para Shopify (REST API)
async function uploadImageToProduct(productId, imageBase64, altText) {
  // Converter productId de GraphQL para REST: gid://shopify/Product/123 -> 123
  const numericId = productId.split('/').pop()

  const response = await fetch(`https://${SHOPIFY_STORE}/admin/api/2024-01/products/${numericId}/images.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({
      image: {
        attachment: imageBase64.split(',')[1], // Remover "data:image/...;base64," prefix
        alt: altText
      }
    })
  })

  const data = await response.json()

  if (data.errors) {
    console.error(`❌ Erro ao fazer upload da imagem:`, data.errors)
    return null
  }

  if (data.image) {
    return {
      id: data.image.id,
      url: data.image.src,
      altText: data.image.alt
    }
  }

  return null
}

// Função para encontrar imagens na pasta
// Estrutura: RETRO/[Liga]/[Time]/[Produto]/
async function findProductImages(product) {
  const league = product.metadata.league
  const team = product.metadata.team
  const folderName = product.metadata.folderPath

  if (!league || !team || !folderName) {
    console.log(`   ⚠️  Metadata incompleto`)
    return []
  }

  // Converter formato da pasta: "02/03" -> "02-03"
  const normalizedFolderName = folderName.replace(/(\d{2})\/(\d{2})/g, '$1-$2')

  // Estrutura: RETRO/[Liga]/[Time]/[Produto]/
  const leagueFolderName = leagueMapping[league] || league
  const folderPath = path.join(IMAGES_BASE_PATH, leagueFolderName, team, normalizedFolderName)

  if (!fs.existsSync(folderPath)) {
    console.log(`   ⚠️  Pasta não encontrada: ${folderPath}`)
    return []
  }

  try {
    const files = await readdir(folderPath)
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    )

    return imageFiles.map(file => path.join(folderPath, file))
  } catch (error) {
    console.error(`   ❌ Erro ao ler pasta ${folderPath}:`, error.message)
    return []
  }
}

// Função para converter imagem para base64 data URL
async function imageToBase64DataURL(imagePath) {
  try {
    const imageBuffer = await readFile(imagePath)
    const ext = path.extname(imagePath).toLowerCase()
    let mimeType = 'image/jpeg'

    if (ext === '.png') mimeType = 'image/png'
    else if (ext === '.webp') mimeType = 'image/webp'
    else if (ext === '.gif') mimeType = 'image/gif'

    const base64 = imageBuffer.toString('base64')
    return `data:${mimeType};base64,${base64}`
  } catch (error) {
    console.error(`   ❌ Erro ao ler imagem ${imagePath}:`, error.message)
    return null
  }
}

// Delay entre requisições (para evitar rate limiting)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Processar produtos
let successCount = 0
let errorCount = 0

for (let i = 0; i < newProducts.length; i++) {
  const product = newProducts[i]

  console.log(`\n[${i + 1}/${newProducts.length}] ${product.name}`)
  console.log(`   Handle: ${product.slug}`)
  console.log(`   Liga: ${product.metadata.league}`)
  console.log(`   Time: ${product.metadata.team}`)
  console.log(`   Pasta: ${product.metadata.folderPath}`)

  // Buscar produto na Shopify
  const shopifyProduct = await getProductByHandle(product.slug)

  if (!shopifyProduct) {
    console.log(`   ⚠️  Produto não encontrado na Shopify. Certifique-se de importar o CSV primeiro!`)
    errorCount++
    await delay(500)
    continue
  }

  console.log(`   ✅ Produto encontrado na Shopify`)

  // Verificar se já tem imagem
  if (shopifyProduct.images.edges.length > 0) {
    console.log(`   ℹ️  Produto já tem imagem, pulando...`)
    successCount++
    await delay(500)
    continue
  }

  // Buscar imagens na pasta
  const images = await findProductImages(product)

  if (images.length === 0) {
    console.log(`   ⚠️  Nenhuma imagem encontrada`)
    errorCount++
    await delay(500)
    continue
  }

  console.log(`   📸 ${images.length} imagens encontradas`)

  // Fazer upload da primeira imagem
  const firstImage = images[0]
  console.log(`   📤 Fazendo upload: ${path.basename(firstImage)}`)

  const imageBase64 = await imageToBase64DataURL(firstImage)

  if (!imageBase64) {
    console.log(`   ❌ Erro ao converter imagem`)
    errorCount++
    await delay(500)
    continue
  }

  const uploadedImage = await uploadImageToProduct(
    shopifyProduct.id,
    imageBase64,
    `${product.name} - Imagem Principal`
  )

  if (uploadedImage) {
    console.log(`   ✅ Imagem enviada com sucesso!`)
    console.log(`   🔗 URL: ${uploadedImage.url}`)
    successCount++
  } else {
    console.log(`   ❌ Falha no upload da imagem`)
    errorCount++
  }

  // Aguardar 2 segundos entre requisições (rate limiting da Shopify: 2 req/sec)
  if (i < newProducts.length - 1) {
    console.log(`   ⏳ Aguardando 2s...`)
    await delay(2000)
  }
}

console.log(`\n\n📊 RESUMO DO UPLOAD:\n`)
console.log(`✅ Sucesso: ${successCount} produtos`)
console.log(`❌ Erros: ${errorCount} produtos`)
console.log(`📈 Total: ${newProducts.length} produtos`)
console.log(`\n✨ Processo concluído!`)
