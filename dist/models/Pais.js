"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pais {
    constructor(nombre, codigo, region, capital, poblacion, bandera) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.region = region;
        this.capital = capital;
        this.poblacion = poblacion;
        this.bandera = bandera;
    }
    getNombre() {
        return this.nombre;
    }
    getCodigo() {
        return this.codigo;
    }
    getRegion() {
        return this.region;
    }
    getCapital() {
        return this.capital;
    }
    getPoblacion() {
        return this.poblacion;
    }
    getBandera() {
        return this.bandera;
    }
}
exports.default = Pais;
//# sourceMappingURL=Pais.js.map