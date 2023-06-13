/* PORTAL ONLINE PARA VENTA DE ENTRADAS "MisEntradas.com"

Mi simulador consiste en un portal para la compra de entradas a espectáculos de diversas categorías: recitales, teatro, expo & congresos, deportivos, entre otros.
A efectos de la tercera entrega del proyecto final, el usuario podrá:
- inscribirse a un Newsletter para recibir novedades sobre espectaculos
- Elegir comprar diferentes cantidades de entradas a los espectáculos en pantalla
- Visualizar las entradas seleccionadas en el carrito de compras */




//Class constructor para instanciar los espectáculos (llamados eventos) como objetos
class Evento {
  constructor(id, imagen, nombre, categoria, lugar, precio, fecha, cantidad, entradasDisponibles){
    this.id = id;
    this.imagen = imagen;
    this.nombre = nombre;
    this.categoria = categoria;
    this.lugar = lugar;
    this.precio = precio;
    this.fecha = fecha;
    this.cantidad = cantidad;
    this.entradasDisponibles = entradasDisponibles;
  }


//Por cada entrada que se adquiere (como compra final, no como suma al carrito), se va restando esa cantidad de su respectivo stock
  restaEntradasDisponibles(){
    this.entradasDisponibles = this.entradasDisponibles - 1;
  }
}


//Creación de espectáculos disponibles como objetos a partir del class constructor anterior
const evento1 = new Evento(1, "https://cineargentinohoy.com.ar/wp-content/uploads/2022/08/1-scaled.jpeg", "'Casados con hijos'", "Teatro", "Teatro Gran Rex", 10000, "Lunes 25 de julio de 2023", 1, 500);
const evento2 = new Evento(2, "https://i.axs.com/2018/01/disney-on-ice-frozen-tickets_04-05-18_18_5a5e8ba257a65.png","'Frozen on Ice'", "Show infantil", "Luna Park", 8000, "Lunes 15 de junio de 2023", 1, 1000);
const evento3 = new Evento(3, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSACCMlsnC5faOJTHqycA7k0G34zdfDPiAqqA&usqp=CAU","'Solomun'", "Concierto", "Mandarine Park", 7000, "Sabado 8 de diciembre 2023", 1, 5000);
const evento4 = new Evento(4, "https://i1.sndcdn.com/avatars-000102321276-9sqdg3-t500x500.jpg","'La Delio Valdez'", "Concierto", "Teatro Metropolitan", 9000, "Jueves 30 de julio de 2023", 1, 800);
const evento5 = new Evento(5, "https://4.bp.blogspot.com/_4QdTFsWN00Q/TUzWj3YXbMI/AAAAAAAAAzs/IROEL9mdWpU/s1600/11+Toc+Toc.jpg","'TOC TOC'", "Teatro", "Teatro Gran Rex", 5000, "Viernes 15 de agosto de 2023", 1, 1000);


//Array de espectáculos
const listaEventos = [evento1, evento2, evento3, evento4, evento5];


//Guardar array en el Storage
localStorage.setItem("Eventos", JSON.stringify(listaEventos))


//Incorporar titulo al DOM
const introPortal = document.getElementById("titulo")
introPortal.innerHTML = `<h1>MisEntradas.com</h1>
  <h4> PORTAL ONLINE PARA VENTA DE ENTRADAS <h4/>
  <h2>¡Bienvenid@! Aquí encontrarás los mejores espectáculos en Argentina. <br> Conoce la amplia variedad de nuestro catálogo:</h2>`
document.body.append(introPortal)


//Generar cards para cada espectáculo
for (let evento of listaEventos) {
  let contenedorPadre = document.getElementById("contenedorCards")
  let contenedorHijo = document.createElement("div")
  contenedorHijo.innerHTML = `
   <div class="card cardPropia" style="width: 18rem;">
   <img src=${evento.imagen} class="card-img-top" alt="ImagenDeEvento">
     <div class="card-body">
       <h4 class="card-title"><strong>${evento.nombre}</strong></h4>
       <h5 class="card-text">En ${evento.lugar}</h5>
       <p class="card-text">Categoría: ${evento.categoria}</p>
       <p class="card-text">${evento.fecha}</p>
       <p class="card-text"><strong>Precio por entrada: ${evento.precio}</strong></p>
       <input type="button" class="btn btn-primary" value="Comprar" onclick="agregarCarrito(${evento.id})"> 
     </div>
   </div>`
  contenedorHijo.classList.add("card")
  contenedorPadre.appendChild(contenedorHijo);
  document.body.append(contenedorPadre)
}


//Evento para abrir el formulario de inscripción al Newsletter
const btnVerNewsletter = document.querySelector("#botonNewsletter")
btnVerNewsletter.onclick = () => {
    document.getElementById("formulario").style.display = "block";
}


//Tomar datos del formulario del Newsletter y guardarlos en el Storage. Configuración de mensajes de confirmación o advertencia de error
const datosFormulario = document.getElementById("formulario");
const btnSubmit = document.getElementById("btnSubmit");

btnSubmit.onclick = () => {
  let nombreUser = datosFormulario.querySelector("#nombreUser").value;
  localStorage.setItem("nombreUser", nombreUser);
  let mailUser = datosFormulario.querySelector("#mailUser").value;
  localStorage.setItem("mailUser", mailUser);

  if (nombreUser !== "" && mailUser !== "") {
    Swal.fire(
      '¡Muchas gracias!',
      'Te suscribiste a nuestro Newsletter semanal.',
      'success'
    );
  } else {
    Swal.fire(
      'Error en los datos ingresados',
      'Por favor, vuelve a ingresarlos',
      'error'
    );
  }
};

datosFormulario.onsubmit = (e) => {
  e.preventDefault();
};


//Codigo para el carrito de compras
const carritoWeb = document.getElementById("carrito")
let carrito = JSON.parse(localStorage.getItem("Carrito")) || []; //aqui se almacenan la selección de espectáculos en el carrito

//Agrego items al carrito de compras - primero chequeo si hay items existentes para agregar más cantidad, sino agrego nuevo elemento al array del carrito y luego con "actualizarCarrito()" genero la card de la selección
const agregarCarrito = (evento) => {
  const eventoEnCarrito = carrito.find((item) => item.id === evento);
  if (eventoEnCarrito) {
    eventoEnCarrito.cantidad++;
  } else {
    const eventoNuevo = listaEventos.find((item) => item.id === evento);
    carrito.push(eventoNuevo);
  }
  actualizarCarrito();
};

const actualizarCarrito = () => {
  carritoWeb.innerHTML = '';
  carritoWeb.classList.add("carrito")
    carrito.forEach((evento) => {
        const contenedor = document.createElement('div');
        contenedor.classList.add('eventoEnCarrito');
        const mensaje = document.createElement('div');
        mensaje.innerText = `Agregaste ${evento.cantidad} entrada/s para ${evento.nombre} - Costo total: (${evento.precio*evento.cantidad})`;
        const botonEliminar = document.createElement('button');
        const cantidad = document.createElement('p');
        cantidad.textContent = evento.cantidad;
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
            eliminarCarrito(evento);
        })
        contenedor.appendChild(mensaje);  
        contenedor.appendChild(cantidad);
        contenedor.appendChild(botonEliminar);
        
      carritoWeb.appendChild(contenedor);
      document.body.append(carritoWeb)
    });     
}

//Si quiero eliminar de a una la selección de espectáculos en el carrito
const eliminarCarrito = (evento) => {
    if (evento.cantidad > 1) {
        evento.cantidad--;
    }else{
        const index = carrito.indexOf(evento);
        carrito.splice(index, 1);
    }
    actualizarCarrito()
}