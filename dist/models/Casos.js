"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CasosCovid19 {
    constructor(confirmados, hospitalizados, fallecidos, recuperados, fecha) {
        this.confirmados = confirmados;
        this.hospitalizados = hospitalizados;
        this.fallecidos = fallecidos;
        this.recuperados = recuperados;
        this.fecha = fecha;
    }
    getCasosConfirmados() {
        return this.confirmados;
    }
    getHospitalizados() {
        return this.hospitalizados;
    }
    getFallecidos() {
        return this.fallecidos;
    }
    getRecuperados() {
        return this.recuperados;
    }
}
exports.default = CasosCovid19;
/* export interface IPais {
    confirmados: Number;
    hospitalizados: Number;
    fallecidos: Number;
    recuperados: Number;
} */ 
//# sourceMappingURL=Casos.js.map