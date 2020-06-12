let allPaises = []

function updateLinkActive() {
    const urlActual = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        link.parentNode.classList.remove('active')
        if (link.pathname === urlActual) {
            link.parentNode.classList.add('active');
        }
    })
}


function search() {
    const btn = document.getElementById('btn-send');
    if (btn != undefined && btn != null) {
        const input = document.getElementById('searched');
        input.addEventListener('keyup', () => {
            removeElements();
            if (input.value.length === 0) {
                returnPaisesDesdeContienentes('');
            } else if (input.value.length >= 3) {
                returnPaisesDesdeContienentes(input.value);
            }
        })
        btn.addEventListener('click', () => {
            removeElements();
            if (input.value.length === 0) {
                returnPaisesDesdeContienentes('');
            } else if (input.value.length >= 3) {
                returnPaisesDesdeContienentes(input.value);
            }
        })
    }
}

function removeElements() {
    const container = document.querySelector('#row-paises')
    const cards = document.querySelectorAll('#row-paises > .card-col-paises');
    cards.forEach((card) => {
        container.removeChild(card);
    });
}

function pintarElementos(data) {
    const cantConfirmados = data.cantConfirmados;
    const cantFallecidos = data.cantFallecidos;
    const cantRecuperados = data.cantRecuperados;
    const pRecuperacion = data.pRecuperacion;
    const pLetalidad = data.pLetalidad;
    const nombre = data.datosPais.nombre;
    const codigo = data.datosPais.codigo;
    const bandera = data.datosPais.bandera

    const html = `<div class="col-lg-4 col-md-4 col-sm-6 mb-3 mt-3 card-col-paises">
                <div class="card-main-container">
                    <div class="card-main">
                        <div class="description">
                        <h5>${nombre}</h5>
                        <div class="sub-content">
                            <li>Total Confirmados: <span>${cantConfirmados}</span></li>
                            <li>Total Fallecidos: <span>${cantFallecidos}</span></li>
                            <li>Total Recuperados: <span>${cantRecuperados}</span></li>
                            <li>% Recuperación: <span class="percent-green">${pRecuperacion}%</span></li>
                            <li>% Letalidad: <span class="percent-red">${pLetalidad}%</span></li>
                        </div>


                        <a class="btn-country" href="/countries/${codigo}">
                            <strong>
                                Ver más
                                <i class="fas fa-angle-right"></i>
                            </strong>
                        </a>
                        </div>
                            <img loading="lazy" draggable="false" class="img-fluid" src="${bandera}" alt />
                    </div>
                </div>
            </div>`;

    document.querySelector('#row-paises').innerHTML += html;
}

function getInitialData() {
    fetch('/continents/searched/paises', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {

            allPaises = data;
            /* pintarElementos(data); */
        })
        .catch(err => {})
}


function returnPaisesDesdeContienentes(search) {
    const location = window.location.pathname.split('/');
    if (location.length > 2) {
        const continente = location[location.length - 1];
        const paises = allPaises.paises;
        let contador = 0;
        for (let i = 0; i < paises.length; i++) {
            const nombre = paises[i].datosPais.nombre.toLowerCase();
            const searchLow = search.toLowerCase();
            if (paises[i].datosPais.region === continente && nombre.indexOf(searchLow) > -1) {
                pintarElementos(paises[i]);
                contador++;
            }
        }
        document.querySelector('#cantidad-countries').innerHTML = contador + ' countries';
    } else {
        const paises = allPaises.paises;
        let contador = 0;
        for (let i = 0; i < paises.length; i++) {
            const nombre = paises[i].datosPais.nombre.toLowerCase();
            const searchLow = search.toLowerCase();
            if (nombre.indexOf(searchLow) > -1) {
                pintarElementos(paises[i]);
                contador++;
            }
        }
        document.querySelector('#cantidad-countries').innerHTML = contador + ' countries';
    }
}


search();
getInitialData();
updateLinkActive();