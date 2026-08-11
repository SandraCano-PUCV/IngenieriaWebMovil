formulario=document.getElementById("LoginForm");
mensaje=document.getElementById("mensaje");
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
    correo=document.getElementById("correo").value;
    password=document.getElementById("pass").value;
    mensaje.textContent="bienvenidos";
});
