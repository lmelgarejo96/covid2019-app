"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalles_paises_controller_1 = __importDefault(require("../controllers/detalles.paises.controller"));
const continente_controller_1 = __importDefault(require("../controllers/continente.controller"));
class ContinentsRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getRouter() {
        return this.router;
    }
    routes() {
        this.router.get('/', continente_controller_1.default.getDaoContinente().setContinentPage);
        this.router.get('/:nombre_continente', detalles_paises_controller_1.default.getListadoPaisesPorRegion);
        this.router.get('/searched/paises', detalles_paises_controller_1.default.searchBusqueda);
    }
}
const countriesRoutes = new ContinentsRoutes();
exports.default = countriesRoutes.getRouter();
//# sourceMappingURL=continentsRoutes.js.map