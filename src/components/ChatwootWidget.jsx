'use client'

import Script from 'next/script'

/**
 * Chatwoot Live Chat Widget
 *
 * Injeta o script del widget de chat de Chatwoot en el sitio
 * Usa strategy="afterInteractive" para no bloquear LCP/FCP
 *
 * @param {string} websiteToken - Token del website de Chatwoot
 * @param {string} baseUrl - URL base de la instancia de Chatwoot (default: https://app.chatwoot.com)
 */
export default function ChatwootWidget({
  websiteToken,
  baseUrl = 'https://app.chatwoot.com'
}) {
  if (!websiteToken) {
    console.warn('[Chatwoot] Website token no configurado')
    return null
  }

  return (
    <Script
      id="chatwoot-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(d,t) {
            var BASE_URL="${baseUrl}";
            var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=BASE_URL+"/packs/js/sdk.js";
            g.async=true;
            s.parentNode.insertBefore(g,s);
            g.onload=function(){
              window.chatwootSDK.run({
                websiteToken:'${websiteToken}',
                baseUrl:BASE_URL
              });
              console.log('[Chatwoot] Widget inicializado correctamente');
            }
          })(document,"script");
        `,
      }}
    />
  )
}
