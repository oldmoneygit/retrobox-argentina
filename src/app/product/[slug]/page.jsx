import StructuredData from '@/components/StructuredData'
import { getProductBySlug } from '@/utils/products'
import ProductPageClient from './ProductPageClient'
import NotFoundPage from './NotFoundPage'

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    return <NotFoundPage />
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
