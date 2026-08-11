# 1. Crear el proyecto
Inicializar un proyecto NPM:

```bash
npm init -y
```

El comando:

```bash
npm init -y
```

crea automáticamente el archivo:

```text
package.json
```
La estructura inicial será:

```text
login-web/
└── package.json
```
---
# 2. ¿Qué es NPM?

**NPM** significa:

> Node Package Manager

Es un administrador de paquetes utilizado en proyectos JavaScript y Node.js.

Nos permite:

- instalar bibliotecas;
- administrar dependencias;
- definir comandos para el proyecto;
- ejecutar herramientas de desarrollo.

---

# 3. Instalar `live-server`

Para ejecutar nuestro proyecto mediante un servidor web local instalaremos:

```bash
npm install --save-dev live-server
```
Después de instalarlo aparecerán:

```text
login-web/
│
├── node_modules/
├── package-lock.json
└── package.json
```

# 4. Dependencias de desarrollo

Dentro de `package.json` aparecerá una sección similar a:

```json
"devDependencies": {
  "live-server": "^1.2.2"
}
```

Las dependencias de desarrollo son herramientas necesarias para construir, probar o ejecutar la aplicación durante el desarrollo.

En este caso:

```text
live-server
```

nos permitirá levantar un servidor HTTP local.

---

# 5. Ejecutar el proyecto desde NPM

Ejecutar:

```bash
npm run dev
```

NPM buscará dentro de `package.json`:

```json
"dev": "live-server"
```

y ejecutará:

```text
live-server
```

El flujo es:

```text
npm run dev
      │
      ↓
package.json
      │
      ↓
scripts
      │
      ↓
live-server
      │
      ↓
Servidor HTTP local
      │
      ↓
Navegador
```

# 6. ¿Qué hace el atributo `id`?
Observe:

```html
<form id="loginForm">
```

El atributo:

```text
id
```

permite identificar un elemento de manera única dentro del documento HTML.

Por ejemplo:

```text
loginForm
correo
password
mensaje
```

JavaScript puede utilizar estos identificadores para localizar elementos dentro de la página.

---

# 7. Programación basada en eventos
Una página web no ejecuta necesariamente todas sus acciones de manera secuencial desde el inicio hasta el final.

Gran parte de su funcionamiento depende de **eventos**.

Un evento es algo que ocurre durante la interacción con una aplicación.

Por ejemplo:

```text
Usuario hace clic
Usuario escribe
Usuario presiona una tecla
Usuario selecciona una opción
Usuario envía un formulario
La página termina de cargar
```

La aplicación puede esperar a que ocurra uno de estos eventos y ejecutar una función como respuesta.

A esta forma de programación la llamamos:

# Programación basada en eventos

El flujo general es:

```text
Programa
   │
   ↓
Espera
   │
   ↓
Ocurre un evento
   │
   ↓
Se ejecuta una función
   │
   ↓
La aplicación responde
```

---
# 8. Ejemplo con el inicio de sesión

En nuestro ejemplo queremos que ocurra lo siguiente:

```text
Usuario completa formulario
          │
          ↓
Usuario presiona "Iniciar sesión"
          │
          ↓
Se produce el evento submit
          │
          ↓
JavaScript detecta el evento
          │
          ↓
Se ejecuta una función
          │
          ↓
Se leen correo y contraseña
          │
          ↓
Se muestra un mensaje
```

---

# 9. Obtener el formulario desde JavaScript

Abrir:

```text
app.js
```

y escribir:

```javascript
const formulario = document.getElementById("loginForm");
```

`document` representa el documento HTML cargado por el navegador.

El método:

```javascript
getElementById()
```

permite buscar un elemento utilizando su `id`.

Por lo tanto:

```javascript
document.getElementById("loginForm");
```

# 10. Escuchar un evento

Agregar:

```javascript
formulario.addEventListener("submit", function(evento) {

});
```
El evento `submit` ocurre cuando el usuario intenta enviar el formulario.

Para este ejemplo queremos controlar el proceso mediante JavaScript.

Por eso utilizamos:

```javascript
preventDefault()
```

# 11. Leer el datos de Entrada (Input)
Agregar:

```javascript
const correo = document.getElementById("correo").value;
const password = document.getElementById("pass").value;
```

# 12. Mostrar los datos en la consola

Agregar:

```javascript
console.log(correo);
console.log(password);

```

El archivo `app.js` quedará:

```javascript
const formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const correo = document.getElementById("correo").value;

    const password = document.getElementById("password").value;

    console.log(correo);
    console.log(password);

});

```
# 13. Mostrar un mensaje en la página

En lugar de trabajar solamente con la consola, podemos modificar un elemento del HTML.

Tenemos:

```html
<p id="mensaje"></p>
```

Desde JavaScript podemos obtenerlo:

```javascript
const mensaje = document.getElementById("mensaje");
```

Luego:

```javascript
mensaje.textContent = "Formulario recibido";
```
