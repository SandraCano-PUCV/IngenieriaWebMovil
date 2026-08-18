# Práctica: Introducción a TypeScript

## 1. Objetivo de la práctica

El objetivo de esta actividad es utilizar **TypeScript** en un caso sencillo de desarrollo de aplicaciones, comprendiendo especialmente:

- Tipado estático.
- Definición de variables.
- Uso de `interface`.
- Arreglos de objetos.
- Funciones.
- Parámetros tipados.
- Manipulación básica del DOM.
- Separación entre datos, lógica y presentación.
- Utilidad de TypeScript tanto en aplicaciones **web** como **móviles**.

---

# 2. Caso de estudio

Se desarrollará una pequeña aplicación denominada:

## Mis Tareas Académicas

La aplicación permitirá:

1. Registrar una tarea.
2. Indicar la asignatura.
3. Indicar si la tarea está completada.
4. Mostrar todas las tareas registradas.

Cada tarea tendrá la siguiente estructura:

```text
Tarea
 ├── id
 ├── titulo
 ├── asignatura
 └── completada
```

Para representar esta estructura utilizaremos una **interface de TypeScript**.

---
# 3. Entorno de Desarrollo
Para trabajar con TypeScript necesitamos:

- Node.js
- npm
- TypeScript
- Un editor como Visual Studio Code
Node.js permite ejecutar JavaScript fuera del navegador.

`npm` permite administrar las dependencias del proyecto.

TypeScript incorpora tipos y otras características sobre JavaScript.

---
Lo primero es verificar si tenemos **Node.js**
Desde la terminal ejecutar:

```bash
node --version
```

Por ejemplo:

```text
vXX.XX.X
```

Luego comprobar `npm`:

```bash
npm --version
```

Si ambos comandos muestran una versión, podemos comenzar a crear el proyecto.

---
Una vez ya tengamos una carpeta creada para el proyecto, debemos inicializar node.js. 

Ejecutar:

```bash
npm init -y
```

Este comando crea el archivo:

```text
package.json
```

La estructura ahora será:

```text
mi_proyecto/
└── package.json
```

---

# ¿Qué es `package.json`?
s uno de los archivos principales de un proyecto Node.js.

Permite registrar información como:

- Nombre del proyecto.
- Versión.
- Dependencias.
- Dependencias de desarrollo.
- Scripts de ejecución.

Ejemplo:

```json
{
  "name": "mi_proyecto",
  "version": "1.0.0"
}
```

---
# Instalar TypeScript
Instalaremos TypeScript como dependencia de desarrollo:

```bash
npm install --save-dev typescript
```

También puede escribirse:

```bash
npm install -D typescript
```

Después de instalar TypeScript aparecerán:

```text
mi_proyecto/
│
├── node_modules/
├── package.json
└── package-lock.json
```

---

# ¿Qué es `node_modules`?

La carpeta:

```text
node_modules/
```

contiene las librerías instaladas para el proyecto.

Por ejemplo:

```text
mi_proyecto/
│
└── node_modules/
    └── typescript/
```

Las dependencias quedan asociadas al proyecto y no es necesario instalar
TypeScript globalmente.

---

# ¿Qué es `package-lock.json`?

El archivo:

```text
package-lock.json
```

registra las versiones exactas de las dependencias instaladas.

Ayuda a que diferentes desarrolladores puedan instalar versiones
consistentes de las dependencias del proyecto.

---
Ahora, podemos comprobar si tenemos TypeScript funcionando correctamente: 
Ejecutar:

```bash
npx tsc --version
```

Por ejemplo:

```text
Version X.X.X
```

Utilizamos:

```text
npx
```

para ejecutar el compilador de TypeScript instalado dentro del proyecto.

---
Crear el archivo de configuración de TypeScript

Ejecutar:

```bash
npx tsc --init
```

Se creará:

```text
tsconfig.json
```

Ahora tendremos:

```text
mi_proyecto/
│
├── node_modules/
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

# ¿Qué es `tsconfig.json`?

Es el archivo que configura el comportamiento del compilador de TypeScript.

Permite definir, entre otras cosas:

- Qué archivos se compilan.
- Qué versión de JavaScript se genera.
- Dónde se encuentra el código fuente.
- Dónde se guardará el JavaScript generado.
- Qué verificaciones de tipos se realizarán.

---

# Crear las carpetas del proyecto

Crear:

```text
src/
dist/
```

La estructura será:

```text
mi_proyecto/
│
├── src/
├── dist/
├── node_modules/
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

# Configurar `tsconfig.json`

En `tsconfig.json` podemos establecer, entre otras opciones:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  }
}
```
Donde:

```text
rootDir
   ↓
Carpeta donde se encuentra TypeScript

src/
```

y:

```text
outDir
   ↓
Carpeta donde se generará JavaScript

dist/
```

Por lo tanto:

```text
src/index.ts

     ↓ tsc

dist/index.js
```

---
# Configuración como Module
En `tsconfig.json` podemos establecer, estas opciones para ser leído como module:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "ES2020",
    "target":"ES2020",
    "lib": ["ES2020", "DOM"],
    "esModuleInterop": true,
    "skipLibCheck": true,
    "strict": true,
  },
  "include": ["src/**/*.ts"]
}
```
También debe cambiarse en la etiqueta **script** en el HTML
```html
        <script type="module" src="dist/app.js" defer></script>

```

**¿Para qué sirve "type": "module"?**

Principalmente le dice a Node.js que los archivos .js del proyecto deben interpretarse como módulos ES, permitiendo:
```javascript
import { algo } from "./archivo.js";
```
---
# Compilar TypeScript

Ejecutar:

```bash
npx tsc
```

El compilador leerá:

```text
src/index.ts
```

y generará:

```text
dist/index.js
```

La estructura será:

```text
mi_proyecto/
│
├── src/
│   └── index.ts
│
├── dist/
│   └── index.js
│
├── node_modules/
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

# Ejecutar el programa
TypeScript no es el archivo que Node.js ejecutará directamente en este
ejemplo.

Primero:

```text
TypeScript
index.ts
```

se transforma en:

```text
JavaScript
index.js
```

# Flujo de ejecución

```text
Código TypeScript
     │
     │ index.ts
     ▼
Compilador TypeScript
     │
     │ tsc
     ▼
Código JavaScript
     │
     │ index.js
     ▼
Node.js
     │
     ▼
Motor JavaScript
     │
     ▼
Resultado
```

---

# 4. ¿Qué es una interface?

Una `interface` permite definir la **estructura que debe tener un objeto**.

Por ejemplo:

```typescript
interface Tarea {
    id: number;
    titulo: string;
    asignatura: string;
    completada: boolean;
}
```

Esto significa que cualquier objeto que sea declarado como `Tarea` debe contener esos atributos y respetar sus tipos.

Ejemplo correcto:

```typescript
const tarea: Tarea = {
    id: 1,
    titulo: "Resolver ejercicio TypeScript",
    asignatura: "Desarrollo Web",
    completada: false
};
```

TypeScript detectaría un error si escribimos:

```typescript
const tarea: Tarea = {
    id: "uno",
    titulo: "Resolver ejercicio",
    asignatura: "Desarrollo Web",
    completada: false
};
```

porque `id` fue definido como:

```typescript
id: number;
```

y estamos intentando asignarle un `string`.

---

# 4. Crear el proyecto

Crear una carpeta para el proyecto:

```bash
mkdir tareas-typescript
```

Ingresar a la carpeta:

```bash
cd tareas-typescript
```

Inicializar el proyecto Node:

```bash
npm init -y
```

---

# 5. Instalar TypeScript

Instalar TypeScript como dependencia de desarrollo:

```bash
npm install -D typescript
```

La opción:

```bash
-D
```

significa:

```bash
--save-dev
```

por lo tanto, TypeScript será registrado como una dependencia utilizada durante el **desarrollo**.

---

# 6. Crear la configuración de TypeScript

Ejecutar:

```bash
npx tsc --init
```

Esto crea el archivo:

```text
tsconfig.json
```

Utilizaremos una configuración sencilla:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src/**/*.ts"]
}
```

La estructura será:

```text
tareas-typescript/
│
├── src/
│   └── app.ts
│
├── dist/
│
├── index.html
├── package.json
└── tsconfig.json
```

---

# 7. Crear la página HTML

Crear:

```text
index.html
```

con el siguiente contenido:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
    >

    <title>Mis Tareas Académicas</title>
</head>

<body>

    <h1>Mis Tareas Académicas</h1>

    <form id="formTarea">

        <div>
            <label for="titulo">Tarea:</label>

            <input
                type="text"
                id="titulo"
                required
            >
        </div>

        <br>

        <div>
            <label for="asignatura">Asignatura:</label>

            <input
                type="text"
                id="asignatura"
                required
            >
        </div>

        <br>

        <button type="submit">
            Agregar tarea
        </button>

    </form>

    <hr>

    <h2>Tareas registradas</h2>

    <ul id="listaTareas"></ul>

    <script
        type="module"
        src="./dist/app.js">
    </script>

</body>
</html>
```

---

# 8. Crear nuestra primera interface

Crear la carpeta:

```text
src
```

y dentro de ella crear:

```text
app.ts
```

Comenzaremos definiendo la estructura de una tarea:

```typescript
interface Tarea {
    id: number;
    titulo: string;
    asignatura: string;
    completada: boolean;
}
```

La interface funciona como un **contrato**.

Indica que un objeto `Tarea` debe poseer:

| Propiedad | Tipo |
|---|---|
| id | number |
| titulo | string |
| asignatura | string |
| completada | boolean |

---

# 9. Crear un arreglo de tareas

Debajo de la interface agregar:

```typescript
const tareas: Tarea[] = [];
```

Observe la expresión:

```typescript
Tarea[]
```

Esto significa:

> arreglo cuyos elementos deben ser objetos de tipo `Tarea`.

Por ejemplo:

```typescript
const tarea1: Tarea = {
    id: 1,
    titulo: "Estudiar TypeScript",
    asignatura: "Desarrollo Web",
    completada: false
};

tareas.push(tarea1);
```

---

# 10. Crear una función

Crearemos una función para agregar tareas.

```typescript
function agregarTarea(
    titulo: string,
    asignatura: string
): void {

    const nuevaTarea: Tarea = {
        id: tareas.length + 1,
        titulo: titulo,
        asignatura: asignatura,
        completada: false
    };

    tareas.push(nuevaTarea);
}
```

Observe los tipos utilizados:

```typescript
titulo: string
```

y:

```typescript
asignatura: string
```

Los parámetros están tipados.

También tenemos:

```typescript
): void
```

`void` significa que la función **no retorna un valor**.

---

# 11. Simplificar la creación del objeto

Como las variables tienen el mismo nombre que las propiedades podemos escribir:

```typescript
function agregarTarea(
    titulo: string,
    asignatura: string
): void {

    const nuevaTarea: Tarea = {
        id: tareas.length + 1,
        titulo,
        asignatura,
        completada: false
    };

    tareas.push(nuevaTarea);
}
```

---

# 12. Crear una función para mostrar las tareas

Agregamos:

```typescript
function mostrarTareas(): void {

    console.log("Tareas registradas:");

    tareas.forEach((tarea: Tarea) => {

        console.log(
            `${tarea.id} - ${tarea.titulo} - ${tarea.asignatura}`
        );

    });

}
```

Ahora podemos probar:

```typescript
agregarTarea(
    "Estudiar interfaces",
    "Desarrollo Web"
);

agregarTarea(
    "Realizar ejercicio práctico",
    "Programación"
);

mostrarTareas();
```

Compilar:

```bash
npx tsc
```

TypeScript generará:

```text
dist/app.js
```

---

# 13. TypeScript y el navegador

Es importante comprender el siguiente proceso:

```text
app.ts
   │
   │ TypeScript Compiler
   │ tsc
   ▼
app.js
   │
   │ Navegador
   ▼
Aplicación Web
```

El navegador **no ejecuta directamente TypeScript**.

El navegador ejecuta:

```text
JavaScript
```

Por eso necesitamos convertir:

```text
TypeScript → JavaScript
```

mediante el compilador `tsc`.

---

# 14. Manipulación del DOM

Ahora utilizaremos nuestra interface dentro de una aplicación web.

Modificar `app.ts`:

```typescript
interface Tarea {
    id: number;
    titulo: string;
    asignatura: string;
    completada: boolean;
}

const tareas: Tarea[] = [];

const formulario =
    document.querySelector<HTMLFormElement>("#formTarea");

const inputTitulo =
    document.querySelector<HTMLInputElement>("#titulo");

const inputAsignatura =
    document.querySelector<HTMLInputElement>("#asignatura");

const listaTareas =
    document.querySelector<HTMLUListElement>("#listaTareas");
```

Observe algo importante:

```typescript
document.querySelector<HTMLInputElement>
```

TypeScript también nos permite indicar **qué tipo de elemento HTML esperamos obtener**.

---

# 15. Función agregar tarea

Agregar:

```typescript
function agregarTarea(
    titulo: string,
    asignatura: string
): void {

    const nuevaTarea: Tarea = {
        id: tareas.length + 1,
        titulo,
        asignatura,
        completada: false
    };

    tareas.push(nuevaTarea);

    mostrarTareas();
}
```

---

# 16. Mostrar las tareas en la página

Crear:

```typescript
function mostrarTareas(): void {

    if (!listaTareas) {
        return;
    }

    listaTareas.innerHTML = "";

    tareas.forEach((tarea: Tarea) => {

        const elemento = document.createElement("li");

        elemento.textContent =
            `${tarea.id}. ${tarea.titulo} - ${tarea.asignatura}`;

        listaTareas.appendChild(elemento);

    });
}
```

Tenemos una primera comprobación:

```typescript
if (!listaTareas) {
    return;
}
```

Esto es necesario porque:

```typescript
querySelector()
```

puede devolver:

```text
elemento
```

o:

```text
null
```

TypeScript obliga al programador a considerar esta posibilidad.

---

# 17. Programación basada en eventos

Ahora queremos ejecutar una acción cuando el usuario presione:

```text
Agregar tarea
```

Usaremos un evento:

```typescript
formulario?.addEventListener(
    "submit",
    (evento: SubmitEvent) => {

        evento.preventDefault();

        if (!inputTitulo || !inputAsignatura) {
            return;
        }

        const titulo: string =
            inputTitulo.value;

        const asignatura: string =
            inputAsignatura.value;

        agregarTarea(
            titulo,
            asignatura
        );

        inputTitulo.value = "";
        inputAsignatura.value = "";

    }
);
```

Aquí aparece el concepto de **programación basada en eventos**.

El programa permanece esperando que ocurra algo:

```text
Usuario
   │
   │ submit
   ▼
Formulario
   │
   │ genera evento
   ▼
addEventListener()
   │
   ▼
Ejecuta función
```

---

# 18. Código completo `app.ts`

```typescript
interface Tarea {
    id: number;
    titulo: string;
    asignatura: string;
    completada: boolean;
}

const tareas: Tarea[] = [];

const formulario =
    document.querySelector<HTMLFormElement>("#formTarea");

const inputTitulo =
    document.querySelector<HTMLInputElement>("#titulo");

const inputAsignatura =
    document.querySelector<HTMLInputElement>("#asignatura");

const listaTareas =
    document.querySelector<HTMLUListElement>("#listaTareas");


function agregarTarea(
    titulo: string,
    asignatura: string
): void {

    const nuevaTarea: Tarea = {
        id: tareas.length + 1,
        titulo,
        asignatura,
        completada: false
    };

    tareas.push(nuevaTarea);

    mostrarTareas();
}


function mostrarTareas(): void {

    if (!listaTareas) {
        return;
    }

    listaTareas.innerHTML = "";

    tareas.forEach((tarea: Tarea) => {

        const elemento =
            document.createElement("li");

        elemento.textContent =
            `${tarea.id}. ${tarea.titulo} - ${tarea.asignatura}`;

        listaTareas.appendChild(elemento);

    });
}


formulario?.addEventListener(
    "submit",
    (evento: SubmitEvent) => {

        evento.preventDefault();

        if (!inputTitulo || !inputAsignatura) {
            return;
        }

        const titulo: string =
            inputTitulo.value;

        const asignatura: string =
            inputAsignatura.value;

        agregarTarea(
            titulo,
            asignatura
        );

        inputTitulo.value = "";
        inputAsignatura.value = "";

    }
);
```

---

# 19. Compilar el proyecto

Ejecutar:

```bash
npx tsc
```

El compilador tomará:

```text
src/app.ts
```

y generará:

```text
dist/app.js
```

Por lo tanto:

```text
src/app.ts
     │
     │ npx tsc
     ▼
dist/app.js
```

---

# 20. Agregar scripts de npm

Modificar `package.json`:

```json
{
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch"
  }
}
```

Ahora podremos ejecutar:

```bash
npm run build
```

Para compilar.

También podemos ejecutar:

```bash
npm run watch
```

En este caso TypeScript observará los cambios realizados en los archivos `.ts` y volverá a compilarlos automáticamente.

---

# 21. ¿Dónde está el desarrollo móvil?

Uno de los motivos por los que TypeScript es importante es que el mismo conocimiento puede utilizarse en diferentes tecnologías.

Por ejemplo:

```text
                     TypeScript
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
       Angular          Ionic      React Native
          │              │              │
          ▼              ▼              ▼
         Web        Web + Mobile       Mobile
```

La `interface` que construimos:

```typescript
interface Tarea {
    id: number;
    titulo: string;
    asignatura: string;
    completada: boolean;
}
```

no depende directamente de que nuestra aplicación sea web o móvil.

Por ejemplo, en una aplicación móvil desarrollada posteriormente con **Ionic + Angular + TypeScript**, podríamos utilizar exactamente la misma estructura:

```typescript
const tarea: Tarea = {
    id: 1,
    titulo: "Estudiar TypeScript",
    asignatura: "Ingeniería Web",
    completada: false
};
```

Esta separación resulta importante:

```text
          DATOS
            │
            ▼
        Interface
          Tarea
            │
       ┌────┴────┐
       ▼         ▼
      Web       Móvil
```

La forma de visualizar los datos puede cambiar, pero el **modelo de datos puede mantenerse**.

---

# 22. Segunda interface

Una aplicación real normalmente utiliza más de una estructura.

Por ejemplo, podemos incorporar estudiantes:

```typescript
interface Estudiante {
    id: number;
    nombre: string;
    email: string;
}
```

Crear un estudiante:

```typescript
const estudiante: Estudiante = {
    id: 1,
    nombre: "Ana",
    email: "ana@universidad.cl"
};
```

Ahora tenemos dos tipos de objetos:

```text
Estudiante
 ├── id
 ├── nombre
 └── email


Tarea
 ├── id
 ├── titulo
 ├── asignatura
 └── completada
```

---

# 23. Relacionar interfaces

Podemos mejorar `Tarea` incorporando un estudiante.

```typescript
interface Estudiante {
    id: number;
    nombre: string;
    email: string;
}

interface Tarea {
    id: number;
    titulo: string;
    asignatura: string;
    completada: boolean;
    estudiante: Estudiante;
}
```

Ahora podemos crear:

```typescript
const estudiante1: Estudiante = {
    id: 1,
    nombre: "Ana",
    email: "ana@universidad.cl"
};
```

y posteriormente:

```typescript
const tarea1: Tarea = {
    id: 1,
    titulo: "Práctico TypeScript",
    asignatura: "Desarrollo Web",
    completada: false,
    estudiante: estudiante1
};
```

Tenemos una composición:

```text
Tarea
 │
 ├── id
 ├── titulo
 ├── asignatura
 ├── completada
 │
 └── estudiante
        │
        ├── id
        ├── nombre
        └── email
```

---

# 24. Actividad para el estudiante

Modificar la aplicación para incorporar las siguientes funcionalidades.

## Parte 1 — Agregar fecha de entrega

Modificar la interface:

```typescript
interface Tarea {
    id: number;
    titulo: string;
    asignatura: string;
    fechaEntrega: string;
    completada: boolean;
}
```

Agregar al formulario:

```html
<input
    type="date"
    id="fechaEntrega"
>
```

Mostrar la fecha junto con la tarea.

---

## Parte 2 — Marcar una tarea como completada

Crear la función:

```typescript
function completarTarea(id: number): void {
    // implementar
}
```

La función debe buscar una tarea por su `id` y modificar:

```typescript
completada
```

de:

```typescript
false
```

a:

```typescript
true
```

---

## Parte 3 — Interface estudiante

Crear:

```typescript
interface Estudiante {
    id: number;
    nombre: string;
    email: string;
}
```

Crear al menos dos estudiantes.

---

## Parte 4 — Asociar una tarea a un estudiante

Modificar:

```typescript
interface Tarea
```

para que tenga:

```typescript
estudiante: Estudiante;
```

Mostrar:

```text
Estudiar TypeScript
Asignatura: Desarrollo Web
Estudiante: Ana
Estado: Pendiente
```

---

# 25. Desafío

Agregar una nueva propiedad:

```typescript
prioridad
```

que solamente pueda contener:

```text
baja
media
alta
```

No utilizar simplemente:

```typescript
string
```

Investigar cómo definir en TypeScript:

```typescript
type Prioridad = "baja" | "media" | "alta";
```

y posteriormente utilizar:

```typescript
interface Tarea {
    id: number;
    titulo: string;
    asignatura: string;
    completada: boolean;
    prioridad: Prioridad;
}
```

Pregúntese:

**¿Qué ventaja tiene esto frente a declarar `prioridad` simplemente como `string`?**

---

# 26. Preguntas de análisis

1. ¿Qué diferencia existe entre JavaScript y TypeScript?

2. ¿Por qué el navegador ejecuta `app.js` y no directamente `app.ts`?

3. ¿Qué función cumple una `interface`?

4. ¿Qué error produciría TypeScript si se define:

```typescript
interface Persona {
    edad: number;
}
```

y posteriormente:

```typescript
const persona: Persona = {
    edad: "veinte"
};
```

5. ¿Qué significa:

```typescript
Tarea[]
```

6. ¿Qué significa:

```typescript
function agregarTarea(titulo: string): void
```

7. ¿Cuál es la diferencia entre:

```typescript
string
```

y:

```typescript
"baja" | "media" | "alta"
```

8. ¿Por qué TypeScript puede ser útil tanto para desarrollo web como móvil?

---

# 27. Conceptos trabajados

Al finalizar la práctica el estudiante habrá utilizado:

```text
TypeScript
│
├── Tipos primitivos
│   ├── string
│   ├── number
│   └── boolean
│
├── Tipos compuestos
│   ├── objetos
│   └── arreglos
│
├── Interfaces
│
├── Funciones
│   ├── parámetros tipados
│   └── retorno void
│
├── Valores ausentes
│   └── null
│
├── Eventos
│   └── addEventListener
│
└── DOM
    ├── querySelector
    ├── createElement
    └── appendChild
```

---

# 28. Resultado esperado

Al terminar la actividad se espera comprender que TypeScript agrega un sistema de tipos sobre JavaScript.

En JavaScript podríamos escribir:

```javascript
let edad = 20;

edad = "veinte";
```

mientras que en TypeScript:

```typescript
let edad: number = 20;

edad = "veinte";
```

produce un error durante el desarrollo.

La idea fundamental es:

```text
JavaScript
    +
Sistema de tipos
    =
TypeScript
```

y esos tipos pueden utilizarse para modelar los datos de aplicaciones que posteriormente pueden ejecutarse en diferentes plataformas:

```text
             TypeScript
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
Aplicación Web       Aplicación Móvil
```

Por esta razón TypeScript constituye una tecnología fundamental en frameworks modernos como **Angular** y puede utilizarse posteriormente en soluciones móviles mediante tecnologías como **Ionic**.