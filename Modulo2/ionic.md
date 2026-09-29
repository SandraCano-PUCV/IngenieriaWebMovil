# Guía de Ionic con React y TypeScript

## 1. ¿Qué es Ionic con React?

**Ionic** es un framework para desarrollar aplicaciones con una única base de código que puede ejecutarse en:

- Navegadores Web.
- Android.
- iOS.

Cuando utilizamos **Ionic con React**, cada tecnología cumple una función diferente:

| Tecnología | Responsabilidad |
|---|---|
| React | Componentes, estado, propiedades, eventos y lógica de interfaz |
| Ionic | Componentes visuales y comportamiento orientado a aplicaciones móviles |
| TypeScript | Tipado y estructura del código |
| React Router | Navegación entre páginas |
| Capacitor | Integración con funcionalidades nativas del dispositivo |
| Axios / Fetch | Comunicación con APIs REST |
| CSS / Tailwind CSS | Diseño, layout y estilos |

La arquitectura básica puede representarse como:

```text
Usuario
   ↓
Ionic
   ↓
React
   ↓
Servicios
   ↓
Axios / Fetch
   ↓
API REST
   ↓
Base de Datos
```

---

# 2. Crear un proyecto Ionic con React

```bash
npm install -g @ionic/cli
```

Crear proyecto:

```bash
ionic start miAplicacion blank --type=react
```

Ingresar al proyecto:

```bash
cd miAplicacion
```

Ejecutar:

```bash
ionic serve
```

También puede ejecutarse utilizando:

```bash
npm run dev
```

dependiendo de la configuración del proyecto.

---

# 3. Estructura básica del proyecto

Una posible estructura es:

```text
src/
│
├── components/
│   ├── ResourceCard.tsx
│   ├── Header.tsx
│   └── ProgressBar.tsx
│
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Recursos.tsx
│   └── Perfil.tsx
│
├── services/
│   ├── api.ts
│   ├── authService.ts
│   └── resourceService.ts
│
├── hooks/
│   └── useAuth.ts
│
├── context/
│   └── AuthContext.tsx
│
├── models/
│   └── Resource.ts
│
├── routes/
│   └── ProtectedRoute.tsx
│
├── theme/
│   └── variables.css
│
├── App.tsx
└── main.tsx
```

Una separación adecuada permite distinguir:

```text
pages
   ↓
Pantallas completas

components
   ↓
Elementos reutilizables

services
   ↓
Comunicación con APIs

models
   ↓
Interfaces y tipos TypeScript

hooks
   ↓
Lógica reutilizable

context
   ↓
Estado compartido
```

---

# 4. Componentes en React

Un componente es una unidad reutilizable de interfaz.

Ejemplo:

```tsx
const Saludo = () => {
  return (
    <h2>Hola estudiante</h2>
  );
};

export default Saludo;
```

También puede declararse utilizando `React.FC`:

```tsx
import React from 'react';

const Saludo: React.FC = () => {

  return (
    <h2>Hola estudiante</h2>
  );

};

export default Saludo;
```

---

# 5. Componentes Ionic

Ionic proporciona componentes preparados para interfaces Web y Móviles.

Ejemplos:

```tsx
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonInput
} from '@ionic/react';
```

Uso:

```tsx
<IonButton>
  Guardar
</IonButton>
```

```tsx
<IonInput
  label="Nombre"
  labelPlacement="stacked"
/>
```

```tsx
<IonCard>

  <IonCardContent>
    Contenido
  </IonCardContent>

</IonCard>
```

---

# 6. Página vs Componente

Es importante distinguir ambos conceptos.

## Página

Una página representa una vista completa de la aplicación.

Normalmente utiliza:

```tsx
IonPage
IonHeader
IonToolbar
IonTitle
IonContent
```

Ejemplo:

```tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
} from '@ionic/react';

const Home: React.FC = () => {

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <h1>Bienvenido</h1>

      </IonContent>

    </IonPage>
  );
};

export default Home;
```

## Componente

Un componente representa una parte reutilizable de una página.

```tsx
const ResourceCard = () => {

  return (
    <IonCard>
      <IonCardContent>
        Recurso educativo
      </IonCardContent>
    </IonCard>
  );

};
```

Una página puede utilizar muchos componentes:

```text
ResourcesPage
│
├── Header
├── SearchBar
├── ResourceCard
├── ResourceCard
├── ResourceCard
└── Navigation
```

---

# 7. Props

Las **props** permiten enviar información desde un componente padre hacia un componente hijo.

Ejemplo:

```tsx
interface ResourceCardProps {
  titulo: string;
  descripcion: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  titulo,
  descripcion
}) => {

  return (
    <IonCard>

      <IonCardContent>

        <h2>{titulo}</h2>

        <p>{descripcion}</p>

      </IonCardContent>

    </IonCard>
  );
};
```

Utilización:

```tsx
<ResourceCard
  titulo="Introducción a React"
  descripcion="Micro-recurso sobre componentes React"
/>
```

Flujo:

```text
Componente Padre
       ↓
      Props
       ↓
Componente Hijo
```

Las props son de solo lectura para el componente hijo.

---

# 8. Estado: useState

El estado permite almacenar información que puede cambiar durante la interacción.

Se utiliza mediante:

```tsx
useState()
```

Ejemplo:

```tsx
import { useState } from 'react';

const [nombre, setNombre] = useState<string>('');
```

La estructura conceptual es:

```text
nombre
   ↓
valor actual

setNombre
   ↓
función que modifica el valor
```

Ejemplo:

```tsx
const [contador, setContador] = useState<number>(0);
```

Actualizar:

```tsx
setContador(contador + 1);
```

---

# 9. Estado booleano

Muy utilizado para mostrar u ocultar componentes.

```tsx
const [visible, setVisible] = useState<boolean>(false);
```

Ejemplo:

```tsx
<IonButton
  onClick={() => setVisible(true)}
>
  Mostrar
</IonButton>

{visible && (
  <p>Contenido visible</p>
)}
```

---

# 10. Estado con objetos

```tsx
interface Usuario {
  nombre: string;
  correo: string;
}

const [usuario, setUsuario] = useState<Usuario>({
  nombre: '',
  correo: ''
});
```

Actualizar solamente una propiedad:

```tsx
setUsuario({
  ...usuario,
  nombre: 'Camila'
});
```

`...usuario` conserva las demás propiedades.

---

# 11. Estado con arreglos

```tsx
interface Recurso {
  id: number;
  titulo: string;
}

const [recursos, setRecursos] = useState<Recurso[]>([]);
```

Agregar:

```tsx
setRecursos([
  ...recursos,
  {
    id: 1,
    titulo: 'React'
  }
]);
```

---

# 12. Eventos

React e Ionic utilizan eventos para responder a las acciones del usuario.

Ejemplo:

```tsx
<IonButton
  onClick={() => console.log('Guardar')}
>
  Guardar
</IonButton>
```

---

# 13. Eventos de IonInput

```tsx
const [nombre, setNombre] = useState<string>('');

<IonInput
  label="Nombre"
  value={nombre}
  onIonInput={(evento) =>
    setNombre(evento.detail.value ?? '')
  }
/>
```

En:

```tsx
evento.detail.value
```

se obtiene el valor ingresado en `IonInput`.

La expresión:

```tsx
?? ''
```

significa:

> Si el valor es `null` o `undefined`, utilizar una cadena vacía.

---

# 14. Formularios controlados

En React, un formulario puede utilizar estados para controlar sus campos.

```tsx
const [nombre, setNombre] = useState<string>('');
const [correo, setCorreo] = useState<string>('');
```

Formulario:

```tsx
<IonInput
  label="Nombre"
  value={nombre}
  onIonInput={(e) =>
    setNombre(e.detail.value ?? '')
  }
/>

<IonInput
  label="Correo"
  type="email"
  value={correo}
  onIonInput={(e) =>
    setCorreo(e.detail.value ?? '')
  }
/>
```

---

# 15. Envío de formularios

```tsx
const guardar = (event: React.FormEvent) => {

  event.preventDefault();

  console.log(nombre);
  console.log(correo);

};
```

Formulario:

```tsx
<form onSubmit={guardar}>

  <IonInput
    value={nombre}
    onIonInput={(e) =>
      setNombre(e.detail.value ?? '')
    }
  />

  <IonButton
    type="submit"
    expand="block"
  >
    Guardar
  </IonButton>

</form>
```

`preventDefault()` evita que el navegador recargue la página.

---

# 16. Validación de formularios

Ejemplo:

```tsx
const [error, setError] = useState<string>('');

const guardar = () => {

  if (nombre.trim() === '') {

    setError('El nombre es obligatorio');

    return;
  }

  setError('');

};
```

Mostrar error:

```tsx
{error && (
  <IonText color="danger">
    <p>{error}</p>
  </IonText>
)}
```

---

# 17. useEffect

`useEffect` permite ejecutar código cuando:

- se carga un componente;
- cambia un estado;
- cambia una propiedad.

Ejemplo:

```tsx
import { useEffect } from 'react';

useEffect(() => {

  console.log('Página cargada');

}, []);
```

El arreglo vacío:

```tsx
[]
```

indica que se ejecutará al montar el componente.

---

# 18. useEffect dependiendo de una variable

```tsx
useEffect(() => {

  console.log('Cambió el usuario');

}, [usuario]);
```

Se ejecutará cada vez que `usuario` cambie.

---

# 19. Cargar información al iniciar una página

```tsx
useEffect(() => {

  cargarRecursos();

}, []);
```

Por ejemplo:

```tsx
const cargarRecursos = async () => {

  const respuesta = await axios.get(
    'http://localhost:3000/api/recursos'
  );

  setRecursos(respuesta.data);

};
```

---

# 20. Navegación

Una aplicación Ionic puede tener varias páginas.

Ejemplo conceptual:

```text
/login
/inicio
/perfil
/recursos
/recursos/:id
/progreso
```

Ionic integra React Router mediante:

```tsx
IonReactRouter
IonRouterOutlet
```

Ejemplo:

```tsx
<IonReactRouter>

  <IonRouterOutlet>

    <Route
      path="/login"
      component={Login}
      exact
    />

    <Route
      path="/inicio"
      component={Home}
      exact
    />

  </IonRouterOutlet>

</IonReactRouter>
```

> La sintaxis concreta de `Route` puede variar según la versión de React Router utilizada por el proyecto.

---

# 21. Rutas dinámicas

Una ruta puede contener parámetros.

```text
/recursos/:id
```

Ejemplo:

```text
/recursos/25
```

El `25` identifica un recurso concreto.

Conceptualmente:

```text
Listado de recursos
       ↓
Seleccionar recurso
       ↓
/recursos/25
       ↓
Detalle del recurso 25
```

---

# 22. Navegación programática

Ionic proporciona:

```tsx
useIonRouter()
```

Ejemplo:

```tsx
import { useIonRouter } from '@ionic/react';

const router = useIonRouter();
```

Navegar:

```tsx
router.push('/recursos');
```

Ejemplo:

```tsx
<IonButton
  onClick={() =>
    router.push('/recursos')
  }
>
  Ver recursos
</IonButton>
```

---

# 23. Rutas públicas y protegidas

Una aplicación normalmente diferencia:

```text
Rutas Públicas
├── Login
└── Registro

Rutas Protegidas
├── Inicio
├── Perfil
├── Recursos
└── Progreso
```

Además puede existir separación por roles:

```text
/estudiante/*
/docente/*
/admin/*
```

---

# 24. Renderizado condicional

React permite mostrar diferentes elementos según una condición.

```tsx
{usuario.rol === 'docente' && (
  <IonButton>
    Crear recurso
  </IonButton>
)}
```

Otro ejemplo:

```tsx
{cargando ? (
  <IonSpinner />
) : (
  <ResourceList />
)}
```

---

# 25. Listas

Una colección puede mostrarse utilizando `map()`.

```tsx
{recursos.map((recurso) => (

  <IonCard key={recurso.id}>

    <IonCardContent>
      {recurso.titulo}
    </IonCardContent>

  </IonCard>

))}
```

---

# 26. Componentes reutilizables

En vez de:

```tsx
{recursos.map((recurso) => (
  <IonCard key={recurso.id}>
    ...
  </IonCard>
))}
```

puede crearse:

```tsx
{recursos.map((recurso) => (

  <ResourceCard
    key={recurso.id}
    recurso={recurso}
  />

))}
```

Esto mejora:

- reutilización;
- mantenimiento;
- claridad;
- separación de responsabilidades.

---

# 27. TypeScript: Interfaces

Las interfaces permiten definir la estructura de los datos.

```tsx
export interface Recurso {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: string;
}
```

Luego:

```tsx
const [recursos, setRecursos] =
  useState<Recurso[]>([]);
```

---

# 28. TypeScript: Props tipadas

```tsx
interface Props {
  recurso: Recurso;
}

const ResourceCard: React.FC<Props> = ({
  recurso
}) => {

  return (
    <IonCard>
      <IonCardContent>
        {recurso.titulo}
      </IonCardContent>
    </IonCard>
  );

};
```

---

# 29. Comunicación con una API REST

La arquitectura puede ser:

```text
Ionic + React
      ↓
   Servicio
      ↓
    Axios
      ↓
   API REST
      ↓
Base de Datos
```

---

# 30. Axios

Instalar:

```bash
npm install axios
```

Importar:

```tsx
import axios from 'axios';
```

---

# 31. GET con Axios

Consultar información:

```tsx
const respuesta = await axios.get(
  'http://localhost:3000/api/recursos'
);

console.log(respuesta.data);
```

Guardar en estado:

```tsx
const cargarRecursos = async () => {

  const respuesta = await axios.get(
    'http://localhost:3000/api/recursos'
  );

  setRecursos(respuesta.data);

};
```

---

# 32. POST con Axios

Crear información:

```tsx
const nuevoRecurso = {
  titulo: 'React',
  descripcion: 'Introducción a React'
};
```

```tsx
await axios.post(
  'http://localhost:3000/api/recursos',
  nuevoRecurso
);
```

---

# 33. PUT con Axios

Actualizar completamente un recurso:

```tsx
await axios.put(
  'http://localhost:3000/api/recursos/5',
  recurso
);
```

---

# 34. PATCH con Axios

Modificar parcialmente:

```tsx
await axios.patch(
  'http://localhost:3000/api/recursos/5',
  {
    titulo: 'Nuevo título'
  }
);
```

---

# 35. DELETE con Axios

```tsx
await axios.delete(
  'http://localhost:3000/api/recursos/5'
);
```

---

# 36. Manejo de errores con Axios

```tsx
try {

  const respuesta = await axios.get(
    'http://localhost:3000/api/recursos'
  );

  setRecursos(respuesta.data);

} catch (error) {

  console.error(
    'Error al cargar recursos',
    error
  );

}
```

---

# 37. Estado de carga

Una interfaz no debería quedar sin retroalimentación mientras espera una API.

```tsx
const [cargando, setCargando] =
  useState<boolean>(false);
```

```tsx
const cargarRecursos = async () => {

  try {

    setCargando(true);

    const respuesta =
      await axios.get('/api/recursos');

    setRecursos(respuesta.data);

  } catch (error) {

    console.error(error);

  } finally {

    setCargando(false);

  }

};
```

Interfaz:

```tsx
{cargando && <IonSpinner />}
```

---

# 38. Crear un servicio API

No es recomendable escribir todas las llamadas Axios directamente dentro de las páginas.

Crear:

```text
src/services/api.ts
```

```tsx
import axios from 'axios';

const api = axios.create({

  baseURL: 'http://localhost:3000/api'

});

export default api;
```

Uso:

```tsx
import api from '../services/api';

const respuesta =
  await api.get('/recursos');
```

---

# 39. Servicio específico

```text
services/resourceService.ts
```

```tsx
import api from './api';

export const getResources = () => {

  return api.get('/recursos');

};

export const createResource = (data: any) => {

  return api.post('/recursos', data);

};

export const updateResource = (
  id: number,
  data: any
) => {

  return api.put(`/recursos/${id}`, data);

};

export const deleteResource = (
  id: number
) => {

  return api.delete(`/recursos/${id}`);

};
```

La página utiliza el servicio:

```text
Page
 ↓
Service
 ↓
Axios
 ↓
API
```

---

# 40. Autenticación

El usuario envía:

```text
correo
contraseña
```

Frontend:

```tsx
const respuesta =
  await api.post('/auth/login', {
    correo,
    password
  });
```

El backend puede responder:

```json
{
  "token": "...",
  "usuario": {
    "id": 25,
    "nombre": "Camila",
    "rol": "estudiante"
  }
}
```

---

# 41. JWT

Después de autenticarse, el backend puede entregar un token JWT.

```text
Login
  ↓
API
  ↓
JWT
  ↓
Frontend
```

Luego el token se envía en las solicitudes protegidas:

```text
Authorization: Bearer TOKEN
```

---

# 42. Interceptores Axios

Un interceptor permite agregar automáticamente el token.

```tsx
api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem('token');

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;
  }
);
```

Así no es necesario agregar manualmente el token en cada petición.

---

# 43. localStorage

Permite almacenar información en el navegador.

Guardar:

```tsx
localStorage.setItem(
  'token',
  respuesta.data.token
);
```

Obtener:

```tsx
const token =
  localStorage.getItem('token');
```

Eliminar:

```tsx
localStorage.removeItem('token');
```

> No debería utilizarse `localStorage` para almacenar contraseñas.

---

# 44. Context API

Cuando diferentes componentes necesitan compartir información global puede utilizarse Context.

Por ejemplo:

```text
AuthContext
│
├── usuario
├── token
├── login()
└── logout()
```

Luego diferentes páginas pueden conocer al usuario autenticado.

---

# 45. Custom Hooks

Un Hook personalizado permite reutilizar lógica.

Ejemplo:

```text
hooks/useAuth.ts
```

Conceptualmente:

```tsx
const {
  usuario,
  login,
  logout
} = useAuth();
```

Permite separar:

```text
Interfaz
   ↓
Hook
   ↓
Lógica
```

---

# 46. Componentes Ionic frecuentes

## Estructura

```tsx
IonApp
IonPage
IonHeader
IonToolbar
IonContent
IonFooter
```

## Formularios

```tsx
IonInput
IonTextarea
IonSelect
IonSelectOption
IonCheckbox
IonRadio
IonRadioGroup
IonToggle
IonRange
```

## Botones

```tsx
IonButton
IonFab
IonFabButton
IonIcon
```

## Contenido

```tsx
IonCard
IonCardHeader
IonCardTitle
IonCardSubtitle
IonCardContent
```

## Listas

```tsx
IonList
IonItem
IonLabel
IonItemSliding
```

## Navegación

```tsx
IonMenu
IonTabs
IonTabBar
IonTabButton
IonBackButton
IonBreadcrumbs
```

## Retroalimentación

```tsx
IonToast
IonAlert
IonLoading
IonSpinner
IonProgressBar
```

## Overlay

```tsx
IonModal
IonPopover
IonActionSheet
```

---

# 47. IonToast

Permite proporcionar retroalimentación.

```tsx
const [mostrarToast, setMostrarToast] =
  useState(false);
```

```tsx
<IonToast
  isOpen={mostrarToast}
  message="Recurso guardado correctamente"
  duration={2000}
  onDidDismiss={() =>
    setMostrarToast(false)
  }
/>
```

---

# 48. IonAlert

Útil para confirmar operaciones.

```tsx
<IonAlert
  isOpen={mostrarAlerta}
  header="Eliminar recurso"
  message="¿Desea eliminar este recurso?"
  buttons={[
    'Cancelar',
    {
      text: 'Eliminar',
      handler: eliminarRecurso
    }
  ]}
/>
```

Es apropiado para operaciones como:

```text
Eliminar
   ↓
Confirmar
   ↓
DELETE
```

---

# 49. IonModal

Puede utilizarse para mostrar formularios o información adicional.

```tsx
<IonModal
  isOpen={modalAbierto}
  onDidDismiss={() =>
    setModalAbierto(false)
  }
>
  ...
</IonModal>
```

---

# 50. Búsqueda

```tsx
const [busqueda, setBusqueda] =
  useState('');
```

```tsx
<IonSearchbar
  value={busqueda}
  onIonInput={(e) =>
    setBusqueda(
      e.detail.value ?? ''
    )
  }
/>
```

Filtrar:

```tsx
const filtrados =
  recursos.filter((recurso) =>
    recurso.titulo
      .toLowerCase()
      .includes(
        busqueda.toLowerCase()
      )
  );
```

---

# 51. Diseño responsive

Una aplicación Ionic debe adaptarse a:

```text
Móvil
Tablet
Desktop
```

Puede combinarse Ionic con CSS:

```css
.recursos {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {

  .recursos {
    grid-template-columns:
      repeat(2, 1fr);
  }

}
```

---

# 52. Tailwind CSS

También puede utilizarse Tailwind para layout y responsive.

```tsx
<div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-4
    p-4
  "
>
```

La responsabilidad puede dividirse así:

```text
Ionic
↓
Componentes

Tailwind
↓
Layout y estilos auxiliares
```

---

# 53. Capacitor

Capacitor permite acceder a funcionalidades nativas.

Ejemplos:

```text
Cámara
Geolocalización
Notificaciones
Sistema de archivos
Preferencias
Estado de red
Dispositivo
```

Arquitectura:

```text
React
  ↓
Ionic
  ↓
Capacitor
  ↓
Android / iOS
```

---

# 54. Ejemplo: Cámara

Instalar plugin:

```bash
npm install @capacitor/camera
```

Ejemplo:

```tsx
import {
  Camera,
  CameraResultType
} from '@capacitor/camera';

const tomarFoto = async () => {

  const foto = await Camera.getPhoto({

    quality: 90,

    resultType:
      CameraResultType.Uri

  });

  console.log(foto.webPath);

};
```

---

# 55. Flujo completo de una aplicación

Ejemplo:

```text
Usuario
  ↓
Página Ionic
  ↓
Evento
  ↓
Estado React
  ↓
Service
  ↓
Axios
  ↓
API REST
  ↓
Backend
  ↓
Base de Datos
  ↓
Respuesta JSON
  ↓
Axios
  ↓
setState()
  ↓
React vuelve a renderizar
  ↓
Usuario visualiza resultado
```

---

# 56. Ejemplo completo: listado de recursos

```tsx
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonSpinner
} from '@ionic/react';

import {
  useEffect,
  useState
} from 'react';

import api from '../services/api';

interface Recurso {

  id: number;
  titulo: string;
  descripcion: string;

}

const RecursosPage: React.FC = () => {

  const [recursos, setRecursos] =
    useState<Recurso[]>([]);

  const [cargando, setCargando] =
    useState<boolean>(false);

  const cargarRecursos = async () => {

    try {

      setCargando(true);

      const respuesta =
        await api.get('/recursos');

      setRecursos(respuesta.data);

    } catch (error) {

      console.error(
        'Error al obtener recursos',
        error
      );

    } finally {

      setCargando(false);

    }

  };

  useEffect(() => {

    cargarRecursos();

  }, []);

  return (

    <IonPage>

      <IonHeader>

        <IonToolbar>

          <IonTitle>
            Micro-recursos
          </IonTitle>

        </IonToolbar>

      </IonHeader>

      <IonContent>

        {cargando ? (

          <IonSpinner />

        ) : (

          recursos.map((recurso) => (

            <IonCard
              key={recurso.id}
            >

              <IonCardContent>

                <h2>
                  {recurso.titulo}
                </h2>

                <p>
                  {recurso.descripcion}
                </p>

              </IonCardContent>

            </IonCard>

          ))

        )}

      </IonContent>

    </IonPage>

  );

};

export default RecursosPage;
```

---

# 57. Ejemplo de formulario conectado a una API

```tsx
const CrearRecurso: React.FC = () => {

  const [titulo, setTitulo] =
    useState('');

  const [descripcion, setDescripcion] =
    useState('');

  const guardar = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();

    try {

      await api.post(
        '/recursos',
        {
          titulo,
          descripcion
        }
      );

      console.log(
        'Recurso creado'
      );

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <IonPage>

      <IonContent>

        <form onSubmit={guardar}>

          <IonInput
            label="Título"
            labelPlacement="stacked"
            value={titulo}
            onIonInput={(e) =>
              setTitulo(
                e.detail.value ?? ''
              )
            }
          />

          <IonTextarea
            label="Descripción"
            labelPlacement="stacked"
            value={descripcion}
            onIonInput={(e) =>
              setDescripcion(
                e.detail.value ?? ''
              )
            }
          />

          <IonButton
            type="submit"
            expand="block"
          >
            Guardar
          </IonButton>

        </form>

      </IonContent>

    </IonPage>

  );

};
```

---

# 58. CRUD completo

Una aplicación puede implementar las cuatro operaciones principales:

| Operación | HTTP | Ejemplo |
|---|---|---|
| Crear | POST | `/recursos` |
| Consultar | GET | `/recursos` |
| Actualizar | PUT/PATCH | `/recursos/:id` |
| Eliminar | DELETE | `/recursos/:id` |

Flujo:

```text
Ionic React
    ↓
Axios
    ↓
API REST
    ↓
CRUD
    ↓
Base de Datos
```

---

# 59. Buenas prácticas

Se recomienda:

- separar páginas y componentes;
- reutilizar componentes;
- utilizar TypeScript;
- evitar archivos excesivamente grandes;
- separar las llamadas HTTP de las páginas;
- utilizar servicios;
- controlar estados de carga;
- manejar errores;
- validar formularios;
- utilizar componentes Ionic;
- proteger las rutas;
- no almacenar contraseñas en frontend;
- no incluir claves privadas en el repositorio;
- mantener componentes con una responsabilidad clara;
- documentar las funcionalidades principales;
- mantener coherencia entre web y móvil.

---

# 60. Qué debería evitarse

## Toda la aplicación dentro de App.tsx

No recomendable:

```text
App.tsx
├── Login
├── Formulario
├── Recursos
├── Perfil
├── API
├── Validaciones
└── Navegación
```

Mejor:

```text
App.tsx
   ↓
Routes
   ↓
Pages
   ↓
Components
   ↓
Services
```

---

## Realizar todas las llamadas Axios dentro de cada componente

No recomendable:

```text
Componente
 ↓
Axios
```

Para proyectos medianos es preferible:

```text
Componente
 ↓
Service
 ↓
Axios
 ↓
API
```

---

## Reemplazar Ionic completamente por HTML

En una aplicación Ionic debería priorizarse:

```tsx
<IonButton>
  Guardar
</IonButton>
```

en lugar de utilizar sistemáticamente:

```html
<button>
  Guardar
</button>
```

Ionic proporciona componentes preparados para mantener consistencia entre plataformas.

---

# 61. Relación entre los conceptos principales

```text
                    APP
                     │
              Ionic + React
                     │
          ┌──────────┴──────────┐
          │                     │
        Pages              Components
          │                     │
          └──────────┬──────────┘
                     │
                    Props
                     │
                  useState
                     │
                   Events
                     │
                 Formularios
                     │
                  Services
                     │
                   Axios
                     │
                 API REST
                     │
                  Backend
                     │
               Base de Datos
```

---

# 62. Conceptos que debería dominar un estudiante

Al finalizar el desarrollo frontend con Ionic + React debería poder explicar y utilizar:

1. **Componentes**
2. **Páginas**
3. **Props**
4. **Estado (`useState`)**
5. **Eventos**
6. **Renderizado condicional**
7. **Listas y `map()`**
8. **Formularios**
9. **Validaciones**
10. **`useEffect`**
11. **React Router**
12. **Rutas públicas y protegidas**
13. **Navegación por roles**
14. **Interfaces de TypeScript**
15. **Servicios**
16. **Axios o Fetch**
17. **API REST**
18. **GET, POST, PUT/PATCH y DELETE**
19. **Manejo de errores**
20. **Estados de carga**
21. **Autenticación**
22. **JWT**
23. **Interceptores**
24. **Context API**
25. **Local Storage / almacenamiento**
26. **Componentes Ionic**
27. **Diseño responsive**
28. **Capacitor**
29. **Integración Web + Móvil**
30. **Organización modular del proyecto**