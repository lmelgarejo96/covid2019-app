"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const paises_controller_1 = __importDefault(require("./paises.controller"));
const Continente_1 = __importDefault(require("../models/Continente"));
class ContinenteController {
    constructor() {
        this.listContinentes = [];
    }
    // Singleton
    static getDaoContinente() {
        if (!ContinenteController.daoContinente) {
            ContinenteController.daoContinente = new ContinenteController();
        }
        return ContinenteController.daoContinente;
    }
    getNombresContinentes() {
        let arrayAux = [];
        paises_controller_1.default.getDaoPais().getPaises().forEach((pais) => {
            if (arrayAux.indexOf(pais.region) === -1 && pais.region.length > 0) {
                arrayAux.push(pais.region);
            }
        });
        this.listContinentes = arrayAux;
        return this.listContinentes;
    }
    getMoreInfoContinent() {
        const dataPaises = [];
        this.getNombresContinentes().forEach((item) => {
            let counter = 0;
            paises_controller_1.default.getDaoPais().getPaises().forEach((oel) => {
                if (oel.region === item) {
                    counter++;
                }
            });
            const continente = new Continente_1.default(item, counter);
            dataPaises.push(continente);
        });
        return { dataPaises, cantidad: dataPaises.length };
    }
    setContinentPage(req, res) {
        res.render('continents', {
            year: new Date().getFullYear(),
            continents: ContinenteController.getDaoContinente().getMoreInfoContinent(),
        });
    }
}
exports.default = ContinenteController;
//# sourceMappingURL=continente.controller.js.map