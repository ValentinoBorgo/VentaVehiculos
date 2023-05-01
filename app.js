// Variable global donde se guardan los datos del json.
let allData;

let spiner = document.getElementById('contenedor-carga');
let desabilitarNav = document.getElementById('nav-deshabilitar');

//Elimina todos los datos del sesion cada que recargue la web.
window.addEventListener('beforeunload', function () {
    sessionStorage.clear();
});

desabilitarNav.style.display = 'none';

setTimeout(() => {
    fetch('vehiculos.jsonp.json')
        .then(response => response.json())
        .then(data => allData = data);
    spiner.style.visibility = 'hidden';
    spiner.style.opacity = '0';
    desabilitarNav.style.display = 'block';
}, 2000)

////////////////////////////////////////////////////

const cartas = document.querySelector(".card-group");
const cartas00 = document.querySelector(".card-groupkm");
const disponiblesTitu = document.getElementById("disponibles");
const kmTitu = document.getElementById("kmTitu");


function mostrar0km() {
    let km0 = "";
    let con = 1;
    let km = allData.filter(datKm => datKm.Km == "0");
    if (km != "") {
        km.forEach(data0Km => {
            km0 += `<div class="enlaceVehi${data0Km.numVehiculo}"><div class="card">
             <img class="card-img-top" src="${data0Km.imagen}" alt="Card image cap">
             <div class="card-body">
             <h5 class="card-title">${data0Km.marcaModelo}</h5>
             <p class="card-text">Precio : ${data0Km.precio}</p>
             <button class="btn btn-success" onClick="reserva(${data0Km.numVehiculo})" >Reservar ya</button>
             <button class="btn btn-primary" onClick="mostrarDetalles(${data0Km.numVehiculo})">Ver detalles</button>
             </div>
             </div>
           </div>`
            localStorage.setItem("Lista Vehiculos", JSON.stringify(km))
            cartas00.innerHTML = km0;
            cartas.innerHTML = null;
            disponiblesTitu.style.display = "none";
            if (kmTitu.style.display = "none") {
                kmTitu.style.display = "block";
            }
        })
    } else {
        swal({
            title: "Vehiculos Ya",
            text: 'Por el momento no tenemos vehiculos 0Km.',
            icon: "error"
        })
    }
}

// este dato guarda los objetos por ahora....

function mostrarVehiculos() {
    let html = "";
    let con = 1;
    allData.forEach(info => {
        html += `<div class="enlaceVehi${con++}"><div class="card">
            <img class="card-img-top" src="${info.imagen}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${info.marcaModelo}</h5>
            <p class="card-text">Precio :  ${info.precio}</p>
            <button class="btn btn-success" onClick="reserva(${info.numVehiculo})" >Reservar ya</button>
            <button class="btn btn-primary" onClick="mostrarDetalles(${info.numVehiculo})">Ver detalles</button>
            </div>
            </div>
            </div>`
        localStorage.setItem("Lista Vehiculos", JSON.stringify(allData))
        cartas.innerHTML = html;
        cartas00.innerHTML = null;
        kmTitu.style.display = "none";
        if (disponiblesTitu.style.display = "none") {
            disponiblesTitu.style.display = "block";
        }
    });
};




let boton = document.getElementById("btn-eliminarReservas");
boton.addEventListener("click", eliminarReservas);


function eliminarReservas() {
    allData.forEach(datos => {
        let enlace = document.querySelector(".enlaceVehi" + datos.numVehiculo);
        if (enlace.style.display = "none") {
            enlace.style.display = "block";
            cont = 1;
            sessionStorage.clear();
            detalles.innerHTML = '';
            swal({
                title: "Vehiculos Ya",
                text: 'No se encuentra ningun vehiculo reservado.',
                icon: "warning"
            })
        }
    })
    contador.innerHTML = "";
    cont = 0;
    reservasCarro.length = 0;
};

const contador = document.getElementById("contadorCarro")
const reservasCarro = [];
// Variable global contadora(modal).
let cont = 0;
//
let contObtenerAEliminar;


function reserva(posicion) {
    allData.forEach(datos => {
        for (let i = 0; i < reservasCarro.length; i++) {
            if (reservasCarro[i] == datos.marcaModelo) {
                swal({
                    icon: 'error',
                    title: 'Vehiculo ya reservado',
                });
                return;
            }
        }
        if (datos.numVehiculo == (posicion)) {
            contador.innerHTML = cont = cont + 1;
            sessionStorage.setItem("Reserva 0-" + datos.numVehiculo, datos.marcaModelo);
            reservasCarro.push(datos.marcaModelo);
            let enlace = document.querySelector(".enlaceVehi" + posicion);
            enlace.style.display = "none";
            swal({
                icon: 'success',
                title: 'Vehiculo Reservado Exitosamente',
            });
            return;
        }
    })
};


let detalles = document.getElementById("descriptionVehiculo");

// Metodo para mostrar los carros reservados
let numParaEliminar;
const mostrarCarro = () => {
    let coche = [];
    allData.forEach(info => {
        for (let i = 0; i <= reservasCarro.length; i++) {
            if (info.marcaModelo == reservasCarro[i]) {
                numParaEliminar = info.numVehiculo;
                coche += `
                <div class="eliminar${info.numVehiculo}">
                Vehiculo : ${info.marcaModelo} 
                Precio : USD ${info.precio}
                <button class="btn btn-danger btn-sm" onClick="eliminarCarro(${info.numVehiculo})">Eliminar</button>
                </div><br>`;
                // let imgElement = document.getElementById("imgCoche");
                // imgElement.src = miImagen;
                detalles.innerHTML = coche;
            }
        }
    })
};


// Esta funcion elimina los coches del carrito de ventas
const eliminarCarro = (i) => {
    let divEliminar = document.querySelector('.eliminar' + i);
    divEliminar.remove();
    contador.innerHTML = cont = cont - 1;
    let contadorDeEntrada = 1;
    allData.forEach(dat => {
        for (let a = 0; a <= reservasCarro.length; a++) {
            if (contadorDeEntrada < 2) {
                if (i == dat.numVehiculo) {
                    contadorDeEntrada = contadorDeEntrada + 1;
                    const index = reservasCarro.indexOf(dat.marcaModelo);
                    reservasCarro.splice(index, 1);
                }
            } else {

            }
        }
        if (dat.numVehiculo == i) {
            let html = '';
            html += `<div class="enlaceVehi${dat.numVehiculo}"><div class="card">
            <img class="card-img-top" src="${dat.imagen}" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title">${dat.marcaModelo}</h5>
            <p class="card-text">Precio :  ${dat.precio}</p>
            <button class="btn btn-success" onClick="reserva(${dat.numVehiculo})" >Reservar ya</button>
            <button class="btn btn-primary" onClick="mostrarDetalles(${dat.numVehiculo})">Ver detalles</button>
            </div>
            </div>
            </div>`
            // cartas.innerHTML += html;    
            sessionStorage.removeItem("Reserva 0-" + i, dat.marcaModelo)
        }
        let enlace = document.querySelector(".enlaceVehi" + i);
        if (enlace.style.display = "none") {
            enlace.style.display = "block";
        } else if (kmTitu.style.display = "none") {
            kmTitu.style.display = "block";
        }
        localStorage.setItem("Lista Vehiculos", JSON.stringify(dat));
    })
}



// Funcion que entrega los detalles del vehiculo.
function mostrarDetalles(posicion) {
    let contenido = "";
    let img;
    let texto;
    allData.forEach(vehiculo => {
        if (vehiculo.numVehiculo == (posicion)) {
            img = vehiculo.imagen;
            contenido += `Detalles de ${vehiculo.marcaModelo} :`;
            texto = `Color : ${vehiculo.color}
            Kilometraje : ${vehiculo.Km}
            Precio : ${vehiculo.precio}
            Modelo : ${vehiculo.año}
            Combustible : ${vehiculo.combustible}`
        }
        swal({
            icon: img,
            title: contenido,
            text: texto
        })
    })
};

// Obtener el modal y el botón de cierre
let modal = document.getElementById("myModal");
let close = document.querySelector(".closeBtn");

// Mostrar el modal cuando se hace clic en el botón
document.getElementById("openBtn").onclick = function () {
    modal.style.display = "block";
    mostrarCarro();
}

// Ocultar el modal cuando se hace clic en el botón de cierre
close.addEventListener("click", () => {
    modal.style.display = "none";
})

// Ocultar el modal cuando se hace clic fuera de él
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


