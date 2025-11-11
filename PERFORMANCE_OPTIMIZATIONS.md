# 🚀 Otimizações de Performance Implementadas

Este documento descreve todas as otimizações de performance implementadas no projeto Retrobox Argentina para melhorar as métricas do Lighthouse.

## 📊 Métricas Alvo

- **Performance Score**: 48 → 90+
- **FCP (First Contentful Paint)**: 1.9s → <1.5s
- **LCP (Largest Contentful Paint)**: 10.2s → <2.5s
- **TBT (Total Blocking Time)**: 560ms → <200ms
- **CLS (Cumulative Layout Shift)**: 0.159 → <0.1
- **Speed Index**: 5.9s → <3.0s

## ✅ Otimizações Implementadas

### 1. Configuração Next.js (`next.config.js`)

#### ✅ Compressão e Minificação
- `compress: true` - Habilita compressão Gzip/Brotli
- `swcMinify: true` - Usa SWC para minificação mais rápida
- `removeConsole` - Remove console.log em produção (exceto error/warn)

#### ✅ Otimização de Imagens
- Suporte para AVIF e WebP
- Cache de 1 ano para imagens
- Otimização automática de imagens
- Configuração de tamanhos responsivos

#### ✅ Tree Shaking de Pacotes
- `optimizePackageImports` para `lucide-react` e `framer-motion`
- Reduz bundle size removendo código não utilizado

#### ✅ Cache Headers
- Cache de 1 ano para assets estáticos (`/_next/static`)
- Cache de 1 ano para imagens (`/images`)
- Cache de 1 ano para fontes (`/fonts`)

### 2. Preload de Recursos Críticos (`layout.js`)

#### ✅ Preconnect
- `preconnect` para `cdn.shopify.com`
- `preconnect` para `connect.facebook.net`
- Reduz latência de conexão

#### ✅ Preload de Imagens
- Logo principal (`LOGO_BRANCO.webp`)
- Hero banner mobile (`banner-hero-section.png`)
- Imagem OG (`ogImage`)
- `fetchPriority="high"` para recursos críticos

#### ✅ Preload de Fontes
- Fontes Inter e Bebas Neue
- Formato WOFF2 otimizado
- `crossOrigin="anonymous"` para cache

### 3. Otimização de Animações

#### ✅ GPU Acceleration
- Uso de `transform` ao invés de `y` para evitar reflow
- `willChange: 'transform, opacity'` para otimização de GPU
- Animações compostas (não causam layout shift)

#### ✅ Componente OptimizedMotion
- Wrapper otimizado para `framer-motion`
- Animações pré-configuradas (`fadeInUp`, `scaleOnHover`)
- Evita animações não compostas

#### ✅ Otimização de Transições
- Easing functions otimizadas: `[0.6, -0.05, 0.01, 0.99]`
- Durações reduzidas para melhor percepção
- `willChange` aplicado apenas quando necessário

### 4. Lazy Loading de Componentes

#### ✅ Dynamic Imports
- Componentes abaixo da dobra carregados dinamicamente
- `ssr: true` para SEO
- Loading states com skeleton screens

#### ✅ Componentes Lazy Loaded
- `BestSellers`
- `PromotionalBanner`
- `PackLocoPromo`
- `HowItWorksPackLoco`
- `PackLocoLiveSlots`
- `NuestrasColecciones`
- `TeamProductsSection`
- `HowItWorks`
- `FeaturedProducts`
- `MysteryBoxBlackFriday`
- `CustomerFeedbacks`

### 5. Otimização de Imagens

#### ✅ OptimizedImage Component
- Lazy loading por padrão
- Fallback para imagens quebradas
- Loading spinner durante carregamento
- Placeholder SVG quando imagem não disponível

#### ✅ Configuração de Prioridade
- Primeiras 4 imagens com `priority={true}`
- Resto com `loading="lazy"`
- Qualidade reduzida para imagens não prioritárias (65 vs 75)

#### ✅ Sizes Attribute
- `sizes="(max-width: 768px) 95vw, (max-width: 1200px) 45vw, 23vw"`
- Carrega tamanho correto para cada viewport
- Reduz largura de banda

### 6. Otimização de JavaScript

#### ✅ Code Splitting
- Lazy loading de componentes pesados
- Chunks menores por rota
- Tree shaking automático

#### ✅ Bundle Size Reduction
- `optimizePackageImports` reduz imports não utilizados
- Remoção de console.log em produção
- Minificação com SWC

### 7. Otimização de CSS

#### ✅ Experimental Features
- `optimizeCss: true` - Otimização automática de CSS
- Remoção de CSS não utilizado
- Minificação de CSS

## 📈 Resultados Esperados

### Antes
- Performance: 48/100
- FCP: 1.9s
- LCP: 10.2s
- TBT: 560ms
- CLS: 0.159
- Speed Index: 5.9s

### Depois (Estimado)
- Performance: 85-90/100
- FCP: <1.5s
- LCP: <2.5s
- TBT: <200ms
- CLS: <0.1
- Speed Index: <3.0s

## 🔍 Próximas Otimizações (Opcional)

1. **Service Worker** - Cache offline de recursos estáticos
2. **Image CDN** - Usar CDN dedicado para imagens
3. **HTTP/2 Server Push** - Push de recursos críticos
4. **Resource Hints** - `prefetch` para próximas páginas
5. **Critical CSS** - Inline CSS crítico
6. **Font Display Swap** - Evitar FOIT (Flash of Invisible Text)

## 📝 Notas

- Todas as otimizações são compatíveis com SSR
- Dark/Light theme mantido funcionando
- Acessibilidade preservada
- SEO não afetado

## 🧪 Como Testar

1. Execute `npm run build` para build de produção
2. Execute `npm start` para servidor de produção
3. Teste com Lighthouse no Chrome DevTools
4. Verifique métricas em diferentes dispositivos (Mobile, Desktop)
5. Teste com throttling de rede (Slow 4G)

## 📚 Referências

- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Scoring](https://web.dev/performance-scoring/)

