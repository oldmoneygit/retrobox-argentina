# Retrobox Argentina

E-commerce de camisetas retrô de times argentinos e internacionais, desenvolvido com Next.js 14 e JavaScript (JSX).

## 🚀 Início Rápido

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

Acesse: http://localhost:3000

## 📦 Tecnologias

- **Next.js 14** (App Router)
- **React 18.3.1**
- **JavaScript (JSX)** - Sem TypeScript
- **Tailwind CSS 3.4.1**
- **Framer Motion 12.23.24** - Animações
- **Embla Carousel 8.6.0** - Carrosséis
- **Lucide React 0.378.0** - Ícones

## 🎨 Identidade Visual

Design monocromático focado em preto, branco e gradientes entre essas cores.

## 📁 Estrutura

```
retrobox-argentina/
├── src/
│   ├── app/              # App Router do Next.js
│   │   ├── layout.js     # Layout principal
│   │   ├── page.jsx      # Homepage
│   │   ├── product/[slug]/ # Página de produto
│   │   ├── collection/[slug]/ # Página de coleção
│   │   ├── carrito/      # Carrinho
│   │   ├── buscar/       # Busca
│   │   ├── contacto/     # Contato
│   │   └── faq/          # FAQ
│   ├── components/       # Componentes React
│   ├── context/          # Contextos (Cart, Wishlist)
│   ├── hooks/            # Custom hooks
│   └── utils/           # Utilitários
├── public/               # Arquivos estáticos
└── package.json
```

## 📝 Notas

- As imagens são opcionais para desenvolvimento
- Produtos são mockados por enquanto
- Pronto para integração Shopify

## 🔧 Configuração

Crie `.env.local` na raiz do projeto:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Shopify Configuration
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token

# Meta Pixel Configuration
NEXT_PUBLIC_META_PIXEL_ID=your-meta-pixel-id
META_CONVERSIONS_API_TOKEN=your-meta-conversions-api-token
```

## 🚀 Deploy na Vercel

### Passo 1: Preparar o Repositório
1. Certifique-se de que todas as alterações estão commitadas e enviadas para o GitHub
2. O projeto já está configurado com `vercel.json`

### Passo 2: Conectar na Vercel
1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **"Add New..."** > **"Project"**
3. Selecione o repositório: `oldmoneygit/retrobox-argentina`
4. Clique em **"Import"**

### Passo 3: Configurar o Projeto
- **Framework Preset**: Next.js (detectado automaticamente)
- **Root Directory**: `./` (padrão)
- **Build Command**: `npm run build` (padrão)
- **Output Directory**: `.next` (padrão)
- **Install Command**: `npm install` (padrão)

### Passo 4: Adicionar Variáveis de Ambiente
Na seção **"Environment Variables"**, adicione:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `NEXT_PUBLIC_SITE_URL` | `https://retrobox-argentina.vercel.app` | Production, Preview, Development |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | `sua-loja.myshopify.com` | Production, Preview, Development |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` | `seu-storefront-token` | Production, Preview, Development |
| `NEXT_PUBLIC_META_PIXEL_ID` | `seu-pixel-id` | Production, Preview, Development |
| `META_CONVERSIONS_API_TOKEN` | `seu-conversions-token` | Production, Preview, Development |

⚠️ **Importante**: 
- Use os mesmos valores do seu arquivo `.env.local`
- Marque todas as opções: ✅ Production ✅ Preview ✅ Development

### Passo 5: Deploy
1. Clique em **"Deploy"**
2. Aguarde o build completar (2-5 minutos)
3. O site estará disponível em: `https://retrobox-argentina.vercel.app`

### Passo 6: Configurar Domínio Personalizado (Opcional)
1. Vá em **Settings** > **Domains**
2. Adicione seu domínio personalizado
3. Configure os registros DNS conforme instruções da Vercel

## 📄 Documentação

- `INSTALLATION.md` - Guia completo de instalação
- `IMPLEMENTATION_STATUS.md` - Status da implementação
- `QUICKSTART.md` - Guia rápido
