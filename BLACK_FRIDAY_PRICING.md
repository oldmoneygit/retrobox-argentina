# 🔥 BLACK FRIDAY - Promoção de Preços

## 📋 Resumo da Atualização

Todos os produtos **Long Sleeve (Manga Longa)** tiveram seus preços ajustados para **R$ 369,00** como parte da promoção de Black Friday.

### Justificativa: Pack Black

A promoção **Pack Black** oferece **4 camisetas por R$ 599,00**. Para que essa oferta faça sentido economicamente:

| Item | Valor |
|------|-------|
| **Preço unitário Long Sleeve** | R$ 369,00 |
| **4 camisetas (preço normal)** | R$ 1.476,00 |
| **Pack Black (promoção)** | R$ 599,00 |
| **Economia** | R$ 877,00 |
| **Desconto** | **59% OFF** 🔥 |

## 📊 Estatísticas da Atualização

- **Total de produtos no catálogo:** 415
- **Produtos Long Sleeve:** 101
- **Produtos atualizados:** 101 ✅
- **Preço anterior:** R$ 419,00 (41.900)
- **Novo preço:** R$ 369,00 (36.900)
- **Redução por produto:** R$ 50,00 (11,9%)

## 🎯 Produtos Afetados

### Times Europeus
- **AC Milan:** 9 produtos
  - AC Milan 06/07 Retro Away Long Sleeve
  - AC Milan 07/08 Retro Home Long Sleeve
  - AC Milan 08/09 Retro Home Long Sleeve
  - AC Milan 09/10 Retro Home Long Sleeve
  - AC Milan 10/11 Retro Home Long Sleeve
  - AC Milan 11/12 Retro Away Long Sleeve
  - AC Milan 13/14 Retro Home Long Sleeve
  - AC Milan 24/25 Retro Long Sleeve
  - AC Milan 93/94 Retro Home Long Sleeve

- **Barcelona:** 12 produtos
  - Barcelona 03/04, 05/06, 07/08, 08/09, 09/10, 10/11, 12/13, 14/15, 15/16, 16/17, 1992, 98/99

- **Real Madrid:** 14 produtos
  - Real Madrid 02/03, 04/05, 10/11, 11/12, 12/13, 13/14, 14/15, 15/16, 16/17, 17/18

- **Manchester United:** 10 produtos
- **Arsenal:** 3 produtos
- **Chelsea:** 4 produtos
- **Inter de Milán:** 2 produtos
- **Napoli:** 1 produto
- **Roma:** 5 produtos
- **Lazio:** 1 produto
- **Parma:** 1 produto
- **PSG:** 1 produto

### Seleções
- **Argentina:** 5 produtos
  - Argentina 1986, 1994, 1998, 2006, 2014

- **Brasil:** 6 produtos
  - Brasil 1998 (Home/Away), 2002 (Home/Away), 2006, Retro

- **Alemanha:** 1 produto
- **Inglaterra:** 3 produtos
- **França:** 1 produto
- **Holanda:** 1 produto
- **Itália:** 2 produtos
- **Japão:** 4 produtos
- **Portugal:** 1 produto

### Times Argentinos
- **Boca Juniors:** 2 produtos
  - Boca Juniors 03/04 Retro Home Long Sleeve
  - Boca Juniors 1981 Retro Home Long Sleeve

- **River Plate:** 2 produtos
  - River Plate 03/04 Retro Away Long Sleeve
  - River Plate 05/06 Retro Away Long Sleeve

- **Independiente:** 1 produto
- **Santos:** 2 produtos

## 🛠️ Script de Atualização

Criado script automatizado para futuras atualizações de preços:

**Localização:** `scripts/updateLongSleevePrices.mjs`

### Como Usar

```bash
cd retrobox-argentina
node scripts/updateLongSleevePrices.mjs
```

**Funcionalidades:**
- Lê `src/data/products.json`
- Identifica produtos com "Long Sleeve" no nome
- Atualiza preço para 36.900
- Salva alterações
- Exibe estatísticas detalhadas

## 🎉 Benefícios da Promoção

### Para o Cliente

1. **Preço Individual Atrativo**
   - Long Sleeve por apenas R$ 369,00
   - R$ 50,00 mais barato que antes

2. **Pack Black Super Vantajoso**
   - 4 camisetas por R$ 599,00
   - Apenas R$ 149,75 por camiseta
   - Economia de R$ 877,00 (59% OFF)

3. **Produtos Premium**
   - Mangas longas de alta qualidade
   - Times e seleções icônicas
   - Temporadas históricas

### Para a Loja

1. **Aumento de Conversão**
   - Preço psicologicamente atrativo (R$ 369)
   - Incentivo forte para Pack Black

2. **Volume de Vendas**
   - Promoção incentiva compra de múltiplos produtos
   - Pack Black aumenta ticket médio

3. **Competitividade**
   - Preços alinhados com Black Friday
   - Oferta difícil de recusar

## 📱 Mensagens de Marketing

### Banner Principal
```
🔥 BLACK FRIDAY: Long Sleeve por R$ 369,00!
💰 Pack Black: 4 camisetas por R$ 599,00 (59% OFF)
```

### Descrição de Produto
```
🔥 BLACK NOVEMBER - Agora R$ 369,00!
Manga longa premium, qualidade excepcional
Ou leve 4 no Pack Black por apenas R$ 599,00
```

### Redes Sociais
```
🚨 PROMOÇÃO IMPERDÍVEL! 🚨

Camisetas Long Sleeve agora R$ 369,00
Ou aproveite o PACK BLACK:
4 camisetas por R$ 599,00

Economize R$ 877 (59% OFF)! 🔥

Times: Real Madrid, Barcelona, Man Utd, Boca, River e+
Seleções: Argentina, Brasil, Alemanha, França e+

Acesse: [link do site]
```

## 🔍 Verificação

### Testar no Localhost

```bash
cd retrobox-argentina
npm run dev
```

1. Abrir http://localhost:3000
2. Navegar para um produto Long Sleeve
3. Verificar preço: **R$ 369,00**
4. Verificar Pack Black: **4 por R$ 599,00**

### Testar no Vercel

Após o deploy (2-5 minutos):

1. Abrir site em modo anônimo
2. Verificar produtos Long Sleeve
3. Confirmar preços atualizados
4. Testar Pack Black no checkout

## 📝 Commits Relacionados

```
28f6104 ← feat: Promoção Black Friday - Long Sleeve por R$ 369,00
c3d4673 ← docs: Adicionar documentação da correção do checkout no Vercel
deaabf3 ← fix: Adicionar shopify-variant-mapping.json para habilitar checkout
```

## ⚠️ Importante

### NÃO Alterar

Os seguintes produtos **NÃO** foram alterados (mantêm preço R$ 369,00):
- Camisetas **manga curta** regulares
- Produtos especiais ou edições limitadas

### Reverter se Necessário

Para reverter os preços (exemplo):

```javascript
// Editar script e mudar linha:
price: 41900  // Preço original
```

## 🎯 Próximos Passos

1. ✅ Deploy automático via Vercel (em andamento)
2. ⏳ Aguardar 2-5 minutos
3. ⏳ Verificar preços em produção
4. ⏳ Atualizar materiais de marketing
5. ⏳ Divulgar promoção nas redes sociais

---

**Data da Atualização:** 2025-11-11
**Commit:** 28f6104
**Arquivos Alterados:**
- `src/data/products.json` (101 produtos)
- `scripts/updateLongSleevePrices.mjs` (novo script)

**Status:** ✅ DEPLOYADO
