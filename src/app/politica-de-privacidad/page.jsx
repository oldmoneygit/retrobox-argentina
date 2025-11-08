'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Database, Mail } from 'lucide-react'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: Database,
      title: '1. Información que Recopilamos',
      content: [
        'Cuando visitas Retrobox Argentina, podemos recopilar los siguientes tipos de información:',
        '• Información de contacto: nombre, dirección de email, número de teléfono, dirección de envío',
        '• Información de pago: datos de tarjeta de crédito o débito (procesados de forma segura)',
        '• Información de pedido: historial de compras, preferencias de productos',
        '• Información técnica: dirección IP, tipo de navegador, páginas visitadas'
      ]
    },
    {
      icon: Eye,
      title: '2. Cómo Usamos Tu Información',
      content: [
        'Utilizamos la información recopilada para:',
        '• Procesar y gestionar tus pedidos',
        '• Enviar confirmaciones de pedido y actualizaciones de envío',
        '• Mejorar nuestros productos y servicios',
        '• Personalizar tu experiencia de compra',
        '• Enviar comunicaciones de marketing (solo si has dado tu consentimiento)',
        '• Prevenir fraudes y mantener la seguridad de nuestro sitio'
      ]
    },
    {
      icon: Lock,
      title: '3. Protección de Datos',
      content: [
        'En Retrobox Argentina tomamos la seguridad de tus datos muy en serio:',
        '• Utilizamos encriptación SSL para proteger la transmisión de datos sensibles',
        '• Los datos de pago son procesados por plataformas seguras de terceros',
        '• Implementamos medidas de seguridad técnicas y organizativas',
        '• El acceso a información personal está restringido al personal autorizado',
        '• Realizamos auditorías de seguridad regularmente'
      ]
    },
    {
      icon: Shield,
      title: '4. Compartir Información con Terceros',
      content: [
        'No vendemos ni alquilamos tu información personal. Solo compartimos datos con:',
        '• Proveedores de servicios de pago (Mercado Pago, etc.)',
        '• Empresas de logística y envío',
        '• Proveedores de servicios de marketing (si has dado consentimiento)',
        '• Autoridades legales cuando sea requerido por ley',
        'Todos estos terceros están obligados a mantener la confidencialidad de tus datos.'
      ]
    },
    {
      icon: Mail,
      title: '5. Tus Derechos',
      content: [
        'Tienes derecho a:',
        '• Acceder a tus datos personales',
        '• Rectificar datos inexactos o incompletos',
        '• Solicitar la eliminación de tus datos',
        '• Oponerte al procesamiento de tus datos',
        '• Solicitar la portabilidad de tus datos',
        '• Retirar el consentimiento en cualquier momento',
        'Para ejercer estos derechos, contacta con nosotros en contacto@retrobox.com.ar'
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Política de Privacidad
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
                En Retrobox Argentina, respetamos y protegemos la privacidad de nuestros usuarios.
                Esta Política de Privacidad explica cómo recopilamos, usamos, compartimos y protegemos
                tu información personal cuando utilizas nuestro sitio web y servicios.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Al utilizar nuestro sitio web, aceptas las prácticas descritas en esta política.
                Si no estás de acuerdo, por favor no utilices nuestros servicios.
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

            {/* Cookies Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 mt-6"
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                6. Cookies y Tecnologías Similares
              </h2>
              <p className="text-gray-300 leading-relaxed mb-3">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio:
              </p>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li>• <strong className="text-white">Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio</li>
                <li>• <strong className="text-white">Cookies de rendimiento:</strong> Nos ayudan a entender cómo usas el sitio</li>
                <li>• <strong className="text-white">Cookies de publicidad:</strong> Para mostrar anuncios relevantes</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 md:p-8 mt-8 text-center"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                ¿Tienes Preguntas sobre tu Privacidad?
              </h3>
              <p className="text-gray-300 mb-6">
                Si tienes alguna pregunta o inquietud sobre esta política o sobre cómo manejamos tus datos,
                no dudes en contactarnos.
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
              Esta política puede ser actualizada periódicamente. Te notificaremos sobre cambios importantes.
            </p>
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}
