# 🛍️ Urahara Store

**Tienda online moderna de manga desarrollada con React + Vite**

Una aplicación de e-commerce completa especializada en manga, con funcionalidades de gestión de productos, carrito de compras y sistema CRUD administrativo.

## 🌟 Características Principales

### 🛒 **E-commerce Completo**

- **Catálogo de productos** con paginación inteligente
- **Carrito de compras** persistente con localStorage
- **Sistema de búsqueda y filtros** avanzados
- **Proceso de compra** completo con confirmaciones

### 🎯 **Panel Administrativo**

- **CRUD completo** de productos (Crear, Leer, Actualizar, Eliminar)
- **Gestión de inventario** con búsquedas y filtros
- **Modal de confirmación** para operaciones críticas
- **Formularios dinámicos** para agregar/editar productos

### 🎨 **Diseño Responsivo**

- **Adaptativo** para desktop, tablet y móvil
- **Esquema de colores** coherente (naranja #FF9E02, negro, blanco)
- **Animaciones suaves** y efectos hover
- **UX intuitiva** con feedback visual

### 📊 **Fuentes de Datos**

- **API externa**: Integración con Jikan API (MyAnimeList)
- **Datos locales**: Archivo JSON con productos personalizados
- **Persistencia**: localStorage para carrito y productos agregados

## 🚀 Tecnologías Utilizadas

### Frontend

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación SPA
- **Context API** - Manejo de estado global

### Estilos

- **CSS3** con variables y responsive design
- **Bootstrap 5** (selectivo)
- **Font Awesome** - Iconografía
- **Animations CSS** personalizadas

### APIs y Datos

- **Jikan API** (MyAnimeList) - Datos de manga
- **localStorage** - Persistencia del carrito
- **JSON local** - Productos personalizados

### Herramientas

- **ESLint** - Linting de código
- **SweetAlert** - Notificaciones elegantes

## 📁 Estructura del Proyecto

```
urahara-store/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Card.jsx         # Tarjeta de producto
│   │   ├── Carrito.jsx      # Carrito de compras
│   │   ├── FormularioProductos.jsx
│   │   ├── ProductCrud.jsx  # Panel administrativo
│   │   └── Products.jsx     # Catálogo principal
│   ├── contexts/            # Context API
│   │   ├── CarritoContext.jsx
│   │   └── ProductosContext.jsx
│   ├── pages/               # Páginas principales
│   │   ├── Home.jsx
│   │   ├── ProductsPage.jsx
│   │   └── Admin.jsx
│   ├── styles/              # Archivos CSS
│   │   ├── carrito.css
│   │   ├── productCrud.css
│   │   └── products.css
│   ├── data/                # Datos locales
│   │   └── products.json
│   ├── assets/              # Recursos
│   │   └── SweetAlert.js
│   └── App.jsx              # Componente raíz
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/Jhossymarbalderrama/urahara-store.git
cd urahara-store
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar el servidor de desarrollo**

```bash
npm run dev
```

4. **Acceder a la aplicación**

```
http://localhost:5173
```

## 🎮 Funcionalidades Detalladas

### 🛍️ **Tienda (Products)**

- **Catálogo paginado** con 24 productos por página
- **Búsqueda en tiempo real** por nombre y descripción
- **Filtros por categoría** dinámicos
- **Añadir al carrito** con selección de cantidad
- **Vista responsiva** (5 columnas → 3 → 2 → 1)

### 🛒 **Carrito de Compras**

- **Persistencia automática** en localStorage
- **Vista dual**: tabla (desktop) y cards (móvil)
- **Gestión de productos**: agregar, eliminar, vaciar
- **Proceso de compra** con confirmación
- **Cálculo automático** de totales

### 🔧 **Panel Administrativo**

- **Vista tabla** con información completa
- **Búsqueda y filtros** especializados
- **Modal de formulario** para agregar/editar
- **Confirmación de eliminación** con preview del producto
- **Validaciones de formulario** en tiempo real

### 📱 **Responsive Design**

- **Breakpoints**: 1024px, 768px, 480px, 360px
- **Navegación adaptativa** según dispositivo
- **Imágenes optimizadas** para cada resolución
- **Touch-friendly** en dispositivos móviles

## 🎨 Guía de Estilos

### Paleta de Colores

- **Primario**: #FF9E02 (Naranja)
- **Hover**: #ffba4b (Naranja claro)
- **Oscuro**: #222222 (Negro)
- **Texto**: #333333 (Gris oscuro)
- **Fondo**: #f8f9fa (Gris claro)

### Tipografía

- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Tamaños**: 12px-24px según contexto
- **Pesos**: 400 (normal), 600 (semi-bold), 700 (bold)

## 📚 Contextos y Estado

### ProductosContext

```javascript
// Funcionalidades principales
- productos[]              // Lista completa
- productosPaginados[]      // Productos de la página actual
- busqueda{}               // Filtros de búsqueda
- paginación{}             // Control de páginas
- agregarProducto()        // CRUD - Crear
- modificarProducto()      // CRUD - Actualizar
- eliminarProducto()       // CRUD - Eliminar
```

### CarritoContext

```javascript
// Gestión del carrito
- productsCarrito[]        // Productos en carrito
- agregarAlCarrito()       // Añadir productos
- quitarCarrito()          // Eliminar producto
- vaciarCarrito()          // Limpiar carrito
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo

# Construcción
npm run build        # Build para producción
npm run preview      # Preview del build

# Calidad de código
npm run lint         # Ejecutar ESLint
```

## 🌐 APIs Integradas

### Jikan API (MyAnimeList)

- **Endpoint**: `https://api.jikan.moe/v4/manga`
- **Paginación**: 24 items por página
- **Datos**: título, descripción, imagen, categoría
- **Rate limit**: Respetado con timeouts

### Estructura de Datos

```javascript
{
  id: number,
  name: string,
  category: string,
  price: string,
  description: string,
  image: string
}
```

## 🎯 Casos de Uso

### Usuario Final

1. **Explorar catálogo** → Filtrar por categoría → Buscar producto
2. **Añadir al carrito** → Ajustar cantidad → Continuar comprando
3. **Revisar carrito** → Proceder al pago → Confirmar compra

### Administrador

1. **Acceder al panel** → Ver inventario → Buscar producto
2. **Agregar producto** → Llenar formulario → Validar → Guardar
3. **Editar producto** → Modal de edición → Confirmar cambios
4. **Eliminar producto** → Confirmación → Eliminar definitivamente

## 🚧 Futuras Mejoras

### Funcionalidades Planificadas

- [ ] **Autenticación de usuarios**
- [ ] **Sistema de favoritos**
- [ ] **Reseñas y calificaciones**
- [ ] **Historial de compras**
- [ ] **Descuentos y cupones**

### Mejoras Técnicas

- [ ] **TypeScript** para mejor type safety
- [ ] **Tests unitarios** con Jest/Vitest
- [ ] **PWA** para funcionalidad offline
- [ ] **SEO optimization**
- [ ] **Lazy loading** de imágenes

## 🤝 Contribución

### ¿Cómo contribuir?

1. Fork el repositorio
2. Crear una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

### Convenciones de Código

- **ESLint** configurado para React
- **Nombres descriptivos** para variables y funciones
- **Comentarios** en funciones complejas
- **CSS modular** por componente

## 📝 Changelog

### v1.0.0 (Actual)

- ✅ Catálogo de productos con paginación
- ✅ Sistema de búsqueda y filtros
- ✅ Carrito persistente con localStorage
- ✅ Panel administrativo CRUD completo
- ✅ Diseño responsivo multi-dispositivo
- ✅ Integración con Jikan API
- ✅ Modales de confirmación
- ✅ Animaciones y efectos visuales

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Jhossy Marbalderrama**

- GitHub: [@Jhossymarbalderrama](https://github.com/Jhossymarbalderrama)
- Repositorio: [urahara-store](https://github.com/Jhossymarbalderrama/urahara-store)

---

⭐ **¡Si te gusta el proyecto, no olvides darle una estrella!** ⭐
