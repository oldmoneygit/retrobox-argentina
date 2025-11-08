'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Sparkles, Package, Check } from 'lucide-react'
import OptimizedImage from '@/components/OptimizedImage'

const MYSTERY_BOXES = [
  {
    id: 'premier-league',
    name: 'Premier League',
    slug: 'mystery-box-ultimate-premier-league',
    boxImage: '/images/collections/mysterybox/premierleague.png',
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    slug: 'mystery-box-ultimate-la-liga',
    boxImage: '/images/collections/mysterybox/laliga.png',
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    slug: 'mystery-box-ultimate-serie-a-tim',
    boxImage: '/images/collections/mysterybox/seriea.png',
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    slug: 'mystery-box-ultimate-bundesliga',
    boxImage: '/images/collections/mysterybox/bundesliga.png',
  },
  {
    id: 'ligue-1',
    name: 'Ligue 1',
    slug: 'mystery-box-ultimate-ligue-1',
    boxImage: '/images/collections/mysterybox/ligue1.png',
  },
  {
    id: 'selecoes',
    name: 'Argentina Legends',
    slug: 'mystery-box-ultimate-selecoes',
    boxImage: '/images/collections/mysterybox/argentina.png',
  },
  {
    id: 'fifa',
    name: 'FIFA World Cup',
    slug: 'mystery-box-ultimate-fifa',
    boxImage: '/images/collections/mysterybox/fifa.png',
  }
]

const MysteryBoxBundleSelector = ({ currentProductSlug, onBundleChange }) => {
  const [selectedLeagues, setSelectedLeagues] = useState(new Set())

  // Define calculateDistribution FIRST before using it
  const calculateDistribution = useCallback(() => {
    if (selectedLeagues.size === 0) return []

    const distribution = []
    const totalJerseys = 4 // Siempre 4 camisas
    const selectedArray = Array.from(selectedLeagues)

    // Si solo hay 1 liga seleccionada, todas las 4 camisas son de esa liga
    if (selectedLeagues.size === 1) {
      const boxId = selectedArray[0]
      const box = MYSTERY_BOXES.find(b => b.id === boxId)

      distribution.push({
        name: box.name,
        image: box.boxImage,
        jerseys: 4
      })
    } else {
      // Múltiples ligas: distribuir las 4 camisas proporcionalmente
      const jerseysPerLeague = Math.floor(totalJerseys / selectedLeagues.size)
      const remainingJerseys = totalJerseys - (jerseysPerLeague * selectedLeagues.size)

      selectedArray.forEach((boxId, index) => {
        const box = MYSTERY_BOXES.find(b => b.id === boxId)
        let jerseys = jerseysPerLeague

        // Agregar las camisas restantes a las primeras ligas
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
  }, [selectedLeagues])

  // Inicializar com o produto atual selecionado
  useEffect(() => {
    const currentBox = MYSTERY_BOXES.find(box => box.slug === currentProductSlug)
    if (currentBox) {
      setSelectedLeagues(new Set([currentBox.id]))
    }
  }, [currentProductSlug])

  // Notificar mudanças no bundle para o componente pai
  useEffect(() => {
    onBundleChange({
      selectedLeagues: Array.from(selectedLeagues),
      totalJerseys: 4, // Sempre 4 camisas no total
      distribution: calculateDistribution()
    })
  }, [selectedLeagues, calculateDistribution, onBundleChange])

  const toggleLeague = (boxId) => {
    setSelectedLeagues(prev => {
      const newSet = new Set(prev)
      if (newSet.has(boxId)) {
        // No permitir deseleccionar si es la única seleccionada
        if (newSet.size === 1) return prev
        newSet.delete(boxId)
      } else {
        // Limitar a máximo 4 ligas seleccionadas
        if (newSet.size >= 4) {
          return prev
        }
        newSet.add(boxId)
      }
      return newSet
    })
  }

  const distribution = calculateDistribution()

  return (
    <div className="space-y-6">
      {/* Explicación de la Promoción */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-6 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border-2 border-orange-500/50 rounded-xl overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Gift className="w-6 h-6 text-orange-400 animate-pulse" />
            <h3 className="text-white font-black text-xl uppercase tracking-wide text-center">
              ¡PROMO ESPECIAL MYSTERY BOX!
            </h3>
            <Gift className="w-6 h-6 text-orange-400 animate-pulse" />
          </div>

          <p className="text-center text-white text-base font-semibold mb-2">
            🎁 Recibí <span className="text-orange-400 font-black">4 CAMISETAS LEYENDARIAS</span>
          </p>

          <p className="text-center text-white/80 text-sm leading-relaxed">
            Elegí de qué ligas querés recibir tus camisetas. ¡Podés combinar las que quieras!
          </p>
        </div>
      </motion.div>

      {/* Cómo Funciona */}
      <div className="p-5 bg-white/5 border border-white/20 rounded-lg">
        <h4 className="text-white font-bold text-sm uppercase mb-3 flex items-center gap-2">
          <Package className="w-4 h-4" />
          ¿Cómo funciona?
        </h4>
        <div className="space-y-2 text-sm text-white/70">
          <div className="flex items-start gap-2">
            <span className="text-orange-400 font-bold">•</span>
            <p><span className="font-semibold text-white">1 Liga seleccionada</span> = 4 camisetas de esa liga</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-400 font-bold">•</span>
            <p><span className="font-semibold text-white">2 Ligas seleccionadas</span> = 2 camisetas de cada liga</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-400 font-bold">•</span>
            <p><span className="font-semibold text-white">3-4 Ligas</span> = Distribución proporcional de las 4 camisetas</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-orange-400 font-bold">⚠️</span>
            <p className="text-orange-300"><span className="font-bold text-orange-400">Límite:</span> Máximo 4 ligas por Mystery Box</p>
          </div>
        </div>
      </div>

      {/* Selector de Ligas */}
      <div>
        <h4 className="text-white font-bold text-sm uppercase mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Elegí las ligas que quieras recibir
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
                className={`relative p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'bg-white/10 border-orange-500 shadow-lg shadow-orange-500/20 cursor-pointer'
                    : isDisabled
                    ? 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
                    : 'bg-white/5 border-white/10 hover:border-white/30 cursor-pointer'
                }`}
              >
                {/* Imagen del Box */}
                <div className="relative aspect-square mb-2 rounded-lg overflow-hidden bg-transparent">
                  <OptimizedImage
                    src={box.boxImage}
                    alt={box.name}
                    fill
                    className="object-contain p-2"
                  />

                  {/* Checkmark cuando está seleccionado */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Nombre */}
                <p className={`text-xs font-bold text-center uppercase tracking-wide transition-colors ${
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
            Podés seleccionar hasta 4 ligas para personalizar tu Mystery Box ({selectedLeagues.size}/4)
          </p>
        )}
      </div>

      {/* Preview de Distribución */}
      <AnimatePresence>
        {selectedLeagues.size > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-5 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-bold text-sm uppercase flex items-center gap-2">
                <Package className="w-4 h-4 text-orange-400" />
                Tu Mystery Box
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

            {/* Distribución por Liga */}
            <div className="space-y-2">
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

            {/* Nota sobre distribución */}
            {distribution.length > 0 && (
              <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <p className="text-orange-300 text-xs leading-relaxed">
                  <span className="font-bold">💡 Nota:</span> {distribution.length === 1
                    ? 'Vas a recibir las 4 camisetas de esta liga.'
                    : `Las 4 camisetas se distribuyen entre las ${distribution.length} ligas que elegiste.`
                  }
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advertencia si no hay ligas seleccionadas */}
      {selectedLeagues.size === 0 && (
        <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
          <p className="text-white/60 text-sm">
            Seleccioná al menos una liga para continuar
          </p>
        </div>
      )}
    </div>
  )
}

export default MysteryBoxBundleSelector
