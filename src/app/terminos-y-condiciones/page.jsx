'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { FileText, ShoppingCart, Package, CreditCard, AlertCircle, ShieldAlert, Scale, Edit } from 'lucide-react'

export default function TermsAndConditionsPage() {
  const sections = [
    {
      icon: FileText,
      title: '1. Aceptación de los Términos',
      content: [
        'Al acceder y utilizar el sitio web de Retrobox Argentina, aceptas estar sujeto a estos Términos y Condiciones, todas las leyes y regulaciones aplicables, y aceptas que eres responsable del cumplimiento de todas las leyes locales aplicables.',
        'Si no estás de acuerdo con alguno de estos términos, tienes prohibido usar o acceder a este sitio.',
        'El uso continuado de nuestro sitio web constituye tu aceptación de estos términos y cualquier modificación a los mismos.'
      ],
      highlight: true
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

      <main className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-full mb-4 border border-orange-500/30">
                <FileText className="w-8 h-8 text-orange-400" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">
                Términos y
                <span className="block bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                  Condiciones
                </span>
              </h1>
              <p className="text-white/60 text-sm md:text-base">
                Última actualización: Noviembre 2024
              </p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-6 md:p-8 mb-8"
            >
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
                Bienvenido a Retrobox Argentina. Estos Términos y Condiciones rigen tu uso de nuestro sitio web
                y la compra de nuestros productos. Por favor, lee estos términos cuidadosamente antes de realizar
                cualquier compra.
              </p>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Al utilizar este sitio web, confirmas que has leído, comprendido y aceptado estos términos en su totalidad.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-6">{sections.map((section, index) => {
                const IconComponent = section.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border transition-all hover:border-white/20 ${
                      section.highlight
                        ? 'bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30'
                        : 'bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`flex-shrink-0 p-3 rounded-lg md:rounded-xl ${
                        section.highlight ? 'bg-orange-500/20' : 'bg-white/10'
                      }`}>
                        <IconComponent className={`w-6 h-6 ${
                          section.highlight ? 'text-orange-400' : 'text-white'
                        }`} />
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

            {/* Additional Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 mt-6 hover:border-white/20 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 p-3 bg-white/10 rounded-lg md:rounded-xl">
                  <ShieldAlert className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white pt-2">
                  6. Limitación de Responsabilidad
                </h2>
              </div>
              <div className="space-y-3 text-white/70 text-sm md:text-base ml-0 md:ml-[68px]">
                <p className="leading-relaxed">
                  Retrobox Argentina no será responsable por:
                </p>
                <ul className="space-y-2">
                  <li>• Daños indirectos, incidentales, especiales o consecuenciales</li>
                  <li>• Pérdida de beneficios, datos o uso</li>
                  <li>• Interrupción del negocio</li>
                  <li>• Cualquier daño resultante del uso o incapacidad de usar nuestros productos o servicios</li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 mt-6 hover:border-white/20 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 p-3 bg-white/10 rounded-lg md:rounded-xl">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white pt-2">
                  7. Ley Aplicable
                </h2>
              </div>
              <div className="space-y-3 text-white/70 text-sm md:text-base ml-0 md:ml-[68px]">
                <p className="leading-relaxed">
                  Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Cualquier disputa
                  relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Argentina.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 mt-6 hover:border-white/20 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 p-3 bg-white/10 rounded-lg md:rounded-xl">
                  <Edit className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white pt-2">
                  8. Modificaciones de los Términos
                </h2>
              </div>
              <div className="space-y-3 text-white/70 text-sm md:text-base ml-0 md:ml-[68px]">
                <p className="leading-relaxed">
                  Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento.
                  Los cambios entrarán en vigor inmediatamente después de su publicación en este sitio web.
                  Tu uso continuado del sitio después de cualquier cambio constituye tu aceptación de los nuevos términos.
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-6 md:p-8 mt-8 text-center hover:border-white/30 transition-all"
            >
              <h3 className="text-white font-black text-xl md:text-2xl mb-3">
                ¿Tienes Preguntas sobre estos Términos?
              </h3>
              <p className="text-white/60 mb-6 text-sm md:text-base">
                Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contáctanos.
              </p>
              <motion.a
                href="/contacto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gray-light transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                Contáctanos
              </motion.a>
            </motion.div>

            {/* Last Updated Notice */}
            <p className="text-center text-white/40 text-xs md:text-sm mt-8">
              Estos términos pueden ser actualizados periódicamente. Es tu responsabilidad revisar estos términos regularmente.
            </p>
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
