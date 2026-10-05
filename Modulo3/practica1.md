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

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/products` | Listar productos |
| GET | `/api/products/:id` | Obtener un producto |
| POST | `/api/products` | Crear un producto |
| PUT | `/api/products/:id` | Actualizar un producto |
| DELETE | `/api/products/:id` | Eliminar un producto |

Los métodos HTTP pueden repetirse.

Por ejemplo:

```text
POST /api/auth/login
POST /api/products
```

Ambos utilizan `POST`, pero representan operaciones distintas porque la URL también forma parte del endpoint.

---

# 3. Crear el proyecto

```bash
mkdir api-rest
cd api-rest
npm init -y
```

Esto crea:

```text
package.json
```

---

# 4. Configurar package.json

Como trabajaremos con módulos ES y TypeScript utilizando `NodeNext`, debemos agregar:

```json
"type": "module"
```

Un `package.json` básico puede quedar así:

```json
{
  "name": "api-rest",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js"
  }
}
```

La propiedad:

```json
"type": "module"
```

indica a Node.js que el proyecto utiliza ES Modules.

Por eso podremos utilizar:

```ts
import express from "express";
```

en lugar de:

```js
const express = require("express");
```

---

# 5. Importante: extensiones en los imports

Al trabajar con:

```json
"type": "module"
```

y:

```json
"module": "NodeNext",
"moduleResolution": "NodeNext"
```

los imports relativos deben escribirse usando la extensión `.js`.

Por ejemplo, aunque el archivo sea:

```text
auth.routes.ts
```

el import se escribe:

```ts
import authRoutes from "./routes/auth.routes.js";
```

Esto se debe a que después de compilar:

```text
auth.routes.ts
```

se convierte en:

```text
auth.routes.js
```

Por tanto:

```ts
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js";
```

es correcto.

---

# 6. Instalar dependencias

```bash
npm install express jsonwebtoken
```

Dependencias de desarrollo:

```bash
npm install --save-dev typescript tsx
npm install --save-dev @types/node @types/express @types/jsonwebtoken
```

---

# 7. Crear tsconfig.json

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

# 8. Relación entre package.json y tsconfig.json

En este proyecto tenemos:

```json
"type": "module"
```

en `package.json`.

Y:

```json
"module": "NodeNext",
"moduleResolution": "NodeNext"
```

en `tsconfig.json`.

Esto permite trabajar con:

```ts
import ...
export default ...
```

siguiendo las reglas modernas de módulos de Node.js.

---

# 9. Estructura del proyecto

```text
api-rest/
├── package.json
├── tsconfig.json
└── src/
    ├── app.ts
    ├── routes/
    │   ├── auth.routes.ts
    │   └── products.routes.ts
    └── middleware/
        └── auth.middleware.ts
```

---

# 10. Crear el servidor

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

# 11. Primer recurso: autenticación

Archivo:

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

# 12. Endpoint final del login

Tenemos:

```ts
router.post("/login");
```

y en `app.ts`:

```ts
app.use("/api/auth", authRoutes);
```

Por lo tanto:

```text
POST /api/auth/login
```

---

# 13. Probar login con curl

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

# 14. Segundo recurso: products

Archivo:

```text
src/routes/products.routes.ts
```

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

router.get("/", (req, res) => {
  res.status(200).json(products);
});

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

# 15. Middleware JWT

Archivo:

```text
src/middleware/auth.middleware.ts
```

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

# 16. Ejecutar el proyecto

Durante desarrollo:

```bash
npm run dev
```

Para compilar:

```bash
npm run build
```

Esto genera:

```text
dist/
```

Luego:

```bash
npm start
```

ejecuta:

```text
node dist/app.js
```

---

# 17. Probar products sin token

```bash
curl -i http://localhost:3000/api/products
```

Respuesta:

```text
401 Unauthorized
```

---

# 18. Obtener token

```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"ana@correo.cl","password":"1234"}'
```

Luego guardar:

```bash
TOKEN="eyJhbGciOiJIUzI1NiIs..."
```

---

# 19. Listar productos con JWT

```bash
curl -i http://localhost:3000/api/products \
-H "Authorization: Bearer $TOKEN"
```

---

# 20. Crear producto

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

# 21. Actualizar producto

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

# 22. Eliminar producto

```bash
curl -i -X DELETE http://localhost:3000/api/products/2 \
-H "Authorization: Bearer $TOKEN"
```

---

# 23. Idea clave sobre los métodos repetidos

Los métodos HTTP pueden repetirse porque el endpoint completo está formado por:

```text
Método HTTP + URL
```

Ejemplos:

```text
POST /api/auth/login
POST /api/products
```

No existe conflicto porque son endpoints diferentes.

---

# 24. Resumen de configuración

## package.json

Debe incluir:

```json
"type": "module"
```

## tsconfig.json

Debe utilizar:

```json
"module": "NodeNext",
"moduleResolution": "NodeNext"
```

## Imports relativos

Se escriben con `.js`:

```ts
import authRoutes from "./routes/auth.routes.js";
```

aunque el archivo fuente sea:

```text
auth.routes.ts
```

---

# 25. Resumen final de la API

```text
POST   /api/auth/login
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

Flujo:

```text
Cliente
   |
   | POST /api/auth/login
   v
Servidor
   |
   | genera JWT
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