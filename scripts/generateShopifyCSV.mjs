import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ler products.json
const productsPath = path.join(__dirname, '../src/data/products.json')
const allProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))

// Pegar os últimos 38 produtos (os que acabamos de adicionar)
const newProducts = allProducts.slice(-38)

console.log(`📦 Gerando CSV para ${newProducts.length} produtos novos\n`)

// Tamanhos disponíveis
const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL']

// Função para escapar CSV
function escapeCSV(str) {
  if (!str) return ''
  str = String(str)
  if (str.includes('"') || str.includes(',') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

// Gerar CSV
const csvRows = []

// Header do CSV da Shopify
const header = [
  'Handle',
  'Title',
  'Body (HTML)',
  'Vendor',
  'Product Category',
  'Type',
  'Tags',
  'Published',
  'Option1 Name',
  'Option1 Value',
  'Variant SKU',
  'Variant Grams',
  'Variant Inventory Tracker',
  'Variant Inventory Qty',
  'Variant Inventory Policy',
  'Variant Fulfillment Service',
  'Variant Price',
  'Variant Compare At Price',
  'Variant Requires Shipping',
  'Variant Taxable',
  'Variant Barcode',
  'Image Src',
  'Image Position',
  'Image Alt Text',
  'Gift Card',
  'SEO Title',
  'SEO Description',
  'Variant Image',
  'Variant Weight Unit',
  'Status'
]

csvRows.push(header.join(','))

// Processar cada produto
newProducts.forEach((product, index) => {
  const handle = product.slug
  const title = product.name
  const bodyHTML = product.description.replace(/\n/g, '<br>')
  const vendor = 'Retrobox'
  const productCategory = 'Apparel & Accessories > Clothing'
  const type = 'Camiseta Retro'
  const tags = product.tags.join(', ')
  const published = 'TRUE'

  // Preço baseado no tipo de produto
  // Manga longa: ARS 41900 | Normal: ARS 36900
  const isLongSleeve = product.name.toLowerCase().includes('long sleeve')
  const basePrice = isLongSleeve ? 41900 : 36900
  const price = basePrice.toFixed(2)
  const compareAtPrice = product.regularPrice ? product.regularPrice.toFixed(2) : ''

  // SEO
  const seoTitle = `${product.name} | Retrobox Argentina`
  const seoDescription = `Comprar ${product.name} - Camiseta retro oficial. ${product.metadata?.league || 'Futebol'}. Tamanhos S a 3XL. Envio para toda Argentina.`

  // Primeira linha do produto com primeira variante (tamanho S)
  const firstRow = [
    escapeCSV(handle),
    escapeCSV(title),
    escapeCSV(bodyHTML),
    escapeCSV(vendor),
    escapeCSV(productCategory),
    escapeCSV(type),
    escapeCSV(tags),
    published,
    'Tamanho', // Option1 Name
    sizes[0], // Option1 Value (S)
    escapeCSV(`${handle}-${sizes[0].toLowerCase()}`), // Variant SKU
    '200', // Variant Grams (peso estimado)
    'shopify', // Variant Inventory Tracker
    '10', // Variant Inventory Qty
    'deny', // Variant Inventory Policy
    'manual', // Variant Fulfillment Service
    price, // Variant Price
    compareAtPrice, // Variant Compare At Price
    'TRUE', // Variant Requires Shipping
    'TRUE', // Variant Taxable
    '', // Variant Barcode
    '', // Image Src (será preenchido depois)
    '', // Image Position
    escapeCSV(`${product.name} - Imagem Principal`), // Image Alt Text
    'FALSE', // Gift Card
    escapeCSV(seoTitle), // SEO Title
    escapeCSV(seoDescription), // SEO Description
    '', // Variant Image
    'kg', // Variant Weight Unit
    'active' // Status
  ]
  csvRows.push(firstRow.join(','))

  // Adicionar as outras variantes (M, L, XL, XXL, 3XL)
  sizes.slice(1).forEach(size => {
    const variantRow = [
      escapeCSV(handle),
      '', // Title (vazio para variantes)
      '', // Body
      '', // Vendor
      '', // Product Category
      '', // Type
      '', // Tags
      '', // Published
      'Tamanho', // Option1 Name
      size, // Option1 Value
      escapeCSV(`${handle}-${size.toLowerCase()}`), // Variant SKU
      '200', // Variant Grams
      'shopify', // Variant Inventory Tracker
      '10', // Variant Inventory Qty
      'deny', // Variant Inventory Policy
      'manual', // Variant Fulfillment Service
      price, // Variant Price
      compareAtPrice, // Variant Compare At Price
      'TRUE', // Variant Requires Shipping
      'TRUE', // Variant Taxable
      '', // Variant Barcode
      '', // Image Src
      '', // Image Position
      '', // Image Alt Text
      '', // Gift Card
      '', // SEO Title
      '', // SEO Description
      '', // Variant Image
      'kg', // Variant Weight Unit
      '' // Status
    ]
    csvRows.push(variantRow.join(','))
  })

  if ((index + 1) % 5 === 0) {
    console.log(`✅ Processados ${index + 1}/${newProducts.length} produtos`)
  }
})

// Salvar CSV
const csvContent = csvRows.join('\n')
const outputPath = path.join(__dirname, '../shopify-new-products.csv')
fs.writeFileSync(outputPath, csvContent, 'utf-8')

console.log(`\n✅ CSV gerado com sucesso!`)
console.log(`📄 Arquivo: shopify-new-products.csv`)
console.log(`📊 Total de linhas: ${csvRows.length - 1} (${newProducts.length} produtos x ${sizes.length} tamanhos)`)

console.log(`\n📋 PRÓXIMOS PASSOS:\n`)
console.log(`1. Abrir Shopify Admin: https://2twsv4-hr.myshopify.com/admin`)
console.log(`2. Ir em Products > Import`)
console.log(`3. Fazer upload do arquivo: shopify-new-products.csv`)
console.log(`4. Aguardar importação`)
console.log(`5. Depois rodar script de upload de imagens`)

console.log(`\n⚠️  IMPORTANTE:\n`)
console.log(`- O campo "Image Src" está vazio no CSV`)
console.log(`- As imagens precisam ser adicionadas depois via API`)
console.log(`- Vamos criar o script de upload de imagens no próximo passo`)

// Resumo por time
const byTeam = {}
newProducts.forEach(p => {
  const team = p.metadata?.team || 'Unknown'
  if (!byTeam[team]) {
    byTeam[team] = 0
  }
  byTeam[team]++
})

console.log(`\n📈 PRODUTOS NO CSV POR TIME:\n`)
Object.keys(byTeam).sort().forEach(team => {
  console.log(`   ${team}: ${byTeam[team]} produtos`)
})
