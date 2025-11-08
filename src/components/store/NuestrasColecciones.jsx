'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from './SectionTitle'

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
    description: 'Tri Campeón del Mundo'
  }
]

export default function NuestrasColecciones() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <SectionTitle
            title="Nuestras"
            highlight="Colecciones"
            subtitle="Explorá nuestra amplia selección de camisetas de los mejores equipos y ligas del mundo"
          />
        </motion.div>

        {/* Seleção Argentina - Destaque */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
            ⭐ Selección Nacional
          </h3>
          <Link
            href={`/coleccion/${selecoes[0].slug}`}
            className="block max-w-2xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative h-64 bg-gradient-to-br from-blue-600 via-white to-blue-400 rounded-3xl overflow-hidden border-4 border-yellow-400 shadow-2xl"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto mb-4">
                    <Image
                      src={selecoes[0].image}
                      alt={selecoes[0].name}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                  <h4 className="text-3xl font-black text-blue-900 mb-2">
                    {selecoes[0].name}
                  </h4>
                  <p className="text-xl font-bold text-blue-700">
                    {selecoes[0].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Ligas Principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
            🏆 Ligas Principales
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {ligas.map((liga, index) => (
              <motion.div
                key={liga.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/coleccion/${liga.slug}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="relative aspect-square bg-gradient-to-br from-gray-dark to-black rounded-2xl overflow-hidden border-2 border-white/10 hover:border-orange-500 transition-all group"
                  >
                    <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
                      <div className="relative w-full h-24 mb-3">
                        <Image
                          src={liga.image}
                          alt={liga.name}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <h4 className="text-sm font-bold text-white text-center">
                        {liga.name}
                      </h4>
                      <p className="text-xs text-white/60 text-center">
                        {liga.country}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Times Argentinos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
            🇦🇷 Fútbol Argentino
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {timesArgentinos.map((time, index) => (
              <motion.div
                key={time.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/coleccion/${time.slug}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="relative aspect-square bg-gradient-to-br from-gray-dark to-black rounded-2xl overflow-hidden border-2 border-white/10 hover:border-blue-400 transition-all group"
                  >
                    <div className="absolute inset-0 p-3 flex flex-col items-center justify-center">
                      <div className="relative w-full h-20 mb-2">
                        <Image
                          src={time.image}
                          alt={time.name}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-white text-center">
                        {time.name}
                      </h4>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Times Internacionais Populares */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
            🌍 Equipos Internacionales
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {timesInternacionais.map((time, index) => (
              <motion.div
                key={time.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/coleccion/${time.slug}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="relative aspect-square bg-gradient-to-br from-gray-dark to-black rounded-2xl overflow-hidden border-2 border-white/10 hover:border-yellow-400 transition-all group"
                  >
                    <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
                      <div className="relative w-full h-24 mb-2">
                        <Image
                          src={time.image}
                          alt={time.name}
                          fill
                          className="object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <h4 className="text-sm font-bold text-white text-center mb-1">
                        {time.name}
                      </h4>
                      <p className="text-xs text-white/60 text-center">
                        {time.liga}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
              className="bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-black text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Ver Todas las Camisetas
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
