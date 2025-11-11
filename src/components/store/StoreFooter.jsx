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
    { name: 'Contáctanos', href: '/contacto' },
    { name: 'Plazos de Entrega', href: '/plazos-entrega' },
  ]

  const legalLinks = [
    { name: 'Términos y Condiciones', href: '/terminos-y-condiciones' },
    { name: 'Política de Cambios', href: '/politica-cambios' },
    { name: 'Política de Privacidad', href: '/privacidade' },
    { name: 'Política de Devoluciones', href: '/politica-devoluciones' },
  ]

  return (
    <footer className="relative dark:bg-black dark:border-white/10 bg-white border-t border-black/10 transition-colors duration-300">
      {/* Top Border - Monocromático */}
      <div className="absolute top-0 left-0 right-0 h-1 dark:bg-gradient-to-r dark:from-transparent dark:via-white/20 dark:to-transparent bg-gradient-to-r from-transparent via-black/20 to-transparent" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 - Brand Info */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <Link href="/" className="block relative w-48 h-12 mb-6 group">
              <OptimizedImage
                src="/images/logo/LOGO_BRANCO.webp"
                alt="Retrobox"
                fill
                className="object-contain dark:brightness-100 brightness-0 transition-all duration-300 group-hover:brightness-110"
              />
            </Link>

            <div className="space-y-4">
              <p className="dark:text-white text-black text-sm leading-relaxed">
                <span className="font-semibold">Retrobox Argentina</span><br />
                Camisetas retrô exclusivas de alta calidad. Envíos a toda Argentina.
              </p>

              <p className="dark:text-white text-black text-sm">
                <span className="font-semibold">Ubicación:</span><br />
                {LOCATION_DATA.fullAddress}
              </p>

              <div className="flex items-center justify-center md:justify-start gap-2 dark:text-white text-black text-sm">
                <Mail size={16} className="dark:text-white text-black flex-shrink-0" />
                <span className="font-semibold">E-mail:</span>
                <a href="mailto:contacto@retroboxargentina.com" className="dark:hover:text-white/80 hover:text-black/80 transition-colors">
                  contacto@retroboxargentina.com
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Access */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h3 className="dark:text-white text-black font-bold uppercase tracking-wide mb-6">ACCESO RÁPIDO</h3>
            <ul className="space-y-2.5">
              {quickAccessLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="dark:text-white/70 dark:hover:text-white text-black/70 hover:text-black transition-colors text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Legal/Institutional */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h3 className="dark:text-white text-black font-bold uppercase tracking-wide mb-6">INFORMACIÓN LEGAL</h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="dark:text-white/70 dark:hover:text-white text-black/70 hover:text-black transition-colors text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Empty for now or can add more info */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <h3 className="dark:text-white text-black font-bold uppercase tracking-wide mb-6">SIGUENOS</h3>
            <p className="dark:text-white/70 text-black/70 text-sm mb-4">
              Mantente al día con nuestras últimas novedades y ofertas exclusivas.
            </p>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 transition-colors text-sm"
            >
              <Instagram size={20} />
              <span>{SOCIAL_LINKS.instagramHandle}</span>
            </a>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 dark:border-t dark:border-white/10 border-t border-black/10">
          <div className="flex flex-col items-center space-y-4">
            <h3 className="dark:text-white/70 text-black/70 font-semibold text-sm uppercase tracking-wide">
              Formas de Pago Seguras
            </h3>
            <div className="relative w-full max-w-md h-12">
              <OptimizedImage
                src="/images/trust/Bandeiras-1.png"
                alt="Formas de Pago - Tarjetas de Crédito y Débito"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-2 dark:text-white/50 text-black/50 text-xs">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Compra 100% segura y protegida</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 dark:border-t dark:border-white/10 border-t border-black/10">
          <div className="text-center space-y-4">
            <p className="dark:text-white/50 text-black/50 text-sm">
              © {new Date().getFullYear()} <span className="dark:text-white text-black font-semibold">Retrobox Argentina</span>. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 dark:bg-white/5 bg-black/5 blur-[100px] pointer-events-none" />
    </footer>
  )
}

export default StoreFooter

