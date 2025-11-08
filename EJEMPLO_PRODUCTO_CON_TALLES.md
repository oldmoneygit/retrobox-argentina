# Ejemplo Práctico: Producto con Talles Argentinos

## 🎽 Caso Real: Jersey Boca Juniors Retro 1981

### Estructura de Datos del Producto

```json
{
  "id": "jersey-boca-1981",
  "slug": "jersey-boca-juniors-1981-retro",
  "name": "Jersey Boca Juniors 1981 Retro",
  "description": "Jersey oficial retro del Boca Juniors temporada 1981. Réplica de alta calidad con el diseño clásico azul y oro. Material premium, ideal para coleccionistas y fanáticos.",

  "price": 45000,
  "regularPrice": 65000,
  "currency": "ARS",

  "images": {
    "main": "/images/products/boca-1981-main.webp",
    "gallery": [
      "/images/products/boca-1981-front.webp",
      "/images/products/boca-1981-back.webp",
      "/images/products/boca-1981-detail.webp",
      "/images/products/boca-1981-fit.webp"
    ]
  },

  "sizes": ["40", "42", "44", "46", "48", "50"],
  "fit": "regular",
  "material": "100% Poliéster",

  "stock": {
    "40": 5,
    "42": 12,
    "44": 18,
    "46": 15,
    "48": 8,
    "50": 3
  },

  "tags": ["boca-juniors", "argentina", "retro", "1981", "jersey", "futbol"],
  "collection": "boca-juniors",
  "category": "jerseys-masculinas",
  "featured": true,
  "bestSeller": true
}
```

---

## 📋 Descripción del Producto (Para Web)

### Texto Principal

```markdown
# Jersey Boca Juniors 1981 Retro

Revivé la gloria de uno de los años más emblemáticos del Xeneize con esta réplica oficial
de la jersey que usó el equipo en la temporada 1981.

## Características

✨ **Diseño Auténtico**: Réplica fiel del diseño original 1981
🏆 **Calidad Premium**: Material de primera calidad resistente al lavado
🇦🇷 **Producción Nacional**: Confeccionada localmente
⚡ **Fit Clásico**: Ajuste regular cómodo para uso diario

## Especificaciones Técnicas

- Material: 100% Poliéster de alta densidad
- Tipo de cuello: V clásico
- Manga: Corta con ribetes originales
- Colores: Azul / Oro (Pantone exacto original)
- Escudo: Bordado de alta calidad
- Peso: 180g aproximadamente

## Talles Disponibles

Esta jersey está disponible en los siguientes talles argentinos:
**40** (S) | **42** (M) | **44** (L) | **46** (XL) | **48** (XXL) | **50** (3XL)

👉 **[Ver Guía de Talles Completa]**

### ¿No sabés qué talle elegir?

Seguí estos pasos:
1. Medí el contorno de tu pecho con una cinta métrica
2. Compará con nuestra tabla de medidas
3. Si estás entre dos talles, elegí el más grande

**Ejemplo:** Si tu pecho mide 100cm → Talle 42 o 44 (recomendamos 44 para mayor comodidad)

## Cuidados de la Prenda

- 🧼 Lavar con agua fría o tibia (max 30°C)
- ❌ No usar secadora
- ❌ No planchar directamente sobre el escudo
- ✅ Secar al aire libre a la sombra
- ✅ Lavar con colores similares
```

---

## 🛒 Flujo de Compra con Selección de Talle

### Paso 1: Ver Producto
```
Usuario ve la jersey → Le gusta → Hace clic en "Agregar al Carrito"
```

### Paso 2: Alerta de Talle
```javascript
// Si no seleccionó talle
alert('Por favor selecciona un talle')
```

### Paso 3: Ver Guía de Talles
```
Usuario hace clic en "Ver Guía de Talles"
→ Se abre modal con tabla completa
→ Usuario mide su pecho: 102cm
→ Según tabla: Talle 44
```

### Paso 4: Seleccionar Talle
```
Usuario selecciona talle 44
→ Botón se pone blanco/negro (seleccionado)
→ Aparece "Talle 44" arriba
```

### Paso 5: Agregar al Carrito
```
Usuario hace clic en "Agregar al Carrito"
→ Se agrega: Jersey Boca 1981 - Talle 44 - Cantidad 1
→ Animación de confirmación
→ Contador del carrito aumenta
```

---

## 💳 Checkout con Información de Talle

### En el Carrito

```
┌─────────────────────────────────────────────────┐
│ 🛒 TU CARRITO (1 producto)                      │
├─────────────────────────────────────────────────┤
│                                                  │
│ [IMG] Jersey Boca Juniors 1981 Retro            │
│       Talle: 44 (L) - Fit Regular                │
│       Material: 100% Poliéster                   │
│       Color: Azul/Oro                            │
│       Cantidad: 1                                │
│                                    $45.000 ARS   │
│                                                  │
│       [Cambiar Talle] [Eliminar]                 │
│                                                  │
├─────────────────────────────────────────────────┤
│ Subtotal:                          $45.000 ARS   │
│ Envío:                              $5.000 ARS   │
│ ─────────────────────────────────────────────   │
│ TOTAL:                             $50.000 ARS   │
│                                                  │
│           [PROCEDER AL PAGO] 💳                  │
└─────────────────────────────────────────────────┘
```

### Opción: Cambiar Talle en Carrito

```javascript
// Componente CartItem con opción de cambiar talle
<div className="flex items-center gap-2">
  <span className="text-white/80 text-sm">Talle:</span>
  <select
    value={selectedSize}
    onChange={(e) => updateSize(item.id, e.target.value)}
    className="bg-white/10 text-white px-2 py-1 rounded"
  >
    {availableSizes.map(size => (
      <option key={size} value={size}>
        {size} ({getSizeEquivalent(size)})
      </option>
    ))}
  </select>
  <button
    onClick={() => setShowSizeGuide(true)}
    className="text-white/60 hover:text-white text-xs underline"
  >
    Ver guía
  </button>
</div>
```

---

## 📧 Email de Confirmación

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           RETROBOX ARGENTINA
              ¡Gracias por tu compra!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Hola Juan,

Tu pedido #12345 ha sido confirmado y está siendo
preparado para el envío.

──────────────────────────────────────────────────
DETALLE DEL PEDIDO
──────────────────────────────────────────────────

🎽 Jersey Boca Juniors 1981 Retro
   • Talle: 44 (L - 102-106cm pecho)
   • Color: Azul/Oro Clásico
   • Material: 100% Poliéster Premium
   • Fit: Regular (ajuste clásico cómodo)
   • Cantidad: 1
   • Precio: $45.000 ARS

──────────────────────────────────────────────────
INFORMACIÓN DE ENVÍO
──────────────────────────────────────────────────

📦 Método: Envío Express
📍 Dirección: Av. Corrientes 1234, CABA
⏰ Estimado: 3-5 días hábiles
🚚 Tracking: [Se enviará cuando despachemos]

──────────────────────────────────────────────────
CUIDADOS DE TU JERSEY
──────────────────────────────────────────────────

Para mantener tu jersey en perfecto estado:
• Lavar con agua fría (máx 30°C)
• No usar secadora
• Secar a la sombra
• No planchar sobre el escudo

──────────────────────────────────────────────────
¿NECESITÁS CAMBIAR EL TALLE?
──────────────────────────────────────────────────

Sin problema! Tenés 30 días para cambios y
devoluciones sin cargo.

Consulta nuestra guía de talles:
👉 www.retrobox-argentina.com/guia-talles

──────────────────────────────────────────────────

📱 WhatsApp: +54 11 1234-5678
📧 Email: soporte@retrobox-argentina.com
🌐 Web: www.retrobox-argentina.com

¡Dale Xeneize! 💙💛
El equipo de Retrobox Argentina
```

---

## 📦 Etiqueta del Paquete

```
┌───────────────────────────────────────────┐
│  RETROBOX ARGENTINA                        │
│  Av. Ejemplo 1234, CABA                   │
│  Tel: +54 11 1234-5678                    │
├───────────────────────────────────────────┤
│                                            │
│  PEDIDO #12345                             │
│  Fecha: 05/11/2024                         │
│                                            │
│  PRODUCTO:                                 │
│  Jersey Boca Juniors 1981 Retro           │
│                                            │
│  ┌─────────────────────────────────────┐  │
│  │    TALLE: 44 (L)                    │  │
│  │    FIT: REGULAR                     │  │
│  │    MATERIAL: POLIÉSTER              │  │
│  └─────────────────────────────────────┘  │
│                                            │
│  DESTINATARIO:                             │
│  Juan Pérez                                │
│  Av. Corrientes 1234, Piso 5 Dto A       │
│  C1043AAZ - CABA                           │
│  Tel: +54 11 9876-5432                    │
│                                            │
│  ⚠️  CUIDADOS:                             │
│  □ Lavar agua fría                        │
│  □ No secar en secadora                   │
│  □ Secar a la sombra                      │
│                                            │
│  [CODIGO BARRAS]                           │
│  *12345678901234*                          │
└───────────────────────────────────────────┘
```

---

## 🔄 Política de Cambios de Talle

### Condiciones

```markdown
# POLÍTICA DE CAMBIO DE TALLE

## ✅ Aceptamos Cambios Si:

- La prenda está sin usar (con etiquetas)
- No tiene signos de uso o lavado
- Se solicita dentro de los 30 días de la compra
- El talle solicitado está disponible en stock

## 📋 Proceso de Cambio:

1. **Contactanos**
   - WhatsApp: +54 11 1234-5678
   - Email: cambios@retrobox-argentina.com
   - Indicá: Nº de pedido y talle deseado

2. **Coordinamos el Retiro**
   - Enviamos mensajería a tu domicilio (sin cargo)
   - O podés acercarte a nuestro local

3. **Enviamos el Nuevo Talle**
   - Una vez recibida la jersey original
   - Despachamos el nuevo talle en 24-48hs

## 💡 Consejos para Evitar Cambios:

✓ Medí tu pecho con cinta métrica
✓ Consultá nuestra guía de talles
✓ Si tenés dudas, elegí el talle más grande
✓ Revisá las medidas de las jerseys que ya tenés
✓ Contactanos antes de comprar si no estás seguro

## ❌ NO Aceptamos Cambios Si:

- La prenda fue usada o lavada
- No tiene las etiquetas originales
- Pasaron más de 30 días desde la compra
- La jersey tiene signos de modificación
```

---

## 📊 Estadísticas de Talles (Para Admin)

### Dashboard Interno

```
VENTAS POR TALLE - Jersey Boca 1981
(Últimos 30 días)

Talle 40: ████░░░░░░ 15 ventas (8%)
Talle 42: ████████░░ 42 ventas (23%)
Talle 44: ████████████ 65 ventas (35%) ← MÁS VENDIDO
Talle 46: ██████████░ 45 ventas (24%)
Talle 48: ████░░░░░░ 15 ventas (8%)
Talle 50: ██░░░░░░░░ 5 ventas (2%)

Total: 187 ventas
Cambios de talle: 8 (4.3%)
Devoluciones: 2 (1.1%)

INSIGHTS:
- Talle 44 es el más popular (35%)
- Talles 42-46 representan el 82% de ventas
- Bajo índice de cambios (4.3%)
- La guía de talles reduce devoluciones
```

---

## 🎯 Conclusión

Este ejemplo muestra cómo integrar completamente el sistema de talles argentinos en:

1. ✅ Estructura de datos del producto
2. ✅ Presentación en la web
3. ✅ Proceso de compra
4. ✅ Carrito y checkout
5. ✅ Confirmación y seguimiento
6. ✅ Atención post-venta

**Resultado:** Experiencia de compra fluida y profesional adaptada al mercado argentino.
