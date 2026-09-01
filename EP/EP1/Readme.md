# Plataforma Educativa Adaptativa para la Selección de Micro-Recursos según Preferencias de Aprendizaje

# Presentado por:
- Pepo Mendoza
- Pepa Palacios

##  Índice
1. [Justificación del problema](#justificación-del-problema)
2. [Usuarios](#usuarios-objetivo-quién-usará-la-aplicación)
    - [Roles](#roles-del-sistema)
    - [Proto-personas](#proto-personas)
3. [Requerimientos](#requerimientos)
4. [Arquitectura de la Información/ UX](#arquitectura-de-navegación)
    - [Diferenciación x roles](#diferenciación-de-acceso-según-roles)
    - [Flujos principales Tareas](#flujos-de-tareas)
    - [Puntos críticos de interacción](#puntos-críticos-de-interacción)
    - [Justificación Técnica](#justificación-técnica)
5. [Bocetos UX/UI](#bocetos-uiux)
6. [Frontend con Ionic-React]()

## Justificación del problema
En los entornos de aprendizaje digital, los estudiantes pueden acceder a una amplia variedad de recursos educativos, tales como textos, imágenes, videos, audios, actividades interactivas y otros contenidos multimedia. Sin embargo, la disponibilidad de diferentes formatos no implica necesariamente que los recursos sean organizados o presentados considerando las características y preferencias de los estudiantes.

Una de las dificultades existentes corresponde a que un mismo contenido educativo puede ser representado de distintas formas, mientras que las plataformas tradicionales tienden a presentar los recursos de manera homogénea para todos los usuarios. Esto puede dificultar la selección de materiales adecuados y generar experiencias de aprendizaje poco personalizadas.

Además, en contextos donde los estudiantes utilizan tanto computadores como dispositivos móviles, existe la necesidad de disponer de recursos breves, estructurados y accesibles desde diferentes dispositivos. El microaprendizaje constituye una alternativa para organizar contenidos en unidades pequeñas y focalizadas, denominadas micro-recursos, que pueden ser consultadas de manera independiente y utilizadas en diferentes momentos del proceso de aprendizaje.

En este contexto, el problema abordado por el proyecto corresponde a la necesidad de **gestionar y organizar micro-recursos educativos y facilitar su presentación de acuerdo con determinadas preferencias de representación del contenido del estudiante**.

Para ello, se propone considerar un mecanismo de caracterización que permita obtener un perfil inicial del estudiante y utilizar dicha información para seleccionar o priorizar recursos con diferentes tipos de representación, tales como contenido visual, textual, auditivo o práctico/interactivo.

La propuesta no supone que un estudiante aprenda exclusivamente mediante una determinada modalidad. El perfil se utilizará como un mecanismo de apoyo para la organización y personalización de los recursos disponibles.

Por lo tanto, el desarrollo de una plataforma web y móvil permitiría centralizar la gestión de los micro-recursos, facilitar su consulta desde diferentes dispositivos y proporcionar una experiencia de interacción diferenciada entre estudiantes y docentes.

---
## Usuarios objetivo (Quién usará la aplicación)
La aplicación considera principalmente dos grupos de usuarios: **estudiantes y docentes**. Adicionalmente, se considera un rol de administración para la gestión general de la plataforma.
### Estudiantes
Los estudiantes corresponden a los principales usuarios de la plataforma. Se considera que constituyen un grupo diverso respecto de sus características, experiencias, ritmos de aprendizaje y necesidades de apoyo.

Dentro de este grupo pueden existir estudiantes que:

- avanzan a diferentes ritmos a través de los contenidos;
- requieren revisar un concepto más de una vez;
- necesitan segmentar contenidos extensos en unidades más pequeñas;
- presentan diferentes preferencias respecto a la representación de la información;
- requieren ejemplos adicionales antes de realizar una actividad;
- se benefician de actividades prácticas o interactivas;
- requieren una estructura clara y predecible de navegación;
- necesitan reducir la cantidad de información presentada simultáneamente;
- utilizan diferentes dispositivos para acceder a los contenidos;
- presentan diferentes niveles de experiencia con plataformas educativas;
- pueden requerir estrategias de aprendizaje o apoyos adicionales.

La población objetivo considera también a **estudiantes neurodivergentes**, reconociendo que pueden existir diferentes formas de procesar información, gestionar la atención, organizar tareas e interactuar con los contenidos digitales.

La plataforma deberá evitar asumir que existe una única forma adecuada de aprender. En su lugar, deberá ofrecer diferentes alternativas de representación, navegación y acceso a los contenidos.

#### Necesidades principales

Entre las necesidades identificadas para este grupo se encuentran:

- acceder a contenidos breves y claramente estructurados;
- avanzar a través de los contenidos a un ritmo flexible;
- poder revisar nuevamente recursos previamente consultados;
- recibir contenidos mediante diferentes formas de representación;
- disponer de instrucciones claras y concretas;
- reducir la sobrecarga de información en una misma pantalla;
- conocer el progreso realizado;
- identificar fácilmente qué actividad realizar a continuación;
- acceder a la plataforma desde dispositivos móviles y computadores;
- disponer de una navegación consistente y predecible.
### Docentes
Los docentes constituyen el segundo grupo de usuarios del sistema. Su función principal será administrar los micro-recursos educativos disponibles en la plataforma.

A diferencia del estudiante, el docente tendrá acceso a funcionalidades relacionadas con la creación y mantenimiento de contenidos.

---
## Roles del Sistema
- **Administrador**: Usuario encargado de la gestión general de la plataforma.
- **Estudiante**: Puede crear, editar y eliminar productos.
- **Docente**: Usuario encargado de administrar contenidos educativos.

### Definición de conceptos
**Rol**: Define qué puede hacer un usuario dentro del sistema.
**Proto-persona**: Describe quién podría ser ese usuario, sus características, necesidades, objetivos, dificultades y contexto de uso.

**Por ejemplo** 
*Rol*: Estudiante
*Proto-persona*: Estudiante universitario de 20 años que utiliza principalmente su teléfono móvil, dispone de poco tiempo continuo para estudiar y prefiere consultar contenidos breves durante sus desplazamientos.

---
## Proto-personas
Las siguientes proto-personas corresponden a **perfiles hipotéticos** construidos a partir del análisis del problema y de las características esperadas de los usuarios de la plataforma.**No representan resultados obtenidos** directamente de usuarios reales, sino una caracterización preliminar utilizada para orientar las decisiones de diseño y desarrollo.

---
### Proto-persona 1: Estudiante con ritmo de aprendizaje autónomo

**Nombre ficticio:** Camila  
**Tipo de usuario o rol:** Estudiante

#### Características generales

Camila es estudiante universitaria y utiliza habitualmente plataformas digitales para acceder a materiales académicos. Combina el uso de computador portátil y teléfono móvil dependiendo del lugar y del momento en que estudia.

Prefiere organizar de manera autónoma sus sesiones de estudio y suele revisar contenidos en períodos breves de tiempo. Algunos temas los comprende rápidamente, mientras que otros requieren varias revisiones o ejemplos adicionales.

#### Necesidades principales

- Acceder rápidamente a contenidos breves y organizados.
- Identificar qué recursos están relacionados con los contenidos que debe estudiar.
- Poder avanzar a su propio ritmo.
- Revisar nuevamente recursos previamente consultados.
- Encontrar diferentes formas de representación de un mismo contenido.
- Conocer su progreso dentro de la plataforma.

#### Objetivos de uso

Utilizar la plataforma como apoyo a sus actividades académicas, consultar micro-recursos relacionados con los contenidos que está estudiando y acceder a materiales que pueda revisar en períodos breves.

#### Dificultades o puntos de frustración

Puede presentar dificultades cuando:

- existe demasiada información simultáneamente en una pantalla;
- las instrucciones son extensas o poco claras;
- no puede identificar fácilmente qué actividad realizar a continuación;
- tiene que repetir todo un proceso para volver a consultar un contenido;
- la experiencia móvil es diferente o más limitada que la versión web.

#### Funcionalidades de la aplicación que utilizaría

- Cuestionario de caracterización.
- Visualización de su perfil.
- Recursos priorizados.
- Consulta de micro-recursos.
- Visualización de diferentes representaciones del contenido.
- Registro y consulta de progreso.
- Revisión de recursos previamente utilizados.

#### Dispositivo y contexto probable de acceso

Utilizaría principalmente un **teléfono móvil y un computador portátil**.

Podría acceder durante clases, sesiones de estudio autónomo, períodos de traslado o pequeños intervalos de tiempo disponibles durante el día.

---
### Proto-persona 2: Estudiante con necesidades de apoyo en atención y organización

**Nombre ficticio:** Martín  
**Tipo de usuario o rol:** Estudiante

#### Características generales

Martín es estudiante universitario y presenta necesidades particulares relacionadas con la organización de las actividades, el mantenimiento de la atención y la gestión de información extensa.

Se beneficia de contenidos divididos en segmentos pequeños, instrucciones concretas, estructuras de navegación predecibles y retroalimentación frecuente.

Puede requerir diferentes estrategias para comprender un contenido, tales como representaciones visuales, ejemplos, actividades prácticas, resúmenes o repetición de determinados conceptos.

Esta proto-persona busca representar a estudiantes que pueden presentar características asociadas a la neurodivergencia, sin asumir que la plataforma realiza diagnósticos o clasificaciones clínicas.

#### Necesidades principales

- Contenidos organizados en unidades pequeñas.
- Instrucciones claras y breves.
- Reducción de información innecesaria en pantalla.
- Navegación consistente y predecible.
- Posibilidad de detener y continuar posteriormente una actividad.
- Diferentes estrategias para abordar un mismo concepto.
- Retroalimentación sobre las actividades realizadas.
- Visualización clara de su progreso.

#### Objetivos de uso

Utilizar la plataforma para estudiar contenidos académicos de manera estructurada, completar pequeñas actividades y disponer de diferentes alternativas cuando una primera representación del contenido no resulte suficiente.

#### Dificultades o puntos de frustración

Puede experimentar dificultades frente a:

- pantallas con demasiados elementos;
- instrucciones extensas;
- actividades sin una secuencia clara;
- cambios frecuentes en la ubicación de botones o elementos de navegación;
- contenidos excesivamente largos;
- ausencia de retroalimentación después de realizar una acción;
- pérdida del progreso cuando interrumpe una sesión.

#### Funcionalidades de la aplicación que utilizaría

- Cuestionario de caracterización.
- Perfil de preferencias y necesidades de apoyo.
- Micro-recursos segmentados.
- Diferentes representaciones de un mismo contenido.
- Recursos priorizados.
- Registro automático del progreso.
- Continuación de actividades pendientes.
- Revisión de recursos previamente utilizados.

#### Dispositivo y contexto probable de acceso

Utilizaría principalmente un **computador portátil y un teléfono móvil**.

Podría utilizar la plataforma tanto durante actividades académicas como durante sesiones de estudio autónomo. Las sesiones pueden ser breves e interrumpidas, por lo que necesita poder retomar fácilmente una actividad.

---

### Proto-persona 3: Docente creador y gestor de micro-recursos

**Nombre ficticio:** Rodrigo  
**Tipo de usuario o rol:** Docente

#### Características generales

Rodrigo es docente universitario y utiliza diferentes plataformas digitales para organizar y distribuir materiales académicos.

Trabaja habitualmente desde un computador y posee experiencia utilizando sistemas de gestión del aprendizaje. Necesita transformar algunos de sus materiales existentes en recursos más breves y estructurados.

Considera que un mismo contenido puede requerir diferentes explicaciones o representaciones dependiendo de las necesidades de los estudiantes.

#### Necesidades principales

- Crear micro-recursos de manera sencilla.
- Organizar los contenidos por temática.
- Clasificar los recursos según su forma de representación.
- Asociar estrategias de apoyo a determinados recursos.
- Modificar contenidos existentes.
- Consultar los recursos disponibles.
- Identificar cómo se encuentran organizados los recursos dentro de la plataforma.

#### Objetivos de uso

Gestionar un conjunto de micro-recursos educativos que puedan ser utilizados por los estudiantes y proporcionar diferentes alternativas para abordar los contenidos académicos.

#### Dificultades o puntos de frustración

Puede presentar frustración cuando:

- crear un recurso requiere demasiados pasos;
- debe ingresar repetidamente la misma información;
- no puede encontrar rápidamente un recurso existente;
- la clasificación de los contenidos no es clara;
- no puede modificar fácilmente un recurso;
- la plataforma no muestra claramente si una operación fue realizada correctamente.

#### Funcionalidades de la aplicación que utilizaría

- Consulta de micro-recursos.
- Creación de micro-recursos.
- Modificación de micro-recursos.
- Eliminación de micro-recursos.
- Clasificación por temática.
- Asociación de tipos de representación.
- Asociación de estrategias de apoyo.
- Consulta de información relacionada con el uso de los recursos.

#### Dispositivo y contexto probable de acceso

Utilizaría principalmente un **computador de escritorio o portátil** durante la preparación de actividades académicas y la gestión de contenidos.

Podría utilizar algunas funcionalidades de consulta desde un dispositivo móvil, pero las tareas de creación y edición de recursos se realizarían principalmente desde un computador.

## Requerimientos

## Requerimientos Funcionales por Rol
Un requerimiento funcional (RF) describe qué debe hacer el sistema. Representa una funcionalidad, servicio, comportamiento o acción que la aplicación debe proporcionar a *uno o más roles*.

| ID | Requerimiento funcional | Rol |
|---|---|---|
| **RF-01** | El sistema deberá permitir al estudiante completar un instrumento de caracterización para identificar preferencias de representación del contenido y necesidades de apoyo al aprendizaje. | Estudiante |
| **RF-02** | El sistema deberá generar y almacenar un perfil del estudiante a partir de la información obtenida en el proceso de caracterización. | Estudiante |
| **RF-03** | El sistema deberá permitir al estudiante consultar su perfil, mostrando las preferencias y estrategias de apoyo consideradas para la personalización de los contenidos. | Estudiante |
| **RF-04** | El sistema deberá seleccionar y priorizar micro-recursos educativos considerando el perfil del estudiante, sus preferencias de representación y las estrategias de apoyo definidas. | Estudiante |
| **RF-05** | El sistema deberá permitir al estudiante consultar micro-recursos educativos mediante diferentes formas de representación, tales como texto, elementos visuales, recursos audiovisuales, ejemplos o actividades interactivas. | Estudiante |
| **RF-06** | El sistema deberá registrar el progreso del estudiante sobre los micro-recursos utilizados y permitirle revisar recursos previamente consultados o continuar actividades pendientes. | Estudiante |
| **RF-07** | El sistema deberá permitir al docente gestionar los micro-recursos educativos, incluyendo su creación, consulta, modificación y eliminación, así como su clasificación según contenido, tipo de representación y estrategia de apoyo. | Docente |

---

### Funcionalidades Transversales

Las siguientes funcionalidades son necesarias para el funcionamiento general de la aplicación, pero no forman parte de los siete requerimientos funcionales principales del dominio.

- **FT-01:** El sistema deberá permitir el registro de usuarios.
- **FT-02:** El sistema deberá permitir a los usuarios iniciar sesión mediante sus credenciales.
- **FT-03:** El sistema deberá permitir cerrar una sesión activa.
- **FT-04:** El sistema deberá restringir las funcionalidades disponibles de acuerdo con el rol del usuario autenticado.

---


## Requerimientos No Funcionales

Los requerimientos no funcionales establecen condiciones de calidad que deberá cumplir la plataforma.

### UX y Usabilidad

#### RNF-UX-01 — Diseño adaptable

La interfaz deberá adaptarse a dispositivos móviles y de escritorio, manteniendo accesibles las funcionalidades principales y evitando pérdida de información.

#### RNF-UX-02 — Navegación consistente

La aplicación deberá mantener patrones de navegación consistentes y predecibles entre sus diferentes vistas, evitando cambios innecesarios en la ubicación o comportamiento de los controles principales.

#### RNF-UX-03 — Reducción de carga cognitiva

Las interfaces deberán evitar presentar cantidades excesivas de información simultáneamente y deberán organizar los contenidos utilizando secciones, jerarquías visuales y microcontenidos claramente diferenciados.

#### RNF-UX-04 — Retroalimentación al usuario

Las acciones realizadas por el usuario deberán proporcionar retroalimentación visual clara sobre su estado, incluyendo operaciones exitosas, errores, procesos en ejecución y actividades completadas.

#### RNF-UX-05 — Flexibilidad en el ritmo de interacción

La plataforma deberá permitir que el estudiante avance a su propio ritmo, pueda volver a consultar recursos previamente utilizados y continúe posteriormente actividades que no haya finalizado.

---

### Accesibilidad

#### RNF-ACC-01 — Claridad del contenido

Los textos, instrucciones y mensajes de la aplicación deberán utilizar lenguaje claro, directo y comprensible, evitando instrucciones innecesariamente extensas o ambiguas.

#### RNF-ACC-02 — Jerarquía visual

Las interfaces deberán mantener una jerarquía visual clara mediante títulos, subtítulos, agrupación de información y diferenciación de los elementos interactivos.

#### RNF-ACC-03 — Alternativas de representación

Cuando sea pertinente, los contenidos educativos deberán poder presentarse mediante más de una forma de representación, evitando depender exclusivamente de un único formato.

#### RNF-ACC-04 — Interacción comprensible

Los botones, formularios, menús y demás controles interactivos deberán estar claramente identificados y mantener un comportamiento consistente en toda la aplicación.

---

### Seguridad

#### RNF-SEG-01 — Protección de contraseñas

Las contraseñas deberán almacenarse utilizando un mecanismo seguro de hash y nunca deberán ser almacenadas en texto plano.

#### RNF-SEG-02 — Autenticación

El acceso a funcionalidades protegidas deberá requerir que el usuario se encuentre correctamente autenticado.

#### RNF-SEG-03 — Autorización por roles

El sistema deberá verificar el rol del usuario antes de permitir el acceso a funcionalidades restringidas.

Por ejemplo:

- el **estudiante** podrá consultar y utilizar micro-recursos;
- el **docente** podrá crear, modificar y eliminar micro-recursos;
- un estudiante no podrá acceder a las funcionalidades de gestión exclusivas del docente.

#### RNF-SEG-04 — Validación de datos

Los datos ingresados desde la interfaz deberán ser validados tanto en el frontend como en el backend antes de ser procesados o almacenados.

#### RNF-SEG-05 — Privacidad de la caracterización

La información obtenida mediante la caracterización del estudiante deberá utilizarse únicamente para las funcionalidades educativas y de personalización definidas por la plataforma.

La aplicación no deberá presentar los resultados de caracterización como un diagnóstico clínico ni utilizarlos para inferir una condición de neurodivergencia.

#### RNF-SEG-06 — Protección de información sensible

Las credenciales, claves de API, secretos y configuraciones sensibles no deberán almacenarse directamente en el código fuente ni publicarse en el repositorio.

---

### Rendimiento

#### RNF-REN-01 — Rendimiento de las operaciones de consulta
Las operaciones habituales de consulta deberán ejecutarse de manera fluida y estable, sin provocar bloqueos de la interfaz ni interrupciones en la interacción del usuario, bajo las condiciones normales definidas para las pruebas del sistema.

#### RNF-REN-02 — Transferencia de información

La aplicación deberá solicitar al backend únicamente los datos necesarios para la funcionalidad o vista utilizada por el usuario.

#### RNF-REN-03 — Carga de micro-recursos

La carga de imágenes, videos u otros recursos multimedia no deberá bloquear la navegación ni impedir la interacción con las demás funcionalidades de la aplicación.

## Requerimientos No Funcionales

### RNF-01: Tiempo de respuesta
- El sistema debe responder a solicitudes de registro, edición o búsqueda en tiempos de respuesta adecuados de la navegación, consulta de micro-recursos y ejecución de las funcionalidades principales, evitando demoras perceptibles que interrumpan la continuidad de la interacción del usuario.

### RNF-02: Seguridad
- Solo usuarios autenticados pueden gestionar productos.
- Debe haber control de roles: administrador, editor, visualizador.

### RNF-03: Usabilidad
- La interfaz debe ser intuitiva y fácil de usar.
- Debe seguir principios de diseño responsive para adaptarse a pantallas móviles y de escritorio.

### RNF-04: Compatibilidad
- El sistema debe funcionar correctamente en los siguientes navegadores:
  - Google Chrome (última versión)
  - Mozilla Firefox
  - Microsoft Edge
  - Safari

### RNF-05: Escalabilidad
- El sistema deberá utilizar una arquitectura modular que permita incrementar el volumen de usuarios, micro-recursos y operaciones, facilitando futuras mejoras en infraestructura o capacidad de procesamiento sin modificar la lógica principal de la aplicación.
---
## Arquitectura de Navegación
### 1. Rutas principales y secundarias

La aplicación considera rutas públicas y rutas protegidas.

#### Rutas públicas

| Ruta | Vista | Descripción |
|---|---|---|
| `/login` | Inicio de sesión | Permite al usuario ingresar al sistema mediante sus credenciales. |
| `/registro` | Registro | Permite crear una nueva cuenta de usuario. |

#### Rutas protegidas del Estudiante

| Ruta | Vista | Descripción |
|---|---|---|
| `/estudiante/inicio` | Inicio | Presenta un resumen general y accesos a las funcionalidades principales. |
| `/estudiante/caracterizacion` | Caracterización | Permite responder el instrumento de caracterización. |
| `/estudiante/perfil` | Perfil | Presenta las preferencias y necesidades de apoyo identificadas. |
| `/estudiante/recursos` | Micro-recursos | Presenta los recursos disponibles y priorizados. |
| `/estudiante/recursos/:id` | Detalle de recurso | Permite visualizar un micro-recurso seleccionado. |
| `/estudiante/progreso` | Progreso | Permite consultar actividades realizadas, pendientes y recursos previamente utilizados. |

#### Rutas protegidas del Docente

| Ruta | Vista | Descripción |
|---|---|---|
| `/docente/inicio` | Inicio docente | Presenta un resumen de las funcionalidades disponibles. |
| `/docente/recursos` | Gestión de recursos | Permite consultar los micro-recursos existentes. |
| `/docente/recursos/nuevo` | Crear recurso | Permite registrar un nuevo micro-recurso. |
| `/docente/recursos/:id/editar` | Editar recurso | Permite modificar un recurso existente. |

#### Rutas protegidas del Administrador

| Ruta | Vista | Descripción |
|---|---|---|
| `/admin/inicio` | Inicio administrador | Presenta las opciones generales de administración. |
| `/admin/usuarios` | Gestión de usuarios | Permite consultar y administrar los usuarios registrados. |

### 2. Relaciones jerárquicas entre vistas
La aplicación se organiza mediante una estructura jerárquica en la que las funcionalidades disponibles dependen del rol del usuario autenticado.

```text
Aplicación
│
├── Rutas públicas
│   ├── Login
│   └── Registro
│
└── Rutas protegidas
    │
    ├── Estudiante
    │   ├── Inicio
    │   ├── Caracterización
    │   ├── Perfil
    │   ├── Micro-recursos
    │   │   └── Detalle del micro-recurso
    │   └── Progreso
    │
    ├── Docente
    │   ├── Inicio
    │   └── Gestión de micro-recursos
    │       ├── Listar
    │       ├── Crear
    │       └── Editar
    │
    └── Administrador
        ├── Inicio
        └── Gestión de usuarios
```
---
## Diferenciación de acceso según roles

La aplicación deberá controlar el acceso a las diferentes funcionalidades de acuerdo con el rol del usuario autenticado. Esta diferenciación permitirá que cada tipo de usuario visualice y utilice únicamente las funciones asociadas a sus responsabilidades dentro del sistema.

Se consideran los siguientes roles principales:

- **Estudiante**
- **Docente**
- **Administrador**

### Matriz de acceso por rol

| Funcionalidad | Estudiante | Docente | Administrador |
|---|:---:|:---:|:---:|
| Responder cuestionario de caracterización | ✓ | — | — |
| Consultar perfil de aprendizaje | ✓ | — | — |
| Consultar micro-recursos educativos | ✓ | ✓ | — |
| Visualizar detalle de un micro-recurso | ✓ | ✓ | — |
| Consultar progreso personal | ✓ | — | — |
| Revisar recursos previamente utilizados | ✓ | — | — |
| Crear micro-recursos | — | ✓ | — |
| Modificar micro-recursos | — | ✓ | — |
| Eliminar micro-recursos | — | ✓ | — |
| Clasificar micro-recursos | — | ✓ | — |
| Gestionar usuarios | — | — | ✓ |
| Gestionar roles | — | — | ✓ |
| Administrar configuraciones generales | — | — | ✓ |

---

### Acceso del Estudiante

El estudiante tendrá acceso a las funcionalidades relacionadas con su proceso de aprendizaje.

Podrá:

- completar el cuestionario de caracterización;
- consultar su perfil;
- visualizar micro-recursos educativos;
- acceder a recursos priorizados de acuerdo con su perfil;
- consultar diferentes representaciones del contenido;
- revisar su progreso;
- retomar actividades pendientes;
- consultar recursos previamente utilizados.

El estudiante no podrá crear, modificar o eliminar micro-recursos ni acceder a funciones administrativas.

---

### Acceso del Docente

El docente tendrá acceso a las funcionalidades relacionadas con la gestión de los contenidos educativos.

Podrá:

- consultar los micro-recursos registrados;
- crear nuevos micro-recursos;
- modificar recursos existentes;
- eliminar recursos;
- clasificar recursos según contenido, tipo de representación o estrategia de apoyo;
- consultar información general asociada a los recursos.

El docente no podrá modificar información administrativa del sistema ni acceder a funcionalidades exclusivas del administrador.

---

### Acceso del Administrador

El administrador será responsable de las funciones generales de gestión del sistema.

Podrá:

- consultar usuarios registrados;
- gestionar cuentas de usuario;
- asignar o modificar roles;
- administrar parámetros generales de la aplicación.

El administrador no tendrá como función principal desarrollar actividades de aprendizaje ni gestionar contenidos educativos, salvo que el diseño del sistema establezca explícitamente permisos adicionales.

---

### Control de acceso a rutas

La diferenciación por roles deberá aplicarse tanto en la interfaz como en las rutas de la aplicación.

Por ejemplo:

```text
/login
/registro

/estudiante/inicio
/estudiante/perfil
/estudiante/recursos
/estudiante/progreso

/docente/inicio
/docente/recursos
/docente/recursos/nuevo
/docente/recursos/:id/editar

/admin/inicio
/admin/usuarios
```
---
## Flujos de Tareas
Los flujos de tareas (*task flows*) representan la secuencia de acciones que realiza un usuario para completar una actividad específica dentro de la aplicación.

Para este caso de estudio se consideran dos flujos principales: uno asociado al rol **Estudiante** y otro al rol **Docente**.
---
---

### Task Flow 1: Caracterización y acceso a micro-recursos personalizados

**Rol:** Estudiante

**Objetivo:** completar el proceso de caracterización y acceder a micro-recursos priorizados de acuerdo con su perfil.

```text
Inicio de sesión
      ↓
Inicio del estudiante
      ↓
¿Existe caracterización previa?
      ↓
     No
      ↓
Iniciar cuestionario
      ↓
Responder preguntas
      ↓
Visualizar progreso del cuestionario
      ↓
Finalizar cuestionario
      ↓
Generar perfil
      ↓
Visualizar resultado
      ↓
Consultar micro-recursos
      ↓
Visualizar recursos priorizados
      ↓
Seleccionar micro-recurso
      ↓
Visualizar contenido
      ↓
Completar micro-recurso
      ↓
Registrar progreso
```
---

### Task Flow 2: Creación y gestión de un micro-recurso educativo

**Rol:** Docente

**Objetivo:** registrar y configurar un nuevo micro-recurso educativo para que posteriormente pueda ser utilizado por los estudiantes.

```text
Inicio de sesión
      ↓
Inicio del docente
      ↓
Gestión de micro-recursos
      ↓
Consultar recursos existentes
      ↓
Seleccionar "Nuevo recurso"
      ↓
Ingresar información del recurso
      ↓
Definir contenido o temática
      ↓
Seleccionar tipo de representación
      ↓
Seleccionar estrategia de apoyo
      ↓
Revisar información
      ↓
Guardar recurso
      ↓
¿Datos válidos?
   ↓          ↓
  No          Sí
   ↓           ↓
Mostrar      Registrar
errores      recurso
               ↓
        Mostrar confirmación
               ↓
        Volver al listado
```
---
### Puntos críticos de interacción
Los puntos críticos de interacción corresponden a aquellas acciones o momentos del sistema en los que una interfaz poco clara, una validación insuficiente o una navegación compleja puede afectar significativamente la experiencia del usuario.

Para este caso de estudio se identifican los siguientes puntos críticos:

1. **Inicio de sesión y acceso según rol**: El sistema deberá informar claramente cuando las credenciales ingresadas sean incorrectas y, una vez autenticado el usuario, deberá redirigirlo automáticamente a la vista correspondiente a su rol. También deberá impedir el acceso a rutas no autorizadas.

2. **Cuestionario de caracterización**: El proceso de caracterización deberá presentar instrucciones claras, indicar el avance del estudiante y evitar mostrar demasiadas preguntas simultáneamente. Además, se deberá reducir el riesgo de pérdida accidental de respuestas cuando el usuario cambie de vista o interrumpa la actividad.

3. **Presentación del perfil del estudiante**: Los resultados de la caracterización deberán presentarse mediante lenguaje comprensible y una organización visual clara. La información mostrada deberá utilizarse con fines de personalización educativa y no deberá presentarse como un diagnóstico clínico o una clasificación de neurodivergencia.

4. **Selección de micro-recursos**: Los recursos priorizados deberán diferenciarse claramente de los demás recursos disponibles, indicando por qué pueden ser pertinentes para el estudiante. La priorización no deberá impedir que el usuario explore otros recursos o representaciones del contenido.

5. **Visualización de micro-recursos**: La interfaz deberá evitar una cantidad excesiva de información simultánea y priorizar el contenido principal. Cuando sea posible, los recursos deberán ofrecer diferentes formas de representación y permitir al estudiante avanzar a su propio ritmo.

6. **Registro y recuperación del progreso**: El sistema deberá informar claramente cuando una actividad haya sido completada y registrar el progreso del estudiante. Cuando una actividad quede pendiente, el usuario deberá poder retomarla posteriormente sin repetir innecesariamente los pasos ya completados.

7. **Cambio entre versión web y móvil**: La ubicación de los componentes puede variar según el dispositivo, pero las funcionalidades, etiquetas y patrones principales de interacción deberán mantenerse consistentes. El usuario no debería necesitar aprender nuevamente el funcionamiento de la aplicación al cambiar entre computador y dispositivo móvil.
---
### Justificación Técnica
La arquitectura de navegación fue diseñada considerando criterios de **usabilidad, eficiencia de interacción, claridad estructural y escalabilidad**, con el propósito de facilitar el acceso a las funcionalidades de acuerdo con las necesidades y el rol de cada usuario.

### Usabilidad
Se propone una navegación simple, consistente y predecible, manteniendo patrones similares entre las distintas vistas de la aplicación. En el caso de los estudiantes, se prioriza una presentación progresiva de la información, microcontenidos y una baja carga cognitiva, considerando diferentes ritmos y necesidades de aprendizaje.

### Eficiencia de interacción
Las funcionalidades principales estarán disponibles mediante recorridos breves, evitando pasos innecesarios. La navegación permitirá acceder directamente a recursos, progreso y perfil desde las vistas principales. Además, el sistema conservará el progreso del estudiante para facilitar la continuidad de actividades.

### Claridad estructural
Las vistas se organizarán jerárquicamente según los roles **Estudiante, Docente y Administrador**, diferenciando rutas públicas y protegidas. Cada módulo agrupará funcionalidades relacionadas, facilitando que el usuario identifique dónde realizar cada tarea.

La estructura general considera:

```text
Rutas públicas
├── Login
└── Registro

Rutas protegidas
├── Estudiante
│   ├── Inicio
│   ├── Perfil
│   ├── Micro-recursos
│   └── Progreso
│
├── Docente
│   ├── Inicio
│   └── Gestión de micro-recursos
│
└── Administrador
    ├── Inicio
    └── Gestión de usuarios
```
---
## Bocetos UI/UX
[Figma - Prototipo de UI/UX](https://www.figma.com/design/P5ZCkmvzJPXbf0Q4MrjiHx/Dise%C3%B1oprototipos?node-id=0-1&t=yTsY3fzxhUPc6GON-1)

---
## Liberías usadas con React
- 

## Tecnologías
- **Ionic Framework** (v7+)
- **React**
- **TypeScript**
- **Capacitor** (para plugins nativos, si aplica)