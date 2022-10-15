// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const total = document.querySelector('#carrito p');
const vaciaCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-articulos');
const buscador = document.querySelector('#buscador');
const submitBuscador = document.querySelector('#submit-buscador');

cargarEventListener();
//Todos los eventos
function cargarEventListener() {
    // cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //mostrar los cursos del local Storage
    document.addEventListener('DOMContentLoaded', () => {

        articuloCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();

        articulosEnStock();

    });

    // elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //eliminar todos los cursos del carrito
    vaciaCarritoBtn.addEventListener('click', () => {
        articuloCarrito = [];
        totalCompra = 0;
        limpiarHTML();
        sincronizarStorage();
        carritoHTML();
    });


    buscador.addEventListener('keydown', () => {
        document.querySelector('.barra').style.display = "none";
        filtrarPorNombre();

    });

    submitBuscador.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.barra').style.display = "none";
        filtrarPorNombre();

    });

}


function agregarCurso(e) {
    e.preventDefault();
    console.log(articuloCarrito)
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSelecionado = e.target.parentElement.parentElement;
        leerDatodCurso(cursoSelecionado);
    }

}

// Elimina un curso del carrito

function eliminarCurso(e) {
    // console.log( e.target.classList)
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        console.log(cursoId)
        console.log(buscarArticuloPorId(cursoId))
        articuloCarrito = articuloCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();

    } else {

    }
}


// leer contenido html y agregar esa info al carrito
function leerDatodCurso(curso) {

    const infoCurso = {
        img: curso.querySelector('img').src,
        name: curso.querySelector('h4').textContent,
        precioActual: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }

    // revisa si un elemetno ya existe en el carrito
    const existe = articuloCarrito.some((curso) => curso.id === infoCurso.id);
    if (existe) {

        const curso = articuloCarrito.map((curso) => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;  //retorna los objetos actualizados
            } else {
                return curso; //retorna los objetos que ya estaban

            }
        })

        // console.log(existe)
    } else {
        // agregamos el cusos al carrito
        articuloCarrito = [...articuloCarrito, infoCurso];
        console.log(articuloCarrito)
    }

    carritoHTML();


}

// mostrar el carrito de compra en el carrito

function carritoHTML() {

    limpiarHTML();

    // RECORRE EL CARRITO Y GENERA EL HTML
    for (let i = 0; i < articuloCarrito.length; i++) {
        let articulo = articuloCarrito[i];
        const { img, name, precioActual, cantidad, id } = articulo;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
             <img src='${img}' width="100" height="100">
            </td>
            <td>
             ${name}
            </td>
            <td>
             ${precioActual}
            </td>
            <td>
             ${cantidad}
            </td>
            <td>
             <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;

        contenedorCarrito.appendChild(row);

        let price = parseFloat(precioActual)
        if (articulo.cantidad > 1) {
            let total = price * articulo.cantidad;
            totalCompra += total
        } else {
            totalCompra += price;
        }



    }

    total.innerHTML = `Total: ${totalCompra} `;

    //sicroniar con el local Storage
    sincronizarStorage();

}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articuloCarrito))

}

// ELIMINAR LOS CURSOS DE TBODY
function limpiarHTML() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }

    totalCompra = 0;

}



//CONTENIDO DINAMICO

function articulosEnStock() {
    let productos = "";
    for (let i = 0; i < articulos.length; i++) {
        let articuloActual = articulos[i];
        productos += `


            <div class="card">
                <img src=${articuloActual.img} class="imagen-curso u-full-width">
                <div class="info-card">
                    <h4>${articuloActual.name}</h4>
                    <img src="img/estrellas.png">
                    <p class="precio">${articuloActual.precioAnteriror}<span class="u-pull-right ">${articuloActual.precioActual}</span></p>
                    <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${articuloActual.id}">
                      Agregar Al Carrito
                    </a>
                </div>
            </div>
        
        `;

    }

    document.querySelector('#lista-articulos').innerHTML = productos;
}
//Busqueda del los Articlos por nombre
function filtrarPorNombre() {
    let textIngresado = document.querySelector('#buscador').value;
    let productos = "";

    for (let i = 0; i < articulos.length; i++) {
        let articuloActual = articulos[i];
        if (encontrarSubCadenaEnTexto(articuloActual.name, textIngresado)) {
            productos += `
                <div class="card">
                    <img src=${articuloActual.img} class="imagen-curso u-full-width">
                    <div class="info-card">
                         <h4>${articuloActual.name}</h4>
                         <img src="img/estrellas.png">
                         <p class="precio">${articuloActual.precioAnteriror}<span class="u-pull-right ">${articuloActual.precioActual}</span></p>
                         <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${articuloActual.id}">
                         Agregar Al Carrito
                         </a>
                    </div>
                </div>
            `;
        } 
       

    }

    if(textIngresado === " " || textIngresado.length === 0) {
        articulosEnStock();
        
        document.querySelector('.barra').style.display = "block";

    }

    document.querySelector('#lista-articulos').innerHTML = productos;

}




// FUNCIONES

function buscarArticuloPorId(id) {
    let retorno = null;
    let i = 0;
    while (retorno == null && i < articulos.length) {
        articuloAcutual = articulos[i];
        if (articuloAcutual.id == id) {
            retorno = articuloAcutual;
        }

        i++;
    }

    return retorno;

}


function encontrarSubCadenaEnTexto(texto, subCadena) {
    let retorno = false;
    let j = 0;
    let i = 0;

    while (i < texto.length && j < subCadena.length) {

        if (texto[i] == subCadena[j]) {
            j++;

        } else {
            j = 0;
        }

        i++;
    }

    if (j == subCadena.length) {
        retorno = true;
    }

    return retorno;
}

function obtenerElPrecio(price) {
    let numero = "";
    let i = 1;
    while (i < price.length) {
        let caracterActual = price[i];
        if (caracterActual != '$') {
            numero += caracterActual;
        }
        i++;
    }
    let num = parseFloat(numero);

    return num;

}

