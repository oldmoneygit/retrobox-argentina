'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Package, Zap, ShoppingCart, Minus, Plus, TrendingDown, Sparkles } from 'lucide-react'

const mysteryBoxes = [
  {
    id: 'premier-league',
    name: 'Premier League',
    image: '/images/collections/mysterybox/premierleague.png',
    slug: 'mysterybox-premier-league',
  },
  {
    id: 'laliga',
    name: 'La Liga',
    image: '/images/collections/mysterybox/laliga.png',
    slug: 'mysterybox-laliga',
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    image: '/images/collections/mysterybox/seriea.png',
    slug: 'mysterybox-seriea',
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    image: '/images/collections/mysterybox/bundesliga.png',
    slug: 'mysterybox-bundesliga',
  },
  {
    id: 'ligue-1',
    name: 'Ligue 1',
    image: '/images/collections/mysterybox/ligue1.png',
    slug: 'mysterybox-ligue1',
  },
  {
    id: 'argentina',
    name: 'Argentina',
    image: '/images/collections/mysterybox/argentina.png',
    slug: 'mysterybox-argentina',
  },
  {
    id: 'fifa',
    name: 'FIFA World Cup',
    image: '/images/collections/mysterybox/fifa.png',
    slug: 'mysterybox-fifa',
  },
]

// Tabela de preços com desconto progressivo
const PRICE_TIERS = [
  { quantity: 1, price: 23900, pricePerBox: 23900, discount: 0, label: 'Black Friday' },
  { quantity: 2, price: 39900, pricePerBox: 19950, discount: 16, label: 'Mejor que 1' },
  { quantity: 3, price: 47700, pricePerBox: 15900, discount: 33, label: 'Gran Ahorro' },
  { quantity: 4, price: 55600, pricePerBox: 13900, discount: 42, label: 'Súper Ahorro' },
  { quantity: 5, price: 59500, pricePerBox: 11900, discount: 50, label: 'MÁXIMO DESCUENTO' },
]

const NORMAL_PRICE = 34900

export default function MysteryBoxBlackFriday() {
  // Estado para rastrear as quantidades de cada liga
  const [selections, setSelections] = useState(
    mysteryBoxes.reduce((acc, box) => ({ ...acc, [box.id]: 0 }), {})
  )

  // Calcular total de camisetas seleccionadas
  const totalSelected = Object.values(selections).reduce((sum, qty) => sum + qty, 0)
  const remainingSlots = 5 - totalSelected
  const canAddToCart = totalSelected >= 1 && totalSelected <= 5

  // Calcular preço baseado na quantidade total
  const getCurrentPriceTier = () => {
    if (totalSelected === 0) return null
    return PRICE_TIERS.find(tier => tier.quantity === totalSelected) || PRICE_TIERS[0]
  }

  const currentTier = getCurrentPriceTier()
  const savings = currentTier ? (NORMAL_PRICE * totalSelected) - currentTier.price : 0

  // Função para incrementar quantidade de uma liga
  const handleIncrement = (leagueId) => {
    if (totalSelected < 5) {
      setSelections(prev => ({
        ...prev,
        [leagueId]: prev[leagueId] + 1
      }))
    }
  }

  // Função para decrementar quantidade de uma liga
  const handleDecrement = (leagueId) => {
    if (selections[leagueId] > 0) {
      setSelections(prev => ({
        ...prev,
        [leagueId]: prev[leagueId] - 1
      }))
    }
  }

  // Função para agregar ao carrito
  const handleAddToCart = () => {
    if (canAddToCart) {
      const selectedLeagues = Object.entries(selections)
        .filter(([_, qty]) => qty > 0)
        .map(([id, qty]) => ({
          league: mysteryBoxes.find(box => box.id === id).name,
          quantity: qty
        }))

      console.log(`MysteryBox: ${totalSelected} boxes por ARS ${currentTier.price.toLocaleString()}`, selectedLeagues)
      alert('MysteryBox agregado al carrito! (funcionalidad en desarrollo)')
    }
  }

  return (
    <section className="py-6 md:py-8 bg-gradient-to-b from-black via-purple-950/10 to-black relative overflow-hidden">
      {/* Background Effects - Sutis */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-3 md:mb-4">
            <Package className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-xs md:text-sm font-bold uppercase">Mystery Box</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white mb-2 md:mb-4 px-4 uppercase">
            ¿TE ANIMÁS A LA{' '}
            <em className="not-italic text-purple-400">SORPRESA</em>?
          </h2>

          <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto px-4">
            Elegí tus ligas favoritas. Cuantas más comprás, más barato sale cada una.
          </p>
        </motion.div>

        {/* Price & Counter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-8 md:mb-12"
        >
          <div className="text-center mb-6 md:mb-8">
            {/* Selection Counter */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-900/40 via-purple-800/40 to-purple-900/40 border-2 border-purple-500/30 rounded-xl px-6 py-4 shadow-lg backdrop-blur-sm mb-4">
              <div className="w-10 h-10 bg-purple-700/60 rounded-full flex items-center justify-center shadow-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-black text-xl md:text-2xl leading-tight">
                  {totalSelected}/5 Mystery Boxes
                </p>
                {remainingSlots > 0 && totalSelected < 5 && (
                  <p className="text-purple-300 text-xs font-medium">
                    Podés agregar {remainingSlots} más
                  </p>
                )}
                {totalSelected === 5 && (
                  <p className="text-yellow-400 text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    ¡Máximo descuento!
                  </p>
                )}
              </div>
            </div>

            {/* Price Display */}
            {currentTier && (
              <motion.div
                key={totalSelected}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto"
              >
                {/* Total Price */}
                <div className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                  <p className="text-white/60 text-xs md:text-sm mb-2">Precio Total</p>
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-3xl md:text-4xl font-black text-green-400">
                      ${(currentTier.price / 1000).toFixed(1)}K
                    </span>
                    {currentTier.discount > 0 && (
                      <span className="px-2 py-1 bg-purple-500 text-white text-xs font-black rounded">
                        -{currentTier.discount}%
                      </span>
                    )}
                  </div>
                  <p className="text-white/20 text-xs line-through">
                    Normal: ${(NORMAL_PRICE * totalSelected).toLocaleString()}
                  </p>
                </div>

                {/* Price Per Box */}
                <div className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                  <p className="text-white/60 text-xs md:text-sm mb-2">Precio c/u</p>
                  <div className="flex items-baseline justify-center gap-2 mb-1">
                    <span className="text-3xl md:text-4xl font-black text-purple-400">
                      ${(currentTier.pricePerBox / 1000).toFixed(1)}K
                    </span>
                  </div>
                  {savings > 0 && (
                    <p className="text-green-400 text-xs font-bold flex items-center justify-center gap-1">
                      <TrendingDown className="w-3 h-3" />
                      Ahorrás ${savings.toLocaleString()}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Mystery Box Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12"
        >
          <h3 className="text-xl md:text-2xl font-black text-white text-center mb-4 md:mb-6">
            Elegí tus Ligas
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4 max-w-6xl mx-auto mb-8">
            {mysteryBoxes.map((box, index) => {
              const quantity = selections[box.id]
              const isMaxed = totalSelected >= 5 && quantity === 0

              return (
                <motion.div
                  key={box.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`group ${isMaxed ? 'opacity-50' : ''}`}
                >
                  <div
                    className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/30 via-gray-dark to-black border-2 transition-all shadow-lg ${
                      quantity > 0
                        ? 'border-purple-500 shadow-purple-500/50'
                        : 'border-purple-500/30'
                    }`}
                  >
                    {/* Image */}
                    <div className="aspect-square p-4 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image
                          src={box.image}
                          alt={box.name}
                          fill
                          className="object-contain drop-shadow-2xl"
                        />
                      </div>
                    </div>

                    {/* Quantity Badge */}
                    {quantity > 0 && (
                      <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-black text-white shadow-lg">
                        {quantity}
                      </div>
                    )}

                    {/* Name */}
                    <div className="bg-gradient-to-t from-black via-black/80 to-transparent p-3">
                      <h4 className="text-white font-bold text-xs text-center truncate mb-2">
                        {box.name}
                      </h4>

                      {/* Controls */}
                      <div className="flex items-center justify-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDecrement(box.id)}
                          disabled={quantity === 0}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            quantity > 0
                              ? 'bg-purple-500 hover:bg-purple-600 text-white'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>

                        <span className="text-white font-bold text-sm w-4 text-center">
                          {quantity}
                        </span>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleIncrement(box.id)}
                          disabled={isMaxed}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            !isMaxed
                              ? 'bg-purple-500 hover:bg-purple-600 text-white'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Price Display */}
          {canAddToCart && currentTier && (
            <div className="text-center mb-3">
              <p className="text-white/60 text-sm mb-1">Total</p>
              <p className="text-3xl md:text-4xl font-black text-orange-400">
                ARS ${currentTier.price.toLocaleString('es-AR')}
              </p>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="text-center">
            <motion.button
              whileHover={canAddToCart ? { scale: 1.02 } : {}}
              whileTap={canAddToCart ? { scale: 0.98 } : {}}
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`inline-flex px-4 md:px-6 py-3 md:py-3.5 rounded-lg font-black text-sm md:text-base shadow-lg transition-all items-center justify-center gap-2 uppercase tracking-wide ${
                canAddToCart
                  ? 'bg-orange-500 text-white shadow-orange-500/50 hover:shadow-xl hover:shadow-orange-500/70 cursor-pointer'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
              {canAddToCart ? (
                'AGREGAR AL CARRITO'
              ) : (
                'SELECCIONÁ AL MENOS 1 MYSTERY BOX'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Price Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-8 md:mb-12"
        >
          <h3 className="text-xl md:text-2xl font-black text-white text-center mb-4 md:mb-6">
            Descuento Progressivo
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {PRICE_TIERS.map((tier) => (
              <div
                key={tier.quantity}
                className={`p-4 rounded-xl border-2 transition-all ${
                  totalSelected === tier.quantity
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-black text-white mb-1">
                    {tier.quantity}x
                  </p>
                  <p className="text-green-400 text-sm md:text-base font-bold mb-1">
                    ${(tier.price / 1000).toFixed(1)}K
                  </p>
                  <p className="text-white/50 text-xs">
                    ${(tier.pricePerBox / 1000).toFixed(1)}K c/u
                  </p>
                  {tier.discount > 0 && (
                    <div className="mt-2 px-2 py-1 bg-purple-500/30 rounded text-purple-300 text-xs font-bold">
                      -{tier.discount}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info Box - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-gray-800 border-2 border-purple-500/30 rounded-xl md:rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-3 md:gap-4">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-purple-400 shrink-0" />
              <div>
                <h3 className="text-lg md:text-xl font-black text-white mb-3">
                  ¿Cómo Funciona?
                </h3>
                <ul className="space-y-2 text-white/70 text-sm md:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Elegí las ligas que querés (hasta 5 Mystery Boxes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Cuantas más comprás, más barato sale cada una</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Cada Mystery Box = 1 camiseta sorpresa de la liga elegida</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Calidad 1:1 garantizada en todas las camisetas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">•</span>
                    <span className="text-white font-bold">Máximo: 5 Mystery Boxes por pedido</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
