"use strict";

const formulario = document.querySelector("#formActividad");
const campoActividad = document.querySelector("#actividad");
const lista = document.querySelector("#listaActividades");
const listaVacia = document.querySelector("#listaVacia");
const contador = document.querySelector("#contador");
const mensaje = document.querySelector("#mensajeFormulario");
const botonVaciar = document.querySelector("#botonVaciar");

/**
 * Actualiza el contador, el mensaje de lista vacía
 * y el estado del botón para vaciar la lista.
 */
function actualizarEstadoLista() {
  const cantidad = lista.children.length;

  listaVacia.hidden = cantidad > 0;
  botonVaciar.disabled = cantidad === 0;

  contador.textContent =
    cantidad === 1
      ? "1 actividad"
      : `${cantidad} actividades`;
}

/**
 * Muestra un mensaje de información, error o éxito.
 *
 * @param {string} texto Texto que se mostrará.
 * @param {string} tipo Tipo de mensaje: error o exito.
 */
function mostrarMensaje(texto, tipo = "") {
  mensaje.textContent = texto;
  mensaje.className = "mensaje";

  if (tipo) {
    mensaje.classList.add(`mensaje--${tipo}`);
  }
}

/**
 * Crea un elemento de la lista con su botón Eliminar.
 *
 * @param {string} texto Nombre de la actividad.
 * @returns {HTMLLIElement} Elemento de lista creado.
 */
function crearElementoLista(texto) {
  const elemento = document.createElement("li");
  elemento.classList.add("lista__elemento");

  const contenido = document.createElement("span");
  contenido.classList.add("lista__texto");
  contenido.textContent = texto;

  const botonEliminar = document.createElement("button");

  botonEliminar.type = "button";
  botonEliminar.classList.add("boton-eliminar");
  botonEliminar.textContent = "Eliminar";
  botonEliminar.dataset.accion = "eliminar";

  botonEliminar.setAttribute(
    "aria-label",
    `Eliminar actividad: ${texto}`
  );

  elemento.append(contenido, botonEliminar);

  return elemento;
}

/**
 * Agrega una actividad cuando se envía el formulario.
 */
formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  const actividad = campoActividad.value.trim();

  if (actividad.length < 3) {
    campoActividad.classList.add("input-error");
    campoActividad.setAttribute("aria-invalid", "true");

    mostrarMensaje(
      "Escriba una actividad de al menos 3 caracteres.",
      "error"
    );

    campoActividad.focus();
    return;
  }

  campoActividad.classList.remove("input-error");
  campoActividad.removeAttribute("aria-invalid");

  const elemento = crearElementoLista(actividad);

  lista.append(elemento);

  mostrarMensaje(
    `Se agregó la actividad: ${actividad}.`,
    "exito"
  );

  formulario.reset();
  campoActividad.focus();

  actualizarEstadoLista();
});

/**
 * Elimina el estado de error mientras el usuario escribe.
 */
campoActividad.addEventListener("input", () => {
  const actividad = campoActividad.value.trim();

  if (actividad.length >= 3) {
    campoActividad.classList.remove("input-error");
    campoActividad.removeAttribute("aria-invalid");

    mostrarMensaje("");
  }
});

/**
 * Elimina una actividad individual.
 *
 * Se utiliza delegación de eventos porque los botones
 * se crean dinámicamente.
 */
lista.addEventListener("click", evento => {
  const boton = evento.target.closest(
    '[data-accion="eliminar"]'
  );

  if (!boton) {
    return;
  }

  const elemento = boton.closest(".lista__elemento");

  const texto = elemento
    .querySelector(".lista__texto")
    .textContent;

  elemento.remove();

  mostrarMensaje(
    `Se eliminó la actividad: ${texto}.`,
    "exito"
  );

  actualizarEstadoLista();
});

/**
 * Elimina todas las actividades de la lista.
 */
botonVaciar.addEventListener("click", () => {
  lista.replaceChildren();

  mostrarMensaje(
    "Se eliminaron todas las actividades.",
    "exito"
  );

  actualizarEstadoLista();
  campoActividad.focus();
});

/**
 * Configura el estado inicial de la aplicación.
 */
actualizarEstadoLista();