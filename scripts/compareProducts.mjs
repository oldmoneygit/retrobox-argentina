import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ler products.json local
const productsPath = path.join(__dirname, '../src/data/products.json')
const localProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))

// Ler shopify-variant-mapping.json
const mappingPath = path.join(__dirname, '../shopify-variant-mapping.json')
const shopifyMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'))

console.log('📊 COMPARAÇÃO DE PRODUTOS\n')
console.log(`Total de produtos locais: ${localProducts.length}`)
console.log(`Total de produtos na Shopify: ${Object.keys(shopifyMapping).length}`)

// Criar sets de slugs
const localSlugs = new Set(localProducts.map(p => p.slug))
const shopifySlugs = new Set(Object.keys(shopifyMapping))

// Produtos no local mas NÃO na Shopify
const missingInShopify = [...localSlugs].filter(slug => !shopifySlugs.has(slug))

// Produtos na Shopify mas NÃO no local
const missingInLocal = [...shopifySlugs].filter(slug => !localSlugs.has(slug))

console.log('\n🔍 ANÁLISE DE DIFERENÇAS\n')

if (missingInShopify.length > 0) {
  console.log(`❌ Produtos no LOCAL mas NÃO na SHOPIFY (${missingInShopify.length}):`)
  missingInShopify.forEach(slug => {
    const product = localProducts.find(p => p.slug === slug)
    console.log(`   - ${slug} (${product?.name || 'Nome não encontrado'})`)
  })
} else {
  console.log('✅ Todos os produtos locais estão na Shopify')
}

console.log()

if (missingInLocal.length > 0) {
  console.log(`❌ Produtos na SHOPIFY mas NÃO no LOCAL (${missingInLocal.length}):`)
  missingInLocal.forEach(slug => {
    const product = shopifyMapping[slug]
    console.log(`   - ${slug} (${product?.title || 'Nome não encontrado'})`)
  })
} else {
  console.log('✅ Todos os produtos da Shopify estão no local')
}

// Verificar se há produtos com variantes faltando
console.log('\n📦 ANÁLISE DE VARIANTES\n')

let productsWithMissingVariants = []

localProducts.forEach(localProduct => {
  const shopifyProduct = shopifyMapping[localProduct.slug]

  if (shopifyProduct) {
    const localSizes = localProduct.sizes || []
    const shopifySizes = Object.keys(shopifyProduct.variants || {})

    const missingSizes = localSizes.filter(size => !shopifySizes.includes(size))

    if (missingSizes.length > 0) {
      productsWithMissingVariants.push({
        slug: localProduct.slug,
        name: localProduct.name,
        missingSizes
      })
    }
  }
})

if (productsWithMissingVariants.length > 0) {
  console.log(`❌ Produtos com variantes faltando na Shopify (${productsWithMissingVariants.length}):`)
  productsWithMissingVariants.forEach(({ slug, name, missingSizes }) => {
    console.log(`   - ${slug}`)
    console.log(`     Nome: ${name}`)
    console.log(`     Tamanhos faltando: ${missingSizes.join(', ')}`)
  })
} else {
  console.log('✅ Todas as variantes estão sincronizadas')
}

console.log('\n📈 RESUMO\n')
console.log(`✅ Produtos sincronizados: ${localProducts.length - missingInShopify.length}`)
console.log(`❌ Produtos faltando na Shopify: ${missingInShopify.length}`)
console.log(`⚠️  Produtos extras na Shopify: ${missingInLocal.length}`)
console.log(`🔧 Produtos com variantes faltando: ${productsWithMissingVariants.length}`)
