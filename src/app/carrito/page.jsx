'use client'

import Link from 'next/link'
import { ChevronLeft, ShoppingBag } from 'lucide-react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import { useCart } from '@/context/CartContext'
import { motion } from 'framer-motion'
import ReservationCountdown from '@/components/blackfriday/ReservationCountdown'

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart()

  const handleUpdateQuantity = (variantKey, newQuantity) => {
    updateQuantity(variantKey, newQuantity)
  }

  const handleRemoveItem = (variantKey) => {
    removeFromCart(variantKey)
  }

  const subtotal = getTotalPrice()

  // Calcular quantidade TOTAL de produtos (soma de todas as quantities)
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-6 md:pt-8 pb-4 md:pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-orange-500 transition-colors text-sm md:text-base"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver a la tienda
          </Link>
        </div>

        {/* Cart Content */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <div className="mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 uppercase">
                Carrito de Compras
              </h1>
              <p className="text-white/60 text-sm md:text-base">
                {totalQuantity === 0
                  ? 'Tu carrito está vacío'
                  : `${totalQuantity} ${totalQuantity === 1 ? 'producto' : 'productos'} en tu carrito`}
              </p>
            </div>

            {cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="text-center py-16 md:py-20">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-white/30" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Tu carrito está vacío
                </h2>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  Parece que aún no has agregado ningún producto. ¡Explora nuestra colección!
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold text-base md:text-lg uppercase tracking-wide hover:bg-gray-light transition-all duration-300 hover:scale-105 shadow-lg shadow-white/20"
                >
                  Explorar Productos
                </Link>
              </div>
            ) : (
              /* Cart with Items */
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Left Column - Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.variantKey}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>

                {/* Right Column - Summary */}
                <div className="lg:col-span-1">
                  <CartSummary subtotal={subtotal} cartItems={cartItems} />
                </div>
              </div>
            )}

            {/* Promotional Banner - Combo 3x */}
            {totalQuantity >= 3 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 md:mt-12 bg-gradient-to-r from-orange-500/10 to-yellow-400/10 border-2 border-orange-500/30 rounded-xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-2xl font-black">3x</span>
                    </div>
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                      ¡Promoción Combo 3x Activada! 🎉
                    </h3>
                    <p className="text-white/80 text-sm md:text-base mb-4">
                      ¡Estás aprovechando el combo Black Friday! 3 camisetas por ARS 32.900 con envío gratis incluido.
                    </p>
                    {/* Reservation Countdown */}
                    <ReservationCountdown />
                  </div>
                </div>
              </motion.div>
            ) : totalQuantity >= 1 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 md:mt-12 bg-gradient-to-r from-orange-500/10 to-yellow-400/10 border-2 border-orange-500/30 rounded-xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-black text-2xl font-black">3x</span>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                      ¡Agrega {3 - totalQuantity} Producto{3 - totalQuantity > 1 ? 's' : ''} Más!
                    </h3>
                    <p className="text-white/80 text-sm md:text-base">
                      Activa la promoción Combo 3x Black Friday y obtén 3 camisetas por ARS 32.900 con envío gratis incluido!
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </main>
      <StoreFooter />
    </>
  )
}

