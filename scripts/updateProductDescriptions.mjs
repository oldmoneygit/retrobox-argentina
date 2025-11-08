import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../.env.local') })

console.log('📝 SHOPIFY PRODUCT DESCRIPTIONS UPDATER - RETROBOX ARGENTINA\n')

// Verificar credenciais
if (!process.env.SHOPIFY_STORE_DOMAIN || !process.env.SHOPIFY_ADMIN_ACCESS_TOKEN) {
  console.error('❌ ERRO: Credenciais da Shopify não configuradas!')
  console.error('   Verifique se o arquivo .env.local existe e contém:')
  console.error('   - SHOPIFY_STORE_DOMAIN')
  console.error('   - SHOPIFY_ADMIN_ACCESS_TOKEN')
  process.exit(1)
}

const SHOPIFY_API_VERSION = '2024-10'
const SHOPIFY_ADMIN_API = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN

console.log(`🔗 Conectando à loja: ${process.env.SHOPIFY_STORE_DOMAIN}\n`)

/**
 * Fazer request GraphQL para Admin API
 */
async function shopifyAdminRequest(query, variables = {}) {
  const response = await fetch(SHOPIFY_ADMIN_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables })
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
  }

  return data.data
}

/**
 * Buscar todos os produtos com paginação
 */
async function fetchAllProducts() {
  console.log('🔍 Buscando produtos da Shopify...\n')

  const allProducts = []
  let hasNextPage = true
  let cursor = null
  let pageCount = 0

  while (hasNextPage) {
    pageCount++
    console.log(`   Página ${pageCount}...`)

    const query = `
      query getProducts($cursor: String) {
        products(first: 50, after: $cursor) {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              title
              handle
              descriptionHtml
              productType
            }
          }
        }
      }
    `

    const data = await shopifyAdminRequest(query, { cursor })

    const products = data.products.edges.map(edge => edge.node)
    allProducts.push(...products)

    hasNextPage = data.products.pageInfo.hasNextPage
    cursor = data.products.pageInfo.endCursor

    // Delay para rate limit
    if (hasNextPage) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }
  }

  console.log(`\n✅ Total de produtos encontrados: ${allProducts.length}\n`)
  return allProducts
}

/**
 * Extrair informações do título do produto
 * Ex: "AC Milan 02/03 Retro Home" -> { time: "AC Milan", ano: "02/03", tipo: "Home" }
 */
function parseProductTitle(title) {
  // Padrão: "Time Ano Retro Tipo"
  // Ex: "AC Milan 02/03 Retro Home"
  const parts = title.split(' ')

  // Encontrar índice de "Retro"
  const retroIndex = parts.findIndex(p => p.toLowerCase() === 'retro')

  if (retroIndex === -1) {
    // Fallback se não encontrar "Retro"
    return {
      time: title.split(' ')[0],
      ano: '',
      tipo: ''
    }
  }

  // Time é tudo antes do ano
  // Ano é a parte antes de "Retro" (formato XX/XX)
  // Tipo é depois de "Retro"

  let ano = ''
  let timeEndIndex = retroIndex - 1

  // Encontrar ano (formato XX/XX)
  for (let i = retroIndex - 1; i >= 0; i--) {
    if (parts[i].includes('/')) {
      ano = parts[i]
      timeEndIndex = i - 1
      break
    }
  }

  const time = parts.slice(0, timeEndIndex + 1).join(' ')
  const tipo = parts.slice(retroIndex + 1).join(' ')

  return { time, ano, tipo }
}

/**
 * Gerar nova descrição limpa (sem palavras proibidas)
 */
function generateCleanDescription(title, productType) {
  const { time, ano, tipo } = parseProductTitle(title)

  // Verificar se é manga longa (Long Sleeve)
  const isLongSleeve = title.toLowerCase().includes('long sleeve')

  // Descrição simples e limpa (SEM "réplica", "oficial", etc)
  const description = `<p><strong>${title}</strong></p>
<p>Camiseta retro ${time}${ano ? ` - Temporada ${ano}` : ''}</p>
${tipo ? `<p>Tipo: ${tipo}</p>` : ''}
${productType ? `<p>Liga: ${productType}</p>` : ''}
<ul>
<li>Material de alta qualidade</li>
<li>Design clássico retro</li>
<li>Tamanhos disponíveis: S, M, L, XL, XXL, 3XL</li>
${isLongSleeve ? '<li>Manga longa</li>' : ''}
</ul>
<p><strong>🔥 BLACK NOVEMBER - 33% OFF!</strong></p>`

  return description
}

/**
 * Atualizar descrição de um produto
 */
async function updateProductDescription(productId, newDescription) {
  const mutation = `
    mutation productUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          title
          descriptionHtml
        }
        userErrors {
          field
          message
        }
      }
    }
  `

  const data = await shopifyAdminRequest(mutation, {
    input: {
      id: productId,
      descriptionHtml: newDescription
    }
  })

  if (data.productUpdate.userErrors.length > 0) {
    const error = data.productUpdate.userErrors[0]
    throw new Error(`${error.message} (${error.field})`)
  }

  return data.productUpdate.product
}

/**
 * Main - Atualizar todas as descrições
 */
async function main() {
  try {
    const products = await fetchAllProducts()

    if (products.length === 0) {
      console.error('⚠️  Nenhum produto encontrado!')
      process.exit(1)
    }

    console.log('📝 Atualizando descrições...\n')
    console.log('─'.repeat(60))

    let successCount = 0
    let errorCount = 0
    let skippedCount = 0

    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      const progress = `[${i + 1}/${products.length}]`

      console.log(`\n${progress} 📦 ${product.title}`)
      console.log(`   ID: ${product.id}`)

      try {
        // Verificar se a descrição atual contém palavras proibidas
        const currentDesc = product.descriptionHtml || ''
        const hasProhibitedWords =
          currentDesc.toLowerCase().includes('réplica') ||
          currentDesc.toLowerCase().includes('replica') ||
          currentDesc.toLowerCase().includes('oficial')

        if (!hasProhibitedWords && currentDesc.includes('BLACK NOVEMBER')) {
          console.log('   ✓ Descrição já está limpa - pulando')
          skippedCount++
          continue
        }

        // Gerar nova descrição
        const newDescription = generateCleanDescription(product.title, product.productType)

        // Atualizar produto
        console.log('   ⏳ Atualizando...')
        await updateProductDescription(product.id, newDescription)

        console.log('   ✅ Atualizado!')
        successCount++

        // Rate limit: aguardar 500ms entre atualizações
        await new Promise(resolve => setTimeout(resolve, 500))

      } catch (error) {
        console.log(`   ❌ Erro: ${error.message}`)
        errorCount++
      }

      // Progresso a cada 50 produtos
      if ((i + 1) % 50 === 0) {
        console.log('\n' + '─'.repeat(60))
        console.log(`⏱️  Progresso: ${i + 1}/${products.length} produtos`)
        console.log(`   ✅ Atualizados: ${successCount}`)
        console.log(`   ⚠️  Pulados: ${skippedCount}`)
        console.log(`   ❌ Erros: ${errorCount}`)
        console.log('─'.repeat(60))
      }
    }

    // Resumo final
    console.log('\n' + '='.repeat(60))
    console.log('📊 RESUMO FINAL')
    console.log('='.repeat(60))
    console.log(`✅ Descrições atualizadas: ${successCount}`)
    console.log(`⚠️  Produtos pulados: ${skippedCount}`)
    console.log(`❌ Erros: ${errorCount}`)
    console.log(`📦 Total processado: ${products.length}`)
    console.log('='.repeat(60))

    if (successCount > 0) {
      console.log('\n🎉 Descrições atualizadas com sucesso!')
      console.log('📱 Acesse: https://2twsv4-hr.myshopify.com/admin/products')
      console.log('   Para verificar as novas descrições')
    }

    if (errorCount > 0) {
      console.log(`\n⚠️  ${errorCount} atualizações falharam`)
      console.log('💡 Você pode rodar o script novamente para tentar os que falharam')
    }

    console.log('\n✨ Descrições agora estão limpas (sem "réplica oficial" ou termos proibidos)\n')

  } catch (error) {
    console.error('\n❌ Erro fatal:', error.message)
    process.exit(1)
  }
}

// Executar
main()
