const fs = require('fs')
const path = require('path')

console.log('📦 SHOPIFY CSV GENERATOR - RETROBOX ARGENTINA\n')

// Ler dados dos produtos
const productosRetro = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/productos-retro.json'), 'utf-8')
)

/**
 * Converter nome para slug (handle único)
 * "Inter Miami 25/26 Retro Away" -> "inter-miami-25-26-retro-away"
 * "Inter Miami 25-26 Retro Away (2)" -> "inter-miami-25-26-retro-away-2"
 */
function generateHandle(nomeCompleto) {
  return nomeCompleto
    .toLowerCase()
    .replace(/\//g, '-')  // / -> -
    .replace(/\s+/g, '-')  // espaços -> -
    .replace(/\((\d+)\)/g, '-$1')  // (2) -> -2
    .replace(/[^\w\s-]/g, '')  // remover caracteres especiais
    .replace(/-+/g, '-')  // múltiplos - -> um -
    .replace(/^-|-$/g, '')  // remover - do início/fim
}

/**
 * Calcular preço do produto
 */
function getProductPrice(product) {
  const isLongSleeve = product.extras && product.extras.includes('Long Sleeve')
  return isLongSleeve ? 41900 : 36900
}

/**
 * Calcular preço comparativo (antes do desconto)
 */
function getCompareAtPrice(product) {
  const currentPrice = getProductPrice(product)
  return Math.round(currentPrice * 1.5)
}

/**
 * Formatar preço para Shopify
 * Preços já estão no formato correto (36900 = $36.900 ARS)
 */
function formatPriceForShopify(price) {
  return price.toFixed(2)
}

/**
 * Tamanhos disponíveis
 */
const SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL']

/**
 * Headers do CSV Shopify (45 colunas)
 */
const headers = [
  'Handle',
  'Title',
  'Body (HTML)',
  'Vendor',
  'Type',
  'Tags',
  'Published',
  'Option1 Name',
  'Option1 Value',
  'Option2 Name',
  'Option2 Value',
  'Option3 Name',
  'Option3 Value',
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
  'Google Shopping / Google Product Category',
  'Google Shopping / Gender',
  'Google Shopping / Age Group',
  'Google Shopping / MPN',
  'Google Shopping / AdWords Grouping',
  'Google Shopping / AdWords Labels',
  'Google Shopping / Condition',
  'Google Shopping / Custom Product',
  'Google Shopping / Custom Label 0',
  'Google Shopping / Custom Label 1',
  'Google Shopping / Custom Label 2',
  'Google Shopping / Custom Label 3',
  'Google Shopping / Custom Label 4',
  'Variant Image',
  'Variant Weight Unit',
  'Variant Tax Code',
  'Cost per item',
  'Status'
]

const rows = []
let productCount = 0
let variantCount = 0

// Processar cada produto
productosRetro.forEach(product => {
  productCount++

  const handle = generateHandle(product.nome_completo)
  const title = product.nome_completo
  const vendor = 'Retrobox'
  const productType = product.liga

  // Tags (liga, time, tipo, país/categoria)
  const tags = [
    product.liga,
    product.time,
    product.tipo,
    'Retro',
    'Jersey',
    'Futebol'
  ].filter(Boolean).join(', ')

  // Preços
  const price = formatPriceForShopify(getProductPrice(product))
  const compareAtPrice = formatPriceForShopify(getCompareAtPrice(product))

  // Descrição HTML (sem termos proibidos como "réplica oficial")
  const bodyHTML = `<p><strong>${title}</strong></p>
<p>Camiseta retro ${product.time} - Temporada ${product.ano}</p>
<p>Tipo: ${product.tipo}</p>
<p>Liga: ${product.liga}</p>
<ul>
<li>Material de alta qualidade</li>
<li>Design clássico retro</li>
<li>Tamanhos disponíveis: S, M, L, XL, XXL, 3XL</li>
${product.extras.includes('Long Sleeve') ? '<li>Manga longa</li>' : ''}
</ul>
<p><strong>🔥 BLACK NOVEMBER - 33% OFF!</strong></p>`

  // SEO
  const seoTitle = `${title} | Retrobox Argentina`
  const seoDescription = `Camiseta retro ${product.time} ${product.ano} ${product.tipo}. ${product.liga}. Design clássico de alta qualidade. 🔥 BLACK NOVEMBER: 33% OFF!`

  // Criar uma linha para cada variante (tamanho)
  SIZES.forEach((size, sizeIndex) => {
    variantCount++
    const isFirstRow = sizeIndex === 0

    const row = [
      handle,                              // Handle
      isFirstRow ? title : '',             // Title (só primeira linha)
      isFirstRow ? bodyHTML : '',          // Body HTML
      isFirstRow ? vendor : '',            // Vendor
      isFirstRow ? productType : '',       // Type
      isFirstRow ? tags : '',              // Tags
      isFirstRow ? 'TRUE' : '',            // Published
      isFirstRow ? 'Size' : '',            // Option1 Name
      size,                                // Option1 Value (tamanho)
      '', '', '', '',                      // Options 2 e 3 (vazias)
      `${handle}-${size}`,                 // Variant SKU
      '400',                               // Variant Grams (peso padrão)
      '',                                  // Inventory Tracker (vazio)
      '100',                               // Inventory Qty (estoque inicial)
      'deny',                              // Inventory Policy (não vender sem estoque)
      'manual',                            // Fulfillment Service
      price,                               // Variant Price
      compareAtPrice,                      // Compare At Price (preço antes do desconto)
      'TRUE',                              // Requires Shipping
      'TRUE',                              // Taxable
      '',                                  // Barcode
      '',                                  // Image Src (VAZIO - será adicionado via API)
      '',                                  // Image Position
      '',                                  // Image Alt Text
      'FALSE',                             // Gift Card
      isFirstRow ? seoTitle : '',          // SEO Title
      isFirstRow ? seoDescription : '',    // SEO Description
      'Apparel & Accessories > Clothing > Activewear > Jerseys', // Google Category
      'Unisex',                            // Gender
      'Adult',                             // Age Group
      '', '', '', 'New', '',               // Google Shopping campos
      product.liga,                        // Custom Label 0 (liga)
      product.time,                        // Custom Label 1 (time)
      product.tipo,                        // Custom Label 2 (tipo)
      product.ano,                         // Custom Label 3 (temporada)
      '',                                  // Custom Label 4
      '',                                  // Variant Image
      'kg',                                // Weight Unit
      '',                                  // Tax Code
      '',                                  // Cost per item
      'active'                             // Status
    ]

    rows.push(row)
  })

  // Log a cada 50 produtos
  if (productCount % 50 === 0) {
    console.log(`📦 Processados: ${productCount} produtos...`)
  }
})

/**
 * Escapar células do CSV
 */
function escapeCSVCell(cell) {
  const cellStr = String(cell || '')
  // Escapar células com vírgulas, aspas ou quebras de linha
  if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
    return `"${cellStr.replace(/"/g, '""')}"`
  }
  return cellStr
}

// Gerar CSV
const csvContent = [
  headers.join(','),
  ...rows.map(row => row.map(escapeCSVCell).join(','))
].join('\n')

// Salvar arquivo
const outputPath = path.join(__dirname, '../shopify-products-import.csv')
fs.writeFileSync(outputPath, csvContent, 'utf-8')

// Estatísticas finais
console.log('\n' + '='.repeat(60))
console.log('✅ CSV GERADO COM SUCESSO!')
console.log('='.repeat(60))
console.log(`📁 Arquivo: shopify-products-import.csv`)
console.log(`📊 Produtos únicos: ${productCount}`)
console.log(`🔢 Total de variantes (tamanhos): ${variantCount}`)
console.log(`📋 Total de linhas no CSV: ${rows.length}`)
console.log(`💾 Tamanho estimado: ~${Math.round(csvContent.length / 1024)} KB`)
console.log('='.repeat(60))

console.log('\n🎯 PRÓXIMOS PASSOS:')
console.log('   1. Acesse: https://2twsv4-hr.myshopify.com/admin/products')
console.log('   2. Clique em "Import" (canto superior direito)')
console.log('   3. Faça upload do arquivo: shopify-products-import.csv')
console.log('   4. ❌ NÃO MARQUE "Upload images from your computer"')
console.log('   5. ✅ MARQUE "Overwrite existing products that have the same handle"')
console.log('   6. Clique em "Upload and Continue"')
console.log('   7. Revise o preview e clique em "Import Products"')
console.log('   8. Aguarde o email de confirmação (~10-15 minutos)')
console.log('\n💡 As imagens serão adicionadas na próxima etapa via API!')
console.log('\n✨ Após a importação, execute: npm run shopify:upload-images\n')
