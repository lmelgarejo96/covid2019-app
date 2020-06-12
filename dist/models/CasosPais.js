"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Casos_1 = __importDefault(require("./Casos"));
class CasosPais extends Casos_1.default {
    constructor(confirmados, hospitalizados, fallecidos, recuperados, fecha, codigoPais, nuevosRecuperados, nuevosFallecidos) {
        super(confirmados, hospitalizados, fallecidos, recuperados, fecha);
        this.codigoPais = codigoPais;
        this.nuevosRecuperados = nuevosRecuperados;
        this.nuevosFallecidos = nuevosFallecidos;
    }
    getCConfirmados() {
        return this.getCasosConfirmados();
    }
    getCantHospitalizados() {
        return this.getHospitalizados();
    }
    getCantFallecidos() {
        return this.getFallecidos();
    }
    getCantRecuperados() {
        return this.getRecuperados();
    }
    getNuevosFallecidos() {
        return this.nuevosFallecidos;
    }
    getNuevosRecuperados() {
        return this.nuevosRecuperados;
    }
    getCodigoPais() {
        return this.codigoPais;
    }
    getPorcentLetalidad() {
        return (this.getFallecidos() / this.getCasosConfirmados());
    }
    getPorcentPacientesRec() {
        return (this.getRecuperados() / this.getCasosConfirmados());
    }
}
exports.default = CasosPais;
//# sourceMappingURL=CasosPais.js.map