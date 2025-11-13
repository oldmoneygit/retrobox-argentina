# 📦 Como Adicionar Produtos ao Retrobox

Guia completo para adicionar produtos, configurar promoções e gerenciar o catálogo de camisetas retro.

---

## 📋 Índice

1. [Estrutura de Pastas](#estrutura-de-pastas)
2. [Adicionar Novo Produto](#adicionar-novo-produto)
3. [Produtos com Múltiplas Variações](#produtos-com-múltiplas-variações)
4. [Configurar Promoções](#configurar-promoções)
5. [Formatos de Imagens](#formatos-de-imagens)
6. [Adicionar Nova Liga/Coleção](#adicionar-nova-ligacoleção)

---

## 🗂️ Estrutura de Pastas

### Organização de Imagens

```
public/images/retro/
├── [Liga]/                    # Ex: MLS, La Liga, Premier League
│   └── [Time]/               # Ex: Inter Miami, Real Madrid
│       └── [Produto]/        # Ex: Inter Miami 25-26 Retro Away
│           ├── 001.jpg       # Imagem principal
│           ├── 002.jpg       # Galeria
│           ├── 003.jpg
│           ├── 004.jpg
│           ├── 005.jpg
│           ├── 006.jpg
│           └── 007.jpg
```

### Exemplo Real - MLS

```
public/images/retro/MLS/Inter Miami/
├── Inter Miami 25-26 Retro Away/
│   ├── 001.jpg
│   ├── 002.webp
│   ├── 003.webp
│   ├── 004.webp
│   ├── 005.webp
│   ├── 006.webp
│   └── 007.jpg
├── Inter Miami 25-26 Retro Away (2)/   # Variação 2
│   ├── 001.jpg
│   ├── 002.webp
│   └── ...
└── Inter Miami 25-26 Retro Home/
    ├── 001.jpg
    └── ...
```

---

## ➕ Adicionar Novo Produto

### Passo 1: Preparar Imagens

1. **Organize as imagens** em uma pasta com o nome do produto
2. **Nomeie os arquivos** seguindo o padrão:
   - `001.jpg` - Imagem principal (obrigatória)
   - `002.jpg` até `007.jpg` - Imagens da galeria

**Formatos aceitos:**
- **Padrão:** `.jpg` (recomendado para todas as imagens)
- **MLS:** Aceita mix de `.jpg` e `.webp`

### Passo 2: Copiar Imagens para Public

```bash
# Copiar pasta do produto para a estrutura correta
cp -r "caminho/origem/Nome do Produto" "public/images/retro/[Liga]/[Time]/"

# Exemplo MLS:
cp -r "C:/Downloads/Inter Miami 25-26 Retro Away" "public/images/retro/MLS/Inter Miami/"
```

### Passo 3: Adicionar ao JSON

Edite o arquivo: `src/data/productos-retro.json`

```json
{
  "id": 999,                              // ID único sequencial
  "time": "Inter Miami",                  // Nome do time
  "ano": "25/26",                         // Temporada (formato: XX/XX)
  "tipo": "Away",                         // Home, Away, Third, etc.
  "extras": [],                           // ["Long Sleeve"] para manga longa
  "nome_completo": "Inter Miami 25/26 Retro Away",
  "nome_original": "Inter Miami 25-26 Retro Away",
  "pasta_time": "Inter Miami",            // Nome EXATO da pasta do time
  "pasta_album": "Inter Miami 25-26 Retro Away",  // Nome EXATO da pasta do produto
  "liga": "MLS",                          // Nome da liga
  "pasta_liga": "MLS"                     // Nome EXATO da pasta da liga
}
```

**⚠️ IMPORTANTE:**
- `pasta_time` deve ser EXATAMENTE igual ao nome da pasta do time
- `pasta_album` deve ser EXATAMENTE igual ao nome da pasta do produto
- IDs devem ser únicos e sequenciais

### Passo 4: Verificar

```bash
npm run dev
```

Acesse a liga correspondente e verifique se o produto aparece.

---

## 🔄 Produtos com Múltiplas Variações

Para adicionar variações do mesmo produto (ex: diferentes versões da mesma camiseta):

### 1. Criar Pastas Separadas

```
public/images/retro/MLS/Inter Miami/
├── Inter Miami 25-26 Retro Away/       # Versão 1
├── Inter Miami 25-26 Retro Away (2)/   # Versão 2
└── Inter Miami 25-26 Retro Away (3)/   # Versão 3
```

**Importante:** Use `(2)`, `(3)`, etc. para diferenciar

### 2. Criar Entradas Separadas no JSON

```json
[
  {
    "id": 285,
    "time": "Inter Miami",
    "ano": "25/26",
    "tipo": "Away",
    "extras": [],
    "nome_completo": "Inter Miami 25/26 Retro Away",
    "nome_original": "Inter Miami 25-26 Retro Away",
    "pasta_time": "Inter Miami",
    "pasta_album": "Inter Miami 25-26 Retro Away",  // Pasta SEM (2)
    "liga": "MLS",
    "pasta_liga": "MLS"
  },
  {
    "id": 286,
    "time": "Inter Miami",
    "ano": "25/26",
    "tipo": "Away",
    "extras": [],
    "nome_completo": "Inter Miami 25/26 Retro Away",
    "nome_original": "Inter Miami 25-26 Retro Away (2)",
    "pasta_time": "Inter Miami",
    "pasta_album": "Inter Miami 25-26 Retro Away (2)",  // COM (2)
    "liga": "MLS",
    "pasta_liga": "MLS"
  }
]
```

**Sistema de Deduplicação:**
- O sistema detecta produtos diferentes pela `pasta_album`
- Produtos com `pasta_album` diferente aparecem separadamente
- Produtos com `pasta_album` igual são considerados duplicados (apenas 1 aparece)

---

## 💰 Configurar Promoções

### Promoção Atual: Black November (33% OFF)

#### 1. Badge de Promoção

Já está configurado automaticamente em todos os produtos. O badge aparece em:
- Cards de produto
- Página de detalhes
- Produtos relacionados

**Código (já implementado):**
```jsx
<div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
  <span>🔥</span>
  <span>BLACK NOVEMBER</span>
  <span>33% OFF</span>
</div>
```

#### 2. Preços com Desconto

**Arquivo:** `src/utils/retroProducts.js`

```javascript
/**
 * Preço atual do produto
 * Regular: 36.900 ARS
 * Long Sleeve: 41.900 ARS
 */
export function getProductPrice(product = null) {
  if (!product) {
    return 36900 // Preço padrão
  }

  const isLongSleeve = product.extras && product.extras.includes('Long Sleeve')
  return isLongSleeve ? 41900 : 36900
}

/**
 * Preço original (antes do desconto)
 * Simula 50% de desconto (mostra como 33% OFF na interface)
 */
export function getCompareAtPrice(product = null) {
  const currentPrice = getProductPrice(product)
  return Math.round(currentPrice * 1.5)  // 50% a mais = mostra desconto
}
```

#### 3. Alterar Percentual de Desconto

**Para mudar de 33% para outro valor:**

1. **Atualizar badge visual** em todos os componentes:
   ```jsx
   // Procure por "33% OFF" e substitua
   <span>40% OFF</span>  // Exemplo: 40% de desconto
   ```

2. **Ajustar cálculo de preço:**
   ```javascript
   export function getCompareAtPrice(product = null) {
     const currentPrice = getProductPrice(product)
     // Para 40% OFF: preço original = atual / 0.6
     return Math.round(currentPrice / 0.6)
   }
   ```

3. **Locais para atualizar:**
   - `src/app/page.jsx` - Homepage
   - `src/components/FeaturedProducts.jsx`
   - `src/components/SeleccionesCarousel.jsx`
   - `src/app/colecciones/[liga]/[equipo]/page.jsx`
   - `src/app/colecciones/[liga]/[equipo]/[id]/page.jsx`
   - `src/app/product/[slug]/page.jsx`

#### 4. Alterar Preços Base

**Arquivo:** `src/utils/retroProducts.js`

```javascript
export function getProductPrice(product = null) {
  if (!product) {
    return 39900  // NOVO preço padrão (era 36900)
  }

  const isLongSleeve = product.extras && product.extras.includes('Long Sleeve')
  return isLongSleeve ? 44900 : 39900  // NOVOS preços
}
```

#### 5. Remover Promoção

Para remover completamente a promoção:

1. **Remover badges** (busque por "BLACK NOVEMBER"):
   ```jsx
   // Remover este bloco em todos os arquivos:
   <div className="bg-gradient-to-r from-orange-500 to-red-500...">
     🔥 BLACK NOVEMBER 33% OFF
   </div>
   ```

2. **Remover preço riscado:**
   ```jsx
   // Remover:
   <p className="text-gray-400 text-xs line-through">
     ${formatPrice(getCompareAtPrice(product))}
   </p>
   ```

3. **Manter apenas preço normal:**
   ```jsx
   <p className="text-white font-bold text-lg">
     ${formatPrice(getProductPrice(product))}
   </p>
   ```

---

## 🖼️ Formatos de Imagens

### Padrão Geral (Recomendado)

Todas as ligas usam `.jpg`:

```
produto/
├── 001.jpg  (principal)
├── 002.jpg
├── 003.jpg
├── 004.jpg
├── 005.jpg
├── 006.jpg
└── 007.jpg
```

### MLS (Padrão Especial)

MLS usa mix de `.jpg` e `.webp`:

```
produto/
├── 001.jpg   (principal)
├── 002.webp
├── 003.webp
├── 004.webp
├── 005.webp
├── 006.webp
└── 007.jpg   (última)
```

**Sistema detecta automaticamente** baseado em `pasta_liga === 'MLS'`

### Adicionar Novo Formato Personalizado

**Arquivo:** `src/utils/retroProducts.js`

```javascript
export function getProductImages(product) {
  const basePath = `/images/retro/${product.pasta_liga}/${product.pasta_time}/${product.pasta_album}`

  // MLS - padrão especial
  if (product.pasta_liga === 'MLS') {
    return [
      `${basePath}/001.jpg`,
      `${basePath}/002.webp`,
      `${basePath}/003.webp`,
      `${basePath}/004.webp`,
      `${basePath}/005.webp`,
      `${basePath}/006.webp`,
      `${basePath}/007.jpg`
    ]
  }

  // ADICIONAR NOVA LIGA COM FORMATO DIFERENTE:
  if (product.pasta_liga === 'Nova Liga') {
    return [
      `${basePath}/001.webp`,  // Seu formato customizado
      `${basePath}/002.webp`,
      // ...
    ]
  }

  // Padrão para todas as outras ligas
  return [
    `${basePath}/001.jpg`,
    `${basePath}/002.jpg`,
    `${basePath}/003.jpg`,
    `${basePath}/004.jpg`,
    `${basePath}/005.jpg`,
    `${basePath}/006.jpg`,
    `${basePath}/007.jpg`
  ]
}
```

---

## ➕ Adicionar Nova Liga/Coleção

### 1. Criar Estrutura de Pastas

```bash
mkdir -p "public/images/retro/Nova Liga/Time 1"
mkdir -p "public/images/retro/Nova Liga/Time 2"
```

### 2. Adicionar à Lista de Ligas

**Arquivo:** `src/utils/constants.js`

```javascript
// Adicionar na lista de leagues
export const leagues = [
  {
    id: 'mls',
    name: 'MLS',
    slug: 'mls',
    image: '/images/collections/ligas/mls.webp',
    description: 'Major League Soccer',
    featured: true
  },
  // ADICIONAR NOVA LIGA:
  {
    id: 'nova-liga',
    name: 'Nova Liga',
    slug: 'nova-liga',
    image: '/images/collections/ligas/nova-liga.webp',
    description: 'Descrição da Nova Liga',
    featured: true
  }
]
```

### 3. Adicionar Imagem da Liga

Coloque a imagem em:
```
public/images/collections/ligas/nova-liga.webp
```

### 4. Adicionar Produtos

Siga os passos da seção [Adicionar Novo Produto](#adicionar-novo-produto) usando a nova liga.

### 5. Atualizar Mapeamento de Imagens (Opcional)

**Arquivo:** `src/app/colecciones/page.jsx`

```javascript
const leagueImages = {
  'Premier League': '/images/collections/ligas/premierleague.webp',
  'La Liga': '/images/collections/ligas/laliga.webp',
  // ... outras ligas
  'Nova Liga': '/images/collections/ligas/nova-liga.webp'  // ADICIONAR
}
```

---

## ✅ Checklist de Verificação

Antes de considerar um produto adicionado com sucesso:

- [ ] Pasta do produto criada com nome correto
- [ ] Imagens adicionadas (001.jpg obrigatória)
- [ ] Entrada no `productos-retro.json` criada
- [ ] `pasta_liga`, `pasta_time` e `pasta_album` conferidos
- [ ] ID único atribuído
- [ ] Produto aparece na página da liga
- [ ] Imagens carregam sem erro 404
- [ ] Preço exibido corretamente
- [ ] Badge de promoção aparece (se ativa)
- [ ] Produto aparece na busca

---

## 🐛 Solução de Problemas

### Produto não aparece na lista

**Verificar:**
1. Nome da `pasta_album` está EXATAMENTE igual ao nome da pasta?
2. ID é único (não duplicado)?
3. JSON está válido (sem vírgulas extras)?

### Imagens não carregam (404)

**Verificar:**
1. Caminho completo: `/public/images/retro/[Liga]/[Time]/[Produto]/001.jpg`
2. Nome da pasta está exatamente como em `pasta_album`?
3. Arquivo `001.jpg` existe?
4. Para MLS: verificar se `.webp` existe para imagens 002-006

### Produto duplicado aparece apenas 1 vez

**Esperado!** O sistema remove duplicatas baseado em `pasta_album`.

**Solução:** Para múltiplas variações, use nomes diferentes:
- `Produto Nome`
- `Produto Nome (2)`
- `Produto Nome (3)`

### Preço errado

**Verificar:**
1. Produto tem `"extras": ["Long Sleeve"]`? (preço +5000)
2. Função `getProductPrice()` em `retroProducts.js`
3. Promoção ativa altera o cálculo?

---

## 📞 Suporte

Para mais informações, consulte:
- `README.md` - Visão geral do projeto
- `START_HERE.md` - Início rápido
- `src/utils/retroProducts.js` - Lógica de produtos e preços
- `src/data/productos-retro.json` - Catálogo de produtos

---

**Documentação atualizada em:** 2025-01-08
**Versão:** 1.0.0
**Promoção ativa:** Black November 33% OFF
