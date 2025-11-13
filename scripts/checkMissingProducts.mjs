import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Função para criar slug a partir do nome
function createSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Ler catálogo completo
const catalogPath = 'C:\\Users\\PC\\Documents\\Retrobox\\RETRO\\catalogo_produtos.json'
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'))

// Ler products.json atual
const productsPath = path.join(__dirname, '../src/data/products.json')
const currentProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))

console.log('📊 ANÁLISE DE PRODUTOS FALTANDO\n')
console.log(`Total no catálogo completo: ${catalog.length}`)
console.log(`Total no site atual: ${currentProducts.length}`)
console.log(`Produtos faltando: ${catalog.length - currentProducts.length}\n`)

// Criar sets de slugs
const currentSlugs = new Set(currentProducts.map(p => p.slug))

// Mapear catálogo para slugs
const catalogProducts = catalog.map(item => ({
  id: item.id,
  nome: item.nome_completo,
  slug: createSlug(item.nome_completo),
  time: item.time,
  ano: item.ano,
  tipo: item.tipo,
  liga: item.liga,
  pasta: item.pasta_album
}))

const catalogSlugs = new Set(catalogProducts.map(p => p.slug))

// Produtos no catálogo mas NÃO no site
const missingProducts = catalogProducts.filter(p => !currentSlugs.has(p.slug))

console.log('❌ PRODUTOS FALTANDO NO SITE:\n')
console.log(`Total: ${missingProducts.length} produtos\n`)

// Agrupar por liga
const byLeague = {}
missingProducts.forEach(p => {
  if (!byLeague[p.liga]) {
    byLeague[p.liga] = []
  }
  byLeague[p.liga].push(p)
})

// Mostrar por liga
Object.keys(byLeague).sort().forEach(liga => {
  console.log(`\n📁 ${liga} (${byLeague[liga].length} produtos):\n`)
  byLeague[liga].forEach(p => {
    console.log(`   ${p.id}. ${p.nome}`)
    console.log(`      Slug: ${p.slug}`)
    console.log(`      Pasta: ${p.pasta}`)
    console.log()
  })
})

// Salvar lista de produtos faltando em JSON
const outputPath = path.join(__dirname, '../data/missing-products.json')
fs.writeFileSync(outputPath, JSON.stringify(missingProducts, null, 2))
console.log(`\n✅ Lista salva em: data/missing-products.json`)

// Resumo por liga
console.log('\n📈 RESUMO POR LIGA:\n')
Object.keys(byLeague).sort().forEach(liga => {
  console.log(`${liga}: ${byLeague[liga].length} produtos`)
})
