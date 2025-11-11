'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { Mail, Instagram, MapPin } from 'lucide-react'
import { SOCIAL_LINKS, LOCATION_DATA } from '@/utils/constants'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui se integraría con un servicio de email o API
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen dark:bg-black dark:text-white bg-white text-black transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold dark:text-white text-black mb-4 text-center">
              Contáctanos
            </h1>
            <p className="dark:text-gray-medium text-gray-600 text-center mb-12">
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="dark:bg-white/5 dark:border-white/10 bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl p-6">
                  <MapPin className="dark:text-white text-black mb-4" size={32} />
                  <h3 className="dark:text-white text-black font-bold text-lg mb-2">Ubicación</h3>
                  <p className="dark:text-gray-medium text-gray-600">{LOCATION_DATA.fullAddress}</p>
                </div>

                <div className="dark:bg-white/5 dark:border-white/10 bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl p-6">
                  <Mail className="dark:text-white text-black mb-4" size={32} />
                  <h3 className="dark:text-white text-black font-bold text-lg mb-2">Email</h3>
                  <a href="mailto:contacto@retroboxargentina.com" className="dark:text-gray-medium dark:hover:text-white text-gray-600 hover:text-black transition-colors">
                    contacto@retroboxargentina.com
                  </a>
                </div>

                <a
                  href="https://instagram.com/retrobox.arg"
                  target="_blank"
                  rel="noopener noreferrer"
                className="block bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="dark:text-white text-black font-bold text-lg mb-1">Instagram</h3>
                    <p className="dark:text-white/60 text-black/60 text-sm mb-2">Seguinos para ofertas exclusivas</p>
                    <p className="text-pink-400 font-bold">@retrobox.arg</p>
                    <p className="dark:text-white/40 text-black/40 text-xs mt-2">Novedades diarias</p>
                  </div>
                </div>
              </a>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="dark:bg-white/5 dark:border-white/10 bg-black/5 backdrop-blur-sm border border-black/10 rounded-xl p-6"
              >
                <h3 className="dark:text-white text-black font-bold text-lg mb-6">Envíanos un mensaje</h3>
                
                {submitted ? (
                  <div className="text-center py-8">
                    <p className="dark:text-white text-black text-lg font-semibold mb-2">¡Mensaje enviado!</p>
                    <p className="dark:text-gray-medium text-gray-600">Te responderemos pronto</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block dark:text-white text-black font-semibold mb-2">Nombre</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder-gray-medium dark:focus:border-white/40 bg-black/10 border border-black/20 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-black/40 transition-colors"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label className="block dark:text-white text-black font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full px-4 py-3 dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder-gray-medium dark:focus:border-white/40 bg-black/10 border border-black/20 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-black/40 transition-colors"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block dark:text-white text-black font-semibold mb-2">Mensaje</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="w-full px-4 py-3 dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder-gray-medium dark:focus:border-white/40 bg-black/10 border border-black/20 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:border-black/40 transition-colors resize-none"
                        placeholder="Tu mensaje..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-light bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-gray-dark transition-colors"
                    >
                      Enviar Mensaje
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}

