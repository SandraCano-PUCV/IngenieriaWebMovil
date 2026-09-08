# Práctica: Inicio de sesión y rutas protegidas en Ionic React

## Descripción
En esta práctica se construirá, desde cero, una aplicación con **Ionic + React + TypeScript** que permita iniciar sesión, mantener una sesión básica utilizando `localStorage`, proteger una URL y cerrar sesión.

La práctica comienza con la **creación del proyecto Ionic** y termina con las pruebas de acceso a las rutas protegidas.

> **Importante:** Esta actividad utiliza una autenticación simulada. No se utiliza todavía un backend, una base de datos ni JWT. El objetivo es comprender primero el flujo de autenticación, el estado, la navegación y la protección de rutas.

---

# 1. Objetivos de aprendizaje

Al finalizar la práctica, el estudiante será capaz de:

- Crear un proyecto Ionic con React.
- Ejecutar una aplicación Ionic en el navegador.
- Reconocer la estructura básica de un proyecto Ionic React.
- Crear páginas y componentes en React.
- Utilizar `useState`.
- Capturar datos desde `IonInput`.
- Gestionar eventos.
- Utilizar funciones para validar datos.
- Utilizar `localStorage`.
- Navegar entre páginas con React Router.
- Diferenciar rutas públicas y protegidas.
- Crear un componente para proteger una URL.
- Implementar el cierre de sesión.
- Validar el comportamiento de la aplicación desde el navegador.

---

# 2. Resultado esperado

La aplicación tendrá las siguientes rutas:

| Ruta | Tipo | Descripción |
|---|---|---|
| `/login` | Pública | Formulario de inicio de sesión |
| `/home` | Protegida | Página accesible solamente después de iniciar sesión |

El flujo será:

```text
Usuario
   |
   v
/login
   |
   | Ingresa usuario y contraseña
   v
Validación
   |
   +---- Incorrecto ----> Mostrar error
   |
   +---- Correcto
            |
            v
      localStorage
            |
            v
          /home
```

Si un usuario intenta acceder directamente a `/home` sin iniciar sesión:

```text
/home
   |
   v
¿Está autenticado?
   |
   +---- No ----> /login
   |
   +---- Sí ----> Home
```

---

# 3. Tecnologías utilizadas

En esta práctica se utilizarán:

- Node.js
- npm
- Ionic CLI
- Ionic Framework
- React
- TypeScript
- React Router
- Vite
- `localStorage`

La guía está preparada para el stack actual de Ionic React basado en **Ionic 9 y React Router 6**.

---

# PARTE I — Preparación del entorno

# 4. Verificar Node.js

Antes de crear el proyecto, abrir una terminal y ejecutar:

```bash
node -v
```

Luego:

```bash
npm -v
```

Para proyectos actuales basados en Vite se recomienda utilizar una versión reciente de Node.js.

Por ejemplo:

```text
Node.js 22.x
```

Si `node` no es reconocido, se debe instalar Node.js antes de continuar.

---

# 5. Instalar Ionic CLI

Instalar Ionic CLI globalmente:

```bash
npm install -g @ionic/cli
```

Una vez finalizada la instalación, comprobar:

```bash
ionic --version
```

Si aparece un número de versión, Ionic CLI quedó instalado correctamente.

---

# PARTE II — Creación del proyecto

# 6. Crear el proyecto Ionic React

En la terminal, ubicarse en la carpeta donde se almacenarán los proyectos.

Ejemplo:

```bash
cd Documents
```

Crear un nuevo proyecto llamado:

```text
login-protegido
```

Ejecutar:

```bash
ionic start login-protegido blank --type=react
```

Este comando indica:

```text
ionic start
```

Crear una nueva aplicación Ionic.
```text
login-protegido
```

Es el nombre del proyecto.

```text
blank
```

Indica que se utilizará una plantilla vacía.

```text
--type=react
```

Indica que el framework será React.

---

## 6.1. Preguntas durante la creación

Dependiendo de la versión de Ionic CLI, pueden aparecer algunas preguntas adicionales.

Para esta práctica se pueden aceptar las opciones predeterminadas.

Al finalizar, Ionic instalará las dependencias del proyecto.

---

# 7. Entrar al proyecto

Ejecutar:

```bash
cd login-protegido
```

---

# 8. Abrir el proyecto en Visual Studio Code

Si Visual Studio Code está configurado para abrirse desde la terminal:

```bash
code .
```

También se puede abrir Visual Studio Code y seleccionar:

```text
Archivo
   ↓
Abrir carpeta
   ↓
login-protegido
```

---

# 9. Ejecutar el proyecto por primera vez

Antes de modificar código, verificar que el proyecto funcione.

Ejecutar:

```bash
ionic serve
```

Ionic iniciará el servidor de desarrollo.

Normalmente se abrirá una dirección similar a:

```text
http://localhost:8100
```

Se debe visualizar la aplicación inicial de Ionic.

---

# 10. Detener el servidor

Para detener `ionic serve`, volver a la terminal y presionar:

```text
Ctrl + C
```

---

# 11. Revisar las versiones instaladas

Se puede comprobar la versión de las principales dependencias con:

```bash
npm list @ionic/react @ionic/react-router react-router-dom
```

En un proyecto actual deberían aparecer las dependencias de Ionic React y React Router instaladas.

---

# 12. Estructura inicial del proyecto

Una aplicación Ionic React tiene una estructura similar a:

```text
login-protegido/
│
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── theme/
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── ionic.config.json
```

Los archivos que más utilizaremos serán:

```text
src/App.tsx
src/pages/
src/components/
```

Además, agregaremos:

```text
src/services/
```

---

# PARTE III — Preparar la estructura de la práctica

# 13. Crear las carpetas necesarias

Dentro de `src`, verificar o crear:

```text
components
pages
services
```

La estructura que utilizaremos será:

```text
src/
│
├── components/
│   └── ProtectedRoute.tsx
│
├── pages/
│   ├── Login.tsx
│   └── Home.tsx
│
├── services/
│   └── auth.ts
│
├── theme/
│   └── variables.css
│
└── App.tsx
```

---

# PARTE IV — Crear el servicio de autenticación

# 14. Crear `auth.ts`

Crear el archivo:

```text
src/services/auth.ts
```

Agregar:

```ts
export const login = (
  usuario: string,
  password: string
): boolean => {

  if (usuario === "admin" && password === "1234") {

    localStorage.setItem("autenticado", "true");

    return true;
  }

  return false;
};

export const logout = (): void => {

  localStorage.removeItem("autenticado");
};

export const isAuthenticated = (): boolean => {

  return localStorage.getItem("autenticado") === "true";
};
```

---

# 15. Credenciales de prueba

En esta primera versión se utilizarán:

```text
Usuario: admin
Contraseña: 1234
```

---

# 16. Comprender el servicio

El archivo `auth.ts` contiene tres funciones:

```text
login()
logout()
isAuthenticated()
```

---

## 16.1. Función `login()`

Recibe:

```ts
usuario
password
```

y compara los valores:

```ts
if (usuario === "admin" && password === "1234")
```

Si ambos son correctos:

```ts
localStorage.setItem("autenticado", "true");
```

---

## 16.2. Función `logout()`

Elimina la información de autenticación:

```ts
localStorage.removeItem("autenticado");
```

---

## 16.3. Función `isAuthenticated()`

Consulta:

```ts
localStorage.getItem("autenticado")
```

y retorna:

```text
true
```

o:

```text
false
```

---

# PARTE V — Crear la página Login

# 17. Crear `Login.tsx`

Crear:

```text
src/pages/Login.tsx
```

Agregar el siguiente código:

```tsx
import { useState } from "react";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText
} from "@ionic/react";

import { useNavigate } from "react-router-dom";

import { login } from "../services/auth";

const Login: React.FC = () => {

  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const iniciarSesion = () => {

    const resultado = login(usuario, password);

    if (resultado) {

      setError("");

      navigate("/home", {
        replace: true
      });

    } else {

      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem>
          <IonInput
            label="Usuario"
            labelPlacement="stacked"
            value={usuario}
            onIonInput={(evento) =>
              setUsuario(evento.detail.value ?? "")
            }
          />
        </IonItem>

        <IonItem>
          <IonInput
            label="Contraseña"
            labelPlacement="stacked"
            type="password"
            value={password}
            onIonInput={(evento) =>
              setPassword(evento.detail.value ?? "")
            }
          />
        </IonItem>

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={iniciarSesion}
        >
          Ingresar
        </IonButton>

      </IonContent>

    </IonPage>
  );
};

export default Login;
```

---

# PARTE VI — Comprender el formulario

# 18. Estado del usuario

Se utiliza:

```tsx
const [usuario, setUsuario] = useState<string>("");
```

Esto significa:

```text
usuario
```

contiene el valor actual.

```text
setUsuario
```

permite modificarlo.

```text
""
```

es el valor inicial.

---

# 19. Estado de la contraseña

```tsx
const [password, setPassword] = useState<string>("");
```

Tiene el mismo funcionamiento, pero almacena la contraseña.

---

# 20. Estado del mensaje de error

```tsx
const [error, setError] = useState<string>("");
```

Se utiliza para mostrar un mensaje cuando las credenciales son incorrectas.

---

# 21. Capturar el valor de `IonInput`

Para el usuario:

```tsx
<IonInput
  label="Usuario"
  labelPlacement="stacked"
  value={usuario}
  onIonInput={(evento) =>
    setUsuario(evento.detail.value ?? "")
  }
/>
```

El evento:

```tsx
onIonInput
```

se ejecuta cuando cambia el contenido.

El valor se obtiene desde:

```tsx
evento.detail.value
```

---

# 22. ¿Qué significa `?? ""`?

La expresión:

```tsx
evento.detail.value ?? ""
```

significa:

> utilizar `evento.detail.value` si existe; si es `null` o `undefined`, utilizar una cadena vacía.

Por ejemplo:

```text
evento.detail.value = "admin"
```

Resultado:

```text
"admin"
```

Si:

```text
evento.detail.value = undefined
```

Resultado:

```text
""
```

---

# PARTE VII — Navegación

# 23. Importar `useNavigate`

En React Router actual se utiliza:

```tsx
import { useNavigate } from "react-router-dom";
```

Luego:

```tsx
const navigate = useNavigate();
```

Para navegar a Home:

```tsx
navigate("/home");
```

En esta práctica utilizamos:

```tsx
navigate("/home", {
  replace: true
});
```

`replace: true` reemplaza la ruta actual en el historial.

---

# 24. Función `iniciarSesion`

La función completa es:

```tsx
const iniciarSesion = () => {

  const resultado = login(usuario, password);

  if (resultado) {

    setError("");

    navigate("/home", {
      replace: true
    });

  } else {

    setError("Usuario o contraseña incorrectos");
  }
};
```

El flujo es:

```text
Botón Ingresar
      |
      v
iniciarSesion()
      |
      v
login(usuario, password)
      |
      +---- false ---> mostrar error
      |
      +---- true ----> /home
```

---

# PARTE VIII — Crear la página protegida

# 25. Modificar `Home.tsx`

El proyecto `blank` normalmente ya contiene una página `Home.tsx`.

Reemplazar su contenido por:

```tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from "@ionic/react";

import { useNavigate } from "react-router-dom";

import { logout } from "../services/auth";

const Home: React.FC = () => {

  const navigate = useNavigate();

  const cerrarSesion = () => {

    logout();

    navigate("/login", {
      replace: true
    });
  };

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <h2>Bienvenido</h2>

        <p>
          Esta página solamente puede ser visualizada
          por usuarios autenticados.
        </p>

        <IonButton
          expand="block"
          color="danger"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </IonButton>

      </IonContent>

    </IonPage>
  );
};

export default Home;
```

---

# PARTE IX — Crear el componente de ruta protegida

# 26. Crear `ProtectedRoute.tsx`

Crear:

```text
src/components/ProtectedRoute.tsx
```

Agregar:

```tsx
import React from "react";

import { Navigate } from "react-router-dom";

import { isAuthenticated } from "../services/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children
}) => {

  if (!isAuthenticated()) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

---

# 27. ¿Qué hace `ProtectedRoute`?

Primero pregunta:

```tsx
isAuthenticated()
```

Si el resultado es falso:

```tsx
return (
  <Navigate
    to="/login"
    replace
  />
);
```

Si el resultado es verdadero:

```tsx
return <>{children}</>;
```

Por lo tanto:

```text
ProtectedRoute
      |
      v
isAuthenticated()
      |
      +---- false ---> /login
      |
      +---- true ----> mostrar página
```

---

# PARTE X — Configurar las rutas de la aplicación

# 28. Modificar `App.tsx`

Abrir:

```text
src/App.tsx
```

Reemplazar su contenido por:

```tsx
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";

import {
  Navigate,
  Route,
  Routes
} from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";

import ProtectedRoute from "./components/ProtectedRoute";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utilities */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Ionic Dark Mode */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>

    <IonReactRouter>

      <IonRouterOutlet>

        <Routes>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

        </Routes>

      </IonRouterOutlet>

    </IonReactRouter>

  </IonApp>
);

export default App;
```

---

# 29. Comprender las rutas

La ruta pública es:

```tsx
<Route
  path="/login"
  element={<Login />}
/>
```

Cualquier usuario puede visualizarla.

---

La ruta protegida es:

```tsx
<Route
  path="/home"
  element={
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  }
/>
```

Antes de mostrar `Home`, React ejecuta:

```text
ProtectedRoute
```

---

# 30. Ruta inicial

Cuando el usuario accede a:

```text
/
```

se ejecuta:

```tsx
<Route
  path="/"
  element={
    <Navigate
      to="/login"
      replace
    />
  }
/>
```

Por lo tanto:

```text
/
   ↓
/login
```

---

# 31. Ruta inexistente

También se agrega:

```tsx
<Route
  path="*"
  element={
    <Navigate
      to="/login"
      replace
    />
  }
/>
```

El símbolo:

```text
*
```

representa cualquier ruta que no haya sido declarada.

Por ejemplo:

```text
/productos
/usuarios
/abc
```

serán redirigidas a:

```text
/login
```

---

# PARTE XI — Ejecutar la aplicación terminada

# 32. Iniciar nuevamente Ionic

Desde la terminal:

```bash
ionic serve
```

La aplicación debería abrirse en:

```text
http://localhost:8100
```

---

# PARTE XII — Pruebas obligatorias

# 33. Prueba 1 — Ruta inicial

Abrir:

```text
http://localhost:8100
```

Resultado esperado:

```text
/login
```

---

# 34. Prueba 2 — Acceso directo a Home sin sesión

Sin iniciar sesión, escribir:

```text
http://localhost:8100/home
```

Resultado esperado:

```text
/home
   ↓
ProtectedRoute
   ↓
isAuthenticated() = false
   ↓
/login
```

El usuario no debe poder visualizar `Home`.

---

# 35. Prueba 3 — Credenciales incorrectas

Ingresar:

```text
Usuario: prueba
Contraseña: 1111
```

Presionar:

```text
Ingresar
```

Resultado esperado:

```text
Usuario o contraseña incorrectos
```

La aplicación debe permanecer en:

```text
/login
```

---

# 36. Prueba 4 — Credenciales correctas

Ingresar:

```text
Usuario: admin
Contraseña: 1234
```

Presionar:

```text
Ingresar
```

Resultado esperado:

```text
/home
```

---

# 37. Prueba 5 — Actualizar el navegador

Estando en:

```text
/home
```

actualizar la página.

Resultado esperado:

```text
/home
```

debe continuar visible.

Esto ocurre porque:

```text
autenticado = true
```

permanece almacenado en `localStorage`.

---

# PARTE XIII — Revisar localStorage

# 38. Abrir herramientas de desarrollo

En el navegador:

```text
Clic derecho
   ↓
Inspeccionar
```

También se puede utilizar:

```text
F12
```

Dependiendo del navegador.

---

# 39. Buscar el almacenamiento local

En Chrome:

```text
Application
   ↓
Local Storage
```

En Firefox:

```text
Storage
   ↓
Local Storage
```

Después de iniciar sesión debe existir:

```text
autenticado    true
```

---

# 40. ¿Qué ocurre si se elimina manualmente?

Eliminar:

```text
autenticado
```

desde las herramientas del navegador.

Luego actualizar:

```text
/home
```

Resultado esperado:

```text
/login
```

porque:

```tsx
isAuthenticated()
```

retornará:

```text
false
```

---

# PARTE XIV — Cerrar sesión

# 41. Presionar `Cerrar sesión`

Desde `/home`, presionar:

```text
Cerrar sesión
```

La función ejecutada es:

```tsx
const cerrarSesion = () => {

  logout();

  navigate("/login", {
    replace: true
  });
};
```

---

# 42. Resultado del logout

Primero:

```tsx
logout();
```

elimina:

```text
autenticado
```

Después:

```tsx
navigate("/login", {
  replace: true
});
```

envía al usuario a:

```text
/login
```

---

# 43. Comprobar que Home quedó protegido

Después de cerrar sesión, escribir manualmente:

```text
http://localhost:8100/home
```

Resultado esperado:

```text
/login
```

---

# PARTE XV — Flujo completo

# 44. Flujo de autenticación

```text
                    ┌──────────────┐
                    │    /login    │
                    └──────┬───────┘
                           │
                           │ usuario + contraseña
                           ▼
                    ┌──────────────┐
                    │   login()    │
                    └──────┬───────┘
                           │
                 ┌─────────┴─────────┐
                 │                   │
              Incorrecto          Correcto
                 │                   │
                 ▼                   ▼
          Mostrar mensaje     localStorage
                                    │
                                    ▼
                                  /home
                                    │
                                    ▼
                             Cerrar sesión
                                    │
                                    ▼
                                logout()
                                    │
                                    ▼
                                  /login
```

---

# PARTE XVI — Conceptos utilizados

# 45. Resumen conceptual

| Concepto | Uso en la práctica |
|---|---|
| `useState` | Guardar usuario, contraseña y error |
| `IonInput` | Capturar datos |
| `onIonInput` | Detectar cambios |
| `evento.detail.value` | Obtener el valor de `IonInput` |
| `IonButton` | Ejecutar acciones |
| funciones | `login`, `logout`, `iniciarSesion` |
| `localStorage` | Mantener una sesión simple |
| `useNavigate` | Navegar entre URLs |
| `Navigate` | Redireccionar mediante JSX |
| `Route` | Declarar una URL |
| `Routes` | Agrupar rutas |
| `ProtectedRoute` | Controlar acceso |
| props | Enviar `children` a `ProtectedRoute` |
| operador condicional | Decidir si permitir acceso |

---

# PARTE XVII — Diferencia entre navegación y protección

# 46. Navegar no significa proteger

Este código:

```tsx
navigate("/home");
```

solamente cambia la URL.

No protege la página.

La protección realmente ocurre aquí:

```tsx
<ProtectedRoute>
  <Home />
</ProtectedRoute>
```

porque `ProtectedRoute` verifica:

```tsx
isAuthenticated()
```

antes de mostrar `Home`.

---

# PARTE XVIII — Desafío 1

# 47. Crear una página Perfil

Crear:

```text
src/pages/Perfil.tsx
```

Puede utilizar como base:

```tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from "@ionic/react";

const Perfil: React.FC = () => {

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <h2>Mi perfil</h2>

        <p>
          Esta página también está protegida.
        </p>

      </IonContent>

    </IonPage>
  );
};

export default Perfil;
```

---

# 48. Importar Perfil

En:

```text
App.tsx
```

agregar:

```tsx
import Perfil from "./pages/Perfil";
```

---

# 49. Proteger `/perfil`

Agregar dentro de `Routes`:

```tsx
<Route
  path="/perfil"
  element={
    <ProtectedRoute>
      <Perfil />
    </ProtectedRoute>
  }
/>
```

Ahora:

```text
/perfil
```

también debe requerir autenticación.

---

# PARTE XIX — Desafío 2

# 50. Guardar el nombre del usuario

Modificar:

```text
src/services/auth.ts
```

Dentro de `login()` agregar:

```ts
localStorage.setItem("usuario", usuario);
```

La función puede quedar:

```ts
export const login = (
  usuario: string,
  password: string
): boolean => {

  if (usuario === "admin" && password === "1234") {

    localStorage.setItem("autenticado", "true");

    localStorage.setItem("usuario", usuario);

    return true;
  }

  return false;
};
```

---

# 51. Crear función para obtener el usuario

Agregar:

```ts
export const getUsuario = (): string => {

  return localStorage.getItem("usuario") ?? "";
};
```

---

# 52. Eliminar también el usuario al cerrar sesión

Modificar:

```ts
export const logout = (): void => {

  localStorage.removeItem("autenticado");

  localStorage.removeItem("usuario");
};
```

---

# 53. Mostrar el usuario en Home

Importar:

```tsx
import {
  getUsuario,
  logout
} from "../services/auth";
```

Dentro del componente:

```tsx
const usuario = getUsuario();
```

Y mostrar:

```tsx
<h2>Bienvenido, {usuario}</h2>
```

Resultado:

```text
Bienvenido, admin
```

---

# PARTE XX — Preguntas de análisis

# 54. Responder

1. ¿Qué comando permite crear un proyecto Ionic React?

2. ¿Qué función cumple `ionic serve`?

3. ¿Qué diferencia existe entre `/login` y `/home`?

4. ¿Para qué se utiliza `useState`?

5. ¿Qué información contiene `evento.detail.value`?

6. ¿Para qué se utiliza `localStorage` en esta práctica?

7. ¿Qué retorna `isAuthenticated()`?

8. ¿Qué función cumple `ProtectedRoute`?

9. ¿Qué ocurre si se intenta abrir `/home` sin iniciar sesión?

10. ¿Para qué se utiliza `useNavigate()`?

11. ¿Qué significa `replace: true`?

12. ¿Qué ocurre con la sesión cuando se actualiza el navegador?

13. ¿Qué operación realiza `logout()`?

14. ¿Cuál es la diferencia entre navegar hacia una página y proteger una página?

15. ¿Por qué esta solución no debe utilizarse como autenticación real en producción?

---

# PARTE XXI — Problemas frecuentes

# 55. `ionic` no se reconoce

Si aparece un error similar a:

```text
ionic: command not found
```

instalar nuevamente:

```bash
npm install -g @ionic/cli
```

Después comprobar:

```bash
ionic --version
```

---

# 56. `node` no se reconoce

Si aparece:

```text
node: command not found
```

se debe instalar Node.js.

Luego comprobar:

```bash
node -v
npm -v
```

---

# 57. El puerto 8100 está ocupado

Se puede ejecutar:

```bash
ionic serve --port 8101
```

La aplicación quedará disponible en:

```text
http://localhost:8101
```

---

# 58. No se encuentran las dependencias

Si se descargó o copió el proyecto y no existe `node_modules`, ejecutar:

```bash
npm install
```

Luego:

```bash
ionic serve
```

---

# 59. Error con `useNavigate`

`useNavigate` debe ejecutarse dentro del contexto de React Router.

La aplicación debe estar envuelta por:

```tsx
<IonReactRouter>
```

como se muestra en `App.tsx`.

---

# 60. La página no aparece correctamente

Las páginas utilizadas directamente por las rutas de Ionic deben utilizar:

```tsx
<IonPage>
```

Ejemplo:

```tsx
const Home: React.FC = () => {

  return (
    <IonPage>

      <IonContent>
        ...
      </IonContent>

    </IonPage>
  );
};
```

---

# PARTE XXII — Validar el proyecto antes de entregar

# 61. Ejecutar la aplicación

```bash
ionic serve
```

---

# 62. Probar las rutas

Comprobar:

```text
/
```

debe ir a:

```text
/login
```

---

Comprobar:

```text
/home
```

sin sesión.

Debe ir a:

```text
/login
```

---

Iniciar sesión con:

```text
admin
1234
```

Debe ir a:

```text
/home
```

---

Cerrar sesión.

Debe regresar a:

```text
/login
```

---

# 63. Compilar el proyecto

Finalmente, comprobar que el proyecto pueda compilarse:

```bash
npm run build
```

Si no existen errores, se generará la versión de producción del frontend.

---

# PARTE XXIII — Lista de verificación

Antes de entregar, comprobar:

- [ ] El proyecto fue creado con Ionic React.
- [ ] La aplicación ejecuta correctamente con `ionic serve`.
- [ ] Existe `src/pages/Login.tsx`.
- [ ] Existe `src/pages/Home.tsx`.
- [ ] Existe `src/services/auth.ts`.
- [ ] Existe `src/components/ProtectedRoute.tsx`.
- [ ] `/login` es una ruta pública.
- [ ] `/home` es una ruta protegida.
- [ ] Las credenciales incorrectas muestran un error.
- [ ] Las credenciales correctas permiten entrar.
- [ ] La sesión se almacena en `localStorage`.
- [ ] Al actualizar `/home`, la sesión permanece.
- [ ] El botón `Cerrar sesión` funciona.
- [ ] Después de cerrar sesión no es posible abrir `/home`.
- [ ] `npm run build` termina sin errores.

---

# PARTE XXIV — Seguridad

# 64. Limitación de esta implementación

Esta práctica guarda:

```text
autenticado = true
```

en:

```text
localStorage
```

Esto **no representa una autenticación segura**.

Un usuario puede abrir las herramientas de desarrollo y modificar manualmente `localStorage`.

Por lo tanto, este mecanismo debe utilizarse solamente para comprender el flujo del frontend.

---

# 65. Evolución hacia una aplicación real

La progresión recomendada es:

```text
Formulario Ionic
       ↓
useState
       ↓
Validación local
       ↓
localStorage
       ↓
React Router
       ↓
ProtectedRoute
       ↓
API REST
       ↓
Node.js + Express
       ↓
Base de datos
       ↓
Contraseña cifrada
       ↓
JWT
       ↓
Autorización del backend
```

La siguiente práctica puede reemplazar:

```text
admin / 1234
```

por una petición real:

```text
POST /api/login
```

hacia un backend construido con:

```text
Node.js + Express
```

y utilizar un:

```text
JWT
```

para mantener la autenticación.

---

# 66. Resultado final de aprendizaje

Al finalizar esta actividad, el estudiante debería poder explicar el siguiente proceso:

```text
Crear proyecto Ionic
        ↓
Crear formulario
        ↓
Capturar datos
        ↓
Validar credenciales
        ↓
Guardar sesión
        ↓
Navegar
        ↓
Proteger URL
        ↓
Cerrar sesión
```

También debería comprender que:

```text
Frontend protegido
```

no es equivalente a:

```text
Backend seguro
```

y que la protección real de datos y operaciones debe ser implementada posteriormente en el servidor.
