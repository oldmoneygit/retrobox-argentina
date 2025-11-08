'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { Shirt, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { getLeaguesWithCount, createSlug } from '@/utils/retroProducts'
import OptimizedImage from '@/components/OptimizedImage'

export default function ColeccionesPage() {
  const leagues = getLeaguesWithCount()

  // Mapeo de imágenes representativas para cada liga (usando las mismas de Nuestras Colecciones)
  const leagueImages = {
    'Premier League': '/images/collections/ligas/premierleague.webp',
    'La Liga': '/images/collections/ligas/laliga.webp',
    'Serie A': '/images/collections/ligas/seriea.webp',
    'Bundesliga': '/images/collections/ligas/bundesliga.webp',
    'Ligue 1': '/images/collections/ligas/ligue1.webp',
    'Brasileirão': '/images/collections/ligas/brasileirao.webp',
    'Primeira Liga': '/images/collections/ligas/liga_portugal.webp',
    'Eredivisie': '/images/collections/ligas/eredivisie.webp',
    'MLS': '/images/collections/ligas/mls.webp',
    'Süper Lig': '/images/collections/ligas/superlig.webp'
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
              <Shirt className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Colecciones Retro
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explora nuestra colección de camisetas retro organizadas por ligas.
              Encuentra las camisetas clásicas de tus equipos favoritos.
            </p>
          </motion.div>

          {/* Leagues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leagues.map((league, index) => (
              <motion.div
                key={league.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/colecciones/${createSlug(league.name)}`}
                  className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  {/* League Image */}
                  <div className="relative aspect-[4/3] bg-white/5 overflow-hidden">
                    {leagueImages[league.name] && (
                      <OptimizedImage
                        src={leagueImages[league.name]}
                        alt={league.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* League Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h2 className="text-2xl font-bold text-white mb-2">
                        {league.name}
                      </h2>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-300">
                        <span className="font-semibold text-white">{league.teamCount}</span> equipos
                      </div>
                      <div className="text-gray-300">
                        <span className="font-semibold text-white">{league.productCount}</span> camisetas
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-white font-semibold group-hover:text-white/80 transition-colors">
                        Ver Colección
                      </span>
                      <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Stats Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8 text-center"
          >
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {leagues.length}
                </div>
                <div className="text-gray-300 text-sm">
                  Ligas
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {leagues.reduce((sum, l) => sum + l.teamCount, 0)}
                </div>
                <div className="text-gray-300 text-sm">
                  Equipos
                </div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {leagues.reduce((sum, l) => sum + l.productCount, 0)}
                </div>
                <div className="text-gray-300 text-sm">
                  Camisetas
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
