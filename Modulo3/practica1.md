# Guía práctica: Construcción de una API REST con Express, JWT y dos recursos

## 1. Objetivo

Construir una API REST utilizando:

- Node.js
- Express
- TypeScript
- JSON
- JSON Web Token (JWT)
- Códigos de estado HTTP
- Rutas protegidas

La API trabajará con dos recursos:

```text
/auth
/products
```

El primer recurso estará relacionado con autenticación.

El segundo recurso permitirá gestionar productos.

---

# 2. Endpoints que construiremos

La API tendrá los siguientes endpoints:

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/products` | Listar productos |
| GET | `/api/products/:id` | Obtener un producto |
| POST | `/api/products` | Crear un producto |
| PUT | `/api/products/:id` | Actualizar un producto |
| DELETE | `/api/products/:id` | Eliminar un producto |

Podemos observar que el método:

```text
POST
```

aparece en más de un endpoint:

```text
POST /api/auth/login
POST /api/products
```

Esto es completamente válido.

El método HTTP indica la operación, pero el recurso está determinado por la URL.

---

# 3. Crear el proyecto

Crear una carpeta:

```bash
mkdir api-rest
cd api-rest
```

Inicializar Node.js:

```bash
npm init -y
```

---

# 4. Instalar dependencias

Instalar Express:

```bash
npm install express
```

Instalar JSON Web Token:

```bash
npm install jsonwebtoken
```

Instalar TypeScript:

```bash
npm install --save-dev typescript
```

Instalar tipos:

```bash
npm install --save-dev @types/node @types/express @types/jsonwebtoken
```

Opcionalmente, instalar `tsx` para ejecutar TypeScript directamente:

```bash
npm install --save-dev tsx
```

---

# 5. Crear tsconfig.json

Crear:

```text
tsconfig.json
```

Ejemplo:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "target": "ES2020",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": [
    "src/**/*.ts"
  ]
}
```

---

# 6. Estructura del proyecto

Crear:

```text
src/
├── app.ts
├── routes/
│   ├── auth.routes.ts
│   └── products.routes.ts
└── middleware/
    └── auth.middleware.ts
```

La idea es separar cada recurso en su propio router.

---

# 7. Crear el servidor

Archivo:

```text
src/app.ts
```

```ts
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
```

---

# 8. ¿Qué hace express.json()?

La instrucción:

```ts
app.use(express.json());
```

permite que Express interprete datos JSON enviados en el body.

Por ejemplo:

```json
{
  "email": "ana@correo.cl",
  "password": "1234"
}
```

Sin:

```ts
express.json()
```

Express no interpretaría correctamente ese body como JSON.

---

# 9. Primer recurso: autenticación

Crear:

```text
src/routes/auth.routes.ts
```

```ts
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

const JWT_SECRET = "clave_secreta";

const users = [
  {
    id: 1,
    nombre: "Ana",
    email: "ana@correo.cl",
    password: "1234"
  },
  {
    id: 2,
    nombre: "Luis",
    email: "luis@correo.cl",
    password: "abcd"
  }
];

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email &&
         u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Credenciales incorrectas"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },
    JWT_SECRET,
    {
      expiresIn: "1h"
    }
  );

  res.status(200).json({
    message: "Inicio de sesión exitoso",
    token
  });
});

export default router;
```

---

# 10. Endpoint final del login

En el router tenemos:

```ts
router.post("/login");
```

y en `app.ts`:

```ts
app.use("/api/auth", authRoutes);
```

Por lo tanto, el endpoint completo es:

```text
POST /api/auth/login
```

---

# 11. Probar login con curl

```bash
curl -i -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"ana@correo.cl","password":"1234"}'
```

Respuesta esperada:

```text
HTTP/1.1 200 OK
```

```json
{
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

# 12. Probar login incorrecto

```bash
curl -i -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"ana@correo.cl","password":"incorrecta"}'
```

Respuesta:

```text
HTTP/1.1 401 Unauthorized
```

```json
{
  "message": "Credenciales incorrectas"
}
```

---

# 13. ¿Qué es JWT?

JWT significa:

```text
JSON Web Token
```

El servidor genera un token después de validar las credenciales.

Ese token se utilizará posteriormente para acceder a recursos protegidos.

Flujo:

```text
Cliente
   |
   | email + password
   v
POST /api/auth/login
   |
   v
Servidor
   |
   | verifica credenciales
   v
Genera JWT
   |
   v
Cliente recibe token
```

---

# 14. Segundo recurso: productos

Crear:

```text
src/routes/products.routes.ts
```

Primero definimos algunos productos:

```ts
import { Router } from "express";

const router = Router();

let products = [
  {
    id: 1,
    nombre: "Arduino UNO",
    precio: 15000
  },
  {
    id: 2,
    nombre: "Servo SG90",
    precio: 4500
  },
  {
    id: 3,
    nombre: "Sensor HC-SR04",
    precio: 3500
  }
];

export default router;
```

---

# 15. GET: listar productos

Agregamos:

```ts
router.get("/", (req, res) => {
  res.status(200).json(products);
});
```

Endpoint:

```text
GET /api/products
```

---

# 16. Probar GET con curl

```bash
curl -i http://localhost:3000/api/products
```

Respuesta:

```json
[
  {
    "id": 1,
    "nombre": "Arduino UNO",
    "precio": 15000
  },
  {
    "id": 2,
    "nombre": "Servo SG90",
    "precio": 4500
  }
]
```

---

# 17. GET por id

Agregar:

```ts
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find(
    p => p.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  res.status(200).json(product);
});
```

Endpoint:

```text
GET /api/products/:id
```

Ejemplo:

```bash
curl -i http://localhost:3000/api/products/1
```

---

# 18. POST: crear producto

Agregar:

```ts
router.post("/", (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || precio === undefined) {
    return res.status(400).json({
      message: "Nombre y precio son obligatorios"
    });
  }

  const newProduct = {
    id: products.length + 1,
    nombre,
    precio
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});
```

Endpoint:

```text
POST /api/products
```

---

# 19. Probar POST con curl

```bash
curl -i -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-d '{
  "nombre": "Sensor DHT11",
  "precio": 5000
}'
```

Respuesta esperada:

```text
HTTP/1.1 201 Created
```

---

# 20. PUT: actualizar producto

Agregar:

```ts
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find(
    p => p.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  product.nombre = req.body.nombre;
  product.precio = req.body.precio;

  res.status(200).json(product);
});
```

Endpoint:

```text
PUT /api/products/:id
```

---

# 21. Probar PUT con curl

```bash
curl -i -X PUT http://localhost:3000/api/products/1 \
-H "Content-Type: application/json" \
-d '{
  "nombre": "Arduino UNO R3",
  "precio": 16000
}'
```

---

# 22. DELETE: eliminar producto

Agregar:

```ts
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex(
    p => p.id === id
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

Endpoint:

```text
DELETE /api/products/:id
```

---

# 23. Probar DELETE con curl

```bash
curl -i -X DELETE http://localhost:3000/api/products/1
```

Respuesta:

```text
HTTP/1.1 204 No Content
```

---

# 24. Métodos repetidos en distintos recursos

Es importante entender que los métodos HTTP pueden repetirse.

Por ejemplo:

```text
POST /api/auth/login
POST /api/products
```

Ambos utilizan:

```text
POST
```

pero representan operaciones diferentes.

El primero:

```text
POST /api/auth/login
```

envía credenciales para iniciar sesión.

El segundo:

```text
POST /api/products
```

crea un nuevo producto.

La combinación:

```text
MÉTODO + URL
```

define el endpoint.

---

# 25. Proteger products con JWT

Hasta ahora cualquier cliente puede acceder a:

```text
/api/products
```

Vamos a protegerlo usando JWT.

Crear:

```text
src/middleware/auth.middleware.ts
```

---

# 26. Middleware de autenticación

```ts
import {
  Request,
  Response,
  NextFunction
} from "express";

import jwt from "jsonwebtoken";

const JWT_SECRET = "clave_secreta";

export function verificarToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token no proporcionado"
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token inválido"
    });
  }

  try {
    jwt.verify(token, JWT_SECRET);

    next();

  } catch {
    return res.status(401).json({
      message: "Token inválido o expirado"
    });
  }
}
```

---

# 27. Aplicar middleware a products

En:

```text
products.routes.ts
```

importamos:

```ts
import { verificarToken } from "../middleware/auth.middleware.js";
```

Podemos proteger todas las rutas:

```ts
router.use(verificarToken);
```

Quedaría:

```ts
import { Router } from "express";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verificarToken);
```

Todas las rutas definidas después requerirán token.

---

# 28. Probar products sin token

```bash
curl -i http://localhost:3000/api/products
```

Respuesta:

```text
HTTP/1.1 401 Unauthorized
```

```json
{
  "message": "Token no proporcionado"
}
```

---

# 29. Guardar el token

Después del login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"ana@correo.cl","password":"1234"}'
```

copiar el token y guardarlo:

```bash
TOKEN="eyJhbGciOiJIUzI1NiIs..."
```

---

# 30. Consultar products con JWT

```bash
curl -i http://localhost:3000/api/products \
-H "Authorization: Bearer $TOKEN"
```

Ahora la respuesta debería ser:

```text
200 OK
```

---

# 31. Crear producto usando JWT

```bash
curl -i -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "nombre": "OLED 128x64",
  "precio": 6000
}'
```

---

# 32. Actualizar producto usando JWT

```bash
curl -i -X PUT http://localhost:3000/api/products/2 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "nombre": "Servo SG90",
  "precio": 4800
}'
```

---

# 33. Eliminar producto usando JWT

```bash
curl -i -X DELETE http://localhost:3000/api/products/2 \
-H "Authorization: Bearer $TOKEN"
```

---

# 34. Código completo de products.routes.ts

```ts
import { Router } from "express";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

let products = [
  {
    id: 1,
    nombre: "Arduino UNO",
    precio: 15000
  },
  {
    id: 2,
    nombre: "Servo SG90",
    precio: 4500
  },
  {
    id: 3,
    nombre: "Sensor HC-SR04",
    precio: 3500
  }
];

router.use(verificarToken);

// GET todos
router.get("/", (req, res) => {
  res.status(200).json(products);
});

// GET por ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find(
    p => p.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  res.status(200).json(product);
});

// POST
router.post("/", (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || precio === undefined) {
    return res.status(400).json({
      message: "Nombre y precio son obligatorios"
    });
  }

  const newProduct = {
    id: products.length + 1,
    nombre,
    precio
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// PUT
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find(
    p => p.id === id
  );

  if (!product) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  product.nombre = req.body.nombre;
  product.precio = req.body.precio;

  res.status(200).json(product);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex(
    p => p.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Producto no encontrado"
    });
  }

  products.splice(index, 1);

  res.status(204).send();
});

export default router;
```

---

# 35. Resumen de la API

## Recurso de autenticación

```text
/api/auth
```

Endpoint:

```text
POST /api/auth/login
```

Función:

```text
autenticar usuario
generar JWT
```

---

## Recurso products

```text
/api/products
```

Endpoints:

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

Todos requieren:

```text
Authorization: Bearer TOKEN
```

---

# 36. Flujo completo

```text
Cliente
   |
   | POST /api/auth/login
   | email + password
   v
Servidor
   |
   | valida credenciales
   v
JWT
   |
   | token
   v
Cliente
   |
   | Authorization: Bearer TOKEN
   v
/api/products
   |
   +-- GET
   +-- POST
   +-- PUT
   +-- DELETE
```

---

# 37. Códigos de estado utilizados

| Código | Significado |
|---|---|
| `200` | Operación correcta |
| `201` | Recurso creado |
| `204` | Eliminación correcta sin contenido |
| `400` | Datos incorrectos |
| `401` | No autenticado |
| `404` | Recurso no encontrado |

---

# 38. Actividad práctica

Implemente la API descrita y realice las siguientes pruebas utilizando `curl`.

## Parte 1: autenticación

Realizar:

```text
POST /api/auth/login
```

con credenciales correctas.

Luego realizar el mismo endpoint con credenciales incorrectas.

Registrar:

```text
Código HTTP
Respuesta JSON
Token obtenido
```

---

## Parte 2: products sin token

Realizar:

```text
GET /api/products
```

sin enviar token.

Registrar el resultado.

---

## Parte 3: products con token

Realizar:

```text
GET /api/products
```

enviando:

```text
Authorization: Bearer TOKEN
```

---

## Parte 4: CRUD

Realizar:

```text
GET
POST
PUT
DELETE
```

sobre:

```text
/api/products
```

utilizando JWT.

---

# 39. Preguntas de reflexión

1. ¿Por qué `POST` puede aparecer tanto en `/api/auth/login` como en `/api/products`?
2. ¿Qué identifica realmente a un endpoint?
3. ¿Qué diferencia existe entre autenticación y autorización?
4. ¿Para qué se utiliza JWT?
5. ¿Qué ocurre si no se envía el token?
6. ¿Por qué se utiliza el header `Authorization`?
7. ¿Cuál es la diferencia entre `200` y `201`?
8. ¿Por qué DELETE puede responder con `204`?
9. ¿Qué función cumple un middleware?
10. ¿Por qué conviene separar `auth.routes.ts` y `products.routes.ts`?

---

# 40. Desafío adicional

Agregar un tercer recurso:

```text
/api/categories
```

con:

```text
GET    /api/categories
POST   /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id
```

Protegerlo también con JWT.

El objetivo es observar que métodos como:

```text
GET
POST
PUT
DELETE
```

pueden repetirse en diferentes recursos sin conflicto, porque cada endpoint está determinado por:

```text
Método HTTP + URL
```