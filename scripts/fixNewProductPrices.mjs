import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔧 CORRIGINDO PREÇOS DOS PRODUTOS NOVOS\n')

// Ler arquivos
const productsPath = path.join(__dirname, '../src/data/products.json')
const mappingPath = path.join(__dirname, '../data/shopify-variant-mapping.json')

const allProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'))

// Pegar os últimos 38 produtos (os novos)
const newProducts = allProducts.slice(-38)

console.log(`Total de produtos a corrigir: ${newProducts.length}\n`)

let fixedCount = 0

newProducts.forEach(product => {
  const slug = product.slug

  if (mapping[slug]) {
    // Corrigir o preço dividindo por 100
    const currentPrice = mapping[slug].price

    if (currentPrice > 100000) {
      const correctedPrice = currentPrice / 100
      mapping[slug].price = correctedPrice
      console.log(`✅ ${product.name}`)
      console.log(`   ${slug}`)
      console.log(`   Preço corrigido: ${currentPrice} → ${correctedPrice}\n`)
      fixedCount++
    } else {
      console.log(`ℹ️  ${product.name} - Preço já está correto (${currentPrice})`)
    }
  } else {
    console.log(`⚠️  ${product.name} - Não encontrado no mapeamento`)
  }
})

// Salvar mapeamento atualizado
fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2))

console.log(`\n📊 RESUMO:\n`)
console.log(`✅ Preços corrigidos: ${fixedCount}`)
console.log(`📁 Arquivo atualizado: shopify-variant-mapping.json`)
console.log(`\n✨ Processo concluído!`)
