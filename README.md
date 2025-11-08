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

Crie `.env.local` (opcional):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📄 Documentação

- `INSTALLATION.md` - Guia completo de instalação
- `IMPLEMENTATION_STATUS.md` - Status da implementação
- `QUICKSTART.md` - Guia rápido
