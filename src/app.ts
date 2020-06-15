import express, { Application, urlencoded, json, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import path from 'path';
import exphbs from 'express-handlebars';
//Routes
import indexRoutes from './routes/indexRoutes';
import countriesRoutes from './routes/countriesRoutes';
import continentsRoutes from './routes/continentsRoutes';
import daoPaises  from './controllers/paises.controller';
import daoContinente from './controllers/continente.controller';

class App {
    private app: Application;

    constructor () {
        this.app = express();
        this.setConfig();
        this.setRoutes();
    }

    setConfig(){
        this.app.set('port', process.env.PORT || 3200);
        this.app.set('views', path.join(__dirname, '../src/views'));
        this.app.engine('.hbs', exphbs({
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            extname: '.hbs',
        }));
        this.app.set('view engine', '.hbs');
        
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use(morgan('dev'));
        daoPaises.getDaoPais().getInitialData();
        daoContinente.getDaoContinente().getNombresContinentes();
    }
    setRoutes(){
        this.app.use('/', indexRoutes);
        this.app.use('/countries', countriesRoutes);
        this.app.use('/continents', continentsRoutes);
    }
    start(){
        this.app.listen(this.app.get('port'), ()=> {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const app = new App();

export default app;