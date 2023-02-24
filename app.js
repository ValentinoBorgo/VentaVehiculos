
const cartas = document.querySelector(".card-group");
const cartas00 = document.querySelector(".card-groupkm");
const disponiblesTitu = document.getElementById("disponibles");
const kmTitu = document.getElementById("kmTitu");

function mostrar0km() {
    fetch('vehiculos.jsonp.json')
        .then(response => response.json())
        .then(data => {
            let km0 = "";
            let con = 1;
            let km = data.filter(datKm => datKm.Km == "0");
            if (km != "") {
                km.forEach(data0Km => {
                    km0 += `<div class="enlaceVehi${con++}"><div class="card">
             <img class="card-img-top" src="${data0Km.imagen}" alt="Card image cap">
             <div class="card-body">
             <h5 class="card-title">${data0Km.marcaModelo}</h5>
             <p class="card-text">Precio : ${data0Km.precio}</p>
             <button class="btn btn-success" onClick="reserva(${data0Km.numVehiculo})" >Reservar ya</button>
             <button class="btn btn-primary" onClick="mostrarDetalles(${data0Km.numVehiculo})">Ver detalles</button>
             </div>
             </div>
           </div>`
                    localStorage.setItem("Lista Vehiculos", JSON.stringify(data))
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
        })
        .catch((error) => {
            console.log("Error de fetching", error);
        })
        .finally((info) => {
            console.log("Mostrar info", info)
        })
}


function mostrarVehiculos() {
    fetch('vehiculos.jsonp.json')
        .then(response => response.json())
        .then(data => {
            let html = "";
            let con = 1;
            data.forEach(info => {
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
                localStorage.setItem("Lista Vehiculos", JSON.stringify(data))
                cartas.innerHTML = html;
                cartas00.innerHTML = null;
                kmTitu.style.display = "none";
                if (disponiblesTitu.style.display = "none") {
                    disponiblesTitu.style.display = "block";
                }
            });
        })
        .catch((error) => {
            console.log("Error de fetching", error);
        })
        .finally((info) => {
            console.log("Mostrar info", info)
        })
};




let boton = document.getElementById("btn-eliminarReservas");
boton.addEventListener("click", eliminarReservas);


function eliminarReservas() {
    fetch('vehiculos.jsonp.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(datos => {
                let enlace = document.querySelector(".enlaceVehi" + datos.numVehiculo);
                if (enlace.style.display = "none") {
                    enlace.style.display = "block";
                    cont = 1;
                    sessionStorage.clear();
                    swal({
                        title: "Vehiculos Ya",
                        text: 'No se encuentra ningun vehiculo reservado.',
                        icon: "warning"
                    })
                }
            })
        });
    contador.innerHTML = "";
    reservasCarro.length = 0;
}

const contador = document.getElementById("contadorCarro")
const reservasCarro = [];
let cont = 1;


function reserva(posicion) {
    fetch('vehiculos.jsonp.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(datos => {
                if (datos.numVehiculo == (posicion)) {
                    sessionStorage.setItem("Reserva " + cont++, datos.marcaModelo);
                    reservasCarro.push(datos.marcaModelo);
                    let enlace = document.querySelector(".enlaceVehi" + datos.numVehiculo);
                    enlace.style.display = "none";
                    swal({
                        icon: 'success',
                        title: 'Vehiculo Reservado Exitosamente',
                    });
                }
            })
        })
    contador.innerHTML = cont;
}


const mostrarCarro = () => {
    let coche = [];
    fetch('vehiculos.jsonp.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(info => {
                for (let i = 0; i <= reservasCarro.length; i++) {
                    if (info.marcaModelo == reservasCarro[i]) {
                        coche += `Vehiculo : ${info.marcaModelo} Precio : USD ${info.precio}\n`;
                        swal({
                            title: "En Reserva",
                            text: coche
                        })
                    }
                }
            })
        })
}

function mostrarDetalles(posicion) {
    let contenido = "";
    let img;
    let texto;
    fetch('vehiculos.jsonp.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(vehiculo => {
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
        })
};

