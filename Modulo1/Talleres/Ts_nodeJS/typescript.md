# Introducción a TypeScript
![TypeScript](https://img.shields.io/badge/TypeScript-Lenguaje-3178C6)
![Nivel](https://img.shields.io/badge/Nivel-Introducción-2E8B57)
![Uso](https://img.shields.io/badge/Uso-Educativo-D97706)

## Descripción
Este repositorio contiene una introducción a **TypeScript** 

El objetivo no es estudiar únicamente la sintaxis del lenguaje, sino utilizar TypeScript para reconocer, comparar y aplicar diferentes formas de organizar una solución computacional.

TypeScript permite trabajar principalmente con los siguientes paradigmas:
- programación imperativa;
- programación procedimental;
- programación orientada a objetos;
- programación funcional;
- programación dirigida por eventos;
- programación asíncrona.

TypeScript es un lenguaje **multiparadigma**. Por lo tanto, un programa puede combinar elementos de varios paradigmas de acuerdo con el problema que se desea resolver.
---

## 1. Resultados de aprendizaje
Al finalizar esta introducción, se espera que el estudiante pueda:

- explicar la relación entre JavaScript y TypeScript;
- configurar y ejecutar un proyecto básico;
- reconocer el proceso de verificación y transformación del código;
- declarar variables utilizando tipos;
- emplear funciones, objetos, interfaces, clases y colecciones;
- utilizar inferencia, uniones y estrechamiento de tipos;
- aplicar programación procedimental, orientada a objetos y funcional;
- reconocer el modelo dirigido por eventos y la programación asíncrona;
- comparar distintas soluciones para un mismo problema;
- escribir código legible, modular y verificable.
---

## 2. ¿Qué es TypeScript?

TypeScript es un lenguaje que amplía JavaScript mediante un sistema de tipos y herramientas de análisis estático.

Un archivo TypeScript utiliza normalmente la extensión:

```text
.ts
```

El código TypeScript se verifica y se transforma en JavaScript antes de ser ejecutado en un navegador, en Node.js o en otro entorno compatible con JavaScript.

```text
Código TypeScript (.ts)
          ↓
Verificación de tipos
          ↓
Compilador de TypeScript
          ↓
Código JavaScript (.js)
          ↓
Entorno de ejecución
```

Ejemplo:

```typescript
const mensaje: string = "Hola, TypeScript";

console.log(mensaje);
```

### 2.1 TypeScript no reemplaza JavaScript

TypeScript se apoya en JavaScript:

- utiliza su sintaxis y modelo de ejecución;
- incorpora anotaciones y construcciones de tipos;
- permite detectar diversos errores antes de ejecutar el programa;
- elimina la información de tipos al generar JavaScript.

Por esta razón, aprender TypeScript también requiere comprender los fundamentos de JavaScript.

---

## 3. ¿Por qué utilizar TypeScript en Paradigmas de Programación?

TypeScript es adecuado para estudiar paradigmas porque permite expresar un mismo problema utilizando diferentes estilos.

| Paradigma | Elementos utilizados en TypeScript |
|---|---|
| Imperativo | asignaciones, condiciones, ciclos y cambios de estado |
| Procedimental | funciones, parámetros, retorno y descomposición |
| Orientado a objetos | clases, interfaces, encapsulación y polimorfismo |
| Funcional | funciones puras, composición, `map`, `filter` y `reduce` |
| Dirigido por eventos | eventos, listeners y callbacks |
| Asíncrono | promesas, `async`, `await` y operaciones no bloqueantes |

TypeScript no obliga a utilizar un único paradigma. La selección depende del problema, la arquitectura, el equipo y las restricciones del proyecto.

---

## 4. Requisitos

Para trabajar localmente se recomienda instalar:

- Node.js;
- npm;
- un editor de código, como Visual Studio Code;
- Git de manera opcional.

Compruebe la instalación:

```bash
node --version
npm --version
```

---

## 5. Creación del proyecto

Cree una carpeta e inicialice el proyecto:

```bash
mkdir introduccion-typescript
cd introduccion-typescript
npm init -y
```

Instale TypeScript como dependencia de desarrollo:

```bash
npm install --save-dev typescript
```

Genere el archivo de configuración:

```bash
npx tsc --init
```

Cree las carpetas principales:

```text
introduccion-typescript/
├── src/
│   └── index.ts
├── dist/
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

---

## 6. Configuración básica de `tsconfig.json`

El archivo `tsconfig.json` define los archivos del proyecto y las opciones del compilador.

Una configuración inicial para trabajar con Node.js puede ser:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts"]
}
```

Opciones relevantes:

| Opción | Propósito |
|---|---|
| `target` | versión de JavaScript que se generará |
| `module` | sistema de módulos utilizado |
| `rootDir` | ubicación del código fuente |
| `outDir` | ubicación del código generado |
| `strict` | activa comprobaciones estrictas |
| `include` | selecciona los archivos del proyecto |

Se recomienda mantener `"strict": true` durante el aprendizaje, ya que ayuda a identificar valores no controlados y contratos incompletos.

---

## 7. Configuración de scripts

En `package.json` pueden agregarse los siguientes comandos:

```json
{
  "scripts": {
    "build": "tsc",
    "check": "tsc --noEmit",
    "start": "node dist/index.js"
  }
}
```

Para compilar:

```bash
npm run build
```

Para verificar los tipos sin generar JavaScript:

```bash
npm run check
```

Para ejecutar el programa compilado:

```bash
npm start
```

---

## 8. Primer programa

Cree el archivo `src/index.ts`:

```typescript
const asignatura: string = "Paradigmas de Programación";
const lenguaje: string = "TypeScript";

console.log(`${lenguaje} en ${asignatura}`);
```

Compile y ejecute:

```bash
npm run build
npm start
```

Salida esperada:

```text
TypeScript en Paradigmas de Programación
```

---

## 9. Variables y constantes

TypeScript utiliza `const` y `let`.

```typescript
const nombre: string = "Elena";
let intentos: number = 0;

intentos = intentos + 1;
```

Utilice `const` cuando la referencia no será reasignada y `let` cuando el valor deba cambiar.

Evite `var` en código moderno, debido a sus reglas de alcance y elevación.

### 9.1 Inferencia de tipos

No siempre es necesario escribir el tipo explícitamente:

```typescript
const lenguaje = "TypeScript";
const versionCurso = 1;
const activo = true;
```

TypeScript infiere:

```text
lenguaje     → string
versionCurso → number
activo       → boolean
```

La inferencia reduce anotaciones repetitivas, pero los tipos explícitos son útiles en parámetros, retornos, estructuras públicas y contratos.

---

## 10. Tipos básicos

```typescript
const titulo: string = "Paradigmas";
const unidades: number = 4;
const disponible: boolean = true;
const identificador: bigint = 1000n;
const clave: symbol = Symbol("curso");
```

Utilice los tipos primitivos en minúsculas:

```typescript
string
number
boolean
bigint
symbol
```

No utilice `String`, `Number` o `Boolean` para representar valores primitivos.

---

## 11. Arreglos y tuplas

### 11.1 Arreglos

```typescript
const paradigmas: string[] = [
  "Procedimental",
  "Orientado a objetos",
  "Funcional"
];

const calificaciones: Array<number> = [5.2, 6.0, 6.5];
```

Ambas notaciones son válidas:

```typescript
string[]
Array<string>
```

### 11.2 Tuplas

Una tupla define una cantidad y un orden específico de elementos:

```typescript
const estudiante: [string, number] = ["Camila", 21];

const nombre = estudiante[0];
const edad = estudiante[1];
```

También pueden nombrarse sus posiciones:

```typescript
type Resultado = [valor: number, esValido: boolean];

const resultado: Resultado = [42, true];
```

---

## 12. Objetos

Los objetos agrupan información relacionada:

```typescript
const curso: {
  codigo: string;
  nombre: string;
  creditos: number;
} = {
  codigo: "INF101",
  nombre: "Paradigmas de Programación",
  creditos: 5
};
```

Cuando una estructura será reutilizada, conviene definir un contrato mediante una interfaz o un alias de tipo.

---

## 13. Interfaces

Una interfaz describe la forma esperada de un objeto.

```typescript
interface Estudiante {
  id: number;
  nombre: string;
  correo?: string;
  readonly fechaIngreso: Date;
}

const estudiante: Estudiante = {
  id: 1,
  nombre: "Martín",
  fechaIngreso: new Date()
};
```

En este ejemplo:

- `correo?` es una propiedad opcional;
- `readonly` impide reasignar la propiedad mediante ese contrato;
- la interfaz desaparece al generar JavaScript.

Una interfaz define un contrato, no crea automáticamente un objeto.

---

## 14. Alias de tipo

Un alias permite asignar un nombre a un tipo:

```typescript
type Identificador = string | number;

type EstadoActividad =
  | "pendiente"
  | "en_progreso"
  | "finalizada";
```

Ejemplo:

```typescript
const actividadId: Identificador = "ACT-01";
const estado: EstadoActividad = "en_progreso";
```

Los alias son especialmente útiles para:

- uniones;
- tipos literales;
- tuplas;
- funciones;
- composiciones de tipos.

---

## 15. Tipos unión

Una unión indica que un valor puede pertenecer a más de un tipo:

```typescript
function mostrarId(id: string | number): void {
  console.log(`Identificador: ${id}`);
}

mostrarId(10);
mostrarId("EST-10");
```

Antes de utilizar operaciones específicas debe comprobarse el tipo.

```typescript
function normalizarId(id: string | number): string {
  if (typeof id === "number") {
    return id.toString();
  }

  return id.toUpperCase();
}
```

Este proceso se denomina **estrechamiento de tipos** o *narrowing*.

---

## 16. Tipos especiales

### 16.1 `any`

`any` desactiva gran parte de la comprobación de tipos:

```typescript
let dato: any = "texto";

dato.metodoInexistente();
```

Debe evitarse, salvo en procesos de migración o integración donde no exista una alternativa inmediata.

### 16.2 `unknown`

`unknown` representa un valor desconocido que debe comprobarse antes de usarse:

```typescript
function imprimirValor(valor: unknown): void {
  if (typeof valor === "string") {
    console.log(valor.toUpperCase());
  } else {
    console.log(valor);
  }
}
```

`unknown` es generalmente más seguro que `any`.

### 16.3 `void`

Se utiliza cuando una función no retorna un valor significativo:

```typescript
function mostrarMensaje(mensaje: string): void {
  console.log(mensaje);
}
```

### 16.4 `never`

Representa una operación que no finaliza normalmente:

```typescript
function lanzarError(mensaje: string): never {
  throw new Error(mensaje);
}
```

---

## 17. Funciones

Las funciones pueden definir tipos para sus parámetros y retorno:

```typescript
function sumar(a: number, b: number): number {
  return a + b;
}

const resultado = sumar(3, 4);
```

### 17.1 Parámetros opcionales

```typescript
function saludar(nombre: string, titulo?: string): string {
  if (titulo) {
    return `Hola, ${titulo} ${nombre}`;
  }

  return `Hola, ${nombre}`;
}
```

### 17.2 Valores predeterminados

```typescript
function calcularTotal(
  precio: number,
  cantidad: number = 1
): number {
  return precio * cantidad;
}
```

### 17.3 Funciones flecha

```typescript
const multiplicar = (a: number, b: number): number => {
  return a * b;
};
```

Versión breve:

```typescript
const duplicar = (numero: number): number => numero * 2;
```

---

## 18. Funciones como valores

En TypeScript las funciones pueden almacenarse, enviarse como argumentos y retornarse desde otras funciones.

```typescript
type Operacion = (a: number, b: number) => number;

const sumar: Operacion = (a, b) => a + b;
const restar: Operacion = (a, b) => a - b;

function ejecutar(
  operacion: Operacion,
  a: number,
  b: number
): number {
  return operacion(a, b);
}

console.log(ejecutar(sumar, 8, 2));
console.log(ejecutar(restar, 8, 2));
```

`ejecutar` es una **función de orden superior** porque recibe otra función.

---

## 19. Programación imperativa

La programación imperativa describe paso a paso cómo modificar el estado hasta alcanzar un resultado.

```typescript
const numeros = [1, 2, 3, 4, 5];
let sumaPares = 0;

for (const numero of numeros) {
  if (numero % 2 === 0) {
    sumaPares += numero;
  }
}

console.log(sumaPares);
```

Características:

- secuencia explícita de instrucciones;
- asignaciones;
- estructuras de control;
- estado mutable;
- descripción detallada del procedimiento.

---

## 20. Programación procedimental

La programación procedimental organiza las instrucciones en procedimientos o funciones reutilizables.

```typescript
let total = 0;

function agregar(valor: number): void {
  total += valor;
}

function obtenerTotal(): number {
  return total;
}

agregar(5);
agregar(3);

console.log(obtenerTotal());
```

Este ejemplo presenta:

- estado compartido;
- procedimientos;
- secuencia de llamadas;
- modificación del estado.

Una versión con menor dependencia del estado global sería:

```typescript
function agregar(totalActual: number, valor: number): number {
  return totalActual + valor;
}

let total = 0;

total = agregar(total, 5);
total = agregar(total, 3);

console.log(total);
```

---

## 21. Programación orientada a objetos

La programación orientada a objetos organiza el sistema mediante objetos que combinan estado y comportamiento.

```typescript
interface Acumulable {
  agregar(valor: number): void;
  obtenerTotal(): number;
}

class Acumulador implements Acumulable {
  private total = 0;

  agregar(valor: number): void {
    this.total += valor;
  }

  obtenerTotal(): number {
    return this.total;
  }
}

const acumulador = new Acumulador();

acumulador.agregar(5);
acumulador.agregar(3);

console.log(acumulador.obtenerTotal());
```

Conceptos presentes:

- **clase**: plantilla para crear objetos;
- **objeto**: instancia de una clase;
- **encapsulación**: control del acceso al estado;
- **interfaz**: contrato de comportamiento;
- **polimorfismo**: objetos diferentes pueden cumplir el mismo contrato.

### 21.1 Herencia

```typescript
abstract class Figura {
  abstract calcularArea(): number;
}

class Rectangulo extends Figura {
  constructor(
    private readonly base: number,
    private readonly altura: number
  ) {
    super();
  }

  calcularArea(): number {
    return this.base * this.altura;
  }
}
```

La herencia debe utilizarse cuando existe una relación conceptual clara. En muchos diseños, la composición ofrece menor acoplamiento.

### 21.2 Composición

```typescript
interface Notificador {
  enviar(mensaje: string): void;
}

class NotificadorConsola implements Notificador {
  enviar(mensaje: string): void {
    console.log(mensaje);
  }
}

class Curso {
  constructor(private readonly notificador: Notificador) {}

  publicarAviso(mensaje: string): void {
    this.notificador.enviar(mensaje);
  }
}
```

`Curso` recibe un colaborador en lugar de heredar su comportamiento.

---

## 22. Programación funcional

La programación funcional trata las funciones como valores y favorece transformaciones sin modificar directamente los datos originales.

```typescript
const numeros = [1, 2, 3, 4, 5, 6];

const sumaPares = numeros
  .filter((numero) => numero % 2 === 0)
  .reduce((acumulador, numero) => acumulador + numero, 0);

console.log(sumaPares);
```

Características frecuentes:

- funciones puras;
- inmutabilidad;
- composición;
- funciones de orden superior;
- expresiones declarativas;
- reducción de efectos secundarios.

### 22.1 Función pura

```typescript
function calcularDescuento(
  precio: number,
  porcentaje: number
): number {
  return precio - precio * porcentaje;
}
```

Para los mismos argumentos, retorna siempre el mismo resultado y no modifica estado externo.

### 22.2 Inmutabilidad

```typescript
interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

const tarea: Tarea = {
  id: 1,
  titulo: "Comparar paradigmas",
  completada: false
};

const tareaActualizada: Tarea = {
  ...tarea,
  completada: true
};
```

Se crea un nuevo objeto en lugar de modificar el anterior.

### 22.3 `map`, `filter` y `reduce`

```typescript
const valores = [1, 2, 3, 4, 5];

const dobles = valores.map((valor) => valor * 2);
const pares = valores.filter((valor) => valor % 2 === 0);
const suma = valores.reduce(
  (acumulador, valor) => acumulador + valor,
  0
);
```

---

## 23. Comparación: procedimental y funcional

### Solución procedimental

```typescript
const valores = [1, 2, 3, 4, 5];
const cuadradosPares: number[] = [];

for (const valor of valores) {
  if (valor % 2 === 0) {
    cuadradosPares.push(valor ** 2);
  }
}

console.log(cuadradosPares);
```

### Solución funcional

```typescript
const valores = [1, 2, 3, 4, 5];

const cuadradosPares = valores
  .filter((valor) => valor % 2 === 0)
  .map((valor) => valor ** 2);

console.log(cuadradosPares);
```

La primera solución describe con detalle el procedimiento. La segunda expresa una secuencia de transformaciones sobre los datos.

Ninguna forma es universalmente superior. Deben evaluarse:

- claridad;
- complejidad;
- rendimiento;
- experiencia del equipo;
- facilidad de prueba;
- naturaleza del problema.

---

## 24. Programación declarativa

Una solución declarativa expresa **qué resultado se desea**, reduciendo el detalle de cada paso.

```typescript
const estudiantes = [
  { nombre: "Ana", promedio: 5.8 },
  { nombre: "Luis", promedio: 3.7 },
  { nombre: "Sofía", promedio: 6.2 }
];

const aprobados = estudiantes.filter(
  (estudiante) => estudiante.promedio >= 4.0
);
```

El método `filter` describe la condición que deben cumplir los elementos, sin administrar manualmente índices ni una estructura de acumulación.

---

## 25. Programación dirigida por eventos

En este paradigma, el flujo del programa responde a eventos producidos por el usuario, el sistema u otros componentes.

Ejemplo para un navegador:

```typescript
const boton = document.querySelector<HTMLButtonElement>(
  "#boton-saludar"
);

boton?.addEventListener("click", () => {
  console.log("El usuario presionó el botón");
});
```

Elementos principales:

- fuente del evento;
- tipo de evento;
- manejador o *listener*;
- datos asociados al evento;
- reacción del programa.

Este paradigma se utiliza en interfaces gráficas, aplicaciones web, sistemas interactivos, sensores y comunicaciones.

---

## 26. Callbacks

Un callback es una función entregada a otra operación para que sea ejecutada posteriormente.

```typescript
function procesar(
  valor: number,
  callback: (resultado: number) => void
): void {
  const resultado = valor * 2;
  callback(resultado);
}

procesar(5, (resultado) => {
  console.log(`Resultado: ${resultado}`);
});
```

Los callbacks aparecen en:

- eventos;
- temporizadores;
- operaciones asíncronas;
- funciones de orden superior;
- procesamiento de colecciones.

---

## 27. Promesas y programación asíncrona

Una promesa representa el resultado futuro de una operación.

```typescript
function obtenerMensaje(): Promise<string> {
  return Promise.resolve("Datos obtenidos");
}

obtenerMensaje()
  .then((mensaje) => console.log(mensaje))
  .catch((error: unknown) => console.error(error));
```

Con `async` y `await`:

```typescript
async function ejecutar(): Promise<void> {
  try {
    const mensaje = await obtenerMensaje();
    console.log(mensaje);
  } catch (error: unknown) {
    console.error("No fue posible completar la operación", error);
  }
}

void ejecutar();
```

`async` y `await` permiten expresar operaciones asíncronas con una estructura similar a una secuencia imperativa, aunque internamente continúan trabajando con promesas.

---

## 28. Genéricos

Los genéricos permiten escribir componentes reutilizables sin perder la información de tipos.

```typescript
function primero<T>(elementos: T[]): T | undefined {
  return elementos[0];
}

const primerNumero = primero([10, 20, 30]);
const primerLenguaje = primero(["TypeScript", "Python"]);
```

`T` representa un tipo que será determinado al utilizar la función.

### 28.1 Interfaz genérica

```typescript
interface Respuesta<T> {
  datos: T;
  exito: boolean;
  mensaje?: string;
}

const respuesta: Respuesta<string[]> = {
  datos: ["Imperativo", "Funcional"],
  exito: true
};
```

### 28.2 Restricciones genéricas

```typescript
interface ConId {
  id: string | number;
}

function buscarPorId<T extends ConId>(
  elementos: T[],
  id: string | number
): T | undefined {
  return elementos.find((elemento) => elemento.id === id);
}
```

---

## 29. Tipado estructural

TypeScript compara tipos principalmente por su estructura.

```typescript
interface Punto {
  x: number;
  y: number;
}

const coordenada = {
  x: 10,
  y: 20,
  etiqueta: "Inicio"
};

function mostrarPunto(punto: Punto): void {
  console.log(`(${punto.x}, ${punto.y})`);
}

mostrarPunto(coordenada);
```

Aunque `coordenada` no declara explícitamente que implementa `Punto`, contiene las propiedades necesarias.

---

## 30. Módulos

Los módulos permiten dividir el programa en archivos.

Archivo `src/operaciones.ts`:

```typescript
export function sumar(a: number, b: number): number {
  return a + b;
}

export function multiplicar(a: number, b: number): number {
  return a * b;
}
```

Archivo `src/index.ts`:

```typescript
import {
  multiplicar,
  sumar
} from "./operaciones.js";

console.log(sumar(3, 4));
console.log(multiplicar(3, 4));
```

Los módulos ayudan a:

- separar responsabilidades;
- reutilizar componentes;
- controlar dependencias;
- facilitar las pruebas;
- mantener el proyecto organizado.

---

## 31. Manejo de errores

```typescript
function dividir(a: number, b: number): number {
  if (b === 0) {
    throw new Error("No es posible dividir por cero");
  }

  return a / b;
}

try {
  const resultado = dividir(10, 0);
  console.log(resultado);
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("Ocurrió un error desconocido");
  }
}
```

El tipo `unknown` obliga a validar el error antes de acceder a sus propiedades.

---

## 32. Ejemplo integrador

El siguiente ejemplo combina contratos, clases, funciones de orden superior e inmutabilidad.

```typescript
type Estado = "pendiente" | "completada";

interface Actividad {
  readonly id: number;
  titulo: string;
  estado: Estado;
  puntaje: number;
}

interface Repositorio<T> {
  agregar(elemento: T): void;
  obtenerTodos(): readonly T[];
}

class RepositorioEnMemoria<T> implements Repositorio<T> {
  private elementos: T[] = [];

  agregar(elemento: T): void {
    this.elementos = [...this.elementos, elemento];
  }

  obtenerTodos(): readonly T[] {
    return this.elementos;
  }
}

function seleccionarAprobadas(
  actividades: readonly Actividad[],
  puntajeMinimo: number
): Actividad[] {
  return actividades.filter(
    (actividad) => actividad.puntaje >= puntajeMinimo
  );
}

const repositorio = new RepositorioEnMemoria<Actividad>();

repositorio.agregar({
  id: 1,
  titulo: "Solución procedimental",
  estado: "completada",
  puntaje: 75
});

repositorio.agregar({
  id: 2,
  titulo: "Solución funcional",
  estado: "completada",
  puntaje: 90
});

const aprobadas = seleccionarAprobadas(
  repositorio.obtenerTodos(),
  60
);

console.log(aprobadas);
```

Paradigmas y conceptos involucrados:

- orientación a objetos mediante la clase y la interfaz;
- programación funcional mediante `filter`;
- genéricos en el repositorio;
- inmutabilidad mediante el operador de propagación;
- tipado estático mediante contratos;
- programación imperativa en la secuencia principal.

---

## 33. Comparación con Python

| Característica | TypeScript | Python |
|---|---|---|
| Ejecución habitual | se transforma en JavaScript | se ejecuta mediante un intérprete |
| Tipado | estático gradual | dinámico |
| Inferencia | sí | limitada al análisis de herramientas |
| Sintaxis de bloques | llaves | indentación |
| Terminación de instrucciones | punto y coma opcional | salto de línea |
| Funciones anónimas | funciones flecha | `lambda` |
| Orientación a objetos | clases e interfaces | clases y protocolos |
| Programación funcional | funciones de orden superior | funciones de orden superior |
| Uso frecuente | web, frontend, backend | datos, IA, automatización, web |
| Entorno habitual | navegador y Node.js | intérprete de Python |

Ambos lenguajes son multiparadigma, pero presentan diferencias en su sistema de tipos, ejecución y ecosistema.

---

## 34. Buenas prácticas

### 34.1 Convenciones de nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Variables | `camelCase` | `promedioFinal` |
| Funciones | `camelCase` | `calcularPromedio()` |
| Clases | `PascalCase` | `RegistroEstudiante` |
| Interfaces | `PascalCase` | `Estudiante` |
| Tipos | `PascalCase` | `EstadoActividad` |
| Constantes globales | `UPPER_SNAKE_CASE` | `NOTA_APROBACION` |
| Archivos | `kebab-case` | `registro-estudiante.ts` |

### 34.2 Recomendaciones

- utilizar `const` por defecto;
- activar el modo estricto;
- evitar `any`;
- preferir `unknown` para datos externos no verificados;
- escribir funciones pequeñas y con una responsabilidad clara;
- declarar los tipos en los límites públicos del sistema;
- evitar estados globales innecesarios;
- favorecer la composición sobre la herencia cuando corresponda;
- separar efectos secundarios de la lógica de dominio;
- utilizar nombres que expresen intención;
- no ignorar errores del compilador sin una razón documentada.

---

## 35. Documentación del código

TypeScript puede documentarse mediante comentarios compatibles con JSDoc y convenciones como TSDoc.

```typescript
/**
 * Calcula el promedio aritmético de una colección de notas.
 *
 * @param notas - Valores utilizados en el cálculo.
 * @returns El promedio de las notas.
 * @throws Error cuando la colección está vacía.
 */
function calcularPromedio(notas: readonly number[]): number {
  if (notas.length === 0) {
    throw new Error("La colección no puede estar vacía");
  }

  const suma = notas.reduce(
    (acumulador, nota) => acumulador + nota,
    0
  );

  return suma / notas.length;
}
```

Los comentarios deben explicar decisiones relevantes, no repetir literalmente el código.

```typescript
// Se crea una copia para conservar el arreglo original.
const notasOrdenadas = [...notas].sort((a, b) => a - b);
```

---

## 36. Herramientas de calidad

En proyectos reales suelen utilizarse herramientas como:

| Herramienta | Propósito |
|---|---|
| TypeScript Compiler | comprobación de tipos y generación de JavaScript |
| ESLint | análisis de calidad y reglas de código |
| Prettier | formato automático |
| Vitest o Jest | pruebas automatizadas |
| TypeDoc | documentación a partir del código |

Instalación básica de ESLint y Prettier:

```bash
npm install --save-dev eslint prettier
```

La configuración exacta debe definirse de acuerdo con las necesidades del proyecto y las reglas establecidas en la asignatura.

---

## 37. Actividades propuestas

### Actividad 1: Tipos e inferencia

Cree variables para representar:

- el nombre de una asignatura;
- la cantidad de estudiantes;
- su estado de disponibilidad;
- una lista de paradigmas.

Identifique cuáles tipos pueden inferirse y cuáles conviene declarar.

### Actividad 2: Solución procedimental

Desarrolle un programa que reciba una lista de calificaciones y determine:

- promedio;
- nota máxima;
- nota mínima;
- cantidad de aprobados.

Utilice ciclos y variables acumuladoras.

### Actividad 3: Solución funcional

Resuelva la actividad anterior utilizando:

- `map`;
- `filter`;
- `reduce`;
- funciones puras.

Compare ambas soluciones.

### Actividad 4: Orientación a objetos

Modele un sistema con:

- clase `Estudiante`;
- clase `Asignatura`;
- interfaz `Evaluable`;
- método para calcular el promedio;
- encapsulación de las calificaciones.

### Actividad 5: Funciones de orden superior

Cree una función que reciba:

- una colección;
- una función de transformación;
- una función de selección.

Utilícela con números y objetos.

### Actividad 6: Eventos

Construya una página sencilla con botones que permitan:

- agregar un elemento;
- eliminar un elemento;
- filtrar los elementos;
- reaccionar a eventos del usuario.

### Actividad 7: Programación asíncrona

Simule la obtención de datos mediante una promesa y procese el resultado con:

- `.then()` y `.catch()`;
- `async` y `await`.

Compare la legibilidad de ambas soluciones.

### Actividad 8: Comparación de paradigmas

Seleccione un problema y proponga al menos tres soluciones:

1. procedimental;
2. orientada a objetos;
3. funcional.

Analice ventajas, limitaciones, estado, dependencias y facilidad de prueba.

---

## 38. Preguntas para discusión

1. ¿Qué diferencia existe entre un lenguaje y un paradigma?
2. ¿Por qué TypeScript se considera multiparadigma?
3. ¿Cuándo una función puede considerarse pura?
4. ¿Qué ventajas ofrece evitar el estado global?
5. ¿En qué casos una clase mejora el diseño?
6. ¿Cuándo la composición puede ser preferible a la herencia?
7. ¿Qué diferencia existe entre tipado estático y dinámico?
8. ¿Qué información de TypeScript permanece durante la ejecución?
9. ¿Cómo se relacionan callbacks, eventos y promesas?
10. ¿Puede una solución combinar paradigmas sin perder coherencia?

---

## 39. Lista de verificación

Antes de entregar una actividad, compruebe que:

- [ ] el proyecto compila sin errores;
- [ ] el modo estricto está activado;
- [ ] no se utiliza `any` sin justificación;
- [ ] las funciones poseen parámetros y retornos coherentes;
- [ ] los nombres representan el propósito de cada elemento;
- [ ] las responsabilidades están separadas;
- [ ] no existe estado global innecesario;
- [ ] se identifica el paradigma predominante;
- [ ] se justifican las decisiones de diseño;
- [ ] se incluyen ejemplos o pruebas;
- [ ] el código está documentado;
- [ ] el repositorio contiene instrucciones de ejecución.
---

## 40. Recursos oficiales

### TypeScript
- [Documentación oficial de TypeScript](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Tipos de uso cotidiano](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
- [Funciones](https://www.typescriptlang.org/docs/handbook/2/functions.html)
- [Tipos de objetos](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [Clases](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [Genéricos](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Estrechamiento de tipos](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Compatibilidad de tipos](https://www.typescriptlang.org/docs/handbook/type-compatibility.html)
- [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- [Opciones del compilador](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)

### Node.js
- [Documentación de aprendizaje de Node.js](https://nodejs.org/learn)
- [Documentación oficial de Node.js](https://nodejs.org/docs/latest/api/)

---