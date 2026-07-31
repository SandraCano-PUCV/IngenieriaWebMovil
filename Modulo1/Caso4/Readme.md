# Crear una SPA sencilla con Vite desde cero

> Guía paso a paso para instalar Node.js, comprender npm y `package.json`, crear una SPA con JavaScript puro y generar una versión de producción con Vite.

## Índice

1. [Objetivo](#1-objetivo)
2. [Qué es una SPA](#2-qué-es-una-spa)
3. [Qué es Node.js](#3-qué-es-nodejs)
4. [Qué es npm](#4-qué-es-npm)
5. [Qué es Vite](#5-qué-es-vite)
6. [Requisitos](#6-requisitos)
7. [Instalar Node.js](#7-instalar-nodejs)
8. [Verificar la instalación](#8-verificar-la-instalación)
9. [Crear el proyecto con create-vite](#9-crear-el-proyecto-con-create-vite)
10. [Crear el proyecto manualmente](#10-crear-el-proyecto-manualmente)
11. [Comprender package.json](#11-comprender-packagejson)
12. [Estructura del proyecto](#12-estructura-del-proyecto)
13. [Código de la SPA](#13-código-de-la-spa)
14. [Cómo funciona el enrutamiento](#14-cómo-funciona-el-enrutamiento)
15. [Ejecutar el servidor de desarrollo](#15-ejecutar-el-servidor-de-desarrollo)
16. [Hot Module Replacement](#16-hot-module-replacement)
17. [Instalar y administrar dependencias](#17-instalar-y-administrar-dependencias)
18. [Generar la versión de producción](#18-generar-la-versión-de-producción)
19. [Vista previa de producción](#19-vista-previa-de-producción)
20. [Configurar vite.config.js](#20-configurar-viteconfigjs)
21. [Recursos e imágenes](#21-recursos-e-imágenes)
22. [Variables de entorno](#22-variables-de-entorno)
23. [Archivos que deben subirse a Git](#23-archivos-que-deben-subirse-a-git)
24. [Errores frecuentes](#24-errores-frecuentes)
25. [SPA con rutas hash y rutas History API](#25-spa-con-rutas-hash-y-rutas-history-api)
26. [Lista de verificación](#26-lista-de-verificación)
27. [Comandos principales](#27-comandos-principales)
28. [Fuentes oficiales](#28-fuentes-oficiales)

---

## 1. Objetivo

Al finalizar esta guía se tendrá una aplicación de una sola página con tres vistas:

- Inicio;
- Talleres;
- Contacto.

La navegación cambiará el contenido sin cargar otro archivo HTML.

La aplicación utilizará:

- HTML5;
- CSS3;
- JavaScript moderno;
- módulos de JavaScript;
- manipulación del DOM;
- eventos;
- rutas basadas en `hash`;
- Vite como servidor de desarrollo y herramienta de construcción.

---

## 2. ¿Qué es una SPA?

SPA significa **Single-Page Application**, es decir, **aplicación de una sola página**.

En un sitio tradicional, cada enlace puede solicitar un archivo HTML distinto:

```text
index.html
talleres.html
contacto.html
```

En una SPA se carga inicialmente un documento principal:

```text
index.html
```

Luego JavaScript modifica la vista mostrada dentro de un contenedor.

```html
<main id="app"></main>
```

Flujo simplificado:

```text
El navegador carga index.html
            ↓
JavaScript inicia la aplicación
            ↓
Lee la ruta actual
            ↓
Genera la vista correspondiente
            ↓
Actualiza el elemento #app
```

### Ventajas educativas

- permite practicar DOM;
- separa vistas y lógica;
- evita duplicar estructuras HTML;
- permite crear navegación dinámica;
- facilita comprender los frameworks SPA.

### Consideración

Una SPA sencilla no necesita necesariamente React, Vue o Angular. Puede desarrollarse con JavaScript puro.

---

## 3. ¿Qué es Node.js?

**Node.js** es un entorno de ejecución de JavaScript gratuito, de código abierto y multiplataforma.

Permite ejecutar JavaScript fuera del navegador.

En este proyecto, Node.js no se utiliza para crear todavía un servidor backend. Se utiliza para ejecutar herramientas de desarrollo como:

- npm;
- Vite;
- compiladores;
- linters;
- scripts de automatización.

Ejemplo:

```bash
node --version
```

Node.js incluye normalmente el gestor de paquetes npm.

### Node.js no es lo mismo que JavaScript

| Concepto | Descripción |
|---|---|
| JavaScript | Lenguaje de programación |
| Navegador | Entorno que ejecuta JavaScript en una página |
| Node.js | Entorno que ejecuta JavaScript fuera del navegador |
| npm | Gestor de paquetes utilizado con Node.js |
| Vite | Herramienta de desarrollo instalada mediante npm |

---

## 4. ¿Qué es npm?

npm significa **Node Package Manager**.

Permite:

- instalar paquetes;
- administrar dependencias;
- ejecutar scripts;
- crear `package.json`;
- registrar versiones;
- instalar herramientas como Vite.

Ejemplo:

```bash
npm install
```

Este comando lee `package.json` e instala las dependencias del proyecto.

Ejemplo para ejecutar un script:

```bash
npm run dev
```

---

## 5. ¿Qué es Vite?

Vite es una herramienta moderna para desarrollar aplicaciones web.

Proporciona principalmente:

1. un servidor de desarrollo rápido;
2. actualización de módulos durante el desarrollo;
3. soporte para módulos ES;
4. procesamiento de CSS y recursos;
5. construcción optimizada para producción.

En desarrollo:

```bash
npm run dev
```

Para producción:

```bash
npm run build
```

Vite utiliza `index.html` como punto de entrada de una aplicación web estándar.

---

## 6. Requisitos

La documentación actual de Vite exige una versión compatible de Node.js.

Requisito indicado por Vite:

```text
Node.js 20.19 o superior
o
Node.js 22.12 o superior
```

Algunas plantillas pueden exigir una versión más nueva.

Se recomienda instalar una versión **LTS** compatible desde el sitio oficial de Node.js.

También se necesita:

- un editor como Visual Studio Code;
- una terminal;
- un navegador moderno;
- conexión a Internet para instalar inicialmente las dependencias.

---

## 7. Instalar Node.js

### Windows

1. Visitar la página oficial de descarga de Node.js.
2. Descargar el instalador de una versión LTS compatible.
3. Ejecutar el instalador.
4. Mantener seleccionada la instalación de npm.
5. Finalizar la instalación.
6. Cerrar y volver a abrir la terminal.

### macOS

Se puede utilizar el instalador oficial:

1. descargar el paquete para macOS;
2. ejecutar el instalador;
3. completar el asistente;
4. abrir una terminal nueva.

También puede utilizarse un administrador de versiones de Node.js cuando se trabaja con varios proyectos.

### Linux

Se recomienda seguir uno de los métodos indicados en la página oficial de Node.js o utilizar un administrador de versiones.

Es importante comprobar que la versión instalada cumple los requisitos de Vite.

### ¿Por qué utilizar una versión LTS?

LTS significa **Long-Term Support**.

Las versiones LTS se orientan a:

- mayor estabilidad;
- mantenimiento prolongado;
- correcciones de seguridad;
- compatibilidad para proyectos.

---

## 8. Verificar la instalación

Abrir una terminal y ejecutar:

```bash
node --version
```

Ejemplo de respuesta:

```text
v24.x.x
```

Comprobar npm:

```bash
npm --version
```

Ejemplo:

```text
11.x.x
```

Las versiones exactas pueden variar.

### Si aparece “node no se reconoce”

Posibles soluciones:

1. cerrar y abrir la terminal;
2. reiniciar el editor;
3. revisar la instalación;
4. comprobar que Node.js fue agregado a la variable `PATH`;
5. reinstalar Node.js desde el sitio oficial.

---

## 9. Crear el proyecto con `create-vite`

Esta es la forma recomendada.

En la terminal:

```bash
npm create vite@latest
```

El asistente solicitará:

```text
Project name:
Select a framework:
Select a variant:
```

Para este ejemplo:

```text
Project name: aulabot-spa
Framework: Vanilla
Variant: JavaScript
```

Después:

```bash
cd aulabot-spa
npm install
npm run dev
```

También se puede crear sin responder al asistente:

```bash
npm create vite@latest aulabot-spa -- --template vanilla
```

Luego:

```bash
cd aulabot-spa
npm install
npm run dev
```

### Significado de los comandos

| Comando | Función |
|---|---|
| `npm create vite@latest` | Ejecuta el generador oficial de proyectos |
| `aulabot-spa` | Nombre de la carpeta y del proyecto |
| `--template vanilla` | Selecciona JavaScript sin framework |
| `cd aulabot-spa` | Entra en la carpeta |
| `npm install` | Instala las dependencias |
| `npm run dev` | Inicia el servidor de desarrollo |

---

## 10. Crear el proyecto manualmente

Esta alternativa permite comprender la configuración.

### Paso 1: crear la carpeta

```bash
mkdir aulabot-spa
cd aulabot-spa
```

### Paso 2: crear `package.json`

```bash
npm init -y
```

### Paso 3: instalar Vite

```bash
npm install --save-dev vite@latest
```

Forma abreviada:

```bash
npm install -D vite@latest
```

### Paso 4: configurar los scripts

Editar `package.json` para que contenga:

```json
{
  "name": "aulabot-spa",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^8.2.0"
  }
}
```

> La versión de Vite mostrada corresponde al momento de redactar esta guía. Al ejecutar `npm install -D vite@latest`, npm registra automáticamente la versión instalada.

### Paso 5: crear carpetas y archivos

```text
aulabot-spa/
├── index.html
├── package.json
└── src/
    ├── main.js
    └── styles.css
```

### Paso 6: iniciar Vite

```bash
npm run dev
```

---

## 11. Comprender `package.json`

`package.json` describe el proyecto y su configuración para npm.

Debe contener JSON válido:

- las claves llevan comillas dobles;
- las cadenas llevan comillas dobles;
- no se permiten comentarios;
- no debe existir una coma sobrante al final.

### Ejemplo

```json
{
  "name": "aulabot-spa",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^8.2.0"
  }
}
```

### `name`

```json
"name": "aulabot-spa"
```

Identifica el proyecto.

Conviene utilizar:

- minúsculas;
- guiones;
- sin espacios;
- sin caracteres especiales innecesarios.

### `private`

```json
"private": true
```

Evita publicar accidentalmente el proyecto como paquete en npm.

### `version`

```json
"version": "1.0.0"
```

Identifica la versión del proyecto.

Formato habitual:

```text
mayor.menor.parche
```

### `type`

```json
"type": "module"
```

Indica que los archivos JavaScript de Node.js utilizan módulos ES.

Permite escribir:

```javascript
import { defineConfig } from "vite";
export default {};
```

En el navegador, el módulo principal se declara en HTML:

```html
<script type="module" src="/src/main.js"></script>
```

Los scripts de módulo se comportan de forma diferida por defecto.

### `scripts`

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

Los scripts se ejecutan mediante npm.

```bash
npm run dev
npm run build
npm run preview
```

#### `dev`

```json
"dev": "vite"
```

Inicia el servidor de desarrollo.

#### `build`

```json
"build": "vite build"
```

Crea los archivos optimizados para producción.

#### `preview`

```json
"preview": "vite preview"
```

Permite revisar localmente el resultado de producción.

No está pensado como servidor definitivo de producción.

### `devDependencies`

```json
"devDependencies": {
  "vite": "^8.2.0"
}
```

Contiene paquetes utilizados para desarrollar o construir el proyecto.

Vite es una dependencia de desarrollo porque ayuda a trabajar con el código, pero no se carga como biblioteca dentro de la aplicación final.

### `dependencies`

Se utiliza para paquetes que forman parte de la aplicación.

Ejemplo conceptual:

```json
"dependencies": {
  "alguna-biblioteca": "^1.0.0"
}
```

En esta SPA con JavaScript puro no es necesario agregar dependencias de ejecución.

---

## 12. Estructura del proyecto

La estructura final será:

```text
aulabot-spa/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.js
│   ├── styles.css
│   └── assets/
│       └── images/
├── .gitignore
├── index.html
├── package.json
└── package-lock.json
```

Después de ejecutar `npm install`, también aparece:

```text
node_modules/
```

### Archivos importantes

| Archivo o carpeta | Función |
|---|---|
| `index.html` | Punto de entrada HTML |
| `src/main.js` | Lógica principal |
| `src/styles.css` | Estilos |
| `src/assets/` | Recursos procesados por Vite |
| `public/` | Recursos públicos sin procesamiento |
| `package.json` | Configuración y dependencias |
| `package-lock.json` | Versiones exactas instaladas |
| `node_modules/` | Paquetes instalados |
| `dist/` | Resultado de producción |

---

## 13. Código de la SPA

## `index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <meta
    name="description"
    content="SPA sencilla del Laboratorio AulaBot creada con Vite."
  >

  <title>AulaBot SPA</title>

  <script
    type="module"
    src="/src/main.js"
  ></script>
</head>

<body>
  <header class="encabezado">
    <div class="contenedor encabezado__contenido">
      <a class="marca" href="#/">
        AulaBot
      </a>

      <nav aria-label="Navegación principal">
        <ul class="menu">
          <li>
            <a data-link href="#/">Inicio</a>
          </li>

          <li>
            <a data-link href="#/talleres">
              Talleres
            </a>
          </li>

          <li>
            <a data-link href="#/contacto">
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <main id="app" tabindex="-1">
    <!-- JavaScript inserta aquí la vista -->
  </main>

  <footer class="pie">
    <div class="contenedor">
      <p>
        &copy; 2026 Laboratorio AulaBot
      </p>
    </div>
  </footer>
</body>
</html>
```

### ¿Por qué no se agrega `<link>` para CSS?

El CSS se importará desde el módulo JavaScript:

```javascript
import "./styles.css";
```

Vite detecta esa importación y procesa la hoja de estilos.

---

## `src/main.js`

```javascript
"use strict";

import "./styles.css";

const app = document.querySelector("#app");

const vistas = {
  "/": `
    <section class="hero">
      <div class="contenedor">
        <p class="etiqueta">
          Robótica educativa
        </p>

        <h1>Aprende, construye y programa</h1>

        <p>
          AulaBot ofrece experiencias de robótica,
          programación e inteligencia artificial.
        </p>

        <a class="boton" href="#/talleres">
          Ver talleres
        </a>
      </div>
    </section>
  `,

  "/talleres": `
    <section class="seccion">
      <div class="contenedor">
        <h1>Talleres disponibles</h1>

        <div class="rejilla">
          <article class="tarjeta">
            <h2>Robótica</h2>
            <p>
              Construcción y programación de robots.
            </p>
          </article>

          <article class="tarjeta">
            <h2>Programación web</h2>
            <p>
              Creación de interfaces con HTML,
              CSS y JavaScript.
            </p>
          </article>

          <article class="tarjeta">
            <h2>Inteligencia artificial</h2>
            <p>
              Introducción a modelos y datos.
            </p>
          </article>
        </div>
      </div>
    </section>
  `,

  "/contacto": `
    <section class="seccion">
      <div class="contenedor">
        <h1>Contacto</h1>

        <form id="formContacto" class="formulario">
          <div class="campo">
            <label for="nombre">
              Nombre
            </label>

            <input
              id="nombre"
              name="nombre"
              type="text"
              minlength="3"
              required
            >
          </div>

          <div class="campo">
            <label for="correo">
              Correo
            </label>

            <input
              id="correo"
              name="correo"
              type="email"
              required
            >
          </div>

          <div class="campo">
            <label for="mensaje">
              Mensaje
            </label>

            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              required
            ></textarea>
          </div>

          <button class="boton" type="submit">
            Enviar
          </button>

          <p
            id="respuestaFormulario"
            role="status"
            aria-live="polite"
          ></p>
        </form>
      </div>
    </section>
  `
};

function obtenerRuta() {
  const hash = window.location.hash;

  if (!hash || hash === "#") {
    return "/";
  }

  return hash.slice(1);
}

function obtenerVistaNoEncontrada() {
  return `
    <section class="seccion">
      <div class="contenedor">
        <h1>Página no encontrada</h1>

        <p>
          La ruta solicitada no existe.
        </p>

        <a class="boton" href="#/">
          Volver al inicio
        </a>
      </div>
    </section>
  `;
}

function marcarEnlaceActivo(rutaActual) {
  const enlaces = document.querySelectorAll(
    "[data-link]"
  );

  enlaces.forEach(enlace => {
    const rutaEnlace =
      enlace.getAttribute("href").slice(1);

    const activo = rutaEnlace === rutaActual;

    enlace.classList.toggle(
      "menu__enlace--activo",
      activo
    );

    if (activo) {
      enlace.setAttribute(
        "aria-current",
        "page"
      );
    } else {
      enlace.removeAttribute("aria-current");
    }
  });
}

function configurarFormulario() {
  const formulario = document.querySelector(
    "#formContacto"
  );

  if (!formulario) {
    return;
  }

  formulario.addEventListener(
    "submit",
    evento => {
      evento.preventDefault();

      const respuesta = document.querySelector(
        "#respuestaFormulario"
      );

      const datos = new FormData(formulario);
      const nombre = datos.get("nombre").trim();

      respuesta.textContent =
        `Gracias, ${nombre}. El formulario fue validado.`;

      formulario.reset();
    }
  );
}

function renderizar() {
  const ruta = obtenerRuta();
  const vista = vistas[ruta];

  app.innerHTML =
    vista ?? obtenerVistaNoEncontrada();

  marcarEnlaceActivo(ruta);
  configurarFormulario();

  app.focus();
}

window.addEventListener(
  "hashchange",
  renderizar
);

renderizar();
```

> En este ejemplo, `innerHTML` se utiliza solamente con plantillas definidas por la propia aplicación. No se deben insertar directamente datos proporcionados por usuarios mediante `innerHTML`.

---

## `src/styles.css`

```css
:root {
  --color-principal: #0879bd;
  --color-oscuro: #062d58;
  --color-fondo: #f4f7fa;
  --color-superficie: #ffffff;
  --color-texto: #20242a;
  --color-borde: #cbd3dc;
  --radio: 0.75rem;
  --ancho: 72rem;
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
  background: var(--color-fondo);
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  line-height: 1.6;
}

button,
input,
textarea {
  font: inherit;
}

a {
  color: var(--color-principal);
}

.contenedor {
  width: min(100% - 2rem, var(--ancho));
  margin-inline: auto;
}

.encabezado {
  border-bottom: 1px solid var(--color-borde);
  background: var(--color-superficie);
}

.encabezado__contenido {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-block: 1rem;
}

.marca {
  color: var(--color-oscuro);
  font-size: 1.4rem;
  font-weight: 800;
  text-decoration: none;
}

.menu {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.menu a {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.4rem;
  color: var(--color-texto);
  font-weight: 700;
  text-decoration: none;
}

.menu a:hover,
.menu__enlace--activo {
  color: var(--color-principal);
  background: rgb(8 121 189 / 10%);
}

.hero {
  min-height: 65dvh;
  display: grid;
  align-items: center;
  padding-block: 4rem;
  background:
    linear-gradient(
      135deg,
      rgb(8 121 189 / 16%),
      rgb(240 165 0 / 10%)
    );
}

.hero h1 {
  max-width: 15ch;
  margin-block: 0 1rem;
  color: var(--color-oscuro);
  font-size: clamp(2.4rem, 7vw, 4.8rem);
  line-height: 1.05;
}

.etiqueta {
  color: var(--color-principal);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.seccion {
  min-height: 65dvh;
  padding-block: 4rem;
}

.rejilla {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1.5rem;
}

.tarjeta,
.formulario {
  padding: 1.5rem;
  border: 1px solid var(--color-borde);
  border-radius: var(--radio);
  background: var(--color-superficie);
}

.formulario {
  display: grid;
  gap: 1rem;
  max-width: 42rem;
}

.campo {
  display: grid;
  gap: 0.4rem;
}

.campo label {
  font-weight: 700;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #75808d;
  border-radius: 0.4rem;
}

.boton {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  min-height: 2.75rem;
  padding: 0.7rem 1.2rem;
  border: 2px solid var(--color-principal);
  border-radius: 0.4rem;
  color: white;
  background: var(--color-principal);
  font-weight: 750;
  text-decoration: none;
  cursor: pointer;
}

.boton:hover {
  border-color: var(--color-oscuro);
  background: var(--color-oscuro);
}

:focus-visible {
  outline: 3px solid #f0a500;
  outline-offset: 3px;
}

.pie {
  padding-block: 2rem;
  color: white;
  background: var(--color-oscuro);
}

.pie p {
  margin: 0;
}

@media (min-width: 48rem) {
  .encabezado__contenido {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
```

---

## 14. Cómo funciona el enrutamiento

Los enlaces utilizan rutas hash:

```html
<a href="#/">Inicio</a>
<a href="#/talleres">Talleres</a>
<a href="#/contacto">Contacto</a>
```

Ejemplos de URL:

```text
http://localhost:5173/#/
http://localhost:5173/#/talleres
http://localhost:5173/#/contacto
```

Cuando cambia el hash, se ejecuta:

```javascript
window.addEventListener(
  "hashchange",
  renderizar
);
```

La función obtiene la ruta:

```javascript
function obtenerRuta() {
  return window.location.hash.slice(1) || "/";
}
```

Luego selecciona una vista:

```javascript
const vista = vistas[ruta];
```

Finalmente actualiza:

```javascript
app.innerHTML = vista;
```

No se solicita otro archivo HTML.

---

## 15. Ejecutar el servidor de desarrollo

Desde la raíz del proyecto:

```bash
npm run dev
```

Vite mostrará una dirección similar a:

```text
Local: http://localhost:5173/
```

Abrirla en el navegador.

### Abrir automáticamente

Se puede ejecutar:

```bash
npm run dev -- --open
```

### Elegir puerto

```bash
npm run dev -- --port 3000
```

### Permitir acceso desde la red local

```bash
npm run dev -- --host
```

---

## 16. Hot Module Replacement

Durante el desarrollo, Vite actualiza los módulos modificados sin recargar completamente la aplicación.

Esto se conoce como:

```text
HMR — Hot Module Replacement
```

Flujo:

```text
Se guarda un archivo
        ↓
Vite detecta el cambio
        ↓
Actualiza el módulo
        ↓
El navegador refleja el cambio
```

---

## 17. Instalar y administrar dependencias

### Instalar las dependencias registradas

```bash
npm install
```

También puede utilizarse:

```bash
npm i
```

### Instalar una dependencia de ejecución

```bash
npm install nombre-paquete
```

Se registra en:

```json
"dependencies"
```

### Instalar una dependencia de desarrollo

```bash
npm install -D nombre-paquete
```

Se registra en:

```json
"devDependencies"
```

### Desinstalar

```bash
npm uninstall nombre-paquete
```

### Actualizar dentro de los rangos permitidos

```bash
npm update
```

### Revisar paquetes instalados

```bash
npm list --depth=0
```

---

## 18. Generar la versión de producción

Ejecutar:

```bash
npm run build
```

Vite utiliza:

```text
index.html
```

como entrada y genera la carpeta:

```text
dist/
```

Ejemplo:

```text
dist/
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
└── index.html
```

Los nombres pueden contener un hash para administrar la caché.

### No editar `dist` manualmente

La carpeta debe regenerarse mediante:

```bash
npm run build
```

Cada vez que cambia el código fuente.

---

## 19. Vista previa de producción

Después de construir:

```bash
npm run preview
```

Vite inicia un servidor local para comprobar `dist`.

Este comando sirve para revisión local. No debe considerarse automáticamente un servidor de producción.

---

## 20. Configurar `vite.config.js`

Para una SPA básica no es obligatorio crear este archivo.

Vite busca automáticamente un archivo llamado:

```text
vite.config.js
```

en la raíz.

Ejemplo mínimo:

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
    open: true
  }
});
```

Estructura:

```text
aulabot-spa/
├── vite.config.js
├── package.json
└── ...
```

### Configurar `base`

Si la aplicación se publica en la raíz:

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  base: "/"
});
```

Si se publica bajo un subdirectorio:

```text
https://usuario.github.io/aulabot-spa/
```

puede necesitar:

```javascript
export default defineConfig({
  base: "/aulabot-spa/"
});
```

Para rutas relativas en ciertos alojamientos estáticos:

```javascript
export default defineConfig({
  base: "./"
});
```

La configuración correcta depende de la plataforma de publicación.

---

## 21. Recursos e imágenes

## Dentro de `src/assets`

```text
src/
└── assets/
    └── images/
        └── robotica.jpg
```

Importar:

```javascript
import imagenRobotica from
  "./assets/images/robotica.jpg";
```

Usar:

```javascript
imagen.src = imagenRobotica;
```

Vite procesa el recurso y genera su URL final.

## Dentro de `public`

```text
public/
└── images/
    └── logo.png
```

Usar directamente:

```html
<img
  src="/images/logo.png"
  alt="Logo de AulaBot"
>
```

No se escribe:

```html
<img src="/public/images/logo.png">
```

---

## 22. Variables de entorno

Vite permite archivos como:

```text
.env
.env.local
.env.development
.env.production
```

Las variables expuestas al código cliente deben comenzar con:

```text
VITE_
```

Ejemplo:

```env
VITE_NOMBRE_APP=AulaBot
```

En JavaScript:

```javascript
const nombre =
  import.meta.env.VITE_NOMBRE_APP;
```

### Advertencia

Todo valor expuesto mediante `VITE_` puede terminar disponible en el navegador.

No se deben colocar:

- contraseñas;
- claves privadas;
- secretos;
- credenciales de bases de datos.

---

## 23. Archivos que deben subirse a Git

Ejemplo de `.gitignore`:

```gitignore
node_modules/
dist/
.env.local
.DS_Store
```

Normalmente se suben:

```text
index.html
src/
public/
package.json
package-lock.json
vite.config.js
README.md
.gitignore
```

Normalmente no se sube:

```text
node_modules/
```

Otro desarrollador puede reconstruirla mediante:

```bash
npm install
```

### ¿Se debe subir `package-lock.json`?

Sí, para una aplicación se recomienda conservarlo en el repositorio porque registra las versiones exactas instaladas.

---

## 24. Errores frecuentes

### `npm` no se reconoce

Node.js o npm no están instalados correctamente o la terminal no actualizó `PATH`.

Comprobar:

```bash
node --version
npm --version
```

### Vite informa que Node.js es antiguo

Instalar una versión compatible de Node.js y abrir una terminal nueva.

### Se ejecuta el comando en la carpeta incorrecta

La terminal debe encontrarse donde está `package.json`.

Comprobar:

```bash
dir
```

en Windows, o:

```bash
ls
```

en macOS y Linux.

### Falta `node_modules`

Ejecutar:

```bash
npm install
```

### `vite: command not found`

Si Vite está en `devDependencies`, debe ejecutarse mediante:

```bash
npm run dev
```

npm agrega temporalmente los binarios locales al entorno del script.

También puede utilizarse:

```bash
npx vite
```

### La página queda vacía

Revisar:

- consola del navegador;
- ruta de `main.js`;
- selector `#app`;
- errores de sintaxis;
- importación del CSS;
- rutas escritas en el objeto `vistas`.

### No abrir `index.html` con doble clic

Un proyecto Vite debe ejecutarse con:

```bash
npm run dev
```

Abrir directamente una ruta `file:///` puede causar problemas con módulos y recursos.

### El puerto está ocupado

Vite puede elegir otro puerto automáticamente o se puede especificar:

```bash
npm run dev -- --port 3001
```

### Error JSON en `package.json`

JSON no admite comentarios:

```json
{
  "scripts": {
    "dev": "vite"
  }
}
```

Incorrecto:

```json
{
  // Iniciar Vite
  "scripts": {
    "dev": "vite"
  }
}
```

Tampoco se permite una coma final:

```json
{
  "name": "aulabot-spa",
}
```

---

## 25. SPA con rutas hash y rutas History API

### Rutas hash

```text
/#/talleres
/#/contacto
```

Ventajas:

- fáciles de implementar;
- funcionan en hosting estático;
- no requieren una regla de redirección del servidor;
- son apropiadas para un primer ejemplo.

### History API

Permite rutas como:

```text
/talleres
/contacto
```

Utiliza:

```javascript
history.pushState()
```

y:

```javascript
window.addEventListener("popstate", ...);
```

En producción, el servidor debe enviar `index.html` para las rutas de la SPA. De lo contrario, recargar `/talleres` puede producir un error 404.

Por esta razón, este caso inicial utiliza rutas hash.

---

## 26. Lista de verificación

### Instalación

- [ ] Node.js está instalado.
- [ ] `node --version` funciona.
- [ ] `npm --version` funciona.
- [ ] La versión de Node.js es compatible con Vite.

### Proyecto

- [ ] Existe `package.json`.
- [ ] Vite aparece en `devDependencies`.
- [ ] Existen los scripts `dev`, `build` y `preview`.
- [ ] Existe `index.html`.
- [ ] Existe `src/main.js`.
- [ ] Existe `src/styles.css`.
- [ ] `npm install` finalizó sin errores.

### Desarrollo

- [ ] `npm run dev` inicia el servidor.
- [ ] La navegación cambia la vista.
- [ ] La ruta no encontrada funciona.
- [ ] El formulario evita la recarga.
- [ ] El diseño es responsivo.
- [ ] La consola no muestra errores.

### Producción

- [ ] `npm run build` genera `dist`.
- [ ] `npm run preview` muestra el resultado.
- [ ] La propiedad `base` es correcta para el alojamiento.
- [ ] No se publican secretos en variables `VITE_*`.

---

## 27. Comandos principales

```bash
# Comprobar Node.js
node --version

# Comprobar npm
npm --version

# Crear proyecto automáticamente
npm create vite@latest aulabot-spa -- --template vanilla

# Entrar al proyecto
cd aulabot-spa

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Crear producción
npm run build

# Revisar producción
npm run preview

# Instalar Vite manualmente
npm install -D vite@latest

# Mostrar ayuda de Vite
npx vite --help
```

---

## 28. Fuentes oficiales

- [Node.js: descarga](https://nodejs.org/en/download)
- [Node.js: versiones y calendario de soporte](https://nodejs.org/en/about/previous-releases)
- [Vite: guía de introducción](https://vite.dev/guide/)
- [Vite: configuración](https://vite.dev/config/)
- [Vite: construcción para producción](https://vite.dev/guide/build)
- [Vite: despliegue de un sitio estático](https://vite.dev/guide/static-deploy)
- [npm: package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
- [npm: scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts/)
- [npm: crear package.json](https://docs.npmjs.com/creating-a-package-json-file/)
