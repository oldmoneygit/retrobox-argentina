'use client'

import { useState } from 'react'
import { ShoppingCart, Truck, Tag, CreditCard, Loader2 } from 'lucide-react'
import { useBlackFriday } from '@/context/BlackFridayContext'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import ReservationCountdown from '@/components/blackfriday/ReservationCountdown'

const CartSummary = ({ subtotal, cartItems }) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState(null)
  const { calculatePackInsanoTotals, PACK_INSANO_PRICE } = useBlackFriday()
  const { createCheckout } = useCart()

  // Calcular dados do combo
  const comboData = calculatePackInsanoTotals(cartItems)

  const handleCheckout = async () => {
    if (!cartItems || cartItems.length === 0) {
      setCheckoutError('Tu carrito está vacío')
      return
    }

    setIsCheckingOut(true)
    setCheckoutError(null)

    try {
      // Criar checkout no Shopify e obter URL de redirecionamento
      const checkoutUrl = await createCheckout()

      // Redirecionar para o checkout do Shopify
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Checkout error:', error)
      setCheckoutError(error.message || 'Error al crear el checkout. Por favor intenta de nuevo.')
      setIsCheckingOut(false)
    }
  }

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="sticky top-24">
      <div className="dark:bg-white/5 dark:border-white/10 bg-black/5 border-2 border-black/10 rounded-xl p-6 space-y-6">
        {/* Title */}
        <div className="flex items-center gap-3 pb-4 dark:border-b dark:border-white/10 border-b border-black/10">
          <ShoppingCart className="w-6 h-6 text-orange-500" />
          <h2 className="text-xl font-bold dark:text-white text-black">Resumen del Pedido</h2>
        </div>

        {/* Summary Details */}
        <div className="space-y-4">
          {/* Quantidade de produtos */}
          <div className="flex items-center justify-between">
            <span className="dark:text-white/60 text-black/60 text-sm">
              {comboData.itemCount} {comboData.itemCount === 1 ? 'producto' : 'productos'}
            </span>
            <span className="dark:text-white/60 text-black/60 text-sm">
              ${comboData.subtotalNormal.toLocaleString('es-AR')}
            </span>
          </div>

          {/* Mystery Box Progressive Discount - Display */}
          {comboData.hasMysteryBox && (
            <div className="flex items-start gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-3">
              <Tag className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-purple-400 text-sm font-bold">
                    Mystery Box Descuento Progresivo
                  </span>
                  {comboData.mysteryBoxDiscount > 0 && (
                    <span className="text-purple-400 font-bold">
                      -${comboData.mysteryBoxDiscount.toLocaleString('es-AR')}
                    </span>
                  )}
                </div>
                <p className="text-purple-400/80 text-xs">
                  ¡{comboData.mysteryBoxCount} Mystery {comboData.mysteryBoxCount === 1 ? 'Box' : 'Boxes'} con descuento aplicado!
                </p>
              </div>
            </div>
          )}

          {/* Pack Black 4x - Display */}
          {comboData.hasPack ? (
            <div className="flex items-start gap-2 bg-gradient-to-r from-green-500/10 to-emerald-400/10 border border-green-500/30 rounded-lg p-3">
              <Tag className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-green-500 text-sm font-bold">
                    Pack Black 4x Activado
                  </span>
                  <span className="text-green-500 font-bold">
                    -${comboData.savings.toLocaleString('es-AR')}
                  </span>
                </div>
                <p className="text-green-500/80 text-xs">
                  ¡{comboData.fullPacks} {comboData.fullPacks === 1 ? 'pack' : 'packs'} de 4 camisetas por ARS {PACK_INSANO_PRICE.toLocaleString('es-AR')}!
                </p>
              </div>
            </div>
          ) : !comboData.hasMysteryBox ? (
            <div className="flex items-start gap-2 dark:bg-gradient-to-r dark:from-white/10 dark:to-blue-100/10 dark:border-blue-200/30 bg-gradient-to-r from-black/10 to-gray-800/10 border border-gray-600/30 rounded-lg p-3">
              <Tag className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-orange-500 text-xs font-semibold">
                  {comboData.itemCount === 0
                    ? `¡Agrega 4 camisetas para Pack Black de ARS ${PACK_INSANO_PRICE.toLocaleString('es-AR')}!`
                    : `¡Agrega ${comboData.productsNeeded} más para Pack Black de ARS ${PACK_INSANO_PRICE.toLocaleString('es-AR')}!`}
                </p>
              </div>
            </div>
          ) : null}

          {/* Shipping */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 dark:text-white/60 text-black/60" />
              <span className="dark:text-white/60 text-black/60 text-sm">Envío</span>
            </div>
            <span className="text-orange-500 font-semibold text-sm">GRATIS</span>
          </div>

          {/* Divider */}
          <div className="dark:border-t-2 dark:border-white/10 border-t-2 border-black/10 pt-4">
            {/* Total */}
            <div className="flex items-center justify-between mb-1">
              <span className="dark:text-white text-black text-lg font-bold">Total</span>
              <span className="dark:text-white text-black text-2xl font-black">
                ${comboData.total.toLocaleString('es-AR')}
              </span>
            </div>
            {(comboData.hasPack || comboData.hasMysteryBox) && comboData.savings > 0 && (
              <p className={`${comboData.hasPack && comboData.hasMysteryBox ? 'text-orange-500' : comboData.hasMysteryBox ? 'text-purple-400' : 'text-green-500'} text-xs text-right font-semibold`}>
                ¡Ahorraste ${comboData.savings.toLocaleString('es-AR')}!
              </p>
            )}
          </div>
        </div>

        {/* Reservation Countdown */}
        {comboData.itemCount > 0 && <ReservationCountdown />}

        {/* Error Message */}
        {checkoutError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-500 text-sm">{checkoutError}</p>
          </div>
        )}

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={isCheckingOut || comboData.itemCount === 0}
          className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-light dark:shadow-white/20 bg-black text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-gray-dark active:scale-95 transition-all duration-300 shadow-lg shadow-black/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCheckingOut ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Finalizar Compra
            </>
          )}
        </button>

        {/* Security Badge */}
        <div className="pt-4 dark:border-t dark:border-white/10 border-t border-black/10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 dark:bg-white/10 bg-black/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 dark:text-white text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="dark:text-white text-black text-sm font-semibold mb-1">Compra Segura</p>
              <p className="dark:text-white/60 text-black/60 text-xs">
                Protección al comprador y pago 100% seguro
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 pt-4 dark:border-t dark:border-white/10 border-t border-black/10">
          <div className="flex items-center gap-2 dark:text-white/60 text-black/60 text-xs">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
            <span>Calidad Premium</span>
          </div>
          <div className="flex items-center gap-2 dark:text-white/60 text-black/60 text-xs">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
            <span>Envío rápido hasta 10 días</span>
          </div>
          <div className="flex items-center gap-2 dark:text-white/60 text-black/60 text-xs">
            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
            <span>Seguimiento en tiempo real</span>
          </div>
        </div>
      </div>

      {/* Botão Fixo Mobile */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden dark:bg-black dark:border-white/20 bg-white border-t-2 border-black/20 p-4 z-[60] shadow-2xl transition-colors duration-300">
        <button
          onClick={handleCheckout}
          disabled={isCheckingOut || comboData.itemCount === 0}
          className="w-full dark:bg-white dark:text-black dark:hover:bg-gray-light bg-black text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-gray-dark active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg min-h-[56px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCheckingOut ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Finalizar - ${comboData.total.toLocaleString('es-AR')}
            </>
          )}
        </button>
      </div>

      {/* Espaçador para não sobrepor conteúdo em mobile */}
      <div className="h-24 lg:h-0" />
    </div>
  )
}

export default CartSummary
