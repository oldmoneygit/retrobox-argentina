'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { Truck, Clock, MapPin, Package, AlertCircle, CheckCircle } from 'lucide-react'

export default function ShippingTimesPage() {
  const deliveryZones = [
    {
      zone: 'CABA (Capital Federal)',
      icon: MapPin,
      time: '24-48 horas',
      cost: 'Envío gratis en compras superiores a $50.000',
      highlight: true
    },
    {
      zone: 'Gran Buenos Aires (GBA)',
      icon: MapPin,
      time: '48-72 horas',
      cost: 'Envío gratis en compras superiores a $50.000',
      highlight: true
    },
    {
      zone: 'Interior de Buenos Aires',
      icon: MapPin,
      time: '3-5 días hábiles',
      cost: 'Costo según zona'
    },
    {
      zone: 'Resto del País',
      icon: MapPin,
      time: '5-7 días hábiles',
      cost: 'Costo según provincia'
    },
    {
      zone: 'Zonas Remotas',
      icon: MapPin,
      time: '7-10 días hábiles',
      cost: 'Costo según ubicación'
    }
  ]

  const sections = [
    {
      icon: Clock,
      title: 'Procesamiento de Pedidos',
      content: [
        'Una vez confirmado tu pago, procesamos tu pedido en un plazo de 24 horas hábiles.',
        'Recibirás un email de confirmación con los detalles de tu compra.',
        'Cuando tu pedido sea despachado, te enviaremos el código de seguimiento.',
        'Los pedidos realizados los fines de semana o feriados serán procesados el siguiente día hábil.'
      ]
    },
    {
      icon: Truck,
      title: 'Método de Envío',
      content: [
        'Trabajamos con las principales empresas de logística de Argentina:',
        '• Correo Argentino',
        '• Andreani',
        '• OCA',
        'El método de envío puede variar según tu ubicación y disponibilidad.',
        'Todos nuestros envíos incluyen número de seguimiento.'
      ]
    },
    {
      icon: Package,
      title: 'Embalaje y Protección',
      content: [
        'Tus productos son embalados cuidadosamente para garantizar que lleguen en perfecto estado.',
        'Utilizamos materiales de protección de alta calidad.',
        'Cada paquete es sellado y verificado antes del despacho.',
        'Las camisetas se envían dobladas en bolsas protectoras.'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Seguimiento de Pedido',
      content: [
        'Puedes rastrear tu pedido en tiempo real con el código de seguimiento.',
        'Visita nuestra página de seguimiento e ingresa tu número de pedido.',
        'Recibirás notificaciones por email sobre el estado de tu envío.',
        'Si tienes dudas sobre tu pedido, contáctanos en contacto@retrobox.com.ar'
      ]
    }
  ]

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full mb-4 border border-orange-500/30">
                <Truck className="w-8 h-8 text-orange-400" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">
                Plazos de
                <span className="block bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                  Entrega
                </span>
              </h1>
              <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
                Información sobre tiempos de procesamiento y envío a toda Argentina
              </p>
            </motion.div>

            {/* Delivery Zones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-12"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                Tiempos de Entrega por Zona
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deliveryZones.map((zone, index) => {
                  const Icon = zone.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-5 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                        zone.highlight
                          ? 'bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${
                          zone.highlight ? 'bg-orange-500/20' : 'bg-white/10'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            zone.highlight ? 'text-orange-400' : 'text-white'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-base md:text-lg mb-2">
                            {zone.zone}
                          </h3>
                          <div className="space-y-1">
                            <p className="text-white/90 text-sm md:text-base font-semibold">
                              ⏱️ {zone.time}
                            </p>
                            <p className="text-white/60 text-xs md:text-sm">
                              {zone.cost}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Information Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => {
                const Icon = section.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 p-3 bg-white/10 rounded-lg md:rounded-xl">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white pt-2">
                        {section.title}
                      </h2>
                    </div>
                    <div className="space-y-3 text-white/70 text-sm md:text-base ml-0 md:ml-[68px]">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-2 border-orange-500/30 rounded-xl md:rounded-2xl p-6 md:p-8 mt-8"
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold text-lg md:text-xl mb-3">
                    Información Importante
                  </h3>
                  <div className="text-white/70 text-sm md:text-base space-y-2">
                    <p>
                      • Los tiempos de entrega son estimados y pueden variar según condiciones climáticas o logísticas.
                    </p>
                    <p>
                      • Los plazos comienzan a contar desde el despacho del pedido, no desde la confirmación del pago.
                    </p>
                    <p>
                      • Para zonas remotas o de difícil acceso, los tiempos pueden extenderse.
                    </p>
                    <p>
                      • En temporadas de alta demanda (Black Friday, Navidad), los plazos pueden incrementarse.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CTA Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
              <motion.a
                href="/seguimiento"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-6 text-center hover:border-white/30 transition-all group"
              >
                <Package className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-lg mb-2">
                  Rastrear mi Pedido
                </h3>
                <p className="text-white/60 text-sm">
                  Ingresa tu código de seguimiento
                </p>
              </motion.a>

              <motion.a
                href="/contacto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-6 text-center hover:border-white/30 transition-all group"
              >
                <CheckCircle className="w-12 h-12 text-white mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold text-lg mb-2">
                  ¿Necesitas Ayuda?
                </h3>
                <p className="text-white/60 text-sm">
                  Contáctanos para consultas
                </p>
              </motion.a>
            </div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
