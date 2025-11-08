'use client'

import { useState } from 'react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { Search, Package, Truck, MapPin, CheckCircle, Clock, AlertCircle, Mail } from 'lucide-react'

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleTrackOrder = (e) => {
    e.preventDefault()
    setIsSearching(true)
    // Aquí iría la lógica para rastrear el pedido
    // Por ahora solo simula una búsqueda
    setTimeout(() => {
      setIsSearching(false)
      alert('Función de rastreo en desarrollo. Por favor, contacta con nuestro soporte para información sobre tu pedido.')
    }, 1500)
  }

  const trackingSteps = [
    {
      icon: Package,
      title: 'Pedido Confirmado',
      description: 'Tu pedido ha sido recibido y está siendo preparado'
    },
    {
      icon: Clock,
      title: 'En Preparación',
      description: 'Estamos empacando tu pedido cuidadosamente'
    },
    {
      icon: Truck,
      title: 'En Camino',
      description: 'Tu pedido ha sido despachado y está en tránsito'
    },
    {
      icon: CheckCircle,
      title: 'Entregado',
      description: 'Tu pedido ha sido entregado exitosamente'
    }
  ]

  const faqs = [
    {
      question: '¿Cuándo recibiré mi código de seguimiento?',
      answer: 'Recibirás tu código de seguimiento por email dentro de las 24 horas posteriores a la confirmación de tu pedido.'
    },
    {
      question: '¿Qué hago si mi código de seguimiento no funciona?',
      answer: 'Si tu código de seguimiento no muestra información, espera unas horas ya que puede tardar en actualizarse. Si el problema persiste, contáctanos.'
    },
    {
      question: '¿Puedo cambiar la dirección de entrega después de realizar el pedido?',
      answer: 'Solo si el pedido aún no ha sido despachado. Contacta con nosotros inmediatamente para verificar si es posible.'
    },
    {
      question: '¿Qué hago si mi pedido está retrasado?',
      answer: 'Los plazos son estimados. Si tu pedido supera el tiempo estimado, contáctanos con tu número de pedido para verificar el estado.'
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
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Seguimiento de Pedido
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Rastrea tu pedido en tiempo real e conoce dónde está tu camiseta
              </p>
            </motion.div>

            {/* Tracking Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Search className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">
                  Ingresa los Datos de Tu Pedido
                </h2>
              </div>

              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-300 mb-2">
                    Número de Pedido *
                  </label>
                  <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Ej: RB-2024-00123"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Lo encontrarás en el email de confirmación de tu pedido
                  </p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email de Compra *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSearching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Rastrear Pedido
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-orange-300">
                    <strong>Nota:</strong> También puedes rastrear tu pedido usando el código de seguimiento del correo
                    que te enviamos por email. Si tienes algún problema, no dudes en contactarnos.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tracking Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Estados del Pedido
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {trackingSteps.map((step, index) => {
                  const IconComponent = step.icon
                  return (
                    <div key={index} className="relative">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-white font-bold mb-2">{step.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-white/20"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Alternative Tracking Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Otras Formas de Rastrear Tu Pedido
              </h2>

              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Código de Seguimiento del Correo</h3>
                    <p className="text-sm">
                      Usa el código de seguimiento que te enviamos por email directamente en el sitio web del correo
                      para obtener información detallada de la ubicación de tu paquete.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email de Confirmación</h3>
                    <p className="text-sm">
                      Revisa tu email de confirmación de envío. Allí encontrarás el enlace directo para rastrear
                      tu pedido y todos los detalles del mismo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">Contacto Directo</h3>
                    <p className="text-sm">
                      Si prefieres, puedes contactarnos directamente por WhatsApp o email con tu número de pedido
                      y te brindaremos información actualizada del estado de tu envío.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Preguntas Frecuentes sobre Seguimiento
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8 text-center"
            >
              <Mail className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                ¿Necesitas Ayuda con Tu Pedido?
              </h3>
              <p className="text-gray-300 mb-6">
                Si tienes algún problema para rastrear tu pedido o necesitas más información, estamos aquí para ayudarte.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contacto"
                  className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
                >
                  Contáctanos
                </a>
                <a
                  href="/envios"
                  className="inline-block bg-white/10 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition-all border border-white/20"
                >
                  Ver Plazos de Entrega
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
