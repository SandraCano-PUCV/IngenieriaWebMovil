# Códigos de Estado HTTP con Express

## 1. ¿Qué son los códigos de estado HTTP?

Cuando un cliente realiza una solicitud a un servidor, el servidor responde utilizando un **código de estado HTTP**.

Estos códigos permiten indicar si la operación:

- Se realizó correctamente.
- Creó un recurso.
- Contiene un error en la solicitud.
- No encontró el recurso.
- No está autorizada.
- Produjo un error interno en el servidor.

Por ejemplo:

```text
Cliente
   |
   | GET /api/users/1
   v
Servidor
   |
   | 200 OK
   v
Respuesta JSON
```

---

# 2. Códigos más utilizados

| Código | Nombre | Significado |
|---|---|---|
| `200` | OK | La solicitud fue procesada correctamente |
| `201` | Created | Se creó un nuevo recurso |
| `204` | No Content | Operación exitosa sin contenido de respuesta |
| `400` | Bad Request | La solicitud contiene datos incorrectos |
| `401` | Unauthorized | Se requiere autenticación o las credenciales son incorrectas |
| `403` | Forbidden | El usuario está autenticado, pero no tiene permiso |
| `404` | Not Found | El recurso no existe |
| `409` | Conflict | Existe un conflicto con el estado actual del recurso |
| `500` | Internal Server Error | Ocurrió un error inesperado en el servidor |

---

# 3. Enviar un código de estado con Express

Express permite utilizar:

```ts
res.status(codigo)
```

Por ejemplo:

```ts
res.status(200).json({
  message: "Operación exitosa"
});
```

También podemos encadenar `status()` con `json()`:

```ts
res.status(404).json({
  message: "Usuario no encontrado"
});
```

---

# 4. Ejemplo base

Supongamos que tenemos el recurso `users`.

```ts
import { Router } from "express";

const router = Router();

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

# 5. Código 200 — OK

El código `200` indica que la solicitud fue procesada correctamente.

Ejemplo:

```ts
router.get("/", (req, res) => {
  res.status(200).json(users);
});
```

Solicitud:

```text
GET /api/users
```

Respuesta:

```text
200 OK
```

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

# 6. Código 201 — Created

El código `201` se utiliza cuando se crea correctamente un nuevo recurso.

```ts
router.post("/", (req, res) => {
  const nuevoUser = {
    id: users.length + 1,
    nombre: req.body.nombre,
    email: req.body.email
  };

  users.push(nuevoUser);

  res.status(201).json(nuevoUser);
});
```

Solicitud:

```text
POST /api/users
```

Body:

```json
{
  "nombre": "Carlos",
  "email": "carlos@correo.cl"
}
```

Respuesta:

```text
201 Created
```

```json
{
  "id": 3,
  "nombre": "Carlos",
  "email": "carlos@correo.cl"
}
```

---

# 7. Código 400 — Bad Request

El código `400` indica que la solicitud contiene información incorrecta o incompleta.

Por ejemplo, si falta el nombre:

```ts
router.post("/", (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({
      message: "Nombre y email son obligatorios"
    });
  }

  const nuevoUser = {
    id: users.length + 1,
    nombre,
    email
  };

  users.push(nuevoUser);

  res.status(201).json(nuevoUser);
});
```

Solicitud incorrecta:

```json
{
  "email": "carlos@correo.cl"
}
```

Respuesta:

```text
400 Bad Request
```

```json
{
  "message": "Nombre y email son obligatorios"
}
```

---

# 8. Código 404 — Not Found

El código `404` indica que el recurso solicitado no existe.

```ts
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  res.status(200).json(user);
});
```

Solicitud:

```text
GET /api/users/20
```

Si el usuario `20` no existe:

```text
404 Not Found
```

```json
{
  "message": "Usuario no encontrado"
}
```

---

# 9. Código 401 — Unauthorized

El código `401` se utiliza cuando la autenticación no es válida.

Ejemplo de inicio de sesión:

```ts
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email
  );

  if (!user || password !== "1234") {
    return res.status(401).json({
      message: "Credenciales incorrectas"
    });
  }

  res.status(200).json({
    message: "Inicio de sesión exitoso"
  });
});
```

Si las credenciales son incorrectas:

```text
401 Unauthorized
```

```json
{
  "message": "Credenciales incorrectas"
}
```

---

# 10. Diferencia entre 401 y 403

Estos dos códigos suelen confundirse.

## 401 Unauthorized

Significa que el usuario no está autenticado correctamente.

Ejemplo:

```text
Credenciales incorrectas
Token inexistente
Token inválido
```

## 403 Forbidden

Significa que el usuario sí está autenticado, pero no tiene permisos suficientes.

Ejemplo:

```ts
router.delete("/:id", (req, res) => {
  const rol = "student";

  if (rol !== "admin") {
    return res.status(403).json({
      message: "No tiene permisos para eliminar usuarios"
    });
  }

  res.status(200).json({
    message: "Usuario eliminado"
  });
});
```

Respuesta:

```text
403 Forbidden
```

---

# 11. Código 409 — Conflict

`409` indica que la operación entra en conflicto con el estado actual de los datos.

Por ejemplo, intentar registrar un email que ya existe.

```ts
router.post("/", (req, res) => {
  const { nombre, email } = req.body;

  const existe = users.find(u => u.email === email);

  if (existe) {
    return res.status(409).json({
      message: "El email ya está registrado"
    });
  }

  const nuevoUser = {
    id: users.length + 1,
    nombre,
    email
  };

  users.push(nuevoUser);

  res.status(201).json(nuevoUser);
});
```

Respuesta:

```text
409 Conflict
```

---

# 12. PUT y códigos de estado

Para actualizar un recurso:

```ts
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  if (!req.body.nombre || !req.body.email) {
    return res.status(400).json({
      message: "Nombre y email son obligatorios"
    });
  }

  user.nombre = req.body.nombre;
  user.email = req.body.email;

  res.status(200).json(user);
});
```

Aquí aparecen tres posibles respuestas:

```text
200 -> actualización correcta
400 -> datos incorrectos
404 -> usuario inexistente
```

---

# 13. DELETE con código 204

Si eliminamos correctamente un recurso, podemos responder:

```ts
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  users.splice(index, 1);

  res.status(204).send();
});
```

El código:

```text
204 No Content
```

significa que la operación fue exitosa, pero no se envía contenido en el body.

Por eso se utiliza:

```ts
res.status(204).send();
```

y no:

```ts
res.status(204).json({
  message: "Usuario eliminado"
});
```

---

# 14. DELETE con código 200

También es válido devolver información sobre la eliminación.

```ts
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  users.splice(index, 1);

  res.status(200).json({
    message: "Usuario eliminado correctamente"
  });
});
```

En este caso se utiliza `200` porque sí estamos enviando una respuesta.

---

# 15. Código 500 — Internal Server Error

El código `500` representa un error inesperado en el servidor.

Ejemplo:

```ts
router.get("/", (req, res) => {
  try {

    // Código que podría producir un error

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: "Error interno del servidor"
    });

  }
});
```

Es importante distinguir entre:

```text
400 -> error relacionado con la solicitud del cliente
500 -> error inesperado en el servidor
```

---

# 16. Ejemplo completo

```ts
import { Router } from "express";

const router = Router();

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

// GET
router.get("/", (req, res) => {
  res.status(200).json(users);
});

// GET por ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  res.status(200).json(user);
});

// POST
router.post("/", (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({
      message: "Nombre y email son obligatorios"
    });
  }

  const existe = users.find(u => u.email === email);

  if (existe) {
    return res.status(409).json({
      message: "El email ya existe"
    });
  }

  const nuevoUser = {
    id: users.length + 1,
    nombre,
    email
  };

  users.push(nuevoUser);

  res.status(201).json(nuevoUser);
});

// PUT
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  user.nombre = req.body.nombre;
  user.email = req.body.email;

  res.status(200).json(user);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Usuario no encontrado"
    });
  }

  users.splice(index, 1);

  res.status(204).send();
});

export default router;
```

---

# 17. Relación entre método y código de estado

Una combinación frecuente es:

| Operación | Método | Resultado correcto |
|---|---|---|
| Consultar lista | GET | `200` |
| Consultar elemento | GET | `200` |
| Crear | POST | `201` |
| Actualizar | PUT | `200` |
| Eliminar | DELETE | `200` o `204` |
| Recurso inexistente | cualquiera | `404` |
| Datos incorrectos | POST / PUT | `400` |
| Credenciales incorrectas | POST login | `401` |
| Sin permisos | cualquiera | `403` |
| Recurso duplicado | POST | `409` |
| Error inesperado | cualquiera | `500` |

---

# 18. Idea clave

No basta con enviar solamente un JSON.

Por ejemplo:

```ts
res.json({
  message: "Usuario no encontrado"
});
```

Express enviará normalmente:

```text
200 OK
```

aunque el mensaje diga que ocurrió un error.

Por eso es preferible indicar explícitamente:

```ts
res.status(404).json({
  message: "Usuario no encontrado"
});
```

Así el código de estado y el contenido de la respuesta son coherentes.

---

# 19. Ejercicio

Implemente una API para el recurso:

```text
/api/products
```

Cada producto debe contener:

```text
id
nombre
precio
stock
```

Implemente:

```text
GET     /api/products
GET     /api/products/:id
POST    /api/products
PUT     /api/products/:id
DELETE  /api/products/:id
```

Utilice correctamente al menos los siguientes códigos:

```text
200
201
204
400
404
409
500
```

## Casos que debe considerar

1. Consultar todos los productos.
2. Consultar un producto existente.
3. Consultar un producto inexistente.
4. Crear un producto correctamente.
5. Intentar crear un producto sin nombre.
6. Intentar crear un producto duplicado.
7. Actualizar un producto existente.
8. Actualizar un producto inexistente.
9. Eliminar un producto existente.
10. Eliminar un producto inexistente.