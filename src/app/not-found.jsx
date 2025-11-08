'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { Home, Search, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  const popularLinks = [
    {
      icon: ShoppingBag,
      title: 'Ver Tienda',
      description: 'Explora nuestro catálogo completo',
      href: '/tienda'
    },
    {
      icon: Search,
      title: 'Colecciones',
      description: 'Descubre camisetas por liga o equipo',
      href: '/colecciones'
    },
    {
      icon: Home,
      title: 'Inicio',
      description: 'Volver a la página principal',
      href: '/'
    }
  ]

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black text-white flex items-center">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* 404 Graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="relative">
                {/* Large 404 Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[120px] md:text-[200px] font-bold leading-none"
                >
                  <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                    404
                  </span>
                </motion.div>

                {/* Soccer ball animation overlay */}
                <motion.div
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 360 }}
                  transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 md:w-12 md:h-12 text-white" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¡Página No Encontrada!
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Parece que esta camiseta se fue al vestuario. La página que buscas no existe o ha sido movida.
              </p>
            </motion.div>

            {/* Popular Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold text-white mb-6 text-center">
                ¿A dónde querés ir?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {popularLinks.map((link, index) => {
                  const IconComponent = link.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-all">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-bold mb-1 group-hover:text-white/80 transition-colors">
                              {link.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {link.description}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                ¿Necesitas Ayuda?
              </h3>
              <p className="text-gray-300 text-center mb-6">
                Si crees que esto es un error o necesitas ayuda para encontrar algo específico, no dudes en contactarnos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
                >
                  Contáctanos
                </Link>
                <Link
                  href="/tienda"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-all border border-white/20"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Ir a la Tienda
                </Link>
              </div>
            </motion.div>

            {/* Fun Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="text-center mt-8"
            >
              <p className="text-gray-500 text-sm">
                Error 404: Esta camiseta no está en nuestra colección... aún 😉
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
