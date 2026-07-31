# JavaScript básico

> Guía introductoria para aprender los fundamentos de JavaScript y comenzar a agregar interacción a páginas HTML.

## Índice

1. [¿Qué es JavaScript?](#1-qué-es-javascript)
2. [Relación entre HTML, CSS y JavaScript](#2-relación-entre-html-css-y-javascript)
3. [Cómo incorporar JavaScript](#3-cómo-incorporar-javascript)
4. [La consola del navegador](#4-la-consola-del-navegador)
5. [`"use strict"`](#5-use-strict)
6. [Comentarios](#6-comentarios)
7. [Variables](#7-variables)
8. [Tipos de datos](#8-tipos-de-datos)
9. [Operadores](#9-operadores)
10. [Conversión de tipos](#10-conversión-de-tipos)
11. [Condicionales](#11-condicionales)
12. [Operador ternario](#12-operador-ternario)
13. [Ciclos](#13-ciclos)
14. [Funciones](#14-funciones)
15. [Arreglos](#15-arreglos)
16. [Objetos](#16-objetos)
17. [Desestructuración](#17-desestructuración)
18. [Cadenas de texto](#18-cadenas-de-texto)
19. [Métodos numéricos](#19-métodos-numéricos)
20. [Manejo básico del DOM](#20-manejo-básico-del-dom)
21. [Eventos](#21-eventos)
22. [Formularios](#22-formularios)
23. [Crear y eliminar elementos](#23-crear-y-eliminar-elementos)
24. [Persistencia con localStorage](#24-persistencia-con-localstorage)
25. [Módulos JavaScript](#25-módulos-javascript)
26. [Manejo básico de errores](#26-manejo-básico-de-errores)
27. [Depuración](#27-depuración)
28. [Buenas prácticas](#28-buenas-prácticas)
29. [Ejemplo completo](#29-ejemplo-completo)
30. [Resumen de sintaxis](#30-resumen-de-sintaxis)

---

## 1. ¿Qué es JavaScript?

JavaScript es un lenguaje de programación utilizado principalmente para agregar interacción y comportamiento a páginas y aplicaciones web.

Permite, por ejemplo:

- validar formularios;
- responder a clics;
- modificar contenido HTML;
- crear y eliminar elementos;
- realizar cálculos;
- mostrar u ocultar secciones;
- guardar datos en el navegador;
- consumir servicios web;
- construir aplicaciones completas.

Ejemplo:

```javascript
console.log("Hola, AulaBot");
```

---

## 2. Relación entre HTML, CSS y JavaScript

Cada tecnología cumple una función principal:

| Tecnología | Función |
|---|---|
| HTML | Define la estructura y el contenido |
| CSS | Define la presentación visual |
| JavaScript | Define el comportamiento y la interacción |

Ejemplo:

```html
<button id="botonSaludo">Saludar</button>

<p id="mensaje"></p>
```

```css
button {
  padding: 0.75rem 1rem;
}
```

```javascript
const boton = document.querySelector("#botonSaludo");
const mensaje = document.querySelector("#mensaje");

boton.addEventListener("click", () => {
  mensaje.textContent = "Hola desde JavaScript";
});
```

---

## 3. Cómo incorporar JavaScript

### Archivo externo

Es la forma recomendada.

```html
<script src="script.js" defer></script>
```

El atributo `defer` permite descargar el script mientras se procesa el HTML y ejecutarlo después de que el DOM haya sido construido.

Estructura:

```text
proyecto/
├── index.html
├── styles.css
└── script.js
```

### Script interno

```html
<script>
  console.log("JavaScript interno");
</script>
```

### Script en línea

```html
<button onclick="alert('Hola')">
  Presionar
</button>
```

Esta última forma funciona, pero no es recomendable para proyectos medianos o grandes porque mezcla HTML y JavaScript.

---

## 4. La consola del navegador

La consola permite:

- mostrar información;
- detectar errores;
- probar expresiones;
- revisar variables;
- depurar código.

```javascript
console.log("Mensaje normal");
console.warn("Advertencia");
console.error("Error");
```

Mostrar una variable:

```javascript
const nombre = "AulaBot";

console.log(nombre);
```

Mostrar varias variables:

```javascript
const taller = "Robótica";
const cupos = 20;

console.log(taller, cupos);
```

Mostrar una tabla:

```javascript
const talleres = [
  { nombre: "Robótica", cupos: 20 },
  { nombre: "Programación", cupos: 25 }
];

console.table(talleres);
```

---

# 5. `"use strict"`

## ¿Qué es?

`"use strict"` activa el **modo estricto** de JavaScript.

```javascript
"use strict";
```

Debe escribirse al inicio del archivo o al inicio de una función.

```javascript
"use strict";

const nombre = "AulaBot";
```

El modo estricto ayuda a detectar errores y evita algunos comportamientos antiguos o ambiguos.

---

## Evita variables globales accidentales

Sin declarar una variable:

```javascript
actividad = "Programar robot";
```

Con modo estricto:

```javascript
"use strict";

actividad = "Programar robot";
```

se produce un error:

```text
ReferenceError: actividad is not defined
```

La forma correcta es:

```javascript
"use strict";

const actividad = "Programar robot";
```

---

## Detecta operaciones inválidas

```javascript
"use strict";

const objeto = {};

Object.defineProperty(objeto, "codigo", {
  value: "AULA-01",
  writable: false
});

objeto.codigo = "AULA-02";
```

El modo estricto genera un error porque la propiedad no puede modificarse.

---

## Evita parámetros duplicados

Incorrecto:

```javascript
"use strict";

function sumar(valor, valor) {
  return valor + valor;
}
```

Correcto:

```javascript
"use strict";

function sumar(valorA, valorB) {
  return valorA + valorB;
}
```

---

## Cambia el valor de `this` en funciones normales

```javascript
"use strict";

function mostrarThis() {
  console.log(this);
}

mostrarThis();
```

El resultado será:

```javascript
undefined
```

En modo no estricto, algunos entornos podían asociar `this` al objeto global.

---

## ¿Es necesario en módulos?

Los módulos JavaScript funcionan en modo estricto automáticamente.

```html
<script type="module" src="main.js"></script>
```

Archivo:

```javascript
import { iniciar } from "./app.js";

iniciar();
```

No es necesario agregar explícitamente:

```javascript
"use strict";
```

Esto también se aplica normalmente a proyectos:

- Vite;
- React;
- Vue;
- archivos con `import` y `export`.

---

## `"use strict"` y React `StrictMode`

No son lo mismo.

### JavaScript

```javascript
"use strict";
```

Activa reglas estrictas del lenguaje.

### React

```jsx
<StrictMode>
  <App />
</StrictMode>
```

Ayuda a detectar problemas en componentes durante el desarrollo.

---

## Recomendación práctica

| Contexto | Recomendación |
|---|---|
| Script clásico | Puede utilizar `"use strict"` |
| Archivo con `type="module"` | No es necesario |
| React con Vite | No es necesario escribirlo |
| Código antiguo | Puede ayudar a detectar errores |

---

## 6. Comentarios

### Comentario de una línea

```javascript
// Este es un comentario
const nombre = "AulaBot";
```

### Comentario de varias líneas

```javascript
/*
  Este comentario
  ocupa varias líneas.
*/
```

Los comentarios deben explicar decisiones o conceptos importantes, no repetir literalmente el código.

---

## 7. Variables

Las variables almacenan valores.

### `const`

Se utiliza cuando la variable no será reasignada.

```javascript
const nombre = "AulaBot";
```

No se puede reasignar:

```javascript
const nombre = "AulaBot";

// Error
nombre = "Otro nombre";
```

### `let`

Se utiliza cuando el valor cambiará.

```javascript
let cantidad = 0;

cantidad = cantidad + 1;
```

### `var`

```javascript
var mensaje = "Hola";
```

`var` pertenece a una forma antigua de declarar variables. En código moderno se recomienda utilizar `const` y `let`.

### Regla práctica

```text
Usar const por defecto
Usar let cuando el valor cambie
Evitar var
```

### Nombres válidos

```javascript
const nombre = "Ana";
const nombreCompleto = "Ana Pérez";
const cantidadTalleres = 3;
const _valorInterno = 10;
```

No válido:

```javascript
// Empieza con número
const 2talleres = 2;
```

---

## 8. Tipos de datos

## String

Representa texto.

```javascript
const nombre = "AulaBot";
const ciudad = 'Valparaíso';
```

## Number

Representa números enteros y decimales.

```javascript
const edad = 20;
const promedio = 6.5;
```

## Boolean

Representa verdadero o falso.

```javascript
const activo = true;
const completado = false;
```

## Undefined

Una variable declarada sin valor.

```javascript
let resultado;

console.log(resultado);
```

## Null

Representa ausencia intencional de valor.

```javascript
const usuarioSeleccionado = null;
```

## Object

```javascript
const taller = {
  nombre: "Robótica",
  cupos: 20
};
```

## Array

```javascript
const talleres = [
  "Robótica",
  "Programación",
  "Inteligencia artificial"
];
```

## Comprobar el tipo

```javascript
console.log(typeof "AulaBot");
console.log(typeof 20);
console.log(typeof true);
```

Resultado:

```text
string
number
boolean
```

Para arreglos:

```javascript
Array.isArray(talleres);
```

---

## 9. Operadores

### Aritméticos

```javascript
const suma = 10 + 5;
const resta = 10 - 5;
const multiplicacion = 10 * 5;
const division = 10 / 5;
const resto = 10 % 3;
const potencia = 2 ** 3;
```

### Asignación

```javascript
let cantidad = 10;

cantidad += 2;
cantidad -= 1;
cantidad *= 2;
cantidad /= 2;
```

### Comparación

```javascript
5 === 5;
5 !== 3;
5 > 3;
5 < 10;
5 >= 5;
5 <= 7;
```

### Igualdad estricta

```javascript
5 === "5";
```

Resultado:

```javascript
false
```

Se recomienda utilizar:

```javascript
===
!==
```

en lugar de:

```javascript
==
!=
```

### Lógicos

```javascript
const tieneEdad = true;
const tieneCupo = true;

const puedeInscribirse =
  tieneEdad && tieneCupo;
```

| Operador | Significado |
|---|---|
| `&&` | Y |
| `||` | O |
| `!` | Negación |

Ejemplo:

```javascript
const esDocente = false;

console.log(!esDocente);
```

---

## 10. Conversión de tipos

### Convertir a número

```javascript
const texto = "20";
const numero = Number(texto);
```

### Convertir a texto

```javascript
const edad = 20;
const textoEdad = String(edad);
```

### Convertir a booleano

```javascript
Boolean(1);
Boolean(0);
Boolean("");
Boolean("AulaBot");
```

Valores considerados falsos:

```text
false
0
""
null
undefined
NaN
```

---

## 11. Condicionales

## `if`

```javascript
const edad = 18;

if (edad >= 18) {
  console.log("Puede inscribirse");
}
```

## `if...else`

```javascript
const cupos = 0;

if (cupos > 0) {
  console.log("Hay cupos");
} else {
  console.log("No hay cupos");
}
```

## `else if`

```javascript
const nota = 5.5;

if (nota >= 6) {
  console.log("Nivel alto");
} else if (nota >= 4) {
  console.log("Nivel suficiente");
} else {
  console.log("Nivel insuficiente");
}
```

## `switch`

```javascript
const taller = "robotica";

switch (taller) {
  case "robotica":
    console.log("Taller de robótica");
    break;

  case "web":
    console.log("Taller web");
    break;

  default:
    console.log("Taller no reconocido");
}
```

---

## 12. Operador ternario

Permite expresar una condición sencilla.

```javascript
const edad = 20;

const mensaje =
  edad >= 18
    ? "Mayor de edad"
    : "Menor de edad";
```

No conviene utilizarlo para condiciones demasiado complejas.

---

## 13. Ciclos

## `for`

```javascript
for (let i = 0; i < 5; i += 1) {
  console.log(i);
}
```

## `while`

```javascript
let contador = 0;

while (contador < 3) {
  console.log(contador);
  contador += 1;
}
```

## `for...of`

Para recorrer valores de un arreglo:

```javascript
const talleres = [
  "Robótica",
  "Programación",
  "IA"
];

for (const taller of talleres) {
  console.log(taller);
}
```

## `forEach`

```javascript
talleres.forEach((taller, indice) => {
  console.log(indice, taller);
});
```

---

## 14. Funciones

Las funciones agrupan instrucciones reutilizables.

### Declaración de función

```javascript
function saludar() {
  console.log("Hola");
}

saludar();
```

### Parámetros

```javascript
function saludar(nombre) {
  console.log(`Hola, ${nombre}`);
}

saludar("Ana");
```

### Retorno

```javascript
function sumar(a, b) {
  return a + b;
}

const resultado = sumar(4, 6);
```

### Expresión de función

```javascript
const multiplicar = function (a, b) {
  return a * b;
};
```

### Función flecha

```javascript
const dividir = (a, b) => {
  return a / b;
};
```

Forma abreviada:

```javascript
const duplicar = numero => numero * 2;
```

### Parámetros con valor predeterminado

```javascript
function saludar(nombre = "Usuario") {
  return `Hola, ${nombre}`;
}
```

---

## 15. Arreglos

Un arreglo almacena una colección ordenada.

```javascript
const talleres = [
  "Robótica",
  "Programación",
  "IA"
];
```

### Acceder por índice

```javascript
console.log(talleres[0]);
```

El primer índice es `0`.

### Longitud

```javascript
console.log(talleres.length);
```

### Agregar al final

```javascript
talleres.push("Electrónica");
```

### Eliminar el último

```javascript
talleres.pop();
```

### Agregar al inicio

```javascript
talleres.unshift("Diseño");
```

### Eliminar el primero

```javascript
talleres.shift();
```

### Buscar

```javascript
const encontrado =
  talleres.includes("Robótica");
```

### `map()`

Crea un nuevo arreglo transformado.

```javascript
const nombresMayuscula =
  talleres.map(taller =>
    taller.toUpperCase()
  );
```

### `filter()`

```javascript
const talleresLargos =
  talleres.filter(taller =>
    taller.length > 5
  );
```

### `find()`

```javascript
const tallerEncontrado =
  talleres.find(taller =>
    taller === "Programación"
  );
```

### Arreglo de objetos

```javascript
const cursos = [
  {
    id: 1,
    nombre: "Robótica",
    cupos: 20
  },
  {
    id: 2,
    nombre: "Programación",
    cupos: 25
  }
];
```

---

## 16. Objetos

Un objeto almacena datos mediante propiedades.

```javascript
const taller = {
  nombre: "Robótica",
  cupos: 20,
  activo: true
};
```

### Acceder a propiedades

```javascript
console.log(taller.nombre);
console.log(taller["cupos"]);
```

### Modificar

```javascript
taller.cupos = 18;
```

### Agregar propiedad

```javascript
taller.nivel = "Inicial";
```

### Eliminar propiedad

```javascript
delete taller.activo;
```

### Métodos

```javascript
const robot = {
  nombre: "AulaBot",

  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
};

console.log(robot.saludar());
```

---

## 17. Desestructuración

### Objetos

```javascript
const taller = {
  nombre: "Robótica",
  cupos: 20
};

const { nombre, cupos } = taller;
```

### Arreglos

```javascript
const colores = [
  "azul",
  "amarillo",
  "blanco"
];

const [principal, secundario] = colores;
```

### Operador spread

```javascript
const datosIniciales = {
  nombre: "AulaBot",
  activo: true
};

const datosActualizados = {
  ...datosIniciales,
  ciudad: "Valparaíso"
};
```

En arreglos:

```javascript
const listaA = [1, 2];
const listaB = [...listaA, 3, 4];
```

---

## 18. Cadenas de texto

### Concatenación

```javascript
const nombre = "Ana";

const mensaje =
  "Hola, " + nombre + ".";
```

### Plantillas de texto

```javascript
const mensaje =
  `Hola, ${nombre}.`;
```

### Propiedades y métodos

```javascript
const texto = "  AulaBot  ";

console.log(texto.length);
console.log(texto.trim());
console.log(texto.toUpperCase());
console.log(texto.toLowerCase());
console.log(texto.includes("Bot"));
console.log(texto.replace("Bot", "Robot"));
```

---

## 19. Métodos numéricos

### Número válido

```javascript
Number.isNaN(NaN);
Number.isInteger(20);
```

### Redondeo

```javascript
Math.round(4.6);
Math.floor(4.9);
Math.ceil(4.1);
```

### Mínimo y máximo

```javascript
Math.min(3, 8, 1);
Math.max(3, 8, 1);
```

### Número aleatorio

```javascript
const aleatorio = Math.random();
```

Número entre 1 y 10:

```javascript
const numero =
  Math.floor(Math.random() * 10) + 1;
```

---

## 20. Manejo básico del DOM

DOM significa **Document Object Model**.

Permite que JavaScript interactúe con HTML.

### Seleccionar por identificador

```javascript
const titulo =
  document.getElementById("titulo");
```

### Seleccionar con CSS

```javascript
const titulo =
  document.querySelector("#titulo");

const tarjeta =
  document.querySelector(".tarjeta");
```

### Seleccionar varios

```javascript
const tarjetas =
  document.querySelectorAll(".tarjeta");
```

### Cambiar texto

```javascript
titulo.textContent =
  "Laboratorio AulaBot";
```

### Leer un input

```javascript
const campo =
  document.querySelector("#nombre");

console.log(campo.value);
```

### Clases CSS

```javascript
tarjeta.classList.add("activa");
tarjeta.classList.remove("activa");
tarjeta.classList.toggle("activa");
```

---

## 21. Eventos

Los eventos permiten responder a acciones.

### Clic

```javascript
const boton =
  document.querySelector("#boton");

boton.addEventListener("click", () => {
  console.log("Botón presionado");
});
```

### Evento con parámetro

```javascript
boton.addEventListener(
  "click",
  evento => {
    console.log(evento.target);
  }
);
```

### Input

```javascript
const nombre =
  document.querySelector("#nombre");

nombre.addEventListener("input", () => {
  console.log(nombre.value);
});
```

### Change

```javascript
const select =
  document.querySelector("#taller");

select.addEventListener("change", () => {
  console.log(select.value);
});
```

---

## 22. Formularios

HTML:

```html
<form id="formulario">
  <label for="nombre">Nombre</label>

  <input
    id="nombre"
    name="nombre"
    type="text"
    required
  >

  <button type="submit">
    Enviar
  </button>
</form>
```

JavaScript:

```javascript
const formulario =
  document.querySelector("#formulario");

formulario.addEventListener(
  "submit",
  evento => {
    evento.preventDefault();

    const nombre =
      document.querySelector(
        "#nombre"
      ).value.trim();

    console.log(nombre);
  }
);
```

`preventDefault()` evita la recarga automática.

### FormData

```javascript
const datos =
  new FormData(formulario);

console.log(datos.get("nombre"));
```

### Restablecer

```javascript
formulario.reset();
```

---

## 23. Crear y eliminar elementos

### Crear

```javascript
const elemento =
  document.createElement("li");
```

### Agregar texto

```javascript
elemento.textContent =
  "Preparar materiales";
```

### Insertar

```javascript
const lista =
  document.querySelector("#lista");

lista.append(elemento);
```

### Eliminar

```javascript
elemento.remove();
```

### Vaciar un contenedor

```javascript
lista.replaceChildren();
```

---

## 24. Persistencia con `localStorage`

Guardar texto:

```javascript
localStorage.setItem(
  "nombre",
  "AulaBot"
);
```

Recuperar:

```javascript
const nombre =
  localStorage.getItem("nombre");
```

Eliminar:

```javascript
localStorage.removeItem("nombre");
```

Guardar un arreglo:

```javascript
const actividades = [
  "Preparar robot",
  "Revisar sensores"
];

localStorage.setItem(
  "actividades",
  JSON.stringify(actividades)
);
```

Recuperar:

```javascript
const actividades = JSON.parse(
  localStorage.getItem("actividades")
) || [];
```

No se deben guardar contraseñas ni datos sensibles en `localStorage`.

---

## 25. Módulos JavaScript

Los módulos permiten separar el código.

HTML:

```html
<script
  type="module"
  src="main.js"
></script>
```

Archivo `operaciones.js`:

```javascript
export function sumar(a, b) {
  return a + b;
}
```

Archivo `main.js`:

```javascript
import { sumar }
  from "./operaciones.js";

console.log(sumar(4, 6));
```

Los módulos trabajan automáticamente en modo estricto.

---

## 26. Manejo básico de errores

### `try...catch`

```javascript
try {
  const datos = JSON.parse(
    localStorage.getItem("datos")
  );

  console.log(datos);
} catch (error) {
  console.error(
    "No fue posible leer los datos",
    error
  );
}
```

### Lanzar un error

```javascript
function dividir(a, b) {
  if (b === 0) {
    throw new Error(
      "No se puede dividir por cero"
    );
  }

  return a / b;
}
```

---

## 27. Depuración

### `console.log()`

```javascript
console.log(variable);
```

### `debugger`

```javascript
function calcular() {
  debugger;

  const resultado = 5 + 5;

  return resultado;
}
```

Cuando las herramientas de desarrollo están abiertas, la ejecución se detiene en esa línea.

### Revisar errores

La consola puede mostrar:

```text
ReferenceError
TypeError
SyntaxError
```

Ejemplos:

- `ReferenceError`: variable inexistente;
- `TypeError`: operación inválida para un tipo;
- `SyntaxError`: error de escritura del código.

---

## 28. Buenas prácticas

1. Usar `const` por defecto.
2. Usar `let` solamente cuando el valor cambie.
3. Evitar `var`.
4. Preferir `===` y `!==`.
5. Utilizar nombres descriptivos.
6. Dividir el código en funciones pequeñas.
7. Evitar variables globales.
8. Cargar scripts con `defer` o como módulos.
9. Usar `textContent` para datos de usuarios.
10. Evitar `innerHTML` con información externa.
11. Validar formularios.
12. Manejar posibles valores `null`.
13. No guardar información sensible en el navegador.
14. Separar HTML, CSS y JavaScript.
15. Utilizar módulos en proyectos modernos.
16. Revisar la consola del navegador.
17. Mantener una indentación consistente.
18. Agregar comentarios solo cuando aporten contexto.

---

## 29. Ejemplo completo

### HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>Actividades AulaBot</title>

  <script
    src="script.js"
    defer
  ></script>
</head>

<body>
  <h1>Actividades AulaBot</h1>

  <form id="formActividad">
    <label for="actividad">
      Nueva actividad
    </label>

    <input
      id="actividad"
      name="actividad"
      type="text"
      required
    >

    <button type="submit">
      Agregar
    </button>
  </form>

  <p
    id="mensaje"
    role="status"
    aria-live="polite"
  ></p>

  <ul id="listaActividades"></ul>
</body>
</html>
```

### JavaScript

```javascript
"use strict";

const formulario =
  document.querySelector(
    "#formActividad"
  );

const campo =
  document.querySelector(
    "#actividad"
  );

const lista =
  document.querySelector(
    "#listaActividades"
  );

const mensaje =
  document.querySelector(
    "#mensaje"
  );

function crearActividad(nombre) {
  const elemento =
    document.createElement("li");

  const texto =
    document.createElement("span");

  const botonEliminar =
    document.createElement("button");

  texto.textContent = nombre;

  botonEliminar.type = "button";
  botonEliminar.textContent = "Eliminar";

  botonEliminar.addEventListener(
    "click",
    () => {
      elemento.remove();

      mensaje.textContent =
        `Se eliminó: ${nombre}`;
    }
  );

  elemento.append(
    texto,
    botonEliminar
  );

  return elemento;
}

formulario.addEventListener(
  "submit",
  evento => {
    evento.preventDefault();

    const nombre =
      campo.value.trim();

    if (nombre.length < 3) {
      mensaje.textContent =
        "Ingrese al menos 3 caracteres.";

      campo.focus();
      return;
    }

    const actividad =
      crearActividad(nombre);

    lista.append(actividad);

    mensaje.textContent =
      `Se agregó: ${nombre}`;

    formulario.reset();
    campo.focus();
  }
);
```

---

## 30. Resumen de sintaxis

### Variable

```javascript
const nombre = "AulaBot";
let cantidad = 0;
```

### Condición

```javascript
if (cantidad > 0) {
  console.log("Hay elementos");
}
```

### Ciclo

```javascript
for (const taller of talleres) {
  console.log(taller);
}
```

### Función

```javascript
function sumar(a, b) {
  return a + b;
}
```

### Arreglo

```javascript
const talleres = [
  "Robótica",
  "Programación"
];
```

### Objeto

```javascript
const taller = {
  nombre: "Robótica",
  cupos: 20
};
```

### Selección DOM

```javascript
const boton =
  document.querySelector("#boton");
```

### Evento

```javascript
boton.addEventListener(
  "click",
  () => {
    console.log("Clic");
  }
);
```

### Crear elemento

```javascript
const elemento =
  document.createElement("li");
```

### Guardar localmente

```javascript
localStorage.setItem(
  "clave",
  "valor"
);
```

### Módulo

```javascript
export function iniciar() {
  console.log("Aplicación iniciada");
}
```

```javascript
import { iniciar }
  from "./app.js";
```

---

## Conclusión

JavaScript permite transformar una página estática en una aplicación interactiva.

La progresión recomendada es:

```text
Variables y tipos
       ↓
Condicionales y ciclos
       ↓
Funciones
       ↓
Arreglos y objetos
       ↓
DOM y eventos
       ↓
Formularios
       ↓
Persistencia
       ↓
Módulos y aplicaciones
```

En scripts clásicos puede utilizarse:

```javascript
"use strict";
```

En módulos modernos y proyectos React con Vite, el modo estricto ya está activo automáticamente.