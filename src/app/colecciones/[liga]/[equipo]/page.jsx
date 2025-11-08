'use client'

import { useMemo } from 'react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getAllLeagues, getTeamsByLeague, getProductsByTeam, createSlug, getProductMainImage, getProductPrice, getCompareAtPrice, formatPrice } from '@/utils/retroProducts'
import OptimizedImage from '@/components/OptimizedImage'

export default function EquipoPage({ params }) {
  const ligaSlug = params.liga
  const equipoSlug = params.equipo

  // Find league and team
  const allLeagues = getAllLeagues()
  const leagueName = useMemo(() => {
    return allLeagues.find(league => createSlug(league) === ligaSlug)
  }, [ligaSlug, allLeagues])

  const teamName = useMemo(() => {
    if (!leagueName) return null
    const teams = getTeamsByLeague(leagueName)
    const team = teams.find(t => createSlug(t.name) === equipoSlug)
    return team?.name
  }, [leagueName, equipoSlug])

  const products = useMemo(() => {
    if (!teamName || !leagueName) return []
    return getProductsByTeam(teamName, leagueName)
  }, [teamName, leagueName])

  if (!leagueName || !teamName) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Equipo no encontrado</h1>
            <Link href="/colecciones" className="text-white/80 hover:text-white">
              Volver a Colecciones
            </Link>
          </div>
        </main>
        <StoreFooter />
      </>
    )
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-2 text-sm"
          >
            <Link
              href="/colecciones"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Colecciones
            </Link>
            <span className="text-gray-600">/</span>
            <Link
              href={`/colecciones/${ligaSlug}`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {leagueName}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white">{teamName}</span>
          </motion.div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {teamName}
            </h1>
            <p className="text-gray-400">
              {products.length} {products.length === 1 ? 'camiseta disponible' : 'camisetas disponibles'}
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group h-full flex flex-col"
              >
                <Link
                  href={`/colecciones/${ligaSlug}/${equipoSlug}/${product.id}`}
                  className="flex-1 flex flex-col"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] bg-white rounded-2xl overflow-hidden mb-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <OptimizedImage
                        src={getProductMainImage(product)}
                        alt={product.nome_completo}
                        fill
                        className="object-cover transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </motion.div>

                    {/* Black November Badge */}
                    <div className="absolute top-2 right-2 z-10">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-full">
                        🔥 33% OFF
                      </div>
                    </div>

                    {/* Extras Badge */}
                    {product.extras && product.extras.length > 0 && (
                      <div className="absolute top-2 left-2 z-10">
                        <div className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-bold px-2 py-1 rounded-md">
                          {product.extras.join(' · ')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2 flex-1 flex flex-col">
                    <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2 group-hover:text-white/80 transition-colors flex-1">
                      {product.nome_completo}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-xs uppercase">
                        {product.tipo}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {product.ano}
                      </span>
                    </div>

                    {/* Price with discount */}
                    <div className="space-y-0.5">
                      <p className="text-gray-400 text-xs line-through">
                        ${formatPrice(getCompareAtPrice(product))}
                      </p>
                      <p className="text-white font-bold text-lg md:text-xl">
                        ${formatPrice(getProductPrice(product))}
                      </p>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white text-black font-bold py-2 md:py-2.5 rounded-full group-hover:bg-gray-200 transition-all duration-300 transform uppercase text-[10px] md:text-xs text-center"
                    >
                      VER DETALLES
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No Products */}
          {products.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-400 mb-6">
                No hay camisetas disponibles para este equipo actualmente.
              </p>
              <Link
                href={`/colecciones/${ligaSlug}`}
                className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver a {leagueName}
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
