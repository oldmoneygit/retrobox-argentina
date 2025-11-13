# Integration Examples - Phase 1

## 1. Homepage - Adding Recently Viewed

### File: `src/app/page.jsx`

**Add this import** (after other dynamic imports, around line 54):

```javascript
const RecentlyViewed = dynamic(() => import('@/components/store/RecentlyViewed'), {
  loading: () => <div className="h-64 bg-black animate-pulse" />,
  ssr: false, // Client-side only (uses localStorage)
})
```

**Add this section** (before CustomerFeedbacks, around line 187):

```javascript
{/* Recently Viewed Products */}
<Suspense fallback={<div className="h-64 bg-black animate-pulse" />}>
  <RecentlyViewed />
</Suspense>
```

---

## 2. Product Page - Track Viewed Products

### File: `src/app/product/[slug]/ProductPageClient.jsx`

**Add these imports** (around line 10):

```javascript
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import RecentlyViewed from '@/components/store/RecentlyViewed'
```

**Add tracking** (inside component, after other hooks, around line 423):

```javascript
export default function ProductPageClient({ product }) {
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { addToRecentlyViewed } = useRecentlyViewed() // ADD THIS LINE

  // ... other state

  // ADD THIS EFFECT
  useEffect(() => {
    if (product) {
      addToRecentlyViewed({
        id: product.id,
        title: product.title,
        slug: product.slug,
        price: product.price,
        compareAtPrice: product.regularPrice,
        image: product.image,
      })
    }
  }, [product, addToRecentlyViewed])

  // ... rest of component
}
```

**Display Recently Viewed** (at the end, before closing tags):

Add before the last `</main>` or `<StoreFooter />`:

```javascript
{/* Recently Viewed Products */}
<RecentlyViewed currentProductId={product.id} />
```

---

## 3. Collection Pages - Add Skeleton Screens

### File: `src/app/coleccion/[slug]/page.jsx` (or any collection page)

**Add this import**:

```javascript
import ProductCardSkeleton from '@/components/skeletons/ProductCardSkeleton'
```

**Replace loading state** in your products grid:

```javascript
{isLoading ? (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(8)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
) : (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
)}
```

---

## 4. Product Page - Gallery and Details Skeletons

### File: `src/app/product/[slug]/ProductPageClient.jsx`

**Add imports**:

```javascript
import ProductGallerySkeleton from '@/components/skeletons/ProductGallerySkeleton'
import ProductDetailsSkeleton from '@/components/skeletons/ProductDetailsSkeleton'
```

**Use during loading** (if you have a loading state):

```javascript
{isLoading ? (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <ProductGallerySkeleton />
    <ProductDetailsSkeleton />
  </div>
) : (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <ProductGallery images={product.gallery} productName={product.title} />
    {/* Product details */}
  </div>
)}
```

---

## Quick Test Checklist

After integrating, test these scenarios:

### Recently Viewed:
1. Visit 3-4 product pages
2. Go back to homepage
3. Scroll down - you should see "Vistos Recientemente" section with the products you viewed
4. Refresh page - products should still be there (localStorage)
5. On product page, the current product should NOT appear in Recently Viewed

### Skeleton Screens:
1. Throttle your connection to "Slow 3G" in DevTools
2. Navigate to collection page
3. You should see skeleton placeholders instead of blank space
4. Products should smoothly appear when loaded

---

## Files Created

All these files are ready to use:

- ✅ `src/hooks/useRecentlyViewed.js` - Hook for managing recently viewed products
- ✅ `src/components/store/RecentlyViewed.jsx` - Component to display recently viewed
- ✅ `src/components/skeletons/ProductCardSkeleton.jsx` - Product card skeleton
- ✅ `src/components/skeletons/ProductGallerySkeleton.jsx` - Gallery skeleton
- ✅ `src/components/skeletons/ProductDetailsSkeleton.jsx` - Details skeleton

---

## Notes

- Recently Viewed uses localStorage and stores max 8 products
- Skeletons match the same styling as actual components
- All components are mobile-responsive
- No additional dependencies needed - uses existing packages

---

## Support

If you need help integrating, refer to:
- [PHASE1_INTEGRATION_GUIDE.md](./PHASE1_INTEGRATION_GUIDE.md) - Complete documentation
- Component files - Have detailed comments
- This file - Quick copy-paste examples
