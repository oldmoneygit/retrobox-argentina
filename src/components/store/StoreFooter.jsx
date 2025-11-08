'use client'

import OptimizedImage from '@/components/OptimizedImage'
import Link from 'next/link'
import { Mail, Instagram } from 'lucide-react'
import { SOCIAL_LINKS, LOCATION_DATA } from '@/utils/constants'

const StoreFooter = () => {
  const quickAccessLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Seguimiento de Pedido', href: '/seguimiento' },
    { name: 'Guía de Tallas', href: '/guia-de-tallas' },
    { name: 'Preguntas Frecuentes', href: '/faq' },
    { name: 'Política de Cambios', href: '/politica-cambios' },
    { name: 'Términos y Condiciones', href: '/terminos-y-condiciones' },
    { name: 'Contáctanos', href: '/contacto' },
    { name: 'Plazos de Entrega', href: '/plazos-entrega' },
    { name: 'Privacidad', href: '/privacidade' },
  ]

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Top Border - Monocromático */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8">
          {/* Column 1 - Brand Info */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <Link href="/" className="block relative w-48 h-12 mb-6 group">
              <OptimizedImage
                src="/images/logo/LOGO_BRANCO.webp"
                alt="Retrobox"
                fill
                className="object-contain transition-all duration-300 group-hover:brightness-110"
              />
            </Link>

            <div className="space-y-4">
              <p className="text-white text-sm">
                <span className="font-semibold">Ubicación:</span> {LOCATION_DATA.fullAddress}
              </p>

              <div className="flex items-center justify-center md:justify-start gap-2 text-white text-sm">
                <Mail size={16} className="text-white flex-shrink-0" />
                <span className="font-semibold">E-mail:</span>
                <a href="mailto:contacto@retrobox.com" className="hover:text-white/80 transition-colors">
                  contacto@retrobox.com
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Access */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h3 className="text-white font-bold uppercase tracking-wide mb-6">ACCESO RÁPIDO</h3>
            <ul className="space-y-2.5">
              {quickAccessLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-center space-y-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} <span className="text-white font-semibold">Retrobox Argentina</span>. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-white/5 blur-[100px] pointer-events-none" />
    </footer>
  )
}

export default StoreFooter

