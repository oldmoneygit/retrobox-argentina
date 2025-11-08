'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: '¿Cómo realizo un pedido?',
    answer: 'Simplemente navega por nuestra tienda, selecciona el producto que deseas, elige tu talla y agrégalo al carrito. Luego procede al checkout para completar tu compra.'
  },
  {
    question: '¿Cuáles son los métodos de pago?',
    answer: 'Aceptamos tarjetas de crédito, débito y transferencias bancarias. Todos los pagos son procesados de forma segura.'
  },
  {
    question: '¿Cuánto tiempo tarda el envío?',
    answer: 'El tiempo de envío es de 24 a 48 horas dentro de Argentina. Los tiempos pueden variar según tu ubicación.'
  },
  {
    question: '¿Puedo cambiar o devolver un producto?',
    answer: 'Sí, aceptamos cambios y devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar en su estado original.'
  },
  {
    question: '¿Cómo sé mi talla?',
    answer: 'Tenemos una guía de tallas disponible en cada página de producto. Si tienes dudas, puedes contactarnos y te ayudaremos a elegir la talla correcta.'
  },
  {
    question: '¿Los productos son originales?',
    answer: 'Sí, todos nuestros productos son auténticos y de calidad premium. Garantizamos la autenticidad de cada camiseta.'
  },
]

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-white/10"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 text-left flex items-center justify-between hover:text-white/80 transition-colors"
      >
        <h3 className="text-white font-semibold text-lg pr-4">{faq.question}</h3>
        <ChevronDown
          size={24}
          className={`text-white transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden"
        >
          <p className="text-gray-medium pb-6">{faq.answer}</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Preguntas Frecuentes
            </h1>
            <p className="text-gray-medium text-center mb-12">
              Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios
            </p>

            <div className="space-y-2">
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
          </div>
        </div>
      </main>

      <StoreFooter />
    </>
  )
}

