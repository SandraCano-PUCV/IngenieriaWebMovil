# Dominios, DNS y configuración con Cloudflare

> Guía práctica para comprender la estructura de un dominio, configurar registros DNS y publicar un sitio web de forma segura.

## Índice

1. [Qué es un dominio](#qué-es-un-dominio)
2. [Estructura de un nombre de dominio](#estructura-de-un-nombre-de-dominio)
3. [Dominio, URL, sitio web y hosting](#dominio-url-sitio-web-y-hosting)
4. [Actores involucrados](#actores-involucrados)
5. [Qué es DNS](#qué-es-dns)
6. [Cómo se resuelve un dominio](#cómo-se-resuelve-un-dominio)
7. [Zona DNS y servidores autoritativos](#zona-dns-y-servidores-autoritativos)
8. [Registros DNS principales](#registros-dns-principales)
9. [TTL y caché DNS](#ttl-y-caché-dns)
10. [Ejemplo de una zona DNS](#ejemplo-de-una-zona-dns)
11. [Qué es Cloudflare](#qué-es-cloudflare)
12. [Configuración inicial con Cloudflare](#configuración-inicial-con-cloudflare)
13. [Proxy de Cloudflare y DNS Only](#proxy-de-cloudflare-y-dns-only)
14. [HTTPS y SSL/TLS](#https-y-ssltls)
15. [DNSSEC](#dnssec)
16. [DNS para correo electrónico](#dns-para-correo-electrónico)
17. [Subdominios recomendados](#subdominios-recomendados)
18. [Arquitecturas comunes](#arquitecturas-comunes)
19. [Seguridad del dominio](#seguridad-del-dominio)
20. [Errores frecuentes](#errores-frecuentes)
21. [Comandos de diagnóstico](#comandos-de-diagnóstico)
22. [Lista de verificación](#lista-de-verificación)
23. [Glosario](#glosario)
24. [Fuentes oficiales](#fuentes-oficiales)

---

## Qué es un dominio

Un **nombre de dominio** es un identificador legible por personas que permite localizar servicios en Internet.

Ejemplos:

```text
ejemplo.com
universidad.cl
robotica.education
```

Los computadores se comunican mediante direcciones IP, mientras que las personas utilizan nombres. El sistema DNS relaciona ambos.

```text
ejemplo.com → 203.0.113.10
```

Un dominio puede utilizarse para distintos servicios:

- sitio web;
- correo electrónico;
- API;
- plataforma educativa;
- repositorio;
- servidor de archivos;
- aplicaciones internas o públicas.

---

## Estructura de un nombre de dominio

Considérese el siguiente nombre:

```text
aula.robotica.ejemplo.cl.
```

Su lectura jerárquica se realiza de derecha a izquierda:

```text
. → cl → ejemplo → robotica → aula
```

| Parte | Ejemplo | Descripción |
|---|---|---|
| Raíz DNS | `.` | Nivel superior de toda la jerarquía DNS. Normalmente no se escribe. |
| Dominio de nivel superior | `.cl` | TLD asociado en este caso a Chile. |
| Dominio registrable | `ejemplo.cl` | Nombre registrado por una persona u organización. |
| Subdominio | `robotica.ejemplo.cl` | División creada dentro del dominio registrable. |
| Host o subdominio adicional | `aula.robotica.ejemplo.cl` | Nombre utilizado para identificar un servicio concreto. |

### TLD

TLD significa **Top-Level Domain** o dominio de nivel superior.

Ejemplos:

```text
.com
.org
.net
.edu
.cl
.io
.dev
```

Existen, entre otros:

- **gTLD:** dominios genéricos, como `.com`, `.org` o `.education`;
- **ccTLD:** dominios asociados a países o territorios, como `.cl`, `.es` o `.br`.

### Dominio raíz o apex

El **apex**, raíz o vértice de la zona es el dominio sin un subdominio delante:

```text
ejemplo.cl
```

En paneles DNS suele representarse mediante:

```text
@
```

Por ejemplo:

```text
Tipo: A
Nombre: @
Contenido: 203.0.113.10
```

### Subdominios

Un subdominio se crea agregando una etiqueta antes del dominio:

```text
www.ejemplo.cl
api.ejemplo.cl
campus.ejemplo.cl
correo.ejemplo.cl
```

No es necesario comprar cada subdominio por separado. Se administra dentro de la zona DNS del dominio principal.

### Nombre completamente cualificado

Un **FQDN**, o *Fully Qualified Domain Name*, representa el nombre completo dentro de la jerarquía DNS.

```text
www.ejemplo.cl.
```

El punto final representa la raíz DNS. En el uso cotidiano suele omitirse:

```text
www.ejemplo.cl
```

---

## Dominio, URL, sitio web y hosting

Estos conceptos no son equivalentes.

### Dominio

```text
ejemplo.cl
```

Es el nombre registrado.

### Subdominio

```text
campus.ejemplo.cl
```

Es una subdivisión del dominio.

### URL

```text
https://campus.ejemplo.cl/cursos/html?modulo=1
```

Una URL puede contener:

| Parte | Ejemplo |
|---|---|
| Protocolo | `https://` |
| Host | `campus.ejemplo.cl` |
| Puerto opcional | `:443` |
| Ruta | `/cursos/html` |
| Consulta | `?modulo=1` |
| Fragmento opcional | `#actividad` |

DNS solo resuelve principalmente el **host**:

```text
campus.ejemplo.cl
```

DNS no administra rutas como:

```text
/cursos/html
```

Las rutas son procesadas por el servidor web o la aplicación.

### Hosting

Es la infraestructura donde se encuentra el sitio o aplicación.

Puede ser:

- un servidor físico;
- un VPS;
- una plataforma cloud;
- un servicio de hosting compartido;
- una plataforma de despliegue;
- almacenamiento de objetos;
- una función *serverless*.

### Sitio web

Es el contenido o aplicación que se publica en el hosting y se accede mediante el dominio.

---

## Actores involucrados

### Titular o registrante

Es la persona u organización que registra y administra el nombre de dominio.

### Registrador

Empresa o entidad mediante la cual se registra y renueva el dominio.

Sus funciones pueden incluir:

- registro;
- renovación;
- transferencia;
- bloqueo del dominio;
- administración de contactos;
- modificación de nameservers;
- configuración del registro DS de DNSSEC.

### Registro

Organización que mantiene la base del dominio de nivel superior correspondiente.

Por ejemplo, un registro administra técnicamente un TLD, mientras los registradores ofrecen dominios a los titulares.

### Proveedor DNS autoritativo

Mantiene la zona DNS y responde oficialmente por sus registros.

Ejemplos de funciones:

- almacenar registros A, AAAA, CNAME, MX y TXT;
- responder consultas autoritativas;
- administrar TTL;
- firmar la zona con DNSSEC.

Cloudflare puede desempeñar este rol.

### Proveedor de hosting

Aloja el sitio, API o aplicación.

### Autoridad certificadora

Emite certificados TLS para habilitar HTTPS.

### Proveedor de correo

Gestiona el envío o recepción de correo del dominio.

> El registrador, el proveedor DNS, el hosting, la autoridad certificadora y el proveedor de correo pueden ser empresas diferentes.

---

## Qué es DNS

DNS significa **Domain Name System** o sistema de nombres de dominio.

Su función más conocida es traducir nombres a direcciones IP:

```text
www.ejemplo.cl → 203.0.113.10
```

También almacena información sobre:

- servidores de correo;
- verificaciones de servicios;
- políticas de seguridad;
- delegación de subdominios;
- claves de autenticación;
- servicios y puertos.

DNS es un sistema:

- jerárquico;
- distribuido;
- basado en zonas;
- apoyado por cachés;
- compuesto por servidores recursivos y autoritativos.

---

## Cómo se resuelve un dominio

Cuando una persona visita:

```text
https://www.ejemplo.cl
```

el proceso simplificado es:

```text
Usuario
  │
  ▼
Navegador o sistema operativo
  │
  ▼
Resolver DNS recursivo
  │
  ├── Consulta a la raíz
  ├── Consulta al TLD
  └── Consulta al servidor autoritativo
          │
          ▼
     Respuesta DNS
          │
          ▼
Dirección IP o destino del servicio
          │
          ▼
Servidor web
```

### Componentes

#### Cliente DNS

Aplicación o sistema que solicita la resolución.

#### Resolver recursivo

Busca la respuesta en nombre del cliente y puede almacenarla en caché.

#### Servidores raíz

Indican qué servidores conocen un TLD.

#### Servidores del TLD

Indican cuáles son los servidores autoritativos del dominio.

#### Servidores autoritativos

Responden utilizando la zona DNS administrada por el propietario o proveedor DNS.

---

## Zona DNS y servidores autoritativos

Una **zona DNS** es el conjunto de registros administrados para un dominio.

Ejemplo:

```text
Zona: ejemplo.cl
```

Puede contener:

```text
ejemplo.cl
www.ejemplo.cl
api.ejemplo.cl
mail.ejemplo.cl
_dmarc.ejemplo.cl
```

### Nameservers o servidores de nombres

Los registros NS indican qué servidores son autoritativos.

Ejemplo conceptual:

```text
lara.ns.cloudflare.com
tom.ns.cloudflare.com
```

Cuando se incorpora un dominio a Cloudflare mediante una configuración completa, Cloudflare asigna nameservers. Estos deben reemplazar los nameservers anteriores en el panel del registrador.

### Delegación

La delegación conecta un nivel de la jerarquía con otro.

```text
.cl → nameservers responsables de ejemplo.cl
```

También se puede delegar un subdominio a otros nameservers mediante registros NS:

```text
investigacion.ejemplo.cl → proveedor DNS diferente
```

Esta configuración avanzada debe planificarse cuidadosamente.

---

## Registros DNS principales

### Registro A

Relaciona un nombre con una dirección IPv4.

```text
Tipo: A
Nombre: @
Contenido: 203.0.113.10
```

Ejemplo:

```text
ejemplo.cl → 203.0.113.10
```

### Registro AAAA

Relaciona un nombre con una dirección IPv6.

```text
Tipo: AAAA
Nombre: @
Contenido: 2001:db8::10
```

### Registro CNAME

Crea un alias hacia otro nombre DNS.

```text
Tipo: CNAME
Nombre: www
Destino: ejemplo.cl
```

Resultado conceptual:

```text
www.ejemplo.cl → ejemplo.cl
```

No apunta directamente a una dirección IP.

Un CNAME no debe combinarse en el mismo nombre con otros registros incompatibles.

### Registro MX

Indica qué servidores reciben correo para el dominio.

```text
Tipo: MX
Nombre: @
Prioridad: 10
Destino: mail.proveedor.com
```

Cuando existen varios registros MX, una prioridad numérica menor suele indicar mayor preferencia.

Ejemplo:

```text
10 mx1.proveedor.com
20 mx2.proveedor.com
```

### Registro TXT

Almacena texto utilizado para:

- verificación de dominio;
- SPF;
- DKIM;
- DMARC;
- validaciones de plataformas;
- políticas de seguridad.

Ejemplo:

```text
Tipo: TXT
Nombre: @
Contenido: "v=spf1 include:_spf.proveedor.com -all"
```

### Registro NS

Indica los servidores autoritativos de una zona o delega un subdominio.

```text
Tipo: NS
Nombre: investigacion
Destino: ns1.otro-proveedor.net
```

### Registro SOA

Contiene información administrativa de la zona, como:

- servidor principal;
- contacto administrativo codificado;
- número de serie;
- intervalos de actualización;
- valores de expiración;
- caché negativa.

Normalmente es administrado automáticamente por el proveedor DNS.

### Registro CAA

Restringe qué autoridades certificadoras pueden emitir certificados para el dominio.

Ejemplo:

```text
Tipo: CAA
Nombre: @
Bandera: 0
Etiqueta: issue
Valor: letsencrypt.org
```

Antes de configurarlo se debe confirmar qué autoridad certificadora utiliza el hosting o servicio.

### Registro SRV

Publica la ubicación de un servicio mediante protocolo, puerto, prioridad y peso.

Ejemplo conceptual:

```text
_servicio._tcp.ejemplo.cl
```

Se utiliza en algunos servicios de mensajería, colaboración, directorio o juegos.

### Registro PTR

Realiza resolución inversa:

```text
203.0.113.10 → servidor.ejemplo.cl
```

Normalmente se configura con el proveedor que controla la dirección IP, no en la zona DNS normal del dominio.

Es especialmente relevante para servidores que envían correo directamente.

### Registros DNSSEC

Entre los registros relacionados con DNSSEC se encuentran:

- `DNSKEY`;
- `DS`;
- `RRSIG`;
- `NSEC` o `NSEC3`.

Normalmente son generados o administrados por el proveedor DNS y el registrador.

### SVCB y HTTPS

Son registros modernos que permiten publicar parámetros de conexión y alternativas de servicio. Su necesidad depende de la arquitectura y del proveedor.

---

## TTL y caché DNS

TTL significa **Time To Live**.

Indica durante cuánto tiempo una respuesta DNS puede mantenerse en caché.

Ejemplo:

```text
TTL: 3600 segundos
```

Equivale a una hora.

### TTL bajo

Ventajas:

- cambios más rápidos después de vencer la caché;
- útil antes de migraciones.

Desventajas:

- mayor frecuencia de consultas DNS.

### TTL alto

Ventajas:

- más respuestas pueden resolverse desde caché;
- menor frecuencia de consultas.

Desventajas:

- una modificación puede tardar más en ser observada por quienes todavía conservan el registro anterior.

### Antes de una migración

Una práctica habitual es:

1. reducir el TTL con anticipación;
2. esperar que expire el TTL anterior;
3. modificar el destino;
4. verificar el nuevo servicio;
5. aumentar nuevamente el TTL cuando la configuración esté estable.

> La llamada “propagación DNS” depende principalmente de las cachés, los TTL y los cambios de delegación. No todos los usuarios observan un cambio al mismo tiempo.

En registros proxificados por Cloudflare, algunas opciones de TTL pueden administrarse automáticamente.

---

## Ejemplo de una zona DNS

El siguiente ejemplo es ilustrativo. Las direcciones, nombres y políticas deben sustituirse por los valores entregados por cada proveedor.

| Tipo | Nombre | Contenido o destino | Proxy en Cloudflare | Propósito |
|---|---|---|---|---|
| A | `@` | `203.0.113.10` | Proxied | Sitio principal |
| CNAME | `www` | `@` | Proxied | Alias web |
| CNAME | `app` | `app.proveedor-hosting.com` | Según proveedor | Aplicación |
| CNAME | `api` | `api.proveedor-hosting.com` | Según arquitectura | API |
| MX | `@` | `mx1.proveedor-correo.com` | DNS only | Correo |
| MX | `@` | `mx2.proveedor-correo.com` | DNS only | Correo secundario |
| TXT | `@` | Valor SPF del proveedor | DNS only | Autorización de envío |
| TXT | `selector._domainkey` | Valor DKIM del proveedor | DNS only | Firma de correo |
| TXT | `_dmarc` | Política DMARC | DNS only | Control y reportes |
| CAA | `@` | Autoridad autorizada | DNS only | Emisión de certificados |
| TXT | `_verificacion` | Token del proveedor | DNS only | Verificación |

### Apex y `www`

Una estructura común es publicar ambos:

```text
ejemplo.cl
www.ejemplo.cl
```

Después se elige una versión canónica:

```text
www.ejemplo.cl → ejemplo.cl
```

o:

```text
ejemplo.cl → www.ejemplo.cl
```

Esta redirección es HTTP y debe configurarse en el servidor, plataforma o reglas de redirección; no es lo mismo que un registro CNAME.

---

## Qué es Cloudflare

Cloudflare puede utilizarse como:

- proveedor DNS autoritativo;
- proxy inverso;
- CDN;
- terminación TLS;
- protección frente a ciertos ataques;
- firewall de aplicaciones web;
- plataforma de reglas y redirecciones;
- proveedor de servicios adicionales.

El flujo de una aplicación web proxificada puede representarse así:

```text
Visitante
   │
   │ HTTPS
   ▼
Cloudflare
   │
   │ HTTPS
   ▼
Servidor de origen
```

Cloudflare no reemplaza necesariamente al hosting. Habitualmente se ubica delante del servidor de origen.

---

## Configuración inicial con Cloudflare

### Paso 1: registrar el dominio

Registrar el nombre con un registrador y mantener:

- datos de contacto actualizados;
- renovación automática;
- bloqueo contra transferencias;
- autenticación multifactor;
- acceso al cambio de nameservers.

### Paso 2: disponer del hosting

Obtener del proveedor:

- dirección IPv4 o IPv6;
- nombre CNAME requerido;
- instrucciones de verificación;
- configuración TLS;
- registros para correo, si corresponde.

### Paso 3: agregar el dominio a Cloudflare

En Cloudflare:

1. seleccionar la opción para añadir un dominio;
2. introducir el dominio registrable, no una URL completa;
3. elegir el plan;
4. revisar los registros DNS importados.

Correcto:

```text
ejemplo.cl
```

Incorrecto:

```text
https://www.ejemplo.cl/ruta
```

### Paso 4: revisar los registros

Antes de cambiar nameservers, comprobar:

- sitio web;
- subdominios;
- correo MX;
- SPF;
- DKIM;
- DMARC;
- verificaciones;
- servicios externos;
- registros CAA;
- subdominios delegados;
- registros de aplicaciones antiguas.

Una omisión puede interrumpir un servicio.

### Paso 5: cambiar los nameservers

Cloudflare asigna nameservers autoritativos.

En el registrador:

1. abrir la administración del dominio;
2. localizar nameservers o servidores DNS;
3. sustituir los anteriores;
4. guardar los cambios;
5. esperar que Cloudflare valide la delegación.

No se deben crear simplemente como registros NS dentro de la zona antigua cuando el objetivo es cambiar el proveedor autoritativo; deben modificarse en la delegación administrada por el registrador.

### Paso 6: comprobar el estado

La zona debe aparecer activa y responder mediante los nameservers asignados.

Comandos útiles:

```bash
dig NS ejemplo.cl
```

```bash
nslookup -type=NS ejemplo.cl
```

### Paso 7: revisar HTTPS

Configurar un certificado válido en el servidor de origen y utilizar preferentemente un modo de cifrado estricto.

### Paso 8: activar DNSSEC

Una vez estable la configuración:

1. habilitar DNSSEC en Cloudflare;
2. copiar los datos del registro DS;
3. registrar el DS en el registrador, cuando no se automatice;
4. comprobar la cadena de confianza.

> Un DS incorrecto puede hacer que resolvers que validan DNSSEC rechacen el dominio.

---

## Proxy de Cloudflare y DNS Only

En Cloudflare, ciertos registros pueden aparecer como:

- **Proxied:** nube naranja;
- **DNS only:** nube gris.

### Proxied

El tráfico web pasa por Cloudflare.

```text
Visitante → Cloudflare → Origen
```

Puede aportar:

- ocultamiento de la IP del origen en respuestas DNS públicas;
- CDN y caché;
- TLS en el borde;
- reglas;
- protección y análisis de tráfico web.

### DNS only

Cloudflare responde el destino real, pero no actúa como proxy del tráfico.

```text
Visitante → Origen
```

### Registros que pueden proxificarse

Generalmente se proxifican registros:

- `A`;
- `AAAA`;
- `CNAME`;

cuando sirven tráfico HTTP o HTTPS compatible.

### Registros que deben permanecer DNS only

Normalmente:

- `MX`;
- TXT de SPF, DKIM y DMARC;
- servidores de correo;
- verificaciones;
- registros NS;
- servicios que no usan HTTP/HTTPS;
- destinos cuya plataforma exige DNS directo;
- ciertos servicios de terceros o CDN.

Ejemplo:

| Nombre | Tipo | Estado recomendado |
|---|---|---|
| `@` | A para sitio web | Proxied |
| `www` | CNAME para sitio web | Proxied |
| `mail` | A para servidor de correo | DNS only |
| `@` | MX | DNS only |
| `_dmarc` | TXT | DNS only |

### Consideración sobre la IP del origen

Aunque se proxifique el sitio, la IP del origen puede quedar expuesta si:

- existe un subdominio DNS only que apunta a la misma IP;
- el correo usa la misma IP;
- hay registros históricos;
- la aplicación publica la IP;
- el servidor acepta tráfico directo desde cualquier origen.

Para reducir exposición:

- separar el servidor de correo del servidor web;
- evitar registros innecesarios;
- limitar en el firewall del origen las conexiones web a redes autorizadas;
- mantener un acceso administrativo separado y seguro.

---

## HTTPS y SSL/TLS

HTTPS protege la comunicación entre navegador y servidor mediante TLS.

Con Cloudflare existen dos tramos:

```text
Visitante ↔ Cloudflare ↔ Servidor de origen
```

Ambos deben estar cifrados.

### Modos principales

#### Flexible

```text
Visitante == HTTPS ==> Cloudflare -- HTTP --> Origen
```

El tramo hacia el origen no está cifrado. No es recomendable como configuración permanente.

#### Full

```text
Visitante == HTTPS ==> Cloudflare == HTTPS ==> Origen
```

El origen presenta un certificado, pero la validación es menos estricta.

#### Full (strict)

```text
Visitante == HTTPS ==> Cloudflare == HTTPS verificado ==> Origen
```

Cloudflare verifica el certificado del servidor de origen.

Es la opción recomendada cuando el origen está correctamente configurado.

### Certificado del origen

El servidor puede usar:

- un certificado emitido por una autoridad pública;
- un certificado de origen aceptado por Cloudflare, cuando el sitio siempre se acceda a través del proxy.

El certificado debe cubrir los nombres utilizados:

```text
ejemplo.cl
www.ejemplo.cl
api.ejemplo.cl
```

### Redirección a HTTPS

Una vez que HTTPS funciona correctamente, se puede redirigir:

```text
http://ejemplo.cl
```

hacia:

```text
https://ejemplo.cl
```

### HSTS

HSTS indica a los navegadores que utilicen HTTPS.

Debe habilitarse solo cuando:

- todos los subdominios necesarios admiten HTTPS;
- no se requiere acceso HTTP;
- se comprende el impacto de `includeSubDomains`;
- se ha validado el certificado;
- se ha planificado cualquier opción de precarga.

Una configuración incorrecta puede dejar servicios inaccesibles durante el tiempo definido en `max-age`.

### Evitar bucles de redirección

Los bucles pueden aparecer cuando:

- Cloudflare usa Flexible;
- el origen fuerza HTTPS;
- una aplicación interpreta incorrectamente el protocolo original;
- existen reglas duplicadas o contradictorias.

Solución general:

1. utilizar HTTPS en el origen;
2. configurar Full (strict);
3. revisar encabezados de proxy;
4. mantener una sola estrategia coherente de redirección.

---

## DNSSEC

DNSSEC agrega firmas criptográficas a los datos DNS para permitir verificar:

- autenticidad;
- integridad;
- cadena de confianza.

DNSSEC no cifra las consultas ni oculta el dominio consultado. Su finalidad principal es validar que la respuesta corresponde a la zona autorizada y no fue alterada.

### Cadena simplificada

```text
Raíz
  │
  ▼
TLD
  │ Registro DS
  ▼
Dominio
  │ DNSKEY y firmas
  ▼
Registros validados
```

### Activación en Cloudflare

Proceso general:

1. activar DNSSEC en la configuración DNS de Cloudflare;
2. obtener los datos DS;
3. agregarlos en el registrador, si es necesario;
4. confirmar que el estado se encuentre activo;
5. verificar el registro DS y las firmas.

### Migración con DNSSEC

No se deben cambiar nameservers sin revisar antes el estado de DNSSEC.

Un registro DS que todavía apunte a las claves del proveedor anterior puede provocar errores de resolución después de la migración.

Antes de migrar se debe:

- conocer quién administra el DS;
- desactivar o migrar DNSSEC de forma controlada;
- respetar los TTL;
- validar la nueva cadena;
- no eliminar claves prematuramente.

---

## DNS para correo electrónico

Cloudflare DNS no constituye por sí solo un buzón ni un servidor SMTP. Se necesita un proveedor de correo.

### MX

Indica dónde se recibe el correo:

```text
Tipo: MX
Nombre: @
Prioridad: 10
Destino: mx1.proveedor.com
```

### SPF

SPF declara qué servidores pueden enviar correo en nombre del dominio.

Ejemplo ilustrativo:

```text
v=spf1 include:_spf.proveedor.com -all
```

Consideraciones:

- utilizar los valores exactos del proveedor;
- mantener un solo registro SPF efectivo por nombre;
- evitar exceder límites de evaluación;
- incluir todos los servicios autorizados;
- no copiar una política de otro dominio.

### DKIM

DKIM agrega una firma a los mensajes.

Registro conceptual:

```text
selector1._domainkey.ejemplo.cl
```

El proveedor entrega:

- selector;
- clave pública;
- tipo de registro TXT o CNAME;
- valor exacto.

### DMARC

DMARC establece una política para mensajes que no superan correctamente las verificaciones y permite recibir reportes.

Ejemplo inicial de observación:

```text
v=DMARC1; p=none; rua=mailto:dmarc@ejemplo.cl
```

Posibles políticas:

| Política | Comportamiento general |
|---|---|
| `p=none` | Observa y genera reportes. |
| `p=quarantine` | Solicita tratar mensajes fallidos como sospechosos. |
| `p=reject` | Solicita rechazar mensajes que no cumplen. |

Una implementación responsable puede avanzar gradualmente:

```text
none → quarantine → reject
```

después de comprobar que todos los emisores legítimos están alineados.

### Registros de correo y proxy

Los registros relacionados con correo deben permanecer normalmente como **DNS only**.

No se debe activar la nube naranja para un host de correo esperando que Cloudflare proxifique SMTP.

### Otros registros de correo

Dependiendo del proveedor y nivel de seguridad:

- autodiscover;
- autoconfig;
- MTA-STS;
- TLS-RPT;
- BIMI;
- verificaciones de dominio;
- PTR del servidor emisor.

---

## Subdominios recomendados

Una convención clara facilita la administración.

| Subdominio | Uso posible |
|---|---|
| `www` | Sitio público |
| `app` | Aplicación principal |
| `api` | API |
| `admin` | Administración restringida |
| `campus` | Plataforma educativa |
| `docs` | Documentación |
| `status` | Estado del servicio |
| `assets` | Recursos estáticos |
| `cdn` | Distribución de contenido |
| `dev` | Desarrollo |
| `test` | Pruebas |
| `staging` | Preproducción |
| `mail` | Servidor de correo |
| `vpn` | Acceso privado |
| `git` | Repositorio interno o externo |

### Precauciones

- no publicar entornos internos sin autenticación;
- no usar subdominios previsibles como única medida de seguridad;
- eliminar registros abandonados;
- evitar CNAME hacia recursos de terceros que ya no existen;
- mantener inventario de responsables;
- separar producción, pruebas y desarrollo.

---

## Arquitecturas comunes

### Sitio en un servidor con IPv4

```text
ejemplo.cl      A      203.0.113.10
www             CNAME  ejemplo.cl
```

En Cloudflare:

```text
@    A      203.0.113.10    Proxied
www  CNAME  @               Proxied
```

### Sitio alojado mediante CNAME

```text
www  CNAME  proyecto.plataforma-hosting.com
```

La plataforma puede pedir además un TXT de verificación.

### API separada

```text
ejemplo.cl      → sitio web
api.ejemplo.cl  → servidor de API
```

Ejemplo:

```text
@    A      203.0.113.10
api  A      203.0.113.20
```

### Frontend y backend en proveedores diferentes

```text
www.ejemplo.cl  → plataforma frontend
api.ejemplo.cl  → plataforma backend
```

### Correo externo

```text
Web:    Cloudflare + hosting web
Correo: proveedor especializado
```

Los MX, SPF, DKIM y DMARC se configuran en la misma zona DNS, pero apuntan al proveedor de correo.

### Subdominio delegado

```text
investigacion.ejemplo.cl
```

puede delegarse a nameservers diferentes mediante registros NS si un equipo necesita administrar su propia zona.

---

## Seguridad del dominio

### Cuenta del registrador

- activar autenticación multifactor;
- mantener correo y teléfono de recuperación;
- utilizar una contraseña única;
- activar renovación automática;
- revisar la fecha de expiración;
- activar bloqueo de transferencia;
- proteger el código de autorización;
- limitar usuarios administrativos.

### Cuenta de Cloudflare

- activar autenticación multifactor;
- asignar roles mínimos necesarios;
- usar tokens de API con permisos limitados;
- evitar claves globales cuando no sean necesarias;
- revisar sesiones y usuarios;
- registrar cambios;
- exportar o documentar la zona.

### DNS

- activar DNSSEC;
- eliminar registros no utilizados;
- revisar subdominios abandonados;
- evitar comodines innecesarios;
- configurar CAA con cuidado;
- controlar cambios mediante revisión;
- mantener inventario y responsable por registro.

### Web

- utilizar Full (strict);
- mantener el certificado del origen vigente;
- redirigir HTTP a HTTPS;
- aplicar reglas de firewall;
- limitar acceso directo al origen cuando corresponda;
- actualizar servidor y aplicación;
- proteger paneles administrativos;
- aplicar encabezados de seguridad.

### Correo

- configurar SPF;
- configurar DKIM;
- implementar DMARC gradualmente;
- revisar reportes;
- separar correo y web cuando sea conveniente;
- configurar PTR si se administra un servidor emisor.

### Continuidad operacional

- documentar el registrador;
- documentar los nameservers;
- mantener copia de registros DNS;
- identificar proveedores y responsables;
- guardar procedimientos de recuperación;
- renovar dominio y servicios antes del vencimiento;
- disponer de cuentas institucionales, no solo personales.

---

## Errores frecuentes

### El sitio deja de funcionar después de cambiar nameservers

Posibles causas:

- faltan registros A, AAAA o CNAME;
- se importó una IP antigua;
- el hosting requiere un TXT;
- el origen no acepta el dominio;
- el certificado no incluye el nombre;
- DNSSEC conserva un DS anterior.

### El sitio funciona sin `www`, pero no con `www`

Revisar:

```text
www → CNAME → dominio principal
```

y confirmar que:

- el certificado cubra `www`;
- el hosting reconozca `www`;
- exista una redirección canónica, si corresponde.

### El correo deja de recibirse

Revisar:

- registros MX;
- prioridades;
- nombre de host;
- registros A/AAAA de un servidor propio;
- proxy desactivado para hosts de correo;
- valores entregados por el proveedor.

### El correo llega a spam

Revisar:

- SPF;
- DKIM;
- DMARC;
- alineación;
- PTR;
- reputación de IP;
- contenido del mensaje;
- configuración del proveedor.

### Error de demasiadas redirecciones

Revisar:

- modo SSL/TLS;
- redirección en Cloudflare;
- redirección del hosting;
- configuración del framework;
- encabezado `X-Forwarded-Proto`.

### Error de certificado

Revisar:

- vigencia;
- nombres cubiertos;
- cadena intermedia;
- modo Full (strict);
- accesibilidad del origen;
- puerto 443;
- configuración SNI.

### El cambio DNS no aparece

Revisar:

- TTL anterior;
- resolver utilizado;
- nameserver autoritativo;
- registro editado en la zona correcta;
- delegación;
- caché local;
- archivo `hosts`;
- DNSSEC.

### Error por CNAME abandonado

Si un subdominio apunta a un recurso externo eliminado, otra persona podría intentar reclamar ese recurso en el proveedor externo.

Acción:

- eliminar CNAME no utilizados;
- inventariar integraciones;
- revisar plataformas descontinuadas;
- verificar periódicamente destinos.

---

## Comandos de diagnóstico

### Consultar un registro A

```bash
dig A ejemplo.cl
```

### Consultar IPv6

```bash
dig AAAA ejemplo.cl
```

### Consultar nameservers

```bash
dig NS ejemplo.cl
```

### Consultar correo

```bash
dig MX ejemplo.cl
```

### Consultar TXT

```bash
dig TXT ejemplo.cl
```

### Consultar DMARC

```bash
dig TXT _dmarc.ejemplo.cl
```

### Consultar un nameserver específico

```bash
dig @servidor-autoritativo ejemplo.cl A
```

### Seguir la delegación

```bash
dig +trace ejemplo.cl
```

### Consultar DNSSEC

```bash
dig +dnssec ejemplo.cl
```

```bash
dig DS ejemplo.cl
```

### Usar nslookup

```bash
nslookup ejemplo.cl
```

```bash
nslookup -type=MX ejemplo.cl
```

### Comprobar encabezados HTTP

```bash
curl -I https://ejemplo.cl
```

### Comprobar redirecciones

```bash
curl -IL http://ejemplo.cl
```

### Consultar certificado con OpenSSL

```bash
openssl s_client -connect ejemplo.cl:443 -servername ejemplo.cl
```

> Sustituya `ejemplo.cl` por el dominio real.

---

## Lista de verificación

### Dominio

- [ ] El dominio está registrado a nombre de la organización o responsable correcto.
- [ ] Los datos de recuperación están actualizados.
- [ ] La renovación automática está activada.
- [ ] El dominio tiene bloqueo de transferencia.
- [ ] La cuenta utiliza autenticación multifactor.
- [ ] La fecha de vencimiento está documentada.

### DNS

- [ ] Los nameservers corresponden al proveedor DNS actual.
- [ ] El dominio apex tiene el registro correcto.
- [ ] `www` funciona.
- [ ] Los subdominios necesarios están registrados.
- [ ] Se eliminaron registros antiguos.
- [ ] Los TTL son adecuados.
- [ ] DNSSEC está activo y validado.
- [ ] Existe una copia o inventario de la zona.

### Cloudflare

- [ ] La zona aparece activa.
- [ ] Los registros web correctos están proxificados.
- [ ] Los registros de correo permanecen DNS only.
- [ ] El modo SSL/TLS es Full (strict).
- [ ] El origen posee un certificado válido.
- [ ] HTTP redirige a HTTPS.
- [ ] Las reglas de redirección no se contradicen.
- [ ] Los permisos y tokens siguen el mínimo privilegio.
- [ ] El acceso directo al origen está controlado.

### Correo

- [ ] Los MX coinciden con el proveedor.
- [ ] Existe un único SPF efectivo por nombre.
- [ ] DKIM valida correctamente.
- [ ] DMARC está configurado.
- [ ] Los reportes DMARC se revisan.
- [ ] El host de correo no está proxificado.
- [ ] El PTR está configurado si se envía correo desde IP propia.

### Aplicación

- [ ] El hosting reconoce el dominio.
- [ ] El certificado cubre todos los nombres.
- [ ] La URL canónica está definida.
- [ ] Producción y pruebas están separadas.
- [ ] Los paneles administrativos tienen protección adicional.
- [ ] Se monitoriza disponibilidad y vencimiento de certificados.

---

## Glosario

| Término | Definición |
|---|---|
| Apex | Dominio raíz de una zona, por ejemplo `ejemplo.cl`. |
| CDN | Red de distribución de contenido. |
| CNAME | Alias DNS hacia otro nombre. |
| DNS | Sistema de nombres de dominio. |
| DNSSEC | Extensiones que permiten validar criptográficamente respuestas DNS. |
| FQDN | Nombre completo dentro de la jerarquía DNS. |
| Hosting | Infraestructura donde se aloja una aplicación o sitio. |
| Nameserver | Servidor que responde por una zona DNS. |
| Proxy inverso | Intermediario que recibe solicitudes antes del servidor de origen. |
| Registrador | Entidad con la que se registra y administra el dominio. |
| Registrante | Titular que registra el dominio. |
| Registro | Organización que mantiene un TLD. |
| Resolver | Servicio que busca respuestas DNS para un cliente. |
| Servidor de origen | Servidor real que aloja la aplicación. |
| SLD | Dominio de segundo nivel. |
| SSL/TLS | Protocolos y tecnologías para conexiones cifradas. |
| Subdominio | Nombre situado antes del dominio registrable. |
| TLD | Dominio de nivel superior. |
| TTL | Tiempo durante el cual una respuesta DNS puede almacenarse en caché. |
| Zona DNS | Conjunto administrativo de registros de un dominio. |

---

## Fuentes oficiales

- [IANA: Domain Name Services](https://www.iana.org/domains)
- [IANA: Root Zone Database](https://www.iana.org/domains/root/db)
- [ICANN: información para titulares de dominios](https://www.icann.org/registrants)
- [ICANN: proceso de registro de un dominio](https://www.icann.org/resources/pages/domain-name-registration-process-2023-11-02-en)
- [Cloudflare: incorporación de un dominio](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/)
- [Cloudflare DNS: tipos de registros](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/)
- [Cloudflare DNS: estado del proxy](https://developers.cloudflare.com/dns/proxy-status/)
- [Cloudflare DNS: TTL](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/)
- [Cloudflare DNS: DNSSEC](https://developers.cloudflare.com/dns/dnssec/)
- [Cloudflare: modos de cifrado SSL/TLS](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/)
- [Cloudflare DNS: registros de correo](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/)
- [Cloudflare: SPF, DKIM y DMARC](https://developers.cloudflare.com/dmarc-management/security-records/)

> Las configuraciones exactas de DNS, certificados y correo deben obtenerse del proveedor de hosting, correo o aplicación. Los ejemplos de esta guía utilizan dominios y direcciones reservados para documentación.