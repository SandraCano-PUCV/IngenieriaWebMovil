# Práctica: Backend con TypeScript, Node.js y Express
  
**Tema:** Backend y API REST con TypeScript  
**Prerrequisito:** conceptos básicos de backend, HTTP, API REST y Express con JavaScript

---

## 1. Objetivos de aprendizaje

Al finalizar esta práctica, el estudiante será capaz de:

1. Crear un proyecto backend con **Node.js, Express y TypeScript**.
2. Explicar qué aporta TypeScript al desarrollo backend.
3. Configurar un proyecto TypeScript mediante `tsconfig.json`.
4. Definir interfaces para representar recursos.
5. Implementar una API REST utilizando:
   - `GET`
   - `POST`
   - `PUT`
   - `PATCH`
   - `DELETE`
6. Trabajar con:
   - `req.params`
   - `req.query`
   - `req.body`
7. Utilizar códigos de estado HTTP apropiados.
8. Crear middleware en Express.
9. Separar el backend en rutas, controladores, modelos y middlewares.
10. Compilar TypeScript a JavaScript para ejecutar el backend.

---

# 2. ¿Qué construiremos?

Construiremos una API REST sencilla para administrar productos.

La arquitectura inicial será:

```text
Cliente
Postman / curl / frontend
          |
          | HTTP
          v
+-------------------------+
|      Express + TS       |
|                         |
|  API REST /products     |
+-------------------------+
          |
          v
    Arreglo en memoria
```

Durante esta práctica no utilizaremos todavía una base de datos.

Los datos se almacenarán temporalmente en memoria.

> Cuando el servidor se reinicie, los cambios realizados se perderán.

---

# 3. ¿Por qué utilizar TypeScript en el backend?

JavaScript permite escribir:

```javascript
const product = {
  id: 1,
  name: "Teclado",
  price: "24990"
};
```

Aunque `price` debería ser numérico, JavaScript no genera un error antes de ejecutar.

En TypeScript podemos declarar:

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}
```

Ahora:

```typescript
const product: Product = {
  id: 1,
  name: "Teclado",
  price: "24990",
  stock: 10
};
```

genera un error de tipos porque:

```text
price debería ser number
```

TypeScript permite detectar muchos errores durante el desarrollo.

---

## Pregunta 1

¿TypeScript reemplaza la validación de datos que llegan desde un cliente?

### Respuesta esperada

No.

TypeScript verifica tipos durante el desarrollo y compilación, pero un cliente externo puede enviar datos incorrectos en tiempo de ejecución.

Por ejemplo:

```json
{
  "name": "Teclado",
  "price": "gratis",
  "stock": "muchos"
}
```

Por eso una API real debe validar también los datos recibidos.

---

# 4. Verificar Node.js

En una terminal:

```bash
node -v
```

y:

```bash
npm -v
```

Para Express 5 se requiere Node.js 18 o superior.

---

# 5. Crear el proyecto

Crear una carpeta:

```bash
mkdir backend-typescript
```

Entrar en ella:

```bash
cd backend-typescript
```

Inicializar Node.js:

```bash
npm init -y
```

Esto crea:

```text
package.json
```

---

# 6. Instalar Express

```bash
npm install express
```

Express será una dependencia de ejecución del proyecto.

---

# 7. Instalar TypeScript y tipos

Instalar TypeScript:

```bash
npm install -D typescript
```

Instalar los tipos de Node.js y Express:

```bash
npm install -D @types/node @types/express
```

Instalar `tsx` para ejecutar TypeScript durante el desarrollo:

```bash
npm install -D tsx
```

Al finalizar tendremos aproximadamente:

```text
dependencies
└── express

devDependencies
├── typescript
├── @types/node
├── @types/express
└── tsx
```

---

# 8. ¿Qué significa `-D`?

Cuando ejecutamos:

```bash
npm install -D typescript
```

el paquete se agrega a:

```json
"devDependencies"
```

Esto significa que es una herramienta necesaria principalmente durante el desarrollo.

Express, en cambio, se instala como:

```json
"dependencies"
```

porque la aplicación lo necesita para funcionar.

---

# 9. Crear `tsconfig.json`

Crear en la raíz:

```text
tsconfig.json
```

con:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "sourceMap": true
  },
  "include": [
    "src/**/*.ts"
  ]
}
```

---

# 10. ¿Qué configura `tsconfig.json`?

## `target`

```json
"target": "ES2022"
```

Define la versión de JavaScript que generará TypeScript.

---

## `module`

```json
"module": "CommonJS"
```

Define el sistema de módulos utilizado por el JavaScript compilado.

---

## `rootDir`

```json
"rootDir": "./src"
```

Indica dónde se encuentra el código TypeScript.

---

## `outDir`

```json
"outDir": "./dist"
```

Indica dónde se generará el JavaScript compilado.

---

## `strict`

```json
"strict": true
```

Activa comprobaciones estrictas de tipos.

---

## `esModuleInterop`

```json
"esModuleInterop": true
```

Facilita la interoperabilidad entre módulos CommonJS y la sintaxis `import`.

---

# 11. Configurar scripts

Abrir:

```text
package.json
```

y modificar `scripts`:

```json
{
  "scripts": {
    "dev": "tsx watch src/app.ts",
    "typecheck": "tsc --noEmit",
    "build": "tsc",
    "start": "node dist/app.js"
  }
}
```

No reemplazar el resto de `package.json`; solamente modificar la sección `scripts`.

---

## Scripts disponibles

### Desarrollo

```bash
npm run dev
```

Ejecuta TypeScript y vuelve a iniciar el servidor cuando cambian los archivos.

---

### Verificar tipos

```bash
npm run typecheck
```

Comprueba errores TypeScript sin generar JavaScript.

---

### Compilar

```bash
npm run build
```

Genera JavaScript en:

```text
dist/
```

---

### Ejecutar versión compilada

```bash
npm start
```

Ejecuta:

```text
dist/app.js
```

---

# 12. Crear la carpeta `src`

```bash
mkdir src
```

Crear:

```text
src/app.ts
```

La estructura inicial será:

```text
backend-typescript/
|
|-- node_modules/
|-- src/
|   `-- app.ts
|
|-- package.json
|-- package-lock.json
`-- tsconfig.json
```

---

# 13. Crear el primer servidor

En:

```text
src/app.ts
```

escribir:

```typescript
import express, {
  type Request,
  type Response
} from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Backend con TypeScript funcionando"
  });
});

app.listen(PORT, () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${PORT}`
  );
});
```

---

# 14. Ejecutar el backend

```bash
npm run dev
```

La terminal debería mostrar:

```text
Servidor ejecutándose en http://localhost:3000
```

Abrir:

```text
http://localhost:3000
```

Respuesta:

```json
{
  "message": "Backend con TypeScript funcionando"
}
```

---

# 15. Analizar el código

Importamos Express:

```typescript
import express from "express";
```

Importamos solamente los tipos:

```typescript
import {
  type Request,
  type Response
} from "express";
```

Creamos la aplicación:

```typescript
const app = express();
```

Activamos el middleware para procesar JSON:

```typescript
app.use(express.json());
```

Creamos un endpoint:

```typescript
app.get("/", (req: Request, res: Response) => {
  ...
});
```

Y levantamos el servidor:

```typescript
app.listen(PORT, () => {
  ...
});
```

---

# 16. Request y Response tipados

En:

```typescript
(req: Request, res: Response)
```

TypeScript conoce las propiedades disponibles.

Por ejemplo:

```typescript
req.params
req.query
req.body
req.headers
```

y:

```typescript
res.status()
res.json()
res.send()
```

Esto mejora:

- autocompletado;
- documentación en el editor;
- detección de errores;
- mantenibilidad.

---

# 17. Crear el recurso Product

Por ahora lo definiremos en `app.ts`.

Agregar antes de las rutas:

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}
```

Ahora creamos los datos:

```typescript
let products: Product[] = [
  {
    id: 1,
    name: "Teclado",
    price: 24990,
    stock: 10
  },
  {
    id: 2,
    name: "Mouse",
    price: 12990,
    stock: 15
  },
  {
    id: 3,
    name: "Monitor",
    price: 159990,
    stock: 5
  }
];
```

---

# 18. ¿Qué significa `Product[]`?

```typescript
let products: Product[]
```

indica que:

```text
products
```

debe ser un arreglo compuesto por objetos que cumplan la interfaz:

```typescript
Product
```

Si escribimos:

```typescript
{
  id: 4,
  name: "Webcam",
  price: "29990",
  stock: 5
}
```

TypeScript detectará que `price` tiene un tipo incorrecto.

---

# 19. GET: obtener todos los productos

Agregar:

```typescript
app.get(
  "/products",
  (req: Request, res: Response) => {

    res.status(200).json(products);

  }
);
```

Probar:

```text
GET http://localhost:3000/products
```

o:

```bash
curl http://localhost:3000/products
```

Respuesta:

```json
[
  {
    "id": 1,
    "name": "Teclado",
    "price": 24990,
    "stock": 10
  },
  {
    "id": 2,
    "name": "Mouse",
    "price": 12990,
    "stock": 15
  },
  {
    "id": 3,
    "name": "Monitor",
    "price": 159990,
    "stock": 5
  }
]
```

---

# 20. GET: obtener un producto por ID

Definir el tipo de parámetros:

```typescript
interface ProductParams {
  id: string;
}
```

Crear:

```typescript
app.get(
  "/products/:id",
  (
    req: Request<ProductParams>,
    res: Response
  ) => {

    const id = Number(req.params.id);

    const product = products.find(
      (product) => product.id === id
    );

    if (!product) {
      res.status(404).json({
        message: "Producto no encontrado"
      });

      return;
    }

    res.status(200).json(product);
  }
);
```

---

# 21. ¿Qué significa `Request<ProductParams>`?

Indicamos a TypeScript que:

```typescript
req.params
```

tiene la forma:

```typescript
{
  id: string;
}
```

Entonces:

```typescript
req.params.id
```

es reconocido como `string`.

La URL:

```text
/products/2
```

produce:

```typescript
req.params.id === "2"
```

Por eso convertimos:

```typescript
const id = Number(req.params.id);
```

---

## Pregunta 2

¿Por qué `req.params.id` es inicialmente un `string`, aunque el `id` del producto sea `number`?

### Respuesta esperada

Porque los valores obtenidos desde una URL llegan como texto y deben transformarse si la aplicación necesita tratarlos como números.

---

# 22. Validar el ID

Podemos mejorar:

```typescript
const id = Number(req.params.id);

if (Number.isNaN(id)) {
  res.status(400).json({
    message: "El id debe ser numérico"
  });

  return;
}
```

Código completo:

```typescript
app.get(
  "/products/:id",
  (
    req: Request<ProductParams>,
    res: Response
  ) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({
        message: "El id debe ser numérico"
      });

      return;
    }

    const product = products.find(
      (product) => product.id === id
    );

    if (!product) {
      res.status(404).json({
        message: "Producto no encontrado"
      });

      return;
    }

    res.status(200).json(product);
  }
);
```

---

# 23. Tipos para crear y actualizar productos

No queremos que el cliente decida el `id`.

Podemos crear:

```typescript
type CreateProductDto =
  Omit<Product, "id">;
```

Conceptualmente equivale a:

```typescript
{
  name: string;
  price: number;
  stock: number;
}
```

Para una actualización parcial:

```typescript
type UpdateProductDto =
  Partial<CreateProductDto>;
```

Conceptualmente:

```typescript
{
  name?: string;
  price?: number;
  stock?: number;
}
```

---

# 24. ¿Qué es un DTO?

DTO significa:

```text
Data Transfer Object
```

Se utiliza para representar la estructura de datos que intercambiamos entre capas o sistemas.

En esta práctica:

```typescript
CreateProductDto
```

representa los datos permitidos para crear un producto.

Mientras:

```typescript
Product
```

representa el recurso completo.

---

# 25. POST: crear un producto

Crear:

```typescript
app.post(
  "/products",
  (
    req: Request<
      Record<string, never>,
      unknown,
      CreateProductDto
    >,
    res: Response
  ) => {

    const {
      name,
      price,
      stock
    } = req.body;

    if (
      typeof name !== "string" ||
      name.trim() === "" ||
      typeof price !== "number" ||
      typeof stock !== "number"
    ) {
      res.status(400).json({
        message: "Datos de producto inválidos"
      });

      return;
    }

    const newId =
      products.length === 0
        ? 1
        : Math.max(
            ...products.map(
              (product) => product.id
            )
          ) + 1;

    const newProduct: Product = {
      id: newId,
      name,
      price,
      stock
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
  }
);
```

---

# 26. ¿Cómo se tipa `Request`?

Express permite definir:

```typescript
Request<
  Params,
  ResBody,
  ReqBody,
  Query
>
```

En nuestro `POST`:

```typescript
Request<
  Record<string, never>,
  unknown,
  CreateProductDto
>
```

estamos indicando que:

- no esperamos parámetros de ruta;
- no estamos tipando específicamente el cuerpo de respuesta;
- `req.body` tiene la estructura `CreateProductDto`.

---

# 27. Probar POST

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Webcam","price":29990,"stock":8}'
```

Respuesta:

```json
{
  "id": 4,
  "name": "Webcam",
  "price": 29990,
  "stock": 8
}
```

Código:

```text
201 Created
```

---

# 28. Importante: TypeScript no valida HTTP en runtime

Aunque escribamos:

```typescript
req: Request<
  Record<string, never>,
  unknown,
  CreateProductDto
>
```

eso no impide que un cliente envíe:

```json
{
  "name": 123,
  "price": "gratis",
  "stock": false
}
```

Por esta razón realizamos comprobaciones:

```typescript
typeof name !== "string"
```

```typescript
typeof price !== "number"
```

```typescript
typeof stock !== "number"
```

Más adelante podemos utilizar bibliotecas de validación como:

```text
Zod
Joi
class-validator
```

---

# 29. PUT: reemplazar un producto

Agregar:

```typescript
app.put(
  "/products/:id",
  (
    req: Request<
      ProductParams,
      unknown,
      CreateProductDto
    >,
    res: Response
  ) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({
        message: "El id debe ser numérico"
      });

      return;
    }

    const index = products.findIndex(
      (product) => product.id === id
    );

    if (index === -1) {
      res.status(404).json({
        message: "Producto no encontrado"
      });

      return;
    }

    const {
      name,
      price,
      stock
    } = req.body;

    if (
      typeof name !== "string" ||
      name.trim() === "" ||
      typeof price !== "number" ||
      typeof stock !== "number"
    ) {
      res.status(400).json({
        message: "Datos de producto inválidos"
      });

      return;
    }

    const updatedProduct: Product = {
      id,
      name,
      price,
      stock
    };

    products[index] = updatedProduct;

    res.status(200).json(updatedProduct);
  }
);
```

---

# 30. PATCH: actualización parcial

Crear:

```typescript
app.patch(
  "/products/:id",
  (
    req: Request<
      ProductParams,
      unknown,
      UpdateProductDto
    >,
    res: Response
  ) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({
        message: "El id debe ser numérico"
      });

      return;
    }

    const product = products.find(
      (product) => product.id === id
    );

    if (!product) {
      res.status(404).json({
        message: "Producto no encontrado"
      });

      return;
    }

    const {
      name,
      price,
      stock
    } = req.body;

    if (name !== undefined) {
      if (
        typeof name !== "string" ||
        name.trim() === ""
      ) {
        res.status(400).json({
          message: "name inválido"
        });

        return;
      }

      product.name = name;
    }

    if (price !== undefined) {
      if (typeof price !== "number") {
        res.status(400).json({
          message: "price inválido"
        });

        return;
      }

      product.price = price;
    }

    if (stock !== undefined) {
      if (typeof stock !== "number") {
        res.status(400).json({
          message: "stock inválido"
        });

        return;
      }

      product.stock = stock;
    }

    res.status(200).json(product);
  }
);
```

---

## Pregunta 3

¿Qué diferencia existe entre `PUT` y `PATCH`?

### Respuesta esperada

`PUT` se utiliza normalmente para reemplazar la representación completa del recurso.

`PATCH` permite modificar parcialmente el recurso.

Ejemplo:

```text
PUT /products/1
```

puede enviar:

```json
{
  "name": "Teclado mecánico",
  "price": 39990,
  "stock": 15
}
```

Mientras:

```text
PATCH /products/1
```

podría enviar solamente:

```json
{
  "stock": 20
}
```

---

# 31. DELETE: eliminar un producto

Agregar:

```typescript
app.delete(
  "/products/:id",
  (
    req: Request<ProductParams>,
    res: Response
  ) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({
        message: "El id debe ser numérico"
      });

      return;
    }

    const index = products.findIndex(
      (product) => product.id === id
    );

    if (index === -1) {
      res.status(404).json({
        message: "Producto no encontrado"
      });

      return;
    }

    products.splice(index, 1);

    res.status(204).send();
  }
);
```

---

# 32. API construida

| Método | Endpoint | Acción |
|---|---|---|
| `GET` | `/products` | Obtener todos |
| `GET` | `/products/:id` | Obtener uno |
| `POST` | `/products` | Crear |
| `PUT` | `/products/:id` | Reemplazar |
| `PATCH` | `/products/:id` | Modificar parcialmente |
| `DELETE` | `/products/:id` | Eliminar |

---

# 33. Probar la API

## GET

```bash
curl http://localhost:3000/products
```

---

## GET por ID

```bash
curl http://localhost:3000/products/1
```

---

## POST

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Audifonos","price":19990,"stock":12}'
```

---

## PUT

```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Teclado mecanico","price":39990,"stock":20}'
```

---

## PATCH

```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{"stock":25}'
```

---

## DELETE

```bash
curl -X DELETE http://localhost:3000/products/1
```

---

# 34. Códigos HTTP utilizados

| Código | Significado |
|---:|---|
| `200` | Operación correcta |
| `201` | Recurso creado |
| `204` | Operación correcta sin contenido |
| `400` | Solicitud inválida |
| `404` | Recurso no encontrado |
| `500` | Error interno del servidor |

---

# 35. Query Parameters

Queremos consultar:

```text
GET /products?minPrice=20000
```

Definir:

```typescript
interface ProductQuery {
  minPrice?: string;
}
```

Modificar el endpoint `GET /products`:

```typescript
app.get(
  "/products",
  (
    req: Request<
      Record<string, never>,
      unknown,
      unknown,
      ProductQuery
    >,
    res: Response
  ) => {

    const { minPrice } = req.query;

    if (minPrice === undefined) {
      res.status(200).json(products);
      return;
    }

    const value = Number(minPrice);

    if (Number.isNaN(value)) {
      res.status(400).json({
        message: "minPrice debe ser numérico"
      });

      return;
    }

    const filteredProducts =
      products.filter(
        (product) =>
          product.price >= value
      );

    res.status(200).json(filteredProducts);
  }
);
```

---

# 36. `params`, `query` y `body`

| Fuente | Ejemplo | Express |
|---|---|---|
| Parámetro de ruta | `/products/25` | `req.params.id` |
| Query parameter | `?minPrice=20000` | `req.query.minPrice` |
| Body | JSON enviado en POST | `req.body` |
| Header | `Authorization: ...` | `req.headers` |

---

# 37. Primera versión completa

Hasta este punto podemos mantener todo dentro de:

```text
src/app.ts
```

Esto es útil para comprender el flujo completo.

Sin embargo, al aumentar la aplicación tendremos:

```text
rutas
validaciones
lógica
datos
middlewares
```

dentro de un mismo archivo.

El siguiente paso será **separar responsabilidades**.

---

# 38. Refactorizar la estructura

Crearemos:

```text
src/
|
|-- controllers/
|   `-- product.controller.ts
|
|-- data/
|   `-- products.ts
|
|-- middlewares/
|   `-- request-logger.ts
|
|-- models/
|   `-- product.ts
|
|-- routes/
|   `-- product.routes.ts
|
`-- app.ts
```

Crear las carpetas:

```bash
mkdir src/controllers
mkdir src/data
mkdir src/middlewares
mkdir src/models
mkdir src/routes
```

---

# 39. Modelo

Crear:

```text
src/models/product.ts
```

```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export type CreateProductDto =
  Omit<Product, "id">;

export type UpdateProductDto =
  Partial<CreateProductDto>;

export interface ProductParams {
  id: string;
}

export interface ProductQuery {
  minPrice?: string;
}
```

---

# 40. Datos

Crear:

```text
src/data/products.ts
```

```typescript
import type {
  Product
} from "../models/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Teclado",
    price: 24990,
    stock: 10
  },
  {
    id: 2,
    name: "Mouse",
    price: 12990,
    stock: 15
  },
  {
    id: 3,
    name: "Monitor",
    price: 159990,
    stock: 5
  }
];
```

---

# 41. Controlador: obtener productos

Crear:

```text
src/controllers/product.controller.ts
```

Agregar:

```typescript
import type {
  Request,
  Response
} from "express";

import { products }
  from "../data/products";

import type {
  CreateProductDto,
  Product,
  ProductParams,
  ProductQuery,
  UpdateProductDto
} from "../models/product";
```

Ahora:

```typescript
export const getProducts = (
  req: Request<
    Record<string, never>,
    unknown,
    unknown,
    ProductQuery
  >,
  res: Response
): void => {

  const { minPrice } = req.query;

  if (minPrice === undefined) {
    res.status(200).json(products);
    return;
  }

  const value = Number(minPrice);

  if (Number.isNaN(value)) {
    res.status(400).json({
      message: "minPrice debe ser numérico"
    });

    return;
  }

  const filteredProducts =
    products.filter(
      (product) =>
        product.price >= value
    );

  res.status(200).json(filteredProducts);
};
```

---

# 42. Controlador: obtener por ID

Agregar:

```typescript
export const getProductById = (
  req: Request<ProductParams>,
  res: Response
): void => {

  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({
      message: "El id debe ser numérico"
    });

    return;
  }

  const product = products.find(
    (product) => product.id === id
  );

  if (!product) {
    res.status(404).json({
      message: "Producto no encontrado"
    });

    return;
  }

  res.status(200).json(product);
};
```

---

# 43. Controlador: crear

Agregar:

```typescript
export const createProduct = (
  req: Request<
    Record<string, never>,
    unknown,
    CreateProductDto
  >,
  res: Response
): void => {

  const {
    name,
    price,
    stock
  } = req.body;

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof price !== "number" ||
    typeof stock !== "number"
  ) {
    res.status(400).json({
      message: "Datos de producto inválidos"
    });

    return;
  }

  const newId =
    products.length === 0
      ? 1
      : Math.max(
          ...products.map(
            (product) => product.id
          )
        ) + 1;

  const newProduct: Product = {
    id: newId,
    name,
    price,
    stock
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
};
```

---

# 44. Controlador: PUT

Agregar:

```typescript
export const replaceProduct = (
  req: Request<
    ProductParams,
    unknown,
    CreateProductDto
  >,
  res: Response
): void => {

  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({
      message: "El id debe ser numérico"
    });

    return;
  }

  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    res.status(404).json({
      message: "Producto no encontrado"
    });

    return;
  }

  const {
    name,
    price,
    stock
  } = req.body;

  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof price !== "number" ||
    typeof stock !== "number"
  ) {
    res.status(400).json({
      message: "Datos de producto inválidos"
    });

    return;
  }

  const updatedProduct: Product = {
    id,
    name,
    price,
    stock
  };

  products[index] = updatedProduct;

  res.status(200).json(updatedProduct);
};
```

---

# 45. Controlador: PATCH

Agregar:

```typescript
export const updateProduct = (
  req: Request<
    ProductParams,
    unknown,
    UpdateProductDto
  >,
  res: Response
): void => {

  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({
      message: "El id debe ser numérico"
    });

    return;
  }

  const product = products.find(
    (product) => product.id === id
  );

  if (!product) {
    res.status(404).json({
      message: "Producto no encontrado"
    });

    return;
  }

  const {
    name,
    price,
    stock
  } = req.body;

  if (name !== undefined) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      res.status(400).json({
        message: "name inválido"
      });

      return;
    }

    product.name = name;
  }

  if (price !== undefined) {
    if (typeof price !== "number") {
      res.status(400).json({
        message: "price inválido"
      });

      return;
    }

    product.price = price;
  }

  if (stock !== undefined) {
    if (typeof stock !== "number") {
      res.status(400).json({
        message: "stock inválido"
      });

      return;
    }

    product.stock = stock;
  }

  res.status(200).json(product);
};
```

---

# 46. Controlador: DELETE

Agregar:

```typescript
export const deleteProduct = (
  req: Request<ProductParams>,
  res: Response
): void => {

  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    res.status(400).json({
      message: "El id debe ser numérico"
    });

    return;
  }

  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    res.status(404).json({
      message: "Producto no encontrado"
    });

    return;
  }

  products.splice(index, 1);

  res.status(204).send();
};
```

---

# 47. Crear las rutas

Crear:

```text
src/routes/product.routes.ts
```

```typescript
import {
  Router
} from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  replaceProduct,
  updateProduct
} from "../controllers/product.controller";

const router = Router();

router.get(
  "/",
  getProducts
);

router.get(
  "/:id",
  getProductById
);

router.post(
  "/",
  createProduct
);

router.put(
  "/:id",
  replaceProduct
);

router.patch(
  "/:id",
  updateProduct
);

router.delete(
  "/:id",
  deleteProduct
);

export default router;
```

---

# 48. ¿Qué responsabilidad tiene una ruta?

Una ruta debe indicar principalmente:

```text
Método HTTP
+
Path
+
Handler
```

Por ejemplo:

```typescript
router.get(
  "/:id",
  getProductById
);
```

No queremos colocar toda la lógica de negocio dentro del archivo de rutas.

---

# 49. Crear un middleware de logging

Crear:

```text
src/middlewares/request-logger.ts
```

```typescript
import type {
  NextFunction,
  Request,
  Response
} from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  console.log(
    `${new Date().toISOString()} ` +
    `${req.method} ${req.originalUrl}`
  );

  next();
};
```

---

# 50. ¿Qué hace `next()`?

Un middleware participa en el flujo:

```text
Request
   |
   v
Middleware
   |
   | next()
   v
Siguiente middleware
   |
   v
Ruta
   |
   v
Controller
   |
   v
Response
```

Si el middleware no responde y tampoco llama a:

```typescript
next()
```

la solicitud no continuará normalmente al siguiente paso.

---

# 51. `app.ts` final

Reemplazar el contenido por:

```typescript
import express from "express";

import {
  requestLogger
} from "./middlewares/request-logger";

import productRoutes
  from "./routes/product.routes";

const app = express();

const PORT = 3000;


// Procesar JSON
app.use(express.json());


// Logging
app.use(requestLogger);


// Ruta inicial
app.get("/", (req, res) => {
  res.json({
    message: "API TypeScript funcionando"
  });
});


// Productos
app.use(
  "/products",
  productRoutes
);


// Endpoint inexistente
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint no encontrado"
  });
});


app.listen(PORT, () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${PORT}`
  );
});
```

---

# 52. Flujo final de una solicitud

Para:

```text
GET /products/2
```

tenemos:

```text
Cliente
   |
   v
Express
   |
   v
requestLogger
   |
   v
/product routes
   |
   v
GET /:id
   |
   v
getProductById()
   |
   v
products[]
   |
   v
Response JSON
```

---

# 53. Separación de responsabilidades

| Componente | Responsabilidad |
|---|---|
| `app.ts` | Configura la aplicación |
| `routes` | Define endpoints |
| `controllers` | Procesa solicitudes y respuestas |
| `models` | Define tipos e interfaces |
| `data` | Mantiene datos temporales |
| `middlewares` | Ejecuta lógica transversal |

---

## Pregunta 4

¿Dónde debería colocarse en el futuro una consulta a PostgreSQL?

### Discusión

No debería escribirse directamente dentro de:

```text
routes
```

En una arquitectura más completa podríamos incorporar:

```text
Controller
   |
   v
Service
   |
   v
Repository
   |
   v
Database
```

---

# 54. Comprobar tipos

Ejecutar:

```bash
npm run typecheck
```

Si todo está correcto, el comando finalizará sin generar archivos.

Para experimentar, cambiar temporalmente:

```typescript
const product: Product = {
  id: 1,
  name: "Teclado",
  price: "24990",
  stock: 10
};
```

y volver a ejecutar:

```bash
npm run typecheck
```

TypeScript debería detectar el error.

---

# 55. Compilar

Ejecutar:

```bash
npm run build
```

Ahora aparecerá:

```text
dist/
```

Ejemplo:

```text
src/
  app.ts

        |
        | tsc
        v

dist/
  app.js
```

---

# 56. Ejecutar JavaScript compilado

Detener el modo desarrollo si está ejecutándose.

Luego:

```bash
npm start
```

Esto ejecuta:

```bash
node dist/app.js
```

El flujo es:

```text
TypeScript
   |
   | tsc
   v
JavaScript
   |
   | Node.js
   v
Backend
```

---

# 57. Prueba completa

## Crear

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Webcam","price":29990,"stock":8}'
```

---

## Consultar

```bash
curl http://localhost:3000/products
```

---

## Consultar por ID

```bash
curl http://localhost:3000/products/4
```

---

## Actualizar parcialmente

```bash
curl -X PATCH http://localhost:3000/products/4 \
  -H "Content-Type: application/json" \
  -d '{"stock":15}'
```

---

## Reemplazar

```bash
curl -X PUT http://localhost:3000/products/4 \
  -H "Content-Type: application/json" \
  -d '{"name":"Webcam HD","price":34990,"stock":20}'
```

---

## Eliminar

```bash
curl -X DELETE http://localhost:3000/products/4
```

---

# 58. Actividad guiada

Agregar una nueva propiedad:

```typescript
category: string
```

La interfaz debe quedar:

```typescript
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}
```

Modificar:

- datos iniciales;
- `POST`;
- `PUT`;
- `PATCH`;
- validaciones.

---

# 59. Desafío 1: filtrar por categoría

Permitir:

```text
GET /products?category=perifericos
```

Modificar:

```typescript
interface ProductQuery {
  minPrice?: string;
  category?: string;
}
```

Si no llega ningún filtro:

```text
GET /products
```

devolver todos los productos.

---

# 60. Desafío 2: validar valores

Evitar productos como:

```json
{
  "name": "",
  "price": -1000,
  "stock": -5
}
```

Reglas:

```text
name
→ obligatorio y no vacío

price
→ number y mayor que 0

stock
→ number y mayor o igual que 0
```

---

# 61. Desafío 3: Middleware de duración

Crear un middleware que mida el tiempo aproximado de procesamiento.

Pista:

```typescript
const start = Date.now();
```

Utilizar el evento:

```typescript
res.on("finish", () => {
  ...
});
```

Resultado esperado:

```text
GET /products 200 4ms
POST /products 201 7ms
```

---

# 62. Desafío 4: nuevo recurso

Crear:

```text
categories
```

Interfaz:

```typescript
interface Category {
  id: number;
  name: string;
}
```

Endpoints:

```text
GET    /categories
GET    /categories/:id
POST   /categories
PATCH  /categories/:id
DELETE /categories/:id
```

Separar en:

```text
category.routes.ts
category.controller.ts
category.ts
categories.ts
```

---

# 63. Preguntas de cierre

1. ¿Qué aporta TypeScript al backend?
2. ¿Qué función cumple una `interface`?
3. ¿Qué significa `Product[]`?
4. ¿Qué diferencia existe entre `Product` y `CreateProductDto`?
5. ¿Para qué utilizamos `Omit`?
6. ¿Para qué utilizamos `Partial`?
7. ¿Por qué TypeScript no reemplaza la validación del `req.body`?
8. ¿Qué información contiene `req.params`?
9. ¿Qué información contiene `req.query`?
10. ¿Qué información contiene `req.body`?
11. ¿Cuál es la diferencia entre `PUT` y `PATCH`?
12. ¿Para qué sirve un middleware?
13. ¿Qué hace `next()`?
14. ¿Cuál es la función de un controlador?
15. ¿Por qué separar rutas y controladores?
16. ¿Qué hace `tsc`?
17. ¿Cuál es la diferencia entre `npm run dev` y `npm run build`?

---

# 64. Síntesis de la práctica

Construimos:

```text
Cliente
   |
   | HTTP
   v
Express
   |
   v
Middleware
   |
   v
Routes
   |
   v
Controllers
   |
   v
Product[]
```

La API contiene:

```text
GET
POST
PUT
PATCH
DELETE
```

y TypeScript nos permitió incorporar:

```text
interfaces
tipos
DTO
Request tipado
params tipados
query tipada
body tipado
comprobación estática
```

---

# 65. Evolución hacia una arquitectura de backend más completa

La siguiente evolución puede ser:

```text
Request
   |
   v
Route
   |
   v
Controller
   |
   v
Service
   |
   v
Repository
   |
   v
Database
```

Podemos incorporar posteriormente:

- variables de entorno;
- CORS;
- validación con Zod o class-validator;
- servicios;
- repositorios;
- PostgreSQL;
- Prisma o TypeORM;
- autenticación;
- JWT;
- autorización;
- manejo centralizado de errores;
- logging estructurado;
- OpenAPI / Swagger;
- pruebas automatizadas;
- Docker.

---

# 66. Checklist de entrega

El estudiante debe comprobar que:

- [ ] El proyecto inicia correctamente con `npm run dev`.
- [ ] `npm run typecheck` no presenta errores.
- [ ] `npm run build` genera `dist/`.
- [ ] Existe una interfaz `Product`.
- [ ] La API implementa `GET /products`.
- [ ] La API implementa `GET /products/:id`.
- [ ] La API implementa `POST /products`.
- [ ] La API implementa `PUT /products/:id`.
- [ ] La API implementa `PATCH /products/:id`.
- [ ] La API implementa `DELETE /products/:id`.
- [ ] Se utilizan códigos HTTP apropiados.
- [ ] Los controladores están separados de las rutas.
- [ ] Existe al menos un middleware.
- [ ] Se realizaron pruebas de todos los endpoints.

---

# 67. Referencias

- Express — Installing: <https://expressjs.com/en/starter/installing.html>
- Express — Basic routing: <https://expressjs.com/en/starter/basic-routing.html>
- Express — Middleware: <https://expressjs.com/en/guide/using-middleware.html>
- TypeScript — TSConfig: <https://www.typescriptlang.org/tsconfig/>
- TypeScript — `strict`: <https://www.typescriptlang.org/tsconfig/strict.html>
- tsx — Watch mode: <https://tsx.is/watch-mode>
- HTTP Semantics — RFC 9110: <https://www.rfc-editor.org/rfc/rfc9110>

---

## Conclusión

TypeScript no modifica el funcionamiento fundamental de HTTP ni de Express.

Lo que agrega es una capa de verificación estática que permite describir mejor la estructura de los datos y detectar inconsistencias antes de ejecutar la aplicación.

La combinación:

```text
Node.js
+
Express
+
TypeScript
```

permite construir backends manteniendo los conceptos conocidos de Express, pero con mayor información de tipos y mejores herramientas para mantener aplicaciones que aumentan progresivamente de tamaño.