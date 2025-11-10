'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from './SectionTitle'
import { Package, Zap, Gift, Shield, Sparkles, HelpCircle, Plus, Minus, AlertCircle, ShoppingCart } from 'lucide-react'

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

const MYSTERYBOX_PRICE = 59900

const benefits = [
  {
    icon: Zap,
    title: 'Sorpresa Garantizada',
    description: 'Recibí 4 camisetas exclusivas sin saber cuáles serán',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Gift,
    title: 'Precio Fijo',
    description: `ARS $${MYSTERYBOX_PRICE.toLocaleString('es-AR')} - Sin importar qué ligas elijas`,
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Calidad Premium 1:1',
    description: 'Réplicas de primera calidad con acabado perfecto',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Sparkles,
    title: 'Combiná Ligas',
    description: 'Elegí las ligas que querés y combiná como prefieras',
    color: 'from-purple-500 to-pink-500',
  },
]

const steps = [
  {
    number: '1',
    title: 'Elegí tus Ligas',
    description: 'Seleccioná hasta 4 ligas diferentes o repetí la misma',
  },
  {
    number: '2',
    title: 'Combiná como Quieras',
    description: '4 ligas distintas, 2 de cada, o todas de la misma liga',
  },
  {
    number: '3',
    title: 'Agregá al Carrito',
    description: 'Confirmá tu selección y completá tu pedido',
  },
  {
    number: '4',
    title: 'Recibí tus Sorpresas',
    description: 'Te enviamos 4 camisetas aleatorias de las ligas elegidas',
  },
]

export default function MysteryBox() {
  // Estado para rastrear las cantidades de cada liga
  const [selections, setSelections] = useState(
    mysteryBoxes.reduce((acc, box) => ({ ...acc, [box.id]: 0 }), {})
  )

  // Calcular total de camisetas seleccionadas
  const totalSelected = Object.values(selections).reduce((sum, qty) => sum + qty, 0)
  const remainingSlots = 4 - totalSelected
  const canAddToCart = totalSelected === 4

  // Función para incrementar cantidad de una liga
  const handleIncrement = (leagueId) => {
    if (totalSelected < 4) {
      setSelections(prev => ({
        ...prev,
        [leagueId]: prev[leagueId] + 1
      }))
    }
  }

  // Función para decrementar cantidad de una liga
  const handleDecrement = (leagueId) => {
    if (selections[leagueId] > 0) {
      setSelections(prev => ({
        ...prev,
        [leagueId]: prev[leagueId] - 1
      }))
    }
  }

  // Función para agregar al carrito
  const handleAddToCart = () => {
    if (canAddToCart) {
      // Aquí iría la lógica para agregar al carrito
      const selectedLeagues = Object.entries(selections)
        .filter(([_, qty]) => qty > 0)
        .map(([id, qty]) => ({
          league: mysteryBoxes.find(box => box.id === id).name,
          quantity: qty
        }))

      console.log('MysteryBox seleccionado:', selectedLeagues)
      alert('MysteryBox agregado al carrito! (funcionalidad en desarrollo)')
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black via-purple-950/20 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-4">
            <Package className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-sm font-bold uppercase tracking-wider">Mystery Box</span>
          </div>

          <SectionTitle
            title="¿Te Animás a la"
            highlight="Sorpresa?"
            subtitle="Recibí 4 camisetas exclusivas sin saber cuáles serán. Elegí tus ligas favoritas y combiná como quieras."
          />
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <HelpCircle className="w-6 h-6 text-purple-400" />
            <h3 className="text-2xl md:text-3xl font-black text-white">
              ¿Cómo Funciona?
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent -translate-x-1/2 z-0" />
                )}

                <div className="relative bg-gradient-to-br from-gray-dark to-black border border-purple-500/30 rounded-xl p-6 h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-black text-white shadow-lg z-10">
                    {step.number}
                  </div>

                  <h4 className="text-white font-bold text-base mb-2 mt-2">
                    {step.title}
                  </h4>
                  <p className="text-white/60 text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-4 mb-16 max-w-6xl mx-auto"
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-dark to-black border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-lg flex items-center justify-center mb-4 shadow-lg`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-white font-bold text-base mb-2">
                  {benefit.title}
                </h4>
                <p className="text-white/60 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mystery Box Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-black text-white mb-6">
              Armá tu MysteryBox Personalizado
            </h3>

            {/* Price and Counter - Side by Side */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-2">
              {/* Price Badge */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 rounded-xl shadow-lg shadow-green-500/30">
                <p className="text-white font-black text-2xl mb-0.5">
                  ARS ${MYSTERYBOX_PRICE.toLocaleString('es-AR')}
                </p>
                <p className="text-white/90 text-xs font-bold uppercase tracking-wide">
                  Precio Fijo - 4 Camisetas
                </p>
              </div>

              {/* Selection Counter */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-900/60 to-pink-900/60 border-2 border-purple-500/50 rounded-xl px-6 py-3 shadow-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-black text-lg leading-tight">
                    {totalSelected}/4 Camisetas
                  </p>
                  {remainingSlots > 0 && (
                    <p className="text-purple-300 text-xs font-medium">
                      Faltan {remainingSlots}
                    </p>
                  )}
                  {canAddToCart && (
                    <p className="text-green-400 text-xs font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                      ¡Listo!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4 max-w-6xl mx-auto mb-8">
            {mysteryBoxes.map((box, index) => {
              const quantity = selections[box.id]
              const isMaxed = totalSelected >= 4 && quantity === 0

              return (
                <motion.div
                  key={box.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`group ${isMaxed ? 'opacity-50' : ''}`}
                >
                  <motion.div
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
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Add to Cart Button */}
          <div className="text-center">
            <motion.button
              whileHover={canAddToCart ? { scale: 1.05 } : {}}
              whileTap={canAddToCart ? { scale: 0.95 } : {}}
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`px-8 py-4 rounded-xl font-black text-lg shadow-lg transition-all inline-flex items-center gap-3 ${
                canAddToCart
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 cursor-pointer'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <div className="text-left">
                {canAddToCart ? (
                  <>
                    <div>Agregar MysteryBox al Carrito</div>
                    <div className="text-sm font-normal opacity-90">ARS ${MYSTERYBOX_PRICE.toLocaleString('es-AR')}</div>
                  </>
                ) : (
                  `Seleccioná ${remainingSlots} camiseta${remainingSlots > 1 ? 's' : ''} más`
                )}
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Important Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-6 mb-8"
        >
          {/* Información Principal */}
          <div className="bg-gradient-to-br from-purple-900/20 to-gray-dark border-2 border-purple-500/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white mb-4">
                  Información Importante
                </h3>
                <ul className="space-y-3 text-white/70 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong className="text-white">Precio Fijo: ARS ${MYSTERYBOX_PRICE.toLocaleString('es-AR')}</strong> - No importa qué ligas o combinación elijas, el precio siempre es el mismo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Cada MysteryBox contiene <strong className="text-white">4 camisetas aleatorias</strong> de las ligas que seleccionaste</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Podés combinar diferentes ligas: <strong className="text-white">4 ligas distintas, 2 de cada, o todas de la misma</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Ejemplo: 1 La Liga + 1 Premier + 1 Serie A + 1 Bundesliga, o 2 La Liga + 2 Premier League</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>No podés elegir el equipo específico, <strong className="text-white">la sorpresa es parte de la experiencia</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Todas las camisetas son <strong className="text-white">réplicas de calidad 1:1</strong> con acabado premium</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Podés recibir desde equipos grandes hasta equipos sorpresa de la liga</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong className="text-white">No se aceptan devoluciones</strong> por la naturaleza aleatoria del producto</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Aviso sobre Pack Insano */}
          <div className="bg-gradient-to-br from-orange-900/20 to-gray-dark border-2 border-orange-500/50 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-white to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-black" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">
                  ⚠️ Importante sobre Pack Insano
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  El <strong className="text-white">MysteryBox NO puede combinarse con la promoción del Pack Insano</strong> en el mismo pedido. Si querés aprovechar el Pack Insano (3x49.900), deberás hacer un pedido separado. El MysteryBox es un producto independiente con su propio precio y condiciones.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
