'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getAllProducts } from '@/utils/products'
import ProductCard from '@/components/store/ProductCard'
import { Sparkles } from 'lucide-react'

export default function RelatedProducts({ currentProduct, limit = 6 }) {
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        const allProducts = await getAllProducts()
        
        // Filtrar produtos relacionados
        // Prioridade: mesmo time/tags, depois produtos aleatórios
        const filtered = allProducts
          .filter(p => p.id !== currentProduct.id && p.slug !== currentProduct.slug)
          .filter(p => p.stock !== 'soldout') // Apenas produtos disponíveis
        
        // Tentar encontrar produtos com tags similares
        const currentTags = currentProduct.tags || []
        const currentName = currentProduct.name?.toLowerCase() || ''
        
        // Extrair time do nome (Boca, River, Argentina, etc.)
        const teamKeywords = ['boca', 'river', 'argentina', 'racing', 'independiente', 'san lorenzo', 'estudiantes', 'gimnasia', 'huracán', 'vélez', 'newells', 'rosario central', 'talleres', 'belgrano', 'colón', 'unión']
        const currentTeam = teamKeywords.find(keyword => currentName.includes(keyword))
        
        let related = []
        
        if (currentTeam) {
          // Filtrar por time
          related = filtered.filter(p => {
            const productName = p.name?.toLowerCase() || ''
            return productName.includes(currentTeam)
          })
        }
        
        // Se não encontrou muitos produtos relacionados por time, adicionar por tags
        if (related.length < limit && currentTags.length > 0) {
          const tagRelated = filtered.filter(p => {
            const productTags = p.tags || []
            return productTags.some(tag => currentTags.includes(tag))
          })
          
          // Combinar e remover duplicatas
          const combined = [...related, ...tagRelated]
          related = combined.filter((p, index, self) => 
            index === self.findIndex(pr => pr.id === p.id)
          )
        }
        
        // Se ainda não tem produtos suficientes, adicionar aleatórios
        if (related.length < limit) {
          const remaining = filtered.filter(p => !related.some(r => r.id === p.id))
          const shuffled = [...remaining].sort(() => Math.random() - 0.5)
          related = [...related, ...shuffled].slice(0, limit)
        } else {
          // Embaralhar e limitar
          related = [...related].sort(() => Math.random() - 0.5).slice(0, limit)
        }
        
        setRelatedProducts(related)
      } catch (error) {
        console.error('Error fetching related products:', error)
        setRelatedProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProduct, limit])

  if (loading) {
    return null // Não mostrar nada enquanto carrega
  }

  if (relatedProducts.length === 0) {
    return null // Não mostrar se não houver produtos relacionados
  }

  return (
    <section className="py-8 md:py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <div className="p-2 bg-white rounded-lg">
              <Sparkles className="w-5 h-5 text-black" />
            </div>
            <h2 className="text-white font-black text-xl md:text-2xl lg:text-3xl uppercase tracking-wide">
              Productos Relacionados
            </h2>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

