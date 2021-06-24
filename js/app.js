// Variables
const nombre = "";

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {

     listaCursos.addEventListener('click', agregarCurso);

     carrito.addEventListener('click', eliminarCurso);

     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

     // Mostrar datos del LocalStorage
     document.addEventListener('DOMContentLoaded', ()=>{
         articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

         carritoHTML();

         //nombre = localStorage.getItem('nombreDelUsuariio');

         if(nombre != ""){
            document.querySelector('.encabezado').innerHTML = `Bienvenido ${nombre}`;
         }else{
            preguntarNombre();
         }

        

     })
}

function preguntarNombre(){
    nombre = prompt('Cual es tu nombre?');
    document.querySelector('.encabezado').innerHTML = `Bienvenido ${nombre}`;
    localStorage.setItem('nombreDelUsuariio',nombre);
}

function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          const cantidad = prompt('¿Cuántos Cursos desea adquirir?');
          //for(var i = 0; i<cantidad;i++){
               leerDatosCurso(curso,cantidad);
          //}
          alert('El curso '+curso.querySelector('h4').textContent+' se ha añadido correctamente a tu carrito');
     }
}

// Lee los datos del curso
function leerDatosCurso(curso,cantidad) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: cantidad
     }


     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad = parseInt(curso.cantidad) + parseInt(cantidad);
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}

function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     // Agregamos a Local Storage
     sincronizar();

}

function sincronizar(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
}

function vaciarCarrito() {
     while(contenedorCarrito.firstChild) {
          var opcion = confirm("¿Seguro desea eliminar todo el carrito?");
    if (opcion == true) {
     contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
      }
}
