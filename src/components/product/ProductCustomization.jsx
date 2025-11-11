'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Type, Hash, Sparkles, Info } from 'lucide-react'

/**
 * ProductCustomization Component
 * Permite al cliente personalizar su camiseta con nombre y número
 *
 * @param {function} onCustomizationChange - Callback cuando cambian los datos de personalización
 * @param {number} customizationPrice - Precio adicional por personalización (default: 5000 ARS)
 */
export default function ProductCustomization({
  onCustomizationChange,
  customizationPrice = 5000
}) {
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [playerNumber, setPlayerNumber] = useState('')

  const handleToggleCustomization = () => {
    const newState = !isCustomizing
    setIsCustomizing(newState)

    // Resetear campos si se desactiva
    if (!newState) {
      setPlayerName('')
      setPlayerNumber('')
      onCustomizationChange?.({
        enabled: false,
        playerName: '',
        playerNumber: '',
        price: 0
      })
    } else {
      onCustomizationChange?.({
        enabled: true,
        playerName,
        playerNumber,
        price: customizationPrice
      })
    }
  }

  const handleNameChange = (e) => {
    const value = e.target.value.toUpperCase().slice(0, 15) // Max 15 caracteres
    setPlayerName(value)
    if (isCustomizing) {
      onCustomizationChange?.({
        enabled: true,
        playerName: value,
        playerNumber,
        price: customizationPrice
      })
    }
  }

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2) // Solo números, max 2 dígitos
    setPlayerNumber(value)
    if (isCustomizing) {
      onCustomizationChange?.({
        enabled: true,
        playerName,
        playerNumber: value,
        price: customizationPrice
      })
    }
  }

  return (
    <div className="space-y-3 md:space-y-4 py-4 dark:border-t dark:border-b dark:border-white/10 border-t border-b border-black/10">
      {/* Header con Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="p-1.5 md:p-2 dark:bg-white bg-black rounded-lg">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 dark:text-black text-white" />
          </div>
          <div>
            <h3 className="dark:text-white text-black font-black text-sm md:text-base uppercase tracking-wide">
              Personalización
            </h3>
            <p className="dark:text-white/60 text-black/60 text-xs">
              Agregá nombre y número
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={handleToggleCustomization}
          className={`relative w-14 h-7 md:w-16 md:h-8 rounded-full transition-all duration-300 ${
            isCustomizing
              ? 'dark:bg-white bg-black'
              : 'dark:bg-white/10 bg-black/10'
          }`}
          aria-label={isCustomizing ? 'Desactivar personalización' : 'Activar personalización'}
        >
          <motion.div
            className={`absolute top-1 w-5 h-5 md:w-6 md:h-6 rounded-full transition-all duration-300 ${
              isCustomizing
                ? 'dark:bg-black bg-white'
                : 'dark:bg-white/60 bg-black/60'
            }`}
            animate={{
              left: isCustomizing ? '1.75rem' : '0.25rem'
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      {/* Precio de Personalización */}
      <AnimatePresence>
        {isCustomizing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3 md:space-y-4"
          >
            {/* Info y Precio */}
            <div className="dark:bg-gradient-to-r dark:from-white/5 dark:to-transparent dark:border-white/10 bg-gradient-to-r from-black/5 to-transparent border border-black/10 rounded-lg p-3 md:p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 dark:text-white/60 text-black/60" />
                  <span className="dark:text-white/80 text-black/80 text-xs md:text-sm">
                    Costo adicional
                  </span>
                </div>
                <span className="dark:text-white text-black font-black text-sm md:text-base">
                  +${customizationPrice.toLocaleString('es-AR')}
                </span>
              </div>
              <p className="dark:text-white/60 text-black/60 text-xs leading-relaxed">
                Incluye estampado de nombre y número en la espalda con tecnología profesional
              </p>
            </div>

            {/* Campos de Entrada */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {/* Campo Nombre */}
              <div className="space-y-2">
                <label className="block dark:text-white text-black font-bold text-xs uppercase tracking-wide flex items-center gap-2">
                  <Type className="w-3.5 h-3.5" />
                  Nombre del Jugador
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={handleNameChange}
                  placeholder="Ej: MARADONA"
                  maxLength={15}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 dark:bg-white/5 dark:text-white dark:border-white/10 dark:focus:border-white/50 dark:placeholder:text-white/40 bg-black/5 text-black border-2 border-black/10 focus:border-black/50 placeholder:text-black/40 rounded-lg font-bold text-sm md:text-base uppercase tracking-wider focus:outline-none transition-colors"
                />
                <p className="dark:text-white/40 text-black/40 text-xs">
                  {playerName.length}/15 caracteres
                </p>
              </div>

              {/* Campo Número */}
              <div className="space-y-2">
                <label className="block dark:text-white text-black font-bold text-xs uppercase tracking-wide flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5" />
                  Número
                </label>
                <input
                  type="text"
                  value={playerNumber}
                  onChange={handleNumberChange}
                  placeholder="Ej: 10"
                  maxLength={2}
                  inputMode="numeric"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 dark:bg-white/5 dark:text-white dark:border-white/10 dark:focus:border-white/50 dark:placeholder:text-white/40 bg-black/5 text-black border-2 border-black/10 focus:border-black/50 placeholder:text-black/40 rounded-lg font-black text-2xl md:text-3xl text-center focus:outline-none transition-colors"
                />
                <p className="dark:text-white/40 text-black/40 text-xs">
                  {playerNumber.length}/2 dígitos
                </p>
              </div>
            </div>

            {/* Preview Simple */}
            {(playerName || playerNumber) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 dark:border-white/20 bg-gradient-to-br from-black/10 to-black/5 border-2 border-black/20 rounded-xl p-4 md:p-6"
              >
                <p className="dark:text-white/60 text-black/60 text-xs uppercase tracking-wide mb-3 text-center">
                  Preview
                </p>
                <div className="flex items-center justify-center gap-4">
                  {playerNumber && (
                    <div className="text-center">
                      <p className="dark:text-white/40 text-black/40 text-xs uppercase mb-1">Número</p>
                      <p className="dark:text-white text-black font-black text-4xl md:text-5xl">
                        {playerNumber}
                      </p>
                    </div>
                  )}
                  {playerName && (
                    <div className="text-center">
                      <p className="dark:text-white/40 text-black/40 text-xs uppercase mb-1">Nombre</p>
                      <p className="dark:text-white text-black font-black text-xl md:text-2xl uppercase tracking-widest">
                        {playerName}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Información Adicional */}
            <div className="flex items-start gap-2 dark:bg-white/5 dark:border-white/10 bg-black/5 border border-black/10 rounded-lg p-3">
              <Info className="w-4 h-4 dark:text-white/60 text-black/60 shrink-0 mt-0.5" />
              <div>
                <p className="dark:text-white/80 text-black/80 text-xs leading-relaxed">
                  <strong className="dark:text-white text-black">Importante:</strong> La personalización se realiza con estampado profesional
                  de alta calidad. Los nombres y números no se destiñen ni agrietan con el uso.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
