'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Flag, Trophy, Shirt, Star } from 'lucide-react'

// Ligas Principales
const ligas = [
  {
    name: 'Premier League',
    slug: 'premier-league',
    image: '/images/collections/ligas/premierleague.webp',
    country: 'Inglaterra'
  },
  {
    name: 'La Liga',
    slug: 'la-liga',
    image: '/images/collections/ligas/laliga.webp',
    country: 'España'
  },
  {
    name: 'Serie A',
    slug: 'serie-a',
    image: '/images/collections/ligas/serieA.webp',
    country: 'Italia'
  },
  {
    name: 'Bundesliga',
    slug: 'bundesliga',
    image: '/images/collections/ligas/bundesliga.webp',
    country: 'Alemania'
  },
  {
    name: 'Ligue 1',
    slug: 'ligue-1',
    image: '/images/collections/ligas/ligue1.webp',
    country: 'Francia'
  },
  {
    name: 'Brasileirão',
    slug: 'brasileirao',
    image: '/images/collections/ligas/brasileirao.webp',
    country: 'Brasil'
  }
]

// Times Argentinos Populares
const timesArgentinos = [
  {
    name: 'Boca Juniors',
    slug: 'boca-juniors',
    image: '/images/collections/boca-juniors-logo.png'
  },
  {
    name: 'River Plate',
    slug: 'river-plate',
    image: '/images/collections/river-plate-logo.png'
  },
  {
    name: 'Racing Club',
    slug: 'racing-club',
    image: '/images/collections/racing-club.png'
  },
  {
    name: 'Independiente',
    slug: 'independiente',
    image: '/images/collections/Independiente.png'
  },
  {
    name: 'San Lorenzo',
    slug: 'san-lorenzo',
    image: '/images/collections/San-Lorenzo.png'
  },
  {
    name: "Newell's Old Boys",
    slug: 'newells-old-boys',
    image: '/images/collections/Newell\'s_Old_Boys.png'
  },
  {
    name: 'Rosario Central',
    slug: 'rosario-central',
    image: '/images/collections/Rosário-Central.png'
  }
]

// Times Internacionais Populares
const timesInternacionais = [
  {
    name: 'Real Madrid',
    slug: 'real-madrid',
    image: '/images/collections/Real_Madrid.png',
    liga: 'La Liga'
  },
  {
    name: 'FC Barcelona',
    slug: 'fc-barcelona',
    image: '/images/collections/FCBarcelona.svg.png',
    liga: 'La Liga'
  },
  {
    name: 'Manchester United',
    slug: 'manchester-united',
    image: '/images/collections/Manchester_United_FC.png',
    liga: 'Premier League'
  },
  {
    name: 'Manchester City',
    slug: 'manchester-city',
    image: '/images/collections/Manchester_City.png',
    liga: 'Premier League'
  },
  {
    name: 'Liverpool',
    slug: 'liverpool',
    image: '/images/collections/liverpool.png',
    liga: 'Premier League'
  },
  {
    name: 'Arsenal',
    slug: 'arsenal',
    image: '/images/collections/Arsenal.png',
    liga: 'Premier League'
  },
  {
    name: 'Chelsea',
    slug: 'chelsea',
    image: '/images/collections/Chelsea.png',
    liga: 'Premier League'
  },
  {
    name: 'AC Milan',
    slug: 'ac-milan',
    image: '/images/collections/milan.png',
    liga: 'Serie A'
  },
  {
    name: 'PSG',
    slug: 'psg',
    image: '/images/collections/PSG.png',
    liga: 'Ligue 1'
  },
  {
    name: 'Inter Miami',
    slug: 'inter-miami',
    image: '/images/collections/Inter-miami.png',
    liga: 'MLS'
  }
]

// Seleções
const selecoes = [
  {
    name: 'Argentina',
    slug: 'seleccion-argentina',
    image: '/images/collections/argentina-logo.png',
    description: 'Tri Campeón del Mundo',
    type: 'seleccion'
  }
]

const tabs = [
  { id: 'argentina', label: 'Clubes Argentinos', Icon: Flag, collections: timesArgentinos },
  { id: 'europa', label: 'Europa', Icon: Shirt, collections: timesInternacionais },
  { id: 'ligas', label: 'Ligas', Icon: Trophy, collections: ligas },
  { id: 'seleccion', label: 'Selección', Icon: Star, collections: selecoes },
]

// Componente de Carrossel para cada categoria
const CollectionCarousel = ({ collections }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 640px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 4 },
        '(min-width: 1280px)': { slidesToScroll: 5 }
      }
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-3 md:gap-4">
        {collections.map((item, index) => (
          <div
            key={`${item.slug}-${index}`}
            className="flex-[0_0_calc(50%-6px)] min-w-0 sm:flex-[0_0_calc(33.333%-10px)] md:flex-[0_0_calc(25%-12px)] lg:flex-[0_0_calc(20%-16px)]"
          >
            <Link href={`/coleccion/${item.slug}`}>
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                className="relative aspect-[4/3] dark:bg-white/5 dark:border-white/10 bg-black/5 border border-black/10 rounded-lg overflow-hidden dark:hover:border-blue-400/50 hover:border-blue-400/50 transition-all group backdrop-blur-sm"
              >
                <div className="absolute inset-0 p-2 md:p-3 flex flex-col items-center justify-center">
                  <div className="relative w-full h-12 md:h-14 mb-1.5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-[10px] md:text-xs font-bold dark:text-white text-black text-center mb-0.5 line-clamp-1">
                    {item.name}
                  </h4>
                  {(item.country || item.liga || item.description) && (
                    <p className="text-[9px] md:text-[10px] dark:text-white/50 text-black/50 text-center line-clamp-1">
                      {item.country || item.liga || item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function NuestrasColecciones() {
  const [activeTab, setActiveTab] = useState('argentina')

  const activeTabData = tabs.find(tab => tab.id === activeTab)

  return (
    <section className="py-6 md:py-8 dark:bg-black bg-white transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 md:mb-6"
        >
          <h2 className="text-2xl md:text-3xl font-black dark:text-white text-black mb-2">
            Nuestras Colecciones
          </h2>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4 md:mb-6"
        >
          {tabs.map((tab) => {
            const IconComponent = tab.Icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative px-4 md:px-6 py-2 md:py-2.5 rounded-lg font-bold text-xs md:text-sm transition-all
                  ${activeTab === tab.id
                    ? 'dark:bg-gradient-to-r dark:from-white dark:to-blue-100 dark:text-black dark:shadow-blue-200/30 bg-gradient-to-r from-black to-gray-800 text-white shadow-lg shadow-gray-200/30'
                    : 'dark:bg-white/5 dark:text-white/70 dark:border-white/10 dark:hover:border-blue-400/50 dark:hover:bg-white/10 bg-black/5 text-black/70 border border-black/10 hover:border-blue-400/50 hover:bg-black/10'
                  }
                `}
              >
                <span className="flex items-center gap-1.5 md:gap-2">
                  <IconComponent className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{tab.label}</span>
                </span>

                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 dark:bg-gradient-to-r dark:from-white dark:to-blue-100 bg-gradient-to-r from-black to-gray-800 rounded-lg -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Carousel Content - Animated by Tab */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <CollectionCarousel collections={activeTabData.collections} />
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/tienda">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="dark:bg-gradient-to-r dark:from-white dark:to-blue-100 dark:text-black bg-gradient-to-r from-black to-gray-800 text-white font-black text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Ver Todas las Camisetas
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
