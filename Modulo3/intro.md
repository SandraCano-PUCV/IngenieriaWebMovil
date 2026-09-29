# Introducción a Node.js con Express

## 1. ¿Qué es Node.js?
Node.js es un entorno de ejecución que permite utilizar JavaScript fuera del navegador.

Tradicionalmente, JavaScript se utilizaba principalmente en el frontend para agregar interactividad a las páginas web. Con Node.js es posible utilizar JavaScript también en el backend.

Esto permite desarrollar aplicaciones como:
- APIs REST.
- Servidores web.
- Sistemas de autenticación.
- Aplicaciones en tiempo real.
- Servicios backend.
- Microservicios.

Node.js utiliza el motor de JavaScript V8, desarrollado originalmente para Google Chrome.

---

## 2. Frontend y Backend

Una aplicación web puede dividirse, de manera general, en dos partes:

```text
Usuario
   |
   v
Frontend
HTML - CSS - JavaScript
   |
   | HTTP
   v
Backend
Node.js + Express
   |
   v
Base de Datos
```

El **frontend** corresponde a la interfaz con la que interactúa el usuario.

El **backend** procesa las solicitudes, aplica lógica de negocio, consulta datos y envía respuestas.

Por ejemplo:

```text
Frontend
   |
   | GET /api/users
   v
Backend
   |
   | consulta información
   v
JSON
```

---

# 3. ¿Qué es Express?

Express es un framework minimalista para Node.js que facilita la construcción de aplicaciones web y APIs.

Sin Express sería necesario implementar manualmente muchas tareas relacionadas con HTTP.

Express permite definir rutas de manera sencilla:

```ts
app.get("/users", (req, res) => {
  res.json({
    message: "Listado de usuarios"
  });
});
```

Express proporciona herramientas para trabajar con:

- Rutas.
- Métodos HTTP.
- JSON.
- Middleware.
- Parámetros.
- Solicitudes.
- Respuestas.
- APIs REST.

---

# 4. Crear un proyecto Node.js

Primero se crea una carpeta para el proyecto:

```bash
mkdir backend
cd backend
```

Luego se inicializa Node.js:

```bash
npm init -y
```

Esto crea el archivo:

```text
package.json
```

---

# 5. ¿Qué es package.json?

`package.json` contiene información y configuración del proyecto.

Por ejemplo:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "scripts": {},
  "dependencies": {}
}
```

También registra las dependencias instaladas.

---

# 6. Instalar Express

Para instalar Express:

```bash
npm install express
```

Si trabajamos con TypeScript:

```bash
npm install --save-dev typescript
npm install --save-dev @types/express
npm install --save-dev @types/node
```

Express queda registrado dentro de las dependencias del proyecto.

---

# 7. Node Modules

Cuando instalamos dependencias se crea la carpeta:

```text
node_modules/
```

Esta carpeta contiene las bibliotecas utilizadas por el proyecto.

Ejemplo:

```text
backend/
├── node_modules/
├── package.json
├── package-lock.json
└── src/
```

Normalmente `node_modules` no se comparte en un repositorio Git.

Las dependencias pueden recuperarse ejecutando:

```bash
npm install
```

---

# 8. Primera aplicación con Express

Archivo:

```text
src/app.ts
```

Contenido:

```ts
import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando con Express y TypeScript"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
```

---

# 9. ¿Qué hace cada instrucción?

## Importar Express

```ts
import express from "express";
```

Importa la biblioteca Express.

---

## Crear la aplicación

```ts
const app = express();
```

Crea una instancia de Express.

La variable `app` representa nuestro servidor.

---

## Crear una ruta

```ts
app.get("/", (req, res) => {
  res.json({
    message: "Hola"
  });
});
```

Esta ruta responde a una solicitud:

```text
GET /
```

---

## Iniciar el servidor

```ts
app.listen(3000, () => {
  console.log("Servidor iniciado");
});
```

Express comienza a escuchar solicitudes en el puerto `3000`.

Podemos acceder desde:

```text
http://localhost:3000
```

---

# 10. Request y Response

Cada ruta normalmente recibe dos objetos:

```ts
(req, res)
```

## req

`req` significa **request**.

Representa la solicitud realizada por el cliente.

Ejemplo:

```ts
req.body
req.params
req.query
```

---

## res

`res` significa **response**.

Representa la respuesta enviada al cliente.

Por ejemplo:

```ts
res.json({
  message: "Respuesta desde el servidor"
});
```

---

# 11. Trabajar con JSON

JSON significa:

```text
JavaScript Object Notation
```

Es un formato utilizado para intercambiar datos.

Ejemplo:

```json
{
  "id": 1,
  "nombre": "Ana",
  "email": "ana@correo.cl"
}
```

Express puede enviar JSON mediante:

```ts
res.json({
  id: 1,
  nombre: "Ana"
});
```

---

# 12. Recibir JSON

Para recibir datos JSON debemos agregar:

```ts
app.use(express.json());
```

Ejemplo completo:

```ts
import express from "express";

const app = express();

app.use(express.json());
```

Ahora Express puede interpretar un body como:

```json
{
  "nombre": "Ana",
  "email": "ana@correo.cl"
}
```

---

# 13. ¿Qué es una API?

Una API permite que diferentes aplicaciones se comuniquen entre sí.

Por ejemplo:

```text
Frontend React
      |
      | HTTP
      v
API Express
      |
      v
Base de Datos
```

Un frontend podría solicitar:

```text
GET /api/users
```

y el servidor responder:

```json
[
  {
    "id": 1,
    "nombre": "Ana"
  },
  {
    "id": 2,
    "nombre": "Luis"
  }
]
```

---

# 14. ¿Qué es REST?

REST es un estilo arquitectónico utilizado para diseñar servicios web.

En una API REST trabajamos principalmente con:

- Recursos.
- URLs.
- Métodos HTTP.
- Representaciones de datos.

Por ejemplo, podemos tener el recurso:

```text
users
```

Representado mediante:

```text
/api/users
```

---

# 15. Métodos HTTP principales

Los métodos más utilizados son:

| Método | Operación |
|---|---|
| GET | Obtener información |
| POST | Crear información |
| PUT | Actualizar información |
| DELETE | Eliminar información |

Por ejemplo:

```text
GET     /api/users
POST    /api/users
PUT     /api/users/1
DELETE  /api/users/1
```

---

# 16. Ejemplo de recurso users

Podemos crear inicialmente un arreglo:

```ts
let users = [
  {
    id: 1,
    nombre: "Ana",
    email: "ana@correo.cl"
  },
  {
    id: 2,
    nombre: "Luis",
    email: "luis@correo.cl"
  }
];
```

---

# 17. GET

GET permite obtener información.

```ts
app.get("/api/users", (req, res) => {
  res.json(users);
});
```

Solicitud:

```text
GET /api/users
```

Respuesta:

```json
[
  {
    "id": 1,
    "nombre": "Ana",
    "email": "ana@correo.cl"
  },
  {
    "id": 2,
    "nombre": "Luis",
    "email": "luis@correo.cl"
  }
]
```

---

# 18. POST

POST permite crear un nuevo recurso.

```ts
app.post("/api/users", (req, res) => {
  const nuevoUser = {
    id: users.length + 1,
    nombre: req.body.nombre,
    email: req.body.email
  };

  users.push(nuevoUser);

  res.status(201).json(nuevoUser);
});
```

Body:

```json
{
  "nombre": "Carlos",
  "email": "carlos@correo.cl"
}
```

---

# 19. Parámetros de ruta

Una ruta puede contener parámetros.

Ejemplo:

```text
/api/users/1
```

El número `1` identifica un recurso particular.

En Express:

```ts
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  res.json({
    id: id
  });
});
```

Aquí:

```ts
req.params.id
```

contiene el valor enviado en la URL.

---

# 20. PUT

PUT puede utilizarse para actualizar un recurso.

```ts
app.put("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  user.nombre = req.body.nombre;
  user.email = req.body.email;

  res.json(user);
});
```

---

# 21. DELETE

DELETE permite eliminar un recurso.

```ts
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  users.splice(index, 1);

  res.json({
    message: "Usuario eliminado"
  });
});
```

---

# 22. Códigos de estado HTTP

HTTP utiliza códigos para indicar el resultado de una solicitud.

Algunos ejemplos:

| Código | Significado |
|---|---|
| 200 | OK |
| 201 | Recurso creado |
| 400 | Solicitud incorrecta |
| 401 | No autorizado |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

Ejemplo:

```ts
res.status(201).json({
  message: "Usuario creado"
});
```

---

# 23. Express Router

Cuando una aplicación comienza a crecer, no es conveniente colocar todas las rutas en `app.ts`.

Express proporciona:

```ts
Router
```

que permite separar las rutas por recurso.

Podemos tener:

```text
src/
├── app.ts
└── routes/
    └── users.routes.ts
```

---

# 24. users.routes.ts

```ts
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Listado de usuarios"
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "Usuario creado"
  });
});

router.put("/:id", (req, res) => {
  res.json({
    message: `Usuario ${req.params.id} actualizado`
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    message: `Usuario ${req.params.id} eliminado`
  });
});

export default router;
```

---

# 25. Asociar el Router con la aplicación

En `app.ts`:

```ts
import express from "express";
import usersRoutes from "./routes/users.routes.js";

const app = express();

app.use(express.json());

app.use("/api/users", usersRoutes);

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});
```

La instrucción:

```ts
app.use("/api/users", usersRoutes);
```

establece el prefijo para las rutas del recurso `users`.

---

# 26. Resultado de las rutas

Dentro del router escribimos:

```ts
router.get("/");
```

pero la ruta final es:

```text
GET /api/users
```

También:

```ts
router.put("/:id");
```

se convierte en:

```text
PUT /api/users/:id
```

---

# 27. Ejemplo de inicio de sesión

El inicio de sesión normalmente utiliza POST porque enviamos credenciales al servidor.

```ts
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Credenciales incorrectas"
    });
  }

  res.json({
    message: "Inicio de sesión exitoso"
  });
});
```

La ruta sería:

```text
POST /api/users/login
```

Body:

```json
{
  "email": "ana@correo.cl",
  "password": "1234"
}
```

> Este ejemplo almacena la contraseña en texto plano únicamente con fines didácticos. En una aplicación real las contraseñas deben almacenarse utilizando mecanismos seguros de hashing.

---

# 28. Middleware

Un middleware es una función que se ejecuta durante el procesamiento de una solicitud.

Ejemplo:

```ts
app.use(express.json());
```

También podemos construir nuestros propios middleware:

```ts
app.use((req, res, next) => {
  console.log("Nueva solicitud:", req.method, req.url);

  next();
});
```

`next()` permite continuar con el procesamiento de la solicitud.

---

# 29. Flujo de una solicitud

Una solicitud puede seguir este flujo:

```text
Cliente
   |
   | HTTP Request
   v
Middleware
   |
   v
Router
   |
   v
Controlador
   |
   v
Datos
   |
   v
HTTP Response
   |
   v
Cliente
```

---

# 30. Estructura básica de un backend

Una aplicación pequeña podría organizarse así:

```text
backend/
├── package.json
├── tsconfig.json
└── src/
    ├── app.ts
    └── routes/
        └── users.routes.ts
```

En proyectos más grandes:

```text
src/
├── app.ts
├── routes/
├── controllers/
├── services/
├── models/
└── middleware/
```

Cada carpeta tiene una responsabilidad diferente.

---

# 31. Conceptos importantes

## Endpoint

Un endpoint corresponde a una combinación de:

```text
Método HTTP + URL
```

Ejemplo:

```text
GET /api/users
```

es un endpoint.

---

## Recurso

Es la entidad sobre la que trabaja la API.

Ejemplos:

```text
users
products
students
courses
books
```

---

## Ruta

Es la URL utilizada para acceder a un recurso.

Ejemplo:

```text
/api/users
```

---

## API REST

Una API REST organiza sus operaciones utilizando recursos y métodos HTTP.

Ejemplo:

```text
GET     /api/products
POST    /api/products
PUT     /api/products/10
DELETE  /api/products/10
```

---

# 32. Resumen

Node.js permite ejecutar JavaScript en el backend.

Express facilita la construcción de servidores y APIs.

Una API REST utiliza recursos y métodos HTTP para organizar las operaciones.

Por ejemplo:

```text
Recurso: users

GET     /api/users
POST    /api/users
PUT     /api/users/:id
DELETE  /api/users/:id
```

Express Router permite separar las rutas en diferentes archivos y mantener el proyecto organizado.

La comunicación entre frontend y backend normalmente utiliza HTTP y JSON.

---

# 33. Ejercicio propuesto

Crear una API REST para gestionar el recurso:

```text
products
```

Cada producto debe contener:

```text
id
nombre
precio
stock
```

Implementar:

```text
GET     /api/products
POST    /api/products
PUT     /api/products/:id
DELETE  /api/products/:id
```

Además, crear:

```text
GET /api/products/:id
```

para consultar un producto específico.

La estructura debe utilizar:

```text
src/
├── app.ts
└── routes/
    └── products.routes.ts
```

## Preguntas

1. ¿Qué diferencia existe entre Node.js y Express?
2. ¿Qué función cumple `express.json()`?
3. ¿Qué representa `req`?
4. ¿Qué representa `res`?
5. ¿Qué diferencia existe entre GET y POST?
6. ¿Qué representa `:id` en una ruta?
7. ¿Por qué es conveniente utilizar `Router`?
8. ¿Qué diferencia existe entre un recurso y un endpoint?
9. ¿Qué significa el código HTTP `404`?
10. ¿Qué formato se utiliza habitualmente para intercambiar datos entre frontend y backend?