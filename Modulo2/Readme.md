# React desde cero con TypeScript

## Ingeniería Web y Móvil

Guía introductoria de **React con TypeScript**, orientada a preparar el trabajo posterior con **Ionic React**.

---
## 1. ¿Qué es React?

React es una **librería de JavaScript** para construir interfaces de usuario mediante componentes reutilizables.

En este curso la secuencia será:

```text
HTML + CSS
    ↓
JavaScript
    ↓
TypeScript
    ↓
React
    ↓
Ionic React
```

React permite trabajar con:

- componentes;
- propiedades o `props`;
- estado;
- eventos;
- renderizado;
- Hooks.

---

## 2. React, Vite, Ionic y Capacitor

No cumplen la misma función.

```text
             Aplicación Ionic React
                      │
             ┌────────┴────────┐
             │                 │
           React             Ionic
      componentes,       componentes de
      props, estado      interfaz móvil
             │                 │
             └────────┬────────┘
                      │
                    Vite
             desarrollo + build
                      │
                  Capacitor
                      │
                Android / iOS
```

- **React:** modelo de componentes, estado, props y eventos.
- **Vite:** entorno de desarrollo y herramienta de build.
- **Ionic React:** React junto con componentes de interfaz web/móvil.
- **Capacitor:** integración con Android, iOS y funcionalidades nativas.
- **Next.js:** otra alternativa basada en React para aplicaciones web; no será el foco de esta unidad.

---

## 3. Crear un proyecto React con Vite

Desde la terminal:

```bash
npm create vite@latest
```

`@latest` indica que npm utilizará la versión publicada con la etiqueta `latest`, normalmente la versión estable más reciente.

Seleccionar:

```text
Framework: React
Variant: TypeScript
```

Si Vite pregunta:

```text
Use React Compiler?
```

para esta introducción se puede seleccionar:

```text
No
```

Luego:

```bash
cd nombre-proyecto
npm install
npm run dev
```

### ¿Qué es React Compiler?

Es una herramienta de optimización de React. No es necesaria para aprender los conceptos fundamentales.

### ¿Qué es ESLint?

ESLint realiza **análisis estático** del código. Revisa el programa sin ejecutarlo y puede detectar:

- variables sin utilizar;
- errores potenciales;
- malas prácticas;
- problemas con reglas de React y Hooks.

---

## 4. Estructura inicial

Un proyecto básico puede contener:

```text
src/
├── App.tsx
├── App.css
├── main.tsx
└── assets/
```

- `main.tsx`: punto de entrada.
- `App.tsx`: componente principal.
- `.tsx`: TypeScript que contiene JSX.

---

## 5. JSX y TSX

JSX permite escribir una sintaxis similar a HTML dentro de JavaScript.

Cuando utilizamos TypeScript, usamos normalmente archivos `.tsx`.

```tsx
function App() {
  return (
    <h1>Hola React</h1>
  );
}

export default App;
```

---

## 6. ¿Qué significa renderizar?

**Renderizar** significa que React procesa un componente para determinar qué interfaz debe mostrar.

```text
Componente
    ↓
return
    ↓
JSX / TSX
    ↓
React procesa el resultado
    ↓
Interfaz visible
```

Ejemplo:

```tsx
function Saludo() {
  return <h1>Hola React</h1>;
}
```

---

## 7. `return` y Fragment `<>...</>`

Un componente funcional retorna la interfaz que React debe renderizar.

```tsx
function App() {
  return (
    <h1>Ingeniería Web y Móvil</h1>
  );
}
```

Si necesitamos retornar varios elementos hermanos, debemos agruparlos.

```tsx
function App() {
  return (
    <>
      <h1>React</h1>
      <p>Introducción</p>
    </>
  );
}
```

`<>...</>` es un **React Fragment**. Agrupa elementos sin agregar un elemento HTML adicional al DOM.

Si ya existe un único elemento raíz, no es necesario:

```tsx
return (
  <ul>
    <li>Curso 1</li>
    <li>Curso 2</li>
  </ul>
);
```

---

## 8. Expresiones dentro de JSX

Las expresiones JavaScript/TypeScript se insertan usando `{}`.

```tsx
const nombre = "Ana";

return (
  <h1>Hola {nombre}</h1>
);
```

También:

```tsx
<p>{2 + 3}</p>
```

mostrará:

```text
5
```

---

## 9. `interface` en TypeScript

`interface` **no pertenece a React**. Pertenece a TypeScript.

Una interface describe la estructura que debe cumplir un objeto.

Crear:

```text
src/interfaces/curso.ts
```

Contenido:

```typescript
export interface Curso {
  id: number;
  nombre: string;
  creditos: number;
}
```

La interface **no crea un objeto**. Solo define su estructura.

```text
Curso
├── id: number
├── nombre: string
└── creditos: number
```

### Diferencia con Java

En Java, una interface suele representar un contrato que una clase implementa.

```java
interface Volador {
    void volar();
}
```

En TypeScript se utiliza frecuentemente para describir la forma de los datos:

```typescript
interface Curso {
  id: number;
  nombre: string;
}
```

---

## 10. Importar un tipo

En `App.tsx`:

```tsx
import type { Curso } from './interfaces/curso';
```

`Curso` se importa solo como **tipo de TypeScript**.

---

## 11. Crear una lista tipada

```tsx
import './App.css';
import type { Curso } from './interfaces/curso';

function App() {

  const cursos: Curso[] = [
    {
      id: 1,
      nombre: "Ingeniería Web",
      creditos: 4
    },
    {
      id: 2,
      nombre: "Bases de Datos",
      creditos: 5
    },
    {
      id: 3,
      nombre: "Inteligencia Artificial",
      creditos: 5
    }
  ];

  return (
    <h1>Lista de cursos</h1>
  );
}

export default App;
```

`Curso[]` significa:

> `cursos` es un arreglo cuyos elementos deben cumplir la interface `Curso`.

---

## 12. Mostrar la lista con `map()`

```tsx
return (
  <ul>
    {cursos.map((item) => (
      <li key={item.id}>
        <h2>{item.nombre}</h2>
        <p>ID: {item.id}</p>
        <p>Créditos: {item.creditos}</p>
      </li>
    ))}
  </ul>
);
```

Flujo:

```text
cursos
   ↓
map()
   ↓
item
   ↓
JSX
   ↓
React renderiza un elemento
por cada curso
```

### ¿Qué es `key`?

`key` es una propiedad especial de React usada para identificar elementos de una lista.

```tsx
<li key={item.id}>
```

No es un atributo HTML estándar y React lo utiliza internamente.

---

## 13. Crear un componente reutilizable

Estructura:

```text
src/
├── interfaces/
│   └── curso.ts
├── components/
│   └── CursoItem.tsx
└── App.tsx
```

Archivo `CursoItem.tsx`:

```tsx
import type { Curso } from "../interfaces/curso";

interface CursoProps {
  curso: Curso;
}

function CursoItem({ curso }: CursoProps) {
  return (
    <li>
      <h2>{curso.nombre}</h2>
      <p>ID: {curso.id}</p>
      <p>Créditos: {curso.creditos}</p>
    </li>
  );
}

export default CursoItem;
```

---

## 14. ¿Qué son las props?

Las **props** permiten enviar datos desde un componente a otro.

En `App.tsx`:

```tsx
<CursoItem
  key={item.id}
  curso={item}
/>
```

Aquí:

```text
key={item.id}  → React la utiliza internamente
curso={item}   → prop que recibe CursoItem
```

El componente recibe:

```tsx
function CursoItem({ curso }: CursoProps)
```

`key` no forma parte de las props normales.

---

## 15. `App.tsx` usando componentes
```tsx
import './App.css';
import type { Curso } from './interfaces/curso';
import CursoItem from './components/CursoItem';

function App() {

  const cursos: Curso[] = [
    { id: 1, nombre: "Ingeniería Web", creditos: 4 },
    { id: 2, nombre: "Bases de Datos", creditos: 5 },
    { id: 3, nombre: "Inteligencia Artificial", creditos: 5 }
  ];

  return (
    <>
      <h1>Lista de cursos</h1>

      <ul>
        {cursos.map((item) => (
          <CursoItem
            key={item.id}
            curso={item}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
```

---

## 16. ¿Qué es un Hook?

Un **Hook** es una función especial de React que permite a los componentes funcionales utilizar funcionalidades administradas por React.

Ejemplos:

```text
useState()
useEffect()
useContext()
```

Por ahora trabajaremos con `useState()`.

---

## 17. `useState`

`useState` permite mantener datos que pueden cambiar.

Se importa así:

```tsx
import { useState } from 'react';
```

`useState` **no es una clase**. Es una función de React, específicamente un Hook.

Ejemplo:

```tsx
const [contador, setContador] = useState(0);
```

Conceptualmente:

```text
useState(0)
    ↓
[estado actual, función para actualizarlo]
      ↓                    ↓
 contador            setContador
```

Esta sintaxis utiliza **desestructuración de arreglos**.

---

## 18. Estado y re-render

Cuando cambia el estado:

```tsx
setContador(contador + 1);
```

ocurre conceptualmente:

```text
setContador()
      ↓
cambia el estado
      ↓
React vuelve a renderizar
      ↓
se actualiza la interfaz
```

Un **re-render no significa recargar toda la página**.

Ejemplo completo:

```tsx
import { useState } from 'react';

function Contador() {

  const [contador, setContador] = useState(0);

  return (
    <>
      <h2>{contador}</h2>

      <button
        onClick={() => setContador(contador + 1)}
      >
        Incrementar
      </button>
    </>
  );
}

export default Contador;
```

---

## 19. Eventos

React permite responder a eventos:

```tsx
<button onClick={() => alert("Hola")}>
  Saludar
</button>
```

También podemos usar una función:

```tsx
function saludar() {
  alert("Hola");
}

return (
  <button onClick={saludar}>
    Saludar
  </button>
);
```

---

## 20. Convertir la lista de cursos en estado

Cambiar:

```tsx
const cursos: Curso[] = [...]
```

por:

```tsx
const [cursos, setCursos] = useState<Curso[]>([
  { id: 1, nombre: "Ingeniería Web", creditos: 4 },
  { id: 2, nombre: "Bases de Datos", creditos: 5 },
  { id: 3, nombre: "Inteligencia Artificial", creditos: 5 }
]);
```

Ahora React administra la lista como estado.

Para agregar un curso:

```tsx
const agregarCurso = () => {

  const nuevoCurso: Curso = {
    id: cursos.length + 1,
    nombre: "Desarrollo Móvil",
    creditos: 4
  };

  setCursos([
    ...cursos,
    nuevoCurso
  ]);
};
```

Y en el `return`:

```tsx
<button onClick={agregarCurso}>
  Agregar curso
</button>
```

Flujo:

```text
click
  ↓
agregarCurso()
  ↓
setCursos()
  ↓
cambia el estado
  ↓
re-render
  ↓
map() procesa la nueva lista
```

---

## 21. Código completo

```tsx
import { useState } from 'react';
import './App.css';

import type { Curso } from './interfaces/curso';
import CursoItem from './components/CursoItem';

function App() {

  const [cursos, setCursos] = useState<Curso[]>([
    { id: 1, nombre: "Ingeniería Web", creditos: 4 },
    { id: 2, nombre: "Bases de Datos", creditos: 5 },
    { id: 3, nombre: "Inteligencia Artificial", creditos: 5 }
  ]);

  const agregarCurso = () => {

    const nuevoCurso: Curso = {
      id: cursos.length + 1,
      nombre: "Desarrollo Móvil",
      creditos: 4
    };

    setCursos([
      ...cursos,
      nuevoCurso
    ]);
  };

  return (
    <>
      <h1>Lista de cursos</h1>

      <button onClick={agregarCurso}>
        Agregar curso
      </button>

      <ul>
        {cursos.map((item) => (
          <CursoItem
            key={item.id}
            curso={item}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
```

---

## 22. Organización recomendada

```text
src/
├── interfaces/
│   └── curso.ts
├── components/
│   └── CursoItem.tsx
├── pages/
│   └── Home.tsx
├── services/
│   └── cursos.service.ts
├── App.tsx
└── main.tsx
```

- `interfaces/`: estructuras de datos.
- `components/`: componentes reutilizables.
- `pages/`: vistas completas.
- `services/`: acceso a datos, APIs o lógica externa.

---

## 23. Resumen

```text
interface
   ↓
define la estructura

Curso[]
   ↓
arreglo tipado

map()
   ↓
transforma datos en interfaz

componentes
   ↓
permiten reutilización

props
   ↓
envían datos entre componentes

Hooks
   ↓
funcionalidades de React

useState
   ↓
mantiene estado

setEstado()
   ↓
modifica el estado

re-render
   ↓
React actualiza la interfaz
```

---

## 24. De React a Ionic React

Los conceptos de React se mantienen.

React:

```tsx
<button onClick={saludar}>
  Saludar
</button>
```

Ionic React:

```tsx
<IonButton onClick={saludar}>
  Saludar
</IonButton>
```

React sigue aportando:

- componentes;
- props;
- estado;
- eventos;
- Hooks.

Ionic agrega componentes como:

```text
IonButton
IonCard
IonList
IonItem
IonInput
IonHeader
IonContent
```

---

## 25. Ejercicio

1. Crear la interface `Curso`.
2. Crear tres cursos.
3. Mostrar la lista con `map()`.
4. Crear `CursoItem`.
5. Enviar cada curso mediante props.
6. Convertir la lista a estado con `useState`.
7. Agregar un botón para incorporar un curso.
8. Agregar un botón para eliminar un curso.
9. Mostrar un mensaje cuando la lista esté vacía.

Flujo final:

```text
Datos
  ↓
Estado
  ↓
Componentes
  ↓
Props
  ↓
Eventos
  ↓
Cambio de estado
  ↓
Re-render
```
