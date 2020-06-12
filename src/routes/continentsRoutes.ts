import { Router } from 'express';
import detallePaisesController from '../controllers/detalles.paises.controller';
import continenteController from '../controllers/continente.controller';

class ContinentsRoutes {
    private router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    getRouter(){
        return this.router;
    }

    routes(){
        this.router.get('/', continenteController.getDaoContinente().setContinentPage);
        this.router.get('/:nombre_continente', detallePaisesController.getListadoPaisesPorRegion);
        this.router.get('/searched/paises', detallePaisesController.searchBusqueda);
    }
}

const countriesRoutes = new ContinentsRoutes();

export default countriesRoutes.getRouter();