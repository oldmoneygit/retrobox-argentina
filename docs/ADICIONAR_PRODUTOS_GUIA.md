# Guia: Adicionar Produtos na Shopify

## ✅ Status Atual

- **Products.json atualizado**: 388 → 426 produtos (+38 produtos)
- **CSV gerado**: `shopify-new-products.csv` (228 linhas = 38 produtos x 6 tamanhos)
- **Script de upload de imagens**: `scripts/uploadProductImages.mjs`

## 📊 Produtos Adicionados por Time

- **Inter de Milán**: 10 produtos
- **Bayern München**: 7 produtos
- **Barcelona**: 5 produtos
- **Boca Juniors**: 4 produtos
- **River Plate**: 4 produtos
- **Independiente**: 3 produtos
- **Real Madrid**: 3 produtos (25/26)
- **Instituto de Córdoba**: 2 produtos

**Total**: 38 produtos

## 🚀 Passo a Passo

### Passo 1: Importar CSV na Shopify

1. Acesse o Shopify Admin:
   ```
   https://2twsv4-hr.myshopify.com/admin
   ```

2. Navegue para **Products** > **Import**

3. Faça upload do arquivo:
   ```
   shopify-new-products.csv
   ```

4. Aguarde a importação completar
   - A Shopify vai criar 38 produtos
   - Cada produto terá 6 variantes (tamanhos: S, M, L, XL, XXL, 3XL)
   - Os produtos estarão SEM IMAGENS ainda

5. Verifique se os produtos foram importados:
   - Vá em **Products** > **All Products**
   - Filtre por "Status: Active"
   - Você deve ver os 38 novos produtos

### Passo 2: Fazer Upload das Imagens

Depois que a importação do CSV estiver completa:

1. Execute o script de upload de imagens:
   ```bash
   node scripts/uploadProductImages.mjs
   ```

2. O script vai:
   - ✅ Buscar cada produto na Shopify pelo handle (slug)
   - ✅ Buscar as imagens na pasta `C:\Users\PC\Documents\Retrobox\RETRO\[pasta do produto]`
   - ✅ Fazer upload da primeira imagem de cada pasta
   - ✅ Associar a imagem ao produto
   - ⏳ Aguardar 2 segundos entre uploads (rate limiting da Shopify)

3. Tempo estimado:
   - 38 produtos x 2 segundos = ~76 segundos (~1.5 minutos)

4. O script mostrará o progresso:
   ```
   [1/38] Inter de Milán 02/03 Retro Home
      Handle: inter-de-milan-02-03-retro-home
      Pasta: Inter de Milán 02-03 Retro Home
      ✅ Produto encontrado na Shopify: gid://shopify/Product/123456
      📸 3 imagens encontradas
      📤 Fazendo upload: imagem1.jpg
      ✅ Imagem enviada com sucesso!
      🔗 URL: https://cdn.shopify.com/...
      ⏳ Aguardando 2s...
   ```

### Passo 3: Verificar Produtos na Shopify

1. Acesse **Products** > **All Products**

2. Verifique se os produtos estão com:
   - ✅ Imagens carregadas
   - ✅ 6 variantes (tamanhos)
   - ✅ Preço: ARS 369.00
   - ✅ Status: Active

### Passo 4: Atualizar Mapeamento de Variantes (Opcional)

Se você quiser adicionar esses produtos ao arquivo de mapeamento local:

```bash
npm run shopify:fetch-variants
```

Isso vai atualizar o arquivo `shopify-variant-mapping.json` com os novos produtos.

## ⚠️ Problemas Comuns

### Problema: "Produto não encontrado na Shopify"

**Solução**: Certifique-se de importar o CSV primeiro (Passo 1)

### Problema: "Pasta não encontrada"

**Solução**: Verifique se a pasta existe em:
```
C:\Users\PC\Documents\Retrobox\RETRO\[nome da pasta]
```

### Problema: "Rate limit exceeded"

**Solução**: O script já tem delay de 2 segundos. Se ainda der erro, aumente o delay em `uploadProductImages.mjs`:
```javascript
await delay(3000) // Aumentar de 2000 para 3000
```

### Problema: "Nenhuma imagem encontrada"

**Solução**: Verifique se há arquivos de imagem (jpg, jpeg, png, webp, gif) na pasta do produto

## 📝 Arquivos Importantes

- **shopify-new-products.csv**: CSV para importar na Shopify
- **scripts/uploadProductImages.mjs**: Script de upload de imagens
- **src/data/products.json**: Arquivo local atualizado (426 produtos)
- **src/data/products-backup.json**: Backup do arquivo anterior (388 produtos)
- **missing-products.json**: Lista de produtos que estavam faltando

## 🎯 Próximos Passos Após Upload

1. Testar os produtos no site local
2. Verificar se as páginas de produto estão acessíveis
3. Testar o checkout com um dos novos produtos
4. Fazer deploy no Vercel

## 📞 Comandos Úteis

```bash
# Gerar CSV novamente (se necessário)
node scripts/generateShopifyCSV.mjs

# Upload de imagens
node scripts/uploadProductImages.mjs

# Verificar produtos adicionados
node scripts/verifyProducts.mjs

# Comparar produtos (local vs Shopify)
node scripts/compareProducts.mjs

# Buscar variantes da Shopify
npm run shopify:fetch-variants
```

## ✨ Resumo

1. ✅ **38 produtos** foram adicionados ao `products.json` local
2. ✅ **CSV gerado** com 228 linhas (38 produtos x 6 tamanhos)
3. ⏳ **Aguardando**: Importar CSV na Shopify
4. ⏳ **Aguardando**: Upload de imagens via script

**Total de produtos no site após este processo**: 426 produtos
