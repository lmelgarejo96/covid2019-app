import { Router } from 'express';
import daoMundialController from '../controllers/detalles.mundial.controller';

class IndexRoutes {
    private router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    getRouter(){
        return this.router;
    }

    routes(){
        this.router.get('/', daoMundialController.getGlobalData);

    }
}

const indexRoutes = new IndexRoutes();

export default indexRoutes.getRouter();