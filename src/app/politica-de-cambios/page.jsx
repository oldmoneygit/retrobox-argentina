'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { RefreshCw, Package, Clock, CheckCircle, XCircle, Mail } from 'lucide-react'

export default function ReturnsPolicyPage() {
  const sections = [
    {
      icon: Clock,
      title: '1. Plazo para Cambios y Devoluciones',
      content: [
        'Tienes 30 días corridos desde la fecha de recepción del producto para solicitar un cambio o devolución.',
        'El producto debe estar en perfectas condiciones, sin usar, con todas sus etiquetas y en su embalaje original.',
        'Pasado este plazo, lamentablemente no podremos procesar tu solicitud de cambio o devolución.'
      ],
      highlight: true
    },
    {
      icon: CheckCircle,
      title: '2. Condiciones para Aceptar Cambios/Devoluciones',
      content: [
        'Para que podamos procesar tu solicitud, el producto debe cumplir con las siguientes condiciones:',
        '✓ Estar sin uso, sin lavado y sin modificaciones',
        '✓ Conservar todas las etiquetas originales adheridas',
        '✓ Estar en su embalaje original',
        '✓ No presentar daños, manchas, olores o signos de uso',
        '✓ Incluir todos los accesorios y documentación que venían con el producto'
      ]
    },
    {
      icon: XCircle,
      title: '3. Productos No Retornables',
      content: [
        'Por razones de higiene y seguridad, los siguientes productos NO pueden ser cambiados ni devueltos:',
        '✗ Productos personalizados o con nombre y número',
        '✗ Productos en oferta especial o liquidación',
        '✗ Productos que hayan sido lavados o usados',
        '✗ Productos sin etiquetas o con etiquetas dañadas',
        '✗ Mystery Boxes (debido a su naturaleza de producto sorpresa)'
      ]
    },
    {
      icon: RefreshCw,
      title: '4. Proceso de Cambio',
      content: [
        'Para solicitar un cambio, sigue estos pasos:',
        '1. Contacta con nuestro servicio de atención al cliente en contacto@retrobox.com.ar',
        '2. Proporciona tu número de pedido y el motivo del cambio',
        '3. Espera la confirmación y las instrucciones de envío',
        '4. Envía el producto siguiendo las instrucciones proporcionadas',
        '5. Una vez recibido y verificado, procesaremos tu cambio en un plazo de 5 a 7 días hábiles',
        'Los gastos de envío del cambio corren por cuenta del cliente, excepto en casos de productos defectuosos o error en el envío.'
      ]
    },
    {
      icon: Package,
      title: '5. Proceso de Devolución y Reembolso',
      content: [
        'Para solicitar una devolución y reembolso:',
        '1. Contacta con nosotros en contacto@retrobox.com.ar dentro del plazo de 30 días',
        '2. Indica tu número de pedido y el motivo de la devolución',
        '3. Recibe la confirmación y las instrucciones de envío',
        '4. Envía el producto de vuelta',
        '5. Una vez recibido y verificado el producto, procesaremos tu reembolso',
        'El reembolso se realizará por el mismo método de pago utilizado en la compra original en un plazo de 10 a 15 días hábiles.',
        'Los costos de envío originales y los gastos de devolución NO son reembolsables, excepto en casos de productos defectuosos o error nuestro.'
      ]
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
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Política de Cambios y Devoluciones
              </h1>
              <p className="text-gray-400 text-sm">
                Última actualización: Noviembre 2024
              </p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border-2 border-orange-500/30 rounded-xl p-6 md:p-8 mb-8"
            >
              <p className="text-white leading-relaxed mb-4 text-center font-semibold">
                En Retrobox Argentina queremos que estés 100% satisfecho con tu compra.
                Si por algún motivo no estás conforme con tu producto, te ofrecemos opciones de cambio y devolución.
              </p>
              <p className="text-gray-300 leading-relaxed text-center text-sm">
                Lee atentamente esta política para conocer tus derechos y el procedimiento a seguir.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => {
                const IconComponent = section.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className={`backdrop-blur-sm border rounded-xl p-6 md:p-8 ${
                      section.highlight
                        ? 'bg-white/10 border-white/20'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white pt-2">
                        {section.title}
                      </h2>
                    </div>
                    <div className="space-y-3 text-gray-300">
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

            {/* Special Cases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mt-6"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                6. Casos Especiales
              </h2>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="text-white font-semibold mb-2">Productos Defectuosos</h3>
                  <p className="leading-relaxed">
                    Si recibes un producto defectuoso o con daños de fábrica, contáctanos inmediatamente.
                    Nos haremos cargo de todos los costos de envío y te enviaremos un reemplazo sin cargo adicional.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Error en el Envío</h3>
                  <p className="leading-relaxed">
                    Si recibiste un producto diferente al que ordenaste, contáctanos de inmediato.
                    Resolveremos el problema sin costo para ti y te enviaremos el producto correcto.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Problemas con el Talle</h3>
                  <p className="leading-relaxed">
                    Recomendamos consultar nuestra guía de tallas antes de realizar tu compra.
                    En caso de problemas de talle, aceptamos cambios siempre que el producto cumpla con todas las condiciones mencionadas.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8 mt-8 text-center"
            >
              <Mail className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                ¿Necesitas Realizar un Cambio o Devolución?
              </h3>
              <p className="text-gray-300 mb-6">
                Nuestro equipo está aquí para ayudarte. Contacta con nosotros y resolveremos tu solicitud lo antes posible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contacto"
                  className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
                >
                  Contáctanos
                </a>
                <a
                  href="/guia-de-tallas"
                  className="inline-block bg-white/10 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/20 transition-all border border-white/20"
                >
                  Ver Guía de Tallas
                </a>
              </div>
            </motion.div>

            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6 md:p-8 mt-6"
            >
              <p className="text-orange-300 text-sm leading-relaxed text-center">
                <strong className="text-orange-400">Importante:</strong> Esta política se aplica únicamente a compras realizadas a través de nuestro sitio web oficial.
                Para compras realizadas a través de otros canales, pueden aplicarse términos diferentes.
              </p>
            </motion.div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
