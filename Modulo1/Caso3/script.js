'use strict';

const CLAVE_USUARIOS = 'aulabotUsuarios';
const CLAVE_SESION = 'aulabotSesion';

const tabRegistro = document.querySelector('#tabRegistro');
const tabLogin = document.querySelector('#tabLogin');
const panelRegistro = document.querySelector('#panelRegistro');
const panelLogin = document.querySelector('#panelLogin');

const zonaAutenticacion = document.querySelector('#zonaAutenticacion');
const zonaPrivada = document.querySelector('#zonaPrivada');
const botonCerrarSesion = document.querySelector('#botonCerrarSesion');

const formRegistro = document.querySelector('#formRegistro');
const formLogin = document.querySelector('#formLogin');

const registroNombre = document.querySelector('#registroNombre');
const registroCorreo = document.querySelector('#registroCorreo');
const registroRol = document.querySelector('#registroRol');
const registroPassword = document.querySelector('#registroPassword');
const registroConfirmacion = document.querySelector(
  '#registroConfirmacion'
);
const registroCondiciones = document.querySelector(
  '#registroCondiciones'
);

const loginCorreo = document.querySelector('#loginCorreo');
const loginPassword = document.querySelector('#loginPassword');

const mensajeRegistro = document.querySelector('#mensajeRegistro');
const mensajeLogin = document.querySelector('#mensajeLogin');

const erroresRegistro = {
  nombre: document.querySelector('#errorRegistroNombre'),
  correo: document.querySelector('#errorRegistroCorreo'),
  rol: document.querySelector('#errorRegistroRol'),
  password: document.querySelector('#errorRegistroPassword'),
  confirmacion: document.querySelector(
    '#errorRegistroConfirmacion'
  ),
  condiciones: document.querySelector(
    '#errorRegistroCondiciones'
  )
};

const erroresLogin = {
  correo: document.querySelector('#errorLoginCorreo'),
  password: document.querySelector('#errorLoginPassword')
};

function obtenerUsuarios() {
  try {
    return JSON.parse(
      localStorage.getItem(CLAVE_USUARIOS)
    ) || [];
  } catch {
    return [];
  }
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(
    CLAVE_USUARIOS,
    JSON.stringify(usuarios)
  );
}

function mostrarError(campo, destino, mensaje) {
  destino.textContent = mensaje;

  if (campo) {
    campo.classList.add('control-error');
    campo.setAttribute('aria-invalid', 'true');
  }
}

function limpiarError(campo, destino) {
  destino.textContent = '';

  if (campo) {
    campo.classList.remove('control-error');
    campo.removeAttribute('aria-invalid');
  }
}

function cambiarPanel(panel) {
  const mostrarRegistro = panel === 'registro';

  panelRegistro.hidden = !mostrarRegistro;
  panelLogin.hidden = mostrarRegistro;

  tabRegistro.classList.toggle('activo', mostrarRegistro);
  tabLogin.classList.toggle('activo', !mostrarRegistro);

  tabRegistro.setAttribute(
    'aria-selected',
    String(mostrarRegistro)
  );

  tabLogin.setAttribute(
    'aria-selected',
    String(!mostrarRegistro)
  );

  if (mostrarRegistro) {
    registroNombre.focus();
  } else {
    loginCorreo.focus();
  }
}

function correoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
}

function passwordValida(password) {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password)
  );
}

function validarRegistro() {
  let valido = true;
  const usuarios = obtenerUsuarios();
  const nombre = registroNombre.value.trim();
  const correo = registroCorreo.value.trim().toLowerCase();
  const password = registroPassword.value;
  const confirmacion = registroConfirmacion.value;

  if (nombre.length < 3) {
    mostrarError(
      registroNombre,
      erroresRegistro.nombre,
      'Ingrese un nombre de al menos 3 caracteres.'
    );
    valido = false;
  } else {
    limpiarError(registroNombre, erroresRegistro.nombre);
  }

  if (!correoValido(correo)) {
    mostrarError(
      registroCorreo,
      erroresRegistro.correo,
      'Ingrese un correo electrónico válido.'
    );
    valido = false;
  } else if (
    usuarios.some(usuario => usuario.correo === correo)
  ) {
    mostrarError(
      registroCorreo,
      erroresRegistro.correo,
      'Este correo ya se encuentra registrado.'
    );
    valido = false;
  } else {
    limpiarError(registroCorreo, erroresRegistro.correo);
  }

  if (!registroRol.value) {
    mostrarError(
      registroRol,
      erroresRegistro.rol,
      'Seleccione un tipo de usuario.'
    );
    valido = false;
  } else {
    limpiarError(registroRol, erroresRegistro.rol);
  }

  if (!passwordValida(password)) {
    mostrarError(
      registroPassword,
      erroresRegistro.password,
      'La contraseña no cumple los requisitos indicados.'
    );
    valido = false;
  } else {
    limpiarError(
      registroPassword,
      erroresRegistro.password
    );
  }

  if (!confirmacion || confirmacion !== password) {
    mostrarError(
      registroConfirmacion,
      erroresRegistro.confirmacion,
      'Las contraseñas no coinciden.'
    );
    valido = false;
  } else {
    limpiarError(
      registroConfirmacion,
      erroresRegistro.confirmacion
    );
  }

  if (!registroCondiciones.checked) {
    mostrarError(
      registroCondiciones,
      erroresRegistro.condiciones,
      'Debe aceptar las condiciones.'
    );
    valido = false;
  } else {
    limpiarError(
      registroCondiciones,
      erroresRegistro.condiciones
    );
  }

  return valido;
}

function registrarUsuario() {
  const usuarios = obtenerUsuarios();

  const nuevoUsuario = {
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now()),
    nombre: registroNombre.value.trim(),
    correo: registroCorreo.value.trim().toLowerCase(),
    rol: registroRol.value,
    password: registroPassword.value,
    creadoEn: new Date().toISOString()
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  return nuevoUsuario;
}

function iniciarSesion(usuario) {
  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
    rol: usuario.rol,
    acceso: new Date().toISOString()
  };

  sessionStorage.setItem(
    CLAVE_SESION,
    JSON.stringify(sesion)
  );

  mostrarZonaPrivada(sesion);
}

function mostrarZonaPrivada(sesion) {
  zonaAutenticacion.hidden = true;
  zonaPrivada.hidden = false;

  document.querySelector('#usuarioNombre').textContent =
    sesion.nombre;

  document.querySelector('#usuarioCorreo').textContent =
    sesion.correo;

  document.querySelector('#usuarioRol').textContent =
    sesion.rol;

  document.querySelector('#usuarioAcceso').textContent =
    new Intl.DateTimeFormat('es-CL', {
      dateStyle: 'long',
      timeStyle: 'short'
    }).format(new Date(sesion.acceso));
}

function mostrarZonaAutenticacion() {
  zonaPrivada.hidden = true;
  zonaAutenticacion.hidden = false;
  cambiarPanel('login');
}

function obtenerSesion() {
  try {
    return JSON.parse(
      sessionStorage.getItem(CLAVE_SESION)
    );
  } catch {
    return null;
  }
}

tabRegistro.addEventListener('click', () => {
  cambiarPanel('registro');
});

tabLogin.addEventListener('click', () => {
  cambiarPanel('login');
});

formRegistro.addEventListener('submit', evento => {
  evento.preventDefault();

  mensajeRegistro.textContent = '';
  mensajeRegistro.className = 'mensaje-formulario';

  if (!validarRegistro()) {
    mensajeRegistro.textContent =
      'Revise los campos señalados.';
    mensajeRegistro.classList.add(
      'mensaje-formulario--error'
    );
    return;
  }

  const usuario = registrarUsuario();

  mensajeRegistro.textContent =
    'Cuenta creada correctamente. Ahora puede iniciar sesión.';
  mensajeRegistro.classList.add(
    'mensaje-formulario--exito'
  );

  formRegistro.reset();
  loginCorreo.value = usuario.correo;

  window.setTimeout(() => {
    cambiarPanel('login');
  }, 500);
});

formLogin.addEventListener('submit', evento => {
  evento.preventDefault();

  mensajeLogin.textContent = '';
  mensajeLogin.className = 'mensaje-formulario';

  const correo = loginCorreo.value.trim().toLowerCase();
  const password = loginPassword.value;

  if (!correoValido(correo)) {
    mostrarError(
      loginCorreo,
      erroresLogin.correo,
      'Ingrese un correo electrónico válido.'
    );
    return;
  }

  limpiarError(loginCorreo, erroresLogin.correo);

  if (!password) {
    mostrarError(
      loginPassword,
      erroresLogin.password,
      'Ingrese su contraseña.'
    );
    return;
  }

  limpiarError(loginPassword, erroresLogin.password);

  const usuario = obtenerUsuarios().find(
    item =>
      item.correo === correo &&
      item.password === password
  );

  if (!usuario) {
    mensajeLogin.textContent =
      'Correo o contraseña incorrectos.';
    mensajeLogin.classList.add(
      'mensaje-formulario--error'
    );
    return;
  }

  formLogin.reset();
  iniciarSesion(usuario);
});

document.querySelectorAll(
  '[data-password-target]'
).forEach(boton => {
  boton.addEventListener('click', () => {
    const idCampo = boton.dataset.passwordTarget;
    const campo = document.getElementById(idCampo);
    const mostrar = campo.type === 'password';

    campo.type = mostrar ? 'text' : 'password';
    boton.textContent = mostrar ? 'Ocultar' : 'Mostrar';
    boton.setAttribute(
      'aria-label',
      mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña'
    );
  });
});

botonCerrarSesion.addEventListener('click', () => {
  sessionStorage.removeItem(CLAVE_SESION);
  mostrarZonaAutenticacion();
});

const sesionActiva = obtenerSesion();

if (sesionActiva) {
  mostrarZonaPrivada(sesionActiva);
}
