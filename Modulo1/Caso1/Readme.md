# Caso 1: Sitio web informativo para un laboratorio de robótica educativa

## 1. Contexto

El Laboratorio de Robótica Educativa **AulaBot** necesita un sitio web sencillo para presentar sus actividades, informar sobre los talleres disponibles y permitir que estudiantes interesados completen un formulario de inscripción o contacto.

Actualmente, el laboratorio no cuenta con una página web propia. La institución solicita desarrollar una primera versión estática utilizando únicamente:

- HTML5;
- CSS3;
- imágenes locales.

En esta primera etapa no se utilizarán JavaScript, bases de datos, frameworks, bibliotecas externas ni servicios de backend. Por esta razón, el formulario será solamente visual y no almacenará los datos ingresados.

---

## 2. Objetivo

Diseñar e implementar un sitio web informativo, semántico, accesible y adaptable a distintos tamaños de pantalla.

**El sitio debe demostrar el uso correcto de:**

- estructura semántica HTML5;
- encabezados y párrafos;
- enlaces y navegación;
- imágenes;
- listas;
- tarjetas informativas;
- tablas;
- formularios;
- selectores y propiedades CSS;
- modelo de caja;
- Flexbox;
- CSS Grid;
- diseño responsivo.

---

## 3. Resultado esperado

Al finalizar el caso, se debe obtener un sitio web que permita:

- presentar el Laboratorio AulaBot;
- explicar sus principales objetivos;
- mostrar los talleres disponibles;
- informar los horarios;
- incluir un formulario de inscripción;
- adaptarse a teléfonos, tabletas y computadores;
- mantener una estructura visual clara y coherente.

---

## 4. Estructura del proyecto

```text
aulabot/
├── index.html
├── styles.css
├── README.md
└── img/
    ├── logo-aulabot.png
    ├── laboratorio.jpg
    ├── robotica.jpg
    ├── programacion.jpg
    └── inteligencia-artificial.jpg
```

| Archivo o carpeta | Descripción |
|---|---|
| `index.html` | Contiene la estructura y el contenido del sitio. |
| `styles.css` | Contiene los estilos visuales de la página. |
| `README.md` | Describe el proyecto y su funcionamiento. |
| `img/` | Contiene las imágenes utilizadas en el sitio. |

---

## 5. Estructura general del sitio

El sitio debe contener:

1. Encabezado.
2. Menú de navegación.
3. Sección principal o *hero*.
4. Sección “Nosotros”.
5. Sección de talleres.
6. Tabla de horarios.
7. Formulario de inscripción.
8. Pie de página.

```html
<body>
  <header>
    <nav>
      <!-- Menú de navegación -->
    </nav>
  </header>

  <main>
    <section id="inicio">
      <!-- Presentación principal -->
    </section>

    <section id="nosotros">
      <!-- Información del laboratorio -->
    </section>

    <section id="talleres">
      <!-- Tarjetas de talleres -->
    </section>

    <section id="horarios">
      <!-- Tabla de horarios -->
    </section>

    <section id="inscripcion">
      <!-- Formulario -->
    </section>
  </main>

  <footer>
    <!-- Información de contacto -->
  </footer>
</body>
```

---

## 6. Tecnologías utilizadas

### HTML5

HTML5 se utiliza para definir la estructura y el significado del contenido. Algunas etiquetas utilizadas son:

- `<header>`;
- `<nav>`;
- `<main>`;
- `<section>`;
- `<article>`;
- `<figure>`;
- `<table>`;
- `<form>`;
- `<footer>`.

### CSS3

CSS se utiliza para definir la apariencia visual del sitio:

- colores;
- tipografías;
- márgenes;
- rellenos;
- bordes;
- tamaños;
- fondos;
- alineación;
- distribución;
- diseño adaptable.

---

# 7. ¿Qué es Flexbox?

**Flexbox**, abreviatura de **Flexible Box Layout**, es un sistema de diseño de CSS que permite organizar, alinear y distribuir elementos dentro de un contenedor flexible.

Flexbox trabaja principalmente en **una dimensión**:

- una fila;
- o una columna.

Es especialmente útil para:

- menús de navegación;
- encabezados;
- grupos de botones;
- alineación vertical;
- distribución de elementos;
- componentes que deben adaptarse al espacio disponible.

---

## 8. Contenedor e ítems flexibles

Para activar Flexbox se aplica `display: flex` al elemento contenedor.

### HTML

```html
<div class="contenedor-flex">
  <div>Elemento 1</div>
  <div>Elemento 2</div>
  <div>Elemento 3</div>
</div>
```

### CSS

```css
.contenedor-flex {
  display: flex;
}
```

En este ejemplo:

- `.contenedor-flex` es el **contenedor flexible**;
- los tres elementos `<div>` interiores son los **ítems flexibles**.

---

## 9. Ejes de Flexbox

Flexbox utiliza dos ejes.

### Eje principal

Es el eje sobre el que se distribuyen los elementos. Su dirección se controla con `flex-direction`.

### Eje transversal

Es perpendicular al eje principal.

Cuando se utiliza:

```css
flex-direction: row;
```

el eje principal es horizontal y el eje transversal es vertical.

Cuando se utiliza:

```css
flex-direction: column;
```

el eje principal es vertical y el eje transversal es horizontal.

---

## 10. Propiedades principales de Flexbox

### `display`

Activa Flexbox:

```css
.contenedor {
  display: flex;
}
```

### `flex-direction`

Define la dirección de los elementos:

```css
.contenedor {
  display: flex;
  flex-direction: row;
}
```

| Valor | Descripción |
|---|---|
| `row` | Organiza los elementos en una fila. |
| `row-reverse` | Organiza la fila en sentido inverso. |
| `column` | Organiza los elementos en una columna. |
| `column-reverse` | Organiza la columna en sentido inverso. |

### `justify-content`

Distribuye los elementos sobre el eje principal:

```css
.contenedor {
  display: flex;
  justify-content: space-between;
}
```

| Valor | Descripción |
|---|---|
| `flex-start` | Coloca los elementos al inicio. |
| `center` | Centra los elementos. |
| `flex-end` | Coloca los elementos al final. |
| `space-between` | Distribuye el espacio entre los elementos. |
| `space-around` | Agrega espacio alrededor. |
| `space-evenly` | Distribuye el espacio uniformemente. |

### `align-items`

Alinea los elementos en el eje transversal:

```css
.contenedor {
  display: flex;
  align-items: center;
}
```

| Valor | Descripción |
|---|---|
| `stretch` | Estira los elementos. |
| `flex-start` | Alinea al inicio. |
| `center` | Centra los elementos. |
| `flex-end` | Alinea al final. |
| `baseline` | Alinea según la línea base del texto. |

### `gap`

Define el espacio entre los elementos:

```css
.contenedor {
  display: flex;
  gap: 1rem;
}
```

### `flex-wrap`

Permite que los elementos pasen a una nueva línea:

```css
.contenedor {
  display: flex;
  flex-wrap: wrap;
}
```

| Valor | Descripción |
|---|---|
| `nowrap` | Mantiene todo en una sola línea. |
| `wrap` | Permite pasar a otra línea. |
| `wrap-reverse` | Crea nuevas líneas en sentido inverso. |

---

## 11. Ejemplo de Flexbox en AulaBot

### HTML

```html
<header class="encabezado">
  <div class="contenedor encabezado__contenido">
    <a class="marca" href="#inicio">
      AulaBot
    </a>

    <nav aria-label="Navegación principal">
      <ul class="menu">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#talleres">Talleres</a></li>
        <li><a href="#horarios">Horarios</a></li>
        <li><a href="#inscripcion">Inscripción</a></li>
      </ul>
    </nav>
  </div>
</header>
```

### CSS

```css
.encabezado__contenido {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.menu {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
}
```

La clase `.encabezado__contenido` distribuye la marca y el menú en una misma fila. La clase `.menu` distribuye horizontalmente los enlaces.

---

## 12. Flexbox en pantallas pequeñas

```css
@media (max-width: 48rem) {
  .encabezado__contenido {
    flex-direction: column;
    align-items: flex-start;
  }

  .menu {
    width: 100%;
    flex-direction: column;
  }
}
```

En pantallas pequeñas, el encabezado y el menú cambian de fila a columna.

---

## 13. ¿Qué es CSS Grid?

CSS Grid es un sistema de diseño que organiza elementos mediante filas y columnas.

```css
.rejilla-talleres {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(17rem, 1fr));
  gap: 1.5rem;
}
```

### Diferencia entre Flexbox y Grid

| Característica | Flexbox | CSS Grid |
|---|---|---|
| Dimensión | Una dimensión | Dos dimensiones |
| Organización | Fila o columna | Filas y columnas |
| Uso frecuente | Menús, botones y alineación | Tarjetas, galerías y diseños generales |
| Ejemplo en AulaBot | Encabezado y menú | Rejilla de talleres |

En este proyecto se recomienda:

- Flexbox para el encabezado;
- Flexbox para el menú;
- Flexbox para los botones del formulario;
- CSS Grid para las tarjetas de talleres.

---

## 14. Modelo de caja

Todo elemento HTML se representa como una caja formada por:

1. contenido;
2. relleno o `padding`;
3. borde;
4. margen.

```css
.tarjeta {
  padding: 1.5rem;
  border: 1px solid #cccccc;
  margin-bottom: 1rem;
}
```

Se recomienda utilizar:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Con `border-box`, el tamaño declarado incluye el relleno y el borde.

---

## 15. Diseño responsivo

Un sitio responsivo se adapta a teléfonos, tabletas y computadores.

Un sitio responsivo debe utilizar:

- imágenes fluidas;
- unidades relativas;
- contenedores con ancho máximo;
- Flexbox;
- CSS Grid;
- media queries.

```css
img {
  display: block;
  max-width: 100%;
  height: auto;
}
```

```css
.contenedor {
  width: min(100% - 2rem, 75rem);
  margin-inline: auto;
}
```



---


## 16. ¿Qué son las media queries?

Las **media queries** son reglas de CSS que permiten aplicar estilos solamente cuando se cumple una condición relacionada con el dispositivo o la ventana del navegador.

Su sintaxis general es:

```css
@media (condición) {
  /* Reglas que se aplican si la condición se cumple */
}
```

Ejemplo:

```css
@media (min-width: 48rem) {
  .hero__contenido {
    grid-template-columns: 1fr 1fr;
  }
}
```

La regla anterior indica que, cuando la ventana tenga al menos `48rem`, la sección principal se organizará en dos columnas.

### Enfoque mobile first

En el enfoque **mobile first**, los estilos iniciales se diseñan para pantallas pequeñas. Después se agregan media queries con `min-width` para ampliar progresivamente el diseño.

```css
/* Diseño inicial: teléfono */
.hero__contenido {
  display: grid;
  grid-template-columns: 1fr;
}

/* Desde una tableta o pantalla mediana */
@media (min-width: 48rem) {
  .hero__contenido {
    grid-template-columns: 1fr 1fr;
  }
}
```

Este enfoque suele facilitar:

- código más simple;
- carga progresiva;
- adaptación a pantallas pequeñas;
- mantenimiento del diseño.

### `min-width`

Aplica estilos desde un ancho mínimo hacia pantallas mayores.

```css
@media (min-width: 48rem) {
  .menu {
    flex-direction: row;
  }
}
```

### `max-width`

Aplica estilos hasta un ancho máximo.

```css
@media (max-width: 47.99rem) {
  .menu {
    flex-direction: column;
  }
}
```

Se utiliza `47.99rem` para evitar que esta regla coincida exactamente con otra que comience en `48rem`.

### Rango de ancho

```css
@media (min-width: 40rem) and (max-width: 63.99rem) {
  .rejilla-talleres {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Orientación de pantalla

```css
@media (orientation: landscape) {
  .hero {
    min-height: 70vh;
  }
}
```

- `portrait`: orientación vertical;
- `landscape`: orientación horizontal.

### Preferencia de movimiento reducido

Algunas personas configuran el sistema para reducir animaciones.

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms;
    transition-duration: 0.01ms;
  }
}
```

### Preferencia de tema oscuro

```css
@media (prefers-color-scheme: dark) {
  body {
    color: #f4f4f4;
    background-color: #151515;
  }
}
```

### Impresión

```css
@media print {
  nav,
  .formulario__acciones {
    display: none;
  }

  body {
    color: black;
    background: white;
  }
}
```

### Puntos de quiebre orientativos

No existe un conjunto universal y obligatorio de puntos de quiebre. Deben elegirse observando cuándo el contenido deja de verse correctamente.

La siguiente escala puede utilizarse como referencia inicial:

| Tipo de pantalla | Ancho orientativo | Equivalencia aproximada |
|---|---:|---:|
| Teléfono pequeño | Menos de `30rem` | Menos de 480 px |
| Teléfono grande | Desde `30rem` | Desde 480 px |
| Tableta pequeña | Desde `40rem` | Desde 640 px |
| Tableta | Desde `48rem` | Desde 768 px |
| Computador portátil | Desde `64rem` | Desde 1024 px |
| Escritorio | Desde `80rem` | Desde 1280 px |
| Pantalla amplia | Desde `90rem` | Desde 1440 px |

La equivalencia supone un tamaño inicial de fuente de aproximadamente `16px`:

```text
1rem ≈ 16px
48rem ≈ 768px
64rem ≈ 1024px
```

Los puntos de quiebre del proyecto AulaBot pueden reducirse a tres niveles:

```css
/* Base: teléfono */

/* Tableta */
@media (min-width: 48rem) {
  /* Cambios de distribución */
}

/* Escritorio */
@media (min-width: 64rem) {
  /* Más columnas o mayor separación */
}
```

### Media queries aplicadas a AulaBot

```css
/* Base: teléfonos */
.encabezado__contenido {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.menu {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.hero__contenido {
  display: grid;
  grid-template-columns: 1fr;
}

/* Desde 48rem: tabletas */
@media (min-width: 48rem) {
  .encabezado__contenido {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .menu {
    width: auto;
    flex-direction: row;
  }

  .hero__contenido {
    grid-template-columns: 1fr 1fr;
  }
}

/* Desde 64rem: computadores */
@media (min-width: 64rem) {
  .rejilla-talleres {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 17. Unidades de medida en CSS

CSS permite utilizar unidades absolutas y relativas.

### Unidades absolutas

Las unidades absolutas representan una medida definida.

| Unidad | Descripción | Uso habitual |
|---|---|---|
| `px` | Píxel CSS | Bordes, detalles y algunos tamaños mínimos |
| `pt` | Punto tipográfico | Documentos destinados a impresión |
| `cm` | Centímetros | Impresión |
| `mm` | Milímetros | Impresión |
| `in` | Pulgadas | Impresión |

Ejemplo:

```css
.tarjeta {
  border: 1px solid #cccccc;
}
```

Aunque `px` se considera una unidad absoluta en CSS, representa un píxel de referencia y no necesariamente un píxel físico de la pantalla.

### Unidades relativas

Las unidades relativas dependen de otro valor, como la fuente, el contenedor o la ventana.

| Unidad | Se calcula respecto de | Uso recomendado |
|---|---|---|
| `%` | Tamaño del elemento de referencia | Anchos y distribuciones fluidas |
| `em` | Tamaño de fuente del elemento o contexto | Componentes escalables |
| `rem` | Tamaño de fuente del elemento raíz `<html>` | Tipografía y espaciado general |
| `vw` | 1 % del ancho de la ventana | Dimensiones relacionadas con la pantalla |
| `vh` | 1 % del alto de la ventana | Alturas de secciones |
| `dvh` | 1 % del alto dinámico de la ventana | Altura móvil considerando barras del navegador |
| `vmin` | 1 % de la dimensión menor | Escalado proporcional |
| `vmax` | 1 % de la dimensión mayor | Escalado proporcional |
| `ch` | Ancho aproximado del carácter `0` | Controlar longitud de lectura |
| `fr` | Fracción del espacio disponible | Columnas y filas de CSS Grid |
| `lh` | Altura de línea del elemento | Espaciado relacionado con el texto |

### Unidad `rem`

`rem` se calcula a partir del tamaño de fuente del elemento raíz.

```css
html {
  font-size: 100%;
}

body {
  font-size: 1rem;
}
```

Con la configuración habitual del navegador:

```text
1rem ≈ 16px
0.5rem ≈ 8px
1.5rem ≈ 24px
2rem ≈ 32px
```

Ejemplo:

```css
.tarjeta {
  padding: 1.5rem;
  border-radius: 0.75rem;
}
```

`rem` es recomendable para:

- tamaños de fuente;
- márgenes;
- rellenos;
- separaciones;
- anchos máximos;
- puntos de quiebre.

### Unidad `em`

`em` depende del tamaño de fuente del elemento o de su contexto.

```css
.boton {
  font-size: 1rem;
  padding: 0.75em 1.25em;
}
```

Si aumenta el tamaño de fuente del botón, su relleno también aumenta proporcionalmente.

`em` es útil para construir componentes que escalen como una unidad.

### Porcentajes

```css
.imagen {
  width: 100%;
}
```

El ancho ocupa el 100 % del espacio disponible dentro del contenedor.

### Unidades de ventana

```css
.hero {
  min-height: 70vh;
}
```

`70vh` representa el 70 % del alto de la ventana.

En dispositivos móviles puede utilizarse:

```css
.hero {
  min-height: 70dvh;
}
```

`dvh` se adapta al espacio visible cuando aparecen o desaparecen las barras del navegador.

### Unidad `ch`

```css
p {
  max-width: 65ch;
}
```

Esta unidad es útil para limitar la longitud de una línea de texto y mejorar la lectura.

### Unidad `fr`

Se utiliza en CSS Grid:

```css
.hero__contenido {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

Cada columna recibe una fracción igual del espacio disponible.

También se pueden combinar proporciones:

```css
.nosotros__contenido {
  grid-template-columns: 1.2fr 0.8fr;
}
```

### Funciones para medidas adaptables

#### `min()`

Escoge el valor menor:

```css
.contenedor {
  width: min(100% - 2rem, 75rem);
}
```

#### `max()`

Escoge el valor mayor:

```css
.seccion {
  padding-inline: max(1rem, 4vw);
}
```

#### `clamp()`

Define un mínimo, un valor adaptable y un máximo:

```css
.hero h1 {
  font-size: clamp(2.25rem, 6vw, 4.75rem);
}
```

Esto significa:

- tamaño mínimo: `2.25rem`;
- tamaño adaptable: `6vw`;
- tamaño máximo: `4.75rem`.

#### `calc()`

Permite realizar cálculos:

```css
main {
  min-height: calc(100vh - 5rem);
}
```

---


## 18. Formulario

El formulario incluye:

- nombre;
- correo;
- edad;
- taller;
- modalidad;
- conocimientos previos;
- comentarios;
- aceptación de condiciones;
- botones de envío y limpieza.

Como el proyecto utiliza únicamente HTML y CSS, el formulario no almacenará los datos. Para procesarlos se necesitaría posteriormente un backend, una API o un servicio externo.

---

## 19. Conclusión

Este caso permite aplicar los fundamentos del desarrollo web mediante un proyecto construido exclusivamente con HTML5 y CSS3.

Flexbox permite organizar y alinear elementos de forma flexible en una fila o columna. CSS Grid facilita la construcción de estructuras con filas y columnas.
