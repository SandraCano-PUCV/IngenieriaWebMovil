# Referencia de etiquetas y elementos HTML

> Guía de consulta en español con las etiquetas HTML actuales, su propósito, elementos experimentales, atributos globales y alternativas para etiquetas obsoletas.

## Índice

1. [Conceptos básicos](#conceptos-basicos)
2. [Estructura mínima de un documento](#estructura-minima-de-un-documento)
3. [Referencia de elementos por categoría](#referencia-de-elementos-por-categoria)
4. [Elementos vacíos](#elementos-vacios)
5. [Atributos globales](#atributos-globales)
6. [Tipos de input](#tipos-de-input)
7. [Comentarios y entidades](#comentarios-y-entidades)
8. [Etiquetas obsoletas](#etiquetas-obsoletas)
9. [Buenas prácticas](#buenas-practicas)
10. [Ejemplo completo](#ejemplo-completo)
11. [Fuentes](#fuentes)

## Conceptos básicos

- **Etiqueta:** marca escrita entre signos `<` y `>`, por ejemplo `<p>` o `</p>`.
- **Elemento:** conjunto formado por la etiqueta de apertura, el contenido y la etiqueta de cierre: `<p>Texto</p>`.
- **Atributo:** información adicional incluida en la etiqueta de apertura: `<a href="pagina.html">Enlace</a>`.
- **Elemento vacío:** elemento que no contiene contenido ni etiqueta de cierre, como `<img>` o `<br>`.
- **`<!DOCTYPE html>`:** declaración que activa el modo estándar de HTML; no es una etiqueta HTML.

### Anatomía de un elemento

```html
<a href="https://ejemplo.com" target="_blank">Visitar sitio</a>
```

| Parte | Contenido |
|---|---|
| Etiqueta de apertura | `<a ...>` |
| Atributos | `href` y `target` |
| Contenido | `Visitar sitio` |
| Etiqueta de cierre | `</a>` |

## Estructura mínima de un documento

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi página HTML</title>
</head>
<body>
  <h1>Hola, mundo</h1>
  <p>Este es un documento HTML básico.</p>
</body>
</html>
```

## Referencia de elementos por categoría

### 1. Raíz y metadatos del documento

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<html>...</html>` | Elemento raíz de todo documento HTML. Contiene `<head>` y `<body>`. | Estándar |
| `<head>...</head>` | Contiene metadatos y recursos que no forman parte del contenido visual principal. | Estándar |
| `<title>...</title>` | Define el título mostrado en la pestaña o ventana del navegador. | Estándar |
| `<base>` | Define una URL base para resolver las URL relativas del documento. Solo debe existir uno. | Estándar; vacío |
| `<link>` | Relaciona el documento con un recurso externo, normalmente una hoja CSS, un icono o un recurso precargado. | Estándar; vacío |
| `<meta>` | Declara metadatos como codificación, descripción, autor o configuración de la ventana gráfica. | Estándar; vacío |
| `<style>...</style>` | Incluye reglas CSS directamente dentro del documento. | Estándar |
| `<body>...</body>` | Contiene todo el contenido visible e interactivo de la página. | Estándar |

### 2. Estructura semántica y secciones

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<address>...</address>` | Representa información de contacto relacionada con el artículo o documento más cercano. | Estándar |
| `<article>...</article>` | Contenido autónomo y reutilizable, como una noticia, publicación, comentario o tarjeta de producto. | Estándar |
| `<aside>...</aside>` | Contenido complementario o indirectamente relacionado, como una barra lateral. | Estándar |
| `<footer>...</footer>` | Pie de una página o sección; suele incluir autoría, enlaces relacionados o derechos. | Estándar |
| `<header>...</header>` | Cabecera introductoria de una página o sección; puede contener logo, título o navegación. | Estándar |
| `<h1>...</h1>` | Encabezado de nivel 1, normalmente el título principal del contenido. | Estándar |
| `<h2>...</h2>` | Encabezado de nivel 2 para una sección subordinada a un `<h1>`. | Estándar |
| `<h3>...</h3>` | Encabezado de nivel 3 para una subsección. | Estándar |
| `<h4>...</h4>` | Encabezado de nivel 4. | Estándar |
| `<h5>...</h5>` | Encabezado de nivel 5. | Estándar |
| `<h6>...</h6>` | Encabezado de nivel 6, el nivel jerárquico más bajo. | Estándar |
| `<hgroup>...</hgroup>` | Agrupa un encabezado con un subtítulo, título alternativo o lema. | Estándar |
| `<main>...</main>` | Representa el contenido principal y dominante del documento. | Estándar |
| `<nav>...</nav>` | Agrupa enlaces principales de navegación. | Estándar |
| `<search>...</search>` | Contenedor semántico para controles o contenido de búsqueda y filtrado. | Estándar reciente |
| `<section>...</section>` | Sección temática genérica del documento, normalmente identificada por un encabezado. | Estándar |

### 3. Contenido de texto y agrupación

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<blockquote>...</blockquote>` | Representa una cita extensa tomada de otra fuente. | Estándar |
| `<dd>...</dd>` | Descripción, definición o valor de un término `<dt>` dentro de una lista `<dl>`. | Estándar |
| `<div>...</div>` | Contenedor genérico de bloque sin significado semántico propio. | Estándar |
| `<dl>...</dl>` | Lista de descripciones formada por términos `<dt>` y descripciones `<dd>`. | Estándar |
| `<dt>...</dt>` | Término o nombre dentro de una lista de descripciones `<dl>`. | Estándar |
| `<figcaption>...</figcaption>` | Leyenda o descripción de una figura. | Estándar |
| `<figure>...</figure>` | Contenido autónomo, como una imagen, gráfico, código o tabla, con leyenda opcional. | Estándar |
| `<hr>` | Separación temática entre bloques o cambios de tema. | Estándar; vacío |
| `<li>...</li>` | Elemento de una lista `<ul>`, `<ol>` o `<menu>`. | Estándar |
| `<menu>...</menu>` | Lista semántica no ordenada de elementos o comandos; se comporta de forma similar a `<ul>`. | Estándar |
| `<ol>...</ol>` | Lista ordenada, normalmente numerada. | Estándar |
| `<p>...</p>` | Representa un párrafo. | Estándar |
| `<pre>...</pre>` | Texto preformateado que conserva espacios y saltos de línea. | Estándar |
| `<ul>...</ul>` | Lista no ordenada, normalmente con viñetas. | Estándar |

### 4. Semántica de texto en línea

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<a>...</a>` | Crea un hipervínculo mediante el atributo `href`. | Estándar |
| `<abbr>...</abbr>` | Representa una abreviatura o sigla; `title` puede mostrar su significado completo. | Estándar |
| `<b>...</b>` | Llama visualmente la atención sobre texto sin indicar importancia especial. | Estándar |
| `<bdi>...</bdi>` | Aísla un fragmento cuya dirección de escritura puede ser distinta de la del texto circundante. | Estándar |
| `<bdo>...</bdo>` | Fuerza la dirección del texto mediante `dir="ltr"` o `dir="rtl"`. | Estándar |
| `<br>` | Inserta un salto de línea. | Estándar; vacío |
| `<cite>...</cite>` | Identifica el título de una obra citada. | Estándar |
| `<code>...</code>` | Representa un fragmento corto de código informático. | Estándar |
| `<data>...</data>` | Asocia texto visible con un valor legible por máquinas mediante `value`. | Estándar |
| `<dfn>...</dfn>` | Marca el término que se está definiendo. | Estándar |
| `<em>...</em>` | Indica énfasis semántico; normalmente se muestra en cursiva. | Estándar |
| `<i>...</i>` | Texto diferenciado por voz, idioma, término técnico o convención, sin énfasis fuerte. | Estándar |
| `<kbd>...</kbd>` | Representa una entrada del usuario, como una tecla o comando. | Estándar |
| `<mark>...</mark>` | Resalta un fragmento relevante dentro del contexto. | Estándar |
| `<q>...</q>` | Representa una cita breve en línea. | Estándar |
| `<rp>...</rp>` | Proporciona paréntesis de respaldo para anotaciones ruby en navegadores sin soporte. | Estándar |
| `<rt>...</rt>` | Contiene la pronunciación o anotación de texto ruby. | Estándar |
| `<ruby>...</ruby>` | Representa anotaciones tipográficas usadas principalmente en escrituras asiáticas. | Estándar |
| `<s>...</s>` | Indica contenido que ya no es válido o relevante, sin representar una edición documental. | Estándar |
| `<samp>...</samp>` | Representa la salida de ejemplo de un programa o sistema. | Estándar |
| `<small>...</small>` | Representa comentarios secundarios, aclaraciones o letra pequeña. | Estándar |
| `<span>...</span>` | Contenedor genérico en línea sin significado semántico propio. | Estándar |
| `<strong>...</strong>` | Indica gran importancia, gravedad o urgencia. | Estándar |
| `<sub>...</sub>` | Muestra texto como subíndice. | Estándar |
| `<sup>...</sup>` | Muestra texto como superíndice. | Estándar |
| `<time>...</time>` | Representa una fecha, hora, duración o período; `datetime` permite un valor legible por máquinas. | Estándar |
| `<u>...</u>` | Marca texto con una anotación no textual; no debe usarse solo para decorar. | Estándar |
| `<var>...</var>` | Representa una variable matemática o de programación. | Estándar |
| `<wbr>` | Indica un punto en el que el navegador puede dividir una palabra o cadena larga. | Estándar; vacío |

### 5. Imágenes y contenido multimedia

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<area>` | Define una zona interactiva dentro de un mapa de imagen. | Estándar; vacío |
| `<audio>...</audio>` | Inserta audio y puede contener varios elementos `<source>` y `<track>`. | Estándar |
| `<img>` | Inserta una imagen. Debe incluir `src` y normalmente un texto alternativo `alt`. | Estándar; vacío |
| `<map>...</map>` | Define un mapa de imagen que contiene zonas `<area>`. | Estándar |
| `<track>` | Añade subtítulos, descripciones, capítulos u otros datos temporizados a audio o video. | Estándar; vacío |
| `<video>...</video>` | Inserta un reproductor de video. | Estándar |

### 6. Contenido incrustado

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<embed>` | Incrusta contenido externo en un punto del documento. | Estándar; vacío |
| `<fencedframe>...</fencedframe>` | Contexto de navegación incrustado con mayores restricciones de privacidad que un `<iframe>`. | Experimental |
| `<iframe>...</iframe>` | Incrusta otra página HTML dentro del documento actual. | Estándar |
| `<object>...</object>` | Incrusta un recurso externo que puede tratarse como imagen, documento u objeto interactivo. | Estándar |
| `<picture>...</picture>` | Ofrece versiones alternativas de una imagen según formato, tamaño o dispositivo. | Estándar |
| `<source>` | Define una fuente alternativa para `<picture>`, `<audio>` o `<video>`. | Estándar; vacío |

### 7. SVG y MathML dentro de HTML

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<svg>...</svg>` | Inserta gráficos vectoriales SVG directamente en el documento HTML. | Estándar SVG integrado |
| `<math>...</math>` | Inserta una expresión MathML para representar contenido matemático. | Estándar MathML integrado |

### 8. Scripts y gráficos programables

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<canvas>...</canvas>` | Superficie de dibujo controlada mediante JavaScript, Canvas API o WebGL. | Estándar |
| `<noscript>...</noscript>` | Contenido alternativo cuando JavaScript está desactivado o no es compatible. | Estándar |
| `<script>...</script>` | Inserta o enlaza código ejecutable o datos, normalmente JavaScript o JSON. | Estándar |

### 9. Cambios y ediciones

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<del>...</del>` | Indica contenido eliminado; puede registrar fecha y fuente mediante atributos. | Estándar |
| `<ins>...</ins>` | Indica contenido agregado al documento. | Estándar |

### 10. Tablas

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<caption>...</caption>` | Título o descripción de una tabla. | Estándar |
| `<col>` | Define propiedades para una o más columnas dentro de `<colgroup>`. | Estándar; vacío |
| `<colgroup>...</colgroup>` | Agrupa columnas de una tabla. | Estándar |
| `<table>...</table>` | Representa datos tabulares organizados en filas y columnas. | Estándar |
| `<tbody>...</tbody>` | Agrupa las filas que forman el cuerpo principal de una tabla. | Estándar |
| `<td>...</td>` | Celda de datos dentro de una fila `<tr>`. | Estándar |
| `<tfoot>...</tfoot>` | Agrupa las filas del pie o resumen de una tabla. | Estándar |
| `<th>...</th>` | Celda de encabezado; `scope` ayuda a relacionarla con filas o columnas. | Estándar |
| `<thead>...</thead>` | Agrupa las filas de encabezado de una tabla. | Estándar |
| `<tr>...</tr>` | Representa una fila de la tabla. | Estándar |

### 11. Formularios

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<button>...</button>` | Botón que puede enviar, restablecer o ejecutar una acción. | Estándar |
| `<datalist>...</datalist>` | Lista de sugerencias para un control `<input>` asociado mediante `list`. | Estándar; soporte variable |
| `<fieldset>...</fieldset>` | Agrupa controles y etiquetas relacionados dentro de un formulario. | Estándar |
| `<form>...</form>` | Sección que contiene controles para recopilar y enviar información. | Estándar |
| `<input>` | Control de entrada cuyo comportamiento depende del atributo `type`. | Estándar; vacío |
| `<label>...</label>` | Etiqueta accesible de un control; se relaciona mediante `for` e `id`. | Estándar |
| `<legend>...</legend>` | Título de un grupo `<fieldset>`. | Estándar |
| `<meter>...</meter>` | Valor escalar dentro de un intervalo conocido, como nivel o puntuación. | Estándar |
| `<optgroup>...</optgroup>` | Agrupa opciones relacionadas dentro de `<select>`. | Estándar |
| `<option>...</option>` | Opción disponible dentro de `<select>`, `<optgroup>` o `<datalist>`. | Estándar |
| `<output>...</output>` | Muestra el resultado de un cálculo o acción del usuario. | Estándar |
| `<progress>...</progress>` | Indica el progreso de una tarea. | Estándar |
| `<select>...</select>` | Control para seleccionar una o varias opciones. | Estándar |
| `<selectedcontent>...</selectedcontent>` | Muestra el contenido de la opción seleccionada en un `<select>` personalizable. | Estándar reciente; soporte limitado |
| `<textarea>...</textarea>` | Control de entrada de texto de varias líneas. | Estándar |

### 12. Elementos interactivos

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<details>...</details>` | Panel desplegable cuyo contenido puede mostrarse u ocultarse. | Estándar |
| `<dialog>...</dialog>` | Cuadro de diálogo, alerta o ventana modal/no modal. | Estándar |
| `<geolocation>...</geolocation>` | Control para solicitar al usuario que comparta su ubicación. | Experimental |
| `<summary>...</summary>` | Título visible y activador de un elemento `<details>`. | Estándar |

### 13. Web Components y plantillas

| Etiqueta o sintaxis | Descripción | Estado |
|---|---|---|
| `<slot>...</slot>` | Punto de inserción dentro del Shadow DOM de un componente web. | Estándar |
| `<template>...</template>` | Almacena HTML que no se renderiza inmediatamente y puede clonarse con JavaScript. | Estándar |

**Total documentado en las tablas anteriores:** 117 elementos o sintaxis de elementos.

## Elementos vacíos

Los siguientes elementos no pueden contener contenido y no usan etiqueta de cierre:

`<area>`, `<base>`, `<br>`, `<col>`, `<embed>`, `<hr>`, `<img>`, `<input>`, `<link>`, `<meta>`, `<source>`, `<track>`, `<wbr>`.

Ejemplo correcto:

```html
<img src="robot.png" alt="Robot educativo">
<br>
<input type="text" name="nombre">
```

> En HTML puede aparecer `<img />`, pero la barra final no es necesaria. La sintaxis recomendada y habitual es `<img>`.

## Atributos globales

Estos atributos pueden utilizarse en la mayoría de los elementos HTML:

| Atributo | Descripción |
|---|---|
| `id` | Identificador único del elemento dentro del documento. |
| `class` | Una o varias clases utilizadas por CSS y JavaScript. |
| `style` | Reglas CSS en línea. Conviene preferir hojas de estilo externas. |
| `title` | Información adicional que puede mostrarse como ayuda emergente. |
| `lang` | Idioma del contenido, por ejemplo `es`, `es-CL` o `en`. |
| `dir` | Dirección del texto: `ltr`, `rtl` o `auto`. |
| `hidden` | Oculta o marca el elemento como no relevante. |
| `tabindex` | Controla si el elemento puede recibir foco y su orden de navegación. |
| `data-*` | Almacena datos personalizados accesibles desde JavaScript. |
| `contenteditable` | Permite editar el contenido directamente en la página. |
| `draggable` | Indica si el elemento puede arrastrarse. |
| `spellcheck` | Activa o desactiva la revisión ortográfica. |
| `translate` | Indica si el contenido debe traducirse. |
| `inert` | Desactiva interacción y foco en el elemento y sus descendientes. |
| `role` | Define un rol de accesibilidad ARIA cuando la semántica nativa no es suficiente. |
| `aria-*` | Atributos de accesibilidad. Deben complementar, no reemplazar, el HTML semántico. |

Ejemplo:

```html
<section id="presentacion" class="tarjeta" lang="es-CL" data-modulo="1">
  <h2>Presentación</h2>
</section>
```

## Tipos de input

El atributo `type` cambia el comportamiento de `<input>`:

| Tipo | Uso |
|---|---|
| `text` | Texto de una línea. |
| `password` | Texto oculto para contraseñas. |
| `email` | Dirección de correo electrónico. |
| `number` | Número con límites y pasos opcionales. |
| `tel` | Número telefónico. |
| `url` | Dirección URL. |
| `search` | Campo destinado a búsquedas. |
| `date` | Fecha. |
| `time` | Hora. |
| `datetime-local` | Fecha y hora local. |
| `month` | Mes y año. |
| `week` | Semana y año. |
| `color` | Selector de color. |
| `range` | Control deslizante para un intervalo. |
| `checkbox` | Casilla de selección independiente. |
| `radio` | Opción exclusiva dentro de un grupo. |
| `file` | Selección de archivos. |
| `hidden` | Valor no visible enviado con el formulario. |
| `submit` | Botón para enviar el formulario. |
| `reset` | Botón para restablecer los controles. |
| `button` | Botón sin comportamiento de envío predeterminado. |
| `image` | Botón de envío representado por una imagen. |

Ejemplo accesible:

```html
<form action="/registro" method="post">
  <label for="correo">Correo electrónico</label>
  <input id="correo" name="correo" type="email" required autocomplete="email">

  <button type="submit">Registrar</button>
</form>
```

## Comentarios y entidades

### Comentarios

```html
<!-- Este comentario no aparece visualmente en la página -->
```

### Entidades de caracteres frecuentes

| Entidad | Resultado | Uso |
|---|---|---|
| `&lt;` | `<` | Signo menor que |
| `&gt;` | `>` | Signo mayor que |
| `&amp;` | `&` | Ampersand |
| `&quot;` | `"` | Comillas dobles |
| `&apos;` | `'` | Apóstrofo |
| `&nbsp;` | espacio no separable | Evita un salto de línea en ese espacio |
| `&copy;` | `©` | Símbolo de copyright |
| `&reg;` | `®` | Marca registrada |

Para mostrar código HTML como texto, se deben escapar los signos `<` y `>`:

```html
&lt;p&gt;Hola&lt;/p&gt;
```

## Etiquetas obsoletas

> No deben utilizarse en proyectos nuevos. Se incluyen solamente para reconocer código antiguo.

| Etiqueta obsoleta | Alternativa recomendada |
|---|---|
| `<acronym>` | Usar `<abbr>`. |
| `<big>` | Usar CSS, por ejemplo `font-size`. |
| `<center>` | Usar CSS, por ejemplo `text-align: center` o técnicas de diseño. |
| `<content>` | Usar `<slot>` en Web Components. |
| `<dir>` | Usar `<ul>`. |
| `<font>` | Usar CSS para tipografía, color y tamaño. |
| `<frame>` | No usar marcos; emplear diseño moderno o, cuando corresponda, `<iframe>`. |
| `<frameset>` | Usar estructura HTML y CSS moderna. |
| `<image>` | Usar `<img>`. |
| `<marquee>` | Usar CSS o animaciones accesibles; evitar movimiento innecesario. |
| `<menuitem>` | Usar botones, enlaces y menús accesibles. |
| `<nobr>` | Usar CSS `white-space: nowrap` solo cuando sea necesario. |
| `<noembed>` | Usar contenido alternativo dentro de `<object>` o una solución moderna. |
| `<noframes>` | Eliminar junto con la estructura basada en marcos. |
| `<param>` | Ya no se recomienda; configurar el recurso mediante APIs o atributos actuales. |
| `<plaintext>` | Usar `<pre><code>...</code></pre>` escapando caracteres especiales. |
| `<rb>` | Utilizar la estructura actual de `<ruby>` y `<rt>`. |
| `<rtc>` | Utilizar la estructura actual de `<ruby>` y `<rt>`. |
| `<shadow>` | Usar `<slot>` y Shadow DOM actual. |
| `<strike>` | Usar `<s>` o `<del>`, según el significado. |
| `<tt>` | Usar `<code>`, `<kbd>`, `<samp>` o CSS, según el significado. |
| `<xmp>` | Usar `<pre><code>...</code></pre>` escapando el HTML. |

## Buenas prácticas

1. Utilizar elementos semánticos como `<header>`, `<main>`, `<nav>`, `<section>` y `<footer>` antes que depender únicamente de `<div>`.
2. Mantener una jerarquía coherente de encabezados.
3. Escribir un atributo `alt` significativo en imágenes informativas; usar `alt=""` en imágenes puramente decorativas.
4. Asociar cada control de formulario con un `<label>`.
5. Usar `<button>` para acciones y `<a>` para navegación.
6. Separar estructura, presentación y comportamiento: HTML, CSS y JavaScript.
7. No usar etiquetas obsoletas ni atributos de presentación antiguos.
8. Declarar el idioma con `lang`, la codificación UTF-8 y la etiqueta `viewport`.
9. Validar el documento y comprobar la navegación con teclado.
10. Preferir la semántica nativa de HTML antes de añadir roles ARIA.

## Ejemplo completo

```html
<!DOCTYPE html>
<html lang="es-CL">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Ejemplo de una página HTML semántica">
  <title>Curso de HTML</title>
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <header>
    <h1>Curso de HTML</h1>
    <nav aria-label="Navegación principal">
      <ul>
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#contenidos">Contenidos</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  </header>

  <main id="inicio">
    <article>
      <header>
        <h2>Introducción a HTML</h2>
        <p>Publicado el <time datetime="2026-07-29">29 de julio de 2026</time>.</p>
      </header>

      <section id="contenidos">
        <h3>¿Qué es HTML?</h3>
        <p>HTML define la estructura y el significado del contenido de una página web.</p>

        <figure>
          <img src="estructura-html.png" alt="Estructura básica de un documento HTML">
          <figcaption>Estructura general de una página HTML.</figcaption>
        </figure>
      </section>
    </article>

    <aside aria-labelledby="recursos">
      <h2 id="recursos">Recursos relacionados</h2>
      <ul>
        <li><a href="css.html">Introducción a CSS</a></li>
        <li><a href="javascript.html">Introducción a JavaScript</a></li>
      </ul>
    </aside>
  </main>

  <footer id="contacto">
    <address>
      Contacto: <a href="mailto:docencia@ejemplo.cl">docencia@ejemplo.cl</a>
    </address>
    <p>&copy; 2026 Curso de HTML</p>
  </footer>

  <script src="app.js" defer></script>
</body>
</html>
```

## Fuentes

- MDN Web Docs, **Referencia de elementos HTML**.
- WHATWG, **HTML Living Standard**.

> HTML es un estándar vivo. Los elementos experimentales pueden cambiar y requieren revisar compatibilidad antes de utilizarlos.
