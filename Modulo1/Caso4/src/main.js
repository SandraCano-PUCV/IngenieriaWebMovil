"use strict";
import "./styles.css";

const app = document.querySelector("#app");

const vistas = {
  "/": `
    <section class="hero">
      <div class="contenedor">
        <p class="etiqueta">
          Robótica educativa
        </p>

        <h1>Aprende, construye y programa</h1>

        <p>
          AulaBot ofrece experiencias de robótica,
          programación e inteligencia artificial.
        </p>

        <a class="boton" href="#/talleres">
          Ver talleres
        </a>
      </div>
    </section>
  `,

  "/talleres": `
    <section class="seccion">
      <div class="contenedor">
        <h1>Talleres disponibles</h1>

        <div class="rejilla">
          <article class="tarjeta">
            <h2>Robótica</h2>
            <p>
              Construcción y programación de robots.
            </p>
          </article>

          <article class="tarjeta">
            <h2>Programación web</h2>
            <p>
              Creación de interfaces con HTML,
              CSS y JavaScript.
            </p>
          </article>

          <article class="tarjeta">
            <h2>Inteligencia artificial</h2>
            <p>
              Introducción a modelos y datos.
            </p>
          </article>
        </div>
      </div>
    </section>
  `,

  "/contacto": `
    <section class="seccion">
      <div class="contenedor">
        <h1>Contacto</h1>

        <form id="formContacto" class="formulario">
          <div class="campo">
            <label for="nombre">
              Nombre
            </label>

            <input
              id="nombre"
              name="nombre"
              type="text"
              minlength="3"
              required
            >
          </div>

          <div class="campo">
            <label for="correo">
              Correo
            </label>

            <input
              id="correo"
              name="correo"
              type="email"
              required
            >
          </div>

          <div class="campo">
            <label for="mensaje">
              Mensaje
            </label>

            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              required
            ></textarea>
          </div>

          <button class="boton" type="submit">
            Enviar
          </button>

          <p
            id="respuestaFormulario"
            role="status"
            aria-live="polite"
          ></p>
        </form>
      </div>
    </section>
  `
};

function obtenerRuta() {
  const hash = window.location.hash;

  if (!hash || hash === "#") {
    return "/";
  }

  return hash.slice(1);
}

function obtenerVistaNoEncontrada() {
  return `
    <section class="seccion">
      <div class="contenedor">
        <h1>Página no encontrada</h1>

        <p>
          La ruta solicitada no existe.
        </p>

        <a class="boton" href="#/">
          Volver al inicio
        </a>
      </div>
    </section>
  `;
}

function marcarEnlaceActivo(rutaActual) {
  const enlaces = document.querySelectorAll(
    "[data-link]"
  );

  enlaces.forEach(enlace => {
    const rutaEnlace =
      enlace.getAttribute("href").slice(1);

    const activo = rutaEnlace === rutaActual;

    enlace.classList.toggle(
      "menu__enlace--activo",
      activo
    );

    if (activo) {
      enlace.setAttribute(
        "aria-current",
        "page"
      );
    } else {
      enlace.removeAttribute("aria-current");
    }
  });
}

function configurarFormulario() {
  const formulario = document.querySelector(
    "#formContacto"
  );

  if (!formulario) {
    return;
  }

  formulario.addEventListener(
    "submit",
    evento => {
      evento.preventDefault();

      const respuesta = document.querySelector(
        "#respuestaFormulario"
      );

      const datos = new FormData(formulario);
      const nombre = datos.get("nombre").trim();

      respuesta.textContent =
        `Gracias, ${nombre}. El formulario fue validado.`;

      formulario.reset();
    }
  );
}

function renderizar() {
  const ruta = obtenerRuta();
  const vista = vistas[ruta];

  app.innerHTML =
    vista ?? obtenerVistaNoEncontrada();

  marcarEnlaceActivo(ruta);
  configurarFormulario();

  app.focus();
}

window.addEventListener(
  "hashchange",
  renderizar
);

renderizar();
