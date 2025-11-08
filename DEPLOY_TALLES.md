# 🚀 Guía de Deploy - Sistema de Talles Argentinos

## ✅ Checklist Pre-Deploy

### 1. Verificación de Archivos
```bash
# Verificar que todos los archivos fueron creados
✓ src/utils/constants.js (modificado)
✓ src/components/product/SizeGuide.jsx (nuevo)
✓ src/app/product/[slug]/page.jsx (modificado)
✓ TALLES_ARGENTINOS.md (nuevo)
✓ IMPLEMENTACION_TALLES.md (nuevo)
✓ EJEMPLO_PRODUCTO_CON_TALLES.md (nuevo)
✓ RESUMEN_SISTEMA_TALLES.md (nuevo)
```

### 2. Testing Local
```bash
# Levantar servidor de desarrollo
cd retrobox-argentina
npm run dev

# Abrir en navegador
http://localhost:3000

# Probar:
✓ Navegar a cualquier producto
✓ Ver selector de talles
✓ Seleccionar un talle
✓ Abrir modal "Ver Guía de Talles"
✓ Navegar entre pestañas del modal
✓ Cerrar modal (botón X y click fuera)
✓ Agregar producto al carrito con talle
```

### 3. Testing Responsive
```bash
# Probar en diferentes dispositivos
✓ Desktop (>1024px)
✓ Tablet (768-1024px)
✓ Mobile (375-768px)
✓ Mobile pequeño (<375px)
```

### 4. Testing de Navegadores
```bash
✓ Chrome/Edge (Chromium)
✓ Firefox
✓ Safari (Mac/iOS)
✓ Mobile browsers
```

---

## 📦 Proceso de Deploy

### Opción 1: Vercel (Recomendado)

#### Paso 1: Build Local
```bash
cd retrobox-argentina
npm run build
```

**Verificar que no hay errores:**
```
✓ Compiled successfully
✓ No TypeScript errors
✓ No ESLint warnings
```

#### Paso 2: Commit y Push
```bash
git add .
git commit -m "feat: Implementar sistema de talles argentinos

- Agregar DEFAULT_SIZES y SIZE_GUIDE_ARGENTINA_MALE a constants
- Crear componente SizeGuide con modal interactivo
- Integrar guía de talles en página de producto
- Agregar documentación completa en español
- Adaptar terminología argentina (talle vs talla)"

git push origin main
```

#### Paso 3: Deploy en Vercel
```bash
# Automático si está conectado a GitHub
# O manual:
vercel --prod
```

#### Paso 4: Verificación Post-Deploy
```
✓ Visitar: https://retrobox-argentina.vercel.app
✓ Navegar a producto
✓ Probar selector de talles
✓ Abrir modal de guía
✓ Verificar responsive en mobile
```

---

### Opción 2: Deploy Manual

#### Build de Producción
```bash
npm run build
npm run start
```

#### Verificar Build
```
✓ .next/ generado
✓ Sin errores en build
✓ Static pages generadas
✓ Optimizaciones aplicadas
```

---

## 🧪 Testing Post-Deploy

### Checklist Funcional

```bash
# 1. Página de Producto
✓ [ ] Los talles se muestran correctamente (40, 42, 44, etc.)
✓ [ ] Selección de talle funciona
✓ [ ] Botón "Ver Guía de Talles" visible
✓ [ ] Modal se abre correctamente

# 2. Modal de Guía de Talles
✓ [ ] Pestaña "Tabla de Medidas" muestra datos
✓ [ ] Pestaña "Cómo Medir" tiene instrucciones
✓ [ ] Pestaña "Equivalencias" muestra conversiones
✓ [ ] Botón X cierra el modal
✓ [ ] Click fuera cierra el modal
✓ [ ] Animaciones funcionan suavemente

# 3. Funcionalidad de Compra
✓ [ ] No permite agregar sin talle
✓ [ ] Agregar con talle funciona
✓ [ ] Talle aparece en carrito
✓ [ ] Checkout incluye información de talle

# 4. Responsive
✓ [ ] Desktop: todo visible y funcional
✓ [ ] Tablet: layout adaptado
✓ [ ] Mobile: selector scrolleable
✓ [ ] Mobile: modal ocupa pantalla correctamente

# 5. Performance
✓ [ ] Modal carga rápido
✓ [ ] Sin lag en animaciones
✓ [ ] Imágenes optimizadas
✓ [ ] Bundle size razonable
```

---

## 📊 Monitoreo Post-Deploy

### Analytics para Trackear

```javascript
// Eventos sugeridos para Google Analytics

// 1. Apertura de guía de talles
gtag('event', 'size_guide_opened', {
  product_id: productId,
  product_name: productName
});

// 2. Selección de talle
gtag('event', 'size_selected', {
  size: selectedSize,
  product_id: productId
});

// 3. Agregar al carrito con talle
gtag('event', 'add_to_cart_with_size', {
  size: selectedSize,
  product_id: productId,
  value: productPrice
});

// 4. Navegación entre pestañas de guía
gtag('event', 'size_guide_tab_change', {
  tab_name: tabName // 'tabla', 'como-medir', 'equivalencias'
});
```

### Métricas Clave

```
1. Tasa de Uso de Guía
   = (Clics en "Ver Guía" / Visitas a producto) × 100%
   Objetivo: >30%

2. Tasa de Selección de Talle
   = (Productos con talle / Total en carrito) × 100%
   Objetivo: 100%

3. Tasa de Cambio de Talle
   = (Cambios solicitados / Compras) × 100%
   Objetivo: <10%

4. Tasa de Abandono Post-Talle
   = (Abandonos después selección / Selecciones) × 100%
   Objetivo: <15%
```

---

## 🐛 Troubleshooting

### Error: "Module not found: Can't resolve '@/components/product/SizeGuide'"

**Solución:**
```bash
# Verificar que el archivo existe
ls src/components/product/SizeGuide.jsx

# Verificar jsconfig.json
cat jsconfig.json
# Debe tener: "@/*": ["./src/*"]

# Limpiar cache y rebuild
rm -rf .next
npm run build
```

---

### Error: "DEFAULT_SIZES is not exported"

**Solución:**
```bash
# Verificar exportación en constants.js
grep "export const DEFAULT_SIZES" src/utils/constants.js

# Debe tener:
# export const DEFAULT_SIZES = [...]
```

---

### Modal no se abre

**Solución:**
```javascript
// Verificar estado en ProductPageClient
const [showSizeGuide, setShowSizeGuide] = useState(false)

// Verificar botón
<button onClick={() => setShowSizeGuide(true)}>
  Ver Guía de Talles
</button>

// Verificar componente
<SizeGuide
  isOpen={showSizeGuide}
  onClose={() => setShowSizeGuide(false)}
/>
```

---

### Animaciones lentas en mobile

**Solución:**
```javascript
// Reducir complejidad de animaciones
// En SizeGuide.jsx
transition={{ duration: 0.2 }} // En lugar de 0.3
```

---

## 🔄 Rollback Plan

### Si algo sale mal:

#### Paso 1: Identificar el problema
```bash
# Ver logs en Vercel
vercel logs

# O localmente
npm run build
# Buscar errores
```

#### Paso 2: Rollback rápido
```bash
# Opción A: Revertir commit
git revert HEAD
git push origin main

# Opción B: Deploy de commit anterior
vercel --prod --force
# Seleccionar deployment anterior
```

#### Paso 3: Fix y Re-deploy
```bash
# Arreglar el issue
# Probar localmente
npm run dev

# Build y verificar
npm run build

# Deploy nuevamente
git add .
git commit -m "fix: ..."
git push origin main
```

---

## 📝 Notas Post-Deploy

### Actualizar README.md del Proyecto
```markdown
## Nueva Funcionalidad: Sistema de Talles Argentinos

- ✅ Talles argentinos (40-52) implementados
- ✅ Guía interactiva de talles
- ✅ Conversiones internacionales
- ✅ Documentación completa

Ver: SISTEMA_TALLES_ARGENTINOS_COMPLETO.md
```

### Comunicar al Equipo
```
✓ Enviar email al equipo con:
  - Link al deploy
  - Resumen de cambios
  - Links a documentación
  - Casos de prueba

✓ Actualizar Slack/Discord:
  - Anunciar nueva feature
  - Compartir guía rápida
  - Solicitar feedback
```

### Actualizar Soporte
```
✓ Capacitar equipo de atención al cliente
✓ Compartir TALLES_ARGENTINOS.md
✓ Preparar FAQs sobre talles
✓ Definir proceso de cambio de talle
```

---

## ✅ Checklist Final

```
PRE-DEPLOY
✓ [ ] Código revisado
✓ [ ] Tests locales pasados
✓ [ ] Build sin errores
✓ [ ] Documentación completa
✓ [ ] Commits organizados

DEPLOY
✓ [ ] Deploy exitoso
✓ [ ] URL accesible
✓ [ ] Sin errores en consola
✓ [ ] Responsive verificado
✓ [ ] Performance OK

POST-DEPLOY
✓ [ ] Tests funcionales pasados
✓ [ ] Analytics configurados
✓ [ ] Equipo notificado
✓ [ ] Documentación compartida
✓ [ ] Soporte capacitado
✓ [ ] Métricas monitoreadas

SEGUIMIENTO
✓ [ ] Feedback recolectado
✓ [ ] Issues documentados
✓ [ ] Mejoras planificadas
✓ [ ] Próximos pasos definidos
```

---

## 🎉 ¡Deploy Exitoso!

Si llegaste hasta acá y todo funciona:

```
  ✅ SISTEMA DE TALLES ARGENTINOS
     DESPLEGADO EXITOSAMENTE

  🇦🇷 Retrobox Argentina
  🎽 Jerseys con talles locales
  📏 Guía interactiva implementada
  📚 Documentación completa

  ¡Dale Xeneize! 💙💛
```

---

**Última actualización:** Noviembre 2024
**Versión:** 1.0
**Estado:** Production Ready
**Deploy by:** Retrobox Dev Team
