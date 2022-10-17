//*creamos una clase
class User {
  constructor(nombre, email, password) {
    this.nombre = nombre;
    this.email = email;
    this.password = password;
  }
}
//*creamos las variables de los inputs del formularios de registros*//
let inputNombre = document.getElementById(`inputNombre`);
let inputEmail = document.getElementById(`inputEmailRegistro`);
let inputPassword = document.getElementById(`inputPasswordRegistro`);
let inputPassword2 = document.getElementById(`inputPasswordRegistro2`);
let form = document.getElementById(`RegistrarseForm`);
console.log(form);
//* creamos una variable para guardar en localStogare, o mostrar array vacio*//
let datosUsuraios = JSON.parse(localStorage.getItem(`datosUsuarios`)) || [];

inputNombre.addEventListener("blur", () => {
  requiredField(inputNombre);
});
function requiredField(input) {
  if (input.value.trim().length > 0) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}

inputEmail.addEventListener("blur", () => {
  validateEmail(inputEmail);
});
function validateEmail(input) {
  let regEmail =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regEmail.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}
inputPassword.addEventListener("blur", () => {
  validatePass(inputPassword);
});
inputPassword2.addEventListener("blur", () => {
  validatePass, verificarPasswords(inputPassword2);
});
function validatePass(input) {
  let regPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  if (regPass.test(input.value)) {
    input.className = "form-control is-valid";
    return true;
  } else {
    input.className = "form-control is-invalid";
    return false;
  }
}
function verificarPasswords() {
  let contraseñaIncorrecta = document.getElementById("contraseñaIncorrecta");
  if (inputPassword.value !== inputPassword2.value) {
    contraseñaIncorrecta.innerHTML = `<h6 class="text-center text-danger text-uppercase border-light mt-2">${"Las contraseñas no coinciden"}</h6>`;
    //  window.setTimeout(function(){window.location.reload()},1000);
    return false;
  } else return true;
}

//*creamos eventos para el boton registar*//
const handleSubmit = (e) => {
  //*evita actualizar pagina
  e.preventDefault();
  let parrafo_error = document.getElementById(`parrafoError`);
  //*creamos funciones para validar los campos del registro*//
  if (
    inputNombre.value === "" ||
    inputEmail.value === "" ||
    inputPassword.value === "" ||
    inputPassword2.value === ""
  ) {
    parrafo_error.innerHTML = `<h6 class="text-center text-danger text-uppercase border-light ">${"Favor de completar todo los campos"}</h6>`;
    //*hacemos un return para que corte la ejecucion
    return;
  }
  //* validamos los passwords para ver que coincidan:
  if (inputPassword.value !== inputPassword2.value) {
    contraseñaIncorrecta.innerHTML = `<h6 class="text-center text-danger text-uppercase border-light mt-2">${"Las contraseñas no coinciden"}</h6>`;
    //*hacemos un return para que corte la ejecucion
    return;
  }
  //* creamos un nuevo usuario:
  const nuevoUsuario = new User(
    inputNombre.value,
    inputEmail.value,
    inputPassword.value
  );
  //*hago un push con los datos de los usuarios:
  console.log(nuevoUsuario);
  //*console log para ver lo que tenemos
  datosUsuraios.push(nuevoUsuario);
  //*consulto que hay en el array
  console.log(datosUsuraios);
  //*mando los datos a local storage usando metoso stringify
  localStorage.setItem(`datosUsuarios`, JSON.stringify(datosUsuraios));
  //*creamos una alerta para que el usuario sepa que la creacion fue exitosa
  Swal.fire(
    "Usuario creado",
    "Su usuario fue correctamente cargado",
    "success"
  );
  //*reseteo formulario para que puedan completar siguiente usuario:
  form.reset();

  //*utilizo window.location.reload para actualizar la pagina
  window.location.reload();
};
/*creamos un evento para que el formulario escuche*/
form.addEventListener(`submit`, handleSubmit);
