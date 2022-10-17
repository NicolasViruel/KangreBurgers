class Producto{
    constructor(codigo, producto, descripcion, precio, url){
        this.codigo = codigo
        this.producto = producto
        this.descripcion = descripcion
        this.precio = precio
        this.url = url;
    }
}

/// codigo unico:
const codigoUnico = "1234567890";
function codificadorUnico(length=10) {
  let result="";
  for (let i = 0; i<=length; i++) {
    result += codigoUnico.charAt(Math.floor(Math.random()*codigoUnico.length));    
  }
  return result;
  
}

//obtengo los input del formulario y declaro las variables
let inputCodigo = codificadorUnico();
let inputProducto = document.getElementById("inputProducto");
let inputDescripcion = document.getElementById("inputDescripcion");
let inputPrecio = document.getElementById("inputPrecio");
let inputUrl = document.getElementById("inputUrl");
let form = document.getElementById("form")
console.log(form);
// creo array donde voy a guardar los productos (Json.parse compara si ya hay algo guardado en el localStorage)
let arrProductos = JSON.parse(localStorage.getItem("listaProductos")) || []


//Funciones

///////// Ahora creo el Producto (create) ///////
const handleSubmit=(e)=>{
    e.preventDefault();
    //creo una expresion regular para validar el URL
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    const validarUrl = regex.test(inputUrl.value);
    //esto es para validar si el usuario lleno todos los campos requeridos
    if ( inputProducto.value === "" || inputDescripcion.value === "" || inputPrecio.value === "" || inputUrl.value === "") {
        alert("Debe completar todos los campos, son obligatorios")
        return;
    }
    if (!validarUrl) {
        alert("La direccion URL, es Incorrecta")
        return;
    }
   const nuevoProducto = new Producto ( inputCodigo, inputProducto.value,
    inputDescripcion.value, inputPrecio.value , inputUrl.value)
    
    console.log(nuevoProducto)

    //Guardo primero en un array
    arrProductos.push(nuevoProducto)
    console.log(arrProductos);
    //Para guardar en localStorage
    localStorage.setItem("listaProductos", JSON.stringify(arrProductos));
    //Para resetear el Formulario (este caso utilizo la variable Form)
    form.reset()
    //Utilizo window reload para que los producto que valla creando se me agreguen sin necesidad de actualizar la pagina
    window.location.reload();
}

//ahora la etiqueta form escucha el evento
form.addEventListener("submit" , handleSubmit)

//traigo el Tbody del html

let tbodyListaProductos = document.getElementById("bodyListaProductos")

//ahora necesito recorrer el arrayProductos y me valla creando uno por uno
//entonces creo una funcion y ademas lo recorro al array con un Foreach

///////// Ahora Leo (read) ///////
const crearFilaProducto = () =>{
    //recorro el array
 arrProductos.forEach(producto => {
    //Funcion para crear productos
   return tbodyListaProductos.innerHTML += `
    <tr>
        <th>${producto.codigo}</th>
        <th>${producto.producto}</th>
        <th>${producto.descripcion}</th>
        <th> u$s ${producto.precio}</th>
        <th>${producto.url}</th>
        <th class="text-center">
      <button onclick="borrarProducto(${producto.codigo})" class="btn btn-danger my-1">Borrar</button>
      <button onclick="editarProducto(${producto.codigo})" class="btn btn-primary my-1">Editar</button>
        </th>
  </tr>`
});
}

///////// Ahora genero la opcion para Borrar (delete) ///////

const borrarProducto = (codigo) =>{
    console.log(codigo);
    //vamos a filtrar el array y devolver un array nuevo (sin el producto eliminado)
    //el metodo "filter" filtrarme los elementos y me devuelve un array nuevo
    //el metodo "toString" me cambia el dato Tipo Number a un string
    const arrayFiltrado = arrProductos.filter(producto =>{
        return producto.codigo !== codigo.toString()
    })
    console.log(arrayFiltrado);
    // ahora lo quiero igualar a mi array en admin.js
    arrProductos = arrayFiltrado;
    //luego lo guardo en localStorage
    localStorage.setItem("listaProductos" , JSON.stringify(arrProductos));
    //recargo la pagina con windows
    window.location.reload();
}


///////// Ahora genero la opcion para Editar (Update) ///////

const editarProducto = (codigo) =>{
    console.log(codigo);
    //necesitamos encontrar el producto dentro del arreglo de Productos
    //El metodo find intera entre cada producto y en el primero que haga match me lo devuelve al objeto
    const producto = arrProductos.find(producto => {
        return producto.codigo === codigo.toString();
    });
    console.log(producto);
    //relleno nuevamente los campos cuando les haga click
    inputCodigo.value = producto.codigo;
    inputProducto.value = producto.producto;
    inputDescripcion.value = producto.descripcion;
    inputPrecio.value = producto.precio;
    inputUrl.value = producto.url;
    //borramos el producto del array 
    const arrayFiltrado = arrProductos.filter(producto =>{
        return producto.codigo !== codigo.toString()
    })
    // ahora lo quiero igualar a mi array en admin.js
    arrProductos = arrayFiltrado;
    console.log(arrProductos);
    //luego lo guardo en localStorage
    localStorage.setItem("listaProductos" , JSON.stringify(arrProductos));
    
}
//llamo a la funcion para que me muestre el producto
crearFilaProducto()


let tbodyListaUsuarios = document.getElementById("ListaUsuarios");
let arrayUsuarios = JSON.parse(localStorage.getItem("datosUsuarios"));
///////// Ahora Leo (read) ///////
const crearFilaUsuarios = () => {
    //recorro el array
    arrayUsuarios.forEach((registroUsuarios) => {
      //Funcion para crear productos
      tbodyListaUsuarios.innerHTML += `
      <tr>
          <th class="text-center">${registroUsuarios.nombre}</th>
          <th class="text-center">${registroUsuarios.email}</th>
          <th class="text-center" >${registroUsuarios.password}</th>
          <th class="text-center" >
        <button class="btn btn-danger"><i class="fa-solid fa-trash-can"></i></button>             
    </tr>`;
      const btn = tbodyListaUsuarios.getElementsByTagName("button")[0];
      btn.onclick = () => {
        borrarUsuario(registroUsuarios.email);
      };
      return tbodyListaUsuarios;
    });
  };
  
//llamo a la funcion para que me muestre el producto
crearFilaUsuarios();
  
  //creamos una funcion para borrar los usuarios
  const borrarUsuario = (email) => {
    //vamos a filtrar el array y devolver un array nuevo (sin el producto eliminado)
    //el metodo "filter" filtrarme los elementos y me devuelve un array nuevo
    //el metodo "toString" me cambia el dato Tipo Number a un string
    const arrayFiltradoUsuarios = arrayUsuarios.filter((usuarioBorrados) => {
      return usuarioBorrados.email !== email.toString();
    });
    console.log(arrayFiltradoUsuarios);
    // ahora lo quiero igualar a mi array en admin.js
    arrayUsuarios = arrayFiltradoUsuarios;
    //luego lo guardo en localStorage
    localStorage.setItem("datosUsuarios", JSON.stringify(arrayUsuarios));
    //recargo la pagina con windows
    window.location.reload();
  };