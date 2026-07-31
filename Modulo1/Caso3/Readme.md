# Persistencia de datos y `localStorage`

## 1. ¿Qué es la persistencia de datos?

La **persistencia de datos** es la capacidad de una aplicación para conservar información después de una acción, una recarga o el cierre del programa.

Sin persistencia, los datos se mantienen solamente en la memoria mientras la página está abierta.

```javascript
let actividades = [
  "Preparar materiales",
  "Revisar sensores"
];
```

Si se recarga la página, el arreglo vuelve a su estado inicial y los cambios realizados por el usuario se pierden.

Con persistencia, la aplicación puede recuperar posteriormente la información guardada.

---

## 2. Formas de persistencia en aplicaciones web

Los datos pueden guardarse en el navegador o en un servidor.

### En el navegador

- `localStorage`;
- `sessionStorage`;
- cookies;
- IndexedDB.

### En un servidor

- bases de datos;
- archivos;
- servicios en la nube;
- API conectadas a un backend.

`localStorage` es apropiado para ejercicios y datos pequeños que no sean sensibles. No reemplaza una base de datos.

---

## 3. ¿Qué es `localStorage`?

`localStorage` es una funcionalidad del navegador que permite almacenar información mediante pares de **clave y valor**.

```javascript
localStorage.setItem("nombre", "Ana");
```

En este ejemplo:

- `"nombre"` es la clave;
- `"Ana"` es el valor.

Los datos permanecen disponibles aunque se recargue la página o se cierre el navegador, hasta que sean eliminados por la aplicación o por el usuario.

---

## 4. Características principales

- Los datos se almacenan en el navegador.
- Cada dato se identifica mediante una clave.
- Los valores se guardan como texto.
- La información permanece entre sesiones.
- Los datos están separados según el origen del sitio.
- Su capacidad es limitada.
- No es adecuado para información sensible.
- Sus operaciones son síncronas.

---

## 5. Métodos de `localStorage`

### Guardar o actualizar

```javascript
localStorage.setItem("tema", "oscuro");
```

Si la clave ya existe, su valor se reemplaza.

### Recuperar

```javascript
const tema = localStorage.getItem("tema");
```

Si la clave no existe, devuelve `null`.

```javascript
if (tema === null) {
  console.log("No existe un tema guardado");
}
```

### Eliminar una clave

```javascript
localStorage.removeItem("tema");
```

### Eliminar todos los datos del sitio

```javascript
localStorage.clear();
```

`clear()` debe utilizarse con cuidado, ya que elimina todas las claves almacenadas por el mismo origen.

### Cantidad de claves

```javascript
console.log(localStorage.length);
```

---

## 6. `localStorage` almacena texto

Aunque se guarde un número, al recuperarlo se obtiene una cadena.

```javascript
localStorage.setItem("edad", 20);

const edad = localStorage.getItem("edad");

console.log(typeof edad);
```

El resultado será:

```text
string
```

Para convertirlo nuevamente:

```javascript
const edad = Number(
  localStorage.getItem("edad")
);
```

---

## 7. Guardar objetos y arreglos

Un objeto no debe almacenarse directamente.

```javascript
const usuario = {
  nombre: "Ana",
  rol: "Estudiante"
};
```

Para guardarlo se utiliza `JSON.stringify()`:

```javascript
localStorage.setItem(
  "usuario",
  JSON.stringify(usuario)
);
```

Para recuperarlo se utiliza `JSON.parse()`:

```javascript
const texto = localStorage.getItem("usuario");

const usuario = JSON.parse(texto);

console.log(usuario.nombre);
```

### Arreglo de actividades

```javascript
const actividades = [
  "Preparar materiales",
  "Revisar sensores",
  "Programar el robot"
];

localStorage.setItem(
  "aulabotActividades",
  JSON.stringify(actividades)
);
```

Recuperación:

```javascript
const datos = localStorage.getItem(
  "aulabotActividades"
);

const actividades = datos
  ? JSON.parse(datos)
  : [];
```

---

## 8. Flujo de persistencia

```text
El usuario agrega una actividad
              ↓
JavaScript modifica el arreglo
              ↓
JSON.stringify()
              ↓
localStorage.setItem()
              ↓
Se recarga la página
              ↓
localStorage.getItem()
              ↓
JSON.parse()
              ↓
Se reconstruye la lista
```

---

## 9. Ejemplo aplicado a la lista AulaBot

Cada actividad se representará mediante un objeto:

```javascript
const actividad = {
  id: crypto.randomUUID(),
  nombre: "Preparar materiales"
};
```

La lista será un arreglo de objetos:

```javascript
let actividades = [
  {
    id: "actividad-1",
    nombre: "Preparar materiales"
  }
];
```

Se define una clave única:

```javascript
const CLAVE_STORAGE = "aulabotActividades";
```

---

## 10. Cargar datos desde `localStorage`

```javascript
function cargarActividades() {
  const datos = localStorage.getItem(
    CLAVE_STORAGE
  );

  if (!datos) {
    return [];
  }

  try {
    const resultado = JSON.parse(datos);

    return Array.isArray(resultado)
      ? resultado
      : [];
  } catch (error) {
    console.error(
      "No fue posible cargar las actividades:",
      error
    );

    return [];
  }
}
```

`try...catch` evita que la aplicación se detenga si el dato almacenado contiene JSON inválido.

---

## 11. Guardar la lista

```javascript
function guardarActividades() {
  localStorage.setItem(
    CLAVE_STORAGE,
    JSON.stringify(actividades)
  );
}
```

Esta función debe ejecutarse después de:

- agregar;
- modificar;
- eliminar;
- vaciar la lista.

---

## 12. Script completo con persistencia

```javascript
"use strict";

const CLAVE_STORAGE = "aulabotActividades";

const formulario = document.querySelector(
  "#formActividad"
);

const campoActividad = document.querySelector(
  "#actividad"
);

const lista = document.querySelector(
  "#listaActividades"
);

const listaVacia = document.querySelector(
  "#listaVacia"
);

const contador = document.querySelector(
  "#contador"
);

const mensaje = document.querySelector(
  "#mensajeFormulario"
);

const botonVaciar = document.querySelector(
  "#botonVaciar"
);

let actividades = cargarActividades();

function cargarActividades() {
  const datos = localStorage.getItem(
    CLAVE_STORAGE
  );

  if (!datos) {
    return [];
  }

  try {
    const resultado = JSON.parse(datos);

    return Array.isArray(resultado)
      ? resultado
      : [];
  } catch (error) {
    console.error(
      "Error al cargar actividades:",
      error
    );

    return [];
  }
}

function guardarActividades() {
  localStorage.setItem(
    CLAVE_STORAGE,
    JSON.stringify(actividades)
  );
}

function mostrarMensaje(texto, tipo = "") {
  mensaje.textContent = texto;
  mensaje.className = "mensaje";

  if (tipo) {
    mensaje.classList.add(
      `mensaje--${tipo}`
    );
  }
}

function crearElementoLista(actividad) {
  const elemento = document.createElement("li");

  elemento.classList.add("lista__elemento");
  elemento.dataset.id = actividad.id;

  const contenido = document.createElement("span");

  contenido.classList.add("lista__texto");
  contenido.textContent = actividad.nombre;

  const botonEliminar =
    document.createElement("button");

  botonEliminar.type = "button";
  botonEliminar.classList.add(
    "boton-eliminar"
  );

  botonEliminar.textContent = "Eliminar";
  botonEliminar.dataset.accion = "eliminar";

  botonEliminar.setAttribute(
    "aria-label",
    `Eliminar actividad: ${actividad.nombre}`
  );

  elemento.append(
    contenido,
    botonEliminar
  );

  return elemento;
}

function actualizarEstadoLista() {
  const cantidad = actividades.length;

  listaVacia.hidden = cantidad > 0;
  botonVaciar.disabled = cantidad === 0;

  contador.textContent =
    cantidad === 1
      ? "1 actividad"
      : `${cantidad} actividades`;
}

function renderizarActividades() {
  lista.replaceChildren();

  actividades.forEach(actividad => {
    const elemento =
      crearElementoLista(actividad);

    lista.append(elemento);
  });

  actualizarEstadoLista();
}

formulario.addEventListener(
  "submit",
  evento => {
    evento.preventDefault();

    const nombre =
      campoActividad.value.trim();

    if (nombre.length < 3) {
      mostrarMensaje(
        "Ingrese al menos 3 caracteres.",
        "error"
      );

      campoActividad.focus();
      return;
    }

    const nuevaActividad = {
      id: crypto.randomUUID(),
      nombre
    };

    actividades.push(nuevaActividad);

    guardarActividades();
    renderizarActividades();

    mostrarMensaje(
      `Se agregó la actividad: ${nombre}.`,
      "exito"
    );

    formulario.reset();
    campoActividad.focus();
  }
);

lista.addEventListener(
  "click",
  evento => {
    const boton = evento.target.closest(
      '[data-accion="eliminar"]'
    );

    if (!boton) {
      return;
    }

    const elemento = boton.closest(
      ".lista__elemento"
    );

    const id = elemento.dataset.id;

    actividades = actividades.filter(
      actividad => actividad.id !== id
    );

    guardarActividades();
    renderizarActividades();

    mostrarMensaje(
      "La actividad fue eliminada.",
      "exito"
    );
  }
);

botonVaciar.addEventListener(
  "click",
  () => {
    actividades = [];

    localStorage.removeItem(
      CLAVE_STORAGE
    );

    renderizarActividades();

    mostrarMensaje(
      "Se eliminaron todas las actividades.",
      "exito"
    );

    campoActividad.focus();
  }
);

renderizarActividades();
```

La llamada final:

```javascript
renderizarActividades();
```

permite mostrar automáticamente las actividades almacenadas cuando se carga la página.

---

## 13. `localStorage` y `sessionStorage`

| Característica | `localStorage` | `sessionStorage` |
|---|---|---|
| Persiste al recargar | Sí | Sí |
| Persiste al cerrar la pestaña | Sí | Normalmente no |
| Almacena texto | Sí | Sí |
| Se separa por origen | Sí | Sí |
| Uso típico | Preferencias y datos locales | Estado temporal de una pestaña |

Ejemplo de `sessionStorage`:

```javascript
sessionStorage.setItem(
  "usuarioActivo",
  "Ana"
);
```

---

## 14. ¿Cuándo usar `localStorage`?

Puede utilizarse para:

- tema claro u oscuro;
- idioma;
- filtros;
- listas pequeñas;
- borradores no sensibles;
- preferencias de interfaz;
- progreso de una actividad educativa.

---

## 15. ¿Cuándo no usarlo?

No debe emplearse para almacenar:

- contraseñas;
- información bancaria;
- datos médicos;
- datos personales sensibles;
- archivos grandes;
- información que deba compartirse entre dispositivos;
- datos que necesiten control centralizado.

`localStorage` puede ser leído por JavaScript ejecutado en el mismo sitio. No es un lugar seguro para secretos.

---

## 16. Limitaciones

### Capacidad limitada

No está diseñado para almacenar grandes cantidades de información.

### Almacenamiento local

Los datos pertenecen al navegador y al dispositivo donde fueron creados.

### El usuario puede eliminarlos

Los datos pueden desaparecer si el usuario limpia la información del sitio.

### No reemplaza un backend

No permite:

- autenticar usuarios de forma segura;
- compartir datos entre dispositivos;
- administrar información centralizada;
- controlar permisos;
- realizar copias de seguridad reales.

### Operaciones síncronas

Las operaciones bloquean temporalmente el hilo principal. Para datos pequeños suele ser aceptable, pero no para grandes volúmenes.

---

## 17. Inspeccionar los datos

En las herramientas de desarrollador del navegador:

1. Abrir la página.
2. Abrir las herramientas de desarrollo.
3. Seleccionar **Application**, **Aplicación** o **Storage**.
4. Buscar **Local Storage**.
5. Seleccionar el origen.
6. Revisar claves y valores.

También puede consultarse desde la consola:

```javascript
console.log(
  localStorage.getItem(
    "aulabotActividades"
  )
);
```

---

## 18. Eliminar datos de prueba

Eliminar solamente la lista:

```javascript
localStorage.removeItem(
  "aulabotActividades"
);
```

Eliminar todas las claves del sitio:

```javascript
localStorage.clear();
```

Recargar la página:

```javascript
location.reload();
```

---

## 19. Buenas prácticas

1. Usar nombres de claves descriptivos.
2. Definir las claves como constantes.
3. Convertir objetos con `JSON.stringify()`.
4. Recuperarlos con `JSON.parse()`.
5. Manejar errores mediante `try...catch`.
6. Verificar el tipo de dato recuperado.
7. Guardar después de cada cambio.
8. No almacenar información sensible.
9. Mantener pocos datos.
10. Permitir eliminar la información.
11. No usar `localStorage` como copia de seguridad.
12. Utilizar backend y base de datos en sistemas reales.

---

## 20. Resumen

```javascript
// Guardar texto
localStorage.setItem(
  "clave",
  "valor"
);

// Recuperar
const valor =
  localStorage.getItem("clave");

// Eliminar una clave
localStorage.removeItem("clave");

// Eliminar todas las claves
localStorage.clear();
```

Para arreglos y objetos:

```javascript
localStorage.setItem(
  "actividades",
  JSON.stringify(actividades)
);

const actividades = JSON.parse(
  localStorage.getItem("actividades")
) || [];
```

La relación principal es:

```text
Objeto o arreglo
       ↓
JSON.stringify()
       ↓
localStorage
       ↓
JSON.parse()
       ↓
Objeto o arreglo recuperado
```

`localStorage` permite crear persistencia básica en ejercicios educativos, pero una aplicación real con usuarios y datos compartidos necesita un backend y una base de datos.
