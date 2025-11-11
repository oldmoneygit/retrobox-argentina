import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ler products.json
const productsPath = path.join(__dirname, '../src/data/products.json')
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))

console.log('🔧 ATUALIZANDO PREÇOS DOS PRODUTOS\n')

let updatedCount = 0

products.forEach(product => {
  const isLongSleeve = product.name.toLowerCase().includes('long sleeve')
  const correctPrice = isLongSleeve ? 41900 : 36900

  if (product.price !== correctPrice) {
    console.log(`📝 ${product.name}`)
    console.log(`   Preço antigo: ${product.price}`)
    console.log(`   Preço novo: ${correctPrice}`)
    product.price = correctPrice
    updatedCount++
  }
})

// Salvar products.json atualizado
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2))

console.log(`\n✅ Processo concluído!`)
console.log(`📊 ${updatedCount} produtos atualizados`)
console.log(`📈 Total de produtos: ${products.length}`)
