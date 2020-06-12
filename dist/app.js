"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
//Routes
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const countriesRoutes_1 = __importDefault(require("./routes/countriesRoutes"));
const continentsRoutes_1 = __importDefault(require("./routes/continentsRoutes"));
const paises_controller_1 = __importDefault(require("./controllers/paises.controller"));
const continente_controller_1 = __importDefault(require("./controllers/continente.controller"));
class App {
    constructor() {
        this.app = express_1.default();
        this.setConfig();
        this.setRoutes();
    }
    setConfig() {
        this.app.set('port', process.env.PORT || 3200);
        this.app.set('views', path_1.default.join(__dirname, 'views'));
        this.app.engine('.hbs', express_handlebars_1.default({
            defaultLayout: 'main',
            layoutsDir: path_1.default.join(this.app.get('views'), 'layouts'),
            partialsDir: path_1.default.join(this.app.get('views'), 'partials'),
            extname: '.hbs',
        }));
        this.app.set('view engine', '.hbs');
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
        this.app.use(morgan_1.default('dev'));
        paises_controller_1.default.getDaoPais().getInitialData();
        continente_controller_1.default.getDaoContinente().getNombresContinentes();
    }
    setRoutes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/countries', countriesRoutes_1.default);
        this.app.use('/continents', continentsRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const app = new App();
exports.default = app;
//# sourceMappingURL=app.js.map