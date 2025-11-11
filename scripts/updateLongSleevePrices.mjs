import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Caminho para o arquivo de produtos
const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.json')

// Ler produtos
console.log('📖 Lendo produtos...')
const productsData = fs.readFileSync(productsPath, 'utf-8')
const products = JSON.parse(productsData)

console.log(`✅ Total de produtos: ${products.length}`)

// Filtrar produtos Long Sleeve
const longSleeveProducts = products.filter(product =>
  product.name && product.name.includes('Long Sleeve')
)

console.log(`\n🔍 Produtos Long Sleeve encontrados: ${longSleeveProducts.length}`)

// Contador de atualizações
let updatedCount = 0
let alreadyCorrectCount = 0

// Atualizar preços
const updatedProducts = products.map(product => {
  if (product.name && product.name.includes('Long Sleeve')) {
    if (product.price !== 36900) {
      console.log(`\n📝 Atualizando: ${product.name}`)
      console.log(`   Preço anterior: ${product.price} → Novo preço: 36900`)
      updatedCount++
      return {
        ...product,
        price: 36900
      }
    } else {
      alreadyCorrectCount++
    }
  }
  return product
})

// Salvar de volta
console.log('\n💾 Salvando alterações...')
fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf-8')

console.log('\n✅ CONCLUÍDO!')
console.log(`📊 Estatísticas:`)
console.log(`   • Total de produtos Long Sleeve: ${longSleeveProducts.length}`)
console.log(`   • Produtos atualizados: ${updatedCount}`)
console.log(`   • Produtos já com preço correto: ${alreadyCorrectCount}`)
console.log(`\n🔥 BLACK FRIDAY: Todos os produtos Long Sleeve agora custam $36.900 ARS`)
console.log(`💰 Pack Black: 4 produtos por $59.900 ARS (59% de desconto!)`)
