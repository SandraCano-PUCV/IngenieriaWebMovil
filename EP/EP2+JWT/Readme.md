# 📱 Proyecto Full Stack: Ionic + Node.js/Express

Este proyecto incluye un **frontend en Ionic** y un **backend en Node.js con Express**. Ambos se comunican vía API REST.
# Ejemplo EP2 — Autenticación JWT con Ionic y Express

> **Asignatura:** Ingeniería Web y Móvil  
> **Entrega:** EP2 — Integración frontend, backend y autenticación  
> **Naturaleza:** ejemplo académico comentado; **no equivale a una entrega EP2 completa**.  
> **Fuente:** código proporcionado en `EP2+JWT.zip`.  
> **Para estudiantes:** usen esta estructura documental como referencia; adapten tecnologías, rutas, instrucciones y evidencia a su propio proyecto. No confundan funcionalidades presentes en el ejemplo con requisitos ya satisfechos.

## 1. Descripción y alcance

Este proyecto de demostración implementa registro de usuarios, autenticación mediante JWT y recuperación de un perfil protegido. El backend usa **Node.js, Express y MySQL**; el frontend de este ZIP está desarrollado con **Ionic + Angular**. **La asignatura exige Ionic + React**: por tanto, para utilizarlo en una entrega EP2 se debe migrar/adaptar el frontend a React o emplear un proyecto que ya cumpla esa condición.

### Funcionalidades verificadas mediante lectura del código

| Función | Ubicación | Estado en el ejemplo |
|---|---|---|
| Registro de usuarios | `POST /users` | Implementación presente; seguridad por mejorar |
| Inicio de sesión | `POST /users/auth` | Implementación presente; comparación insegura de contraseña |
| Emisión de JWT | `userController.login` | Presente; clave fija y contenido del token excesivo |
| Verificación de JWT | `verifyToken.js` | Presente; protege `/users/profile` |
| Consulta del perfil | `GET /users/profile` | Presente; devuelve datos del token |
| Listar usuarios | `GET /users` | Presente, pero sin protección y devuelve campos sensibles |
| Editar y eliminar recursos | — | No implementado en las rutas revisadas |
| Permisos por roles | — | No implementado |
| Hash bcrypt | — | No implementado |
| Pruebas Postman / Insomnia | — | No incluidas en el ZIP revisado |

**Nota:** “Presente” significa identificado en el código fuente, **no** que se haya ejecutado satisfactoriamente. Adjuntar capturas o una colección de pruebas para demostrar funcionamiento real.

## 2. Equipo, repositorio y trazabilidad

**Nombre del equipo:** [Completar]  
**Integrantes y contribuciones:** [Completar nombres y tareas concretas]  
**Repositorio público:** [URL]  
**Rama frontend:** [URL]  
**Rama backend:** [URL]  
**Figma:** [URL del prototipo público]

| Integrante | Responsabilidad | Evidencia de colaboración |
|---|---|---|
| [Nombre] | [Módulo] | [Commits o PR] |
| [Nombre] | [Módulo] | [Commits o PR] |

**Relación con EP1:** [Describir cuáles requerimientos funcionales originales se implementan y sus identificadores RF-01, RF-02, etc.]

## 3. Tecnologías

| Capa | Tecnología identificada en el ZIP |
|---|---|
| Frontend | Ionic 8 + Angular 19 + TypeScript (no React) |
| Backend | Node.js + Express 5 |
| Base de datos | MySQL, controlador `mysql2` |
| Autenticación | `jsonwebtoken` 9 |
| Comunicación | Angular `HttpClient`, HTTP y JSON |
| Configuración CORS | Paquete `cors` |

> **Adecuación obligatoria EP2:** el proyecto evaluable debe utilizar **Ionic con React** y debe cumplir el resto de los requisitos de autenticación, seguridad, roles y API CRUD.

## 4. Arquitectura y carpetas reales

```text
EP2+JWT/
├── Readme.md
├── Tienda.sql
├── backend/
│   ├── app.js
│   ├── config/db.js
│   ├── controllers/userController.js
│   ├── middlewares/verifyToken.js
│   ├── models/userModel.js
│   ├── routes/userRoute.js
│   └── package.json
└── frontend/
    ├── package.json
    └── src/app/
        ├── app-routing.module.ts
        ├── services/auth.service.ts
        ├── services/register.service.ts
        └── pages/
            ├── home/
            ├── register/
            └── perfil/
```

```text
Ionic + Angular (ejemplo actual)
      │  HttpClient / JSON / Bearer JWT
      ▼
Express :3000 → /users → userController → userModel → MySQL (Tienda)
                     │
                     └── verifyToken → GET /users/profile
```

## 5. Preparación y ejecución local del ejemplo

### Requisitos

- Node.js y npm compatibles con Angular 19 / Ionic 8 (preferir una versión LTS soportada por esas dependencias).
- MySQL o MariaDB en ejecución.
- Ionic CLI: `npm install -g @ionic/cli`.
- Copia local del proyecto y permiso para crear la base de datos.

### 5.1 Base de datos

El código del ejemplo utiliza `database: "Tienda"`, `host: "localhost"`, `user: "root"` y `password: ""` en `backend/config/db.js`. **Son valores del archivo aportado, no una configuración segura recomendada.**

```bash
mysql -u root -p < Tienda.sql
```

Después, comprobar la existencia de la base de datos `Tienda` y ajustar la conexión para un usuario de MySQL con permisos mínimos. **Antes de publicar el proyecto**, sustituir credenciales embebidas por variables de entorno (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`), y proporcionar un `.env.example` sin secretos. La implementación actual aún no lee estas variables: ese cambio requiere modificar `db.js`.

> El archivo SQL entregado contiene datos y estructura heredados. Es necesario verificar su integridad relacional frente al requisito EP 2.2; importarlo no demuestra automáticamente que el modelo sea correcto.

### 5.2 Iniciar backend

Desde la raíz de este ejemplo:

```bash
cd backend
npm install
node app.js
```

El archivo `backend/app.js` establece el puerto **3000**. La ruta de inicio real es `app.js`, **no `index.js`**. La API queda disponible, si inicia correctamente, en `http://localhost:3000`.

### 5.3 Iniciar frontend del ejemplo (Angular)

En otra terminal, desde la raíz:

```bash
cd frontend
npm install
ionic serve
```

El cliente se conecta a `http://localhost:3000`, según los archivos `auth.service.ts` y `register.service.ts`. Para evaluación EP2, reemplazar este frontend por una implementación **Ionic + React** y documentar sus comandos reales.

### 5.4 Problemas frecuentes
| Síntoma | Qué revisar |
|---|---|
| Error de conexión MySQL | Servicio, usuario, contraseña, base `Tienda` y puerto |
| `ECONNREFUSED` en frontend | Backend activo en puerto 3000 y URL correcta |
| `401 Token no proporcionado` | Cabecera `Authorization: Bearer <token>` |
| `403 Token inválido o expirado` | Token inválido, firma o expiración |
| Errores CORS | Configurar orígenes permitidos para frontend en desarrollo |

## 6. Documentación de la API existente

**URL base:** `http://localhost:3000`  
**Prefijo:** `/users`  
**Tipo de contenido:** `application/json`

| Método | Ruta | Objetivo | Token requerido | Estado actual |
|---|---|---|---|---|
| GET | `/users` | Listar usuarios | No | Presente, inseguro: revisar autorización y salida |
| POST | `/users` | Registrar usuario | No | Presente, validación insuficiente |
| POST | `/users/auth` | Iniciar sesión | No | Presente, contraseñas sin hash |
| GET | `/users/profile` | Recuperar perfil | Sí | Protegida por JWT |

### 6.1 `POST /users` — Registro

Ejemplo de solicitud **según campos consumidos por el controlador**:

```http
POST /users HTTP/1.1
Content-Type: application/json
```

```json
{
  "username": "estudiante_demo",
  "rut": "",
  "email": "estudiante@example.com",
  "region": "Valparaíso",
  "comuna": "Viña del Mar",
  "password": "[contraseña-de-prueba]"
}
```

**Respuesta esperada en caso de inserción:** HTTP `201` y JSON con `message`, `userId` y los campos del usuario. **Defecto crítico:** la implementación actual incluye la contraseña en la respuesta y la persiste sin bcrypt. Debe corregirse; nunca hacer eco de `password` ni almacenarla en texto plano.

### 6.2 `POST /users/auth` — Inicio de sesión

```json
{
  "username": "estudiante_demo",
  "password": "[contraseña-de-prueba]"
}
```

Respuesta de éxito (forma simplificada):

```json
{
  "message": "Hola estudiante_demo",
  "token": "<JWT_GENERADO>"
}
```

**Estados reconocidos en el código:** `400` para campos obligatorios ausentes; `401` para usuario no encontrado o contraseña incorrecta; `500` en errores de base de datos.

### 6.3 `GET /users/profile` — Perfil protegido

```http
GET /users/profile HTTP/1.1
Authorization: Bearer <JWT_GENERADO>
```

Respuesta esperada (estructura observada):

```json
{
  "message": "Perfil del usuario",
  "user": { "<claims-del-token>": "<valores>" }
}
```

Actualmente el controlador firma `jwt.sign(user, ...)` con el registro de MySQL completo; esto **puede incluir información sensible y el campo de contraseña en el token**. En el diseño corregido firmar solo claims mínimos, por ejemplo `sub` y `role`, y consultar por separado los datos autorizados del perfil.

**Respuestas de error del middleware:** `401` si falta el token y `403` si es inválido o expiró (implementación observada). El equipo debe documentar y verificar estos casos con herramientas de pruebas.

## 7. Seguridad y JWT: estado y correcciones necesarias

| Control EP2 | En este ejemplo | Cambio necesario |
|---|---|---|
| JWT con expiración | Sí, `expiresIn: '1h'` | Mantener, firmar claims mínimos |
| Rutas protegidas en backend | Solo `/users/profile` | Proteger recursos según permisos |
| Roles diferenciados | No | Modelo de roles, middleware y pruebas de autorización |
| bcrypt | No | `bcrypt.hash` en registro y `bcrypt.compare` en login |
| Secretos en variables de entorno | No | Mover `JWT_SECRET` y credenciales MySQL a `.env` (no versionarlo) |
| Validación de entradas | Parcial | Validación estructurada de todos los campos |
| Prevención de SQL injection | Consultas con parámetros para búsqueda | Revisar todas las consultas y evitar SQL construido por concatenación |
| Minimización de datos | No | No devolver contraseñas en endpoints ni JWT |
| Protección de rutas frontend | No se identifica guard en el enrutador | Implementar guardias en Ionic React y gestionar expiración |
| Manejo de errores | Parcial | Mensajes seguros y códigos HTTP coherentes |

> **Advertencia docente:** el ejemplo contiene una clave JWT fija y contraseñas sin hash. No desplegarlo con datos reales ni copiar esos patrones a una entrega. El README describe estas deficiencias para enseñar a identificarlas y solucionarlas, no para validarlas.

## 8. Integración frontend–backend

**Implementación identificada en el ZIP:** `register.service.ts` realiza `POST /users`; `auth.service.ts` realiza `POST /users/auth`, guarda JWT en `localStorage` y lo envía en `GET /users/profile` mediante cabecera `Authorization`. Esto muestra un flujo de consumo de API, pero **se implementó con Angular** y no incorpora una estrategia robusta de expiración/interceptores.

**Lo que cada equipo debe demostrar en Ionic React:** servicios `fetch`/Axios para las rutas principales, gestión de errores, envío controlado del JWT, protección de rutas según rol, cierre de sesión y flujos conectados a datos reales. Adjuntar capturas y enlaces al código correspondiente.

## 9. Pruebas funcionales y evidencia EP2

En el ZIP revisado **no se encontró una colección Postman/Insomnia**. Añadir una colección exportada y evidencias de los casos siguientes:

| ID | Petición / escenario | HTTP esperado* | Evidencia |
|---|---|---|---|
| P01 | Registrar usuario válido | 201 | [Captura / colección] |
| P02 | Registrar nombre repetido | 409 | [Captura / colección] |
| P03 | Iniciar sesión válida | 200 | [Captura / colección] |
| P04 | Login sin credenciales | 400 | [Captura / colección] |
| P05 | Login con contraseña incorrecta | 401 | [Captura / colección] |
| P06 | Perfil sin token | 401 | [Captura / colección] |
| P07 | Perfil con token inválido | 403 | [Captura / colección] |
| P08 | Perfil con token válido | 200 | [Captura / colección] |
| P09 | CRUD GET, POST, PUT/PATCH, DELETE | Por implementar | [Captura / colección] |
| P10 | Acceso de rol no autorizado | Por implementar | [Captura / colección] |

\* Los códigos indicados para P01–P08 corresponden a las ramas relevantes encontradas en el controlador o middleware, **no son resultados de pruebas ejecutadas**. Un estudiante debe añadir tanto casos exitosos como fallidos y enlazar archivos de evidencia del repositorio.

## 10. Modelo relacional

**Archivo del ejemplo:** `Tienda.sql` en la raíz. Incluye las tablas `usuarios`, `Comunas`, `provincias` y `Regiones`. **No contiene un sistema de roles listo para usar ni un modelo relacional completo y consistente con las exigencias de integridad EP2**. Documentar claves primarias y foráneas, restricciones, relaciones e instrucciones reproducibles para crear la base de datos.

![Modelo entidad-relación — insertar diagrama propio](docs/modelo-relacional.png)

> Antes de entregar, crear el archivo real `docs/modelo-relacional.png` o sustituir el enlace por la ruta correcta. En el ejemplo ZIP revisado no se incluyó dicho diagrama.

## 11. Matriz de cumplimiento EP2 (orientación para estudiantes)

| Criterio | Evidencia exigida | Estado del ejemplo |
|---|---|---|
| EP 2.1 Servidor (10 pts) | Ejecutable, módulos, instalación | Código Express presente; no ejecutado aquí |
| EP 2.2 Base relacional (15 pts) | Modelo consistente, FK, SQL reproducible, conexión | SQL y conexión presentes; integridad pendiente de revisión |
| EP 2.3 API REST (20 pts) | GET, POST, PUT/PATCH y DELETE; JSON y HTTP | Parcial; falta PUT/PATCH y DELETE |
| EP 2.4 JWT y roles (15 pts) | Registro, login, expiración, rutas y roles | JWT parcial, roles ausentes |
| EP 2.5 Seguridad (15 pts) | bcrypt, validación, secretos, SQL parametrizado | Insuficiente para entrega segura |
| EP 2.6 Ionic React + backend (10 pts) | Consumo real mediante React, JWT y errores | Ejemplo Angular; debe adaptarse |
| EP 2.7 Pruebas (10 pts) | Postman/Insomnia y errores | Falta evidencia exportada |
| Documentación (5 pts) | README, ramas, integrantes, commits | Debe completarse con datos reales |

**La tabla no asigna una calificación:** solo relaciona el contenido observado con los criterios que deben demostrarse funcionalmente.

## 12. Lista de verificación antes de entrega

- [ ] Repositorio público, ramas y commits verificables.
- [ ] Nombres del equipo, responsabilidades y enlaces completos.
- [ ] Frontend realizado en **Ionic + React** (no Angular).
- [ ] Backend arranca siguiendo los comandos del README.
- [ ] Base de datos relacional se crea desde `.sql` y se conecta al backend.
- [ ] GET, POST, PUT/PATCH y DELETE implementados para recursos pertinentes.
- [ ] Registro, login, JWT con expiración y rutas protegidas.
- [ ] Al menos dos roles con autorización diferenciada.
- [ ] Contraseñas con bcrypt, consultas parametrizadas y secretos fuera de GitHub.
- [ ] Frontend consume datos reales y maneja errores/tokens.
- [ ] Colección Postman/Insomnia, respuestas y pruebas de error.
- [ ] Capturas, diagramas y enlaces de Markdown son reales y funcionan.
- [ ] Trazabilidad de requerimientos EP1 → funcionalidades implementadas en EP2.

## 13. Referencias y observación académica

- [Ionic Framework](https://ionicframework.com/docs)
- [Express](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [Postman](https://learning.postman.com/docs/)

**Indicaciones a estudiantes:** este README ilustra cómo documentar un proyecto con evidencia, registrar problemas y declarar el estado real de avance. No copien los datos de ejemplo, los endpoints o las afirmaciones de implementación si su proyecto es diferente. Las observaciones técnicas son el resultado de una **revisión estática del ZIP**, no de una validación de ejecución.
