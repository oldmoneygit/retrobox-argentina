'use client'

import Script from 'next/script'

/**
 * Meta Pixel Script
 *
 * Injeta o script do Facebook Pixel no <head>
 * Usa strategy="afterInteractive" para não bloquear LCP/FCP
 */
export default function MetaPixelScript({ pixelId }) {
  if (!pixelId) return null

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive" // Carrega após página interativa (não bloqueia performance)
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', '${pixelId}');

          console.log('[Meta Pixel] Initialized:', {
            pixelId: '${pixelId}',
            automaticMatching: false
          });
        `,
      }}
    />
  )
}
