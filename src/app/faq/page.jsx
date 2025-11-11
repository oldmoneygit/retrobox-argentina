'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ShoppingBag, CreditCard, Truck, RefreshCw, Ruler, ShieldCheck, HelpCircle, PackageSearch, XCircle, CheckCircle, Store, Users, Lock } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    icon: ShoppingBag,
    question: '¿Cómo realizo un pedido?',
    answer: 'Simplemente navega por nuestra tienda, selecciona el producto que deseas, elige tu talla y agrégalo al carrito. Luego procede al checkout para completar tu compra.',
    category: 'Compras'
  },
  {
    icon: CreditCard,
    question: '¿Cuáles son los métodos de pago?',
    answer: 'Aceptamos tarjetas de crédito, débito y transferencias bancarias. Todos los pagos son procesados de forma segura a través de Mercado Pago.',
    category: 'Pagos'
  },
  {
    icon: Truck,
    question: '¿Cuánto tiempo tarda el envío?',
    answer: 'El tiempo de envío es de 24 a 48 horas dentro de Argentina. Los tiempos pueden variar según tu ubicación. Ofrecemos envío gratis en compras superiores a $30.000.',
    category: 'Envíos'
  },
  {
    icon: RefreshCw,
    question: '¿Puedo cambiar o devolver un producto?',
    answer: 'Sí, aceptamos cambios y devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar en su estado original con etiquetas.',
    category: 'Devoluciones'
  },
  {
    icon: Ruler,
    question: '¿Cómo sé mi talla?',
    answer: 'Tenemos una guía de tallas disponible en cada página de producto. Si tienes dudas, puedes contactarnos por WhatsApp y te ayudaremos a elegir la talla correcta.',
    category: 'Tallas'
  },
  {
    icon: ShieldCheck,
    question: '¿Los productos son originales?',
    answer: 'Sí, todos nuestros productos son réplicas de alta calidad premium 1:1. Garantizamos materiales auténticos y acabados idénticos a las versiones oficiales.',
    category: 'Calidad'
  },
  {
    icon: PackageSearch,
    question: '¿Puedo rastrear mi pedido?',
    answer: '¡Sí! Una vez que tu pedido sea despachado, recibirás un código de seguimiento por email o WhatsApp para rastrear tu envío en tiempo real. También podés usar nuestra página de seguimiento de pedidos.',
    category: 'Envíos'
  },
  {
    icon: XCircle,
    question: '¿Puedo modificar o cancelar mi pedido?',
    answer: 'Sí, podés modificar o cancelar tu pedido siempre que aún no haya sido despachado. Contactanos inmediatamente por WhatsApp o email con tu número de pedido y te ayudaremos. Una vez despachado, aplican las políticas de cambio y devolución.',
    category: 'Compras'
  },
  {
    icon: CheckCircle,
    question: '¿Tienen garantía los productos?',
    answer: 'Sí, todos nuestros productos tienen garantía contra defectos de fabricación. Si tu producto llega con algún defecto, lo cambiamos o reembolsamos sin costo adicional. El plazo de garantía es de 60 días para defectos de fábrica.',
    category: 'Calidad'
  },
  {
    icon: Ruler,
    question: '¿Todos los talles están disponibles?',
    answer: 'Trabajamos con talles desde S hasta 3XL. La disponibilidad varía según el producto. Si no encontrás tu talle en un producto específico, contactanos para verificar disponibilidad o recibir notificaciones cuando esté disponible.',
    category: 'Tallas'
  },
  {
    icon: Lock,
    question: '¿Es seguro comprar en Retrobox Argentina?',
    answer: '¡Totalmente seguro! Utilizamos encriptación SSL y procesadores de pago certificados como Mercado Pago. Tus datos personales y de pago están protegidos. No almacenamos información de tarjetas de crédito en nuestros servidores.',
    category: 'Pagos'
  },
  {
    icon: Users,
    question: '¿Hacen venta mayorista?',
    answer: '¡Sí! Ofrecemos precios especiales para compras en gran cantidad. Si estás interesado en comprar al por mayor, contactanos por email a contacto@retroboxargentina.com o por WhatsApp para más información sobre precios y condiciones.',
    category: 'Otros'
  },
  {
    icon: Store,
    question: '¿Tienen tienda física?',
    answer: 'Actualmente operamos 100% online para ofrecer los mejores precios y una experiencia de compra conveniente. Realizamos envíos a toda Argentina con entrega rápida y segura.',
    category: 'Otros'
  },
  {
    icon: CreditCard,
    question: '¿Puedo pagar en cuotas?',
    answer: '¡Sí! Aceptamos pagos en cuotas sin interés a través de Mercado Pago y tarjetas de crédito. Las opciones de cuotas disponibles dependen de tu banco y del método de pago seleccionado.',
    category: 'Pagos'
  },
]

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  const Icon = faq.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`dark:bg-gradient-to-br dark:from-white/5 dark:to-white/[0.02] dark:border-white/30 dark:shadow-white/10 dark:hover:border-white/20 dark:hover:bg-white/[0.07] bg-gradient-to-br from-black/5 to-black/[0.02] backdrop-blur-sm rounded-xl md:rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-black/30 shadow-lg shadow-black/10'
          : 'border-black/10 hover:border-black/20 hover:bg-black/[0.07]'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-6 text-left flex items-start md:items-center gap-3 md:gap-4 group"
      >
        {/* Icon */}
        <div className={`flex-shrink-0 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 ${
          isOpen
            ? 'dark:bg-white dark:text-black bg-black text-white shadow-lg'
            : 'dark:bg-white/10 dark:text-white dark:group-hover:bg-white/20 bg-black/10 text-black group-hover:bg-black/20'
        }`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
        </div>

        {/* Question */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] md:text-xs font-bold dark:text-white/50 text-black/50 uppercase tracking-wider">
              {faq.category}
            </span>
          </div>
          <h3 className="dark:text-white text-black font-bold text-sm md:text-lg leading-snug pr-2">
            {faq.question}
          </h3>
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={`w-5 h-5 md:w-6 md:h-6 transition-colors ${
              isOpen ? 'dark:text-white text-black' : 'dark:text-white/50 dark:group-hover:text-white/70 text-black/50 group-hover:text-black/70'
            }`}
            strokeWidth={2.5}
          />
        </motion.div>
      </button>

      {/* Answer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-4 md:pb-6">
              <div className="pl-0 md:pl-[52px] dark:border-t dark:border-white/10 border-t border-black/10 pt-4">
                <p className="dark:text-white/70 text-black/70 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <>
      <Header />

      <main className="min-h-screen dark:bg-black dark:text-white bg-white text-black relative overflow-hidden transition-colors duration-300">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 dark:bg-white/10 dark:border-white/20 bg-black/10 backdrop-blur-sm border border-black/20 rounded-full px-4 py-2 mb-6"
              >
                <HelpCircle className="w-4 h-4 dark:text-white text-black" />
                <span className="dark:text-white text-black text-xs md:text-sm font-bold uppercase tracking-wide">
                  Centro de Ayuda
                </span>
              </motion.div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black dark:text-white text-black mb-4 md:mb-6 uppercase tracking-tight">
                Preguntas Frecuentes
              </h1>

              {/* Subtitle */}
              <p className="dark:text-white/60 text-black/60 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
                Encuentra respuestas a las preguntas más comunes sobre nuestros productos, envíos, pagos y políticas
              </p>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="relative z-10 pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-3 md:space-y-4">
                {faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    faq={faq}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                  />
                ))}
              </div>

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 md:mt-16 p-6 md:p-8 dark:bg-gradient-to-br dark:from-white/10 dark:to-white/5 dark:border-white/20 bg-gradient-to-br from-black/10 to-black/5 backdrop-blur-sm border border-black/20 rounded-2xl text-center"
              >
                <h3 className="dark:text-white text-black font-black text-xl md:text-2xl mb-3">
                  ¿No encontraste lo que buscabas?
                </h3>
                <p className="dark:text-white/60 text-black/60 mb-6 text-sm md:text-base">
                  Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
                </p>
                <motion.a
                  href="/contacto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 dark:bg-white dark:text-black dark:hover:bg-gray-light bg-black text-white font-bold px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gray-dark transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                >
                  Contáctanos
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}

