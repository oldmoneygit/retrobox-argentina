/**
 * Script para processar CSV de produtos Shopify e gerar dados JSON
 * para uso no projeto Retrobox Argentina
 * 
 * Usa uma abordagem mais simples: processa linha por linha e preserva valores anteriores
 */

const fs = require('fs')
const path = require('path')

// Ler o CSV
const csvPath = path.join(__dirname, '../../products_csv/products_export_1.csv')
const csvContent = fs.readFileSync(csvPath, 'utf-8')

// Função para parsear CSV linha por linha, preservando valores anteriores
function parseCSV(content) {
  const lines = content.split('\n')
  const headers = lines[0].split(',').map(h => h.trim())
  
  const products = {}
  
  // Variáveis para rastrear valores anteriores (pois variantes não têm Title/Tags)
  let lastTitle = ''
  let lastDescription = ''
  let lastTags = ''
  let lastVendor = ''
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    // Parse manual considerando aspas
    const values = []
    let current = ''
    let inQuotes = false
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    values.push(current.trim())
    
    if (values.length < headers.length) continue
    
    const row = {}
    headers.forEach((header, index) => {
      row[header] = values[index] || ''
    })
    
    const handle = row['Handle']
    if (!handle) continue
    
    // Preservar valores anteriores se esta linha não tiver
    if (row['Title'] && row['Title'].trim()) {
      lastTitle = row['Title']
    }
    if (row['Body (HTML)'] && row['Body (HTML)'].trim()) {
      lastDescription = row['Body (HTML)']
    }
    if (row['Tags'] && row['Tags'].trim()) {
      lastTags = row['Tags']
    }
    if (row['Vendor'] && row['Vendor'].trim()) {
      lastVendor = row['Vendor']
    }
    
    // Criar produto se não existir
    if (!products[handle]) {
      products[handle] = {
        id: handle,
        slug: handle,
        name: lastTitle || row['Title'] || '',
        description: lastDescription || row['Body (HTML)'] || '',
        tags: (lastTags || row['Tags'] || '').split(',').map(t => t.trim()).filter(t => t),
        vendor: lastVendor || row['Vendor'] || '',
        price: parseFloat(row['Variant Price']) || 0,
        regularPrice: parseFloat(row['Variant Compare At Price']) || null,
        images: [],
        variants: [],
        sizes: [],
        personalizations: [],
        stock: 'available'
      }
    }
    
    // Atualizar com valores mais recentes se existirem
    if (lastTitle) products[handle].name = lastTitle
    if (lastDescription) products[handle].description = lastDescription
    if (lastTags) products[handle].tags = lastTags.split(',').map(t => t.trim()).filter(t => t)
    if (lastVendor) products[handle].vendor = lastVendor
    
    // Adicionar imagem se existir
    const imageSrc = row['Image Src']
    if (imageSrc && !products[handle].images.includes(imageSrc)) {
      products[handle].images.push(imageSrc)
    }
    
    // Adicionar variante
    const size = row['Option1 Value']
    const personalization = row['Option2 Value']
    const variantPrice = parseFloat(row['Variant Price']) || 0
    const variantComparePrice = parseFloat(row['Variant Compare At Price']) || null
    
    if (size && !products[handle].sizes.includes(size)) {
      products[handle].sizes.push(size)
    }
    
    if (personalization && !products[handle].personalizations.includes(personalization)) {
      products[handle].personalizations.push(personalization)
    }
    
    products[handle].variants.push({
      size,
      personalization,
      price: variantPrice,
      comparePrice: variantComparePrice
    })
    
    // Atualizar preço mínimo se necessário
    if (variantPrice > 0 && (products[handle].price === 0 || variantPrice < products[handle].price)) {
      products[handle].price = variantPrice
    }
    
    // Atualizar preço regular máximo
    if (variantComparePrice && (!products[handle].regularPrice || variantComparePrice > products[handle].regularPrice)) {
      products[handle].regularPrice = variantComparePrice
    }
  }
  
  return Object.values(products)
}

// Processar produtos
const products = parseCSV(csvContent)

// Formatar produtos para o formato do projeto
const formattedProducts = products.map((product, index) => {
  // Ordenar tamanhos
  const sizeOrder = ['P', 'M', 'G', 'GG', '2GG', '3GG', '4GG']
  product.sizes.sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a)
    const bIndex = sizeOrder.indexOf(b)
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex)
  })
  
  // Extrair coleção das tags
  const collectionTags = ['Brasil', 'Barcelona', 'Real Madrid', 'AC Milan', 'Milan', 'Arsenal', 'Chelsea', 'Liverpool', 'Manchester United', 'Flamengo', 'Palmeiras', 'Botafogo', 'Santos', 'Corinthians', 'São Paulo', 'Boca Juniors', 'River Plate', 'Argentina']
  const collection = product.tags.find(tag => collectionTags.some(ct => tag.includes(ct))) || 'Todos'
  
  // Limpar HTML da descrição
  const cleanDescription = product.description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  
  return {
    id: product.id,
    slug: product.slug,
    name: product.name || product.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: cleanDescription || 'Camiseta retrô de alta qualidade.',
    price: Math.round(product.price),
    regularPrice: product.regularPrice ? Math.round(product.regularPrice) : null,
    image: product.images[0] || '/images/products/placeholder.jpg',
    gallery: product.images.length > 0 ? product.images : ['/images/products/placeholder.jpg'],
    sizes: product.sizes.length > 0 ? product.sizes : ['P', 'M', 'G', 'GG', '2GG'],
    personalizations: product.personalizations,
    stock: product.stock,
    tags: product.tags,
    collection: collection,
    vendor: product.vendor
  }
})

// Salvar JSON
const outputPath = path.join(__dirname, '../src/data/products.json')
const outputDir = path.dirname(outputPath)

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

fs.writeFileSync(outputPath, JSON.stringify(formattedProducts, null, 2), 'utf-8')

console.log(`✅ Processados ${formattedProducts.length} produtos`)
console.log(`📁 Arquivo salvo em: ${outputPath}`)

// Gerar também por coleção
const productsByCollection = {}
formattedProducts.forEach(product => {
  const collection = product.collection || 'Todos'
  if (!productsByCollection[collection]) {
    productsByCollection[collection] = []
  }
  productsByCollection[collection].push(product)
})

const collectionsPath = path.join(__dirname, '../src/data/productsByCollection.json')
fs.writeFileSync(collectionsPath, JSON.stringify(productsByCollection, null, 2), 'utf-8')
console.log(`📁 Produtos por coleção salvo em: ${collectionsPath}`)
