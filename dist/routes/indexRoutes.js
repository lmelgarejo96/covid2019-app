"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detalles_mundial_controller_1 = __importDefault(require("../controllers/detalles.mundial.controller"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getRouter() {
        return this.router;
    }
    routes() {
        this.router.get('/', detalles_mundial_controller_1.default.getGlobalData);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.getRouter();
//# sourceMappingURL=indexRoutes.js.map