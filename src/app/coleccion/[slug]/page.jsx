'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import ProductCard from '@/components/store/ProductCard'
import SectionTitle from '@/components/store/SectionTitle'
import { getAllProducts } from '@/utils/products'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Filter, X } from 'lucide-react'

// Mapeo de slugs a nombres de colección y metadatos
const COLLECTION_INFO = {
  // Equipos Argentinos
  'boca-juniors': {
    name: 'Boca Juniors',
    description: 'Camisetas retro del Club Atlético Boca Juniors',
    logo: '/images/collections/boca-juniors-logo.png',
    keywords: ['Boca', 'Boca Juniors', 'CABJ']
  },
  'river-plate': {
    name: 'River Plate',
    description: 'Camisetas retro del Club Atlético River Plate',
    logo: '/images/collections/river-plate-logo.png',
    keywords: ['River', 'River Plate', 'CARP']
  },
  'racing-club': {
    name: 'Racing Club',
    description: 'Camisetas retro del Racing Club',
    logo: '/images/collections/racing-club.png',
    keywords: ['Racing', 'Racing Club']
  },
  'independiente': {
    name: 'Independiente',
    description: 'Camisetas retro del Club Atlético Independiente',
    logo: '/images/collections/Independiente.png',
    keywords: ['Independiente', 'CAI']
  },
  'san-lorenzo': {
    name: 'San Lorenzo',
    description: 'Camisetas retro del Club Atlético San Lorenzo de Almagro',
    logo: '/images/collections/San-Lorenzo.png',
    keywords: ['San Lorenzo', 'CASLA']
  },
  'newells-old-boys': {
    name: "Newell's Old Boys",
    description: "Camisetas retro de Newell's Old Boys",
    logo: '/images/collections/Newell\'s_Old_Boys.png',
    keywords: ['Newells', 'Newell\'s', 'NOB']
  },
  'rosario-central': {
    name: 'Rosario Central',
    description: 'Camisetas retro del Club Atlético Rosario Central',
    logo: '/images/collections/Rosário-Central.png',
    keywords: ['Rosario Central', 'Central']
  },
  'boca': {
    name: 'Boca Juniors',
    description: 'Camisetas retro del Club Atlético Boca Juniors',
    logo: '/images/collections/boca-juniors-logo.png',
    keywords: ['Boca', 'Boca Juniors', 'CABJ']
  },
  'river': {
    name: 'River Plate',
    description: 'Camisetas retro del Club Atlético River Plate',
    logo: '/images/collections/river-plate-logo.png',
    keywords: ['River', 'River Plate', 'CARP']
  },
  'argentina': {
    name: 'Selección Argentina',
    description: 'Camisetas retro de la Selección Argentina',
    logo: '/images/collections/argentina.png',
    keywords: ['Argentina', 'Selección Argentina', 'AFA', 'Albiceleste']
  },

  // Ligas
  'premier-league': {
    name: 'Premier League',
    description: 'Camisetas de equipos de la Premier League inglesa',
    logo: '/images/collections/ligas/premierleague.webp',
    keywords: ['Premier League', 'Inglaterra', 'English Premier League']
  },
  'la-liga': {
    name: 'La Liga',
    description: 'Camisetas de equipos de La Liga española',
    logo: '/images/collections/ligas/laliga.webp',
    keywords: ['La Liga', 'España', 'Spanish La Liga']
  },
  'serie-a': {
    name: 'Serie A',
    description: 'Camisetas de equipos de la Serie A italiana',
    logo: '/images/collections/ligas/serieA.webp',
    keywords: ['Serie A', 'Italia', 'Italian Serie A']
  },
  'bundesliga': {
    name: 'Bundesliga',
    description: 'Camisetas de equipos de la Bundesliga alemana',
    logo: '/images/collections/ligas/bundesliga.webp',
    keywords: ['Bundesliga', 'Alemania', 'German Bundesliga']
  },
  'ligue-1': {
    name: 'Ligue 1',
    description: 'Camisetas de equipos de la Ligue 1 francesa',
    logo: '/images/collections/ligas/ligue1.webp',
    keywords: ['Ligue 1', 'Francia', 'French Ligue 1']
  },
  'liga-portugal': {
    name: 'Liga Portugal',
    description: 'Camisetas de equipos de la Liga Portugal',
    logo: '/images/collections/ligas/liga_portugal.webp',
    keywords: ['Liga Portugal', 'Portugal', 'Portuguese League']
  },
  'brasileirao': {
    name: 'Brasileirão',
    description: 'Camisetas de equipos del Brasileirão',
    logo: '/images/collections/ligas/brasileirao.webp',
    keywords: ['Brasileirão', 'Brasil', 'Brazilian League']
  },

  // Equipos Internacionales
  'real-madrid': {
    name: 'Real Madrid',
    description: 'Camisetas retro del Real Madrid',
    logo: '/images/collections/Real_Madrid.png',
    keywords: ['Real Madrid', 'Madrid', 'Real']
  },
  'fc-barcelona': {
    name: 'FC Barcelona',
    description: 'Camisetas retro del FC Barcelona',
    logo: '/images/collections/FCBarcelona.svg.png',
    keywords: ['Barcelona', 'Barça', 'FCB']
  },
  'manchester-united': {
    name: 'Manchester United',
    description: 'Camisetas retro del Manchester United',
    logo: '/images/collections/Manchester_United_FC.png',
    keywords: ['Manchester United', 'Man Utd', 'United']
  },
  'manchester-city': {
    name: 'Manchester City',
    description: 'Camisetas retro del Manchester City',
    logo: '/images/collections/Manchester_City.png',
    keywords: ['Manchester City', 'Man City', 'City']
  },
  'liverpool': {
    name: 'Liverpool',
    description: 'Camisetas retro del Liverpool FC',
    logo: '/images/collections/liverpool.png',
    keywords: ['Liverpool', 'LFC']
  },
  'arsenal': {
    name: 'Arsenal',
    description: 'Camisetas retro del Arsenal FC',
    logo: '/images/collections/Arsenal.png',
    keywords: ['Arsenal', 'AFC']
  },
  'chelsea': {
    name: 'Chelsea',
    description: 'Camisetas retro del Chelsea FC',
    logo: '/images/collections/Chelsea.png',
    keywords: ['Chelsea', 'CFC']
  },
  'ac-milan': {
    name: 'AC Milan',
    description: 'Camisetas retro del AC Milan',
    logo: '/images/collections/milan.png',
    keywords: ['Milan', 'AC Milan', 'ACM']
  },
  'psg': {
    name: 'PSG',
    description: 'Camisetas retro del Paris Saint-Germain',
    logo: '/images/collections/PSG.png',
    keywords: ['PSG', 'Paris', 'Paris Saint-Germain']
  },
  'inter-miami': {
    name: 'Inter Miami',
    description: 'Camisetas del Inter Miami CF',
    logo: '/images/collections/Inter-miami.png',
    keywords: ['Inter Miami', 'Miami', 'Messi']
  },

  // Selecciones Nacionales - Colección General
  'selecciones-nacionales': {
    name: 'Selecciones Nacionales',
    description: 'Camisetas retro de las mejores selecciones del mundo',
    logo: '/images/collections/argentina-logo.png',
    keywords: [
      'Argentina', 'Selección', 'Albiceleste', 'AFA',
      'Brasil', 'Brazil', 'CBF', 'Seleção',
      'Alemania', 'Germany', 'DFB', 'Die Mannschaft',
      'Francia', 'France', 'FFF', 'Les Bleus',
      'Inglaterra', 'England', 'FA', 'Three Lions',
      'Italia', 'Italy', 'FIGC', 'Azzurri',
      'España', 'Spain', 'RFEF', 'La Roja',
      'Portugal', 'FPF', 'Seleção das Quinas',
      'Holanda', 'Netherlands', 'KNVB', 'Oranje',
      'Uruguay', 'AUF', 'Celeste',
      'México', 'Mexico', 'FMF', 'El Tri',
      'Selección Nacional', 'National Team'
    ]
  },

  // Selecciones Nacionales Individuales
  'seleccion-argentina': {
    name: 'Selección Argentina',
    description: 'Camisetas retro de la Selección Argentina - Tri Campeón del Mundo',
    logo: '/images/collections/argentina-logo.png',
    keywords: ['Argentina', 'Selección', 'Albiceleste', 'AFA']
  },
  'seleccion-brasil': {
    name: 'Selección Brasil',
    description: 'Camisetas retro de la Selección de Brasil',
    logo: '/images/collections/selecciones/brasil.png',
    keywords: ['Brasil', 'Brazil', 'CBF', 'Seleção']
  },
  'seleccion-alemania': {
    name: 'Selección Alemania',
    description: 'Camisetas retro de la Selección de Alemania',
    logo: '/images/collections/selecciones/alemania.png',
    keywords: ['Alemania', 'Germany', 'DFB', 'Die Mannschaft']
  },
  'seleccion-francia': {
    name: 'Selección Francia',
    description: 'Camisetas retro de la Selección de Francia',
    logo: '/images/collections/selecciones/francia.png',
    keywords: ['Francia', 'France', 'FFF', 'Les Bleus']
  },
  'seleccion-inglaterra': {
    name: 'Selección Inglaterra',
    description: 'Camisetas retro de la Selección de Inglaterra',
    logo: '/images/collections/selecciones/inglaterra.png',
    keywords: ['Inglaterra', 'England', 'FA', 'Three Lions']
  },
  'seleccion-italia': {
    name: 'Selección Italia',
    description: 'Camisetas retro de la Selección de Italia',
    logo: '/images/collections/selecciones/italia.png',
    keywords: ['Italia', 'Italy', 'FIGC', 'Azzurri']
  },
  'seleccion-espana': {
    name: 'Selección España',
    description: 'Camisetas retro de la Selección de España',
    logo: '/images/collections/selecciones/espana.png',
    keywords: ['España', 'Spain', 'RFEF', 'La Roja']
  },
  'seleccion-portugal': {
    name: 'Selección Portugal',
    description: 'Camisetas retro de la Selección de Portugal',
    logo: '/images/collections/selecciones/portugal.png',
    keywords: ['Portugal', 'FPF', 'Seleção das Quinas']
  },
  'seleccion-holanda': {
    name: 'Selección Holanda',
    description: 'Camisetas retro de la Selección de Holanda',
    logo: '/images/collections/selecciones/holanda.png',
    keywords: ['Holanda', 'Netherlands', 'KNVB', 'Oranje']
  },
  'seleccion-uruguay': {
    name: 'Selección Uruguay',
    description: 'Camisetas retro de la Selección de Uruguay',
    logo: '/images/collections/selecciones/uruguay.png',
    keywords: ['Uruguay', 'AUF', 'Celeste']
  },
  'seleccion-mexico': {
    name: 'Selección México',
    description: 'Camisetas retro de la Selección de México',
    logo: '/images/collections/selecciones/mexico.png',
    keywords: ['México', 'Mexico', 'FMF', 'El Tri']
  },

  // Colecciones Especiales
  'productos-destacados': {
    name: 'Productos Destacados',
    description: 'Selección especial de camisetas retrô exclusivas',
    logo: null,
    keywords: ['Destacados', 'Featured', 'Especial', 'Exclusivo']
  }
}

export default function ColeccionPage() {
  const params = useParams()
  const slug = params.slug
  const collectionInfo = COLLECTION_INFO[slug]

  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState([])
  const [availableFilters, setAvailableFilters] = useState([])

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)

      if (!collectionInfo) {
        setAllProducts([])
        setFilteredProducts([])
        setLoading(false)
        return
      }

      // Para "productos-destacados", buscar diretamente do Shopify
      if (slug === 'productos-destacados') {
        try {
          const { getCollectionProducts } = await import('@/lib/shopifyCheckout')
          const shopifyProducts = await getCollectionProducts('productos-destacados', 100)
          
          if (shopifyProducts && shopifyProducts.length > 0) {
            setAllProducts(shopifyProducts)
            setFilteredProducts(shopifyProducts)
            extractFilters(shopifyProducts)
          } else {
            // Fallback para produtos locais se não encontrar no Shopify
            const products = await getAllProducts()
            const filtered = products.filter(product => {
              const searchText = `${product.name} ${product.tags?.join(' ') || ''} ${product.collection || ''}`.toLowerCase()
              return collectionInfo.keywords.some(keyword =>
                searchText.includes(keyword.toLowerCase())
              )
            })
            setAllProducts(filtered)
            setFilteredProducts(filtered)
            extractFilters(filtered)
          }
        } catch (error) {
          console.error('Error loading productos destacados from Shopify:', error)
          // Fallback para produtos locais
          const products = await getAllProducts()
          const filtered = products.filter(product => {
            const searchText = `${product.name} ${product.tags?.join(' ') || ''} ${product.collection || ''}`.toLowerCase()
            return collectionInfo.keywords.some(keyword =>
              searchText.includes(keyword.toLowerCase())
            )
          })
          setAllProducts(filtered)
          setFilteredProducts(filtered)
          extractFilters(filtered)
        }
      } else {
        // Para outras coleções, usar a lógica existente
        const products = await getAllProducts()

        // Filtrar productos que pertenecen a la colección
        const filtered = products.filter(product => {
          // Verificar si el nombre de la colección está en las tags o en el nombre del producto
          const searchText = `${product.name} ${product.tags?.join(' ') || ''} ${product.collection || ''}`.toLowerCase()

          // Verificar si alguna palabra clave de la colección está en el producto
          return collectionInfo.keywords.some(keyword =>
            searchText.includes(keyword.toLowerCase())
          )
        })

        setAllProducts(filtered)
        setFilteredProducts(filtered)

        // Extraer filtros disponibles de los productos
        extractFilters(filtered)
      }

      setLoading(false)
    }

    loadProducts()
  }, [slug, collectionInfo])

  // Aplicar filtros cuando cambian
  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredProducts(allProducts)
    } else {
      const filtered = allProducts.filter(product => {
        const searchText = `${product.name} ${product.tags?.join(' ') || ''} ${product.collection || ''}`.toLowerCase()

        // Producto debe coincidir con al menos un filtro activo
        return activeFilters.some(filter =>
          searchText.includes(filter.toLowerCase())
        )
      })
      setFilteredProducts(filtered)
    }
  }, [activeFilters, allProducts])

  // Extraer filtros únicos de los productos
  function extractFilters(products) {
    const filters = new Set()

    // Para selecciones nacionales, extraer equipos/países
    if (slug === 'selecciones-nacionales') {
      const nationalTeams = [
        'Argentina', 'Brasil', 'Alemania', 'Francia', 'Inglaterra',
        'Italia', 'España', 'Portugal', 'Holanda', 'Uruguay', 'México'
      ]

      nationalTeams.forEach(team => {
        const hasProducts = products.some(product => {
          const searchText = `${product.name} ${product.tags?.join(' ') || ''}`.toLowerCase()
          return searchText.includes(team.toLowerCase())
        })
        if (hasProducts) {
          filters.add(team)
        }
      })
    }
    // Para ligas, extraer equipos específicos
    else if (['premier-league', 'la-liga', 'serie-a', 'bundesliga', 'ligue-1', 'liga-portugal', 'brasileirao'].includes(slug)) {
      products.forEach(product => {
        // Extraer nombre del equipo del nombre del producto (primera parte antes del año)
        const match = product.name.match(/^([A-Za-z\s]+?)(?:\s+\d{2}[-\/]\d{2}|\s+\d{4})/i)
        if (match) {
          const teamName = match[1].trim()
          if (teamName.length > 2) {
            filters.add(teamName)
          }
        }
      })
    }
    // Para otras colecciones, el filtro puede ser por año o tipo
    else {
      products.forEach(product => {
        // Extraer años del nombre del producto
        const yearMatch = product.name.match(/\d{2}[-\/]\d{2}|\d{4}/g)
        if (yearMatch) {
          yearMatch.forEach(year => filters.add(year))
        }
      })
    }

    setAvailableFilters(Array.from(filters).sort())
  }

  function toggleFilter(filter) {
    setActiveFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    )
  }

  function clearFilters() {
    setActiveFilters([])
  }

  if (!collectionInfo) {
    return (
      <>
        <Header />
        <div className="min-h-screen dark:bg-black bg-white flex items-center justify-center transition-colors duration-300">
          <div className="text-center">
            <h1 className="text-2xl font-bold dark:text-white text-black mb-4">Colección no encontrada</h1>
            <a href="/" className="dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 transition-colors">Volver a la tienda</a>
          </div>
        </div>
        <StoreFooter />
      </>
    )
  }

  return (
    <div className="min-h-screen dark:bg-black bg-white transition-colors duration-300">
      <Header />

      <main className="dark:text-white text-black">
        {/* Hero Section */}
        <div className="relative dark:bg-gradient-to-b dark:from-gray-dark dark:to-black bg-gradient-to-b from-gray-100 to-white py-12 md:py-16 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
              {/* Logo */}
              {collectionInfo.logo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0"
                >
                  <Image
                    src={collectionInfo.logo}
                    alt={collectionInfo.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>
              )}

              {/* Title & Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center md:text-left"
              >
                <h1 className="text-4xl md:text-5xl font-black dark:text-white text-black mb-4">
                  {collectionInfo.name}
                </h1>
                <p className="text-lg dark:text-white/70 text-black/70">
                  {collectionInfo.description}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        {!loading && availableFilters.length > 0 && (
          <div className="dark:border-b dark:border-white/10 dark:bg-white/[0.02] border-b border-black/10 bg-black/[0.02] backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 md:py-6">
              <div className="max-w-6xl mx-auto">
                {/* Header - Mobile & Desktop */}
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 dark:bg-white/10 bg-black/10 rounded-lg">
                      <Filter className="w-4 h-4 dark:text-white text-black" />
                    </div>
                    <span className="dark:text-white text-black font-bold text-sm md:text-base">
                      Filtrar
                      {activeFilters.length > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-gradient-to-r from-white to-blue-100 text-black rounded-full">
                          {activeFilters.length}
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Clear Filters Button - Always visible when filters active */}
                  {activeFilters.length > 0 && (
                    <motion.button
                      onClick={clearFilters}
                      className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white bg-black/10 hover:bg-black/20 rounded-lg transition-all text-xs md:text-sm text-black font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Limpiar</span>
                    </motion.button>
                  )}
                </div>

                {/* Filter Chips - Horizontal scroll on mobile */}
                <div className="relative">
                  {/* Gradient fade edges on mobile */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 dark:bg-gradient-to-r dark:from-black/50 bg-gradient-to-r from-white/50 to-transparent pointer-events-none z-10 md:hidden" />
                  <div className="absolute right-0 top-0 bottom-0 w-8 dark:bg-gradient-to-l dark:from-black/50 bg-gradient-to-l from-white/50 to-transparent pointer-events-none z-10 md:hidden" />

                  <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="flex md:flex-wrap gap-2 pb-2 md:pb-0">
                      {availableFilters.map((filter) => {
                        const isActive = activeFilters.includes(filter)
                        return (
                          <motion.button
                            key={filter}
                            onClick={() => toggleFilter(filter)}
                            className={`
                              flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all border-2
                              ${isActive
                                ? 'dark:bg-gradient-to-r dark:from-white dark:to-blue-100 dark:text-black dark:border-blue-200 dark:shadow-blue-200/20 bg-gradient-to-r from-black to-gray-800 text-white border-gray-600 shadow-lg shadow-gray-600/20'
                                : 'dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10 dark:hover:border-white/20 bg-black/5 text-black border-black/10 hover:bg-black/10 hover:border-black/20'
                              }
                            `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {filter}
                          </motion.button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 dark:border-b-2 dark:border-white border-b-2 border-black"></div>
              <p className="dark:text-gray-medium text-gray-600 mt-4">Cargando productos...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <p className="dark:text-white/60 text-black/60 text-center mb-8">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                {activeFilters.length > 0 && (
                  <span className="ml-2">
                    ({allProducts.length} en total)
                  </span>
                )}
              </p>
              <motion.div
                className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
                layout
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    layout
                  >
                    <ProductCard product={product} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : activeFilters.length > 0 ? (
            <div className="text-center py-12">
              <p className="dark:text-gray-medium text-gray-600 text-lg mb-4">No se encontraron productos con los filtros seleccionados</p>
              <button
                onClick={clearFilters}
                className="inline-block dark:bg-gradient-to-r dark:from-white dark:to-blue-100 dark:text-black bg-gradient-to-r from-black to-gray-800 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="dark:text-gray-medium text-gray-600 text-lg mb-4">No hay productos disponibles en esta colección</p>
              <p className="dark:text-white/50 text-black/50 text-sm mb-6">Pronto agregaremos nuevos productos. ¡Volvé pronto!</p>
              <a
                href="/"
                className="inline-block dark:bg-gradient-to-r dark:from-white dark:to-blue-100 dark:text-black bg-gradient-to-r from-black to-gray-800 text-white font-bold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
              >
                Ver todos los productos
              </a>
            </div>
          )}
        </div>
      </main>

      <StoreFooter />
    </div>
  )
}
