let allPaises = [];
let allDatacountries = [];
let actualCountryCode = ''
let actualCountry = {}
const actualLocation = window.location.pathname.split('/');
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const mesesIngles = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


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
            if (actualLocation.length === 3 && actualLocation.indexOf('countries') > -1) {
                actualCountryCode = actualLocation[2];
                renderPieChart();
                pintarOpsMonths();
            }
        })
        .catch(err => {})
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
            document.getElementById('message-error').innerHTML = 'No se encontraron resultados';
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
        labels: ['% Actives', '% Recoveries', '% Lethality'],
        legend: {
            position: 'bottom'
        },
        tooltip: {
            enabled: true,
        },
        colors: ['#008ffb', '#28a745', '#aa0000'],
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
    console.log(obj);
    document.querySelector('#cant-confirmados').innerHTML = `${obj.cantConfirmados}`;
    document.querySelector('#cant-fallecidos').innerHTML = `${obj.cantFallecidos}`;
    document.querySelector('#cant-recuperados').innerHTML = `${obj.cantRecuperados }`;
    document.querySelector('#cant-activos').innerHTML = `${(obj.cantConfirmados)-(obj.cantFallecidos  + obj.cantRecuperados)}`;
    document.querySelector('#aumento-recuperados').innerHTML = `<small><strong>+ ${obj.nuevosRecuperados} last hours</strong></small>`;
    document.querySelector('#aumento-fallecidos').innerHTML = `<small><strong>+ ${obj.nuevasMuertes} last hours</strong></small>`;
    document.querySelector('#aumento-casos').innerHTML = `<small><strong>+ ${obj.nuevosCasos} last hours</strong></small>`;

    opts.series = [obj.cantConfirmados - (obj.cantRecuperados + obj.cantFallecidos), obj.cantRecuperados, obj.cantFallecidos]
    let chart = new ApexCharts(document.querySelector("#chart-countrie2"), opts);
    chart.render();
    obtainData();
}

search();
getInitialData();
updateLinkActive();



/* addEventListenerBtnChange() */