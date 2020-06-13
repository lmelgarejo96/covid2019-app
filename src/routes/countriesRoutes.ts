import { Router } from 'express';
import detallePaisesController from '../controllers/detalles.paises.controller';

class CountriesRoutes {
    private router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    getRouter(){
        return this.router;
    }

    routes(){
        this.router.get('/', detallePaisesController.getListadoPaises);
        this.router.get('/:cod_pais', detallePaisesController.renderCountrieByCod);
    }
}

const countriesRoutes = new CountriesRoutes();

export default countriesRoutes.getRouter();