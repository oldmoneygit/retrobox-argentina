'use client'

import CollectionCarousel from './CollectionCarousel'

const CollectionSections = () => {
  return (
    <>
      <CollectionCarousel collectionSlug="boca-juniors" collectionName="Boca Juniors" />
      <CollectionCarousel collectionSlug="river-plate" collectionName="River Plate" />
      <CollectionCarousel collectionSlug="argentina" collectionName="Argentina" />
    </>
  )
}

export default CollectionSections

