'use client'

import { useState } from 'react'
import { X, Ruler, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SIZE_GUIDE_ARGENTINA_MALE } from '@/utils/constants'

export default function SizeGuide({ isOpen, onClose, sizes }) {
  const [selectedTab, setSelectedTab] = useState('tabla')

  // Sempre mostrar TODOS os talles disponíveis no guia, não apenas os do produto
  const allSizes = Object.keys(SIZE_GUIDE_ARGENTINA_MALE)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-[#0a0a0a] border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20 bg-black/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Ruler className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Guía de Talles</h2>
                <p className="text-sm text-white/70">Jerseys Masculinas - Sistema Argentino</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/20 px-6 bg-black/40">
            <button
              onClick={() => setSelectedTab('tabla')}
              className={`px-4 py-3 font-semibold text-sm transition-all border-b-2 ${
                selectedTab === 'tabla'
                  ? 'text-white border-white'
                  : 'text-white/60 border-transparent hover:text-white/90'
              }`}
            >
              Tabla de Medidas
            </button>
            <button
              onClick={() => setSelectedTab('como-medir')}
              className={`px-4 py-3 font-semibold text-sm transition-all border-b-2 ${
                selectedTab === 'como-medir'
                  ? 'text-white border-white'
                  : 'text-white/60 border-transparent hover:text-white/90'
              }`}
            >
              Cómo Medir
            </button>
            <button
              onClick={() => setSelectedTab('equivalencias')}
              className={`px-4 py-3 font-semibold text-sm transition-all border-b-2 ${
                selectedTab === 'equivalencias'
                  ? 'text-white border-white'
                  : 'text-white/60 border-transparent hover:text-white/90'
              }`}
            >
              Equivalencias
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh] bg-black/30">
            {selectedTab === 'tabla' && (
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-white">
                      <p className="font-semibold mb-1">Medidas en centímetros (cm)</p>
                      <p className="text-white/80">Todas las medidas corresponden al contorno del cuerpo, no de la prenda.</p>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto bg-black/40 rounded-lg border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20 bg-white/5">
                        <th className="text-left py-3 px-4 text-white font-bold uppercase text-xs tracking-wide">
                          Talle ARG
                        </th>
                        <th className="text-center py-3 px-4 text-white font-bold uppercase text-xs tracking-wide">
                          Pecho (cm)
                        </th>
                        <th className="text-center py-3 px-4 text-white font-bold uppercase text-xs tracking-wide">
                          Cintura (cm)
                        </th>
                        <th className="text-center py-3 px-4 text-white font-bold uppercase text-xs tracking-wide">
                          Brasil
                        </th>
                        <th className="text-center py-3 px-4 text-white font-bold uppercase text-xs tracking-wide">
                          USA
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSizes.map((size) => {
                        const data = SIZE_GUIDE_ARGENTINA_MALE[size]
                        if (!data) return null
                        return (
                          <tr key={size} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                            <td className="py-3 px-4">
                              <span className="inline-block bg-white text-black font-bold text-sm px-3 py-1 rounded">
                                {size}
                              </span>
                            </td>
                            <td className="text-center py-3 px-4 text-white font-medium">{data.pecho}</td>
                            <td className="text-center py-3 px-4 text-white font-medium">{data.cintura}</td>
                            <td className="text-center py-3 px-4 text-white/90">{data.equivalencias.brasil}</td>
                            <td className="text-center py-3 px-4 text-white/90">{data.equivalencias.usa}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedTab === 'como-medir' && (
              <div className="space-y-6">
                <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <Ruler className="w-5 h-5" />
                    Cómo Tomar las Medidas
                  </h3>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Contorno de Pecho</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Medí alrededor de la parte más ancha del pecho, manteniendo la cinta métrica horizontal y
                          asegurándote de que esté ajustada pero no apretada. Mantené los brazos relajados a los costados.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Contorno de Cintura</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Medí alrededor de tu cintura natural, justo encima del ombligo. No aprietes la cinta métrica
                          y respirá normalmente durante la medición.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-white text-black rounded-lg flex items-center justify-center font-bold text-xl flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Elegí tu Talle</h4>
                        <p className="text-white/80 text-sm leading-relaxed">
                          Compará tus medidas con nuestra tabla. Si estás entre dos talles,
                          te recomendamos elegir el más grande para mayor comodidad.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/15 rounded-lg p-4 border border-white/20">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-white">
                      <p className="font-semibold mb-1">💡 Consejo Profesional</p>
                      <p className="text-white/90">
                        Para un ajuste perfecto, medite sobre una camiseta fina o remera básica.
                        Nuestras jerseys tienen un fit clásico que permite movimiento cómodo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'equivalencias' && (
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <h3 className="text-white font-bold text-lg mb-2">Tabla de Equivalencias Internacionales</h3>
                  <p className="text-white/80 text-sm">
                    Conversión de talles argentinos a otros sistemas de medición
                  </p>
                </div>

                <div className="overflow-x-auto bg-black/40 rounded-lg border border-white/10">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/20 bg-white/5">
                        <th className="text-left py-3 px-4 text-white font-bold uppercase text-xs tracking-wide">
                          Argentina
                        </th>
                        <th className="text-center py-3 px-4 text-white font-bold uppercase text-xs tracking-wide">
                          Brasil
                        </th>
                        <th className="text-center py-3 px-4 text-white font-bold uppercase text-xs tracking-wide">
                          USA
                        </th>
                        <th className="text-center py-3 px-4 text-white font-bold uppercase text-xs tracking-wide">
                          Europa
                        </th>
                        <th className="text-center py-3 px-4 text-white font-bold uppercase text-xs tracking-wide">
                          Descripción
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSizes.map((size) => {
                        const data = SIZE_GUIDE_ARGENTINA_MALE[size]
                        if (!data) return null
                        const descriptions = {
                          'S': 'Pequeño',
                          'M': 'Mediano',
                          'L': 'Grande',
                          'XL': 'Extra Grande',
                          'XXL': 'Doble Extra Grande',
                          '3XL': 'Triple Extra Grande'
                        }
                        return (
                          <tr key={size} className="border-b border-white/10 hover:bg-white/10 transition-colors">
                            <td className="py-3 px-4">
                              <span className="inline-block bg-white text-black font-bold text-sm px-3 py-1 rounded">
                                {size}
                              </span>
                            </td>
                            <td className="text-center py-3 px-4 text-white font-medium">{data.equivalencias.brasil}</td>
                            <td className="text-center py-3 px-4 text-white font-medium">{data.equivalencias.usa}</td>
                            <td className="text-center py-3 px-4 text-white font-medium">{data.equivalencias.europa}</td>
                            <td className="text-center py-3 px-4 text-white/80 text-xs">{descriptions[size]}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="bg-white/15 rounded-lg p-4 border border-white/20 mt-4">
                  <p className="text-white text-sm">
                    <span className="font-semibold">Nota:</span>{' '}
                    <span className="text-white/90">
                      Los talles pueden variar ligeramente según el fabricante y el tipo de jersey.
                      Estas equivalencias son aproximadas para jerseys deportivas estilo retro.
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/20 p-6 bg-black/60">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-white/70 text-sm">
                ¿Necesitás ayuda con tu talle?{' '}
                <a href="/contacto" className="text-white hover:text-white/80 font-semibold underline">
                  Contactanos
                </a>
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
