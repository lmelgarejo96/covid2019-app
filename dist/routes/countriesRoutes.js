"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalles_paises_controller_1 = __importDefault(require("../controllers/detalles.paises.controller"));
class CountriesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getRouter() {
        return this.router;
    }
    routes() {
        this.router.get('/', detalles_paises_controller_1.default.getListadoPaises);
    }
}
const countriesRoutes = new CountriesRoutes();
exports.default = countriesRoutes.getRouter();
//# sourceMappingURL=countriesRoutes.js.map