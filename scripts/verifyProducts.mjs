import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const productsPath = path.join(__dirname, '../src/data/products.json')
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))

console.log('📊 Total de produtos em products.json:', products.length)
console.log()
console.log('✅ Últimos 10 produtos adicionados:\n')
products.slice(-10).forEach(p => {
  console.log(`   - ${p.name}`)
  console.log(`     Slug: ${p.slug}`)
  console.log(`     Time: ${p.metadata?.team || 'N/A'}`)
  console.log()
})

// Contar por time os produtos adicionados recentemente
const recentProducts = products.slice(-38)
const byTeam = {}
recentProducts.forEach(p => {
  const team = p.metadata?.team || 'Unknown'
  if (!byTeam[team]) {
    byTeam[team] = 0
  }
  byTeam[team]++
})

console.log('\n📈 Produtos adicionados por time (últimos 38):\n')
Object.keys(byTeam).sort().forEach(team => {
  console.log(`   ${team}: ${byTeam[team]} produtos`)
})
