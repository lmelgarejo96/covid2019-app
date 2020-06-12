"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CasosPais_1 = __importDefault(require("../models/CasosPais"));
const request_1 = __importDefault(require("request"));
const paises_controller_1 = __importDefault(require("./paises.controller"));
const daop = new paises_controller_1.default();
class daoCasosCovid {
    constructor() {
    }
    getGlobalData(req, res) {
        res.render('index');
    }
    getListadoPaises(req, res) {
        try {
            request_1.default('https://api.covid19api.com/summary', (error, response, body) => {
                if (error || response.statusCode != 200)
                    return res.render('error');
                const respuestaAPI = JSON.parse(body).Countries;
                const casosPais = respuestaAPI.map((caso) => {
                    const casoPais = new CasosPais_1.default(caso.TotalConfirmed, 0, caso.TotalDeaths, caso.TotalRecovered, caso.Date, caso.CountryCode, caso.NewDeaths, caso.NewRecovered);
                    const pletalidad = Math.round(casoPais.getPorcentLetalidad() * 100) / 100;
                    const pRecuperacion = Math.round(casoPais.getPorcentPacientesRec() * 100) / 100;
                    const datosPais = daop.searchCountry(casoPais.getCodigoPais());
                    const obj = Object.assign(Object.assign({}, casoPais), { pletalidad, pRecuperacion, datosPais });
                    return obj;
                });
                res.render('countries', {
                    all: casosPais,
                    fecha: new Date().toDateString(),
                    continents: daop.getContinentNames()
                });
            });
        }
        catch (error) { }
    }
}
const daoCCovid = new daoCasosCovid();
exports.default = daoCCovid;
//# sourceMappingURL=casos.controller.js.map