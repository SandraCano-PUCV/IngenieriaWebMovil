# Seguridad en Express con Helmet, CORS, JWT y pruebas usando `curl`

## 1. Introducción

En una API REST es importante aplicar mecanismos básicos de seguridad.

En este ejemplo trabajaremos con:

```text
Helmet
CORS
JWT
curl
```

Cada uno cumple una función diferente:

| Herramienta | Función |
|---|---|
| Helmet | Agrega headers HTTP de seguridad |
| CORS | Controla qué orígenes pueden acceder |
| JWT | Permite autenticar usuarios mediante tokens |
| curl | Permite probar la API desde terminal |

---

# 2. Instalar las dependencias

```bash
npm install helmet cors jsonwebtoken
```

Para TypeScript:

```bash
npm install --save-dev @types/cors @types/jsonwebtoken
```

Helmet incluye sus propios tipos, por lo que normalmente no es necesario instalar:

```text
@types/helmet
```

---

# 3. ¿Qué es Helmet?

Helmet es un middleware para Express que agrega diferentes headers HTTP relacionados con seguridad.

Por ejemplo:

```ts
import helmet from "helmet";

app.use(helmet());
```

Algunos headers que puede agregar son:

```text
Content-Security-Policy
X-Content-Type-Options
X-Frame-Options
Referrer-Policy
```

Estos headers ayudan a reducir ciertos riesgos comunes en aplicaciones web.

---

# 4. Configurar Helmet

En `app.ts`:

```ts
import express from "express";
import helmet from "helmet";

const app = express();

app.use(helmet());
```

Helmet debe configurarse antes de las rutas de la aplicación.

---

# 5. Probar Helmet con curl

Podemos visualizar los headers enviados por el servidor:

```bash
curl -I http://localhost:3000/
```

También podemos usar:

```bash
curl -i http://localhost:3000/
```

Podríamos observar:

```text
HTTP/1.1 200 OK
Content-Security-Policy: ...
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: no-referrer
```

La opción:

```text
-i
```

muestra tanto los headers como el contenido de la respuesta.

---

# 6. ¿Qué es CORS?

CORS significa:

```text
Cross-Origin Resource Sharing
```

Permite controlar qué orígenes pueden realizar solicitudes desde un navegador hacia nuestra API.

Por ejemplo:

```text
Frontend:
http://localhost:4200

Backend:
http://localhost:3000
```

Como utilizan diferentes puertos, son considerados orígenes distintos.

---

# 7. Configurar CORS

```ts
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);
```

Con esta configuración permitimos solicitudes desde:

```text
http://localhost:4200
```

---

# 8. Probar CORS con curl

Podemos simular el envío de un origen:

```bash
curl -i http://localhost:3000/api/products \
-H "Origin: http://localhost:4200"
```

Podríamos observar:

```text
Access-Control-Allow-Origin: http://localhost:4200
```

---

# 9. Probar un origen diferente

```bash
curl -i http://localhost:3000/api/products \
-H "Origin: http://localhost:5000"
```

Si la API solo permite:

```text
http://localhost:4200
```

el servidor no debería autorizar ese otro origen mediante los headers CORS.

Es importante recordar:

```text
curl no aplica las restricciones CORS del navegador
```

`curl` solamente nos permite observar los headers enviados por el servidor.

---

# 10. Probar una solicitud preflight

Los navegadores pueden realizar una solicitud:

```text
OPTIONS
```

antes de ciertas operaciones.

Podemos probar:

```bash
curl -i -X OPTIONS http://localhost:3000/api/products \
-H "Origin: http://localhost:4200" \
-H "Access-Control-Request-Method: POST" \
-H "Access-Control-Request-Headers: Content-Type,Authorization"
```

Podríamos observar:

```text
Access-Control-Allow-Origin: http://localhost:4200
Access-Control-Allow-Methods: GET,POST,PUT,DELETE
Access-Control-Allow-Headers: Content-Type,Authorization
```

---

# 11. ¿Qué es JWT?

JWT significa:

```text
JSON Web Token
```

Permite generar un token después de que el usuario inicia sesión correctamente.

Flujo:

```text
Usuario
   |
   | email + password
   v
POST /api/login
   |
   v
Servidor valida credenciales
   |
   v
Genera JWT
   |
   v
Cliente recibe token
```

---

# 12. Crear un login con JWT

```ts
import jwt from "jsonwebtoken";

const JWT_SECRET = "clave_secreta";

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email !== "ana@correo.cl" ||
    password !== "1234"
  ) {
    return res.status(401).json({
      message: "Credenciales incorrectas"
    });
  }

  const token = jwt.sign(
    {
      id: 1,
      email: email
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
```

---

# 13. Probar login con curl

```bash
curl -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"email":"ana@correo.cl","password":"1234"}'
```

Respuesta:

```json
{
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

# 14. Mostrar el código HTTP

```bash
curl -i -X POST http://localhost:3000/api/login \
-H "Content-Type: application/json" \
-d '{"email":"ana@correo.cl","password":"1234"}'
```

Respuesta:

```text
HTTP/1.1 200 OK
```

---

# 15. Login incorrecto

```bash
curl -i -X POST http://localhost:3000/api/login \
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

# 16. Guardar el token

En Linux o macOS:

```bash
TOKEN="eyJhbGciOiJIUzI1NiIs..."
```

Podemos visualizarlo con:

```bash
echo $TOKEN
```

---

# 17. Middleware para verificar JWT

```ts
import {
  Request,
  Response,
  NextFunction
} from "express";

import jwt from "jsonwebtoken";

const JWT_SECRET = "clave_secreta";

function verificarToken(
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

# 18. Crear una ruta protegida

```ts
app.get(
  "/api/profile",
  verificarToken,
  (req, res) => {
    res.status(200).json({
      message: "Acceso autorizado"
    });
  }
);
```

---

# 19. Acceso sin token

```bash
curl -i http://localhost:3000/api/profile
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

# 20. Acceso con token inválido

```bash
curl -i http://localhost:3000/api/profile \
-H "Authorization: Bearer token_invalido"
```

Respuesta:

```text
HTTP/1.1 401 Unauthorized
```

---

# 21. Acceso con token válido

```bash
curl -i http://localhost:3000/api/profile \
-H "Authorization: Bearer $TOKEN"
```

Respuesta:

```text
HTTP/1.1 200 OK
```

```json
{
  "message": "Acceso autorizado"
}
```

---

# 22. Recurso protegido products

Supongamos que tenemos el recurso:

```text
/api/products
```

y que sus operaciones requieren JWT.

---

# 23. GET protegido

```bash
curl -i http://localhost:3000/api/products \
-H "Authorization: Bearer $TOKEN"
```

Respuesta:

```text
200 OK
```

---

# 24. POST protegido

```bash
curl -i -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "nombre": "Arduino UNO",
  "precio": 15000
}'
```

Respuesta esperada:

```text
201 Created
```

---

# 25. PUT protegido

```bash
curl -i -X PUT http://localhost:3000/api/products/1 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $TOKEN" \
-d '{
  "nombre": "Arduino UNO R3",
  "precio": 16000
}'
```

Respuesta esperada:

```text
200 OK
```

---

# 26. DELETE protegido

```bash
curl -i -X DELETE http://localhost:3000/api/products/1 \
-H "Authorization: Bearer $TOKEN"
```

Respuesta posible:

```text
204 No Content
```

---

# 27. Configuración completa de app.ts

```ts
import express from "express";
import cors from "cors";
import helmet from "helmet";
import jwt from "jsonwebtoken";

const app = express();

const JWT_SECRET = "clave_secreta";

// Seguridad mediante headers
app.use(helmet());

// Control de origen
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);

// Interpretar JSON
app.use(express.json());

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email !== "ana@correo.cl" ||
    password !== "1234"
  ) {
    return res.status(401).json({
      message: "Credenciales incorrectas"
    });
  }

  const token = jwt.sign(
    {
      id: 1,
      email
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

app.listen(3000, () => {
  console.log(
    "Servidor ejecutándose en http://localhost:3000"
  );
});
```

---

# 28. Función de cada mecanismo

## Helmet

Protege mediante headers HTTP:

```text
Helmet
   |
   v
Headers de seguridad
```

---

## CORS

Controla el origen:

```text
Frontend
http://localhost:4200
   |
   v
CORS
   |
   v
API
```

---

## JWT

Controla la autenticación:

```text
Usuario
   |
   | login
   v
JWT
   |
   | Bearer token
   v
Ruta protegida
```

---

# 29. Helmet, CORS y JWT no hacen lo mismo

Es importante no confundirlos.

```text
Helmet
   -> protege mediante headers HTTP

CORS
   -> controla qué orígenes pueden acceder

JWT
   -> identifica y autentica al usuario
```

Por lo tanto:

```text
Helmet != CORS
CORS != JWT
Helmet != JWT
```

Los tres mecanismos son complementarios.

---

# 30. Flujo completo

```text
Cliente
   |
   v
Helmet
Headers de seguridad
   |
   v
CORS
Validación del origen
   |
   v
Express
   |
   v
POST /api/login
   |
   v
JWT
   |
   | token
   v
Cliente
   |
   | Authorization: Bearer TOKEN
   v
Middleware
   |
   v
Ruta protegida
```

---

# 31. Probar los tres mecanismos con curl

## Helmet

```bash
curl -I http://localhost:3000/
```

Permite observar los headers de seguridad.

---

## CORS

```bash
curl -i http://localhost:3000/api/products \
-H "Origin: http://localhost:4200"
```

Permite observar:

```text
Access-Control-Allow-Origin
```

---

## JWT

```bash
curl -i http://localhost:3000/api/profile \
-H "Authorization: Bearer $TOKEN"
```

Permite probar una ruta autenticada.

---

# 32. Códigos de estado esperados

| Situación | Código |
|---|---:|
| Login correcto | `200` |
| Login incorrecto | `401` |
| Sin token | `401` |
| Token inválido | `401` |
| Acceso correcto | `200` |
| Recurso creado | `201` |
| Recurso inexistente | `404` |
| Sin permisos | `403` |
| Eliminación sin contenido | `204` |
| Error interno | `500` |

---

# 33. Algunas buenas prácticas

Este ejemplo es introductorio.

En una aplicación real también deberíamos considerar:

```text
HTTPS
Hash de contraseñas
Variables de entorno
Validación de datos
Control de roles
Rate limiting
Logs de seguridad
```

No se deberían almacenar contraseñas en texto plano.

Tampoco se debería escribir directamente:

```ts
const JWT_SECRET = "clave_secreta";
```

en una aplicación de producción.

Es preferible utilizar variables de entorno.

---

# 34. Ejercicio

Construya una API que utilice:

```text
Helmet
CORS
JWT
```

Implemente:

```text
POST /api/login
```

y proteja:

```text
GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

Pruebe utilizando `curl` los siguientes casos:

```text
1. Visualizar los headers agregados por Helmet
2. Probar un origen permitido con CORS
3. Probar otro origen
4. Login correcto
5. Login incorrecto
6. Acceso sin token
7. Acceso con token inválido
8. Acceso con token válido
9. Crear un producto
10. Actualizar un producto
11. Eliminar un producto
```

Para cada prueba registre:

```text
Método HTTP
URL
Headers
Body
Código de estado
Respuesta
```

---

# 35. Resumen

Una configuración básica de seguridad en Express puede representarse como:

```text
Express
   |
   +-- Helmet
   |      |
   |      +-- Headers HTTP de seguridad
   |
   +-- CORS
   |      |
   |      +-- Orígenes permitidos
   |
   +-- JWT
          |
          +-- Autenticación
          +-- Rutas protegidas
```

Y `curl` permite comprobar cada mecanismo directamente desde terminal.