# Guía del DOM en JavaScript

> Referencia práctica para comprender y manipular el **Document Object Model** mediante JavaScript.

## Índice

1. [Qué es el DOM](#qué-es-el-dom)
2. [Relación entre HTML, navegador y DOM](#relación-entre-html-navegador-y-dom)
3. [Estructura de árbol](#estructura-de-árbol)
4. [Tipos de nodos](#tipos-de-nodos)
5. [Objeto document](#objeto-document)
6. [Cuándo está disponible el DOM](#cuándo-está-disponible-el-dom)
7. [Seleccionar elementos](#seleccionar-elementos)
8. [Leer y modificar contenido](#leer-y-modificar-contenido)
9. [Modificar atributos](#modificar-atributos)
10. [Trabajar con clases CSS](#trabajar-con-clases-css)
11. [Modificar estilos desde JavaScript](#modificar-estilos-desde-javascript)
12. [Crear elementos](#crear-elementos)
13. [Insertar y eliminar elementos](#insertar-y-eliminar-elementos)
14. [Recorrer el DOM](#recorrer-el-dom)
15. [Eventos](#eventos)
16. [Propagación de eventos](#propagación-de-eventos)
17. [Formularios y DOM](#formularios-y-dom)
18. [Validación de formularios](#validación-de-formularios)
19. [Colecciones y listas de nodos](#colecciones-y-listas-de-nodos)
20. [Delegación de eventos](#delegación-de-eventos)
21. [Diferencia entre textContent, innerText e innerHTML](#diferencia-entre-textcontent-innertext-e-innerhtml)
22. [Atributos data](#atributos-data)
23. [Accesibilidad y DOM](#accesibilidad-y-dom)
24. [Errores frecuentes](#errores-frecuentes)
25. [Buenas prácticas](#buenas-prácticas)
26. [Ejemplo AulaBot](#ejemplo-aulabot)
27. [Resumen](#resumen)

---

## Qué es el DOM

DOM significa **Document Object Model**, es decir, **Modelo de Objetos del Documento**.

Cuando el navegador carga un archivo HTML, interpreta sus etiquetas y construye una representación interna organizada como un árbol de objetos.

Por ejemplo, este HTML:

```html
<body>
  <h1>AulaBot</h1>
  <p>Laboratorio de robótica educativa.</p>
</body>
```

se representa conceptualmente así:

```text
document
└── html
    └── body
        ├── h1
        │   └── "AulaBot"
        └── p
            └── "Laboratorio de robótica educativa."
```

JavaScript puede acceder a ese árbol para:

- buscar elementos;
- cambiar texto;
- modificar atributos;
- agregar o eliminar clases;
- crear elementos nuevos;
- eliminar elementos;
- reaccionar a eventos;
- validar formularios;
- actualizar la interfaz.

---

## Relación entre HTML, navegador y DOM

HTML es el código fuente del documento:

```html
<h2 id="titulo">Talleres AulaBot</h2>
```

El navegador crea un objeto DOM que representa ese elemento.

JavaScript puede buscarlo:

```javascript
const titulo = document.querySelector("#titulo");
```

y modificarlo:

```javascript
titulo.textContent = "Talleres disponibles";
```

El navegador actualiza la página visualmente sin necesidad de recargarla.

### Proceso general

```text
Archivo HTML
    ↓
Navegador analiza las etiquetas
    ↓
Construye el DOM
    ↓
JavaScript consulta o modifica el DOM
    ↓
La interfaz se actualiza
```

---

## Estructura de árbol

El DOM utiliza relaciones jerárquicas.

Considérese:

```html
<section id="talleres">
  <h2>Talleres</h2>

  <article class="tarjeta">
    <h3>Robótica</h3>
    <p>Nivel inicial</p>
  </article>
</section>
```

La estructura es:

```text
section
├── h2
└── article
    ├── h3
    └── p
```

Se utilizan términos familiares:

| Término | Significado |
|---|---|
| Padre | Elemento que contiene a otro |
| Hijo | Elemento contenido directamente |
| Descendiente | Elemento contenido en cualquier nivel |
| Hermano | Elemento que comparte el mismo padre |
| Ancestro | Elemento superior en la jerarquía |

Ejemplo:

```javascript
const tarjeta = document.querySelector(".tarjeta");

console.log(tarjeta.parentElement);
console.log(tarjeta.children);
console.log(tarjeta.firstElementChild);
```

---

## Tipos de nodos

El DOM no contiene solamente elementos HTML.

### Nodos frecuentes

| Tipo | Ejemplo |
|---|---|
| Documento | `document` |
| Elemento | `<p>`, `<section>`, `<input>` |
| Texto | El contenido textual dentro de una etiqueta |
| Comentario | `<!-- comentario -->` |
| Atributo | `id`, `class`, `href` |

Ejemplo:

```html
<p class="mensaje">Hola</p>
```

Incluye:

- un nodo elemento `<p>`;
- un atributo `class`;
- un nodo de texto `Hola`.

En la práctica, la mayoría de las operaciones se realizan sobre objetos `Element`.

---

## Objeto document

`document` representa el documento HTML cargado.

Ejemplos:

```javascript
console.log(document.title);
console.log(document.URL);
console.log(document.body);
console.log(document.head);
```

Modificar el título de la pestaña:

```javascript
document.title = "AulaBot | Talleres";
```

Acceder al elemento raíz:

```javascript
const raiz = document.documentElement;
```

---

## Cuándo está disponible el DOM

Si JavaScript intenta acceder a un elemento antes de que el navegador lo haya creado, puede obtener `null`.

### Problema

```html
<head>
  <script src="script.js"></script>
</head>
```

```javascript
const formulario = document.querySelector("#formulario");
console.log(formulario);
```

El script puede ejecutarse antes de que el formulario aparezca en el DOM.

### Solución recomendada con `defer`

```html
<script src="script.js" defer></script>
```

`defer` permite descargar el script mientras se procesa el HTML y ejecutarlo después de construir el DOM.

### Alternativa con `DOMContentLoaded`

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#formulario");
  console.log(formulario);
});
```

Si se utiliza `defer`, normalmente no es necesario envolver todo el código en `DOMContentLoaded`.

---

## Seleccionar elementos

### `getElementById()`

Busca un elemento por su identificador.

```html
<h1 id="titulo">AulaBot</h1>
```

```javascript
const titulo = document.getElementById("titulo");
```

No se escribe `#`:

```javascript
// Incorrecto
document.getElementById("#titulo");
```

### `querySelector()`

Utiliza un selector CSS y devuelve el primer elemento coincidente.

```javascript
const titulo = document.querySelector("#titulo");
const tarjeta = document.querySelector(".tarjeta");
const parrafo = document.querySelector("p");
```

Selector más específico:

```javascript
const correo = document.querySelector(
  'input[type="email"]'
);
```

### `querySelectorAll()`

Devuelve todos los elementos coincidentes en una `NodeList`.

```javascript
const tarjetas = document.querySelectorAll(".tarjeta");
```

Recorrer los resultados:

```javascript
tarjetas.forEach(tarjeta => {
  console.log(tarjeta.textContent);
});
```

### Métodos antiguos adicionales

```javascript
document.getElementsByClassName("tarjeta");
document.getElementsByTagName("p");
document.getElementsByName("modalidad");
```

Estos métodos suelen devolver colecciones vivas. Para código moderno, `querySelector()` y `querySelectorAll()` son opciones muy flexibles.

---

## Leer y modificar contenido

### `textContent`

Lee o modifica contenido textual.

```javascript
const titulo = document.querySelector("#titulo");

console.log(titulo.textContent);

titulo.textContent = "Laboratorio AulaBot";
```

### Cambiar contenido de un párrafo

```javascript
const mensaje = document.querySelector("#mensaje");

mensaje.textContent =
  "La inscripción fue registrada correctamente.";
```

### Leer el valor de un campo

```javascript
const nombre = document.querySelector("#nombre");

console.log(nombre.value);
```

Modificar su valor:

```javascript
nombre.value = "Ana Pérez";
```

### Casillas de verificación

```javascript
const condiciones = document.querySelector("#condiciones");

console.log(condiciones.checked);
```

### Select

```javascript
const taller = document.querySelector("#taller");

console.log(taller.value);
```

---

## Modificar atributos

### `getAttribute()`

```javascript
const enlace = document.querySelector("a");

console.log(enlace.getAttribute("href"));
```

### `setAttribute()`

```javascript
enlace.setAttribute("href", "https://ejemplo.cl");
```

### `removeAttribute()`

```javascript
enlace.removeAttribute("target");
```

### `hasAttribute()`

```javascript
if (enlace.hasAttribute("target")) {
  console.log("El enlace abre en otro contexto");
}
```

### Propiedades directas

Muchos atributos también pueden modificarse como propiedades:

```javascript
const imagen = document.querySelector("img");

imagen.src = "img/robotica.jpg";
imagen.alt = "Robot educativo";
```

Desactivar un control:

```javascript
const boton = document.querySelector("button");

boton.disabled = true;
```

---

## Trabajar con clases CSS

La propiedad `classList` permite administrar clases.

### Agregar

```javascript
elemento.classList.add("activo");
```

### Eliminar

```javascript
elemento.classList.remove("activo");
```

### Alternar

```javascript
elemento.classList.toggle("activo");
```

### Comprobar

```javascript
if (elemento.classList.contains("activo")) {
  console.log("El elemento está activo");
}
```

### Alternar con condición

```javascript
elemento.classList.toggle("activo", usuarioAutenticado);
```

Ejemplo:

```css
.mensaje {
  display: none;
}

.mensaje.visible {
  display: block;
}
```

```javascript
const mensaje = document.querySelector(".mensaje");

mensaje.classList.add("visible");
```

---

## Modificar estilos desde JavaScript

Se puede usar la propiedad `style`.

```javascript
const caja = document.querySelector(".caja");

caja.style.backgroundColor = "lightblue";
caja.style.padding = "1rem";
```

Las propiedades CSS con guion se escriben en `camelCase`:

| CSS | JavaScript |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |

Sin embargo, suele ser mejor cambiar clases:

```javascript
caja.classList.add("caja--destacada");
```

```css
.caja--destacada {
  color: white;
  background-color: navy;
}
```

Esto mantiene separadas la lógica y la presentación.

---

## Crear elementos

### `createElement()`

```javascript
const articulo = document.createElement("article");
```

### Agregar contenido

```javascript
articulo.textContent = "Nuevo taller";
```

### Agregar clases

```javascript
articulo.classList.add("tarjeta");
```

### Crear estructura

```javascript
const titulo = document.createElement("h3");
titulo.textContent = "Programación web";

const descripcion = document.createElement("p");
descripcion.textContent =
  "Creación de páginas con HTML, CSS y JavaScript.";

articulo.append(titulo, descripcion);
```

---

## Insertar y eliminar elementos

### `append()`

Inserta al final.

```javascript
const contenedor = document.querySelector(
  ".rejilla-talleres"
);

contenedor.append(articulo);
```

### `prepend()`

Inserta al inicio.

```javascript
contenedor.prepend(articulo);
```

### `before()` y `after()`

```javascript
elemento.before(nuevoElemento);
elemento.after(nuevoElemento);
```

### `appendChild()`

```javascript
contenedor.appendChild(articulo);
```

`append()` puede insertar varios nodos y texto. `appendChild()` inserta un nodo.

### `remove()`

```javascript
articulo.remove();
```

### `replaceWith()`

```javascript
elementoAntiguo.replaceWith(elementoNuevo);
```

### Vaciar un contenedor

```javascript
contenedor.replaceChildren();
```

También puede reemplazarse por nuevos nodos:

```javascript
contenedor.replaceChildren(tarjeta1, tarjeta2);
```

---

## Recorrer el DOM

### Padre

```javascript
elemento.parentElement;
```

### Hijos

```javascript
elemento.children;
```

### Primer y último hijo elemento

```javascript
elemento.firstElementChild;
elemento.lastElementChild;
```

### Hermanos

```javascript
elemento.nextElementSibling;
elemento.previousElementSibling;
```

### Buscar el ancestro más cercano

```javascript
const tarjeta = boton.closest(".tarjeta");
```

`closest()` busca el elemento actual o el ancestro más cercano que coincida con el selector.

---

## Eventos

Un evento es una acción detectada por el navegador.

Ejemplos:

- clic;
- envío de formulario;
- escritura;
- cambio;
- foco;
- teclado;
- movimiento del puntero.

### `addEventListener()`

```javascript
const boton = document.querySelector("#boton");

boton.addEventListener("click", () => {
  console.log("Botón presionado");
});
```

### Objeto del evento

```javascript
boton.addEventListener("click", evento => {
  console.log(evento.type);
  console.log(evento.target);
});
```

### Eventos frecuentes

| Evento | Uso |
|---|---|
| `click` | Clic o activación |
| `submit` | Envío de formulario |
| `input` | Cambio inmediato en un campo |
| `change` | Cambio confirmado |
| `focus` | Elemento recibe foco |
| `blur` | Elemento pierde foco |
| `keydown` | Se presiona una tecla |
| `keyup` | Se libera una tecla |
| `mouseover` | Puntero entra en un elemento |
| `mouseout` | Puntero sale |

### Evento `input`

```javascript
const campo = document.querySelector("#nombre");

campo.addEventListener("input", () => {
  console.log(campo.value);
});
```

### Evento `change`

```javascript
const select = document.querySelector("#taller");

select.addEventListener("change", () => {
  console.log(select.value);
});
```

---

## Propagación de eventos

Los eventos pueden recorrer el árbol DOM.

### Burbujeo

El evento se origina en un elemento y sube hacia sus ancestros.

```html
<div id="contenedor">
  <button id="boton">Presionar</button>
</div>
```

```javascript
document
  .querySelector("#contenedor")
  .addEventListener("click", () => {
    console.log("Clic en contenedor");
  });

document
  .querySelector("#boton")
  .addEventListener("click", () => {
    console.log("Clic en botón");
  });
```

Al presionar el botón pueden ejecutarse ambos manejadores.

### `stopPropagation()`

```javascript
boton.addEventListener("click", evento => {
  evento.stopPropagation();
});
```

Debe usarse solamente cuando sea necesario.

### Captura

```javascript
contenedor.addEventListener(
  "click",
  () => {
    console.log("Captura");
  },
  { capture: true }
);
```

---

## Formularios y DOM

### Seleccionar un formulario

```javascript
const formulario = document.querySelector(
  "#formInscripcion"
);
```

### Evitar el envío tradicional

```javascript
formulario.addEventListener("submit", evento => {
  evento.preventDefault();
});
```

`preventDefault()` evita la recarga o navegación automática.

### Acceder a los controles

```javascript
const nombre = formulario.elements.nombre.value;
```

### `FormData`

```javascript
const datos = new FormData(formulario);

console.log(datos.get("nombre"));
console.log(datos.get("correo"));
```

Recorrer todos los datos:

```javascript
for (const [nombre, valor] of datos.entries()) {
  console.log(nombre, valor);
}
```

### Restablecer

```javascript
formulario.reset();
```

---

## Validación de formularios

HTML ya proporciona validaciones:

```html
<input
  id="correo"
  name="correo"
  type="email"
  required
>
```

JavaScript puede complementar la validación.

```javascript
const correo = document.querySelector("#correo");

if (!correo.validity.valid) {
  console.log("Correo no válido");
}
```

### `checkValidity()`

```javascript
if (!formulario.checkValidity()) {
  console.log("Existen campos inválidos");
}
```

### `reportValidity()`

```javascript
formulario.reportValidity();
```

Muestra los mensajes nativos del navegador.

### Validación personalizada

```javascript
const password = document.querySelector("#password");

if (password.value.length < 8) {
  password.setCustomValidity(
    "La contraseña debe tener al menos 8 caracteres."
  );
} else {
  password.setCustomValidity("");
}
```

---

## Colecciones y listas de nodos

### `NodeList`

`querySelectorAll()` devuelve una `NodeList`.

```javascript
const botones = document.querySelectorAll("button");

botones.forEach(boton => {
  console.log(boton.textContent);
});
```

Convertir en arreglo:

```javascript
const arregloBotones = Array.from(botones);
```

o:

```javascript
const arregloBotones = [...botones];
```

### `HTMLCollection`

Métodos como `getElementsByClassName()` suelen devolver `HTMLCollection`.

```javascript
const tarjetas =
  document.getElementsByClassName("tarjeta");
```

Puede convertirse:

```javascript
const arreglo = Array.from(tarjetas);
```

---

## Delegación de eventos

La delegación permite administrar eventos de muchos elementos desde un ancestro común.

HTML:

```html
<ul id="listaTalleres">
  <li>
    Robótica
    <button data-accion="eliminar">Eliminar</button>
  </li>
</ul>
```

JavaScript:

```javascript
const lista = document.querySelector("#listaTalleres");

lista.addEventListener("click", evento => {
  const boton = evento.target.closest(
    '[data-accion="eliminar"]'
  );

  if (!boton) {
    return;
  }

  boton.closest("li").remove();
});
```

Ventajas:

- menos manejadores;
- funciona con elementos creados dinámicamente;
- simplifica listas y tablas.

---

## Diferencia entre textContent, innerText e innerHTML

### `textContent`

```javascript
elemento.textContent = "Hola";
```

- trabaja con texto;
- incluye texto aunque esté oculto;
- no interpreta etiquetas HTML;
- suele ser la opción más segura.

### `innerText`

```javascript
console.log(elemento.innerText);
```

- considera el contenido visual;
- depende de estilos y diseño;
- puede provocar cálculos de presentación.

### `innerHTML`

```javascript
elemento.innerHTML = "<strong>Hola</strong>";
```

- interpreta código HTML;
- permite insertar estructuras;
- puede introducir vulnerabilidades si se usa con datos del usuario.

Ejemplo inseguro:

```javascript
resultado.innerHTML = campo.value;
```

Una entrada maliciosa podría insertar HTML no deseado.

Alternativa segura:

```javascript
resultado.textContent = campo.value;
```

---

## Atributos data

Los atributos `data-*` permiten asociar información personalizada.

HTML:

```html
<button
  data-taller-id="robotica-01"
  data-nivel="inicial"
>
  Ver taller
</button>
```

JavaScript:

```javascript
const boton = document.querySelector("button");

console.log(boton.dataset.tallerId);
console.log(boton.dataset.nivel);
```

Modificar:

```javascript
boton.dataset.nivel = "intermedio";
```

---

## Accesibilidad y DOM

Cuando JavaScript modifica la interfaz, también debe mantener la accesibilidad.

### Mensajes dinámicos

```html
<div
  id="mensaje"
  role="status"
  aria-live="polite"
></div>
```

```javascript
mensaje.textContent =
  "Inscripción completada correctamente.";
```

### Errores

```javascript
campo.setAttribute("aria-invalid", "true");
```

```html
<input
  id="correo"
  aria-describedby="errorCorreo"
>

<small id="errorCorreo"></small>
```

### Ocultar y mostrar

```javascript
panel.hidden = true;
panel.hidden = false;
```

`hidden` comunica mejor el estado que modificar únicamente el color o la opacidad.

### Gestión del foco

```javascript
primerCampoConError.focus();
```

Después de abrir un diálogo o cambiar de vista, puede ser necesario mover el foco de forma controlada.

---

## Errores frecuentes

### El selector devuelve `null`

```javascript
const elemento = document.querySelector("#titulo");
```

Posibles causas:

- el selector está mal escrito;
- el elemento no existe;
- el script se ejecuta demasiado pronto;
- el `id` no coincide.

Comprobar:

```javascript
if (!elemento) {
  console.error("No se encontró el elemento");
}
```

### Usar `#` en `getElementById`

Incorrecto:

```javascript
document.getElementById("#titulo");
```

Correcto:

```javascript
document.getElementById("titulo");
```

### Usar `class` en vez de `className`

En DOM puede utilizarse:

```javascript
elemento.className = "tarjeta activa";
```

Pero para cambios parciales es preferible:

```javascript
elemento.classList.add("activa");
```

### Confundir `value` con `textContent`

Campos de formulario:

```javascript
input.value;
```

Elementos de texto:

```javascript
parrafo.textContent;
```

### No prevenir el envío

```javascript
formulario.addEventListener("submit", evento => {
  evento.preventDefault();
});
```

### Usar `innerHTML` con datos externos

Preferir `textContent` o crear nodos explícitamente.

---

## Buenas prácticas

1. Cargar scripts con `defer`.
2. Utilizar `const` por defecto y `let` cuando el valor cambie.
3. Comprobar que los elementos existan.
4. Preferir selectores claros y estables.
5. Usar `textContent` para texto.
6. Evitar `innerHTML` con datos del usuario.
7. Cambiar clases CSS en lugar de estilos en línea.
8. Separar funciones por responsabilidad.
9. Utilizar nombres descriptivos.
10. Evitar variables globales innecesarias.
11. Usar delegación en listas dinámicas.
12. Mantener mensajes accesibles.
13. Validar en cliente y servidor en aplicaciones reales.
14. No guardar información sensible directamente en el navegador.
15. Mantener HTML, CSS y JavaScript en archivos separados.

---

## Ejemplo AulaBot

### HTML

```html
<section class="seccion">
  <h2>Talleres disponibles</h2>

  <form id="formTaller">
    <label for="nombreTaller">Nombre del taller</label>

    <input
      id="nombreTaller"
      name="nombreTaller"
      type="text"
      required
    >

    <button type="submit">
      Agregar taller
    </button>
  </form>

  <p
    id="mensaje"
    role="status"
    aria-live="polite"
  ></p>

  <div id="listaTalleres" class="rejilla"></div>
</section>
```

### CSS

```css
.rejilla {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1rem;
}

.tarjeta {
  padding: 1rem;
  border: 1px solid #cccccc;
  border-radius: 0.75rem;
}

.tarjeta__acciones {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
```

### JavaScript

```javascript
"use strict";

const formulario = document.querySelector("#formTaller");
const campoNombre = document.querySelector("#nombreTaller");
const lista = document.querySelector("#listaTalleres");
const mensaje = document.querySelector("#mensaje");

function crearTarjeta(nombre) {
  const articulo = document.createElement("article");
  articulo.classList.add("tarjeta");

  const titulo = document.createElement("h3");
  titulo.textContent = nombre;

  const descripcion = document.createElement("p");
  descripcion.textContent =
    "Taller registrado en la interfaz AulaBot.";

  const acciones = document.createElement("div");
  acciones.classList.add("tarjeta__acciones");

  const botonEliminar = document.createElement("button");
  botonEliminar.type = "button";
  botonEliminar.textContent = "Eliminar";
  botonEliminar.dataset.accion = "eliminar";

  acciones.append(botonEliminar);
  articulo.append(titulo, descripcion, acciones);

  return articulo;
}

formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  const nombre = campoNombre.value.trim();

  if (nombre.length < 3) {
    mensaje.textContent =
      "Ingrese un nombre de al menos 3 caracteres.";
    campoNombre.focus();
    return;
  }

  const tarjeta = crearTarjeta(nombre);
  lista.append(tarjeta);

  formulario.reset();
  mensaje.textContent =
    `Se agregó el taller: ${nombre}.`;

  campoNombre.focus();
});

lista.addEventListener("click", evento => {
  const boton = evento.target.closest(
    '[data-accion="eliminar"]'
  );

  if (!boton) {
    return;
  }

  const tarjeta = boton.closest(".tarjeta");
  const nombre = tarjeta.querySelector("h3").textContent;

  tarjeta.remove();

  mensaje.textContent =
    `Se eliminó el taller: ${nombre}.`;
});
```

### Conceptos aplicados

El ejemplo utiliza:

- `querySelector()`;
- `createElement()`;
- `textContent`;
- `classList`;
- `dataset`;
- `append()`;
- `remove()`;
- eventos `submit` y `click`;
- `preventDefault()`;
- delegación de eventos;
- actualización de una región `aria-live`.

---

## Resumen

El DOM permite que JavaScript interactúe con el documento HTML.

Las operaciones principales son:

```javascript
// Seleccionar
const elemento = document.querySelector("#elemento");

// Leer o cambiar texto
elemento.textContent = "Nuevo contenido";

// Cambiar clases
elemento.classList.add("activo");

// Escuchar eventos
elemento.addEventListener("click", () => {
  console.log("Clic");
});

// Crear
const nuevo = document.createElement("p");

// Insertar
contenedor.append(nuevo);

// Eliminar
nuevo.remove();
```

La idea central es:

```text
HTML crea la estructura
CSS define la presentación
JavaScript utiliza el DOM para agregar interacción
```