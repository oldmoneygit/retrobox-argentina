import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Carregar variáveis de ambiente
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const SHOPIFY_STORE = process.env.SHOPIFY_STORE_DOMAIN
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

if (!ADMIN_TOKEN) {
  console.error('❌ SHOPIFY_ADMIN_ACCESS_TOKEN não encontrado')
  process.exit(1)
}

// Ler arquivos
const productsPath = path.join(__dirname, '../src/data/products.json')
const mappingPath = path.join(__dirname, '../shopify-variant-mapping.json')

const allProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
const currentMapping = fs.existsSync(mappingPath)
  ? JSON.parse(fs.readFileSync(mappingPath, 'utf-8'))
  : {}

// Pegar os últimos 38 produtos (os novos)
const newProducts = allProducts.slice(-38)

console.log('🔄 ATUALIZANDO MAPEAMENTO DE VARIANTES\n')
console.log(`Total de produtos novos: ${newProducts.length}`)
console.log(`Produtos já mapeados: ${Object.keys(currentMapping).length}\n`)

// Função para buscar produto e variantes na Shopify
async function getProductWithVariants(handle) {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        featuredImage {
          url
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price
              availableForSale
              selectedOptions {
                name
                value
              }
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
    console.error(`❌ Erro ao buscar ${handle}:`, data.errors)
    return null
  }

  return data.data?.productByHandle
}

// Delay entre requisições
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Processar novos produtos
let successCount = 0
let errorCount = 0
const newMapping = { ...currentMapping }

for (let i = 0; i < newProducts.length; i++) {
  const product = newProducts[i]

  console.log(`[${i + 1}/${newProducts.length}] ${product.name}`)
  console.log(`   Slug: ${product.slug}`)

  // Verificar se já está mapeado
  if (currentMapping[product.slug]) {
    console.log(`   ℹ️  Já mapeado, pulando...`)
    successCount++
    await delay(500)
    continue
  }

  // Buscar produto na Shopify
  const shopifyProduct = await getProductWithVariants(product.slug)

  if (!shopifyProduct) {
    console.log(`   ❌ Produto não encontrado na Shopify`)
    errorCount++
    await delay(500)
    continue
  }

  // Extrair informações das variantes
  const variants = {}
  shopifyProduct.variants.edges.forEach(({ node }) => {
    // Pegar o tamanho da variante
    const sizeOption = node.selectedOptions.find(opt => opt.name === 'Tamanho')
    if (sizeOption) {
      const size = sizeOption.value
      variants[size] = {
        variantId: node.id,
        price: parseFloat(node.price),
        available: node.availableForSale
      }
    }
  })

  // Adicionar ao mapeamento
  // Nota: Shopify retorna preço em centavos na API, então dividimos por 100
  const productPrice = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount) / 100

  newMapping[product.slug] = {
    productId: shopifyProduct.id,
    title: shopifyProduct.title,
    handle: shopifyProduct.handle,
    image: shopifyProduct.featuredImage?.url || '',
    price: productPrice,
    currency: shopifyProduct.priceRange.minVariantPrice.currencyCode,
    variants
  }

  console.log(`   ✅ Mapeado com ${Object.keys(variants).length} variantes`)
  successCount++

  // Aguardar para evitar rate limiting
  if (i < newProducts.length - 1) {
    await delay(1000)
  }
}

// Salvar mapeamento atualizado
fs.writeFileSync(mappingPath, JSON.stringify(newMapping, null, 2))

console.log(`\n\n📊 RESUMO:\n`)
console.log(`✅ Produtos mapeados: ${successCount}`)
console.log(`❌ Erros: ${errorCount}`)
console.log(`📈 Total no mapeamento: ${Object.keys(newMapping).length}`)
console.log(`\n✅ Arquivo atualizado: shopify-variant-mapping.json`)

// Mostrar exemplo de mapeamento
const firstNew = newProducts[0]
if (newMapping[firstNew.slug]) {
  console.log(`\n📋 EXEMPLO DE MAPEAMENTO:\n`)
  console.log(`Produto: ${firstNew.name}`)
  console.log(`Slug: ${firstNew.slug}`)
  console.log(`Product ID: ${newMapping[firstNew.slug].productId}`)
  console.log(`Imagem: ${newMapping[firstNew.slug].image}`)
  console.log(`Preço: ${newMapping[firstNew.slug].currency} ${newMapping[firstNew.slug].price}`)
  console.log(`Variantes disponíveis:`)
  Object.keys(newMapping[firstNew.slug].variants).forEach(size => {
    const variant = newMapping[firstNew.slug].variants[size]
    console.log(`   - ${size}: ${variant.available ? '✅' : '❌'} Disponível`)
  })
}

console.log(`\n✨ Processo concluído!`)
