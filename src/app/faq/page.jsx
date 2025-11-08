'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ShoppingBag, CreditCard, Truck, RefreshCw, Ruler, ShieldCheck, HelpCircle } from 'lucide-react'
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
]

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  const Icon = faq.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-xl md:rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-white/30 shadow-lg shadow-white/10'
          : 'border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-6 text-left flex items-start md:items-center gap-3 md:gap-4 group"
      >
        {/* Icon */}
        <div className={`flex-shrink-0 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 ${
          isOpen
            ? 'bg-white text-black shadow-lg'
            : 'bg-white/10 text-white group-hover:bg-white/20'
        }`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2} />
        </div>

        {/* Question */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] md:text-xs font-bold text-white/50 uppercase tracking-wider">
              {faq.category}
            </span>
          </div>
          <h3 className="text-white font-bold text-sm md:text-lg leading-snug pr-2">
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
              isOpen ? 'text-white' : 'text-white/50 group-hover:text-white/70'
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
              <div className="pl-0 md:pl-[52px] border-t border-white/10 pt-4">
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
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

      <main className="min-h-screen bg-black text-white relative overflow-hidden">
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
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
              >
                <HelpCircle className="w-4 h-4 text-white" />
                <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wide">
                  Centro de Ayuda
                </span>
              </motion.div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 uppercase tracking-tight">
                Preguntas
                <span className="block bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
                  Frecuentes
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/60 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
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
                className="mt-12 md:mt-16 p-6 md:p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-center"
              >
                <h3 className="text-white font-black text-xl md:text-2xl mb-3">
                  ¿No encontraste lo que buscabas?
                </h3>
                <p className="text-white/60 mb-6 text-sm md:text-base">
                  Estamos aquí para ayudarte. Contáctanos y te responderemos lo antes posible.
                </p>
                <motion.a
                  href="https://wa.me/5491234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-white text-black font-bold px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-gray-light transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                >
                  Contactar por WhatsApp
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

