'use client'

import { useMemo } from 'react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { Shield, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getAllLeagues, getTeamsByLeague, createSlug } from '@/utils/retroProducts'
import OptimizedImage from '@/components/OptimizedImage'

export default function LigaPage({ params }) {
  const ligaSlug = params.liga

  // Find the league name from slug
  const allLeagues = getAllLeagues()
  const leagueName = useMemo(() => {
    return allLeagues.find(league => createSlug(league) === ligaSlug)
  }, [ligaSlug, allLeagues])

  if (!leagueName) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Liga no encontrada</h1>
            <Link href="/colecciones" className="text-white/80 hover:text-white">
              Volver a Colecciones
            </Link>
          </div>
        </main>
        <StoreFooter />
      </>
    )
  }

  const teams = getTeamsByLeague(leagueName)

  // Helper to get first product image for each team
  const getTeamImage = (team) => {
    return `/images/retro/${leagueName}/${team.folderName}/${team.folderName} 06-07 Retro Home/1.jpg`
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
            className="mb-8"
          >
            <Link
              href="/colecciones"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Colecciones
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {leagueName}
            </h1>
            <p className="text-gray-400">
              {teams.length} equipos · {teams.reduce((sum, t) => sum + t.productCount, 0)} camisetas disponibles
            </p>
          </motion.div>

          {/* Teams Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {teams.map((team, index) => (
              <motion.div
                key={team.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={`/colecciones/${ligaSlug}/${createSlug(team.name)}`}
                  className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {/* Team Shield/Logo Area */}
                  <div className="relative aspect-square bg-white/5 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Shield className="w-16 h-16 text-white/20" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Team Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-sm md:text-base line-clamp-2">
                        {team.name}
                      </h3>
                    </div>
                  </div>

                  {/* Product Count */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">
                        {team.productCount} {team.productCount === 1 ? 'camiseta' : 'camisetas'}
                      </span>
                      <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
