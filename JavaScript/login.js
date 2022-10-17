document
  .getElementById("iniciarSesion")
  .addEventListener("click", iniciarSesion);
document.getElementById("registrarse").addEventListener("click", registrarse);
window.addEventListener("resize", anchopagina);

//* Declaramos las variables//
const contenedorFormularios = document.querySelector(`.containerFormularios`);
const formularioLogin = document.querySelector(`.IniciarSesion`);
const formularioRegistro = document.querySelector(`.Registrarse`);
const login = document.querySelector(`.Login`);
const registro = document.querySelector(`.registro`);

function anchopagina() {
  if (window.innerWidth > 990) {
    login.style.display = "block";
    registro.style.display = "block";
  } else {
    registro.style.display = "block";
    registro.style.opacity = "1";
    login.style.display = "none";
    formularioLogin.style.display = "block";
    formularioRegistro.style.display = "none";
    contenedorFormularios.style.left = "0px";
  }
}

anchopagina();

function registrarse() {
  if (window.innerWidth > 990) {
    formularioRegistro.style.display = `block`;
    contenedorFormularios.style.left = `500px`;
    formularioLogin.style.display = `none`;
    registro.style.opacity = `0`;
    login.style.opacity = `1`;
  } else {
    formularioRegistro.style.display = `block`;
    contenedorFormularios.style.left = `0px`;
    formularioLogin.style.display = `none`;
    registro.style.display = `none`;
    login.style.display = `block`;
    login.style.opacity = `1`;
  }
}
function iniciarSesion() {
  if (window.innerWidth > 990) {
    formularioRegistro.style.display = `none`;
    contenedorFormularios.style.left = `0px`;
    formularioLogin.style.display = `block`;
    registro.style.opacity = `1`;
    login.style.opacity = `0`;
  } else {
    formularioRegistro.style.display = `none`;
    contenedorFormularios.style.left = `0px`;
    formularioLogin.style.display = `block`;
    registro.style.display = `block`;
    login.style.display = `none`;
  }
}
