/**
 * Script de teste para verificar imagens da Shopify
 */

import { getProductByHandle } from './src/lib/shopifyAdmin.js'

async function testShopifyImages() {
  console.log('🔍 Testando busca de imagens na Shopify...\n')

  const testSlug = 'boca-juniors-03-04-retro-home-long-sleeve'

  try {
    console.log(`📦 Buscando produto: ${testSlug}`)
    const product = await getProductByHandle(testSlug)

    if (!product) {
      console.log('❌ Produto não encontrado na Shopify')
      return
    }

    console.log('✅ Produto encontrado!')
    console.log(`📝 Título: ${product.title}`)
    console.log(`🔗 Handle: ${product.handle}`)

    if (product.images && product.images.edges) {
      console.log(`\n📸 Total de imagens: ${product.images.edges.length}`)

      product.images.edges.forEach((edge, index) => {
        console.log(`\nImagem ${index + 1}:`)
        console.log(`  URL: ${edge.node.url}`)
        console.log(`  Alt: ${edge.node.altText || '(sem texto alternativo)'}`)
      })
    } else {
      console.log('\n❌ Nenhuma imagem encontrada')
    }

  } catch (error) {
    console.error('❌ Erro ao buscar produto:', error.message)
    console.error('Stack:', error.stack)
  }
}

testShopifyImages()
