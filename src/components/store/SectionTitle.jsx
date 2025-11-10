'use client'

import { motion } from 'framer-motion'

/**
 * Componente de título padrão para seções da loja
 * Garante tipografia uniforme e responsiva em toda a aplicação
 * Monocromático design
 */
const SectionTitle = ({
  title,
  highlight,
  subtitle,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center mb-4 md:mb-6 px-4 ${className}`}
    >
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
        {title}{highlight && <span className="text-white/80 text-2xl md:text-3xl lg:text-5xl font-bold"> {highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-gray-medium text-sm md:text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionTitle

