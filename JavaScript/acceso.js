//*creamos un usuario Administracidor
let usuarioAdmin = { email: "admin@admin.com", password: "Admin1234" };
//* creamos las variables
let datosUsuarios2 = JSON.parse(localStorage.getItem(`datosUsuarios`));
let inputEmailAcceso = document.getElementById(`inputEmailAcceso`);
let inputPasswordAcceso = document.getElementById(`inputPasswordAcceso`);
let formularioLogin2 = document.getElementById(`RegistraseLogin`);
let botonIniciarSesion = document.getElementById(`botonIniciarSesion`);
let botonRecuperoClave = document.getElementById(`botonRecuperarClave`);
let inicioSesion = false;

//*asociando eventos y funciones *//
inputEmailAcceso.addEventListener("blur", () => {
  validateEmailLogin(inputEmailAcceso);
});
function validateEmailLogin(input) {
  let regEmail2 =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regEmail2.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}
inputPasswordAcceso.addEventListener("blur", () => {
  validatePass2(inputPasswordAcceso);
});
function validatePass2(input) {
  let regPass2 = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  if (regPass2.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

//* creamos una funcion para ver si el usuario que se esta logueando esta dentro del LocalSttorage
function busquedaUsuario(email) {
  const newUsuario = datosUsuarios2.find((user) => user.email === email);
  if (newUsuario !== undefined) {
    return newUsuario;
  } else {
    return "";
  }
}

botonIniciarSesion.addEventListener("click", ingresoUsuario);
//*creamos una funcion para validar ingreso al boton ingresar *//
function ingresoUsuario(e) {
  //*evita actualizar pagina
  e.preventDefault();
  console.log(e);
  let parrafo_error2 = document.getElementById(`parrafoError2`);

  if (
    inputEmailAcceso.value === usuarioAdmin.email &&
    inputPasswordAcceso.value === usuarioAdmin.password
  ) {
    inicioSesion = true;
    parrafo_error2.innerHTML = `<h6 class="text-center text-succes text-uppercase border-light ">${"Bienvenido Administrador!"}</h6>`;

    //* creamos un sesion Storage para que el logeo del usuario sea solo mientras esta en la pagina,para que cuando salga se cierre la sesion:
    sessionStorage.setItem("EstadoDeSesion", JSON.stringify(inicioSesion));
    localStorage.setItem("usuarioAdmin", JSON.stringify(usuarioAdmin));
    sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioAdmin));
    window.setTimeout(function () {
      window.location.replace(`index.html`);
    }, 2000);
    return;
  } else {
    const resultado = datosUsuarios2.find(
      (usuario) =>
        usuario.email === inputEmailAcceso.value &&
        usuario.password === inputPasswordAcceso.value
    );
    if (resultado !== undefined) {
      inicioSesion = true;
      parrafo_error2.innerHTML = `<h6 class="text-center text-succes text-uppercase border-light ">${"Bienvenido usuario!"}</h6>`;
      sessionStorage.setItem("EstadoDeSesion", JSON.stringify(inicioSesion));
      localStorage.setItem("usuarioComun", JSON.stringify(resultado));
      sessionStorage.setItem("usuarioActivo", JSON.stringify(resultado));
      window.location.replace(`index.html`);
    } else {
      parrafo_error2.innerHTML = `<h6 class="text-center text-danger text-uppercase border-light ">${"Clave o Usuarios Incorrectos"}</h6>`;
      window.setTimeout(function () {
        window.location.reload();
      }, 2000);
    }
  }
  if (inputEmailAcceso.value === "" || inputPasswordAcceso.value === "") {
    parrafo_error2.innerHTML = `<h6 class="text-center text-danger text-uppercase border-light ">${"Favor de completar todo los campos"}</h6>`;
    // // window.setTimeout(function(){window.location.reload()},2000);
    // return
  }
}

//*agregamos un evento para el boton de recupero de clave
botonRecuperoClave.addEventListener("click", recuperoClave);
//*creamos una funcion para validar ingreso al boton ingresar *//
function recuperoClave(e) {
  //*evita actualizar pagina
  e.preventDefault();
  //*solicitamos mail de recuperacion
  window.prompt("Ingrese email de Recuperacion");
  //*solicitamos su nombre y apellido
  window.prompt("Ingrese su nombre y apellido");
  //*pasamos un mensaje
  Swal.fire(
    "Email de Recupecion",
    "Si los datos ingresados son correctos recibira un email con su clave de acceso",
    "success"
  );
}
