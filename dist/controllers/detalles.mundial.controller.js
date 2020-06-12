"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const DetallesMundial_1 = __importDefault(require("../models/DetallesMundial"));
class daoMundialController {
    constructor() {
    }
    getGlobalData(req, res) {
        try {
            request_1.default('https://thevirustracker.com/free-api?global=stats', (error, response, body) => {
                if (error || response.statusCode != 200)
                    return res.render('error');
                const respuestaAPI = JSON.parse(body).results[0];
                const casoPais = new DetallesMundial_1.default(respuestaAPI.total_cases, respuestaAPI.total_deaths, respuestaAPI.total_recovered, new Date(), respuestaAPI.total_new_cases_today, respuestaAPI.total_new_deaths_today, respuestaAPI.total_affected_countries);
                const pLetalidad = casoPais.getPorcentajeLetalidad();
                const pRecuperacion = casoPais.getPorcentajeRecuperados();
                const obj = Object.assign(Object.assign({}, casoPais), { pLetalidad, pRecuperacion, fecha: new Date().toDateString(), activos: (casoPais.getCantConfirmados() - (casoPais.getCantFallecidos() + casoPais.getCantRecuperados())) });
                return res.render('index', obj);
            });
        }
        catch (error) {
            return res.render('error');
        }
    }
}
const daoM = new daoMundialController();
exports.default = daoM;
//# sourceMappingURL=detalles.mundial.controller.js.map