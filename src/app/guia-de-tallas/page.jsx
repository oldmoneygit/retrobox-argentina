'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { Ruler, AlertCircle, Info } from 'lucide-react'
import { useState } from 'react'

export default function SizeGuidePage() {
  const [selectedGender, setSelectedGender] = useState('hombre')

  const sizeData = {
    hombre: {
      title: 'Tallas para Hombre',
      sizes: [
        { size: 'S', chest: '48', length: '66' },
        { size: 'M', chest: '54', length: '68' },
        { size: 'L', chest: '58', length: '69' },
        { size: 'XL', chest: '61', length: '72' },
        { size: 'XXL', chest: '62', length: '71' },
        { size: '3XL', chest: '64', length: '73' }
      ]
    },
    mujer: {
      title: 'Tallas para Mujer',
      sizes: [
        { size: 'S', chest: '46', length: '64' },
        { size: 'M', chest: '52', length: '66' },
        { size: 'L', chest: '56', length: '67' },
        { size: 'XL', chest: '59', length: '70' },
        { size: 'XXL', chest: '60', length: '69' },
        { size: '3XL', chest: '62', length: '71' }
      ]
    },
    ninos: {
      title: 'Tallas para Niños',
      sizes: [
        { size: '6-8 años', chest: '42', length: '56' },
        { size: '8-10 años', chest: '46', length: '60' },
        { size: '10-12 años', chest: '50', length: '64' },
        { size: '12-14 años', chest: '54', length: '68' }
      ]
    }
  }

  const measurementTips = [
    {
      title: 'Ancho de Pecho',
      description: 'Mide el ancho de la camiseta de axila a axila en la parte frontal. Esta medida determina qué tan ajustada quedará la camiseta en el pecho.'
    },
    {
      title: 'Largo de Camiseta',
      description: 'Mide desde el punto más alto del hombro (cerca del cuello) hasta el borde inferior de la camiseta. Esta medida determina qué tan larga será la camiseta.'
    }
  ]

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <Ruler className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Guía de Tallas
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Encuentra tu talla perfecta con nuestra guía completa. Las camisetas retrô suelen tener un corte clásico.
              </p>
            </motion.div>

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-orange-500/10 border-2 border-orange-500/30 rounded-xl p-6 mb-8 flex items-start gap-4"
            >
              <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-orange-400 font-bold mb-2">Importante</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Las camisetas retrô suelen tener un corte más clásico y ajustado que las modernas.
                  Si prefieres un ajuste más holgado, te recomendamos elegir una talla más grande.
                  Las medidas son aproximadas y pueden variar ligeramente entre diferentes modelos y épocas.
                </p>
              </div>
            </motion.div>

            {/* Gender Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex p-1.5 bg-white/5 rounded-xl border border-white/10 gap-2">
                {[
                  { id: 'hombre', label: 'Hombre' },
                  { id: 'mujer', label: 'Mujer' },
                  { id: 'ninos', label: 'Niños' }
                ].map((gender) => (
                  <button
                    key={gender.id}
                    onClick={() => setSelectedGender(gender.id)}
                    className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                      selectedGender === gender.id
                        ? 'bg-white text-black shadow-lg'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {gender.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Size Table */}
            <motion.div
              key={selectedGender}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                {sizeData[selectedGender].title}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-4 px-4 text-white font-bold">Talla</th>
                      <th className="py-4 px-4 text-white font-bold">Pecho (cm)</th>
                      <th className="py-4 px-4 text-white font-bold">Largo (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData[selectedGender].sizes.map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-4 px-4 text-white font-bold">{row.size}</td>
                        <td className="py-4 px-4 text-gray-300">{row.chest}</td>
                        <td className="py-4 px-4 text-gray-300">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-400 text-sm mt-4 text-center italic">
                * Todas las medidas están en centímetros
              </p>
            </motion.div>

            {/* How to Measure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold text-white">
                  Cómo Tomar tus Medidas
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {measurementTips.map((tip, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-5">
                    <h3 className="text-white font-bold mb-2">{tip.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <h3 className="text-white font-bold mb-2">Consejos Generales</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Para mejor precisión, mide una camiseta que ya tengas y te quede bien</li>
                  <li>• Coloca la camiseta sobre una superficie plana antes de medir</li>
                  <li>• Las medidas de pecho son de axila a axila (solo el frente)</li>
                  <li>• El largo se mide desde el hombro hasta el borde inferior</li>
                  <li>• Las camisetas retro tienen corte clásico - si dudas, elige una talla más grande</li>
                </ul>
              </div>
            </motion.div>

            {/* Fit Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Ajuste Clásico</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Las camisetas retrô tienen un corte tradicional que se ajusta más al cuerpo que las camisetas modernas.
                  Este estilo era característico de los años 80 y 90.
                </p>
                <p className="text-white font-semibold text-sm">
                  Recomendado: Tu talla habitual
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Ajuste Holgado</h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  Si prefieres un ajuste más relajado y cómodo, similar al de las camisetas modernas,
                  te recomendamos elegir una talla más grande.
                </p>
                <p className="text-white font-semibold text-sm">
                  Recomendado: Una talla más grande
                </p>
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8 text-center"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                ¿Tienes Dudas sobre tu Talla?
              </h3>
              <p className="text-gray-300 mb-6">
                Nuestro equipo está aquí para ayudarte a elegir la talla perfecta.
                Contáctanos y te asesoraremos personalmente.
              </p>
              <a
                href="/contacto"
                className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
              >
                Contactar Ahora
              </a>
            </motion.div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
