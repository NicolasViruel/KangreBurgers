//agregamos los productos y renderisamos a carrito.html
let carrito;
const tbody = document.querySelector(".tbody");

function renderCarrito() {
  tbody.innerHTML = "";
  carrito = JSON.parse(localStorage.getItem("nuevoProducto")) || [];
  console.log(carrito);
  carrito.map((item) => {
    const tr = document.createElement("tr");
    tr.classList.add("itemCarrito");
    const content = `
        <th scope="row">*</th>
          <td class="tableProductos">
            <img src=${item.img} alt="imagen2" class="d-none d-md-block">
            <h6 class="titulo">${item.title}</h6>
          </td>
          <td class="tablePrecio">
            <p>${item.precio}</p>
          </td>
          <td class="tableCantidad">
            <input type="number" min="1" value=${item.cantidad} class = "inputElemento">
            <button class="eliminar btn btn-danger fw-bold mx-3">X</button>
          </td>
        `;

    tr.innerHTML = content; //agregamos la const Content
    tbody.append(tr); // agregamos al tbody la const tr

    tr.querySelector(".eliminar").addEventListener("click", () =>
      borrarProducto(item.title)
    );
    //llamo al tr para sumar y restar la cantidad
    tr.querySelector(".inputElemento").addEventListener('change', sumaCantidad);
  });
}
const borrarProducto = (codigo) => {
  //vamos a filtrar el array y devolver un array nuevo (sin el producto eliminado)
  //el metodo "filter" filtrarme los elementos y me devuelve un array nuevo
  //el metodo "toString" me cambia el dato Tipo Number a un string
  const carritoFiltrado = carrito.filter((producto) => {
    return producto.title !== codigo.toString();
  });
  console.log(carritoFiltrado);
  // ahora lo quiero igualar a mi array en admin.js
  carrito = carritoFiltrado;
  //luego lo guardo en localStorage
  localStorage.setItem("nuevoProducto", JSON.stringify(carrito));
  //recargo la pagina con windows
  window.location.reload();
};

function carritoTotal() {
  let total = 0;
  const itemCardTotal = document.querySelector(".intemCardTotal");
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ""));
    total = total + parseInt(precio) * item.cantidad;
    console.log(precio);
  });
  itemCardTotal.innerHTML = `Total $${total}`;
}
window.addEventListener("load", () => {
  carritoTotal();
});




//Esta funcion se corre cuando se ejecuta el boton comprar si el usuario esta logueado deja realizar la compra sino redirecciona al login:
//*declaramos las variables
let stateSesion2 = JSON.parse(sessionStorage.getItem("EstadoDeSesion"));
let botonCompra2 = document.getElementById("botonComprarCarrito");
//*colocamos un evento:
botonCompra2.addEventListener("click", estadoSesioncompra);

//*definimos la funcion
function estadoSesioncompra() {
  if (stateSesion2 !== true) {
    Swal.fire(
      "Debes Registrarte para comprar",
      "Te redirigiremos a la pagina de registro",
      "warning"
    );

    window.setTimeout(function () {
      window.location.replace(`login.html`);
    }, 2000);
  } else {
    
    Swal.fire(
      "Compra Exitosa",
      "Recibiras un email cuando tu pedido este en camino",
      "success"
      );
      window.location.replace(`https://mpago.la/25qvCuf`);
  }
}
//Funcion para sumar y restar la cantidad
function sumaCantidad(e){
  const sumaElemento = e.target
  const tr = sumaElemento.closest('.itemCarrito') 
  const  title = tr.querySelector('.titulo').textContent

  carrito.forEach(item => {
    if (item.title.trim() === title) {
      sumaElemento.value < 1 ? (sumaElemento.value = 1) : sumaElemento.value;
      item.cantidad = sumaElemento.value;
      carritoTotal();
    }
  })
}