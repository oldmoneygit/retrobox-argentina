# Retrobox Argentina - Guia de Instalação e Execução

## 🚀 Instalação Rápida

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

### Passos para executar localmente

1. **Navegue até a pasta do projeto:**
```bash
cd retrobox-argentina
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse o projeto:**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter

## 🔧 Configuração

### Variáveis de Ambiente (Opcional)

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📁 Estrutura do Projeto

```
retrobox-argentina/
├── src/
│   ├── app/              # Páginas (App Router)
│   ├── components/       # Componentes React
│   ├── context/          # Contextos (Cart, Wishlist)
│   ├── hooks/            # Custom hooks
│   └── utils/            # Utilitários
├── public/               # Arquivos estáticos
└── package.json
```

## 🎨 Funcionalidades Implementadas

- ✅ Homepage completa com todas as seções
- ✅ Página de produto individual
- ✅ Página de coleção
- ✅ Carrinho de compras
- ✅ Sistema de busca
- ✅ Página de FAQ
- ✅ Página de contato
- ✅ Wishlist (favoritos)
- ✅ Header e Footer responsivos
- ✅ Design monocromático
- ✅ Animações com Framer Motion
- ✅ Otimizações de performance

## 🐛 Solução de Problemas

### Erro ao instalar dependências
```bash
# Limpe o cache do npm
npm cache clean --force
# Tente novamente
npm install
```

### Porta 3000 já está em uso
```bash
# Use uma porta diferente
npm run dev -- -p 3001
```

### Erro de módulo não encontrado
```bash
# Delete node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
```

## 📝 Notas Importantes

- O projeto usa **JavaScript (JSX)** - NÃO TypeScript
- Todas as imagens devem estar em `/public/images/`
- O logo deve estar em `/public/images/logo/LOGO_BRANCO.webp`
- Produtos são mockados por enquanto (será integrado com Shopify)

## 🎯 Próximos Passos

1. Adicionar imagens reais em `/public/images/`
2. Integrar com Shopify Storefront API
3. Configurar variáveis de ambiente de produção
4. Deploy no Vercel

## 📞 Suporte

Em caso de problemas, verifique:
- Versão do Node.js (deve ser 18+)
- Se todas as dependências foram instaladas
- Console do navegador para erros
- Terminal para erros de build

