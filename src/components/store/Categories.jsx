'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from './SectionTitle'
import { Flag, Trophy, Shirt } from 'lucide-react'

// Times Argentinos
const timesArgentinos = [
  {
    id: 'boca-juniors',
    name: 'Boca Juniors',
    slug: 'boca-juniors',
    image: '/images/collections/boca-juniors-logo.png',
  },
  {
    id: 'river-plate',
    name: 'River Plate',
    slug: 'river-plate',
    image: '/images/collections/river-plate-logo.png',
  },
  {
    id: 'racing-club',
    name: 'Racing Club',
    slug: 'racing-club',
    image: '/images/collections/racing-club.png',
  },
  {
    id: 'independiente',
    name: 'Independiente',
    slug: 'independiente',
    image: '/images/collections/Independiente.png',
  },
  {
    id: 'san-lorenzo',
    name: 'San Lorenzo',
    slug: 'san-lorenzo',
    image: '/images/collections/San-Lorenzo.png',
  },
  {
    id: 'newells',
    name: "Newell's Old Boys",
    slug: 'newells-old-boys',
    image: '/images/collections/Newell\'s_Old_Boys.png',
  },
]

// Ligas Européias
const ligasEuropeas = [
  {
    id: 'premier-league',
    name: 'Premier League',
    slug: 'premier-league',
    image: '/images/collections/ligas/premierleague.webp',
    country: 'Inglaterra',
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    slug: 'la-liga',
    image: '/images/collections/ligas/laliga.webp',
    country: 'España',
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    slug: 'serie-a',
    image: '/images/collections/ligas/serieA.webp',
    country: 'Italia',
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    slug: 'bundesliga',
    image: '/images/collections/ligas/bundesliga.webp',
    country: 'Alemania',
  },
  {
    id: 'ligue-1',
    name: 'Ligue 1',
    slug: 'ligue-1',
    image: '/images/collections/ligas/ligue1.webp',
    country: 'Francia',
  },
  {
    id: 'liga-portugal',
    name: 'Liga Portugal',
    slug: 'liga-portugal',
    image: '/images/collections/ligas/liga_portugal.webp',
    country: 'Portugal',
  },
]

// Times Europeus
const timesEuropeos = [
  {
    id: 'real-madrid',
    name: 'Real Madrid',
    slug: 'real-madrid',
    image: '/images/collections/Real_Madrid.png',
    liga: 'La Liga',
  },
  {
    id: 'barcelona',
    name: 'FC Barcelona',
    slug: 'fc-barcelona',
    image: '/images/collections/FCBarcelona.svg.png',
    liga: 'La Liga',
  },
  {
    id: 'manchester-united',
    name: 'Manchester United',
    slug: 'manchester-united',
    image: '/images/collections/Manchester_United_FC.png',
    liga: 'Premier League',
  },
  {
    id: 'manchester-city',
    name: 'Manchester City',
    slug: 'manchester-city',
    image: '/images/collections/Manchester_City.png',
    liga: 'Premier League',
  },
  {
    id: 'liverpool',
    name: 'Liverpool',
    slug: 'liverpool',
    image: '/images/collections/liverpool.png',
    liga: 'Premier League',
  },
  {
    id: 'arsenal',
    name: 'Arsenal',
    slug: 'arsenal',
    image: '/images/collections/Arsenal.png',
    liga: 'Premier League',
  },
  {
    id: 'chelsea',
    name: 'Chelsea',
    slug: 'chelsea',
    image: '/images/collections/Chelsea.png',
    liga: 'Premier League',
  },
  {
    id: 'milan',
    name: 'AC Milan',
    slug: 'ac-milan',
    image: '/images/collections/milan.png',
    liga: 'Serie A',
  },
  {
    id: 'psg',
    name: 'PSG',
    slug: 'psg',
    image: '/images/collections/PSG.png',
    liga: 'Ligue 1',
  },
]

const tabs = [
  { id: 'argentina', label: 'Fútbol Argentino', Icon: Flag },
  { id: 'ligas', label: 'Ligas Europeas', Icon: Trophy },
  { id: 'europa', label: 'Equipos Europeos', Icon: Shirt },
]

const Categories = () => {
  const [activeTab, setActiveTab] = useState('argentina')

  const getActiveContent = () => {
    switch (activeTab) {
      case 'argentina':
        return timesArgentinos
      case 'ligas':
        return ligasEuropeas
      case 'europa':
        return timesEuropeos
      default:
        return timesArgentinos
    }
  }

  const activeContent = getActiveContent()

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-gray-dark to-black" id="categories">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionTitle
          title="Explorá Nuestras"
          highlight="Colecciones"
          subtitle="Encontrá las mejores camisetas de tus equipos favoritos"
          className="mb-12"
        />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {tabs.map((tab) => {
            const IconComponent = tab.Icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative px-5 py-2.5 rounded-lg font-bold text-sm transition-all
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-white to-blue-100 text-black shadow-lg shadow-blue-200/30'
                    : 'bg-gray-dark text-white/70 border border-white/10 hover:border-blue-400/50'
                  }
                `}
              >
                <span className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ').pop()}</span>
                </span>

                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-white to-blue-100 rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`
              grid gap-3 md:gap-4 max-w-6xl mx-auto
              ${activeTab === 'argentina' ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6' : ''}
              ${activeTab === 'ligas' ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6' : ''}
              ${activeTab === 'europa' ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5' : ''}
            `}
          >
            {activeContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/coleccion/${item.slug}`}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="relative overflow-hidden rounded-lg aspect-square bg-gradient-to-br from-gray-dark to-black border border-white/10 group-hover:border-blue-400 transition-all"
                  >
                    {/* Image */}
                    <div className="absolute inset-0 p-3 md:p-4 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Overlay com info (desktop only) */}
                    <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity items-end p-3">
                      <div className="w-full">
                        <h3 className="text-white font-bold text-xs mb-0.5 truncate">
                          {item.name}
                        </h3>
                        {(item.country || item.liga) && (
                          <p className="text-white/60 text-[10px] truncate">
                            {item.country || item.liga}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Badge com nome (sempre visível em mobile) */}
                    <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                      <h3 className="text-white font-semibold text-[10px] text-center truncate">
                        {item.name}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link href="/tienda">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-white to-blue-100 text-black font-bold text-sm px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Ver Todas las Camisetas
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Categories
