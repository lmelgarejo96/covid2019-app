"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pais_1 = __importDefault(require("../models/Pais"));
const request_1 = __importDefault(require("request"));
class daoPais {
    constructor() {
        this.paises = [];
    }
    //Singleton
    static getDaoPais() {
        if (!daoPais.daop) {
            daoPais.daop = new daoPais();
        }
        return daoPais.daop;
    }
    getPaises() {
        return this.paises;
    }
    getInitialData() {
        try {
            this.paises = [];
            request_1.default('https://restcountries.eu/rest/v2/all', (error, response, body) => {
                if (error || response.statusCode != 200)
                    return [];
                const respuestaAPI = JSON.parse(body);
                this.paises = respuestaAPI.map((item, index) => {
                    const pais = new Pais_1.default(item.name, item.alpha2Code, item.region, item.capital, item.population, item.flag);
                    return pais;
                });
                this.getContinentNames();
            });
        }
        catch (error) { }
    }
    searchCountry(countryCode) {
        try {
            let country = {};
            for (let i = 0; i < this.paises.length; i++) {
                if (this.paises[i].codigo === countryCode) {
                    country = this.paises[i];
                    break;
                }
            }
            return country;
        }
        catch (error) {
            return {};
        }
    }
    searchCountryByNameAndRegion(countryCode, namePais) {
        try {
            let countries = [];
            for (let i = 0; i < this.paises.length; i++) {
                if (this.paises[i].codigo === countryCode && this.paises[i].nombre.indexOf(namePais) > -1) {
                    countries.push(this.paises[i]);
                }
            }
            return countries;
        }
        catch (error) {
            return [];
        }
    }
    getContinentNames() {
        let arrayAux = [];
        this.getPaises().forEach((pais) => {
            if (arrayAux.indexOf(pais.region) === -1 && pais.region.length > 0) {
                arrayAux.push(pais.region);
            }
        });
        return arrayAux;
    }
}
exports.default = daoPais;
//# sourceMappingURL=paises.controller.js.map