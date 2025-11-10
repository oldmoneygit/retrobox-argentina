'use client'

import OptimizedImage from '@/components/OptimizedImage'
import Link from 'next/link'

const PromotionalBanner = ({ 
  imageSrc = '/images/promo/post3.png',
  alt = 'Promoción Black Friday',
  href = '#pack-black',
  className = ''
}) => {
  return (
    <section className={`relative w-full bg-black overflow-hidden ${className}`}>
      <Link href={href} className="block w-full">
        <div className="relative w-full">
          <OptimizedImage
            src={imageSrc}
            alt={alt}
            width={1200}
            height={600}
            className="w-full h-auto object-cover object-center"
            priority={false}
            quality={90}
            sizes="100vw"
          />
        </div>
      </Link>
    </section>
  )
}

export default PromotionalBanner
