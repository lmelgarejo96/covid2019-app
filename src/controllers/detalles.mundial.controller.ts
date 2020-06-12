import { Request, Response } from 'express';
import requestAPI from 'request';
import DetalleMundial from '../models/DetallesMundial';

class daoMundialController {
    constructor() {

    }
    getGlobalData(req: Request, res: Response) {
        try {
            requestAPI('https://thevirustracker.com/free-api?global=stats', (error, response, body: any) => {
                if (error || response.statusCode != 200) return res.render('error');
                const respuestaAPI = JSON.parse(body).results[0];
                const casoPais = new DetalleMundial(
                    respuestaAPI.total_cases,
                    respuestaAPI.total_deaths,
                    respuestaAPI.total_recovered,
                    new Date(),
                    respuestaAPI.total_new_cases_today,
                    respuestaAPI.total_new_deaths_today,
                    respuestaAPI.total_affected_countries
                )
                const pLetalidad = casoPais.getPorcentajeLetalidad();
                const pRecuperacion = casoPais.getPorcentajeRecuperados();
                const obj = { ...casoPais, pLetalidad, pRecuperacion, fecha: new Date().toDateString(), activos: (casoPais.getCantConfirmados()- (casoPais.getCantFallecidos() + casoPais.getCantRecuperados())) };

                return res.render('index', obj);
            });
        } catch (error) {
            return res.render('error');
        }

    }
}

const daoM = new daoMundialController();
export default daoM;