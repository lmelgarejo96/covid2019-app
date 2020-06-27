"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const DetallesPais_1 = __importDefault(require("../models/DetallesPais"));
const continente_controller_1 = __importDefault(require("./continente.controller"));
const paises_controller_1 = __importDefault(require("./paises.controller"));
class daoDetallesPais {
    constructor() { }
    getListadoPaises(req, res) {
        try {
            request_1.default('https://api.covid19api.com/summary', (error, response, body) => {
                if (error || response.statusCode != 200)
                    return res.render('error');
                const respuestaAPI = JSON.parse(body).Countries;
                const casosPais = respuestaAPI.map((caso) => {
                    const casoPais = new DetallesPais_1.default(caso.TotalConfirmed, caso.TotalDeaths, caso.TotalRecovered, caso.Date, caso.NewConfirmed, caso.NewDeaths, caso.CountryCode, caso.NewRecovered);
                    const pLetalidad = casoPais.getPorcentajeLetalidad();
                    const pRecuperacion = casoPais.getPorcentajeRecuperados();
                    const datosPais = paises_controller_1.default.getDaoPais().searchCountry(casoPais.getCodPais());
                    const obj = Object.assign(Object.assign({}, casoPais), { pLetalidad, pRecuperacion, datosPais, lastUpdate: new Date(caso.Date).toLocaleString() });
                    return obj;
                });
                res.render('countries', {
                    all: casosPais,
                    cantidad: casosPais.length,
                    fecha: new Date().toDateString(),
                    year: new Date().getFullYear(),
                    continents: continente_controller_1.default.getDaoContinente().getMoreInfoContinent()
                });
            });
        }
        catch (error) { }
    }
    getListadoPaisesPorRegion(req, res) {
        try {
            const region = req.params.nombre_continente;
            if (paises_controller_1.default.getDaoPais().getContinentNames().indexOf(region) === -1) {
                res.render('error', {
                    fecha: new Date().toDateString(),
                    continents: paises_controller_1.default.getDaoPais().getContinentNames()
                });
                return;
            }
            request_1.default('https://api.covid19api.com/summary', (error, response, body) => {
                if (error || response.statusCode != 200)
                    return res.render('error');
                const respuestaAPI = JSON.parse(body).Countries;
                const casosPais = respuestaAPI.map((caso) => {
                    const casoPais = new DetallesPais_1.default(caso.TotalConfirmed /* +caso.NewConfirmed */, caso.TotalDeaths /* +caso.NewDeaths */, caso.TotalRecovered /* +caso.NewRecovered */, caso.Date, caso.NewConfirmed, caso.NewDeaths, caso.CountryCode, caso.NewRecovered);
                    const pLetalidad = casoPais.getPorcentajeLetalidad();
                    const pRecuperacion = casoPais.getPorcentajeRecuperados();
                    const datosPais = paises_controller_1.default.getDaoPais().searchCountry(casoPais.getCodPais());
                    const obj = Object.assign(Object.assign({}, casoPais), { pLetalidad, pRecuperacion, datosPais, lastUpdate: caso.Date });
                    return obj;
                });
                const respuesta = casosPais.filter((casoP) => {
                    if (casoP.datosPais.region === region)
                        return casoP;
                });
                res.render('continent', {
                    all: respuesta,
                    cantidad: respuesta.length,
                    region,
                    fecha: new Date().toDateString(),
                    year: new Date().getFullYear(),
                    continents: continente_controller_1.default.getDaoContinente().getMoreInfoContinent()
                });
            });
        }
        catch (error) { }
    }
    renderCountrieByCod(req, res) {
        const codPais = req.params.cod_pais;
        res.render('countrie', {
            codPais,
            year: new Date().getFullYear(),
            fecha: new Date().toDateString(),
            continents: continente_controller_1.default.getDaoContinente().getMoreInfoContinent()
        });
    }
    searchBusqueda(req, res) {
        request_1.default('https://api.covid19api.com/summary', (error, response, body) => {
            if (error || response.statusCode != 200)
                return res.status(404).json({ msg: 'error' });
            const respuestaAPI = JSON.parse(body).Countries;
            console.log(respuestaAPI[0]);
            const casosPais = respuestaAPI.map((caso) => {
                const casoPais = new DetallesPais_1.default(caso.TotalConfirmed /* +caso.NewConfirmed */, caso.TotalDeaths /* +caso.NewDeaths */, caso.TotalRecovered /* +caso.NewRecovered */, caso.Date, caso.NewConfirmed, caso.NewDeaths, caso.CountryCode, caso.NewRecovered);
                const pLetalidad = casoPais.getPorcentajeLetalidad();
                const pRecuperacion = casoPais.getPorcentajeRecuperados();
                const datosPais = paises_controller_1.default.getDaoPais().searchCountry(casoPais.getCodPais());
                const obj = Object.assign(Object.assign({}, casoPais), { pLetalidad, pRecuperacion, datosPais, lastUpdate: new Date(caso.Date).toLocaleString() });
                return obj;
            });
            return res.status(200).json({ paises: casosPais });
        });
    }
}
const daoDetalles = new daoDetallesPais();
exports.default = daoDetalles;
//# sourceMappingURL=detalles.paises.controller.js.map