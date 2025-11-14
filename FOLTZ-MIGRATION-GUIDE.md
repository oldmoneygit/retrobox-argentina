# 📘 Guia de Migração: Página Inicial Retrobox → Foltz Fanwear

**Objetivo:** Migrar a estrutura completa da página inicial da Retrobox Argentina para o Foltz Fanwear, mantendo a simplicidade e organização visual.

**Princípios de Design:**
- ✅ Simplicidade visual
- ✅ Menos poluição de componentes
- ✅ Foco em conversão
- ✅ Performance otimizada
- ✅ SEO-friendly

---

## 📊 Visão Geral da Arquitetura

### Estratégia de Loading

A página usa **3 níveis de prioridade** para otimizar performance:

1. **Priority 1 (SSR enabled)**: Above the fold ou crítico para SEO
2. **Priority 2 (SSR disabled)**: Importante mas below the fold
3. **Priority 3 (Lazy Load)**: Load on demand quando próximo do viewport

### Tecnologias Usadas

- **Next.js 14** - App Router
- **Dynamic Imports** - Code splitting automático
- **React Suspense** - Loading states
- **Framer Motion** - Animações suaves
- **Embla Carousel** - Carousels touch-friendly

---

## 🗂️ Estrutura Completa da Página Inicial

### Ordem das Seções (Top → Bottom)

```
1. Header (fixo)
2. Hero Section
3. Los Más Vendidos (18 produtos)
4. Banner Promocional Black Friday
5. Nuestras Colecciones (grid de categorias)
6. Los Más Vendidos de esta Semana (15 produtos do Shopify)
7. Pack Black Promo (4x59.900)
8. Pack Black Live Slots (visualização tempo real)
9. Coleção Time 1 (Boca Juniors na Retrobox)
10. Coleção Time 2 (River Plate na Retrobox)
11. Coleção Time 3 (Selección Argentina na Retrobox)
12. Como Funciona Pack Black
13. Como Funciona (geral)
14. Produtos Destacados
15. Mystery Box Section
16. Depoimentos de Clientes
17. Footer
```

---

## 📦 Componentes Detalhados

### 1. **Header** (Always Visible)
- **Arquivo:** `@/components/store/Header`
- **Tipo:** Static component
- **SSR:** true
- **Descrição:** Navegação principal, logo, carrinho, dark mode toggle
- **Adaptação Foltz:** Trocar logo e links de navegação

---

### 2. **Hero Section**
- **Arquivo:** `@/components/store/StoreHero`
- **Tipo:** Static component
- **SSR:** true
- **Descrição:** Banner principal com CTA e imagem de destaque
- **Conteúdo:**
  - Título principal
  - Subtítulo
  - Call-to-Action button
  - Imagem hero
- **Adaptação Foltz:**
  - Substituir imagens
  - Adaptar textos para "Foltz Fanwear" (não apenas retrô)
  - Manter estrutura de grid e responsividade

---

### 3. **BestSellers** (Los Más Vendidos)
- **Arquivo:** `@/components/store/BestSellers`
- **Priority:** 1 (SSR enabled)
- **Descrição:** Carousel de 18 produtos mais vendidos
- **Features:**
  - Embla Carousel com autoplay
  - Responsive (2 mobile, 4 desktop, 5 xl)
  - Navigation arrows
  - Link "Ver Todos"
- **Data Source:** `getBestSellers(18)` from `@/utils/products`
- **Adaptação Foltz:**
  - Usar mesma função `getBestSellers()` com produtos Foltz
  - Manter configuração de carousel
  - Adaptar cores para branding Foltz

---

### 4. **PromotionalBanner**
- **Arquivo:** `@/components/store/PromotionalBanner`
- **Priority:** 2 (SSR disabled)
- **Descrição:** Banner de promoção Black Friday
- **Features:**
  - Animação gradient
  - Countdown timer (opcional)
  - CTAs destacados
- **Adaptação Foltz:**
  - Criar nova promoção (não Black Friday se não for época)
  - Ou substituir por banner institucional
  - **Opção:** Remover se não houver promoção ativa

---

### 5. **NuestrasColecciones**
- **Arquivo:** `@/components/store/NuestrasColecciones`
- **Priority:** 1 (SSR enabled - links para SEO)
- **Descrição:** Grid de coleções/categorias com imagens
- **Features:**
  - Grid responsivo (2 cols mobile, 3-4 desktop)
  - Cards com imagem e nome da coleção
  - Links para páginas de coleção
- **Data:** Categorias hardcoded no componente
- **Adaptação Foltz:**
  - Mapear categorias Foltz (ligas, times, tipos)
  - Substituir imagens das coleções
  - Manter estrutura de grid
  - **Categorias sugeridas:** Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Brasileirão, Argentina, Seleções

---

### 6. **TopSellersWeek** (Los Más Vendidos de esta Semana)
- **Arquivo:** `@/components/store/TopSellersWeek`
- **Priority:** 1 (SSR enabled)
- **Descrição:** Produtos da coleção Shopify "Los más vendidos de esta semana"
- **Features:**
  - Busca produtos via Shopify Storefront API
  - Filtra Mystery Boxes automaticamente
  - Limita a 15 produtos
  - Embla Carousel
- **Data Source:** `getCollectionProducts('los-mas-vendidos-de-esta-semana', 20)`
- **Adaptação Foltz:**
  - Criar coleção no Shopify Foltz com mesmo nome
  - Usar mesmo componente sem modificações
  - Adicionar produtos à coleção manualmente no Shopify Admin

---

### 7. **PackLocoPromo** (Pack Black 4x59.900)
- **Arquivo:** `@/components/blackfriday/PackLocoPromo`
- **Priority:** 2 (SSR disabled)
- **Descrição:** Seção de promoção Pack Black
- **Features:**
  - Grid de benefícios
  - Preço destacado
  - CTA para scroll até pack
  - Countdown (opcional)
- **Adaptação Foltz:**
  - **Opção 1:** Adaptar para promoção similar Foltz (ex: "Combo 4x")
  - **Opção 2:** Remover se não houver pack promocional
  - **Recomendação:** Manter estrutura mas adaptar preços e termos

---

### 8. **PackLocoLiveSlots**
- **Arquivo:** `@/components/blackfriday/PackLocoLiveSlots`
- **Priority:** 2 (SSR disabled)
- **Descrição:** Visualização em tempo real de slots disponíveis
- **Features:**
  - Progress bar
  - Contador de packs vendidos
  - Atualização dinâmica
- **Adaptação Foltz:**
  - **Opção 1:** Remover se não houver sistema de slots
  - **Opção 2:** Adaptar para mostrar estoque limitado
  - **Recomendação:** Remover para simplificar

---

### 9-11. **TeamProductsSection** (Coleções de Times)
- **Arquivo:** `@/components/store/TeamProductsSection`
- **Priority:** 3 (Lazy Load)
- **Descrição:** Seção dedicada para produtos de um time específico
- **Props:**
  ```jsx
  <TeamProductsSection
    teamName="Boca"              // Filter key
    title="BOCA JUNIORS"         // Display title
    subtitle="Descrição"         // Subtitle
    filterKey="name"             // Campo para filtrar
    logo="/path/logo.png"        // Logo do time
    titleColor="text-[#ffed00]"  // Cor do título
  />
  ```
- **Adaptação Foltz:**
  - **Times principais da Foltz:** Escolher 3-5 times mais populares
  - **Exemplos:** Barcelona, Real Madrid, Manchester United, Bayern, PSG
  - Criar logos para cada time
  - Ajustar cores para cores oficiais dos times

---

### 12. **HowItWorksPackLoco**
- **Arquivo:** `@/components/blackfriday/HowItWorksPackLoco`
- **Priority:** 3 (Lazy Load)
- **Descrição:** Como funciona o Pack Black (passo a passo)
- **Features:**
  - Steps numerados
  - Ícones
  - Explicação clara
- **Adaptação Foltz:**
  - **Opção 1:** Remover se não houver pack
  - **Opção 2:** Criar "Como Funciona" genérico da Foltz
  - **Recomendação:** Substituir por "Como Comprar na Foltz"

---

### 13. **HowItWorks** (Geral)
- **Arquivo:** `@/components/store/HowItWorks`
- **Priority:** 3 (Lazy Load)
- **Descrição:** Como funciona a loja (processo de compra)
- **Features:**
  - 3-4 steps
  - Ícones ilustrativos
  - Benefícios (envio grátis, qualidade, etc)
- **Adaptação Foltz:**
  - Manter estrutura
  - Adaptar textos para processo Foltz
  - Destacar diferenciais da Foltz

---

### 14. **FeaturedProducts**
- **Arquivo:** `@/components/store/FeaturedProducts`
- **Priority:** 3 (Lazy Load)
- **Descrição:** Produtos em destaque selecionados manualmente
- **Features:**
  - Grid de produtos
  - Badge "Destacado"
- **Data Source:** Produtos com flag `featured: true`
- **Adaptação Foltz:**
  - Marcar produtos Foltz como featured
  - Manter componente sem alterações

---

### 15. **MysteryBoxBlackFriday**
- **Arquivo:** `@/components/store/MysteryBoxBlackFriday`
- **Priority:** 3 (Lazy Load)
- **Descrição:** Seção de Mystery Box com seleção de tamanhos
- **Features:**
  - Seletor de quantidade por liga
  - Modal de seleção de tamanhos
  - Desconto progressivo
  - Toast notification
- **Adaptação Foltz:**
  - **Opção 1:** Criar Mystery Boxes Foltz (diferentes ligas)
  - **Opção 2:** Remover se não houver mystery boxes
  - **Recomendação:** Manter se for vender mystery boxes na Foltz

---

### 16. **CustomerFeedbacks**
- **Arquivo:** `@/components/store/CustomerFeedbacks`
- **Priority:** 3 (Lazy Load)
- **Descrição:** Depoimentos de clientes
- **Features:**
  - Carousel de reviews
  - Estrelas de avaliação
  - Fotos de clientes (opcional)
- **Data Source:** Array hardcoded ou API
- **Adaptação Foltz:**
  - Substituir depoimentos para clientes Foltz
  - Manter estrutura visual
  - Usar depoimentos reais se possível

---

### 17. **Footer**
- **Arquivo:** `@/components/store/StoreFooter`
- **Tipo:** Static component
- **SSR:** true
- **Descrição:** Footer com links, informações, redes sociais
- **Adaptação Foltz:**
  - Substituir links
  - Atualizar redes sociais
  - Manter estrutura de grid

---

## 🛠️ Passos de Implementação

### **Passo 1: Preparação**

1. **Fazer backup do projeto Foltz atual**
   ```bash
   git checkout -b backup-before-migration
   git push origin backup-before-migration
   git checkout -b homepage-redesign
   ```

2. **Copiar componentes necessários da Retrobox**
   - Criar pasta temporária: `retrobox-components/`
   - Copiar todos os componentes listados acima
   - Analisar dependências de cada componente

### **Passo 2: Instalar Dependências**

```bash
npm install embla-carousel-react embla-carousel-autoplay framer-motion
```

### **Passo 3: Estrutura de Arquivos**

Criar estrutura de componentes no Foltz:

```
src/
├── components/
│   ├── store/
│   │   ├── Header.jsx
│   │   ├── StoreHero.jsx
│   │   ├── BestSellers.jsx
│   │   ├── PromotionalBanner.jsx
│   │   ├── NuestrasColecciones.jsx
│   │   ├── TopSellersWeek.jsx
│   │   ├── TeamProductsSection.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── CustomerFeedbacks.jsx
│   │   ├── StoreFooter.jsx
│   │   ├── ProductCard.jsx
│   │   └── SectionTitle.jsx
│   ├── blackfriday/ (OPCIONAL - só se houver promoção)
│   │   ├── PackLocoPromo.jsx
│   │   ├── PackLocoLiveSlots.jsx
│   │   └── HowItWorksPackLoco.jsx
│   ├── LazySection.jsx
│   └── StructuredData.jsx
├── utils/
│   └── products.js (função getBestSellers)
└── lib/
    └── shopifyCheckout.js (getCollectionProducts)
```

### **Passo 4: Implementar page.jsx**

1. Copiar estrutura da Retrobox `src/app/page.jsx`
2. Adaptar imports para Foltz
3. Remover componentes não necessários
4. Ajustar metadata

**Estrutura Sugerida para Foltz:**

```jsx
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import Header from '@/components/store/Header'
import StoreHero from '@/components/store/StoreHero'
import StoreFooter from '@/components/store/StoreFooter'
import StructuredData from '@/components/StructuredData'
import LazySection from '@/components/LazySection'

// Priority 1: SSR enabled
const BestSellers = dynamic(() => import('@/components/store/BestSellers'), {
  loading: () => <div className="h-96" />,
  ssr: true,
})

const NuestrasColecciones = dynamic(() => import('@/components/store/NuestrasColecciones'), {
  loading: () => <div className="h-96" />,
  ssr: true,
})

const TopSellersWeek = dynamic(() => import('@/components/store/TopSellersWeek'), {
  loading: () => <div className="h-96" />,
  ssr: true,
})

// Priority 3: Lazy Load
const TeamProductsSection = dynamic(() => import('@/components/store/TeamProductsSection'), {
  loading: () => null,
  ssr: false,
})

const HowItWorks = dynamic(() => import('@/components/store/HowItWorks'), {
  loading: () => null,
  ssr: false,
})

const FeaturedProducts = dynamic(() => import('@/components/store/FeaturedProducts'), {
  loading: () => null,
  ssr: false,
})

const CustomerFeedbacks = dynamic(() => import('@/components/store/CustomerFeedbacks'), {
  loading: () => null,
  ssr: false,
})

export const metadata = {
  title: 'Foltz Fanwear - Camisetas de Fútbol Originales y Retro',
  description: 'Las mejores camisetas de fútbol. Equipos de todo el mundo, envío gratis. Barcelona, Real Madrid, Manchester United y más.',
  // ... resto do metadata
}

export default function HomePage() {
  return (
    <>
      <StructuredData type="webSite" />
      <StructuredData type="organization" />

      <main className="min-h-screen">
        <Header />
        <StoreHero />

        {/* Los Más Vendidos */}
        <Suspense fallback={<div className="h-96" />}>
          <BestSellers />
        </Suspense>

        {/* Nuestras Colecciones */}
        <Suspense fallback={<div className="h-96" />}>
          <NuestrasColecciones />
        </Suspense>

        {/* Los Más Vendidos de esta Semana - Shopify */}
        <Suspense fallback={<div className="h-96" />}>
          <TopSellersWeek />
        </Suspense>

        {/* Coleção Barcelona */}
        <Suspense fallback={<div className="h-96" />}>
          <TeamProductsSection
            teamName="Barcelona"
            title="FC BARCELONA"
            subtitle="La magia del Barça"
            filterKey="name"
            logo="/images/teams/barcelona-logo.png"
            titleColor="text-[#a50044]"
          />
        </Suspense>

        {/* Coleção Real Madrid */}
        <Suspense fallback={<div className="h-96" />}>
          <TeamProductsSection
            teamName="Real Madrid"
            title="REAL MADRID"
            subtitle="El equipo blanco"
            filterKey="name"
            logo="/images/teams/real-madrid-logo.png"
            titleColor="text-white"
          />
        </Suspense>

        {/* Como Funciona */}
        <LazySection rootMargin="400px">
          <Suspense fallback={<div className="h-96" />}>
            <HowItWorks />
          </Suspense>
        </LazySection>

        {/* Produtos Destacados */}
        <LazySection rootMargin="400px">
          <Suspense fallback={<div className="h-96" />}>
            <FeaturedProducts />
          </Suspense>
        </LazySection>

        {/* Depoimentos */}
        <LazySection rootMargin="500px">
          <Suspense fallback={<div className="h-96" />}>
            <CustomerFeedbacks />
          </Suspense>
        </LazySection>

        <StoreFooter />
      </main>
    </>
  )
}
```

### **Passo 5: Adaptar Componentes**

Para cada componente copiado:

1. **Verificar dependências**
   - Contextos necessários (CartContext, BlackFridayContext)
   - Utils necessários
   - Tipos/interfaces

2. **Adaptar estilos**
   - Trocar cores da Retrobox para Foltz
   - Manter estrutura de layout
   - Ajustar dark mode se necessário

3. **Adaptar dados**
   - Substituir produtos hardcoded
   - Atualizar referências de times/ligas
   - Ajustar textos

### **Passo 6: Configurar Shopify**

1. **Criar coleção "Los más vendidos de esta semana"**
   - Admin Shopify → Collections → Create collection
   - Handle: `los-mas-vendidos-de-esta-semana`
   - Adicionar 15-20 produtos manualmente

2. **Verificar Storefront API**
   - Confirmar tokens no `.env.local`
   - Testar `getCollectionProducts()` function

### **Passo 7: Migrar Produtos**

1. **Exportar produtos da Retrobox**
   ```bash
   npm run shopify:fetch-variants  # Gera mapeamento
   ```

2. **Importar para Foltz**
   - Usar CSV ou API
   - Manter estrutura de dados
   - Atualizar imagens

### **Passo 8: Testar Performance**

1. **Lighthouse Audit**
   - Performance > 90
   - SEO > 95
   - Accessibility > 90

2. **Verificar Loading**
   - Above the fold rápido
   - Lazy load funcionando
   - Images otimizadas

---

## ✅ Checklist de Verificação

### Funcionalidades Essenciais

- [ ] Header com navegação funcionando
- [ ] Hero section com CTA
- [ ] Best Sellers carousel com 18 produtos
- [ ] Nuestras Colecciones grid
- [ ] Top Sellers Week buscando do Shopify
- [ ] Team sections com produtos filtrados
- [ ] How It Works section
- [ ] Featured Products grid
- [ ] Customer Feedbacks carousel
- [ ] Footer com links corretos

### Performance

- [ ] Dynamic imports configurados
- [ ] Suspense boundaries em todas as seções
- [ ] Lazy loading para componentes below the fold
- [ ] Images otimizadas (WebP, lazy load)
- [ ] Lighthouse Performance > 90

### SEO

- [ ] Metadata configurado
- [ ] Structured Data (WebSite, Organization)
- [ ] SSR habilitado para componentes críticos
- [ ] URLs canônicas
- [ ] Alt text em todas as imagens

### Responsividade

- [ ] Mobile first
- [ ] Breakpoints testados (mobile, tablet, desktop)
- [ ] Touch gestures nos carousels
- [ ] Navigation mobile funcionando

### Integração Shopify

- [ ] getCollectionProducts() funcionando
- [ ] Variant IDs corretos
- [ ] Checkout flow testado
- [ ] Produtos sincronizados

---

## 🎨 Adaptações Específicas para Foltz

### Diferenças da Retrobox

| Aspecto | Retrobox | Foltz |
|---------|----------|-------|
| Foco | Apenas retrô | Todos os tipos de camisetas |
| Times principais | Boca, River, Argentina | Barcelona, Real Madrid, etc |
| Promoção | Pack Black 4x | Combos personalizados |
| Mystery Box | Ligas específicas | Opcional |
| Público | Argentina | Internacional |

### Componentes a REMOVER da Foltz

1. ❌ **PackLocoPromo** - Se não houver pack promocional
2. ❌ **PackLocoLiveSlots** - Simplificar
3. ❌ **HowItWorksPackLoco** - Específico do pack
4. ❌ **MysteryBoxBlackFriday** - Se não houver mystery boxes
5. ❌ **PromotionalBanner** - Se não houver promoção ativa

### Componentes a MANTER na Foltz

1. ✅ **BestSellers** - Essencial
2. ✅ **NuestrasColecciones** - Essencial (adaptar categorias)
3. ✅ **TopSellersWeek** - Essencial
4. ✅ **TeamProductsSection** - Essencial (3-5 times principais)
5. ✅ **HowItWorks** - Essencial (adaptar textos)
6. ✅ **FeaturedProducts** - Essencial
7. ✅ **CustomerFeedbacks** - Essencial

### Times Sugeridos para TeamProductsSection (Foltz)

1. **Barcelona** - `text-[#a50044]`
2. **Real Madrid** - `text-white`
3. **Manchester United** - `text-red-600`
4. **Bayern Munich** - `text-[#DC052D]`
5. **PSG** - `text-[#004170]`

---

## 🔧 Utilitários Necessários

### `utils/products.js`

```javascript
/**
 * Get best selling products
 * @param {number} limit - Number of products
 * @returns {Array} Best selling products
 */
export async function getBestSellers(limit = 18) {
  const products = await getAllProducts()

  // Sort by sales (you'll need to track this)
  const sorted = products.sort((a, b) => (b.sales || 0) - (a.sales || 0))

  return sorted.slice(0, limit)
}
```

### `lib/shopifyCheckout.js`

Já existe na Retrobox - copiar para Foltz:
- `getCollectionProducts(handle, limit)`
- `createShopifyCheckout(lineItems)`

---

## 📝 Notas Importantes

### Dark Mode

Todos os componentes da Retrobox suportam dark mode com Tailwind classes:
- `dark:bg-black` / `bg-white`
- `dark:text-white` / `text-black`
- Manter consistência

### Cores da Foltz

Substituir cores da Retrobox pelas da Foltz:
- Orange (#FF5722) → Cor primária Foltz
- Green → Cor secundária Foltz
- Ajustar em todos os componentes

### Imagens

Todas as imagens devem estar em:
```
public/
├── images/
│   ├── hero/
│   ├── teams/
│   ├── collections/
│   └── products/
```

Usar WebP para melhor performance.

### Textos

Adaptar todos os textos para:
- Não mencionar "retrô" exclusivamente
- Incluir "camisetas originales y retro"
- Destacar variedade de produtos Foltz

---

## 🚀 Deploy

### Antes do Deploy

1. [ ] Testar localmente todas as seções
2. [ ] Verificar build sem erros: `npm run build`
3. [ ] Testar modo produção: `npm start`
4. [ ] Lighthouse audit
5. [ ] Testar em mobile real

### Deploy Checklist

1. [ ] .env.local configurado no Vercel
2. [ ] Shopify tokens corretos
3. [ ] Domain configurado
4. [ ] Analytics integrado
5. [ ] Meta Pixel configurado

---

## 📞 Suporte

Se encontrar problemas durante a migração:

1. **Verificar console do browser** - Erros de import/componentes
2. **Verificar logs do build** - Erros de compilação
3. **Verificar Shopify API** - Tokens e permissões
4. **Lighthouse** - Performance issues

---

## 📚 Recursos Adicionais

- **Embla Carousel Docs:** https://www.embla-carousel.com/
- **Framer Motion Docs:** https://www.framer.com/motion/
- **Next.js Dynamic Import:** https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
- **Shopify Storefront API:** https://shopify.dev/docs/api/storefront

---

**Última Atualização:** Janeiro 2025
**Versão:** 1.0
**Autor:** Claude Code - Retrobox Team

---

## 🎯 Resultado Esperado

Após completar esta migração, a Foltz Fanwear terá:

✅ Página inicial moderna e limpa
✅ Performance otimizada (Lighthouse > 90)
✅ SEO-friendly com SSR
✅ Carousels interativos
✅ Integração Shopify completa
✅ Responsiva (mobile-first)
✅ Dark mode suportado
✅ Menos poluição visual
✅ Foco em conversão

**Tempo estimado de implementação:** 2-3 dias de trabalho focado

Boa sorte com a migração! 🚀
