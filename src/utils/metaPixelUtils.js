/**
 * Meta Pixel & Conversions API - Utility Functions
 *
 * Funções auxiliares para tracking com Facebook Pixel e Conversions API
 */

/**
 * Gera um event_id único para deduplicação
 * Formato: eventName_timestamp_random
 */
export function generateEventId(eventName) {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `${eventName}_${timestamp}_${random}`
}

/**
 * Hash SHA-256 de um valor (para PII)
 */
export async function hashValue(value) {
  if (!value) return null

  try {
    // 1. Normalizar (lowercase + trim)
    const normalized = value.toString().toLowerCase().trim()

    // 2. Hash SHA-256
    const encoder = new TextEncoder()
    const data = encoder.encode(normalized)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)

    // 3. Converter para hex
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    return hashHex
  } catch (error) {
    console.error('Error hashing value:', error)
    return null
  }
}

/**
 * Prepara user data hasheado (Advanced Matching)
 */
export async function prepareUserData(userData = {}) {
  const prepared = {}

  // Email
  if (userData.email) {
    prepared.em = await hashValue(userData.email)
  }

  // Phone (limpar antes de hashear)
  if (userData.phone) {
    const cleanPhone = userData.phone.replace(/[^0-9]/g, '')
    prepared.ph = await hashValue(cleanPhone)
  }

  // First Name
  if (userData.firstName) {
    prepared.fn = await hashValue(userData.firstName)
  }

  // Last Name
  if (userData.lastName) {
    prepared.ln = await hashValue(userData.lastName)
  }

  // City
  if (userData.city) {
    prepared.ct = await hashValue(userData.city)
  }

  // State
  if (userData.state) {
    prepared.st = await hashValue(userData.state)
  }

  // Zip Code
  if (userData.zip) {
    prepared.zp = await hashValue(userData.zip)
  }

  // Country
  if (userData.country) {
    prepared.country = await hashValue(userData.country)
  }

  return prepared
}

/**
 * Captura Facebook Click ID (fbc) da URL e salva em sessionStorage
 * Formato: fb.1.timestamp.fbclid
 */
export function getFacebookClickId() {
  if (typeof window === 'undefined') return null

  try {
    // 1. Verificar URL por parâmetro fbclid
    const urlParams = new URLSearchParams(window.location.search)
    const fbclid = urlParams.get('fbclid')

    if (fbclid) {
      // 2. Montar fbc no formato correto
      const timestamp = Date.now()
      const fbc = `fb.1.${timestamp}.${fbclid}`

      // 3. Salvar em sessionStorage (persiste durante sessão)
      sessionStorage.setItem('_fbc', fbc)

      console.log('[Meta Pixel] fbc captured from URL:', fbc)
      return fbc
    }

    // 4. Tentar recuperar do sessionStorage
    return sessionStorage.getItem('_fbc') || null
  } catch (error) {
    console.error('Error getting fbc:', error)
    return null
  }
}

/**
 * Captura Facebook Browser ID (fbp) do cookie
 */
export function getFacebookBrowserId() {
  if (typeof window === 'undefined') return null

  try {
    // 1. Procurar cookie _fbp
    const cookies = document.cookie.split(';')
    const fbpCookie = cookies.find(cookie => cookie.trim().startsWith('_fbp='))

    if (fbpCookie) {
      // 2. Extrair valor do cookie
      return fbpCookie.split('=')[1]
    }

    return null
  } catch (error) {
    console.error('Error getting fbp:', error)
    return null
  }
}

/**
 * Captura parâmetros UTM da URL
 */
export function getUTMParams() {
  if (typeof window === 'undefined') return {}

  try {
    const urlParams = new URLSearchParams(window.location.search)

    return {
      utm_source: urlParams.get('utm_source') || null,
      utm_medium: urlParams.get('utm_medium') || null,
      utm_campaign: urlParams.get('utm_campaign') || null,
      utm_term: urlParams.get('utm_term') || null,
      utm_content: urlParams.get('utm_content') || null,
    }
  } catch (error) {
    console.error('Error getting UTM params:', error)
    return {}
  }
}

/**
 * Inicializa parâmetros do Facebook (fbc) e UTM
 * Deve ser chamado uma vez no mount da aplicação
 */
export function initializeFacebookParams() {
  if (typeof window === 'undefined') return

  try {
    // Capturar fbc da URL se presente
    const fbc = getFacebookClickId()

    // Capturar UTM params e salvar em sessionStorage
    const utmParams = getUTMParams()
    if (Object.values(utmParams).some(v => v !== null)) {
      sessionStorage.setItem('_utm_params', JSON.stringify(utmParams))
      console.log('[Meta Pixel] UTM params captured:', utmParams)
    }

    console.log('[Meta Pixel] Facebook params initialized:', { fbc })
  } catch (error) {
    console.error('Error initializing Facebook params:', error)
  }
}

/**
 * Envia evento para Conversions API (server-side)
 */
export async function sendToConversionsAPI(eventName, eventData, eventId, fbParams, userData = {}) {
  if (typeof window === 'undefined') return

  try {
    const response = await fetch('/api/meta-conversions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventData,
        eventId,
        fbc: fbParams.fbc,
        fbp: fbParams.fbp,
        userData,
        eventTime: Math.floor(Date.now() / 1000),
        sourceUrl: window.location.href,
        userAgent: navigator.userAgent,
      }),
    })

    if (!response.ok) {
      throw new Error(`Conversions API error: ${response.status}`)
    }

    const result = await response.json()
    console.log(`[Conversions API] ${eventName} sent:`, result)

    return result
  } catch (error) {
    console.warn(`[Conversions API] ${eventName} failed (non-blocking):`, error)
    return null
  }
}

/**
 * Função PRINCIPAL de tracking
 * Envia evento para Pixel (client) E Conversions API (server)
 */
export async function trackPixelEvent(eventName, eventData = {}, userData = {}) {
  // Validar que pixel está carregado
  if (typeof window === 'undefined' || !window.fbq) {
    console.warn('[Meta Pixel] Not loaded yet')
    return null
  }

  try {
    // 1. Gerar event_id ÚNICO (para deduplicação)
    const eventId = generateEventId(eventName)

    // 2. Capturar parâmetros do Facebook
    const fbc = getFacebookClickId()
    const fbp = getFacebookBrowserId()

    // 3. Hashear dados do usuário (PII)
    const hashedUserData = await prepareUserData(userData)

    // 4. Montar objeto completo de dados
    const fullEventData = {
      ...eventData,
      ...(fbc && { fbc }),
      ...(fbp && { fbp }),
    }

    // 5. Enviar para Meta Pixel (CLIENT-SIDE)
    if (Object.keys(hashedUserData).length > 0) {
      // Com Advanced Matching
      window.fbq('track', eventName, fullEventData, {
        eventID: eventId,
        ...hashedUserData,
      })
    } else {
      // Sem Advanced Matching
      window.fbq('track', eventName, fullEventData, {
        eventID: eventId,
      })
    }

    console.log(`[Meta Pixel] ${eventName} tracked:`, {
      eventId,
      ...fullEventData,
    })

    // 6. Enviar para Conversions API (SERVER-SIDE)
    // Fire-and-forget (não aguarda resposta para não bloquear UX)
    sendToConversionsAPI(eventName, fullEventData, eventId, { fbc, fbp }, hashedUserData)
      .catch(err => {
        console.warn('Conversions API failed (non-blocking):', err)
      })

    return eventId
  } catch (error) {
    console.error(`Error tracking ${eventName}:`, error)
    return null
  }
}

/**
 * Formata dados de produto para eventos
 */
export function formatProductData(product) {
  return {
    content_ids: [product.id || product.slug],
    content_name: product.name || product.title,
    content_type: 'product',
    content_category: product.category || product.collection || '',
    value: parseFloat(product.price),
    currency: 'ARS',
  }
}

/**
 * Formata dados do carrinho para eventos
 */
export function formatCartData(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return {
    content_ids: cartItems.map(item => item.id || item.slug),
    content_type: 'product',
    contents: cartItems.map(item => ({
      id: item.id || item.slug,
      quantity: item.quantity,
      item_price: parseFloat(item.price),
    })),
    num_items: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    value: total,
    currency: 'ARS',
  }
}
