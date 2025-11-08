'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { FileText, ShoppingCart, Package, CreditCard, AlertCircle } from 'lucide-react'

export default function TermsAndConditionsPage() {
  const sections = [
    {
      icon: FileText,
      title: '1. Aceptación de los Términos',
      content: [
        'Al acceder y utilizar el sitio web de Retrobox Argentina, aceptas estar sujeto a estos Términos y Condiciones, todas las leyes y regulaciones aplicables, y aceptas que eres responsable del cumplimiento de todas las leyes locales aplicables.',
        'Si no estás de acuerdo con alguno de estos términos, tienes prohibido usar o acceder a este sitio.',
        'El uso continuado de nuestro sitio web constituye tu aceptación de estos términos y cualquier modificación a los mismos.'
      ]
    },
    {
      icon: ShoppingCart,
      title: '2. Proceso de Compra',
      content: [
        'Al realizar un pedido en Retrobox Argentina, estás haciendo una oferta para comprar los productos seleccionados.',
        'Todos los pedidos están sujetos a disponibilidad y confirmación del precio.',
        'Nos reservamos el derecho de rechazar cualquier pedido por cualquier motivo, incluyendo pero no limitado a:',
        '• Disponibilidad de producto',
        '• Errores en la descripción o precio del producto',
        '• Errores en tu pedido',
        'Si tu pedido es cancelado después de que tu pago ha sido procesado, recibirás un reembolso completo.'
      ]
    },
    {
      icon: CreditCard,
      title: '3. Precios y Pagos',
      content: [
        'Todos los precios están expresados en Pesos Argentinos (ARS) e incluyen IVA.',
        'Los precios pueden cambiar sin previo aviso, pero los cambios no afectarán pedidos ya confirmados.',
        'Aceptamos los siguientes métodos de pago:',
        '• Tarjetas de crédito y débito',
        '• Mercado Pago',
        '• Transferencia bancaria',
        'El pago debe completarse en el momento de realizar el pedido. Si el pago no se procesa correctamente, tu pedido será cancelado.'
      ]
    },
    {
      icon: Package,
      title: '4. Envíos y Entregas',
      content: [
        'Los plazos de entrega son estimados y pueden variar según tu ubicación y disponibilidad del producto.',
        'El plazo estimado de entrega es de 24 a 48 horas para envíos dentro de Argentina.',
        'No somos responsables por retrasos causados por el servicio de mensajería o circunstancias fuera de nuestro control.',
        'Es tu responsabilidad proporcionar una dirección de envío correcta y completa.',
        'Si el paquete no puede ser entregado debido a información incorrecta, se aplicarán cargos adicionales para el reenvío.'
      ]
    },
    {
      icon: AlertCircle,
      title: '5. Propiedad Intelectual',
      content: [
        'Todo el contenido de este sitio web, incluyendo pero no limitado a texto, gráficos, logos, imágenes y software, es propiedad de Retrobox Argentina o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.',
        'No puedes reproducir, distribuir, modificar, crear trabajos derivados, exhibir públicamente, o explotar de cualquier manera el contenido sin nuestro permiso expreso por escrito.',
        'Las marcas comerciales de equipos de fútbol son propiedad de sus respectivos dueños.'
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
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Términos y Condiciones
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
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mb-8"
            >
              <p className="text-gray-300 leading-relaxed mb-4">
                Bienvenido a Retrobox Argentina. Estos Términos y Condiciones rigen tu uso de nuestro sitio web
                y la compra de nuestros productos. Por favor, lee estos términos cuidadosamente antes de realizar
                cualquier compra.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Al utilizar este sitio web, confirmas que has leído, comprendido y aceptado estos términos en su totalidad.
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
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8"
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

            {/* Additional Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mt-6"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                6. Limitación de Responsabilidad
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Retrobox Argentina no será responsable por:
              </p>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li>• Daños indirectos, incidentales, especiales o consecuenciales</li>
                <li>• Pérdida de beneficios, datos o uso</li>
                <li>• Interrupción del negocio</li>
                <li>• Cualquier daño resultante del uso o incapacidad de usar nuestros productos o servicios</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mt-6"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                7. Ley Aplicable
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Cualquier disputa
                relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Argentina.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mt-6"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                8. Modificaciones de los Términos
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento.
                Los cambios entrarán en vigor inmediatamente después de su publicación en este sitio web.
                Tu uso continuado del sitio después de cualquier cambio constituye tu aceptación de los nuevos términos.
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8 mt-8 text-center"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                ¿Tienes Preguntas sobre estos Términos?
              </h3>
              <p className="text-gray-300 mb-6">
                Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contáctanos.
              </p>
              <a
                href="/contacto"
                className="inline-block bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
              >
                Contáctanos
              </a>
            </motion.div>

            {/* Last Updated Notice */}
            <p className="text-center text-gray-500 text-sm mt-8">
              Estos términos pueden ser actualizados periódicamente. Es tu responsabilidad revisar estos términos regularmente.
            </p>
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
