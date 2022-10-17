
//creo variables
const clickButton = document.querySelectorAll('.button') //selecciono todos los botones

let listbutton = [];

function updateListButton() {
    listbutton = document.querySelectorAll('.button')
}

//cargo el localstorage de listaproductos para verificar si tengo algo
let listaProductos =JSON.parse(localStorage.getItem('listaProductos')) || []
let catalago = document.getElementById("catalogo")



let product_1 ={
    producto: 'Sergio Burguer',
    codigo: '5241268963',
    url: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    descripcion: 'Doble medallon de carne, con salsa barbaco y cebollar caramelizadas',
    precio: 650
}
let product_2 ={
    producto: 'Burguer a lo Alan',
    codigo: '9568975263',
    url: 'https://images.pexels.com/photos/1552641/pexels-photo-1552641.jpeg?auto=compress&cs=tinysrgb&w=600',
    descripcion: 'Medallon simple, con tomate, lechuga y acompañado de papas ',
    precio: 850
}
let product_3 ={
    producto: 'Kangre Burguer',
    codigo: '7854962589',
    url: 'https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=600',
    descripcion: 'La especialidad de la Casa, Hamburguesa a base de carne de cangrejo de fonde de Bikini',
    precio: 950
}

let muestrasFijas = [ product_1 , product_2, product_3 ]


function crearCard(producto) {
    catalago.innerHTML += `
    <div class="col d-flex justify-content-center mb-4">
        <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
            <h5 class="card-title pt-2 text-center text-white">${producto.producto}</h5>
            <img src=${producto.url} class="card-img-top" alt="...">
            <div class="card-body ">

                <p class="card-text text-white-50 descripcion">${producto.descripcion}</p>
                <h5 class="text-danger fw-bolder">Precio: $ <span class="precio">${producto.precio}</span></h5>
                <button class="btn btn-warning w-100 button" onclick= {addToCarritoItem} >Añadir a Carrito</button>
            </div>
        </div>
    </div>
    `
}

//en esta parte es el if para que se agreguen las muestras si no hay nada
if (listaProductos.length === 0 ) {
    listaProductos = muestrasFijas
}
listaProductos.forEach((producto)=>{
    crearCard(producto)
    updateListButton()
})


//recorro la matriz para escuchar el evento click
listbutton.forEach(btn =>{
    btn.addEventListener('click', addToCarritoItem) 
})

//selecciono todo el contendor
function addToCarritoItem(e) {
    //*creamos una alerta para que el usuario sepa que la creacion fue exitosa
    Swal.fire(
        "Agregado a Carrito",
        "",
        "success"
    );

    const button = e.target
    const item = button.closest('.card') //este metodo buscar el contenedor mas cercano

    const itemTitle  = item.querySelector('.card-title').textContent;//obtengo el titulo 
    const itemPrecio = item.querySelector('.precio').textContent;//obtengo el precio
    const itemImagen = item.querySelector('.card-img-top').src //obtengo la imagen
    
    
    const newItem = {
        title: itemTitle,
        precio: itemPrecio,
        img: itemImagen,
        cantidad: 1
    }
    addItemCarrito(newItem)
}


//agrego el nuevo item al carrito 
//Para sumar cantidad
function addItemCarrito(newItem) {
    carrito = JSON.parse(localStorage.getItem("nuevoProducto")) || []
    //modifico la cantidad, primero busco dentro de carrido con Find
    const result = carrito.find(producto => producto.title === newItem.title); //lo busco para compararlo si son iguales
    if (result !== undefined) {
        result.cantidad++;
        let carrito2 = carrito.filter(producto => producto.title !== newItem.title) //construye un nuevo array y lo guarda dentro de carrito2
        carrito2.push(result);
        localStorage.setItem("nuevoProducto", JSON.stringify(carrito2))
    }else{
        carrito.push(newItem)
        localStorage.setItem("nuevoProducto", JSON.stringify(carrito))//guardamos en LocalStorage para renderizar en carrito.html
    }
}


