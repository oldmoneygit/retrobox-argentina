# Correções - Títulos com <span> Quebrando Tamanho

## Problema
Os `<span>` dentro de títulos estão herdando estilos incorretos e ficando menores que o texto principal.

## Solução
Remover `<span>` e aplicar cores diretamente no elemento `<h2>`, mantendo todo o texto no mesmo tamanho.

---

## Arquivo 1: HowItWorksPackLoco.jsx

**Localização**: `src/components/blackfriday/HowItWorksPackLoco.jsx`

**Linha ~66-68**

### ANTES (Errado):
```jsx
<h2 className="text-3xl md:text-5xl font-black text-white mb-3 md:mb-4 px-4">
  ¿Cómo Funciona el <span className="text-orange-500">PACK LOCO?</span>
</h2>
```

### DEPOIS (Correto):
```jsx
<h2 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 px-4">
  <span className="text-white">¿Cómo Funciona el </span>
  <span className="text-orange-500">PACK LOCO?</span>
</h2>
```

**O que mudou:**
- Removido `text-white` do `<h2>`
- Ambas partes agora têm `<span>` com tamanhos iguais (herdam do h2)
- Cores aplicadas via classes nos spans

---

## Arquivo 2: BlackFridayPopup.jsx

**Localização**: `src/components/blackfriday/BlackFridayPopup.jsx`

**Linha ~83-87**

### ANTES (Errado):
```jsx
<h2 className="text-2xl md:text-3xl font-black text-center uppercase mb-2">
  <span className="text-yellow-400">🔥 PACK LOCO</span>
  <br />
  <span className="text-white">BLACK FRIDAY</span>
</h2>
```

### DEPOIS (Correto - Opção 1: Tudo amarelo):
```jsx
<h2 className="text-2xl md:text-3xl font-black text-center uppercase mb-2 text-yellow-400">
  🔥 PACK LOCO
  <br />
  BLACK FRIDAY
</h2>
```

**OU Opção 2: Manter duas cores:**
```jsx
<h2 className="text-2xl md:text-3xl font-black text-center uppercase mb-2">
  <span className="text-yellow-400">🔥 PACK LOCO</span>
  <br />
  <span className="text-white">BLACK FRIDAY</span>
</h2>
```
Mas adicione esta classe CSS inline no h2:
```jsx
<h2 className="text-2xl md:text-3xl font-black text-center uppercase mb-2" style={{ fontSize: 'inherit' }}>
```

---

## Recomendação
Use a **Opção 1** para cada arquivo - é mais simples e garante consistência de tamanho.

---

## Outros Arquivos para Verificar

Busque por padrões similares em:
- `src/components/blackfriday/*.jsx`
- Qualquer título que use `<span className="text-*">` dentro de `<h1>`, `<h2>`, etc.

**Padrão de busca:**
```bash
# No terminal, execute:
grep -r "<span className=\"text-" src/components/blackfriday/
```

---

## Regra Geral

**Nunca use:**
```jsx
<h2 className="...">
  Texto <span className="text-cor">destacado</span>
</h2>
```

**Use isso:**
```jsx
<h2 className="...">
  <span className="text-cor1">Texto</span>
  <span className="text-cor2">destacado</span>
</h2>
```

Ou simplesmente aplique a cor no próprio `<h2>` se for uma cor só.
