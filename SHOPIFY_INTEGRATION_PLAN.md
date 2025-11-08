# 🚀 Plano de Integração Shopify - Retrobox Argentina

## 📋 Resumo Executivo

Este documento detalha o plano completo para integrar a loja **Retrobox Argentina** com a **Shopify**, permitindo checkout funcional e processamento de pagamentos.

### Credenciais da Shopify
```
Domain: 2twsv4-hr.myshopify.com
Admin Token: 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
Storefront Token: 00354690001e3346b368cb7cb304b567
```

### Tempo Estimado Total
**~3-4 horas** (sendo 2-3h de upload automático de imagens)

---

## 🎯 Objetivos

1. ✅ Exportar todos os produtos de `productos-retro.json` para Shopify
2. ✅ Upload automático de todas as imagens para CDN da Shopify
3. ✅ Mapear Variant IDs para integração com checkout
4. ✅ Implementar checkout funcional com Storefront API
5. ✅ Manter frontend atual (Next.js) + backend Shopify

---

## 📊 Processo Completo (5 Etapas)

```
📦 Dados Locais (productos-retro.json)
        ↓
[1] 🔧 Gerar CSV Shopify (~5-10 segundos)
        ↓
[2] 📤 Importar CSV na Shopify (~10-15 minutos) - MANUAL, SEM IMAGENS
        ↓
[3] 📸 Upload Automático de Imagens (~2-3 horas) - VIA API
        ↓
[4] 🗺️ Gerar Mapeamento Variant IDs (~1-2 minutos)
        ↓
[5] 🛒 Integrar Checkout com Storefront API (~30 minutos)
        ↓
✅ LOJA FUNCIONANDO COM CHECKOUT
```

---

## 🔄 Diferenças: Retrobox vs. Documentação Base

### Estrutura de Dados

**Documentação Base (exemplo):**
```json
{
  "premier-league": {
    "id": "premier-league",
    "name": "Premier League",
    "products": [...]
  }
}
```

**Retrobox Argentina (real):**
```json
[
  {
    "id": 285,
    "time": "Inter Miami",
    "ano": "25/26",
    "tipo": "Away",
    "extras": [],
    "nome_completo": "Inter Miami 25/26 Retro Away",
    "liga": "MLS",
    "pasta_liga": "MLS",
    "pasta_time": "Inter Miami",
    "pasta_album": "Inter Miami 25-26 Retro Away"
  }
]
```

### Adaptações Necessárias

| Campo Doc Base | Campo Retrobox | Adaptação |
|----------------|----------------|-----------|
| `product.id` (handle) | `produto.id` (número) | Gerar handle a partir de `nome_completo` |
| `product.name` | `produto.nome_completo` | Usar diretamente |
| `product.sizes` | N/A | Usar padrão "S-XXL" |
| `product.price` | N/A | Usar `getProductPrice()` |
| `product.regularPrice` | N/A | Usar `getCompareAtPrice()` |
| `product.images[]` | `pasta_liga/pasta_time/pasta_album/001.jpg...` | Gerar array de imagens |
| `league.name` | `produto.liga` | Usar como `productType` |

---

## 📝 Tarefas Detalhadas

### ✅ ETAPA 1: Configuração Inicial

#### 1.1 - Variáveis de Ambiente (.env.local)

**Arquivo:** `.env.local`

```env
# Shopify Store
SHOPIFY_STORE_DOMAIN=2twsv4-hr.myshopify.com
SHOPIFY_ADMIN_ACCESS_TOKEN=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
SHOPIFY_STOREFRONT_ACCESS_TOKEN=00354690001e3346b368cb7cb304b567

# Next.js Public (para frontend)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=2twsv4-hr.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=00354690001e3346b368cb7cb304b567
```

#### 1.2 - Estrutura de Pastas

```
retrobox-argentina/
├── scripts/
│   ├── generateShopifyCSV.js        (NOVO)
│   ├── uploadProductImages.mjs       (NOVO)
│   └── fetchShopifyVariants.js      (NOVO)
├── src/
│   ├── lib/
│   │   ├── shopifyAdmin.js          (NOVO)
│   │   └── shopifyCheckout.js       (NOVO)
│   └── utils/
│       └── getVariantId.js          (NOVO)
├── shopify-products-import.csv       (GERADO)
├── shopify-variant-mapping.json     (GERADO)
└── .env.local                        (CONFIGURAR)
```

---

### ✅ ETAPA 2: Geração de CSV

#### 2.1 - Script generateShopifyCSV.js

**Objetivo:** Converter `productos-retro.json` para CSV formato Shopify

**Funcionalidades:**
- Ler productos-retro.json
- Gerar handle único (slug a partir de nome_completo)
- Criar variantes de tamanho (S, M, L, XL, XXL)
- Aplicar preços (regular + manga longa)
- Aplicar preço promocional (Black November)
- Gerar CSV com 45 colunas padrão Shopify
- **SEM incluir URLs de imagens** (serão adicionadas via API)

**Saída Esperada:**
```
📦 Produto 1: Inter Miami 25/26 Retro Away (5 variantes)
📦 Produto 2: Inter Miami 25/26 Retro Home (5 variantes)
...
✅ CSV gerado com sucesso!
📁 Arquivo: shopify-products-import.csv
📊 Produtos: ~400
📋 Total de linhas (com variantes): ~2000
```

---

### ✅ ETAPA 3: Importação Manual na Shopify

**Processo:**

1. Acessar: `https://2twsv4-hr.myshopify.com/admin/products`
2. Clicar em **"Import"** (canto superior direito)
3. Upload do arquivo `shopify-products-import.csv`
4. **❌ NÃO MARCAR:** "Upload images from your computer"
5. ✅ **MARCAR:** "Overwrite existing products that have the same handle"
6. Clicar em **"Upload and Continue"**
7. Revisar preview
8. Clicar em **"Import Products"**
9. Aguardar email de confirmação (~10-15 minutos)

**Verificação:**
- ✅ Todos os produtos listados
- ✅ Variantes de tamanho corretas (S, M, L, XL, XXL)
- ✅ Preços corretos
- ⚠️ Produtos SEM imagens (normal - será corrigido na Etapa 4)

---

### ✅ ETAPA 4: Upload Automático de Imagens

#### 4.1 - Funções Helper (shopifyAdmin.js)

**Funções principais:**
- `getProductByHandle(handle)` - Buscar produto na Shopify
- `addProductImage(productId, imageDataUri, altText)` - Upload de imagem via Admin API

#### 4.2 - Script uploadProductImages.mjs

**Objetivo:** Upload automático de TODAS as imagens para Shopify CDN

**Processo:**
1. Ler productos-retro.json
2. Para cada produto:
   - Buscar produto na Shopify (via handle)
   - Gerar array de imagens locais (baseado em pasta_album)
   - Ler cada imagem como base64
   - Upload via Admin API
   - Delay de 500ms entre uploads (rate limit)

**Saída Esperada:**
```
📸 SHOPIFY IMAGE UPLOADER

✅ Total de produtos: 400
⏱️  Tempo estimado: 2-3 horas

[1/400] 📦 Inter Miami 25/26 Retro Away
   🔍 Buscando na Shopify...
   ✅ Encontrado!
   📸 Imagens: 7
   ⏳ 1/7: 001.jpg ✅ Enviada!
   ⏳ 2/7: 002.webp ✅ Enviada!
   ...
   ✅ Produto concluído!

⏱️  Progresso: 100/400 produtos
   Tempo restante: ~120 minutos

============================================================
📊 RESUMO FINAL
============================================================
✅ Imagens enviadas: 2800
❌ Erros: 5
📦 Produtos processados: 400/400
⏱️  Tempo total: 158 minutos
============================================================
```

**Importante:**
- Pode deixar rodando em background
- Imagens vão direto para CDN da Shopify
- URLs permanentes e otimizadas
- Se der erro, pode rodar novamente (pula duplicadas)

---

### ✅ ETAPA 5: Mapeamento de Variant IDs

#### 5.1 - Script fetchShopifyVariants.js

**Objetivo:** Criar mapeamento completo de handle + size → Shopify Variant ID

**Processo:**
1. Buscar TODOS os produtos da Shopify via Storefront API (com paginação)
2. Para cada produto, extrair:
   - Handle
   - Todas as variantes (tamanhos)
   - Variant IDs
   - Preços
   - Disponibilidade
3. Gerar arquivo JSON com mapeamento completo

**Saída:** `shopify-variant-mapping.json`

```json
{
  "inter-miami-25-26-retro-away": {
    "handle": "inter-miami-25-26-retro-away",
    "title": "Inter Miami 25/26 Retro Away",
    "shopifyProductId": "gid://shopify/Product/1234567890",
    "productType": "MLS",
    "variants": {
      "S": {
        "shopifyVariantId": "gid://shopify/ProductVariant/11111111",
        "sku": "inter-miami-25-26-retro-away-S",
        "price": "369.00",
        "compareAtPrice": "553.50",
        "currency": "ARS",
        "availableForSale": true,
        "quantityAvailable": 100
      },
      "M": { ... },
      "L": { ... }
    }
  }
}
```

---

### ✅ ETAPA 6: Integração com Checkout

#### 6.1 - Utilitário getVariantId.js

**Funções:**
- `getVariantId(handle, size)` → retorna Shopify Variant ID
- `getVariantInfo(handle, size)` → retorna info completa da variante

**Exemplo de uso:**
```javascript
import { getVariantId } from '@/utils/getVariantId'

const variantId = getVariantId('inter-miami-25-26-retro-away', 'M')
// → "gid://shopify/ProductVariant/11111111"
```

#### 6.2 - Funções de Checkout (shopifyCheckout.js)

**Função principal:**
- `createShopifyCheckout(lineItems)` → cria checkout e retorna URL

**Input:**
```javascript
[
  {
    variantId: "gid://shopify/ProductVariant/11111111",
    quantity: 2
  }
]
```

**Output:**
```javascript
"https://2twsv4-hr.myshopify.com/checkouts/abc123..."
```

#### 6.3 - Integração no CartContext

**Modificações necessárias:**

1. **Adicionar ao carrinho:**
   - Armazenar `{ handle, size, quantity }` (manter atual)

2. **Finalizar compra:**
   - Buscar variantId para cada item usando `getVariantId()`
   - Criar checkout na Shopify usando `createShopifyCheckout()`
   - Redirecionar usuário para URL do checkout

**Código simplificado:**
```javascript
const handleCheckout = async () => {
  // Converter itens do carrinho para formato Shopify
  const lineItems = cartItems.map(item => ({
    variantId: getVariantId(item.handle, item.size),
    quantity: item.quantity
  }))

  // Criar checkout na Shopify
  const checkoutUrl = await createShopifyCheckout(lineItems)

  // Redirecionar para checkout
  window.location.href = checkoutUrl
}
```

---

## 🔄 Fluxo Completo do Usuário

```
1. Usuário navega no Retrobox (Next.js frontend)
        ↓
2. Seleciona produto + tamanho
        ↓
3. Adiciona ao carrinho
   localStorage: { handle: "produto-x", size: "M", quantity: 1 }
        ↓
4. Clica em "Finalizar Compra"
        ↓
5. Frontend busca variantId no mapeamento JSON
   Input: handle="produto-x", size="M"
   Output: variantId="gid://shopify/ProductVariant/12345"
        ↓
6. Frontend cria checkout na Shopify via Storefront API
   POST /graphql com mutation checkoutCreate
        ↓
7. Shopify retorna URL do checkout
        ↓
8. Usuário é redirecionado para checkout da Shopify
        ↓
9. Usuário completa pagamento (Mercado Pago, cartão, etc)
        ↓
10. Shopify processa pedido
        ↓
11. Email de confirmação enviado
        ↓
12. ✅ VENDA CONCLUÍDA
```

---

## 📦 Scripts NPM

Adicionar ao `package.json`:

```json
{
  "scripts": {
    "shopify:generate-csv": "node scripts/generateShopifyCSV.js",
    "shopify:upload-images": "node scripts/uploadProductImages.mjs",
    "shopify:fetch-variants": "node scripts/fetchShopifyVariants.js"
  }
}
```

**Uso:**
```bash
# Gerar CSV
npm run shopify:generate-csv

# Upload de imagens (após importação manual do CSV)
npm run shopify:upload-images

# Gerar mapeamento de variants (após upload de imagens)
npm run shopify:fetch-variants
```

---

## ⚠️ Pontos de Atenção

### 1. Handles Únicos
- Cada produto precisa de um handle único
- Handle será gerado a partir de `nome_completo` convertido para slug
- Exemplo: "Inter Miami 25/26 Retro Away" → "inter-miami-25-26-retro-away"

### 2. Variantes Múltiplas (mesmo produto)
- Produtos com `(2)`, `(3)` no `pasta_album` terão handles diferentes
- Exemplo:
  - "Inter Miami 25-26 Retro Away" → "inter-miami-25-26-retro-away"
  - "Inter Miami 25-26 Retro Away (2)" → "inter-miami-25-26-retro-away-2"

### 3. Formatos de Imagem
- MLS: mix de .jpg e .webp (001.jpg, 002-006.webp, 007.jpg)
- Outras ligas: todas .jpg (001-007.jpg)
- Script precisa detectar formato correto baseado em `pasta_liga`

### 4. Preços
- Regular: $36.900 ARS
- Long Sleeve: $41.900 ARS
- Compare At Price (antes do desconto): ~50% maior
- Script usará funções existentes `getProductPrice()` e `getCompareAtPrice()`

### 5. Rate Limiting
- Upload de imagens: delay de 500ms entre cada upload
- Fetch de variants: delay de 500ms entre páginas
- Shopify Admin API: max 4 requests/segundo

---

## ✅ Checklist de Execução

### Pré-requisitos
- [x] Credenciais da Shopify recebidas
- [ ] .env.local configurado
- [ ] Estrutura de pastas criada

### Etapa 1: CSV
- [ ] Script generateShopifyCSV.js criado
- [ ] CSV gerado com sucesso
- [ ] CSV revisado (produtos, preços, variantes)

### Etapa 2: Importação
- [ ] CSV importado na Shopify Admin
- [ ] Email de confirmação recebido
- [ ] Produtos aparecem no Admin (sem imagens)
- [ ] Variantes de tamanho corretas

### Etapa 3: Imagens
- [ ] shopifyAdmin.js criado
- [ ] uploadProductImages.mjs criado
- [ ] Upload executado (~2-3h)
- [ ] Imagens aparecem nos produtos

### Etapa 4: Mapeamento
- [ ] fetchShopifyVariants.js criado
- [ ] Mapeamento gerado (JSON)
- [ ] Arquivo revisado

### Etapa 5: Checkout
- [ ] getVariantId.js criado
- [ ] shopifyCheckout.js criado
- [ ] Integração com CartContext
- [ ] Checkout testado

### Verificação Final
- [ ] Todos os produtos visíveis
- [ ] Imagens carregam rápido
- [ ] Adicionar ao carrinho funciona
- [ ] Checkout redireciona
- [ ] Pagamento pode ser completado

---

## 📊 Estatísticas Esperadas

Com base no catálogo atual:

| Métrica | Valor Estimado |
|---------|----------------|
| Produtos únicos | ~400 |
| Variantes (tamanhos) | ~2.000 |
| Imagens totais | ~2.800 |
| Tamanho CSV | ~3-4 MB |
| **Tempo total** | **~3-4 horas** |

---

## 🎯 Benefícios da Integração

1. ✅ **Checkout Profissional**
   - Shopify processa pagamentos
   - Múltiplos métodos (Mercado Pago, cartões, etc)
   - Carrinho abandonado automático

2. ✅ **Gestão de Pedidos**
   - Painel Shopify para gerenciar vendas
   - Emails automáticos de confirmação
   - Rastreamento de envio

3. ✅ **CDN Global**
   - Imagens servidas via Shopify CDN
   - Carregamento ultra-rápido
   - URLs permanentes

4. ✅ **Escalabilidade**
   - Infraestrutura Shopify
   - Suporta milhares de pedidos/dia
   - Sem preocupação com servidor

5. ✅ **Frontend Mantido**
   - Design atual preservado
   - Next.js continua servindo o site
   - Apenas checkout externo

---

## 🚀 Próximos Passos Após Integração

1. **Configurar pagamentos na Shopify**
   - Ativar Mercado Pago
   - Configurar métodos de pagamento

2. **Testar checkout completo**
   - Fazer compra teste
   - Verificar emails
   - Confirmar processamento

3. **Configurar envio**
   - Adicionar transportadoras
   - Definir valores de frete
   - Configurar zonas de entrega

4. **Analytics**
   - Google Analytics na Shopify
   - Facebook Pixel
   - Tracking de conversão

5. **Otimizações**
   - Remover imagens locais (liberar espaço)
   - Migrar dados para API Shopify
   - Deploy na Vercel

---

**Status:** 📋 PLANO PRONTO - AGUARDANDO EXECUÇÃO

**Data:** 2025-11-08

**Credenciais:**
- Domain: `2twsv4-hr.myshopify.com`
- Admin Token: `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`
- Storefront Token: `00354690001e3346b368cb7cb304b567`
