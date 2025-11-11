'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Search, Menu, X, ChevronDown, Heart, Loader2 } from 'lucide-react'
import OptimizedImage from '@/components/OptimizedImage'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useTheme } from '@/context/ThemeContext'
import { MENU_ITEMS, COLLECTIONS } from '@/utils/constants'
import { getAllProducts } from '@/utils/products'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  const { getItemCount } = useCart()
  const { getItemCount: getWishlistCount } = useWishlist()
  const { isDark } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState(null) // Changed from collectionsOpen to handle multiple submenus
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [allProducts, setAllProducts] = useState([])
  const searchRef = useRef(null)

  const cartItemCount = getItemCount()
  const wishlistItemCount = getWishlistCount()

  // Función para normalizar texto (elimina acentos y caracteres especiales)
  const normalizeText = (text) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
      .replace(/[^a-z0-9\s]/g, '') // Elimina caracteres especiales
      .trim()
  }

  // Detectar scroll para estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cargar productos para búsqueda
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await getAllProducts()
        setAllProducts(products)
      } catch (error) {
        console.error('Error loading products:', error)
      }
    }
    loadProducts()
  }, [])

  // Equipos Argentinos - Submenú
  const timesArgentinosSubMenu = [
    { name: 'Boca Juniors', href: '/coleccion/boca-juniors' },
    { name: 'River Plate', href: '/coleccion/river-plate' },
    { name: 'Racing Club', href: '/coleccion/racing-club' },
    { name: 'Independiente', href: '/coleccion/independiente' },
    { name: 'San Lorenzo', href: '/coleccion/san-lorenzo' },
    { name: "Newell's Old Boys", href: '/coleccion/newells-old-boys' },
    { name: 'Rosario Central', href: '/coleccion/rosario-central' },
  ]

  // Ligas - Submenu
  const ligasSubMenu = [
    { name: 'Premier League', href: '/coleccion/premier-league' },
    { name: 'La Liga', href: '/coleccion/la-liga' },
    { name: 'Serie A', href: '/coleccion/serie-a' },
    { name: 'Bundesliga', href: '/coleccion/bundesliga' },
    { name: 'Ligue 1', href: '/coleccion/ligue-1' },
    { name: 'Liga Portugal', href: '/coleccion/liga-portugal' },
    { name: 'Brasileirão', href: '/coleccion/brasileirao' },
  ]

  const collectionsSubMenu = COLLECTIONS.map(collection => ({
    name: collection.name,
    href: `/collection/${collection.slug}`
  }))

  const menuItems = [
    { name: 'TODOS LOS PRODUCTOS', href: '/productos' },
    { name: 'MÁS VENDIDOS', href: '/#bestsellers' },
    { name: 'EQUIPOS ARGENTINOS', href: '#', hasSubmenu: true, submenu: timesArgentinosSubMenu },
    { name: 'LIGAS', href: '#', hasSubmenu: true, submenu: ligasSubMenu },
    { name: 'SELECCIONES NACIONALES', href: '/coleccion/selecciones-nacionales' },
    { name: 'MYSTERYBOX', href: '/#mysterybox' },
    { name: 'RASTREÁ TU PEDIDO', href: '/seguimiento' },
    { name: 'CONTACTO', href: '/contacto' },
  ]

  // Búsqueda dinámica con productos reales
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setIsSearching(true)

      // Debounce para no hacer búsqueda en cada tecla
      const timeoutId = setTimeout(() => {
        const normalizedQuery = normalizeText(searchQuery)
        const queryWords = normalizedQuery.split(/\s+/).filter(word => word.length > 1)

        const filtered = allProducts.filter(product => {
          // Normalizar campos del producto
          const name = normalizeText(product.name || '')
          const tags = normalizeText(product.tags?.join(' ') || '')
          const collection = normalizeText(product.collection || '')

          // Concatenar todos los campos para búsqueda
          const searchableText = `${name} ${tags} ${collection}`

          // Búsqueda por palabras individuales (match parcial)
          const matchesWords = queryWords.some(word => searchableText.includes(word))

          // Búsqueda por la query completa
          const matchesFullQuery = searchableText.includes(normalizedQuery)

          return matchesWords || matchesFullQuery
        })

        // Ordenar resultados: matches exactos primero
        const sorted = filtered.sort((a, b) => {
          const nameA = normalizeText(a.name || '')
          const nameB = normalizeText(b.name || '')

          const exactMatchA = nameA.includes(normalizedQuery) ? 1 : 0
          const exactMatchB = nameB.includes(normalizedQuery) ? 1 : 0

          return exactMatchB - exactMatchA
        })

        // Limitar a 6 resultados
        setSearchResults(sorted.slice(0, 6))
        setShowSearchResults(true)
        setIsSearching(false)
      }, 300)

      return () => clearTimeout(timeoutId)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
      setIsSearching(false)
    }
  }, [searchQuery, allProducts])

  // Cerrar menú móvil al redimensionar a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Función de búsqueda
  const handleSearch = (e) => {
    e?.preventDefault()
    if (searchQuery.trim()) {
      const encodedQuery = encodeURIComponent(searchQuery.trim())
      window.location.href = `/buscar?q=${encodedQuery}`
    }
  }

  // Pressionar Enter na busca
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const formatPrice = (price) => {
    return `$${price.toLocaleString('es-AR')}`
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 backdrop-blur-xl border-b-2 transition-all duration-300 ${
          isScrolled 
            ? 'dark:bg-black/95 dark:border-white/20 dark:shadow-lg dark:shadow-white/5 bg-white/95 border-black/20 shadow-lg shadow-black/5'
            : 'dark:bg-black dark:border-white/10 bg-white border-black/10'
        }`}
      >
        {/* TOP BAR - Logo, Search, Cart */}
        <div className="container mx-auto px-4 md:px-6 py-3">
          <div className="flex items-center justify-between lg:justify-center gap-4 md:gap-6 max-w-7xl mx-auto">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 transition-colors duration-200 order-1"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - Center */}
            <Link href="/" className="flex items-center group flex-shrink-0 order-2 lg:order-1">
              <div className="relative w-36 h-11 md:w-40 md:h-12 transition-all duration-300 group-hover:scale-105">
                <OptimizedImage
                  src={isDark ? "/images/logo/LOGO_BRANCO.webp" : "/images/logo/LOGO_BRANCO.webp"}
                  alt="Retrobox Logo"
                  fill
                  className="object-contain transition-opacity duration-300 dark:brightness-100 brightness-0"
                  priority
                />
                <div className="absolute inset-0 dark:bg-white/0 dark:group-hover:bg-white/5 bg-black/0 group-hover:bg-black/5 transition-all duration-300 blur-xl" />
              </div>
            </Link>

            {/* Search Bar - Desktop Only */}
            <div className="hidden lg:flex flex-1 max-w-xl order-3 lg:order-2" ref={searchRef}>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar camisetas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pr-12 dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder-gray-400 dark:focus:border-white/30 bg-black/10 border-2 border-black/20 text-black placeholder-gray-600 focus:outline-none focus:border-black/30 transition-colors duration-200 rounded-lg"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-0 h-full px-4 dark:bg-white dark:text-black dark:hover:bg-gray-light bg-black text-white hover:bg-gray-dark transition-colors duration-200 rounded-r-lg"
                  aria-label="Buscar"
                >
                  <Search size={20} />
                </button>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {/* Loading State */}
                  {isSearching && searchQuery.trim().length > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 dark:bg-gray-dark dark:border-white/20 bg-white border-2 border-black/20 rounded-lg shadow-xl z-50"
                    >
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-5 h-5 dark:text-white text-black animate-spin" />
                        <span className="ml-2 dark:text-white/70 text-black/70 text-sm">Buscando...</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Results */}
                  {showSearchResults && !isSearching && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 dark:bg-gray-dark dark:border-white/20 bg-white border-2 border-black/20 rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      {searchResults.length > 0 ? (
                        <>
                          {searchResults.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.slug}`}
                              onClick={() => {
                                setShowSearchResults(false)
                                setSearchQuery('')
                              }}
                              className="flex items-center gap-3 px-4 py-3 dark:hover:bg-white/10 dark:border-white/10 hover:bg-black/10 border-b border-black/10 last:border-0 transition-colors"
                            >
                              <div className="relative w-12 h-12 dark:bg-white/10 bg-black/10 rounded flex-shrink-0">
                                <OptimizedImage
                                  src={product.image || '/images/products/placeholder.jpg'}
                                  alt={product.name}
                                  fill
                                  className="object-contain p-1"
                                  sizes="48px"
                                  quality={50}
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate dark:text-white text-black">{product.name}</p>
                                <p className="text-xs dark:text-white/60 text-black/60 truncate mb-1">
                                  {product.collection}
                                </p>
                                <p className="text-sm font-bold dark:text-white text-black">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                            </Link>
                          ))}
                          <button
                            onClick={handleSearch}
                            className="w-full px-4 py-3 dark:bg-white/5 dark:hover:bg-white/10 dark:text-white bg-black/5 hover:bg-black/10 text-black font-semibold text-sm transition-colors"
                          >
                            Ver todos los resultados para &ldquo;{searchQuery}&rdquo;
                          </button>
                        </>
                      ) : (
                        <div className="text-center py-8 px-4">
                          <p className="dark:text-white/70 text-black/70 text-sm mb-2">
                            Ningún resultado encontrado
                          </p>
                          <p className="dark:text-white/50 text-black/50 text-xs">
                            Intenta con otro término de búsqueda
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Wishlist & Cart Icons - Right */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0 order-3 lg:order-3">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Wishlist Icon */}
              <Link
                href="/favoritos"
                className="relative p-2 dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 transition-colors duration-200 group"
                aria-label="Favoritos"
              >
                <Heart size={24} className={wishlistItemCount > 0 ? 'dark:fill-white dark:text-white fill-black text-black' : ''} />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 dark:bg-white dark:text-black bg-black text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistItemCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                href="/carrito"
                className="relative p-2 dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 transition-colors duration-200"
                aria-label="Carrito de Compras"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 dark:bg-white dark:text-black dark:shadow-white/20 bg-black text-white shadow-black/20 text-[11px] font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-lg">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR - Navigation Menu (Desktop Only) */}
        <nav className="hidden lg:block border-t dark:border-white/10 border-black/10">
          <ul className="container mx-auto px-6 flex items-center justify-center space-x-1 py-3">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasSubmenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => item.hasSubmenu && setActiveSubmenu(null)}
              >
                {item.hasSubmenu ? (
                  <>
                    <button
                      className="flex items-center gap-1.5 px-3 py-2 dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 font-black text-[13px] tracking-wider uppercase transition-colors duration-200"
                    >
                      {item.name}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeSubmenu === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 dark:bg-black/95 dark:border-white/20 bg-white/95 border-2 border-black/20 backdrop-blur-md rounded-lg shadow-xl py-2 z-50"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2.5 dark:text-white dark:hover:bg-white/10 dark:hover:text-white text-black hover:bg-black/10 hover:text-black text-sm font-semibold transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 px-3 py-2 dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 font-black text-[13px] tracking-wider uppercase transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 dark:bg-black/60 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm border-r-2 z-[70] lg:hidden overflow-y-auto dark:bg-black dark:border-white/20 bg-white border-black/20"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-4 pb-3">
                  {/* Close Button */}
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 transition-colors -ml-2"
                    aria-label="Cerrar menú"
                  >
                    <X size={24} />
                  </button>

                  {/* Logo */}
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex-1 flex justify-center">
                    <div className="relative w-32 h-10">
                      <OptimizedImage
                        src="/images/logo/LOGO_BRANCO.webp"
                        alt="Retrobox"
                        fill
                        className="object-contain dark:brightness-100 brightness-0"
                        priority
                      />
                    </div>
                  </Link>

                  {/* Icons */}
                  <div className="flex items-center gap-2">
                    <Link
                      href="/favoritos"
                      onClick={() => setMobileMenuOpen(false)}
                      className="relative p-2 dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 transition-colors"
                      aria-label="Favoritos"
                    >
                      <Heart size={20} className={wishlistItemCount > 0 ? 'dark:fill-white dark:text-white fill-black text-black' : ''} />
                      {wishlistItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 dark:bg-white dark:text-black bg-black text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                          {wishlistItemCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/carrito"
                      onClick={() => setMobileMenuOpen(false)}
                      className="relative p-2 dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 transition-colors"
                      aria-label="Carrito"
                    >
                      <ShoppingCart size={20} />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 dark:bg-white dark:text-black bg-black text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>

                {/* Linha Separadora */}
                <div className="h-[2px] dark:bg-white/20 bg-black/20 mx-4" />

                {/* Mobile Menu Items */}
                <div className="flex-1 px-4 py-6 space-y-2">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="w-full"
                    >
                      {item.hasSubmenu ? (
                        <div className="w-full">
                          <button
                            onClick={() => setActiveSubmenu(activeSubmenu === item.name ? null : item.name)}
                            className="flex items-center justify-between w-full px-4 py-3 dark:text-white dark:hover:text-white/80 dark:hover:bg-white/5 text-black hover:text-black/80 hover:bg-black/5 text-base font-bold uppercase tracking-wide transition-colors duration-200 rounded-lg"
                          >
                            {item.name}
                            <ChevronDown size={18} className={`transition-transform duration-200 ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {activeSubmenu === item.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden ml-4 mt-2 space-y-1 dark:bg-black/40 bg-white/40 backdrop-blur-sm rounded-lg p-2"
                              >
                                {item.submenu.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-4 py-2 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10 text-black/80 hover:text-black hover:bg-black/10 text-sm font-medium transition-colors duration-200 rounded-lg"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center px-4 py-3 dark:text-white dark:hover:text-white/80 dark:hover:bg-white/5 text-black hover:text-black/80 hover:bg-black/5 text-base font-bold uppercase tracking-wide transition-colors duration-200 rounded-lg"
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Search Bar */}
                <div className="p-4 border-t dark:border-white/20 border-black/20">
                  <div className="relative w-full" ref={searchRef}>
                    <input
                      type="text"
                      placeholder="Buscar camisetas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3 pr-12 dark:bg-white/10 dark:border-white/20 dark:text-white dark:placeholder-gray-400 dark:focus:border-white/30 bg-black/10 border-2 border-black/20 text-black placeholder-gray-600 focus:outline-none focus:border-black/30 transition-colors duration-200 rounded-lg"
                    />
                    <button
                      onClick={handleSearch}
                      className="absolute right-0 top-0 h-full px-4 dark:bg-white dark:text-black dark:hover:bg-gray-light bg-black text-white hover:bg-gray-dark transition-colors duration-200 rounded-r-lg"
                      aria-label="Buscar"
                    >
                      <Search size={20} />
                    </button>
                  </div>

                  {/* Mobile Search Loading */}
                  {isSearching && searchQuery.trim().length > 1 && (
                    <div className="mt-3 flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 dark:text-white text-black animate-spin" />
                      <span className="ml-2 dark:text-white/70 text-black/70 text-sm">Buscando...</span>
                    </div>
                  )}

                  {/* Mobile Search Results */}
                  {showSearchResults && !isSearching && (
                    <div className="mt-3">
                      {searchResults.length > 0 ? (
                        <div className="dark:bg-gray-dark dark:border-white/20 bg-white border-2 border-black/20 rounded-lg overflow-hidden">
                          {searchResults.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.slug}`}
                              onClick={() => {
                                setShowSearchResults(false)
                                setSearchQuery('')
                                setMobileMenuOpen(false)
                              }}
                              className="flex items-center gap-3 px-4 py-3 dark:hover:bg-white/10 dark:border-white/10 hover:bg-black/10 border-b border-black/10 last:border-0 transition-colors"
                            >
                              <div className="relative w-12 h-12 dark:bg-white/10 bg-black/10 rounded flex-shrink-0">
                                <OptimizedImage
                                  src={product.image || '/images/products/placeholder.jpg'}
                                  alt={product.name}
                                  fill
                                  className="object-contain p-1"
                                  sizes="48px"
                                  quality={50}
                                  loading="lazy"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate dark:text-white text-black">{product.name}</p>
                                <p className="text-xs dark:text-white/60 text-black/60 truncate mb-1">
                                  {product.collection}
                                </p>
                                <p className="text-sm font-bold dark:text-white text-black">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 px-4">
                          <p className="dark:text-white/70 text-black/70 text-sm mb-2">Ningún resultado encontrado</p>
                          <p className="dark:text-white/50 text-black/50 text-xs">
                            Intenta con otro término de búsqueda
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header