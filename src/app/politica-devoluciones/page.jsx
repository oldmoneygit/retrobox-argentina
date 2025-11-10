'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { RefreshCw, CheckCircle, XCircle, AlertTriangle, Clock, Package, DollarSign, Mail, MessageCircle } from 'lucide-react'

export default function PoliticaDevolucionesPage() {
  const sections = [
    {
      icon: Clock,
      title: '1. Plazo para Devoluciones',
      content: [
        'Tenés 30 días corridos desde la recepción del pedido para solicitar una devolución.',
        'El plazo se cuenta desde la fecha de entrega confirmada por el servicio de mensajería.',
        'Las solicitudes de devolución fuera de este plazo no serán procesadas, excepto en casos de defectos de fábrica.',
        'Para productos con defectos de fábrica, el plazo se extiende a 60 días desde la recepción.'
      ],
      highlight: true
    },
    {
      icon: Package,
      title: '2. Condiciones para Devoluciones',
      content: [
        'Para que una devolución sea procesada, el producto debe cumplir con las siguientes condiciones:',
        '• El artículo no debe haber sido usado ni presentar signos de desgaste',
        '• Debe conservar todas las etiquetas y adhesivos originales',
        '• La caja debe estar en perfecto estado, sin daños o escrituras',
        '• Debe incluir todos los accesorios y documentación original',
        '• El producto no debe haber sido modificado o alterado de ninguna forma',
        'Si el producto no cumple con estas condiciones, nos reservamos el derecho de rechazar la devolución.'
      ]
    },
    {
      icon: RefreshCw,
      title: '3. Proceso de Devolución',
      content: [
        'El proceso de devolución se realiza en los siguientes pasos:',
        '',
        'Paso 1: Contactanos',
        'Escribinos por WhatsApp o email a contacto@retroboxargentina.com indicando tu número de pedido y el motivo de la devolución.',
        '',
        'Paso 2: Confirmación',
        'Nuestro equipo verificará tu solicitud y enviará las instrucciones de devolución junto con la dirección de retorno.',
        '',
        'Paso 3: Envío del producto',
        'Embalá el producto en la caja original con todos sus accesorios y envialo a la dirección que te indicaremos. Es importante que uses un servicio de mensajería con seguimiento.',
        '',
        'Paso 4: Inspección',
        'Al recibir el producto, lo inspeccionaremos para verificar que cumple con todas las condiciones establecidas.',
        '',
        'Paso 5: Procesamiento del reembolso',
        'Una vez aprobada la devolución, procesaremos tu reembolso en un plazo de 5 a 7 días hábiles.'
      ]
    },
    {
      icon: DollarSign,
      title: '4. Reembolsos',
      content: [
        'El reembolso se realizará utilizando el mismo método de pago que utilizaste para la compra original.',
        'El monto reembolsado será el precio pagado por el producto, excluyendo los costos de envío originales (a menos que la devolución sea por error nuestro o defecto de fábrica).',
        'Los costos de envío de devolución corren por cuenta del cliente, excepto en los siguientes casos:',
        '• Error de nuestra parte (producto incorrecto, defecto de fábrica)',
        '• Producto dañado durante el transporte',
        '• Producto que no corresponde a lo pedido',
        'El tiempo de procesamiento del reembolso puede variar según tu método de pago:',
        '• Tarjetas de crédito/débito: 5-7 días hábiles',
        '• Mercado Pago: 3-5 días hábiles',
        '• Transferencia bancaria: 2-3 días hábiles'
      ]
    },
    {
      icon: XCircle,
      title: '5. Casos que NO aplican para Devolución',
      content: [
        'No se aceptarán devoluciones en los siguientes casos:',
        '• Productos usados o con signos de desgaste',
        '• Artículos sin etiquetas originales o con caja dañada',
        '• Productos modificados o alterados de alguna forma',
        '• Solicitudes fuera del plazo de 30 días (excepto defectos de fábrica)',
        '• Productos adquiridos en promociones especiales o liquidaciones (excepto defecto de fábrica)',
        '• Productos personalizados o hechos a medida',
        '• Productos que fueron dañados por mal uso o negligencia del cliente'
      ]
    },
    {
      icon: AlertTriangle,
      title: '6. Productos con Defectos de Fábrica',
      content: [
        'Si tu producto llega con algún defecto de fabricación, lo reemplazamos o reembolsamos inmediatamente sin ningún costo para vos.',
        'En estos casos:',
        '• El plazo se extiende a 60 días desde la recepción',
        '• Todos los costos de envío corren por nuestra cuenta',
        '• Prioridad en el procesamiento de la devolución',
        '• Opción de reemplazo inmediato o reembolso completo',
        'Para reportar un defecto de fábrica, contactanos inmediatamente con fotos del defecto y tu número de pedido.'
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
                <RefreshCw className="w-8 h-8 text-orange-400" />
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase">
                Política de Devoluciones
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
                En Retrobox Argentina, tu satisfacción es nuestra prioridad. Entendemos que a veces necesitás devolver un producto,
                y queremos que el proceso sea lo más simple y transparente posible.
              </p>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Esta política explica cómo funcionan nuestras devoluciones y reembolsos. Por favor, lee esta información cuidadosamente
                antes de solicitar una devolución.
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
                        paragraph ? (
                          <p key={pIndex} className="leading-relaxed">
                            {paragraph}
                          </p>
                        ) : null
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
              className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl p-6 md:p-8 mt-6 hover:border-white/20 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 p-3 bg-white/10 rounded-lg md:rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white pt-2">
                  Importante
                </h2>
              </div>
              <div className="space-y-3 text-white/70 text-sm md:text-base ml-0 md:ml-[68px]">
                <p className="leading-relaxed">
                  Es importante que guardes el comprobante de envío de la devolución hasta que recibas la confirmación del reembolso.
                  Si el paquete se pierde durante el transporte de devolución y no tenés el comprobante, no podremos procesar el reembolso.
                </p>
                <p className="leading-relaxed">
                  Recomendamos usar un servicio de mensajería con seguimiento y asegurar el paquete adecuadamente para evitar daños durante el transporte.
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl md:rounded-2xl p-6 md:p-8 mt-8 hover:border-white/30 transition-all"
            >
              <div className="text-center mb-6">
                <h3 className="text-white font-black text-xl md:text-2xl mb-3">
                  ¿Necesitás hacer una devolución?
                </h3>
                <p className="text-white/60 mb-6 text-sm md:text-base">
                  Nuestro equipo está listo para ayudarte. Contactanos y te guiaremos en todo el proceso.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:contacto@retroboxargentina.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gray-light transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                >
                  <Mail className="w-5 h-5" />
                  Email
                </motion.a>
                <motion.a
                  href="/contacto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/20 transition-all border border-white/20 text-sm md:text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  Formulario de Contacto
                </motion.a>
              </div>
            </motion.div>

            {/* Last Updated Notice */}
            <p className="text-center text-white/40 text-xs md:text-sm mt-8">
              Esta política puede ser actualizada periódicamente. Es tu responsabilidad revisar esta información regularmente.
            </p>
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}

