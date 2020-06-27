let allPaises = [];
let allDatacountries = [];
let actualCountryCode = ''
let actualCountry = {}
let actualPage = 1;
const actualLocation = window.location.pathname.split('/');
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const mesesIngles = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


function updateLinkActive() {
    const urlActual = window.location.pathname;
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        link.parentNode.classList.remove('active')
        if (link.pathname.split('/')[1] === actualLocation[1]) {
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
            if (input.value.length > 2) {
                returnPaisesDesdeContienentes(input.value);
            } else {
                initPagination(actualPage);
            }
        })
        btn.addEventListener('click', () => {
            removeElements();
            if (input.value.length > 2) {
                returnPaisesDesdeContienentes(input.value);
            } else {
                initPagination(actualPage);
            }
        })
    }
}

function buildDataList() {
    const datalist = document.createElement('datalist');
    datalist.id = 'datalist-autocomplete';
    document.querySelector('#form-stats').appendChild(datalist);
}

function setItemsOnDataList(paises) {
    const datalist = document.querySelector('#datalist-autocomplete');
    datalist.innerHTML = '';
    paises.forEach((pais) => {
        let optEl = document.createElement('option');
        optEl.value = pais.datosPais.nombre;
        optEl.innerHTML = pais.datosPais.nombre;
        optEl.classList.add('opt-list-countries')
        datalist.appendChild(optEl);
    });
}

function compareAndRedirect(name) {
    for (let i = 0; i < allPaises.paises.length; i++) {
        const countryName = allPaises.paises[i].datosPais.nombre.toLowerCase()
        if (countryName === name.toLowerCase()) {
            const datalist = document.querySelector('#datalist-autocomplete');
            datalist.innerHTML = '';
            window.location = `/countries/${allPaises.paises[i].datosPais.codigo}`
        }
    }
}

function searchCountryOnStats(value) {
    let countriesFound = [];
    for (let i = 0; i < allPaises.paises.length; i++) {
        const countryName = allPaises.paises[i].datosPais.nombre.toLowerCase()
        if (countryName.indexOf(value) > -1) {
            countriesFound.push(allPaises.paises[i]);
        }
    }
    setItemsOnDataList(countriesFound);
}

function eventListenersOnStats() {
    const btn = document.getElementById('btn-send2');
    if (btn != undefined && btn != null) {
        buildDataList();
        const input = document.getElementById('searched2');
        input.setAttribute('list', 'datalist-autocomplete');
        input.addEventListener('keyup', () => {
            if (input.value.length > 1) {
                searchCountryOnStats(input.value.toLowerCase())
            } else {
                const datalist = document.querySelector('#datalist-autocomplete');
                datalist.innerHTML = '';
            }
        });
        btn.addEventListener('click', () => {
            compareAndRedirect(input.value);
        });
    }
    const datalist = document.querySelector('#datalist-autocomplete');
    datalist.innerHTML = '';
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

    const html = `<div class="col-lg-4 col-md-6 col-sm-12 mb-3 mt-3 card-col-paises fadeIn">
                <div class="card-main-container">
                    <div class="card-main">
                        <div class="description">
                        <h5>${nombre}</h5>
                        <div class="sub-content">
                            <li>Total Confirmed: <span>${cantConfirmados}</span></li>
                            <li>Total Deaths: <span>${cantFallecidos}</span></li>
                            <li>Total Recovered: <span>${cantRecuperados}</span></li>
                            <li>% Recovered: <span class="percent-green">${pRecuperacion}%</span></li>
                            <li>% Lethality: <span class="percent-red">${pLetalidad}%</span></li>
                            <li>Last update: <span>${data.lastUpdate}</span></li>
                        </div>


                        <a class="btn-country" href="/countries/${codigo}">
                            <strong>
                                View more
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

function pintarOpsMonths() {
    const select = document.querySelector('#select-month');
    const monthActual = new Date().getMonth()
    for (let i = 1; i <= monthActual + 1; i++) {
        select.innerHTML += `<option value="${mesesIngles[i].toLocaleLowerCase()}">${mesesIngles[i]}</option>`
    }
    select.value = mesesIngles[monthActual + 1].toLocaleLowerCase();
    select.addEventListener('change', () => {
        let value = select.value
        filterByMonth(2, value);
    });
}

function getInitialData() {
    fetch('/continents/searched/paises', {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            allPaises = data;
            initPagination(1);
            if (actualLocation.length === 3 && actualLocation.indexOf('countries') > -1) {
                actualCountryCode = actualLocation[2];
                renderPieChart();
                pintarOpsMonths();
            }
        })
        .catch(err => {})
}

function createPagination(cant) {
    const actualPath = window.location.pathname;
    const paginas = Math.round(cant / 12);
    const containerPag = document.querySelector('#pagination');
    containerPag.innerHTML = '';
    for (let i = 0; i < paginas; i++) {
        containerPag.innerHTML += `<button class="btn-pagination" onClick="initPagination(${i+1})">${i+1}</button>`
    }

}

function updatePagination(page) {
    const links = document.querySelectorAll('.btn-pagination');
    links.forEach((item, index) => {
        item.classList.remove('active-pagination');
        if ((index + 1) === page) {
            item.classList.add('active-pagination');
        }
    })
    actualPage = page;
}

function initPagination(pagina) {
    try {
        removeElements();
        const location = window.location.pathname.split('/');
        const continente = location[location.length - 1];
        const paises = allPaises.paises;
        let contador = 0;
        const pageElements = 12;
        const minEl = pageElements * (pagina - 1);
        const maxEl = minEl + pageElements;
        for (let i = 0; i < paises.length; i++) {
            if (continente != 'countries') {
                if (paises[i].datosPais.region === continente) {
                    if (contador >= minEl && contador < maxEl) {
                        pintarElementos(paises[i]);
                    }
                    contador++;
                }
            } else {
                if (contador >= minEl && contador < maxEl) {
                    pintarElementos(paises[i]);
                }
                contador++;
            }
        }
        document.querySelector('#cantidad-countries').innerHTML = contador + ' countries affected';
        createPagination(contador);
        updatePagination(pagina)
    } catch (error) {}
}

function returnPaisesDesdeContienentes(search) {
    try {
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
            document.querySelector('#cantidad-countries').innerHTML = contador + ' countries found';
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
            document.querySelector('#cantidad-countries').innerHTML = contador + ' countries found';
        }
    } catch (error) {}
}

function obtainData() {
    const countryCode = actualLocation[actualLocation.length - 1];
    fetch('https://api.thevirustracker.com/free-api?countryTimeline=' + countryCode, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('title-pais-details').innerHTML = data.countrytimelinedata[0].info.title;
            return data.timelineitems[0];
        })
        .then((countryCases) => {
            if (countryCases) {
                const fechActual = new Date();
                const anioActual = fechActual.getFullYear().toString();
                let fechas = [];
                let allDataCountry = [];

                for (let j = 0; j < 13; j++) { //mes
                    for (let i = 0; i < 32; i++) {
                        let day = i;
                        if (day < 10) day = '0' + day;
                        const fecha = `${j}/${day}/${anioActual.substring(2, 4)}`
                        const realCase = countryCases[fecha];
                        if (realCase != undefined) {
                            const mesName = mesesIngles[j];
                            const total = realCase.total_cases
                            const deaths = realCase.total_deaths
                            const recoveries = realCase.total_recoveries
                            const series = { total, deaths, recoveries, fecha, monthName: mesName }

                            fechas.push(fecha);
                            allDataCountry.push(series);
                        }
                    }
                }
                allDatacountries = allDataCountry;
                filterByMonth(1, mesesIngles[new Date().getMonth() + 1]);
            }
        })
        .catch(err => {
            document.getElementById('message-error').innerHTML = 'No results found';
        })
}

function filterByMonth(type, valueSearch) {
    let totalArr = [];
    let deathsArr = [];
    let recoveriesArr = [];
    let fechasArr = [];
    let monthSelected = valueSearch.toLowerCase();

    for (let i = 0; i < allDatacountries.length; i++) {
        if (monthSelected === 'all') {
            totalArr.push(allDatacountries[i].total);
            deathsArr.push(allDatacountries[i].deaths);
            recoveriesArr.push(allDatacountries[i].recoveries);
            fechasArr.push(allDatacountries[i].fecha)
        } else if (monthSelected === allDatacountries[i].monthName.toLowerCase()) {
            totalArr.push(allDatacountries[i].total);
            deathsArr.push(allDatacountries[i].deaths);
            recoveriesArr.push(allDatacountries[i].recoveries);
            fechasArr.push(allDatacountries[i].fecha)
        }
    }
    totalArr[totalArr.length - 1] = actualCountry.cantConfirmados;
    deathsArr[deathsArr.length - 1] = actualCountry.cantFallecidos;
    recoveriesArr[recoveriesArr.length - 1] = actualCountry.cantRecuperados;
    const data = {
        series: [
            { name: 'Total Cases', data: totalArr },
            { name: 'Total Deaths', data: deathsArr },
            /* { name: 'Total Recoveries', data: recoveriesArr }, */
        ],
        fechas: fechasArr
    }
    if (type === 1) {
        prepareChart(data)
    } else {
        updateChart(data)
    }
}

function prepareChart(dates) {
    let options = {
        series: dates.series,
        chart: {
            type: 'area',
            stacked: false,
            foreColor: '#eee',
            height: 350,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0,
        },
        colors: ['#008ffb', '#aa0000', '#28a745'],
        title: {
            text: 'Covid Cases Movement',
            align: 'left'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0,
                stops: [0, 90, 100]
            },
        },
        yaxis: {
            title: {
                text: 'Cases Covid'
            },
        },
        xaxis: {
            type: 'datetime',
            categories: dates.fechas
        },
        tooltip: {
            shared: false,
        }
    };
    renderChart(options);
}
let chartRender = null;

function renderChart(opts) {
    chartRender = new ApexCharts(document.querySelector("#chart-countrie"), opts);
    chartRender.render();
}

function updateChart(datos) {
    try {
        chartRender.updateSeries(datos.series)
        chartRender.updateOptions({
            xaxis: {
                categories: datos.fechas,
            }
        })
    } catch (error) {
        document.getElementById('message-error').innerHTML = 'No se encontraron resultados';
    }
}

function renderPieChart() {
    const opts = {
        series: [],
        chart: {
            type: 'donut',
            foreColor: '#eee',
        },
        labels: ['% Actives', '% Recovered', '% Deaths'],
        legend: {
            position: 'bottom'
        },
        tooltip: {
            enabled: true,
        },
        colors: ['#0075cf', '#00BB7A', '#ff4560'],
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    const code = actualCountryCode;
    const paises = allPaises.paises;
    let obj = {}
    for (let i = 0; i < paises.length; i++) {
        if (code === paises[i].codPais) {
            obj = paises[i];
            break;
        }
    }
    actualCountry = obj;
    document.querySelector('#cant-confirmados').innerHTML = `${obj.cantConfirmados}`;
    document.querySelector('#cant-fallecidos').innerHTML = `${obj.cantFallecidos}`;
    document.querySelector('#cant-recuperados').innerHTML = `${obj.cantRecuperados }`;
    document.querySelector('#cant-activos').innerHTML = `${(obj.cantConfirmados)-(obj.cantFallecidos  + obj.cantRecuperados)}`;
    document.querySelector('#aumento-recuperados').innerHTML = `<small><strong>+ ${obj.nuevosRecuperados} last hours</strong></small>`;
    document.querySelector('#aumento-fallecidos').innerHTML = `<small><strong>+ ${obj.nuevasMuertes} last hours</strong></small>`;
    document.querySelector('#aumento-casos').innerHTML = `<small><strong>+ ${obj.nuevosCasos} last hours</strong></small>`;
    document.querySelector('#img-flag').src = obj.datosPais.bandera;
    document.querySelector('#img-flag').classList.remove('d-none');
    document.querySelector('#date-update').innerHTML = obj.lastUpdate
    opts.series = [obj.cantConfirmados - (obj.cantRecuperados + obj.cantFallecidos), obj.cantRecuperados, obj.cantFallecidos]
    let chart = new ApexCharts(document.querySelector("#chart-countrie2"), opts);
    chart.render();
    obtainData();
    eventListenersOnStats();
}

search();
getInitialData();
updateLinkActive();