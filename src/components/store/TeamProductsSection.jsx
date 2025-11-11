'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ProductCard from './ProductCard'
import products from '@/data/products.json'

export default function TeamProductsSection({
  teamName,
  title,
  subtitle,
  filterKey = 'team',
  logo,
  titleColor = 'text-white'
}) {
  const [teamProducts, setTeamProducts] = useState([])

  useEffect(() => {
    // Filtrar produtos por equipe, liga ou nome
    const filtered = products.filter(product => {
      // Filtrar por metadata se existir
      if (product.metadata) {
        if (filterKey === 'team' && product.metadata.team === teamName) {
          return true
        }
        if (filterKey === 'league' && product.metadata.league === teamName) {
          return true
        }
      }

      // Fallback: filtrar por nome do produto
      if (filterKey === 'name') {
        return product.name.toLowerCase().includes(teamName.toLowerCase())
      }

      return false
    })

    // Pegar os primeiros 8 produtos
    setTeamProducts(filtered.slice(0, 8))
  }, [teamName, filterKey])

  if (teamProducts.length === 0) {
    return null
  }

  // Criar slug para a URL
  const collectionSlug = teamName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')

  return (
    <section className="dark:bg-black bg-white py-8 md:py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            {logo && (
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src={logo}
                  alt={`${title} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <h2 className={`text-3xl md:text-4xl font-bebas ${titleColor} tracking-wider`}>
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="dark:text-gray-400 text-gray-600 text-lg mt-4">
              {subtitle}
            </p>
          )}
        </div>

        {/* Grid de Produtos */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {teamProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Ver Todos */}
        <div className="text-center">
          <Link
            href={`/coleccion/${collectionSlug}`}
            className="inline-block dark:border-white/20 dark:hover:border-white/40 dark:text-white dark:hover:bg-white/5 border-2 border-black/20 hover:border-black/40 text-black px-8 py-3 rounded-lg transition-all duration-300 uppercase tracking-wider hover:bg-black/5"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  )
}
