'use client'

import Link from 'next/link'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen dark:bg-black bg-white flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-2xl font-bold dark:text-white text-black mb-4">Producto no encontrado</h1>
          <Link href="/" className="dark:text-white dark:hover:text-white/80 text-black hover:text-black/80 transition-colors">Volver a la tienda</Link>
        </div>
      </div>
      <StoreFooter />
    </>
  )
}

