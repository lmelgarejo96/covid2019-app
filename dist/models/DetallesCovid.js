"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DetallesCovid {
    constructor(cantConfirmados, cantFallecidos, cantRecuperados, fechaActualizacion, nuevosCasos, nuevasMuertes) {
        this.cantConfirmados = cantConfirmados;
        this.cantFallecidos = cantFallecidos;
        this.cantRecuperados = cantRecuperados;
        this.fechaActualizacion = fechaActualizacion;
        this.nuevosCasos = nuevosCasos;
        this.nuevasMuertes = nuevasMuertes;
    }
    getCantConfirmados() {
        return this.cantConfirmados;
    }
    getCantFallecidos() {
        return this.cantFallecidos;
    }
    getCantRecuperados() {
        return this.cantRecuperados;
    }
    getFechaActualizacion() {
        return this.fechaActualizacion.toTimeString();
    }
    getNuevosCasos() {
        return this.nuevosCasos;
    }
    getNuevasMuertes() {
        return this.nuevasMuertes;
    }
}
exports.default = DetallesCovid;
//# sourceMappingURL=DetallesCovid.js.map