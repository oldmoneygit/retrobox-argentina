import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🗑️  REMOVENDO PRODUTOS DUPLICADOS (v2/v3)\n')

// Paths
const productsPath = path.join(__dirname, '../src/data/products.json')
const mappingPath = path.join(__dirname, '../shopify-variant-mapping.json')
const productsBackupPath = path.join(__dirname, '../src/data/products.json.backup')
const mappingBackupPath = path.join(__dirname, '../shopify-variant-mapping.json.backup')

// Ler arquivos
const allProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'))

// Fazer backup
fs.writeFileSync(productsBackupPath, JSON.stringify(allProducts, null, 2))
fs.writeFileSync(mappingBackupPath, JSON.stringify(mapping, null, 2))

console.log('✅ Backup criado')
console.log(`   - ${productsBackupPath}`)
console.log(`   - ${mappingBackupPath}\n`)

// Identificar produtos duplicados (com v2 ou v3 no final)
const duplicates = allProducts.filter(p => p.name.match(/ v[23]$/))
const duplicateSlugs = duplicates.map(p => p.slug)

console.log('📋 PRODUTOS A REMOVER:\n')
duplicates.forEach(p => {
  console.log(`   - ${p.name}`)
  console.log(`     Slug: ${p.slug}`)
  console.log(`     ID: ${p.id}\n`)
})

console.log(`Total a remover: ${duplicates.length}\n`)

// Remover de products.json
const filteredProducts = allProducts.filter(p => !p.name.match(/ v[23]$/))

// Remover do mapping
duplicateSlugs.forEach(slug => {
  if (mapping[slug]) {
    delete mapping[slug]
  }
})

// Salvar arquivos atualizados
fs.writeFileSync(productsPath, JSON.stringify(filteredProducts, null, 2))
fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2))

console.log('📊 RESUMO:\n')
console.log(`✅ Produtos antes: ${allProducts.length}`)
console.log(`✅ Produtos depois: ${filteredProducts.length}`)
console.log(`✅ Produtos removidos: ${allProducts.length - filteredProducts.length}`)
console.log(`\n✅ Mapeamento antes: ${Object.keys(mapping).length + duplicateSlugs.length}`)
console.log(`✅ Mapeamento depois: ${Object.keys(mapping).length}`)
console.log(`\n✅ Arquivos atualizados com sucesso!`)
console.log(`\n💡 Para restaurar o backup caso necessário:`)
console.log(`   node -e "const fs = require('fs'); fs.copyFileSync('src/data/products.json.backup', 'src/data/products.json'); fs.copyFileSync('shopify-variant-mapping.json.backup', 'shopify-variant-mapping.json')"`)
