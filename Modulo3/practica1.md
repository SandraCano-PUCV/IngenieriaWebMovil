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