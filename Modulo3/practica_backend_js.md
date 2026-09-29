# Clase práctica: Introducción al Backend con Node.js y Express

**Tema:** Creación básica de un backend y construcción de una API REST  
**Tecnologías:** Node.js, Express, JavaScript, HTTP, JSON  
---

## 1. Resultados de aprendizaje de la clase

Al finalizar esta actividad, el estudiante será capaz de:

1. Explicar qué función cumple un **backend** dentro de una aplicación web.
2. Crear un proyecto backend básico con **Node.js y Express**.
3. Diferenciar los conceptos de **recurso, ruta y endpoint**.
4. Implementar una API REST sencilla utilizando los métodos `GET`, `POST`, `PUT`, `PATCH` y `DELETE`.
5. Enviar y recibir información utilizando **JSON**.
6. Utilizar correctamente códigos de estado HTTP básicos.
7. Probar endpoints utilizando un navegador, `curl`, Postman o Insomnia.
8. Reconocer el rol de los **middlewares** dentro de Express.

---

# 2. Antes de comenzar: ¿qué construiremos?

Durante esta clase construiremos un backend para administrar un pequeño catálogo de productos.

```text
Cliente
(Postman / navegador / curl)
          |
          | HTTP Request
          v
+-------------------------+
|   Backend Node.js       |
|      + Express          |
|                         |
|   API REST /products    |
+-------------------------+
          |
          v
   Datos en memoria
```

> **Importante:** en esta primera clase no utilizaremos una base de datos. Los productos se almacenarán temporalmente en un arreglo de JavaScript. Al reiniciar el servidor, los cambios se perderán.

Más adelante podremos reemplazar el arreglo por PostgreSQL, MySQL, MongoDB u otro sistema de persistencia.

---

# 3. Recordatorio conceptual

## 3.1 ¿Qué es un backend?

El **backend** es la parte de una aplicación que se ejecuta del lado del servidor y que puede encargarse de:

- procesar solicitudes;
- aplicar reglas de negocio;
- validar datos;
- autenticar usuarios;
- acceder a bases de datos;
- integrar servicios externos;
- controlar permisos;
- entregar información al frontend.

```text
Frontend
Angular / React / Ionic
        |
        | HTTP
        v
Backend
Node.js + Express
        |
        v
Base de datos
```

## 3.2 ¿Qué es una API?

Una **API (Application Programming Interface)** define una interfaz mediante la cual un sistema puede solicitar datos o funcionalidades a otro sistema.

En este laboratorio, nuestra API será la interfaz mediante la cual un cliente podrá administrar productos.

## 3.3 ¿Qué es REST?

REST es un **estilo arquitectónico** utilizado para diseñar sistemas distribuidos.

En una API REST trabajaremos principalmente con **recursos**.

Ejemplos:

```text
products
users
orders
categories
```

Para este laboratorio nuestro recurso principal será:

```text
products
```

## 3.4 Recurso, ruta y endpoint

### Recurso

Entidad o concepto que queremos administrar.

Ejemplo:

```text
Producto
```

Una representación JSON del recurso podría ser:

```json
{
  "id": 1,
  "name": "Teclado",
  "price": 24990,
  "stock": 10
}
```

### Ruta

Patrón definido en el backend.

```text
/products/:id
```

### Endpoint

Combinación concreta entre un **método HTTP** y una **ruta**.

```text
GET    /products
GET    /products/1
POST   /products
PATCH  /products/1
DELETE /products/1
```

> **Pregunta 1**  
> ¿`/products` por sí solo indica completamente qué operación realizará la API?
>
> **Respuesta esperada:** No. También necesitamos conocer el método HTTP.

---

# 4. Preparación del entorno

## 4.1 Verificar Node.js y npm

```bash
node -v
npm -v
```

Para este laboratorio se recomienda trabajar con una versión LTS reciente de Node.js.

---

# 5. Crear el proyecto

```bash
mkdir backend-products
cd backend-products
npm init -y
```

Esto crea el archivo:

```text
package.json
```

---

# 6. Instalar Express

```bash
npm install express
```

Express quedará registrado como una dependencia del proyecto.

---

# 7. Configurar ES Modules

Editaremos `package.json` para utilizar `import` y agregaremos scripts de ejecución.

```json
{
  "name": "backend-products",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/app.js",
    "start": "node src/app.js"
  },
  "dependencies": {
    "express": "^5.0.0"
  }
}
```

> No es necesario copiar exactamente la versión de Express mostrada aquí. `npm install express` registrará la versión instalada en el proyecto.

Ejecutaremos posteriormente:

```bash
npm run dev
```

`node --watch` reinicia automáticamente el proceso cuando detecta cambios en el código.

---

# 8. Crear la estructura inicial

```bash
mkdir src
```

Estructura:

```text
backend-products/
|
|-- node_modules/
|-- src/
|   `-- app.js
|
|-- package.json
`-- package-lock.json
```

---

# 9. Nuestro primer servidor Express

Crear `src/app.js`:

```javascript
import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
```

Ejecutar:

```bash
npm run dev
```

Abrir:

```text
http://localhost:3000
```

Respuesta esperada:

```text
Backend funcionando
```

---

# 10. ¿Qué acaba de ocurrir?

```javascript
import express from "express";
```

Importa Express.

```javascript
const app = express();
```

Crea la aplicación Express.

```javascript
app.get("/", (req, res) => {
  res.send("Backend funcionando");
});
```

Define una ruta que responde a:

```text
GET /
```

```javascript
app.listen(PORT, () => {
  // ...
});
```

Hace que la aplicación comience a escuchar solicitudes HTTP.

> **Pregunta 2**  
> ¿Qué pasaría si escribimos `http://localhost:3000/products` ahora?
>
> **Respuesta esperada:** Express no tiene todavía una ruta que responda a esa solicitud.

---

# 11. Request y Response

Cada endpoint recibe normalmente:

```javascript
(req, res)
```

### `req`

Representa la **solicitud HTTP**.

Puede contener:

```text
req.params
req.query
req.body
req.headers
```

### `res`

Representa la **respuesta HTTP**.

Ejemplos:

```javascript
res.send(...)
res.json(...)
res.status(...)
```

```text
Cliente
   |
   | Request
   v
Express
(req, res)
   |
   | Response
   v
Cliente
```

---

# 12. Crear nuestro recurso `products`

Agregar temporalmente:

```javascript
let products = [
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

Este arreglo simulará temporalmente una base de datos.

---

# 13. Obtener todos los productos

```javascript
app.get("/products", (req, res) => {
  res.json(products);
});
```

Endpoint:

```text
GET /products
```

Probar:

```bash
curl http://localhost:3000/products
```

Respuesta esperada:

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
  }
]
```

---

# 14. Obtener un producto específico

Queremos responder a:

```text
GET /products/2
```

Código:

```javascript
app.get("/products/:id", (req, res) => {

  const id = Number(req.params.id);

  const product = products.find(
    (product) => product.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  res.json(product);
});
```

`/products/:id` define un parámetro dinámico.

Para:

```text
/products/2
```

Express permite leer:

```javascript
req.params.id
```

Su valor inicialmente es texto:

```text
"2"
```

por eso utilizamos:

```javascript
Number(req.params.id)
```

> **Pregunta 3**  
> ¿Cuál es la diferencia entre `GET /products` y `GET /products/2`?
>
> **Respuesta esperada:** el primero solicita la colección completa; el segundo solicita un recurso específico.

---

# 15. Middleware para recibir JSON

Antes de implementar `POST`, agregar después de crear `app`:

```javascript
app.use(express.json());
```

Inicio del archivo:

```javascript
import express from "express";

const app = express();

app.use(express.json());

const PORT = 3000;
```

`express.json()` permite procesar cuerpos enviados como JSON y deja los datos disponibles en:

```javascript
req.body
```

---

# 16. ¿Qué es un middleware?

Un middleware es una función que participa en el procesamiento de una solicitud antes de que llegue a su manejador final o antes de devolver una respuesta.

```text
Request
   |
   v
Middleware
express.json()
   |
   v
Ruta
POST /products
   |
   v
Response
```

---

# 17. Crear un producto con POST

Endpoint:

```text
POST /products
```

Código:

```javascript
app.post("/products", (req, res) => {

  const { name, price, stock } = req.body;

  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({
      message: "name, price y stock son obligatorios"
    });
  }

  const newId =
    products.length === 0
      ? 1
      : Math.max(...products.map((product) => product.id)) + 1;

  const newProduct = {
    id: newId,
    name,
    price,
    stock
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});
```

Probar:

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Webcam","price":29990,"stock":8}'
```

Respuesta esperada:

```json
{
  "id": 4,
  "name": "Webcam",
  "price": 29990,
  "stock": 8
}
```

Código HTTP:

```text
201 Created
```

### ¿Qué ocurre con el body?

```text
JSON enviado por el cliente
          |
          v
   express.json()
          |
          v
       req.body
          |
          v
   POST /products
```

> **Pregunta 4**  
> ¿Por qué utilizamos `201` y no simplemente `200`?
>
> **Respuesta esperada:** porque la operación creó un nuevo recurso.

---

# 18. Actualizar completamente con PUT

```text
PUT /products/:id
```

```javascript
app.put("/products/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  const { name, price, stock } = req.body;

  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({
      message: "name, price y stock son obligatorios"
    });
  }

  const updatedProduct = {
    id,
    name,
    price,
    stock
  };

  products[index] = updatedProduct;

  res.json(updatedProduct);
});
```

Probar:

```bash
curl -X PUT http://localhost:3000/products/2 \
  -H "Content-Type: application/json" \
  -d '{"name":"Mouse inalámbrico","price":18990,"stock":20}'
```

---

# 19. Actualización parcial con PATCH

```text
PATCH /products/:id
```

```javascript
app.patch("/products/:id", (req, res) => {

  const id = Number(req.params.id);

  const product = products.find(
    (product) => product.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  const { name, price, stock } = req.body;

  if (name !== undefined) {
    product.name = name;
  }

  if (price !== undefined) {
    product.price = price;
  }

  if (stock !== undefined) {
    product.stock = stock;
  }

  res.json(product);
});
```

Probar:

```bash
curl -X PATCH http://localhost:3000/products/2 \
  -H "Content-Type: application/json" \
  -d '{"stock":25}'
```

> **Pregunta 5**  
> ¿Cuál es la diferencia conceptual entre `PUT` y `PATCH`?
>
> **Respuesta esperada:** `PUT` se utiliza habitualmente para reemplazar la representación completa del recurso, mientras que `PATCH` realiza modificaciones parciales.

---

# 20. Eliminar un producto con DELETE

```text
DELETE /products/:id
```

```javascript
app.delete("/products/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  products.splice(index, 1);

  res.status(204).send();
});
```

Probar:

```bash
curl -X DELETE http://localhost:3000/products/3
```

Respuesta:

```text
204 No Content
```

---

# 21. Nuestra API hasta ahora

| Método | Endpoint | Operación |
|---|---|---|
| `GET` | `/products` | Obtener todos los productos |
| `GET` | `/products/:id` | Obtener un producto |
| `POST` | `/products` | Crear un producto |
| `PUT` | `/products/:id` | Reemplazar un producto |
| `PATCH` | `/products/:id` | Actualizar parcialmente |
| `DELETE` | `/products/:id` | Eliminar un producto |

Relación aproximada con CRUD:

| CRUD | HTTP |
|---|---|
| Create | `POST` |
| Read | `GET` |
| Update | `PUT` / `PATCH` |
| Delete | `DELETE` |

> REST no significa simplemente CRUD. Esta tabla es una aproximación práctica para comenzar a diseñar una API orientada a recursos.

---

# 22. Códigos HTTP utilizados

| Código | Significado | Ejemplo |
|---:|---|---|
| `200` | OK | Consulta o actualización correcta |
| `201` | Created | Producto creado |
| `204` | No Content | Eliminación correcta sin body |
| `400` | Bad Request | Datos incompletos |
| `404` | Not Found | Producto inexistente |
| `500` | Internal Server Error | Error interno inesperado |

---

# 23. Agregar un middleware de logging

```javascript
app.use((req, res, next) => {

  console.log(
    `${new Date().toISOString()} ${req.method} ${req.url}`
  );

  next();
});
```

Debe agregarse antes de las rutas.

Cuando un cliente realice:

```text
GET /products
```

la consola puede mostrar:

```text
2026-09-21T20:10:45.212Z GET /products
```

## ¿Qué hace `next()`?

Permite que Express continúe con el siguiente middleware o con la ruta correspondiente.

```text
Request
   |
   v
Logger middleware
   |
   | next()
   v
express.json()
   |
   v
Ruta correspondiente
   |
   v
Response
```

> **Pregunta 6**  
> ¿Qué podría ocurrir si un middleware no responde y tampoco ejecuta `next()`?
>
> **Respuesta esperada:** la solicitud podría quedar sin avanzar hacia el siguiente middleware o ruta.

---

# 24. Manejar rutas inexistentes

Después de todas las rutas:

```javascript
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint no encontrado"
  });
});
```

Si alguien solicita:

```text
GET /abc
```

obtendrá:

```json
{
  "message": "Endpoint no encontrado"
}
```

---

# 25. Código completo de `src/app.js`

```javascript
import express from "express";

const app = express();
const PORT = 3000;

// ---------------------------------
// Middlewares
// ---------------------------------

app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} ${req.method} ${req.url}`
  );
  next();
});

// ---------------------------------
// Datos temporales
// ---------------------------------

let products = [
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

// ---------------------------------
// Ruta inicial
// ---------------------------------

app.get("/", (req, res) => {
  res.json({
    message: "API de productos funcionando"
  });
});

// ---------------------------------
// GET /products
// ---------------------------------

app.get("/products", (req, res) => {
  res.json(products);
});

// ---------------------------------
// GET /products/:id
// ---------------------------------

app.get("/products/:id", (req, res) => {

  const id = Number(req.params.id);

  const product = products.find(
    (product) => product.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  res.json(product);
});

// ---------------------------------
// POST /products
// ---------------------------------

app.post("/products", (req, res) => {

  const { name, price, stock } = req.body;

  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({
      message: "name, price y stock son obligatorios"
    });
  }

  const newId =
    products.length === 0
      ? 1
      : Math.max(...products.map((product) => product.id)) + 1;

  const newProduct = {
    id: newId,
    name,
    price,
    stock
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// ---------------------------------
// PUT /products/:id
// ---------------------------------

app.put("/products/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  const { name, price, stock } = req.body;

  if (!name || price === undefined || stock === undefined) {
    return res.status(400).json({
      message: "name, price y stock son obligatorios"
    });
  }

  const updatedProduct = {
    id,
    name,
    price,
    stock
  };

  products[index] = updatedProduct;

  res.json(updatedProduct);
});

// ---------------------------------
// PATCH /products/:id
// ---------------------------------

app.patch("/products/:id", (req, res) => {

  const id = Number(req.params.id);

  const product = products.find(
    (product) => product.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  const { name, price, stock } = req.body;

  if (name !== undefined) {
    product.name = name;
  }

  if (price !== undefined) {
    product.price = price;
  }

  if (stock !== undefined) {
    product.stock = stock;
  }

  res.json(product);
});

// ---------------------------------
// DELETE /products/:id
// ---------------------------------

app.delete("/products/:id", (req, res) => {

  const id = Number(req.params.id);

  const index = products.findIndex(
    (product) => product.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  products.splice(index, 1);

  res.status(204).send();
});

// ---------------------------------
// Endpoint no encontrado
// ---------------------------------

app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint no encontrado"
  });
});

// ---------------------------------
// Iniciar servidor
// ---------------------------------

app.listen(PORT, () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${PORT}`
  );
});
```

---

# 26. Prueba guiada completa

Ejecutar:

```bash
npm run dev
```

## Paso 1 — Obtener productos

```bash
curl http://localhost:3000/products
```

## Paso 2 — Crear producto

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Audífonos","price":19990,"stock":12}'
```

## Paso 3 — Consultar el producto creado

```bash
curl http://localhost:3000/products/4
```

## Paso 4 — Modificar solo el stock

```bash
curl -X PATCH http://localhost:3000/products/4 \
  -H "Content-Type: application/json" \
  -d '{"stock":30}'
```

## Paso 5 — Reemplazar los datos

```bash
curl -X PUT http://localhost:3000/products/4 \
  -H "Content-Type: application/json" \
  -d '{"name":"Audífonos Bluetooth","price":27990,"stock":18}'
```

## Paso 6 — Eliminar

```bash
curl -X DELETE http://localhost:3000/products/4
```

## Paso 7 — Verificar que ya no existe

```bash
curl http://localhost:3000/products/4
```

Resultado:

```json
{
  "message": "Producto no encontrado"
}
```

---

# 27. Actividad: analizar una solicitud

Para:

```text
PATCH /products/2
```

con:

```json
{
  "stock": 40
}
```

Identificar:

1. Método HTTP.
2. Ruta.
3. Recurso.
4. Parámetro.
5. Body.
6. Respuesta esperada.
7. Código de estado si el producto no existe.

### Respuesta esperada

```text
Método: PATCH
Ruta: /products/:id
Recurso: products
Parámetro: id = 2
Body: { "stock": 40 }
Respuesta: representación actualizada del producto
Si no existe: 404 Not Found
```

---

# 28. Desafío práctico

Agregar el atributo:

```text
category
```

Ejemplo:

```json
{
  "id": 1,
  "name": "Teclado",
  "price": 24990,
  "stock": 10,
  "category": "perifericos"
}
```

Actualizar:

- `POST /products`
- `PUT /products/:id`
- `PATCH /products/:id`

para soportar este nuevo atributo.

---

# 29. Desafío adicional: Query Parameters

Queremos permitir:

```text
GET /products?category=perifericos
```

Podemos acceder a:

```javascript
req.query.category
```

Una posible implementación:

```javascript
app.get("/products", (req, res) => {

  const { category } = req.query;

  if (!category) {
    return res.json(products);
  }

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  res.json(filteredProducts);
});
```

---

# 30. Parámetros de ruta vs Query Parameters

## Parámetro de ruta

Identifica normalmente un recurso específico:

```text
GET /products/25
```

```javascript
req.params.id
```

## Query parameter

Se utiliza frecuentemente para filtrar, ordenar o modificar una consulta:

```text
GET /products?category=perifericos
```

```javascript
req.query.category
```

Otro ejemplo:

```text
GET /products?category=perifericos&minPrice=10000
```

---

# 31. Preguntas de cierre

Responder en parejas:

1. ¿Cuál es la función del backend?
2. ¿Qué diferencia existe entre una ruta y un endpoint?
3. ¿Qué es un recurso en REST?
4. ¿Cuál es la diferencia entre `GET /products` y `GET /products/:id`?
5. ¿Dónde encontramos los parámetros de ruta en Express?
6. ¿Dónde encontramos el body enviado por el cliente?
7. ¿Para qué sirve `express.json()`?
8. ¿Qué diferencia existe entre `PUT` y `PATCH`?
9. ¿Qué significa responder con `404`?
10. ¿Por qué los datos creados desaparecen al reiniciar el servidor?

---

# 32. Síntesis

```text
Cliente
   |
   | HTTP
   v
Express
   |
   +-- GET    /products
   +-- GET    /products/:id
   +-- POST   /products
   +-- PUT    /products/:id
   +-- PATCH  /products/:id
   +-- DELETE /products/:id
   |
   v
Arreglo en memoria
```

Conceptos principales:

```text
Backend
API
REST
Recurso
Ruta
Endpoint
Request
Response
HTTP
JSON
Middleware
Status Code
CRUD
```

---

# 33. ¿Qué falta para un backend real?

Nuestra API funciona, pero todavía es deliberadamente simple.

```text
API REST
   |
   +-- estructura por rutas/controladores
   +-- validación más robusta
   +-- manejo centralizado de errores
   +-- variables de entorno
   +-- CORS
   +-- base de datos
   +-- autenticación
   +-- autorización
   +-- logs estructurados
   +-- pruebas automatizadas
   `-- documentación OpenAPI / Swagger
```

Una evolución natural:

```text
Frontend
   |
   v
API REST
   |
   v
Routes
   |
   v
Controllers
   |
   v
Services
   |
   v
Repository / ORM
   |
   v
Database
```

---

# 34. Actividad para la siguiente clase

Crear un recurso adicional:

```text
categories
```

con:

```json
{
  "id": 1,
  "name": "Periféricos"
}
```

Implementar:

```text
GET    /categories
GET    /categories/:id
POST   /categories
PATCH  /categories/:id
DELETE /categories/:id
```

Además:

1. utilizar códigos HTTP adecuados;
2. validar datos obligatorios;
3. responder `404` cuando el recurso no exista;
4. probar todos los endpoints;
5. documentar al menos cinco pruebas realizadas.

---

# 35. Referencias técnicas

- Express — Installing: https://expressjs.com/en/starter/installing.html
- Express — Basic routing: https://expressjs.com/en/starter/basic-routing.html
- Express — Middleware: https://expressjs.com/en/guide/using-middleware.html
- Node.js: https://nodejs.org/
- HTTP Semantics — RFC 9110: https://www.rfc-editor.org/rfc/rfc9110
- JSON — RFC 8259: https://www.rfc-editor.org/rfc/rfc8259