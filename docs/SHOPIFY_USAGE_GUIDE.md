# 🎯 Guia de Uso - Integração Shopify Retrobox Argentina

## ✅ Status Atual

Todos os scripts e funções necessárias foram criados! Aqui está o que foi implementado:

### Scripts Criados ✅
- ✅ [generateShopifyCSV.js](scripts/generateShopifyCSV.js) - Gera CSV dos produtos
- ✅ [uploadProductImages.mjs](scripts/uploadProductImages.mjs) - Upload de imagens via API
- ✅ [fetchShopifyVariants.mjs](scripts/fetchShopifyVariants.mjs) - Mapeia Variant IDs

### Funções Helper ✅
- ✅ [shopifyAdmin.js](src/lib/shopifyAdmin.js) - Admin API helpers
- ✅ [shopifyCheckout.js](src/lib/shopifyCheckout.js) - Checkout functions
- ✅ [getVariantId.js](src/utils/getVariantId.js) - Variant ID lookup

### Arquivos Gerados ✅
- ✅ [shopify-products-import.csv](shopify-products-import.csv) - **464 produtos**, 2.320 variantes
- ⏳ shopify-variant-mapping.json - Será gerado após importação

---

## 📋 Próximos Passos (Manual)

### Etapa 1: Importar CSV na Shopify (MANUAL) ⏳

1. **Acesse o Shopify Admin:**
   ```
   https://2twsv4-hr.myshopify.com/admin/products
   ```

2. **Clique em "Import"** (canto superior direito)

3. **Upload do CSV:**
   - Selecione: `shopify-products-import.csv`
   - ❌ **NÃO MARQUE:** "Upload images from your computer"
   - ✅ **MARQUE:** "Overwrite existing products that have the same handle"

4. **Clique em "Upload and Continue"**

5. **Revise o preview:**
   - Verifique se aparece **464 produtos**
   - Verifique se cada produto tem **5 variantes** (S, M, L, XL, XXL)
   - Produtos SEM imagens é normal (serão adicionadas depois)

6. **Clique em "Import Products"**

7. **Aguarde email de confirmação** (~10-15 minutos)

⏱️ **Tempo estimado:** 10-15 minutos

---

### Etapa 2: Upload Automático de Imagens ⏳

**IMPORTANTE:** Só execute APÓS receber o email de confirmação da Etapa 1!

```bash
npm run shopify:upload-images
```

**O que acontece:**
- Script busca cada produto na Shopify
- Para cada produto, faz upload de 7 imagens
- Aguarda 500ms entre cada upload (rate limiting)
- Mostra progresso em tempo real

**Saída esperada:**
```
📸 SHOPIFY IMAGE UPLOADER - RETROBOX ARGENTINA

✅ Total de produtos: 464
⏱️  Tempo estimado: ~54 minutos
💡 Você pode deixar rodando em background.

[1/464] 📦 AC Milan 02/03 Retro Home
   Handle: ac-milan-02-03-retro-home
   🔍 Buscando na Shopify...
   ✅ Encontrado!
   📸 Processando 7 imagens...
   ⏳ 001.jpg: Fazendo upload...
   ✅ Enviada!
   ...
```

**Dicas:**
- ✅ Pode deixar rodando em background
- ✅ Não feche o terminal
- ✅ Se der erro de conexão, pode rodar novamente (pula duplicadas)
- ✅ Produtos que já têm imagens são pulados automaticamente

⏱️ **Tempo estimado:** 2-3 horas (rodando em background)

---

### Etapa 3: Gerar Mapeamento de Variant IDs ⏳

**IMPORTANTE:** Só execute APÓS completar o upload de imagens!

```bash
npm run shopify:fetch-variants
```

**O que acontece:**
- Busca TODOS os produtos da Shopify via Storefront API
- Mapeia cada variante (tamanho) para seu Shopify Variant ID
- Gera arquivo `shopify-variant-mapping.json`

**Saída esperada:**
```
🗺️  SHOPIFY VARIANT MAPPING GENERATOR

🔗 Conectando à loja: 2twsv4-hr.myshopify.com
🔍 Buscando produtos da Shopify...

   Página 1...
   Página 2...
   ...

✅ Total de produtos encontrados: 464

🔗 Criando mapeamento de Variant IDs...

   ✓ AC Milan 02/03 Retro Home (5 variantes)
   ✓ AC Milan 03/04 Retro Home (5 variantes)
   ...

============================================================
✅ MAPEAMENTO CRIADO COM SUCESSO!
============================================================
📁 Arquivo: shopify-variant-mapping.json
📊 Produtos mapeados: 464
🔢 Total de variantes: 2320
============================================================
```

⏱️ **Tempo estimado:** 1-2 minutos

---

### Etapa 4: Integrar Checkout no Frontend ⏳

Agora você precisa integrar o checkout no CartContext e componentes!

#### 4.1 - Atualizar CartContext

**Arquivo:** `src/context/CartContext.jsx`

Adicione a importação no topo:

```javascript
import { getVariantId } from '@/utils/getVariantId'
import { createShopifyCheckout } from '@/lib/shopifyCheckout'
```

Adicione a função de checkout:

```javascript
const handleShopifyCheckout = async () => {
  try {
    // Converter itens do carrinho para formato Shopify
    const lineItems = cartItems.map(item => {
      const variantId = getVariantId(item.handle, item.size)

      if (!variantId) {
        throw new Error(`Variant não encontrado: ${item.name} - ${item.size}`)
      }

      return {
        variantId: variantId,
        quantity: item.quantity
      }
    })

    // Criar checkout na Shopify
    console.log('Criando checkout com', lineItems.length, 'itens...')
    const checkout = await createShopifyCheckout(lineItems)

    // Redirecionar para checkout
    console.log('Redirecionando para:', checkout.webUrl)
    window.location.href = checkout.webUrl

  } catch (error) {
    console.error('Erro ao criar checkout:', error)
    alert('Erro ao finalizar compra. Por favor, tente novamente.')
  }
}
```

Adicione ao value do Provider:

```javascript
<CartContext.Provider value={{
  // ... valores existentes ...
  handleShopifyCheckout  // <-- ADICIONAR
}}>
```

#### 4.2 - Atualizar item do carrinho

Quando adicionar ao carrinho, você precisa incluir o **handle** do produto. O handle é gerado a partir do `nome_completo`:

```javascript
import { generateHandle } from '@/utils/getVariantId'

const handle = generateHandle(product.nome_completo)
// "Inter Miami 25/26 Retro Away" -> "inter-miami-25-26-retro-away"

addToCart({
  id: product.id,
  handle: handle,  // <-- ADICIONAR
  name: product.nome_completo,
  price: getProductPrice(product),
  size: selectedSize,
  image: getProductMainImage(product)
})
```

#### 4.3 - Atualizar componente de checkout

Onde você tem o botão "Finalizar Compra":

```javascript
import { useCart } from '@/context/CartContext'

export default function CartCheckoutButton() {
  const { handleShopifyCheckout, cartItems } = useCart()

  return (
    <button
      onClick={handleShopifyCheckout}
      disabled={cartItems.length === 0}
      className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      FINALIZAR COMPRA
    </button>
  )
}
```

---

## 🎯 Fluxo Completo do Usuário

```
1. Usuário navega na loja (Next.js)
        ↓
2. Adiciona produtos ao carrinho
   localStorage: { id, handle, name, price, size, quantity, image }
        ↓
3. Clica em "Finalizar Compra"
        ↓
4. Frontend busca Variant IDs no mapeamento JSON
   Input: handle + size
   Output: Shopify Variant ID
        ↓
5. Frontend cria checkout na Shopify via Storefront API
        ↓
6. Shopify retorna URL do checkout
        ↓
7. Usuário é redirecionado para checkout da Shopify
        ↓
8. Usuário completa pagamento
        ↓
9. Shopify processa pedido
        ↓
10. Email de confirmação enviado
```

---

## 📦 Scripts NPM Disponíveis

```bash
# Gerar CSV dos produtos
npm run shopify:generate-csv

# Upload de imagens para Shopify CDN
npm run shopify:upload-images

# Gerar mapeamento de Variant IDs
npm run shopify:fetch-variants
```

---

## 🔧 Estrutura de Arquivos

```
retrobox-argentina/
├── scripts/
│   ├── generateShopifyCSV.js          ✅ Gerador de CSV
│   ├── uploadProductImages.mjs         ✅ Upload de imagens
│   └── fetchShopifyVariants.mjs        ✅ Mapeamento de variants
├── src/
│   ├── lib/
│   │   ├── shopifyAdmin.js             ✅ Admin API helpers
│   │   └── shopifyCheckout.js          ✅ Checkout functions
│   ├── utils/
│   │   └── getVariantId.js             ✅ Variant ID lookup
│   └── context/
│       └── CartContext.jsx             ⏳ ATUALIZAR
├── shopify-products-import.csv         ✅ GERADO (857 KB)
├── shopify-variant-mapping.json        ⏳ Será gerado na Etapa 3
└── .env.local                          ✅ Configurado
```

---

## ✅ Checklist de Progresso

### Pré-requisitos
- [x] Credenciais da Shopify configuradas
- [x] .env.local criado
- [x] Scripts criados
- [x] CSV gerado (464 produtos, 2.320 variantes)

### Etapa 1: Importação (MANUAL)
- [ ] Acessar Shopify Admin
- [ ] Fazer upload do CSV
- [ ] Aguardar email de confirmação
- [ ] Verificar produtos no Admin

### Etapa 2: Imagens (AUTOMÁTICO)
- [ ] Executar: `npm run shopify:upload-images`
- [ ] Aguardar conclusão (~2-3h em background)
- [ ] Verificar imagens no Admin

### Etapa 3: Mapeamento (AUTOMÁTICO)
- [ ] Executar: `npm run shopify:fetch-variants`
- [ ] Verificar arquivo: `shopify-variant-mapping.json`
- [ ] Confirmar 464 produtos mapeados

### Etapa 4: Checkout (CÓDIGO)
- [ ] Atualizar CartContext
- [ ] Adicionar handle ao addToCart
- [ ] Atualizar botão de checkout
- [ ] Testar checkout completo

### Verificação Final
- [ ] Todos os produtos visíveis na loja
- [ ] Imagens carregam rápido (CDN)
- [ ] Adicionar ao carrinho funciona
- [ ] Checkout redireciona para Shopify
- [ ] Pagamento pode ser completado

---

## 🐛 Troubleshooting

### Erro: "Product not found"
**Causa:** Handle no mapeamento não corresponde ao da Shopify
**Solução:** Verifique se o CSV foi importado corretamente

### Erro: "Invalid variant ID"
**Causa:** Mapeamento não foi gerado ou está desatualizado
**Solução:** Execute `npm run shopify:fetch-variants`

### Upload de imagens falha
**Causa:** Rate limiting ou arquivo muito grande
**Solução:**
- Aguarde e tente novamente
- Script pula imagens já enviadas

### Checkout creation failed
**Causa:** Token da Storefront API inválido
**Solução:**
1. Verifique SHOPIFY_STOREFRONT_ACCESS_TOKEN no .env.local
2. Certifique-se que o app tem permissões corretas

---

## 📊 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| Produtos únicos | 464 |
| Variantes (tamanhos) | 2.320 |
| Imagens totais | ~3.248 |
| Tamanho CSV | 857 KB |
| **Tempo total estimado** | **~3-4 horas** |

---

## 🎓 Recursos Adicionais

### Documentação
- [SHOPIFY_INTEGRATION_PLAN.md](SHOPIFY_INTEGRATION_PLAN.md) - Plano completo de integração
- [GUIA-COMPLETO-IMPORTACAO-SHOPIFY.md](../GUIA-COMPLETO-IMPORTACAO-SHOPIFY.md) - Guia detalhado original

### APIs
- [Shopify Admin API](https://shopify.dev/docs/api/admin-graphql)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)

---

## 📞 Suporte

Em caso de dúvidas ou problemas:

1. Verifique os logs do console
2. Confirme credenciais no .env.local
3. Revise a checklist acima
4. Consulte a documentação da Shopify

---

**Status:** Etapa 1 pendente (importação manual)
**Data:** 2025-11-08
**Versão:** 1.0.0
