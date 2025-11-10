// Brand Colors - Monocromático
export const COLORS = {
  black: '#000000',
  'black-soft': '#0A0A0A',
  'gray-dark': '#1A1A1A',
  'gray-medium': '#808080',
  'gray-light': '#E5E5E5',
  white: '#FFFFFF',
}

// Images Paths
export const IMAGES = {
  // Logo
  logo: '/images/logo/LOGO_BRANCO.webp',
  
  // Hero
  hero: '/images/hero/Banner-RetroboxDesktop-2.webp',
  
  // Products
  products: '/images/products/',
  
  // Gallery
  gallery: '/images/gallery/',
}

// Tallas Argentinas - Padrão internacional para camisetas deportivas
// Sistema de letras: S, M, L, XL, XXL, 3XL
export const DEFAULT_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL']

// Guía de tallas - Medidas en cm
export const SIZE_GUIDE = {
  'S': { chest: '88-93', length: '71' },
  'M': { chest: '94-99', length: '73' },
  'L': { chest: '100-105', length: '75' },
  'XL': { chest: '106-111', length: '77' },
  'XXL': { chest: '112-117', length: '79' },
  '3XL': { chest: '118-123', length: '81' }
}
export const STATS_DATA = [
  {
    icon: 'Shirt',
    value: "500+",
    label: "Camisetas Retrô",
    color: "text-white"
  },
  {
    icon: 'Users',
    value: "10K+",
    label: "Clientes Satisfeitos",
    color: "text-white"
  },
  {
    icon: 'Package',
    value: "100%",
    label: "Qualidade Premium",
    color: "text-white"
  },
  {
    icon: 'Truck',
    value: "Rápido",
    label: "Envío Express",
    color: "text-white"
  }
]

// Features Data
export const FEATURES_DATA = [
  {
    icon: 'Shirt',
    title: "Camisetas Retrô",
    desc: "Coleções exclusivas de times argentinos e internacionais",
    color: "from-white/10 to-white/5"
  },
  {
    icon: 'Sparkles',
    title: "Qualidade Premium",
    desc: "Tecidos de alta qualidade e design autêntico",
    color: "from-white/10 to-white/5"
  },
  {
    icon: 'Truck',
    title: "Envío Express",
    desc: "Entrega rápida em toda Argentina",
    color: "from-white/10 to-white/5"
  }
]

// Location Data
export const LOCATION_DATA = {
  address: "",
  neighborhood: "",
  city: "Buenos Aires",
  state: "CABA",
  country: "Argentina",
  fullAddress: "Buenos Aires, CABA, Argentina"
}

// Social Links
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/retrobox.arg",
  instagramHandle: "@retrobox.arg",
  whatsapp: "https://wa.me/5491123456789"
}

// Opening Date (se aplicável)
export const OPENING_DATE = new Date('2025-01-01T00:00:00')

// SEO Data
export const SEO_DATA = {
  title: "Retrobox Argentina - Camisetas Retrô Exclusivas",
  description: "Camisetas retrô de times argentinos e internacionais. Qualidade premium, envío express en toda Argentina.",
  keywords: "camisetas retrô, camisetas fútbol, argentina, retrobox, camisetas vintage, fútbol argentino",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://retrobox-argentina.vercel.app",
  ogImage: IMAGES.logo
}

// Categories/Collections
export const COLLECTIONS = [
  {
    id: 'boca-juniors',
    name: 'Boca Juniors',
    slug: 'boca-juniors',
    image: '/images/collections/boca-juniors-logo.png',
    description: 'Camisetas retrô de Boca Juniors'
  },
  {
    id: 'river-plate',
    name: 'River Plate',
    slug: 'river-plate',
    image: '/images/collections/river-plate-logo.png',
    description: 'Camisetas retrô de River Plate'
  },
  {
    id: 'argentina',
    name: 'Argentina',
    slug: 'seleccion-argentina',
    image: '/images/collections/argentina-logo.png',
    description: 'Camisetas retrô de la Selección Argentina'
  },
  {
    id: 'premier-league',
    name: 'Premier League',
    slug: 'premier-league',
    image: '/images/collections/ligas/premierleague.webp',
    description: 'Camisetas de equipos de la Premier League'
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    slug: 'la-liga',
    image: '/images/collections/ligas/laliga.webp',
    description: 'Camisetas de equipos de La Liga'
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    slug: 'serie-a',
    image: '/images/collections/ligas/serieA.webp',
    description: 'Camisetas de equipos de la Serie A'
  }
]

// Navigation Menu Items
export const MENU_ITEMS = [
  { name: 'INICIO', href: '/' },
  { name: 'COLECCIONES', href: '/colecciones' },
  { name: 'MÁS VENDIDOS', href: '/#bestsellers' },
  { name: 'CONTACTO', href: '/contacto' },
]

