'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import ProductCard from '@/components/store/ProductCard'
import SectionTitle from '@/components/store/SectionTitle'
import { getAllProducts } from '@/utils/products'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, ChevronRight } from 'lucide-react'

export default function AllProductsPage() {
  const [allProducts, setAllProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilters, setActiveFilters] = useState([])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [availableTeamsByCategory, setAvailableTeamsByCategory] = useState({
    selecciones: [],
    argentinos: [],
    premierLeague: [],
    laLiga: [],
    serieA: [],
    bundesliga: [],
    ligue1: [],
    otros: []
  })

  // Lista completa de times/seleções organizados por categoria
  // Baseado na análise real dos produtos disponíveis
  const teamsByCategory = {
    selecciones: [
      'Argentina', 'Brasil', 'Alemania', 'España', 'Francia', 
      'Holanda', 'Inglaterra', 'Italia', 'México', 'Portugal'
    ],
    argentinos: [
      'Boca Juniors', 'River Plate', 'Racing Club', 'Independiente',
      'San Lorenzo', "Newell's Old Boys", 'Instituto'
    ],
    premierLeague: [
      'Arsenal', 'Chelsea', 'Leicester', 'Manchester City',
      'Manchester United', 'Tottenham'
    ],
    laLiga: [
      'Real Madrid', 'FC Barcelona', 'Barcelona', 'Atlético Madrid', 'Valencia'
    ],
    serieA: [
      'AC Milan', 'Inter Milan', 'Lazio', 'Napoli', 'Roma'
    ],
    bundesliga: [
      'Bayern Munich', 'Bayern Múnich', 'Borussia Dortmund', 'Bayer Leverkusen'
    ],
    ligue1: [
      'PSG', 'Marseille', 'Olympique de Marseille'
    ],
    otros: [
      'Porto', 'PSV', 'Fenerbahçe', 'Santos'
    ]
  }

  // Flatten todas as categorias em uma lista única para busca
  const allTeamsList = Object.values(teamsByCategory).flat()

  useEffect(() => {
    async function loadProducts() {
      setLoading(true)
      const allProds = await getAllProducts()
      setAllProducts(allProds)
      setFilteredProducts(allProds)
      
      // Verificar quais times têm produtos disponíveis
      const teamsWithProducts = {
        selecciones: [],
        argentinos: [],
        premierLeague: [],
        laLiga: [],
        serieA: [],
        bundesliga: [],
        ligue1: [],
        otros: []
      }
      
      allProds.forEach(product => {
        const name = (product.name || '').toLowerCase()
        const tags = (product.tags || []).map(t => t.toLowerCase()).join(' ')
        const desc = (product.description || '').toLowerCase()
        const searchText = name + ' ' + tags + ' ' + desc
        
        // Determinar liga primeiro pela descrição/tags
        let detectedLeague = null
        if (searchText.includes('premier league') || searchText.includes('premier')) {
          detectedLeague = 'premierLeague'
        } else if (searchText.includes('la liga') || searchText.includes('laliga')) {
          detectedLeague = 'laLiga'
        } else if (searchText.includes('serie a') || searchText.includes('seriea')) {
          detectedLeague = 'serieA'
        } else if (searchText.includes('bundesliga')) {
          detectedLeague = 'bundesliga'
        } else if (searchText.includes('ligue 1') || searchText.includes('ligue1')) {
          detectedLeague = 'ligue1'
        } else if (searchText.includes('selecciones') || searchText.includes('selección')) {
          detectedLeague = 'selecciones'
        } else if (searchText.includes('primera división') || searchText.includes('primera division')) {
          detectedLeague = 'argentinos'
        }
        
        // Verificar cada categoria de times
        Object.keys(teamsByCategory).forEach(category => {
          teamsByCategory[category].forEach(team => {
            const teamLower = team.toLowerCase()
            let teamVariations = [
              teamLower,
              teamLower.replace(' ', '-'),
              teamLower.replace(' ', ''),
              teamLower.replace("'", ''),
              teamLower.replace("'", ' ')
            ]
            
            // Variações específicas de nomes
            if (team === 'Barcelona' || team === 'FC Barcelona') {
              teamVariations.push('barcelona', 'fc barcelona')
            }
            if (team === 'Bayern Munich' || team === 'Bayern Múnich') {
              teamVariations.push('bayern', 'bayern munich', 'bayern múnich', 'bayern munich')
            }
            if (team === 'Marseille' || team === 'Olympique de Marseille') {
              teamVariations.push('marseille', 'marsella', 'olympique de marseille', 'olympique de marsella')
            }
            if (team === 'Santos') {
              teamVariations.push('santos')
            }
            
            // Verificar se o time aparece no produto
            const teamFound = teamVariations.some(variation => searchText.includes(variation))
            
            if (teamFound) {
              // Exceções especiais
              if (team === 'Barcelona' || team === 'FC Barcelona') {
                // Normalizar para FC Barcelona na La Liga
                const normalizedTeam = 'FC Barcelona'
                if (detectedLeague === 'laLiga' || (!detectedLeague && category === 'laLiga')) {
                  if (!teamsWithProducts.laLiga.includes(normalizedTeam)) {
                    teamsWithProducts.laLiga.push(normalizedTeam)
                  }
                }
                return
              }
              if (team === 'Bayern Munich' || team === 'Bayern Múnich') {
                // Normalizar para Bayern Munich na Bundesliga
                const normalizedTeam = 'Bayern Munich'
                if (detectedLeague === 'bundesliga' || (!detectedLeague && category === 'bundesliga')) {
                  if (!teamsWithProducts.bundesliga.includes(normalizedTeam)) {
                    teamsWithProducts.bundesliga.push(normalizedTeam)
                  }
                }
                return
              }
              if (team === 'Marseille' || team === 'Olympique de Marseille') {
                // Normalizar para Marseille na Ligue 1
                const normalizedTeam = 'Marseille'
                if (detectedLeague === 'ligue1' || (!detectedLeague && category === 'ligue1')) {
                  if (!teamsWithProducts.ligue1.includes(normalizedTeam)) {
                    teamsWithProducts.ligue1.push(normalizedTeam)
                  }
                }
                return
              }
              if (team === 'Arsenal') {
                // Arsenal de Sarandí não é Premier League
                if (searchText.includes('arsenal de sarandí') || searchText.includes('arsenal sarandi')) {
                  // Não adicionar Arsenal (Premier League) se for Arsenal de Sarandí
                  return
                }
                // Arsenal normal é Premier League
                if (detectedLeague === 'premierLeague' || (!detectedLeague && category === 'premierLeague')) {
                  if (!teamsWithProducts.premierLeague.includes(team)) {
                    teamsWithProducts.premierLeague.push(team)
                  }
                }
              } else if (team === 'Argentina' && category === 'selecciones') {
                // Argentina como seleção (não clube argentino)
                if (detectedLeague === 'selecciones' || (!detectedLeague && category === 'selecciones')) {
                  // Verificar se não é um produto de clube argentino
                  if (!searchText.includes('boca') && !searchText.includes('river') && 
                      !searchText.includes('racing') && !searchText.includes('independiente') &&
                      !searchText.includes('san lorenzo') && !searchText.includes('newell')) {
                    if (!teamsWithProducts.selecciones.includes(team)) {
                      teamsWithProducts.selecciones.push(team)
                    }
                  }
                }
              } else {
                // Usar liga detectada ou categoria padrão do time
                const targetCategory = detectedLeague || category
                if (!teamsWithProducts[targetCategory] || !teamsWithProducts[targetCategory].includes(team)) {
                  if (!teamsWithProducts[targetCategory]) {
                    teamsWithProducts[targetCategory] = []
                  }
                  teamsWithProducts[targetCategory].push(team)
                }
              }
            }
          })
        })
      })
      
      // Ordenar times dentro de cada categoria
      Object.keys(teamsWithProducts).forEach(category => {
        teamsWithProducts[category].sort()
      })
      
      // Armazenar times disponíveis por categoria
      setAvailableTeamsByCategory(teamsWithProducts)
      setLoading(false)
    }
    loadProducts()
  }, [])

  // Aplicar filtros quando mudam
  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredProducts(allProducts)
    } else {
      const filtered = allProducts.filter(product => {
        const name = (product.name || '').toLowerCase()
        const tags = (product.tags || []).map(t => t.toLowerCase()).join(' ')
        const desc = (product.description || '').toLowerCase()
        const searchText = name + ' ' + tags + ' ' + desc
        
        return activeFilters.some(filter => {
          const filterLower = filter.toLowerCase()
          let variations = [
            filterLower,
            filterLower.replace(' ', '-'),
            filterLower.replace(' ', ''),
            filterLower.replace("'", ''),
            filterLower.replace("'", ' ')
          ]
          
          // Variações específicas
          if (filter === 'FC Barcelona' || filter === 'Barcelona') {
            variations.push('barcelona', 'fc barcelona')
          }
          if (filter === 'Bayern Munich' || filter === 'Bayern Múnich') {
            variations.push('bayern', 'bayern munich', 'bayern múnich')
          }
          if (filter === 'Marseille' || filter === 'Olympique de Marseille') {
            variations.push('marseille', 'marsella', 'olympique de marseille', 'olympique de marsella')
          }
          
          // Busca mais flexível para nomes compostos
          const found = variations.some(variation => searchText.includes(variation))
          
          // Exceções especiais
          if (filter === 'Arsenal') {
            // Não pegar Arsenal de Sarandí quando filtrar por Arsenal (Premier League)
            if (searchText.includes('arsenal de sarandí') || searchText.includes('arsenal sarandi')) {
              return false
            }
          }
          
          return found
        })
      })
      setFilteredProducts(filtered)
    }
  }, [activeFilters, allProducts])

  function toggleFilter(team) {
    setActiveFilters(prev =>
      prev.includes(team)
        ? prev.filter(f => f !== team)
        : [...prev, team]
    )
  }

  function clearFilters() {
    setActiveFilters([])
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen dark:bg-black dark:text-white bg-white text-black transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <SectionTitle
            title="Todos Los"
            highlight="Productos"
            subtitle={`${filteredProducts.length} ${filteredProducts.length === 1 ? 'producto' : 'productos'} ${activeFilters.length > 0 ? `de ${activeFilters.join(', ')}` : 'disponibles'}`}
          />

          {/* Filters Section - Accordion */}
          {!loading && (availableTeamsByCategory.selecciones.length > 0 || 
                        availableTeamsByCategory.argentinos.length > 0 || 
                        availableTeamsByCategory.premierLeague.length > 0 ||
                        availableTeamsByCategory.laLiga.length > 0 ||
                        availableTeamsByCategory.serieA.length > 0 ||
                        availableTeamsByCategory.bundesliga.length > 0 ||
                        availableTeamsByCategory.ligue1.length > 0 ||
                        availableTeamsByCategory.otros.length > 0) && (
            <div className="dark:border-b dark:border-white/10 dark:bg-white/[0.02] border-b border-black/10 bg-black/[0.02] backdrop-blur-sm mb-6 md:mb-8 rounded-lg overflow-hidden">
              {/* Botão para abrir/fechar filtros */}
              <motion.button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="w-full flex items-center justify-between p-4 md:p-5 dark:hover:bg-white/5 hover:bg-black/5 transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 dark:bg-white/10 bg-black/10 rounded-lg">
                    <Filter className="w-4 h-4 md:w-5 md:h-5 dark:text-white text-black" />
                  </div>
                  <span className="dark:text-white text-black font-bold text-sm md:text-base">
                    Filtrar por Equipo
                    {activeFilters.length > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold bg-gradient-to-r from-white to-blue-100 text-black rounded-full">
                        {activeFilters.length}
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {activeFilters.length > 0 && (
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        clearFilters()
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white bg-black/10 hover:bg-black/20 rounded-lg transition-all text-xs md:text-sm text-black font-medium"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-3 h-3 md:w-4 md:h-4" />
                      <span className="hidden sm:inline">Limpiar</span>
                    </motion.button>
                  )}
                  <motion.div
                    animate={{ rotate: isFiltersOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="dark:text-white text-black"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                </div>
              </motion.button>

              {/* Conteúdo do accordion */}
              <AnimatePresence>
                {isFiltersOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6">

                {/* Filter Chips por Categoria */}
                <div className="space-y-4 md:space-y-5">
                  {/* Selecciones Nacionales */}
                  {availableTeamsByCategory.selecciones.length > 0 && (
                    <div>
                      <h3 className="dark:text-white/70 text-black/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3 px-1">
                        Selecciones Nacionales
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {availableTeamsByCategory.selecciones.map((team) => {
                        const isActive = activeFilters.includes(team)
                        return (
                          <motion.button
                            key={team}
                            onClick={() => toggleFilter(team)}
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
                            {team}
                          </motion.button>
                        )
                      })}
                      </div>
                    </div>
                  )}

                  {/* Clubes Argentinos */}
                  {availableTeamsByCategory.argentinos.length > 0 && (
                    <div>
                      <h3 className="dark:text-white/70 text-black/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3 px-1">
                        Clubes Argentinos
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {availableTeamsByCategory.argentinos.map((team) => {
                        const isActive = activeFilters.includes(team)
                        return (
                          <motion.button
                            key={team}
                            onClick={() => toggleFilter(team)}
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
                            {team}
                          </motion.button>
                        )
                      })}
                      </div>
                    </div>
                  )}

                  {/* Premier League */}
                  {availableTeamsByCategory.premierLeague.length > 0 && (
                    <div>
                      <h3 className="dark:text-white/70 text-black/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3 px-1">
                        Premier League
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {availableTeamsByCategory.premierLeague.map((team) => {
                        const isActive = activeFilters.includes(team)
                        return (
                          <motion.button
                            key={team}
                            onClick={() => toggleFilter(team)}
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
                            {team}
                          </motion.button>
                        )
                      })}
                      </div>
                    </div>
                  )}

                  {/* La Liga */}
                  {availableTeamsByCategory.laLiga.length > 0 && (
                    <div>
                      <h3 className="dark:text-white/70 text-black/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3 px-1">
                        La Liga
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {availableTeamsByCategory.laLiga.map((team) => {
                        const isActive = activeFilters.includes(team)
                        return (
                          <motion.button
                            key={team}
                            onClick={() => toggleFilter(team)}
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
                            {team}
                          </motion.button>
                        )
                      })}
                      </div>
                    </div>
                  )}

                  {/* Serie A */}
                  {availableTeamsByCategory.serieA.length > 0 && (
                    <div>
                      <h3 className="dark:text-white/70 text-black/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3 px-1">
                        Serie A
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {availableTeamsByCategory.serieA.map((team) => {
                        const isActive = activeFilters.includes(team)
                        return (
                          <motion.button
                            key={team}
                            onClick={() => toggleFilter(team)}
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
                            {team}
                          </motion.button>
                        )
                      })}
                      </div>
                    </div>
                  )}

                  {/* Bundesliga */}
                  {availableTeamsByCategory.bundesliga.length > 0 && (
                    <div>
                      <h3 className="dark:text-white/70 text-black/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3 px-1">
                        Bundesliga
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {availableTeamsByCategory.bundesliga.map((team) => {
                        const isActive = activeFilters.includes(team)
                        return (
                          <motion.button
                            key={team}
                            onClick={() => toggleFilter(team)}
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
                            {team}
                          </motion.button>
                        )
                      })}
                      </div>
                    </div>
                  )}

                  {/* Ligue 1 */}
                  {availableTeamsByCategory.ligue1.length > 0 && (
                    <div>
                      <h3 className="dark:text-white/70 text-black/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3 px-1">
                        Ligue 1
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {availableTeamsByCategory.ligue1.map((team) => {
                        const isActive = activeFilters.includes(team)
                        return (
                          <motion.button
                            key={team}
                            onClick={() => toggleFilter(team)}
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
                            {team}
                          </motion.button>
                        )
                      })}
                      </div>
                    </div>
                  )}

                  {/* Otros */}
                  {availableTeamsByCategory.otros.length > 0 && (
                    <div>
                      <h3 className="dark:text-white/70 text-black/70 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2 md:mb-3 px-1">
                        Otros Clubes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {availableTeamsByCategory.otros.map((team) => {
                          const isActive = activeFilters.includes(team)
                          return (
                            <motion.button
                              key={team}
                              onClick={() => toggleFilter(team)}
                              className={`
                                flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold transition-all border-2
                                ${isActive
                                  ? 'bg-gradient-to-r from-white to-blue-100 text-black border-blue-200 shadow-lg shadow-blue-200/20'
                                  : 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20'
                                }
                              `}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {team}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 dark:border-b-2 dark:border-white border-b-2 border-black"></div>
              <p className="dark:text-gray-medium text-gray-600 mt-4">Cargando productos...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6"
              layout
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: index * 0.01 }}
                  layout
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </motion.div>
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
              <p className="dark:text-gray-medium text-gray-600">No hay productos disponibles</p>
            </div>
          )}
        </div>
      </main>

      <StoreFooter />
    </>
  )
}

