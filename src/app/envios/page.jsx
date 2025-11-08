'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { Truck, MapPin, Clock, Package, CheckCircle, AlertTriangle } from 'lucide-react'

export default function ShippingPage() {
  const deliveryZones = [
    {
      zone: 'CABA (Capital Federal)',
      time: '24-48 horas',
      cost: 'GRATIS en compras superiores a $15.000',
      icon: MapPin
    },
    {
      zone: 'Gran Buenos Aires (GBA)',
      time: '24-72 horas',
      cost: 'GRATIS en compras superiores a $20.000',
      icon: MapPin
    },
    {
      zone: 'Interior de Argentina',
      time: '3-7 días hábiles',
      cost: 'GRATIS en compras superiores a $30.000',
      icon: MapPin
    }
  ]

  const shippingProcess = [
    {
      step: '1',
      title: 'Procesamiento del Pedido',
      description: 'Una vez confirmado tu pago, preparamos tu pedido en un plazo de 24 horas',
      icon: Package
    },
    {
      step: '2',
      title: 'Despacho y Envío',
      description: 'Tu pedido sale de nuestro depósito y es entregado al correo',
      icon: Truck
    },
    {
      step: '3',
      title: 'En Camino',
      description: 'Recibirás un código de seguimiento para rastrear tu envío',
      icon: Clock
    },
    {
      step: '4',
      title: 'Entrega',
      description: 'Tu pedido llega a la dirección indicada. ¡Disfruta tu camiseta!',
      icon: CheckCircle
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
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Plazos de Entrega y Envíos
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Enviamos a toda Argentina con los mejores tiempos de entrega
              </p>
            </motion.div>

            {/* Free Shipping Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-xl p-6 mb-8 text-center"
            >
              <Truck className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-white mb-2">
                ¡Envío Gratis en Toda Argentina!
              </h2>
              <p className="text-gray-300 text-sm">
                En compras superiores a los montos mínimos según tu zona
              </p>
            </motion.div>

            {/* Delivery Zones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Zonas y Plazos de Entrega
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {deliveryZones.map((zone, index) => {
                  const IconComponent = zone.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-bold">{zone.zone}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{zone.time}</span>
                        </div>
                        <p className="text-green-400 font-semibold text-sm">
                          {zone.cost}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Shipping Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                ¿Cómo Funciona el Envío?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {shippingProcess.map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <div key={index} className="relative">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center font-bold text-xl mb-4">
                          {item.step}
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-3">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      {index < shippingProcess.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-white/20"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </motion.div>

            {/* Important Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Información Importante
              </h2>

              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Seguimiento en Tiempo Real:</strong> Recibirás un código de seguimiento por email para rastrear tu pedido en todo momento.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Embalaje Seguro:</strong> Todos nuestros productos son empacados cuidadosamente para garantizar que lleguen en perfectas condiciones.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Intento de Entrega:</strong> El correo realizará hasta 3 intentos de entrega. Si no hay nadie disponible, dejará un aviso.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Dirección Correcta:</strong> Asegúrate de proporcionar una dirección completa y correcta. No nos hacemos responsables por envíos a direcciones incorrectas.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Demoras por Fuerza Mayor:</strong> Los plazos son estimados y pueden verse afectados por condiciones climáticas, huelgas u otras circunstancias fuera de nuestro control.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Preguntas Frecuentes sobre Envíos
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">¿Puedo cambiar la dirección de envío después de realizar el pedido?</h3>
                  <p className="text-gray-300 text-sm">
                    Solo si el pedido aún no ha sido despachado. Contacta con nosotros inmediatamente para verificar si es posible.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">¿Qué hago si no estoy en casa al momento de la entrega?</h3>
                  <p className="text-gray-300 text-sm">
                    El correo dejará un aviso con instrucciones. Podrás coordinar una nueva entrega o retirar el paquete en una sucursal.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">¿Puedo retirar mi pedido personalmente?</h3>
                  <p className="text-gray-300 text-sm">
                    Por el momento solo realizamos envíos. No contamos con punto de retiro.
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-2">¿El envío incluye seguro?</h3>
                  <p className="text-gray-300 text-sm">
                    Sí, todos nuestros envíos están asegurados contra pérdida o daños durante el transporte.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8 text-center"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                ¿Tienes más preguntas sobre envíos?
              </h3>
              <p className="text-gray-300 mb-6">
                Nuestro equipo está disponible para ayudarte con cualquier consulta sobre tu envío.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contacto"
                  className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
                >
                  Contáctanos
                </a>
                <a
                  href="/seguimiento"
                  className="inline-block bg-white/10 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition-all border border-white/20"
                >
                  Rastrear Mi Pedido
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
