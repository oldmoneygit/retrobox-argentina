import Link from 'next/link'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import StructuredData from '@/components/StructuredData'
import { getProductBySlug } from '@/utils/products'
import ProductPageClient from './ProductPageClient'

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Producto no encontrado</h1>
            <Link href="/" className="text-white hover:text-white/80 transition-colors">Volver a la tienda</Link>
          </div>
        </div>
        <StoreFooter />
      </>
    )
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData
        type="product"
        data={{
          name: product.name,
          image: product.image,
          description: product.description,
          price: product.price,
          stock: product.stock,
        }}
      />

      <ProductPageClient product={product} />
    </>
  )
}
