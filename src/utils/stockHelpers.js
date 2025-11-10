/**
 * Stock Management Utilities
 * Helper functions to calculate and display stock levels
 */

/**
 * Determines stock level based on inventory count
 * @param {number} inventory - Current inventory count
 * @returns {'low' | 'medium' | 'high' | 'out'} Stock level
 */
export const getStockLevel = (inventory) => {
  if (inventory === undefined || inventory === null) {
    return 'high' // Default to high if inventory not available
  }

  if (inventory === 0) return 'out'
  if (inventory <= 3) return 'low'
  if (inventory <= 10) return 'medium'
  return 'high'
}

/**
 * Generates a random stock level for demo/testing purposes
 * In production, this would come from your inventory management system
 * @returns {'low' | 'medium' | 'high'}
 */
export const generateMockStockLevel = () => {
  const random = Math.random()

  // 20% chance of low stock (creates urgency)
  if (random < 0.2) return 'low'

  // 30% chance of medium stock
  if (random < 0.5) return 'medium'

  // 50% chance of high stock
  return 'high'
}

/**
 * Gets stock message for a specific size
 * @param {string} size - Product size
 * @param {number} inventory - Inventory for that size
 * @returns {string} Stock message
 */
export const getSizeStockMessage = (size, inventory) => {
  const level = getStockLevel(inventory)

  switch (level) {
    case 'out':
      return `Agotado en ${size}`
    case 'low':
      return `¡Último en ${size}!`
    case 'medium':
      return `Pocas unidades en ${size}`
    case 'high':
      return `Disponible en ${size}`
    default:
      return `Disponible en ${size}`
  }
}

/**
 * Checks if a product has low stock in any size
 * @param {Object} product - Product object with sizes and inventory
 * @returns {boolean} True if any size has low stock
 */
export const hasLowStockInAnySiz = (product) => {
  if (!product.sizes || !product.inventory) return false

  return product.sizes.some((size) => {
    const inventory = product.inventory[size] || 0
    return getStockLevel(inventory) === 'low'
  })
}
