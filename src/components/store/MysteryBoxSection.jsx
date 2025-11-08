'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import OptimizedImage from '@/components/OptimizedImage'
import SectionTitle from './SectionTitle'
import StockCounter from './StockCounter'
import { Gift, BookOpen, Sparkles, Package, Check, ShoppingCart, Zap, AlertCircle } from 'lucide-react'

// Preço do Mystery Box
const MYSTERY_BOX_PRICE = 59900 // $59.900 ARS
const MYSTERY_BOX_ORIGINAL_PRICE = 99900 // $99.900 ARS
const MYSTERY_BOX_DISCOUNT = 40 // 40% OFF

// Pack Insano Price for comparison
const PACK_INSANO_PRICE = 49900 // $49.900 ARS

const MYSTERY_BOXES = [
  {
    id: 'premier-league',
    name: 'Premier League',
    slug: 'mystery-box-ultimate-premier-league',
    boxImage: '/images/collections/mysterybox/premierleague.png',
    price: MYSTERY_BOX_PRICE,
    originalPrice: MYSTERY_BOX_ORIGINAL_PRICE,
    discount: MYSTERY_BOX_DISCOUNT,
    examples: ['Thierry Henry (Arsenal)', 'Cristiano Ronaldo (Man Utd)', 'Drogba (Chelsea)', 'Y muchos más...']
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    slug: 'mystery-box-ultimate-la-liga',
    boxImage: '/images/collections/mysterybox/laliga.png',
    price: MYSTERY_BOX_PRICE,
    originalPrice: MYSTERY_BOX_ORIGINAL_PRICE,
    discount: MYSTERY_BOX_DISCOUNT,
    examples: ['Ronaldinho (Barcelona)', 'Raúl (Real Madrid)', 'Fernando Torres (Atlético)', 'Y muchos más...']
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    slug: 'mystery-box-ultimate-serie-a-tim',
    boxImage: '/images/collections/mysterybox/seriea.png',
    price: MYSTERY_BOX_PRICE,
    originalPrice: MYSTERY_BOX_ORIGINAL_PRICE,
    discount: MYSTERY_BOX_DISCOUNT,
    examples: ['Ronaldo (Inter)', 'Paolo Maldini (AC Milan)', 'Del Piero (Juventus)', 'Y muchos más...']
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    slug: 'mystery-box-ultimate-bundesliga',
    boxImage: '/images/collections/mysterybox/bundesliga.png',
    price: MYSTERY_BOX_PRICE,
    originalPrice: MYSTERY_BOX_ORIGINAL_PRICE,
    discount: MYSTERY_BOX_DISCOUNT,
    examples: ['Beckenbauer (Bayern)', 'Klopp (Dortmund)', 'Ballack (Leverkusen)', 'Y muchos más...']
  },
  {
    id: 'ligue-1',
    name: 'Ligue 1',
    slug: 'mystery-box-ultimate-ligue-1',
    boxImage: '/images/collections/mysterybox/ligue1.png',
    price: MYSTERY_BOX_PRICE,
    originalPrice: MYSTERY_BOX_ORIGINAL_PRICE,
    discount: MYSTERY_BOX_DISCOUNT,
    examples: ['Ronaldinho (PSG)', 'Zidane (Marseille)', 'Juninho (Lyon)', 'Y muchos más...']
  },
  {
    id: 'selecoes',
    name: 'Argentina Legends',
    slug: 'mystery-box-ultimate-selecoes',
    boxImage: '/images/collections/mysterybox/argentina.png',
    price: MYSTERY_BOX_PRICE,
    originalPrice: MYSTERY_BOX_ORIGINAL_PRICE,
    discount: MYSTERY_BOX_DISCOUNT,
    examples: ['Maradona', 'Messi', 'Batistuta', 'Y muchos más...']
  },
  {
    id: 'fifa',
    name: 'FIFA World Cup',
    slug: 'mystery-box-ultimate-fifa',
    boxImage: '/images/collections/mysterybox/fifa.png',
    price: MYSTERY_BOX_PRICE,
    originalPrice: MYSTERY_BOX_ORIGINAL_PRICE,
    discount: MYSTERY_BOX_DISCOUNT,
    examples: ['Diego Maradona (1986)', 'Pelé (1970)', 'Zinedine Zidane (1998)', 'Y muchos más...']
  }
]

const MysteryBoxSection = () => {
  const [selectedLeagues, setSelectedLeagues] = useState(new Set())

  const toggleLeague = (boxId) => {
    setSelectedLeagues(prev => {
      const newSet = new Set(prev)
      if (newSet.has(boxId)) {
        newSet.delete(boxId)
      } else {
        if (newSet.size >= 4) return prev
        newSet.add(boxId)
      }
      return newSet
    })
  }

  const calculateDistribution = () => {
    if (selectedLeagues.size === 0) return []

    const distribution = []
    const totalJerseys = 4
    const selectedArray = Array.from(selectedLeagues)

    if (selectedLeagues.size === 1) {
      const boxId = selectedArray[0]
      const box = MYSTERY_BOXES.find(b => b.id === boxId)

      distribution.push({
        name: box.name,
        image: box.boxImage,
        jerseys: 4
      })
    } else {
      const jerseysPerLeague = Math.floor(totalJerseys / selectedLeagues.size)
      const remainingJerseys = totalJerseys - (jerseysPerLeague * selectedLeagues.size)

      selectedArray.forEach((boxId, index) => {
        const box = MYSTERY_BOXES.find(b => b.id === boxId)
        let jerseys = jerseysPerLeague

        if (index < remainingJerseys) {
          jerseys += 1
        }

        distribution.push({
          name: box.name,
          image: box.boxImage,
          jerseys: jerseys
        })
      })
    }

    return distribution
  }

  const distribution = calculateDistribution()

  return (
    <section id="mysterybox" className="relative py-16 md:py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <SectionTitle
          title="Mystery Box"
          highlight="Ultimate"
          subtitle="¿Te atreves a descubrir qué camisetas legendarias recibirás?"
          className="mb-6"
        />

        {/* Stock Counter - Destaque */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-8"
        >
          <StockCounter productId="mystery-box-general" initialStock={80} />
        </motion.div>

        {/* Benefits Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 max-w-6xl mx-auto"
        >
          {[
            {
              icon: Gift,
              title: '+1 Camiseta Gratis',
              description: '4 camisetas por el precio de 3'
            },
            {
              icon: Sparkles,
              title: 'Solo Leyendas',
              description: 'Jugadores icónicos garantizados'
            },
            {
              icon: BookOpen,
              title: 'Mini Libro',
              description: 'Historia de cada camiseta incluida'
            },
            {
              icon: Package,
              title: 'Sorpresa Total',
              description: 'La emoción de lo inesperado'
            }
          ].map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-3">
                  <IconComponent size={24} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-sm mb-1">{benefit.title}</h3>
                <p className="text-gray-400 text-xs">{benefit.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Comparison Section: Pack Insano vs Mystery Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-12"
        >
          <h3 className="text-white font-bold text-xl md:text-2xl mb-6 text-center flex items-center justify-center gap-2">
            <Zap className="text-yellow-400" size={28} />
            ¿Cuál Promoción Elegir?
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pack Insano Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 px-3 py-1 rounded-full mb-4">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-bold text-xs uppercase">Tú Eliges</span>
                </div>

                <h4 className="text-white font-black text-2xl mb-3">Pack Insano</h4>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-white font-black text-3xl">${(PACK_INSANO_PRICE / 100).toLocaleString('es-AR')}</span>
                  <span className="text-gray-400 text-sm">55% OFF</span>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-white/90">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">3 Camisetas</strong> que VOS elegís</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/90">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Envío gratis</strong> incluido</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/90">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Cualquier equipo/jugador</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/90">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Control total de tu compra</span>
                  </li>
                </ul>

                <Link
                  href="/#blackfriday"
                  className="block w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-orange-400 transition-all text-center"
                >
                  Ver Pack Insano
                </Link>
              </div>
            </motion.div>

            {/* Mystery Box Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-500/20 to-orange-500/20 border-2 border-orange-500/50 rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/50 px-3 py-1 rounded-full mb-4">
                  <Gift className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-400 font-bold text-xs uppercase">Sorpresa</span>
                </div>

                <h4 className="text-white font-black text-2xl mb-3">Mystery Box</h4>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-white font-black text-3xl">${(MYSTERY_BOX_PRICE / 100).toLocaleString('es-AR')}</span>
                  <span className="text-gray-400 text-sm">40% OFF</span>
                </div>

                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2 text-white/90">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">4 Camisetas</strong> sorpresa</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/90">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Solo leyendas</strong> icónicas</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/90">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Mini libro</strong> con cada camiseta</span>
                  </li>
                  <li className="flex items-start gap-2 text-white/90">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Elegís las ligas que querés</span>
                  </li>
                </ul>

                <button
                  onClick={() => {
                    document.getElementById('mystery-box-selector')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-purple-500 text-white font-black py-3 px-6 rounded-lg hover:from-orange-400 hover:to-purple-400 transition-all"
                >
                  Armar Mi Mystery Box
                </button>
              </div>
            </motion.div>
          </div>

          {/* Important Rules */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-white font-bold text-sm mb-2">📋 Reglas Importantes:</h5>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• <strong className="text-white">Solo podés elegir UNA promoción por compra</strong> (Pack Insano O Mystery Box)</li>
                  <li>• Si querés combinar, podés comprar Mystery Box + camisetas individuales (a precio normal)</li>
                  <li>• No se pueden combinar ambas promociones en la misma compra</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Como Funciona */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 mb-12 max-w-4xl mx-auto"
          id="mystery-box-selector"
        >
          <h3 className="text-white font-bold text-xl md:text-2xl mb-4 text-center flex items-center justify-center gap-2">
            <Package size={28} />
            ¿Cómo Funciona el Mystery Box?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-white/90">
            <div className="text-center">
              <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">1</div>
              <h4 className="font-semibold mb-2">Elige tu Liga</h4>
              <p className="text-sm text-gray-300">Selecciona la liga o selección de tu preferencia</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">2</div>
              <h4 className="font-semibold mb-2">Recibe 4 Camisetas</h4>
              <p className="text-sm text-gray-300">Jugadores legendarios seleccionados cuidadosamente</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">3</div>
              <h4 className="font-semibold mb-2">Colecciona Historias</h4>
              <p className="text-sm text-gray-300">Cada camiseta viene con su mini libro de historia</p>
            </div>
          </div>
        </motion.div>

        {/* Interactive League Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-12"
        >
          {/* Promo Banner */}
          <div className="relative p-6 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-500/50 rounded-xl overflow-hidden mb-6">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Gift className="w-6 h-6 text-orange-400 animate-pulse" />
                <h3 className="text-white font-black text-xl md:text-2xl uppercase tracking-wide text-center">
                  ¡Armá Tu Mystery Box Personalizado!
                </h3>
                <Gift className="w-6 h-6 text-orange-400 animate-pulse" />
              </div>

              <p className="text-center text-white text-base font-semibold mb-2">
                🎁 Elegí las ligas que quieras y recibí <span className="text-orange-400 font-black">4 CAMISETAS LEYENDARIAS</span>
              </p>

              <p className="text-center text-white/80 text-sm leading-relaxed">
                Combiná hasta 4 ligas diferentes y personalizá tu experiencia única
              </p>
            </div>
          </div>

          {/* League Selector Grid */}
          <div className="mb-6">
            <h4 className="text-white font-bold text-sm uppercase mb-4 flex items-center gap-2 justify-center">
              <Sparkles className="w-5 h-5" />
              Seleccioná tus ligas favoritas (Máx. 4)
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {MYSTERY_BOXES.map((box) => {
                const isSelected = selectedLeagues.has(box.id)
                const isDisabled = !isSelected && selectedLeagues.size >= 4

                return (
                  <motion.button
                    key={box.id}
                    onClick={() => toggleLeague(box.id)}
                    disabled={isDisabled}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={!isDisabled ? { scale: 1.05 } : {}}
                    className={`relative p-3 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'bg-white/10 border-orange-500 shadow-lg shadow-orange-500/20 cursor-pointer'
                        : isDisabled
                        ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                        : 'bg-white/5 border-white/10 hover:border-white/30 cursor-pointer'
                    }`}
                  >
                    <div className="relative aspect-square mb-2 rounded-lg overflow-hidden bg-transparent">
                      <OptimizedImage
                        src={box.boxImage}
                        alt={box.name}
                        fill
                        className="object-contain p-2"
                      />

                      {isSelected && (
                        <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                            <Check className="w-6 h-6 text-white" strokeWidth={3} />
                          </div>
                        </div>
                      )}
                    </div>

                    <p className={`text-[10px] md:text-xs font-bold text-center uppercase tracking-wide transition-colors ${
                      isSelected ? 'text-orange-400' : 'text-white'
                    }`}>
                      {box.name}
                    </p>
                  </motion.button>
                )
              })}
            </div>

            {selectedLeagues.size >= 4 ? (
              <p className="text-orange-400 text-xs mt-3 text-center font-semibold">
                ⚠️ Límite alcanzado: Máximo 4 ligas por Mystery Box
              </p>
            ) : (
              <p className="text-white/60 text-xs mt-3 text-center italic">
                Seleccioná hasta 4 ligas para personalizar tu Mystery Box ({selectedLeagues.size}/4)
              </p>
            )}
          </div>

          {/* Distribution Preview */}
          <AnimatePresence>
            {selectedLeagues.size > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-bold text-sm uppercase flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-400" />
                    Tu Mystery Box Personalizado
                  </h4>
                  <div className="flex items-center gap-4">
                    <span className="text-white/60 text-xs">
                      {selectedLeagues.size} {selectedLeagues.size === 1 ? 'Liga' : 'Ligas'}
                    </span>
                    <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 rounded-full text-orange-400 text-xs font-black">
                      4 CAMISETAS
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {distribution.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-transparent">
                          <OptimizedImage
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <span className="text-white font-semibold text-sm">{item.name}</span>
                      </div>
                      <span className="text-orange-400 font-black text-sm">
                        {item.jerseys} {item.jerseys === 1 ? 'camisa' : 'camisas'}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/product/${MYSTERY_BOXES[0].slug}`}
                    className="flex-1 bg-white text-black font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Comprar Mystery Box - ${(MYSTERY_BOX_PRICE / 100).toLocaleString('es-AR')}
                  </Link>
                </div>

                <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <p className="text-orange-300 text-xs leading-relaxed">
                    <span className="font-bold">💡 Nota:</span> {distribution.length === 1
                      ? 'Vas a recibir las 4 camisetas de esta liga.'
                      : `Las 4 camisetas se distribuyen entre las ${distribution.length} ligas que elegiste.`
                    }
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Divider */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <p className="text-white/60 text-xs uppercase tracking-wider">O explorá por liga individual</p>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>

        {/* Mystery Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {MYSTERY_BOXES.map((box, index) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/product/${box.slug}`}>
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all hover:shadow-2xl hover:shadow-white/10">
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-lg font-bold text-sm z-10">
                    -{box.discount}%
                  </div>

                  {/* QUEIMA DE ESTOQUE Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-2.5 py-1 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg whitespace-nowrap">
                      <span className="mr-1">🔥</span>
                      POR TIEMPO LIMITADO
                    </div>
                  </div>

                  {/* Mystery Box Image */}
                  <div className="relative h-72 flex items-center justify-center p-6">
                    <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                      <OptimizedImage
                        src={box.boxImage}
                        alt={`Mystery Box ${box.name}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg mb-2">{box.name}</h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-gray-400 line-through text-sm">
                        ${(box.originalPrice / 100).toLocaleString('es-AR')}
                      </span>
                      <span className="text-white font-bold text-xl">
                        ${(box.price / 100).toLocaleString('es-AR')}
                      </span>
                    </div>

                    {/* Examples */}
                    <div className="bg-white/5 rounded-lg p-3 mb-3">
                      <p className="text-xs text-gray-400 mb-2 font-semibold">Ejemplos de leyendas:</p>
                      <ul className="text-xs text-white/80 space-y-1">
                        {box.examples.slice(0, 3).map((example, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <Sparkles size={10} className="text-yellow-400 flex-shrink-0" />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-all group-hover:scale-105">
                      Descubrir Sorpresa
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 max-w-3xl mx-auto"
        >
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            <strong className="text-white">¿Por qué elegir Mystery Box?</strong><br />
            Es la experiencia perfecta para los verdaderos amantes del fútbol. Recibirás camisetas de jugadores legendarios que marcaron historia,
            con la emoción de no saber exactamente cuáles llegarán. Además, <strong className="text-white">recibes 4 camisetas por el precio de 3</strong>,
            y cada una viene con un mini libro contando la historia del jugador y ese momento icónico.
            ¡Una experiencia única de coleccionismo que no puedes perderte!
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default MysteryBoxSection
