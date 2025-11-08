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
 * Buscar produto na Shopify por handle
 */
async function getProductByHandle(handle) {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
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
 * Verificar produtos ausentes
 */
async function checkMissingProducts() {
  console.log('🔍 VERIFICANDO PRODUTOS NA SHOPIFY\n')
  console.log(`Total de produtos locais: ${productosRetro.length}\n`)

  const missing = []
  const found = []
  const duplicates = new Map()

  for (let i = 0; i < productosRetro.length; i++) {
    const product = productosRetro[i]
    const handle = generateHandle(product.nome_completo)

    // Verificar duplicatas
    if (duplicates.has(handle)) {
      duplicates.get(handle).push(i)
    } else {
      duplicates.set(handle, [i])
    }

    process.stdout.write(`\r[${i + 1}/${productosRetro.length}] Verificando...`)

    try {
      const shopifyProduct = await getProductByHandle(handle)

      if (shopifyProduct) {
        found.push({
          nome: product.nome_completo,
          handle: handle,
          shopifyTitle: shopifyProduct.title
        })
      } else {
        missing.push({
          nome: product.nome_completo,
          handle: handle,
          liga: product.pasta_liga,
          time: product.pasta_time
        })
      }

      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (error) {
      console.error(`\n❌ Erro ao verificar ${handle}: ${error.message}`)
    }
  }

  console.log('\n\n' + '='.repeat(70))
  console.log('📊 RELATÓRIO')
  console.log('='.repeat(70))
  console.log(`✅ Produtos encontrados: ${found.length}`)
  console.log(`❌ Produtos NÃO encontrados: ${missing.length}`)

  // Verificar duplicatas
  const duplicateHandles = Array.from(duplicates.entries()).filter(([_, indices]) => indices.length > 1)
  if (duplicateHandles.length > 0) {
    console.log(`⚠️  Handles duplicados: ${duplicateHandles.length}`)
  }

  if (missing.length > 0) {
    console.log('\n' + '='.repeat(70))
    console.log('❌ PRODUTOS NÃO ENCONTRADOS NA SHOPIFY:')
    console.log('='.repeat(70))

    missing.forEach((item, idx) => {
      console.log(`${idx + 1}. ${item.nome}`)
      console.log(`   Handle: ${item.handle}`)
      console.log(`   Liga: ${item.liga} | Time: ${item.time}`)
      console.log('')
    })

    // Salvar em arquivo
    fs.writeFileSync(
      path.join(__dirname, 'missing-products.json'),
      JSON.stringify(missing, null, 2)
    )
    console.log('💾 Lista salva em: scripts/missing-products.json\n')
  }

  if (duplicateHandles.length > 0) {
    console.log('\n' + '='.repeat(70))
    console.log('⚠️  HANDLES DUPLICADOS:')
    console.log('='.repeat(70))

    duplicateHandles.forEach(([handle, indices]) => {
      console.log(`\nHandle: ${handle}`)
      console.log(`Aparece ${indices.length} vezes:`)
      indices.forEach(idx => {
        console.log(`  - ${productosRetro[idx].nome_completo}`)
      })
    })
  }
}

checkMissingProducts().catch(error => {
  console.error('\n❌ Erro fatal:', error.message)
  process.exit(1)
})
