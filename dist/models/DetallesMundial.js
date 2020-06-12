"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DetallesCovid_1 = __importDefault(require("./DetallesCovid"));
class DetallesMundial extends DetallesCovid_1.default {
    constructor(cantConfirmados, cantFallecidos, cantRecuperados, fechaActualizacion, nuevosCasos, nuevasMuertes, paisesAfectados) {
        super(cantConfirmados, cantFallecidos, cantRecuperados, fechaActualizacion, nuevosCasos, nuevasMuertes);
        this.paisesAfectados = paisesAfectados;
    }
    getCantPaisesAfectados() {
        return this.paisesAfectados;
    }
    getPorcentajeRecuperados() {
        return Math.round((((this.getCantRecuperados() / this.getCantConfirmados()) * 100) * 100) / 100);
    }
    getPorcentajeLetalidad() {
        return Math.round((((this.getCantFallecidos() / this.getCantConfirmados()) * 100) * 100) / 100);
    }
}
exports.default = DetallesMundial;
//# sourceMappingURL=DetallesMundial.js.map