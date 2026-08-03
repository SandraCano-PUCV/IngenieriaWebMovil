# Guía de CSS

> Referencia práctica de CSS para dar estilo, organizar y adaptar documentos HTML.

## Índice

1. [Qué es CSS](#qué-es-css)
2. [Anatomía de una regla CSS](#anatomía-de-una-regla-css)
3. [Cómo incorporar CSS en HTML](#cómo-incorporar-css-en-html)
4. [Comentarios](#comentarios)
5. [Selectores](#selectores)
6. [Combinadores](#combinadores)
7. [Pseudoclases](#pseudoclases)
8. [Pseudoelementos](#pseudoelementos)
9. [Cascada, herencia y especificidad](#cascada-herencia-y-especificidad)
10. [Valores, unidades y funciones](#valores-unidades-y-funciones)
11. [Colores y fondos](#colores-y-fondos)
12. [Tipografía y texto](#tipografía-y-texto)
13. [Modelo de caja](#modelo-de-caja)
14. [Visualización y visibilidad](#visualización-y-visibilidad)
15. [Posicionamiento](#posicionamiento)
16. [Flexbox](#flexbox)
17. [CSS Grid](#css-grid)
18. [Listas y tablas](#listas-y-tablas)
19. [Imágenes y contenido multimedia](#imágenes-y-contenido-multimedia)
20. [Formularios](#formularios)
21. [Diseño responsivo](#diseño-responsivo)
22. [Variables CSS](#variables-css)
23. [Transiciones, transformaciones y animaciones](#transiciones-transformaciones-y-animaciones)
24. [Reglas arroba](#reglas-arroba)
25. [CSS moderno](#css-moderno)
26. [Accesibilidad](#accesibilidad)
27. [Organización recomendada](#organización-recomendada)
28. [Ejemplo completo](#ejemplo-completo)
29. [Resumen de propiedades frecuentes](#resumen-de-propiedades-frecuentes)

---

## Qué es CSS

CSS significa **Cascading Style Sheets**, es decir, **Hojas de Estilo en Cascada**.

HTML define la estructura y el significado del contenido:

```html
<h1>Curso de desarrollo web</h1>
<p class="descripcion">Introducción a HTML y CSS.</p>
```

CSS define su presentación:

```css
h1 {
  color: navy;
}

.descripcion {
  font-size: 1.125rem;
}
```

CSS no utiliza etiquetas propias. Trabaja principalmente con:

- **selectores**;
- **propiedades**;
- **valores**;
- **declaraciones**;
- **reglas CSS**.

---

## Anatomía de una regla CSS

```css
p {
  color: blue;
  font-size: 18px;
}
```

| Parte | Ejemplo | Descripción |
|---|---|---|
| Selector | `p` | Indica qué elementos se seleccionan. |
| Propiedad | `color` | Característica que se desea modificar. |
| Valor | `blue` | Valor asignado a la propiedad. |
| Declaración | `color: blue;` | Unión de propiedad y valor. |
| Bloque | `{ ... }` | Contiene una o más declaraciones. |
| Regla CSS | `p { ... }` | Selector más bloque de declaraciones. |

Una declaración termina normalmente con punto y coma:

```css
propiedad: valor;
```

---

## Cómo incorporar CSS en HTML

### 1. Hoja de estilos externa

Es la forma recomendada para la mayoría de los proyectos.

```html
<head>
  <link rel="stylesheet" href="css/estilos.css">
</head>
```

Archivo `estilos.css`:

```css
body {
  font-family: Arial, sans-serif;
}
```

### 2. Estilos internos

Se escriben dentro de `<style>`:

```html
<head>
  <style>
    body {
      background-color: #f5f5f5;
    }
  </style>
</head>
```

### 3. Estilos en línea

Se escriben mediante el atributo `style`:

```html
<p style="color: red;">Texto rojo</p>
```

Los estilos en línea funcionan, pero dificultan la reutilización y el mantenimiento.

### Orden recomendado

1. Hoja de estilos externa.
2. Estilos internos para casos específicos.
3. Estilos en línea solo cuando exista una razón concreta.

---

## Comentarios

Los comentarios en CSS se escriben entre `/*` y `*/`.

```css
/* Estilos del encabezado principal */

header {
  padding: 1rem;
}
```

Los comentarios pueden ocupar varias líneas:

```css
/*
  Esta sección contiene
  los estilos del menú.
*/
```

---

## Selectores

### Selector universal

Selecciona todos los elementos.

```css
* {
  box-sizing: border-box;
}
```

### Selector de tipo o etiqueta HTML

Selecciona todos los elementos de un tipo.

```css
p {
  line-height: 1.6;
}
```

### Selector de clase

Selecciona los elementos cuyo atributo `class` contiene el nombre indicado.

```html
<p class="destacado">Contenido importante.</p>
```

```css
.destacado {
  font-weight: bold;
}
```

Una clase puede reutilizarse:

```html
<p class="aviso">Primer aviso</p>
<p class="aviso">Segundo aviso</p>
```

### Selector de identificador

Selecciona el elemento cuyo atributo `id` coincide con el selector.

```html
<main id="contenido-principal">
```

```css
#contenido-principal {
  max-width: 70rem;
}
```

Un `id` debe ser único dentro del documento.

### Diferencia entre class, id ¿cuál usar?
Los atributos `class` e `id` permiten identificar elementos HTML para:

- aplicar estilos CSS;
- seleccionarlos con JavaScript;
- crear navegación interna;
- relacionar controles de formularios;
- mejorar la accesibilidad;
- construir componentes reutilizables.

Aunque ambos sirven para identificar elementos, no se utilizan de la misma manera.

La idea principal es:

```text
id    → identifica un elemento único
class → agrupa elementos reutilizables
```
### ¿Cuándo utilizar `id`?
1. **para identificar una única sección**
```html
<header id="encabezado-principal">
  ...
</header>
```
2. **Crear enlaces internos**
```html
<a href="#contacto">
  Ir a contacto
</a>

<section id="contacto">
  <h2>Contacto</h2>
</section>
```

3. **Relacionar un `<label>` con un campo**
```html
<label for="correo">
  Correo electrónico
</label>

<input
  id="correo"
  name="correo"
  type="email"
>
```
4. **Accesibilidad**
```html
<input
  id="nombre"
  aria-describedby="ayuda-nombre"
>

<p id="ayuda-nombre">
  Ingrese su nombre completo.
</p>
```
5. **Seleccionar un elemento con Javascript**
```javascript
const correo =
  document.getElementById("correo");
```

También puede usarse:

```javascript
const correo =
  document.querySelector("#correo");
```

---
### ¿Cuándo utilizar `class`?
1.**Aplicar el mismo estilo**
```html
<p class="destacado">
  Primer mensaje
</p>

<p class="destacado">
  Segundo mensaje
</p>
```

```css
.destacado {
  color: darkblue;
  font-weight: bold;
}
```

2.**Crear componentes reutilizables**
```html
<article class="tarjeta">
  ...
</article>

<article class="tarjeta">
  ...
</article>
```

```css
.tarjeta {
  padding: 1.5rem;
  border: 1px solid #cccccc;
  border-radius: 0.75rem;
}
```

3. **Representar estados o variantes**
```html
<button class="boton boton--activo">
  Taller seleccionado
</button>
```

```css
.boton {
  padding: 0.75rem 1rem;
}

.boton--activo {
  color: white;
  background-color: green;
}
```

4. **Seleccionar varios elementos con JavaScript**
```javascript
const tarjetas =
  document.querySelectorAll(".tarjeta");

tarjetas.forEach(tarjeta => {
  console.log(tarjeta.textContent);
});
```

## Comparación entre `id` y `class`

| Característica | `id` | `class` |
|---|---|---|
| Propósito | Identificar un elemento único | Agrupar elementos |
| Puede repetirse | No | Sí |
| Cantidad por elemento | Generalmente uno | Puede tener varias clases |
| Selector CSS | `#nombre` | `.nombre` |
| JavaScript | `getElementById()` | `querySelectorAll()` |
| Enlaces internos | Sí | No directamente |
| Formularios | Relaciona `label` y control | Se usa para estilos |
| Accesibilidad | Relaciona elementos ARIA | Se usa para presentación |
| Uso recomendado | Identificación única | Estilos y componentes |

---



### Selector de atributo

```css
input[type="email"] {
  border-color: steelblue;
}
```

Variantes frecuentes:

| Selector | Significado |
|---|---|
| `[atributo]` | Elementos que tienen el atributo. |
| `[atributo="valor"]` | Coincidencia exacta. |
| `[atributo~="valor"]` | El valor aparece en una lista separada por espacios. |
| `[atributo^="valor"]` | El atributo comienza con el valor. |
| `[atributo$="valor"]` | El atributo termina con el valor. |
| `[atributo*="valor"]` | El atributo contiene el valor. |

Ejemplos:

```css
a[target] {
  text-decoration-style: dotted;
}

a[href^="https://"] {
  font-weight: 600;
}

a[href$=".pdf"] {
  padding-inline-end: 1.25rem;
}
```

### Agrupación de selectores

```css
h1,
h2,
h3 {
  font-family: Georgia, serif;
}
```

### Selector compuesto

```css
button.primario {
  font-weight: bold;
}
```

Selecciona elementos `<button>` que además poseen la clase `primario`.

---

## Combinadores

### Descendiente

Selecciona elementos que se encuentran dentro de otro elemento.

```css
nav a {
  text-decoration: none;
}
```

### Hijo directo

```css
ul > li {
  margin-bottom: 0.5rem;
}
```

### Hermano adyacente

Selecciona el elemento que aparece inmediatamente después.

```css
h2 + p {
  margin-top: 0;
}
```

### Hermanos generales

```css
h2 ~ p {
  color: #333333;
}
```

---

## Pseudoclases

Las pseudoclases seleccionan elementos según su estado o posición.

### Interacción

```css
a:hover {
  text-decoration: underline;
}

button:active {
  transform: scale(0.98);
}

input:focus {
  outline: 3px solid currentColor;
}

button:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
```

### Enlaces

```css
a:link {
  color: blue;
}

a:visited {
  color: purple;
}
```

### Formularios

```css
input:required {
  border-inline-start: 4px solid;
}

input:valid {
  border-color: green;
}

input:invalid {
  border-color: crimson;
}

input:disabled {
  opacity: 0.6;
}

input:checked + label {
  font-weight: bold;
}
```

### Posición estructural

```css
li:first-child {
  font-weight: bold;
}

li:last-child {
  margin-bottom: 0;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

article:nth-of-type(3) {
  border-top: 1px solid;
}
```

### Negación e inclusión

```css
button:not(.secundario) {
  font-weight: bold;
}

:is(h1, h2, h3) {
  line-height: 1.2;
}

:where(header, main, footer) {
  width: min(100% - 2rem, 75rem);
  margin-inline: auto;
}
```

### Selector relacional `:has()`

```css
form:has(input:invalid) {
  border-color: crimson;
}
```

Permite seleccionar un elemento según el contenido que posee. Conviene revisar compatibilidad cuando el proyecto deba funcionar en navegadores antiguos.

---

## Pseudoelementos

Los pseudoelementos permiten seleccionar una parte de un elemento o generar contenido decorativo.

```css
p::first-letter {
  font-size: 2rem;
}

p::first-line {
  font-weight: bold;
}

::selection {
  background-color: gold;
}
```

### `::before` y `::after`

```css
.enlace-externo::after {
  content: " ↗";
}
```

No deben utilizarse para insertar información esencial que no exista en el HTML.

### Otros pseudoelementos

| Pseudoelemento | Uso |
|---|---|
| `::placeholder` | Texto de ejemplo de un campo. |
| `::marker` | Marcador de una lista. |
| `::file-selector-button` | Botón de selección de archivo. |
| `::backdrop` | Fondo de un diálogo modal. |

---

## Cascada, herencia y especificidad

### Cascada

Cuando varias reglas afectan al mismo elemento, el navegador determina cuál se aplica considerando:

1. origen de los estilos;
2. importancia;
3. capas de cascada;
4. especificidad;
5. orden de aparición.

### Herencia

Algunas propiedades se heredan desde el elemento padre.

```css
body {
  color: #222222;
  font-family: Arial, sans-serif;
}
```

Los elementos descendientes suelen heredar `color` y `font-family`.

Propiedades como `margin`, `padding`, `border` y `width` normalmente no se heredan.

### Especificidad

De menor a mayor fuerza aproximada:

1. selector universal y combinadores;
2. selectores de tipo y pseudoelementos;
3. clases, atributos y pseudoclases;
4. identificadores;
5. estilos en línea;
6. declaraciones con `!important`, dentro de su contexto de cascada.

Ejemplo:

```css
p {
  color: black;
}

.nota {
  color: blue;
}

#advertencia {
  color: red;
}
```

El selector `#advertencia` tiene mayor especificidad.

### Evitar abuso de `!important`

```css
.aviso {
  color: red !important;
}
```

`!important` puede ser útil en casos excepcionales, pero dificulta el mantenimiento.

### Palabras clave de cascada

```css
.elemento {
  color: inherit;
  margin: initial;
  display: revert;
  padding: unset;
}
```

| Valor | Significado |
|---|---|
| `inherit` | Usa el valor del elemento padre. |
| `initial` | Usa el valor inicial definido por CSS. |
| `unset` | Hereda si la propiedad es heredable; en otro caso usa el valor inicial. |
| `revert` | Revierte al valor de una capa u origen anterior. |
| `revert-layer` | Revierte al valor de una capa de cascada anterior. |

---

## Valores, unidades y funciones

### Unidades absolutas

| Unidad | Uso |
|---|---|
| `px` | Píxel CSS. |
| `pt` | Punto tipográfico, habitual en impresión. |
| `cm` | Centímetros. |
| `mm` | Milímetros. |
| `in` | Pulgadas. |

### Unidades relativas

| Unidad | Descripción |
|---|---|
| `%` | Porcentaje respecto de un valor de referencia. |
| `em` | Relativa al tamaño de fuente del contexto. |
| `rem` | Relativa al tamaño de fuente del elemento raíz. |
| `vw` | 1 % del ancho de la ventana gráfica. |
| `vh` | 1 % del alto de la ventana gráfica. |
| `vmin` | 1 % de la dimensión menor de la ventana. |
| `vmax` | 1 % de la dimensión mayor de la ventana. |
| `ch` | Relacionada con el ancho del carácter `0`. |
| `fr` | Fracción del espacio disponible en Grid. |
| `lh` | Relativa a la altura de línea del elemento. |

Ejemplo:

```css
.contenedor {
  width: min(90%, 70rem);
  min-height: 100vh;
  padding: 2rem;
}
```

### Funciones frecuentes

#### `calc()`

```css
main {
  min-height: calc(100vh - 8rem);
}
```

#### `min()`

```css
.tarjeta {
  width: min(100%, 30rem);
}
```

#### `max()`

```css
.contenido {
  padding-inline: max(1rem, 4vw);
}
```

#### `clamp()`

```css
h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}
```

#### `var()`

```css
color: var(--color-principal);
```

---

## Colores y fondos

### Formas de definir colores

```css
.elemento {
  color: red;
  color: #ff0000;
  color: rgb(255 0 0);
  color: rgb(255 0 0 / 70%);
  color: hsl(0 100% 50%);
  color: transparent;
  color: currentColor;
}
```

### Propiedades de color y fondo

| Propiedad | Descripción |
|---|---|
| `color` | Color del texto y valor de referencia para `currentColor`. |
| `background-color` | Color de fondo. |
| `background-image` | Imagen o degradado de fondo. |
| `background-repeat` | Repetición del fondo. |
| `background-position` | Posición del fondo. |
| `background-size` | Tamaño del fondo. |
| `background-attachment` | Comportamiento del fondo al desplazarse. |
| `background` | Propiedad abreviada. |

Ejemplo:

```css
.hero {
  color: white;
  background:
    linear-gradient(rgb(0 0 0 / 55%), rgb(0 0 0 / 55%)),
    url("../img/robotica.jpg") center / cover no-repeat;
}
```

### Degradados

```css
.banner {
  background: linear-gradient(90deg, navy, steelblue);
}
```

```css
.insignia {
  background: radial-gradient(circle, white, lightblue);
}
```

---

## Tipografía y texto

### Propiedades de fuente

| Propiedad | Descripción |
|---|---|
| `font-family` | Familia tipográfica. |
| `font-size` | Tamaño de fuente. |
| `font-weight` | Grosor. |
| `font-style` | Estilo normal, cursiva u oblicuo. |
| `font-variant` | Variantes tipográficas. |
| `line-height` | Altura de línea. |
| `font` | Propiedad abreviada. |

Ejemplo:

```css
body {
  font-family: system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}
```

### Propiedades de texto

| Propiedad | Descripción |
|---|---|
| `text-align` | Alineación horizontal. |
| `text-decoration` | Subrayado, línea superior o tachado. |
| `text-transform` | Mayúsculas, minúsculas o capitalización. |
| `text-indent` | Sangría inicial. |
| `letter-spacing` | Espacio entre caracteres. |
| `word-spacing` | Espacio entre palabras. |
| `white-space` | Tratamiento de espacios y saltos. |
| `overflow-wrap` | Permite dividir cadenas largas. |
| `text-overflow` | Indica cómo mostrar texto desbordado. |
| `text-shadow` | Sombra del texto. |

Ejemplo de truncamiento:

```css
.titulo-corto {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

### Cargar una fuente local o web

```css
@font-face {
  font-family: "FuenteProyecto";
  src: url("../fonts/fuente-proyecto.woff2") format("woff2");
  font-display: swap;
}
```

---

## Modelo de caja

Cada elemento puede representarse como una caja compuesta por:

1. contenido;
2. relleno o `padding`;
3. borde;
4. margen.

```css
.tarjeta {
  width: 20rem;
  padding: 1.5rem;
  border: 1px solid #cccccc;
  margin: 1rem;
}
```

### `box-sizing`

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Con `border-box`, el ancho y alto declarados incluyen `padding` y `border`.

### Márgenes

```css
.elemento {
  margin-top: 1rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
}
```

Abreviado:

```css
.elemento {
  margin: 1rem 2rem;
}
```

Propiedades lógicas:

```css
.elemento {
  margin-block: 1rem;
  margin-inline: auto;
}
```

### Relleno

```css
.elemento {
  padding: 1rem 2rem;
}
```

### Bordes

```css
.elemento {
  border: 2px solid #333333;
  border-radius: 0.75rem;
}
```

### Tamaño

| Propiedad | Descripción |
|---|---|
| `width` | Ancho. |
| `height` | Alto. |
| `min-width` | Ancho mínimo. |
| `max-width` | Ancho máximo. |
| `min-height` | Alto mínimo. |
| `max-height` | Alto máximo. |
| `aspect-ratio` | Relación entre ancho y alto. |

```css
.video {
  width: 100%;
  aspect-ratio: 16 / 9;
}
```

### Desbordamiento

```css
.panel {
  max-height: 20rem;
  overflow: auto;
}
```

Valores frecuentes de `overflow`:

- `visible`;
- `hidden`;
- `clip`;
- `scroll`;
- `auto`.

---

## Visualización y visibilidad

### `display`

| Valor | Comportamiento |
|---|---|
| `block` | Caja de bloque. |
| `inline` | Caja en línea. |
| `inline-block` | Caja en línea con dimensiones configurables. |
| `flex` | Contenedor Flexbox. |
| `grid` | Contenedor Grid. |
| `none` | Elimina el elemento del diseño visual. |
| `contents` | El contenedor no genera una caja propia. |

```css
.oculto {
  display: none;
}
```

### `visibility`

```css
.invisible {
  visibility: hidden;
}
```

El elemento conserva su espacio en el diseño.

### `opacity`

```css
.semitransparente {
  opacity: 0.5;
}
```

### `cursor`

```css
button {
  cursor: pointer;
}
```

---

## Posicionamiento

### Posición estática

```css
.elemento {
  position: static;
}
```

Es el comportamiento predeterminado.

### Posición relativa

```css
.elemento {
  position: relative;
  inset-block-start: 0.5rem;
}
```

### Posición absoluta

```css
.contenedor {
  position: relative;
}

.insignia {
  position: absolute;
  inset-block-start: 0.5rem;
  inset-inline-end: 0.5rem;
}
```

### Posición fija

```css
.boton-flotante {
  position: fixed;
  inset-inline-end: 1rem;
  inset-block-end: 1rem;
}
```

### Posición adhesiva

```css
.encabezado {
  position: sticky;
  top: 0;
}
```

### Propiedades relacionadas

| Propiedad | Descripción |
|---|---|
| `top` | Distancia desde arriba. |
| `right` | Distancia desde la derecha. |
| `bottom` | Distancia desde abajo. |
| `left` | Distancia desde la izquierda. |
| `inset` | Abreviación de las cuatro anteriores. |
| `z-index` | Orden de apilamiento dentro de un contexto. |

---

## Flexbox

Flexbox organiza elementos principalmente en una dimensión: fila o columna.

### Contenedor flexible

```css
.contenedor {
  display: flex;
}
```

### Propiedades del contenedor

| Propiedad | Descripción |
|---|---|
| `flex-direction` | Dirección principal: fila o columna. |
| `flex-wrap` | Permite que los elementos pasen a otra línea. |
| `flex-flow` | Abrevia dirección y ajuste. |
| `justify-content` | Distribuye en el eje principal. |
| `align-items` | Alinea en el eje transversal. |
| `align-content` | Distribuye varias líneas. |
| `gap` | Espacio entre elementos. |

Ejemplo:

```css
.menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
```

### Propiedades de los elementos

| Propiedad | Descripción |
|---|---|
| `flex-grow` | Capacidad de crecer. |
| `flex-shrink` | Capacidad de reducirse. |
| `flex-basis` | Tamaño base. |
| `flex` | Abreviación de las tres anteriores. |
| `align-self` | Alineación individual. |
| `order` | Orden visual. |

```css
.tarjeta {
  flex: 1 1 16rem;
}
```

### Centrado con Flexbox

```css
.centrado {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 20rem;
}
```

---

## CSS Grid

Grid organiza elementos en filas y columnas.

### Crear una cuadrícula

```css
.rejilla {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

### Columnas adaptables

```css
.rejilla {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.5rem;
}
```

### Propiedades del contenedor

| Propiedad | Descripción |
|---|---|
| `grid-template-columns` | Define las columnas. |
| `grid-template-rows` | Define las filas. |
| `grid-template-areas` | Define áreas con nombres. |
| `grid-auto-columns` | Tamaño de columnas implícitas. |
| `grid-auto-rows` | Tamaño de filas implícitas. |
| `grid-auto-flow` | Dirección de colocación automática. |
| `gap` | Separación entre filas y columnas. |
| `justify-items` | Alineación horizontal interna. |
| `align-items` | Alineación vertical interna. |
| `place-items` | Abrevia ambas alineaciones. |

### Propiedades de los elementos

| Propiedad | Descripción |
|---|---|
| `grid-column` | Posición y extensión horizontal. |
| `grid-row` | Posición y extensión vertical. |
| `grid-area` | Área o posición combinada. |
| `justify-self` | Alineación horizontal individual. |
| `align-self` | Alineación vertical individual. |
| `place-self` | Abreviación de ambas. |

Ejemplo con áreas:

```css
.pagina {
  display: grid;
  grid-template-areas:
    "cabecera cabecera"
    "menu contenido"
    "pie pie";
  grid-template-columns: 16rem 1fr;
  min-height: 100vh;
}

header {
  grid-area: cabecera;
}

nav {
  grid-area: menu;
}

main {
  grid-area: contenido;
}

footer {
  grid-area: pie;
}
```

---

## Listas y tablas

### Listas

```css
ul {
  list-style-type: square;
  list-style-position: outside;
}
```

```css
.lista-personalizada li::marker {
  content: "✓ ";
}
```

### Tablas

```css
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  border: 1px solid #cccccc;
  text-align: left;
}

thead {
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #fafafa;
}
```

Para tablas amplias:

```css
.contenedor-tabla {
  overflow-x: auto;
}
```

---

## Imágenes y contenido multimedia

### Imagen adaptable

```css
img {
  display: block;
  max-width: 100%;
  height: auto;
}
```

### Ajuste dentro de un contenedor

```css
.miniatura {
  width: 12rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
}
```

### Filtros

```css
.imagen {
  filter: grayscale(100%);
}
```

### Video adaptable

```css
video {
  display: block;
  width: 100%;
  height: auto;
}
```

---

## Formularios

### Estilos básicos

```css
form {
  display: grid;
  gap: 1rem;
  max-width: 40rem;
}

label {
  font-weight: 600;
}

input,
select,
textarea,
button {
  font: inherit;
}

input,
select,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #777777;
  border-radius: 0.375rem;
}

textarea {
  min-height: 8rem;
  resize: vertical;
}
```

### Estados de foco

```css
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
button:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 2px;
}
```

### Validación

```css
input:user-valid {
  border-color: green;
}

input:user-invalid {
  border-color: crimson;
}
```

### Botones

```css
button {
  padding: 0.75rem 1.25rem;
  border: 0;
  border-radius: 0.375rem;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Casillas y botones de opción

```css
input[type="checkbox"],
input[type="radio"] {
  width: auto;
  accent-color: navy;
}
```

---

## Diseño responsivo

El diseño responsivo adapta la interfaz a diferentes tamaños de pantalla.

### Enfoque mobile first

Primero se definen estilos para pantallas pequeñas:

```css
.rejilla {
  display: grid;
  gap: 1rem;
}
```

Después se amplía el diseño:

```css
@media (min-width: 48rem) {
  .rejilla {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Media queries

```css
@media (min-width: 64rem) {
  .rejilla {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Consultas frecuentes

```css
@media (orientation: landscape) {
  .hero {
    min-height: 60vh;
  }
}
```

```css
@media (prefers-color-scheme: dark) {
  body {
    background-color: #111111;
    color: #f5f5f5;
  }
}
```

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto;
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
  }
}
```

### Imágenes y anchos fluidos

```css
.contenedor {
  width: min(100% - 2rem, 75rem);
  margin-inline: auto;
}
```

---

## Variables CSS

Las propiedades personalizadas permiten reutilizar valores.

```css
:root {
  --color-principal: #173f73;
  --color-fondo: #f7f9fc;
  --radio: 0.75rem;
  --espacio: 1rem;
}
```

Uso:

```css
.tarjeta {
  padding: var(--espacio);
  border-radius: var(--radio);
  color: var(--color-principal);
  background-color: var(--color-fondo);
}
```

Valor de respaldo:

```css
.elemento {
  color: var(--color-texto, #222222);
}
```

Las variables respetan la cascada:

```css
.tema-oscuro {
  --color-fondo: #111111;
  --color-texto: #f5f5f5;
}
```

---

## Transiciones, transformaciones y animaciones

### Transiciones

```css
button {
  transition:
    background-color 200ms ease,
    transform 200ms ease;
}

button:hover {
  transform: translateY(-2px);
}
```

Propiedades:

| Propiedad | Descripción |
|---|---|
| `transition-property` | Propiedad que cambia. |
| `transition-duration` | Duración. |
| `transition-timing-function` | Curva de velocidad. |
| `transition-delay` | Retardo. |
| `transition` | Abreviación. |

### Transformaciones

```css
.elemento {
  transform: translateX(1rem);
  transform: scale(1.05);
  transform: rotate(5deg);
  transform: skewX(10deg);
}
```

Transformaciones combinadas:

```css
.elemento {
  transform: translateY(-0.25rem) scale(1.02);
}
```

### Animaciones

```css
@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tarjeta {
  animation: aparecer 500ms ease-out;
}
```

Propiedades:

| Propiedad | Descripción |
|---|---|
| `animation-name` | Nombre de `@keyframes`. |
| `animation-duration` | Duración. |
| `animation-timing-function` | Curva de velocidad. |
| `animation-delay` | Retardo. |
| `animation-iteration-count` | Número de repeticiones. |
| `animation-direction` | Dirección. |
| `animation-fill-mode` | Estado antes o después. |
| `animation-play-state` | Pausa o ejecución. |
| `animation` | Abreviación. |

---

## Reglas arroba

Las reglas arroba comienzan con `@`.

### `@import`

```css
@import url("tipografia.css");
```

Para hojas principales suele preferirse `<link>` en HTML, porque permite una carga más clara.

### `@media`

```css
@media (min-width: 48rem) {
  .menu {
    display: flex;
  }
}
```

### `@supports`

```css
@supports (display: grid) {
  .rejilla {
    display: grid;
  }
}
```

### `@font-face`

```css
@font-face {
  font-family: "FuenteProyecto";
  src: url("../fonts/fuente.woff2") format("woff2");
}
```

### `@keyframes`

```css
@keyframes girar {
  to {
    transform: rotate(1turn);
  }
}
```

### `@layer`

```css
@layer reset, base, componentes, utilidades;

@layer base {
  body {
    margin: 0;
  }
}
```

Las capas permiten controlar el orden de la cascada.

### `@container`

```css
.tarjetas {
  container-type: inline-size;
}

@container (min-width: 40rem) {
  .tarjeta {
    grid-template-columns: 10rem 1fr;
  }
}
```

---

## CSS moderno

Estas herramientas son útiles en proyectos actuales. Para proyectos con navegadores antiguos conviene revisar su compatibilidad.

### Anidamiento CSS

```css
.tarjeta {
  padding: 1rem;

  & h2 {
    margin-top: 0;
  }

  &:hover {
    transform: translateY(-2px);
  }
}
```

### Consultas de contenedor

Permiten adaptar un componente según el tamaño de su contenedor y no solo según la ventana.

```css
.componente {
  container-type: inline-size;
}

@container (min-width: 30rem) {
  .componente__contenido {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

### Propiedades lógicas

```css
.elemento {
  margin-inline: auto;
  padding-block: 1rem;
  border-inline-start: 4px solid;
}
```

Facilitan la adaptación a diferentes direcciones de escritura.

### `aspect-ratio`

```css
.tarjeta-imagen {
  aspect-ratio: 4 / 3;
}
```

### Funciones de color y transparencia

```css
.elemento {
  background-color: rgb(20 60 110 / 80%);
}
```

### Scroll suave

```css
html {
  scroll-behavior: smooth;
}
```

Debe combinarse con una consideración para usuarios que prefieren menos movimiento.

---

## Accesibilidad

### Contraste

El texto debe mantener un contraste suficiente respecto del fondo.

```css
body {
  color: #202020;
  background-color: #ffffff;
}
```

### Foco visible

No debe eliminarse el contorno sin proporcionar una alternativa clara.

Incorrecto:

```css
button:focus {
  outline: none;
}
```

Mejor:

```css
button:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
```

### Movimiento reducido

```css
@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto;
  }
}
```

### Tamaños relativos

Usar `rem`, `em` y diseños flexibles facilita que el usuario aumente el tamaño del texto.

### No depender solo del color

Combinar color con texto, iconos, bordes u otros indicadores.

```css
.error {
  border-inline-start: 4px solid crimson;
  font-weight: 600;
}
```

### Ocultar visualmente sin eliminar de lectores de pantalla

```css
.solo-lectores {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  clip-path: inset(50%);
}
```

---

## Organización recomendada

Una estructura sencilla puede ser:

```text
proyecto/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── base.css
│   ├── componentes.css
│   ├── utilidades.css
│   └── estilos.css
├── img/
└── js/
```

Ejemplo de `estilos.css`:

```css
@import url("reset.css");
@import url("variables.css");
@import url("base.css");
@import url("componentes.css");
@import url("utilidades.css");
```

En proyectos grandes puede utilizarse una estrategia como:

- BEM;
- componentes;
- utilidades;
- capas de cascada;
- design tokens;
- CSS Modules;
- CSS-in-JS, cuando el framework lo requiera.

### Convención BEM

```html
<article class="tarjeta tarjeta--destacada">
  <h2 class="tarjeta__titulo">Título</h2>
  <p class="tarjeta__texto">Descripción.</p>
</article>
```

```css
.tarjeta {
  padding: 1rem;
}

.tarjeta__titulo {
  margin-top: 0;
}

.tarjeta--destacada {
  border: 2px solid;
}
```

---

## Ejemplo completo

### HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proyecto con CSS</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <header class="encabezado">
    <div class="contenedor encabezado__contenido">
      <a class="marca" href="#">Aula Web</a>

      <nav aria-label="Navegación principal">
        <ul class="menu">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#contenidos">Contenidos</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="inicio" class="contenedor">
    <section class="hero">
      <div>
        <p class="etiqueta">Desarrollo web</p>
        <h1>Aprender HTML y CSS</h1>
        <p>
          Construya páginas con estructura semántica,
          diseño adaptable y buena accesibilidad.
        </p>
        <a class="boton" href="#contenidos">Ver contenidos</a>
      </div>
    </section>

    <section id="contenidos">
      <h2>Contenidos principales</h2>

      <div class="rejilla">
        <article class="tarjeta">
          <h3>HTML</h3>
          <p>Estructura y semántica del contenido.</p>
        </article>

        <article class="tarjeta">
          <h3>CSS</h3>
          <p>Presentación, diseño y adaptación visual.</p>
        </article>

        <article class="tarjeta">
          <h3>Accesibilidad</h3>
          <p>Interfaces utilizables por más personas.</p>
        </article>
      </div>
    </section>

    <section id="contacto">
      <h2>Contacto</h2>

      <form class="formulario">
        <div>
          <label for="nombre">Nombre</label>
          <input id="nombre" name="nombre" type="text" required>
        </div>

        <div>
          <label for="correo">Correo</label>
          <input id="correo" name="correo" type="email" required>
        </div>

        <div>
          <label for="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" required></textarea>
        </div>

        <button class="boton" type="submit">Enviar</button>
      </form>
    </section>
  </main>

  <footer class="pie">
    <div class="contenedor">
      <p>&copy; 2026 Aula Web</p>
    </div>
  </footer>
</body>
</html>
```

### CSS

```css
:root {
  --color-principal: #173f73;
  --color-principal-oscuro: #102d52;
  --color-fondo: #f5f7fa;
  --color-superficie: #ffffff;
  --color-texto: #20242a;
  --color-borde: #c9d1da;
  --radio: 0.75rem;
  --sombra: 0 0.5rem 1.5rem rgb(0 0 0 / 10%);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  color: var(--color-texto);
  background-color: var(--color-fondo);
  font-family: system-ui, sans-serif;
  line-height: 1.6;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

a {
  color: var(--color-principal);
}

a:hover {
  color: var(--color-principal-oscuro);
}

.contenedor {
  width: min(100% - 2rem, 75rem);
  margin-inline: auto;
}

.encabezado {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--color-superficie);
  border-bottom: 1px solid var(--color-borde);
}

.encabezado__contenido {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  min-height: 4.5rem;
}

.marca {
  color: var(--color-principal);
  font-size: 1.25rem;
  font-weight: 800;
  text-decoration: none;
}

.menu {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.menu a {
  text-decoration: none;
}

.menu a:hover {
  text-decoration: underline;
}

.hero {
  display: grid;
  place-items: center;
  min-height: 60vh;
  padding-block: 4rem;
}

.hero > div {
  max-width: 50rem;
  text-align: center;
}

.hero h1 {
  margin-block: 0.5rem 1rem;
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  line-height: 1.1;
}

.etiqueta {
  color: var(--color-principal);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.boton {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  border: 0;
  border-radius: 0.5rem;
  color: white;
  background-color: var(--color-principal);
  font: inherit;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.boton:hover {
  color: white;
  background-color: var(--color-principal-oscuro);
}

.boton:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}

section {
  padding-block: 3rem;
}

.rejilla {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.5rem;
}

.tarjeta {
  padding: 1.5rem;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  background-color: var(--color-superficie);
  box-shadow: var(--sombra);
}

.tarjeta h3 {
  margin-top: 0;
}

.formulario {
  display: grid;
  gap: 1rem;
  max-width: 40rem;
}

.formulario div {
  display: grid;
  gap: 0.375rem;
}

.formulario label {
  font-weight: 700;
}

.formulario input,
.formulario textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-borde);
  border-radius: 0.375rem;
  background-color: var(--color-superficie);
  font: inherit;
}

.formulario textarea {
  min-height: 10rem;
  resize: vertical;
}

.formulario input:focus-visible,
.formulario textarea:focus-visible {
  outline: 3px solid var(--color-principal);
  outline-offset: 2px;
}

.pie {
  padding-block: 2rem;
  color: white;
  background-color: var(--color-principal-oscuro);
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
  }
}
```

---

## Resumen de propiedades frecuentes

### Estructura y tamaño

| Propiedad | Descripción |
|---|---|
| `display` | Tipo de caja y sistema de diseño. |
| `width` | Ancho. |
| `height` | Alto. |
| `min-width` | Ancho mínimo. |
| `max-width` | Ancho máximo. |
| `min-height` | Alto mínimo. |
| `max-height` | Alto máximo. |
| `aspect-ratio` | Proporción entre ancho y alto. |
| `overflow` | Tratamiento del contenido desbordado. |
| `box-sizing` | Forma de calcular el tamaño de la caja. |

### Espaciado y borde

| Propiedad | Descripción |
|---|---|
| `margin` | Espacio exterior. |
| `padding` | Espacio interior. |
| `border` | Borde. |
| `border-radius` | Redondeo de esquinas. |
| `outline` | Contorno externo que no altera el tamaño. |
| `box-shadow` | Sombra de la caja. |

### Texto

| Propiedad | Descripción |
|---|---|
| `color` | Color del texto. |
| `font-family` | Familia tipográfica. |
| `font-size` | Tamaño del texto. |
| `font-weight` | Grosor. |
| `font-style` | Estilo. |
| `line-height` | Altura de línea. |
| `text-align` | Alineación. |
| `text-decoration` | Decoración. |
| `text-transform` | Transformación de mayúsculas y minúsculas. |
| `letter-spacing` | Separación entre caracteres. |
| `white-space` | Tratamiento de espacios. |
| `text-overflow` | Representación del desbordamiento textual. |

### Fondo

| Propiedad | Descripción |
|---|---|
| `background` | Propiedad abreviada de fondo. |
| `background-color` | Color de fondo. |
| `background-image` | Imagen o degradado. |
| `background-size` | Tamaño de la imagen de fondo. |
| `background-position` | Posición. |
| `background-repeat` | Repetición. |

### Posicionamiento

| Propiedad | Descripción |
|---|---|
| `position` | Método de posicionamiento. |
| `top` | Separación superior. |
| `right` | Separación derecha. |
| `bottom` | Separación inferior. |
| `left` | Separación izquierda. |
| `inset` | Abreviación de las separaciones. |
| `z-index` | Orden de apilamiento. |

### Flexbox

| Propiedad | Descripción |
|---|---|
| `display: flex` | Activa Flexbox. |
| `flex-direction` | Dirección principal. |
| `flex-wrap` | Permite múltiples líneas. |
| `justify-content` | Distribución en el eje principal. |
| `align-items` | Alineación transversal. |
| `gap` | Espacio entre elementos. |
| `flex` | Crecimiento, reducción y tamaño base. |
| `align-self` | Alineación individual. |
| `order` | Orden visual. |

### Grid

| Propiedad | Descripción |
|---|---|
| `display: grid` | Activa Grid. |
| `grid-template-columns` | Columnas. |
| `grid-template-rows` | Filas. |
| `grid-template-areas` | Áreas con nombre. |
| `grid-column` | Posición horizontal. |
| `grid-row` | Posición vertical. |
| `grid-area` | Área o posición combinada. |
| `gap` | Separación entre celdas. |
| `place-items` | Alineación de elementos. |

### Efectos

| Propiedad | Descripción |
|---|---|
| `opacity` | Transparencia. |
| `filter` | Filtros visuales. |
| `transform` | Traslación, rotación, escala o inclinación. |
| `transition` | Cambio progresivo de propiedades. |
| `animation` | Animación mediante `@keyframes`. |
| `cursor` | Apariencia del puntero. |

---

## Buenas prácticas

1. Utilizar clases reutilizables en lugar de depender excesivamente de identificadores.
2. Evitar selectores demasiado largos o específicos.
3. Mantener una nomenclatura consistente.
4. Usar `box-sizing: border-box`.
5. Diseñar primero para dispositivos pequeños.
6. Preferir unidades relativas para tipografía y espaciado.
7. Conservar indicadores de foco visibles.
8. Respetar `prefers-reduced-motion`.
9. Centralizar colores y medidas mediante variables CSS.
10. Revisar contraste, ampliación de texto y navegación con teclado.
11. Evitar `!important` salvo casos justificados.
12. Eliminar reglas no utilizadas.
13. Dividir el CSS por responsabilidades cuando el proyecto crezca.
14. Probar la interfaz en diferentes tamaños de pantalla.
15. Revisar compatibilidad antes de depender de características muy recientes.

---

## Relación entre archivos

```text
index.html
css/
└── estilos.css
```

En `index.html`:

```html
<link rel="stylesheet" href="css/estilos.css">
```

En `css/estilos.css`:

```css
body {
  margin: 0;
  font-family: system-ui, sans-serif;
}
```

