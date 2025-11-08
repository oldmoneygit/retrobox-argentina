'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { Heart, Target, Shield, Users, Star, Sparkles } from 'lucide-react'

export default function AboutUsPage() {
  const values = [
    {
      icon: Heart,
      title: 'Pasión por el Fútbol',
      description: 'Somos fanáticos del fútbol y de su historia. Cada camiseta que ofrecemos representa un momento especial en la historia del deporte más hermoso del mundo.'
    },
    {
      icon: Shield,
      title: 'Autenticidad Garantizada',
      description: 'Trabajamos solo con productos auténticos y de la más alta calidad. Tu satisfacción y confianza son nuestra prioridad número uno.'
    },
    {
      icon: Star,
      title: 'Calidad Premium',
      description: 'Seleccionamos cuidadosamente cada producto para garantizar materiales de primera calidad, acabados impecables y durabilidad excepcional.'
    },
    {
      icon: Users,
      title: 'Atención Personalizada',
      description: 'Nuestro equipo está siempre disponible para ayudarte. Creemos en construir relaciones duraderas con cada uno de nuestros clientes.'
    }
  ]

  const reasons = [
    {
      icon: Sparkles,
      title: 'Catálogo Exclusivo',
      description: 'Camisetas retro difíciles de encontrar y ediciones especiales que no verás en cualquier tienda.'
    },
    {
      icon: Target,
      title: 'Enfoque en Argentina',
      description: 'Entendemos el mercado argentino y ofrecemos opciones de envío y pago adaptadas a tus necesidades.'
    },
    {
      icon: Heart,
      title: 'Comunidad Apasionada',
      description: 'Más que una tienda, somos una comunidad de amantes del fútbol retro y la nostalgia deportiva.'
    }
  ]

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sobre Nosotros
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Reviviendo la pasión por las camisetas clásicas del fútbol
              </p>
            </motion.div>

            {/* Our Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-2 border-orange-500/30 rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Retrobox Argentina nace de una pasión compartida: el amor por el fútbol y la nostalgia que evocan
                  las camisetas clásicas. Recordamos esos momentos mágicos en los que nuestros ídolos levantaban
                  copas, marcaban goles históricos y nos hacían soñar.
                </p>
                <p>
                  Cada camiseta retro cuenta una historia. Ya sea la del campeonato inolvidable, el gol que cambió
                  todo, o simplemente el diseño icónico que marcó una época. En Retrobox, queremos que puedas
                  revivir esos momentos y llevar contigo un pedazo de la historia del fútbol.
                </p>
                <p>
                  Hoy, nos enorgullece ser el destino favorito en Argentina para los amantes de las camisetas
                  retro, ofreciendo autenticidad, calidad y una experiencia de compra excepcional.
                </p>
              </div>
            </motion.div>

            {/* Our Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Nuestros Valores
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => {
                  const IconComponent = value.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-bold text-lg">{value.title}</h3>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                ¿Por Qué Elegir Retrobox Argentina?
              </h2>

              <div className="space-y-6">
                {reasons.map((reason, index) => {
                  const IconComponent = reason.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold mb-2">{reason.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {reason.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Mission Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4 text-center">
                Nuestra Misión
              </h2>
              <p className="text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
                En Retrobox Argentina, nuestra misión es conectar a los fanáticos del fútbol con las camisetas
                que representan sus momentos favoritos. Queremos que cada compra sea más que una simple
                transacción: que sea una oportunidad de revivir la pasión, celebrar la historia y vestir
                con orgullo los colores que nos emocionan.
              </p>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8 text-center"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                ¿Listo para Encontrar Tu Camiseta Perfecta?
              </h3>
              <p className="text-gray-300 mb-6">
                Explora nuestro catálogo y descubre las camisetas retro que te harán revivir los mejores momentos del fútbol.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/tienda"
                  className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
                >
                  Ver Tienda
                </a>
                <a
                  href="/contacto"
                  className="inline-block bg-white/10 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition-all border border-white/20"
                >
                  Contáctanos
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
