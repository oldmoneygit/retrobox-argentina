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

// Ler arquivos
const missingProductsPath = path.join(__dirname, '../missing-products.json')
const productsPath = path.join(__dirname, '../src/data/products.json')
const catalogPath = 'C:\\Users\\PC\\Documents\\Retrobox\\RETRO\\catalogo_produtos.json'

const missingProducts = JSON.parse(fs.readFileSync(missingProductsPath, 'utf-8'))
const currentProducts = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'))

// Criar mapa de produtos atuais por slug
const currentSlugs = new Set(currentProducts.map(p => p.slug))

// Produtos a adicionar
const teamsToAdd = {
  'Inter de Milán': 14,
  'Boca Juniors': 4,
  'River Plate': 4,
  'Independiente': 3,
  'Instituto de Córdoba': 2,
  'Bayern Múnich': 7,
  'Barcelona': 6,
  'Real Madrid': 3 // Apenas 25/26
}

console.log('🚀 ADICIONANDO PRODUTOS FALTANTES\n')

// Filtrar produtos a adicionar
const productsToAdd = []

Object.keys(teamsToAdd).forEach(team => {
  console.log(`\n📁 Processando: ${team}`)

  // Filtrar produtos do time
  let teamProducts = missingProducts.filter(p => p.time === team)

  // Para Real Madrid, filtrar apenas 25/26
  if (team === 'Real Madrid') {
    teamProducts = teamProducts.filter(p => p.ano === '25/26')
  }

  console.log(`   Produtos encontrados: ${teamProducts.length}`)
  console.log(`   Produtos esperados: ${teamsToAdd[team]}`)

  // Limitar à quantidade esperada
  teamProducts = teamProducts.slice(0, teamsToAdd[team])

  // Processar cada produto
  teamProducts.forEach((product, index) => {
    // Criar nome base
    let productName = product.nome
    let slug = product.slug

    // Se slug já existe, adicionar versão
    if (currentSlugs.has(slug) || productsToAdd.some(p => p.slug === slug)) {
      // Contar quantas versões já existem
      let version = 2
      let newName = `${productName} v${version}`
      let newSlug = createSlug(newName)

      while (currentSlugs.has(newSlug) || productsToAdd.some(p => p.slug === newSlug)) {
        version++
        newName = `${productName} v${version}`
        newSlug = createSlug(newName)
      }

      productName = newName
      slug = newSlug
      console.log(`   ✏️  ${product.nome} → ${productName} (slug: ${slug})`)
    } else {
      console.log(`   ✅ ${productName} (slug: ${slug})`)
    }

    // Buscar produto no catálogo para pegar mais informações
    const catalogProduct = catalog.find(c => c.id === product.id)

    // Criar objeto de produto
    const newProduct = {
      id: `gid://shopify/Product/PENDING_${Date.now()}_${index}`,
      name: productName,
      slug: slug,
      price: 36900, // Preço padrão
      regularPrice: null,
      image: '', // Será preenchido depois com as imagens
      imageAlt: `${productName} - Imagem Principal`,
      description: `${productName}\n\nCamiseta retro ${product.time} - Temporada ${product.ano || 'Clássica'}\nTipo: ${product.tipo || 'Retro'}\nLiga: ${product.liga}\n\nMaterial de alta qualidade\nDesign clássico retro\nTamanhos disponíveis: S, M, L, XL, XXL, 3XL\n\n🔥 BLACK NOVEMBER - 33% OFF!`,
      tags: [
        product.time,
        'Futebol',
        product.tipo || 'Retro',
        'Jersey',
        'Retro',
        product.liga
      ],
      stock: 'available',
      metadata: {
        catalogId: product.id,
        folderPath: product.pasta,
        team: product.time,
        year: product.ano,
        type: product.tipo,
        league: product.liga
      }
    }

    productsToAdd.push(newProduct)
  })
})

console.log(`\n\n📊 RESUMO:\n`)
console.log(`Total de produtos a adicionar: ${productsToAdd.length}`)
console.log(`Total atual no products.json: ${currentProducts.length}`)
console.log(`Total após adição: ${currentProducts.length + productsToAdd.length}`)

// Adicionar produtos ao array atual
const updatedProducts = [...currentProducts, ...productsToAdd]

// Salvar products.json atualizado
const outputPath = path.join(__dirname, '../src/data/products-updated.json')
fs.writeFileSync(outputPath, JSON.stringify(updatedProducts, null, 2))

console.log(`\n✅ Arquivo salvo em: products-updated.json`)
console.log(`\n⚠️  PRÓXIMOS PASSOS:`)
console.log(`1. Revisar o arquivo products-updated.json`)
console.log(`2. Adicionar as imagens dos produtos (campo 'image' está vazio)`)
console.log(`3. Renomear products-updated.json para products.json`)
console.log(`4. Fazer upload dos produtos para Shopify`)

// Mostrar breakdown por time
console.log(`\n\n📈 PRODUTOS ADICIONADOS POR TIME:\n`)
const byTeam = {}
productsToAdd.forEach(p => {
  const team = p.metadata.team
  if (!byTeam[team]) {
    byTeam[team] = []
  }
  byTeam[team].push(p)
})

Object.keys(byTeam).sort().forEach(team => {
  console.log(`\n${team} (${byTeam[team].length} produtos):`)
  byTeam[team].forEach(p => {
    console.log(`   - ${p.name}`)
    console.log(`     Slug: ${p.slug}`)
    console.log(`     Pasta: ${p.metadata.folderPath}`)
  })
})
