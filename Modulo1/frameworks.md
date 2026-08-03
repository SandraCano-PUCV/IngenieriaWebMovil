# Frameworks de diseño web: Bootstrap y Tailwind CSS

> Guía introductoria para comprender qué es un framework, qué problema resuelve un framework CSS y cómo utilizar Bootstrap y Tailwind CSS en proyectos web.

## Índice

1. [¿Qué es un framework?](#1-qué-es-un-framework)
2. [Framework, biblioteca y herramienta](#2-framework-biblioteca-y-herramienta)
3. [¿Qué es un framework de diseño o CSS?](#3-qué-es-un-framework-de-diseño-o-css)
4. [¿Qué problemas resuelve?](#4-qué-problemas-resuelve)
5. [Ventajas y limitaciones](#5-ventajas-y-limitaciones)
6. [Conceptos previos](#6-conceptos-previos)
7. [Bootstrap](#7-bootstrap)
8. [Instalar Bootstrap mediante CDN](#8-instalar-bootstrap-mediante-cdn)
9. [Bootstrap con npm y Vite](#9-bootstrap-con-npm-y-vite)
10. [Sistema de rejilla de Bootstrap](#10-sistema-de-rejilla-de-bootstrap)
11. [Componentes y utilidades de Bootstrap](#11-componentes-y-utilidades-de-bootstrap)
12. [Ejemplo Bootstrap](#12-ejemplo-bootstrap)
13. [Tailwind CSS](#13-tailwind-css)
14. [Instalar Tailwind CSS con Vite](#14-instalar-tailwind-css-con-vite)
15. [Probar Tailwind mediante Play CDN](#15-probar-tailwind-mediante-play-cdn)
16. [Clases utilitarias](#16-clases-utilitarias)
17. [Diseño responsivo con Tailwind](#17-diseño-responsivo-con-tailwind)
18. [Estados hover y focus](#18-estados-hover-y-focus)
19. [Ejemplo Tailwind](#19-ejemplo-tailwind)
20. [Comparación del mismo componente](#20-comparación-del-mismo-componente)
21. [Bootstrap frente a Tailwind](#21-bootstrap-frente-a-tailwind)
22. [¿Cuál conviene seleccionar?](#22-cuál-conviene-seleccionar)
23. [Uso con React](#23-uso-con-react)
24. [Accesibilidad](#24-accesibilidad)
25. [Buenas prácticas](#25-buenas-prácticas)
26. [Actividad práctica](#26-actividad-práctica)
27. [Glosario](#27-glosario)
28. [Fuentes oficiales](#28-fuentes-oficiales)

---

# 1. ¿Qué es un framework?

Un **framework** es una estructura reutilizable que proporciona reglas, convenciones, herramientas y componentes para desarrollar una aplicación.

En lugar de comenzar cada proyecto desde cero, el framework ofrece una base común.

```text
Proyecto sin framework
        ↓
Cada estructura se diseña desde cero
        ↓
Más decisiones iniciales
        ↓
Mayor cantidad de código propio
```

```text
Proyecto con framework
        ↓
Se utiliza una estructura existente
        ↓
Se aplican convenciones
        ↓
Se reutilizan componentes y soluciones
```

Un framework puede incluir:

- organización de carpetas;
- reglas de diseño;
- componentes;
- estilos;
- herramientas;
- convenciones;
- funciones reutilizables;
- documentación;
- mecanismos de personalización.

## Ejemplo conceptual

Sin framework CSS:

```html
<button class="boton-principal">
  Inscribirse
</button>
```

```css
.boton-principal {
  padding: 0.75rem 1.25rem;
  border: 0;
  border-radius: 0.5rem;
  color: white;
  background-color: #0879bd;
}
```

Con Bootstrap:

```html
<button class="btn btn-primary">
  Inscribirse
</button>
```

Con Tailwind CSS:

```html
<button
  class="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
>
  Inscribirse
</button>
```

---

# 2. Framework, biblioteca y herramienta

Estos conceptos se relacionan, pero no son exactamente iguales.

## Framework

Proporciona una estructura y una forma recomendada de construir el sistema.

```text
El proyecto se adapta a las convenciones del framework.
```

## Biblioteca

Proporciona funciones o componentes que el desarrollador decide utilizar.

```text
El programa llama a la biblioteca cuando la necesita.
```

## Herramienta

Ayuda a desarrollar, compilar, probar o desplegar.

Ejemplos:

- Vite;
- compiladores;
- linters;
- gestores de paquetes.

## En CSS

La diferencia no siempre es estricta.

Bootstrap se presenta oficialmente como un **frontend toolkit**, aunque habitualmente se clasifica como framework CSS.

Tailwind se define como un **utility-first CSS framework**.

---

# 3. ¿Qué es un framework de diseño o CSS?

Un framework CSS proporciona clases, reglas y convenciones para construir la presentación visual de una interfaz.

Puede incluir:

- sistema de rejilla;
- contenedores;
- tipografía;
- colores;
- espacios;
- botones;
- formularios;
- tablas;
- tarjetas;
- navegación;
- componentes responsivos;
- clases de utilidad;
- estados de interacción.

## Objetivo

```text
HTML
  +
Clases del framework
  ↓
Interfaz visual consistente
```

El framework no reemplaza HTML ni CSS.

Para utilizarlo correctamente se necesita comprender:

- estructura HTML;
- selectores CSS;
- modelo de caja;
- Flexbox;
- Grid;
- diseño responsivo;
- accesibilidad.

---

# 4. ¿Qué problemas resuelve?

## Consistencia

Permite mantener:

- colores coherentes;
- espacios regulares;
- tamaños tipográficos;
- componentes similares;
- comportamiento responsivo.

## Velocidad de desarrollo

Evita crear cada estilo desde cero.

## Diseño responsivo

Incluye clases y puntos de quiebre para adaptar la interfaz.

## Reutilización

Los mismos patrones pueden utilizarse en varias páginas.

## Trabajo en equipo

El equipo comparte:

- clases;
- componentes;
- convenciones;
- escalas;
- documentación.

---

# 5. Ventajas y limitaciones

## Ventajas

- reduce el tiempo inicial;
- proporciona consistencia;
- incluye soluciones probadas;
- facilita diseños responsivos;
- ofrece documentación;
- permite crear prototipos rápidamente;
- favorece el trabajo en equipo.

## Limitaciones

- exige aprender nombres y convenciones;
- puede generar interfaces parecidas a otras;
- puede incluir estilos no utilizados;
- puede dificultar personalizaciones profundas;
- puede aumentar la dependencia tecnológica;
- no garantiza accesibilidad automáticamente;
- no reemplaza decisiones de experiencia de usuario.

## Idea principal

```text
Un framework acelera el trabajo,
pero no diseña la solución por el equipo.
```

---

# 6. Conceptos previos

Antes de utilizar Bootstrap o Tailwind se recomienda comprender:

- HTML semántico;
- atributos `class` e `id`;
- modelo de caja;
- Flexbox;
- CSS Grid;
- media queries;
- unidades relativas;
- formularios;
- estados `hover` y `focus`;
- diseño mobile first.

---

# 7. Bootstrap

Bootstrap es un toolkit frontend que incluye:

- sistema de rejilla;
- componentes prediseñados;
- clases utilitarias;
- formularios;
- navegación;
- tipografía;
- plugins JavaScript opcionales;
- personalización mediante Sass y variables CSS.

## Enfoque principal

Bootstrap utiliza una combinación de:

```text
Componentes prediseñados
        +
Sistema de rejilla
        +
Clases utilitarias
```

Ejemplo:

```html
<div class="card">
  <div class="card-body">
    <h2 class="card-title">
      Taller de robótica
    </h2>

    <p class="card-text">
      Construcción y programación de robots.
    </p>

    <a class="btn btn-primary" href="#">
      Inscribirse
    </a>
  </div>
</div>
```

Clases como:

```text
card
card-body
card-title
btn
btn-primary
```

representan estructuras o componentes definidos por Bootstrap.

---

# 8. Instalar Bootstrap mediante CDN

La forma más sencilla para un ejercicio HTML consiste en utilizar un CDN.

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  >

  <title>Bootstrap</title>

  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
    crossorigin="anonymous"
  >
</head>

<body>
  <main class="container py-5">
    <h1>Laboratorio AulaBot</h1>

    <button class="btn btn-primary">
      Inscribirse
    </button>
  </main>

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
    crossorigin="anonymous"
  ></script>
</body>
</html>
```

## ¿Cuándo se necesita el JavaScript de Bootstrap?

Componentes como los siguientes pueden necesitar los plugins JavaScript:

- modal;
- menú desplegable;
- carrusel;
- acordeón;
- offcanvas;
- collapse;
- toast;
- tooltip.

Para botones, rejillas, tarjetas y estilos básicos puede bastar el CSS.

---

# 9. Bootstrap con npm y Vite

## Instalar

```bash
npm install bootstrap @popperjs/core
```

Para trabajar con Sass:

```bash
npm install --save-dev sass
```

## Archivo JavaScript principal

```javascript
import "bootstrap/scss/bootstrap";
import * as bootstrap from "bootstrap";

console.log(bootstrap);
```

Otra estructura posible:

```javascript
import "../scss/styles.scss";
import * as bootstrap from "bootstrap";
```

## Importar solamente un plugin

```javascript
import Alert from
  "bootstrap/js/dist/alert";
```

Esto permite evitar cargar componentes que no se utilizan.

---

# 10. Sistema de rejilla de Bootstrap

Bootstrap utiliza:

```text
container
  ↓
row
  ↓
col
```

Ejemplo:

```html
<div class="container">
  <div class="row g-4">

    <div class="col-12 col-md-6 col-lg-4">
      <article class="card">
        Tarjeta 1
      </article>
    </div>

    <div class="col-12 col-md-6 col-lg-4">
      <article class="card">
        Tarjeta 2
      </article>
    </div>

    <div class="col-12 col-md-6 col-lg-4">
      <article class="card">
        Tarjeta 3
      </article>
    </div>

  </div>
</div>
```

## Interpretación

| Clase | Significado |
|---|---|
| `col-12` | Ocupa las 12 columnas en pantallas pequeñas |
| `col-md-6` | Ocupa 6 columnas desde el punto `md` |
| `col-lg-4` | Ocupa 4 columnas desde el punto `lg` |
| `g-4` | Agrega separación entre columnas y filas |

Resultado:

```text
Teléfono:     1 tarjeta por fila
Tableta:      2 tarjetas por fila
Escritorio:   3 tarjetas por fila
```

---

# 11. Componentes y utilidades de Bootstrap

## Componentes

Ejemplos:

- alertas;
- botones;
- tarjetas;
- navbar;
- modal;
- acordeón;
- paginación;
- formularios;
- tablas;
- badges.

## Utilidades

Ejemplos:

```html
<div
  class="d-flex justify-content-between align-items-center gap-3"
>
  ...
</div>
```

| Clase | Función aproximada |
|---|---|
| `d-flex` | `display: flex` |
| `justify-content-between` | distribuye el espacio |
| `align-items-center` | centra en el eje transversal |
| `gap-3` | separación |
| `p-4` | relleno |
| `mt-3` | margen superior |
| `text-center` | texto centrado |
| `shadow` | sombra |
| `rounded` | esquinas redondeadas |

---

# 12. Ejemplo Bootstrap

```html
<section class="container py-5">
  <header class="mb-4">
    <p class="text-primary fw-bold text-uppercase">
      Talleres
    </p>

    <h1 class="display-5 fw-bold">
      Aprende con AulaBot
    </h1>
  </header>

  <div class="row g-4">
    <div class="col-12 col-md-6 col-lg-4">
      <article class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h2 class="card-title h4">
            Robótica educativa
          </h2>

          <p class="card-text">
            Construye y programa un robot móvil.
          </p>

          <a
            class="btn btn-primary mt-auto"
            href="#"
          >
            Inscribirse
          </a>
        </div>
      </article>
    </div>
  </div>
</section>
```

---

# 13. Tailwind CSS

Tailwind CSS es un framework CSS basado en clases utilitarias de propósito específico.

Ejemplos:

```text
flex
grid
p-4
mt-6
text-center
font-bold
bg-blue-600
rounded-xl
shadow-lg
```

En lugar de utilizar una clase de componente:

```html
<article class="tarjeta">
```

se combinan utilidades:

```html
<article
  class="rounded-xl border border-slate-200 bg-white p-6 shadow-lg"
>
```

## Enfoque principal

```text
Clases pequeñas y combinables
          ↓
Construcción directa del diseño
          ↓
Mayor control sobre el resultado
```

Tailwind no proporciona por defecto una tarjeta visual única llamada `card`. El equipo compone la tarjeta utilizando utilidades.

---

# 14. Instalar Tailwind CSS con Vite

## Crear el proyecto

```bash
npm create vite@latest mi-proyecto
cd mi-proyecto
npm install
```

## Instalar Tailwind

```bash
npm install tailwindcss @tailwindcss/vite
```

## Configurar Vite

Archivo `vite.config.js`:

```javascript
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss()
  ]
});
```

En React puede conservarse también el plugin de React:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ]
});
```

## Importar Tailwind

Archivo CSS principal:

```css
@import "tailwindcss";
```

## Ejecutar

```bash
npm run dev
```

---

# 15. Probar Tailwind mediante Play CDN

Para una demostración rápida:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <script
    src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"
  ></script>

  <title>Tailwind CSS</title>
</head>

<body>
  <h1 class="text-3xl font-bold underline">
    Laboratorio AulaBot
  </h1>
</body>
</html>
```

> Play CDN está destinado solamente a desarrollo, experimentación y clases. No debe utilizarse como estrategia de producción.

---

# 16. Clases utilitarias

Ejemplo:

```html
<div
  class="
    mx-auto
    max-w-md
    rounded-xl
    bg-white
    p-6
    shadow-lg
  "
>
  Contenido
</div>
```

| Clase | Función aproximada |
|---|---|
| `mx-auto` | centra horizontalmente |
| `max-w-md` | ancho máximo |
| `rounded-xl` | esquinas redondeadas |
| `bg-white` | fondo blanco |
| `p-6` | relleno |
| `shadow-lg` | sombra |

## Flexbox

```html
<div class="flex items-center justify-between gap-4">
  ...
</div>
```

## Grid

```html
<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  ...
</div>
```

## Tipografía

```html
<h1 class="text-4xl font-bold text-slate-900">
  AulaBot
</h1>
```

---

# 17. Diseño responsivo con Tailwind

Tailwind utiliza prefijos responsivos.

```html
<div
  class="
    grid
    grid-cols-1
    gap-6
    md:grid-cols-2
    lg:grid-cols-3
  "
>
```

Interpretación:

```text
Base: 1 columna
md:   2 columnas
lg:   3 columnas
```

Puntos de quiebre predeterminados:

| Prefijo | Ancho mínimo |
|---|---:|
| `sm` | `40rem` — 640 px |
| `md` | `48rem` — 768 px |
| `lg` | `64rem` — 1024 px |
| `xl` | `80rem` — 1280 px |
| `2xl` | `96rem` — 1536 px |

Ejemplo:

```html
<img
  class="w-16 md:w-32 lg:w-48"
  src="robot.png"
  alt="Robot educativo"
>
```

---

# 18. Estados hover y focus

Tailwind utiliza variantes con prefijos.

```html
<button
  class="
    rounded-lg
    bg-blue-600
    px-5
    py-3
    font-semibold
    text-white
    hover:bg-blue-800
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-amber-500
  "
>
  Inscribirse
</button>
```

| Prefijo | Estado |
|---|---|
| `hover:` | puntero sobre el elemento |
| `focus:` | elemento enfocado |
| `focus-visible:` | foco visible por teclado |
| `disabled:` | control deshabilitado |
| `dark:` | modo oscuro |
| `md:` | punto de quiebre mediano |

---

# 19. Ejemplo Tailwind

```html
<section class="mx-auto max-w-7xl px-4 py-12">
  <header class="mb-8">
    <p
      class="
        font-bold
        uppercase
        tracking-wider
        text-blue-600
      "
    >
      Talleres
    </p>

    <h1
      class="
        text-4xl
        font-bold
        text-slate-900
        md:text-5xl
      "
    >
      Aprende con AulaBot
    </h1>
  </header>

  <div
    class="
      grid
      grid-cols-1
      gap-6
      md:grid-cols-2
      lg:grid-cols-3
    "
  >
    <article
      class="
        flex
        flex-col
        rounded-xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2
        class="
          text-xl
          font-bold
          text-slate-900
        "
      >
        Robótica educativa
      </h2>

      <p class="mt-3 text-slate-600">
        Construye y programa un robot móvil.
      </p>

      <a
        class="
          mt-6
          inline-flex
          w-fit
          rounded-lg
          bg-blue-600
          px-5
          py-3
          font-semibold
          text-white
          hover:bg-blue-800
        "
        href="#"
      >
        Inscribirse
      </a>
    </article>
  </div>
</section>
```

---

# 20. Comparación del mismo componente

## CSS propio

```html
<article class="tarjeta">
  <h2 class="tarjeta__titulo">
    Robótica educativa
  </h2>

  <p class="tarjeta__texto">
    Construye y programa un robot móvil.
  </p>

  <a class="boton" href="#">
    Inscribirse
  </a>
</article>
```

Se necesita definir las clases en CSS.

## Bootstrap

```html
<article class="card shadow-sm">
  <div class="card-body">
    <h2 class="card-title h4">
      Robótica educativa
    </h2>

    <p class="card-text">
      Construye y programa un robot móvil.
    </p>

    <a class="btn btn-primary" href="#">
      Inscribirse
    </a>
  </div>
</article>
```

Bootstrap entrega la estructura visual del componente.

## Tailwind

```html
<article
  class="
    rounded-xl
    border
    border-slate-200
    bg-white
    p-6
    shadow-sm
  "
>
  <h2 class="text-xl font-bold text-slate-900">
    Robótica educativa
  </h2>

  <p class="mt-3 text-slate-600">
    Construye y programa un robot móvil.
  </p>

  <a
    class="
      mt-6
      inline-flex
      rounded-lg
      bg-blue-600
      px-5
      py-3
      font-semibold
      text-white
    "
    href="#"
  >
    Inscribirse
  </a>
</article>
```

Tailwind permite construir la apariencia combinando utilidades.

---

# 21. Bootstrap frente a Tailwind

| Dimensión | Bootstrap | Tailwind CSS |
|---|---|---|
| Enfoque | Componentes y utilidades | Utilidades |
| Apariencia inicial | Prediseñada | La define el equipo |
| Velocidad de prototipo | Muy alta | Alta |
| Personalización visual | Requiere variables, Sass o sobrescritura | Muy flexible |
| Cantidad de clases en HTML | Moderada | Puede ser alta |
| CSS propio | Menor al comenzar | Menor para estilos comunes |
| Sistema de rejilla | Rejilla de 12 columnas | Flexbox y Grid mediante utilidades |
| JavaScript incluido | Plugins opcionales | No incluye componentes JS |
| Curva inicial | Fácil para componentes comunes | Requiere aprender utilidades |
| Resultado visual | Puede parecer Bootstrap sin personalización | Puede diferenciarse con facilidad |
| Uso educativo inicial | Bueno para componentes rápidos | Bueno después de dominar CSS |

---

# 22. ¿Cuál conviene seleccionar?

## Elegir Bootstrap cuando:

- se necesita un prototipo rápido;
- se requieren componentes prediseñados;
- el equipo tiene poca experiencia visual;
- el proyecto necesita tablas, formularios y navegación rápidamente;
- se acepta una apariencia inicial estandarizada.

## Elegir Tailwind cuando:

- se necesita mayor control visual;
- existe un diseño propio;
- se trabajará con componentes reutilizables;
- el equipo comprende CSS;
- se desea utilizar un sistema de utilidades y tokens;
- se necesita evitar una apariencia predeterminada.

## Preguntas de decisión

1. ¿Existe un diseño definido?
2. ¿Qué experiencia tiene el equipo?
3. ¿Cuánto tiempo hay?
4. ¿Se necesitan componentes interactivos?
5. ¿Qué nivel de personalización se requiere?
6. ¿Se utilizará React u otro framework?
7. ¿Qué costo de aprendizaje se acepta?
8. ¿Cómo se mantendrá la consistencia?

---

# 23. Uso con React

## Bootstrap CSS

Puede utilizarse importando el CSS:

```bash
npm install bootstrap
```

```jsx
import "bootstrap/dist/css/bootstrap.min.css";
```

Componente:

```jsx
function Boton() {
  return (
    <button className="btn btn-primary">
      Inscribirse
    </button>
  );
}
```

## Precaución con Bootstrap JavaScript

Bootstrap manipula el DOM mediante sus plugins JavaScript.

React también administra el DOM. Cuando ambos intentan modificar el mismo elemento pueden producirse conflictos.

En React se recomienda:

- usar Bootstrap principalmente como CSS;
- controlar estados desde React;
- evaluar componentes diseñados específicamente para React;
- no mezclar manipulación directa del DOM sin comprender sus efectos.

## Tailwind en React

```jsx
function TallerCard() {
  return (
    <article
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2 className="text-xl font-bold">
        Robótica educativa
      </h2>
    </article>
  );
}
```

En JSX se utiliza:

```text
className
```

en lugar de:

```text
class
```

## Clases dinámicas en Tailwind

Evitar construir fragmentos incompletos:

```jsx
// No recomendado
<div className={`bg-${color}-600`}>
```

Las clases deben aparecer completas en el código:

```jsx
const estilos = {
  azul: "bg-blue-600 text-white",
  verde: "bg-green-600 text-white"
};

<div className={estilos[color]}>
```

Tailwind analiza los archivos como texto para detectar clases utilizadas.

---

# 24. Accesibilidad

Un framework no garantiza por sí solo una interfaz accesible.

Se debe mantener:

- HTML semántico;
- etiquetas de formulario;
- texto alternativo;
- foco visible;
- contraste suficiente;
- navegación mediante teclado;
- mensajes comprensibles;
- botones reales para acciones;
- enlaces para navegación;
- atributos ARIA solamente cuando sean necesarios.

## Ejemplo

```html
<label for="correo">
  Correo electrónico
</label>

<input
  id="correo"
  name="correo"
  type="email"
  required
>
```

No reemplazar la etiqueta por un `placeholder`.

---

# 25. Buenas prácticas

1. Aprender primero CSS básico.
2. No copiar clases sin comprenderlas.
3. Mantener HTML semántico.
4. Utilizar la documentación de la versión instalada.
5. Evitar mezclar muchas metodologías sin necesidad.
6. Personalizar colores y tipografía.
7. Eliminar dependencias que no se utilicen.
8. Probar el diseño en varios tamaños.
9. Mantener foco visible.
10. Revisar el tamaño final de los recursos.
11. Documentar por qué se seleccionó el framework.
12. No decidir solamente por popularidad.
13. Mantener componentes reutilizables.
14. Evitar sobrescrituras CSS desordenadas.
15. Revisar actualizaciones antes de migrar versiones.

---

# 26. Actividad práctica

## Caso AulaBot

Crear una página de talleres utilizando primero Bootstrap y luego Tailwind CSS.

La página debe contener:

- encabezado;
- navegación;
- sección principal;
- tres tarjetas;
- botón;
- formulario;
- pie de página;
- diseño responsivo.

## Parte A: Bootstrap

Debe utilizar:

- `container`;
- `row`;
- `col-*`;
- `card`;
- `btn`;
- clases de espaciado;
- formulario.

## Parte B: Tailwind

Debe utilizar:

- `max-w-*`;
- `grid`;
- `flex`;
- `gap-*`;
- `p-*`;
- `m-*`;
- `rounded-*`;
- `bg-*`;
- `text-*`;
- variantes `md:` y `lg:`;
- `hover:` y `focus-visible:`.

## Comparación final

Responder:

1. ¿Cuál fue más rápido para construir?
2. ¿Cuál produjo más clases en el HTML?
3. ¿Cuál permitió más personalización?
4. ¿Cuál fue más fácil de comprender?
5. ¿Cuál utilizaría en un prototipo?
6. ¿Cuál utilizaría con un diseño propio?
7. ¿Qué conocimientos previos exige cada uno?
8. ¿Qué riesgos de mantenimiento identifica?

---

# 27. Glosario

| Término | Descripción |
|---|---|
| Framework | Estructura con convenciones y soluciones reutilizables |
| CSS framework | Conjunto de estilos, reglas y clases para interfaces |
| Componente | Parte reutilizable de una interfaz |
| Utilidad | Clase pequeña que aplica una responsabilidad concreta |
| Grid | Sistema de filas y columnas |
| Breakpoint | Punto de quiebre responsivo |
| CDN | Red que distribuye archivos desde servidores externos |
| Sass | Preprocesador de CSS |
| Plugin | Extensión que agrega comportamiento |
| Design token | Valor reutilizable de color, espacio o tipografía |
| Mobile first | Diseño que comienza por pantallas pequeñas |
| Vite | Herramienta de desarrollo y compilación frontend |

---

# 28. Fuentes oficiales

## Bootstrap

- https://getbootstrap.com/
- https://getbootstrap.com/docs/5.3/getting-started/introduction/
- https://getbootstrap.com/docs/5.3/getting-started/download/
- https://getbootstrap.com/docs/5.3/getting-started/vite/
- https://getbootstrap.com/docs/5.3/getting-started/javascript/
- https://getbootstrap.com/docs/5.3/layout/grid/
- https://getbootstrap.com/docs/5.3/components/

## Tailwind CSS

- https://tailwindcss.com/
- https://tailwindcss.com/docs/installation/using-vite
- https://tailwindcss.com/docs/installation/play-cdn
- https://tailwindcss.com/docs/styling-with-utility-classes
- https://tailwindcss.com/docs/responsive-design
- https://tailwindcss.com/docs/hover-focus-and-other-states
- https://tailwindcss.com/docs/detecting-classes-in-source-files

> Las versiones y los comandos pueden cambiar. Se debe revisar siempre la documentación oficial de la versión utilizada.
