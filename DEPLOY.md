# 🚀 Guia de Deploy na Vercel - Retrobox Argentina

Este guia explica como fazer o deploy do projeto Retrobox Argentina na Vercel.

## ✅ Pré-requisitos

- ✅ Conta no GitHub com o repositório `oldmoneygit/retrobox-argentina`
- ✅ Conta na Vercel (pode criar com GitHub)
- ✅ Tokens do Shopify configurados
- ✅ Meta Pixel ID (se aplicável)

## 📋 Checklist Antes do Deploy

- [x] Build de produção testado localmente (`npm run build`)
- [x] Todas as alterações commitadas e enviadas para o GitHub
- [x] Arquivo `vercel.json` criado
- [x] README.md atualizado com instruções

## 🎯 Passo a Passo

### 1. Conectar Repositório na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em **"Add New..."** > **"Project"**
4. Selecione o repositório: `oldmoneygit/retrobox-argentina`
5. Clique em **"Import"**

### 2. Configurar o Projeto

A Vercel detectará automaticamente o Next.js. Verifique as configurações:

- **Framework Preset**: `Next.js` ✅
- **Root Directory**: `./` ✅
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅
- **Install Command**: `npm install` ✅

**Não precisa alterar nada!** As configurações padrão estão corretas.

### 3. Adicionar Variáveis de Ambiente

⚠️ **CRÍTICO**: Sem essas variáveis, o site não funcionará corretamente!

Na seção **"Environment Variables"**, adicione cada variável abaixo:

#### Variável 1: NEXT_PUBLIC_SITE_URL
```
Name: NEXT_PUBLIC_SITE_URL
Value: https://retrobox-argentina.vercel.app
Environment: ✅ Production ✅ Preview ✅ Development
```

#### Variável 2: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
```
Name: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
Value: sua-loja.myshopify.com
Environment: ✅ Production ✅ Preview ✅ Development
```

**Importante**: Use apenas o domínio (ex: `retrobox-argentina.myshopify.com`), **SEM** `https://`

#### Variável 3: NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
```
Name: NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
Value: seu-storefront-access-token
Environment: ✅ Production ✅ Preview ✅ Development
```

**Como obter**:
1. Shopify Admin → Apps → Develop apps
2. Seu app → Storefront API
3. Copiar "Storefront API access token"

#### Variável 4: NEXT_PUBLIC_META_PIXEL_ID (Opcional)
```
Name: NEXT_PUBLIC_META_PIXEL_ID
Value: seu-meta-pixel-id
Environment: ✅ Production ✅ Preview ✅ Development
```

#### Variável 5: META_CONVERSIONS_API_TOKEN (Opcional)
```
Name: META_CONVERSIONS_API_TOKEN
Value: seu-meta-conversions-api-token
Environment: ✅ Production ✅ Preview ✅ Development
```

### 4. Fazer o Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar (2-5 minutos)
3. ✅ O site estará disponível em: `https://retrobox-argentina.vercel.app`

### 5. Verificar o Deploy

Após o deploy, verifique:

- [ ] Site carrega corretamente
- [ ] Produtos aparecem na homepage
- [ ] Páginas de produto funcionam
- [ ] Carrinho funciona
- [ ] Dark/Light theme toggle funciona
- [ ] Imagens carregam corretamente

### 6. Configurar Domínio Personalizado (Opcional)

1. Vá em **Settings** > **Domains**
2. Clique em **"Add"**
3. Digite seu domínio (ex: `www.retroboxargentina.com`)
4. Configure os registros DNS conforme instruções da Vercel
5. Aguarde a propagação DNS (pode levar até 48h)

## 🔧 Troubleshooting

### Build Falha

**Erro**: `Module not found`
- **Solução**: Verifique se todas as dependências estão no `package.json`

**Erro**: `Environment variable not found`
- **Solução**: Adicione todas as variáveis de ambiente na Vercel

### Site Não Carrega Produtos

**Problema**: Produtos não aparecem
- **Solução**: Verifique se `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` e `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` estão corretos

### Imagens Não Carregam

**Problema**: Imagens quebradas
- **Solução**: Verifique se as URLs das imagens no `products.json` estão corretas

## 📊 Monitoramento

Após o deploy, monitore:

- **Vercel Dashboard** → **Analytics**: Visualizações e performance
- **Vercel Dashboard** → **Logs**: Erros e warnings
- **Vercel Dashboard** → **Deployments**: Histórico de deploys

## 🔄 Deploys Automáticos

A Vercel faz deploy automático quando você:

- Faz push para a branch `master` → Deploy em **Production**
- Faz push para outras branches → Deploy em **Preview**
- Abre um Pull Request → Deploy em **Preview**

## 📝 Notas Importantes

- ⚠️ **Nunca commite** arquivos `.env.local` ou tokens no código
- ✅ Use sempre variáveis de ambiente na Vercel
- ✅ Teste o build localmente antes de fazer push: `npm run build`
- ✅ O projeto está configurado para região `gru1` (São Paulo) no `vercel.json`

## 🎉 Pronto!

Seu site está no ar! 🚀

Acesse: `https://retrobox-argentina.vercel.app`

