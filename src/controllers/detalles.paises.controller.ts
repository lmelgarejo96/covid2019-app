import {Request, Response} from 'express';
import requestAPI from 'request';
import DetallesPais, { IDetallesPais } from '../models/DetallesPais';

import daoContinente from './continente.controller';
import daoPais from './paises.controller';

class daoDetallesPais {

    constructor(){}

    getListadoPaises(req: Request, res: Response) {
        try {
            requestAPI('https://api.covid19api.com/summary', (error, response, body: any) => {
                if (error || response.statusCode != 200) return res.render('error');
                const respuestaAPI = JSON.parse(body).Countries;
                const casosPais = respuestaAPI.map((caso: any)=>{
                    const casoPais = new DetallesPais(
                        caso.TotalConfirmed,
                        caso.TotalDeaths,
                        caso.TotalRecovered,
                        caso.Date,
                        caso.NewConfirmed,
                        caso.NewDeaths,
                        caso.CountryCode,
                        caso.NewRecovered
                    )
                    const pLetalidad = casoPais.getPorcentajeLetalidad();
                    const pRecuperacion =  casoPais.getPorcentajeRecuperados();
                    const datosPais = daoPais.getDaoPais().searchCountry(casoPais.getCodPais());
                    const obj = {...casoPais,pLetalidad, pRecuperacion, datosPais , lastUpdate: new Date(caso.Date).toLocaleString()};
                    return obj;
                });
                res.render('countries', {
                    all: casosPais,
                    cantidad: casosPais.length,
                    fecha: new Date().toDateString(),
                    year: new Date().getFullYear(),
                    continents: daoContinente.getDaoContinente().getMoreInfoContinent()
                });
            });

        } catch (error) { }
    }   
    getListadoPaisesPorRegion(req: Request, res: Response) {
        try {
            const region = req.params.nombre_continente;
            if(daoPais.getDaoPais().getContinentNames().indexOf(region) === -1){
                res.render('error', {
                    fecha: new Date().toDateString(),
                    continents: daoPais.getDaoPais().getContinentNames()
                });
                return; 
            } 
            requestAPI('https://api.covid19api.com/summary', (error, response, body: any) => {
                if (error || response.statusCode != 200) return res.render('error');
                const respuestaAPI = JSON.parse(body).Countries;
                const casosPais = respuestaAPI.map((caso: any)=>{
                    const casoPais = new DetallesPais(
                        caso.TotalConfirmed/* +caso.NewConfirmed */,
                        caso.TotalDeaths/* +caso.NewDeaths */,
                        caso.TotalRecovered/* +caso.NewRecovered */,
                        caso.Date,
                        caso.NewConfirmed,
                        caso.NewDeaths,
                        caso.CountryCode,
                        caso.NewRecovered
                    )
                    const pLetalidad = casoPais.getPorcentajeLetalidad();
                    const pRecuperacion =  casoPais.getPorcentajeRecuperados();
         
                    const datosPais = daoPais.getDaoPais().searchCountry(casoPais.getCodPais());
                    const obj = {...casoPais,pLetalidad, pRecuperacion, datosPais , lastUpdate: caso.Date};
                    return obj;
                });
                const respuesta = casosPais.filter((casoP: any) => {
                    if(casoP.datosPais.region === region) return casoP;
                })
                res.render('continent', {
                    all: respuesta,
                    cantidad: respuesta.length,
                    region,
                    fecha: new Date().toDateString(),
                    year: new Date().getFullYear(),
                    continents: daoContinente.getDaoContinente().getMoreInfoContinent()
                });
            });

        } catch (error) { }
    }
    renderCountrieByCod(req: Request, res: Response){
        const codPais = req.params.cod_pais;
        res.render('countrie', {
            codPais,
            year: new Date().getFullYear(),
            fecha: new Date().toDateString(),
            continents: daoContinente.getDaoContinente().getMoreInfoContinent()
        });
    }
    searchBusqueda(req: Request, res: Response){
            requestAPI('https://api.covid19api.com/summary', (error, response, body: any) => {
                if (error || response.statusCode != 200) return res.status(404).json({msg: 'error'});
                const respuestaAPI = JSON.parse(body).Countries;
                const casosPais = respuestaAPI.map((caso: any)=>{
                    const casoPais = new DetallesPais(
                        caso.TotalConfirmed/* +caso.NewConfirmed */,
                        caso.TotalDeaths/* +caso.NewDeaths */,
                        caso.TotalRecovered/* +caso.NewRecovered */,
                        caso.Date,
                        caso.NewConfirmed,
                        caso.NewDeaths,
                        caso.CountryCode,
                        caso.NewRecovered
                    )
                    const pLetalidad = casoPais.getPorcentajeLetalidad();
                    const pRecuperacion =  casoPais.getPorcentajeRecuperados();
                    const datosPais = daoPais.getDaoPais().searchCountry(casoPais.getCodPais());
                    const  obj = {...casoPais,pLetalidad, pRecuperacion, datosPais, lastUpdate: new Date(caso.Date).toLocaleString()};
                    return obj;
                });
                return res.status(200).json({paises: casosPais})
            });
    }
}

const daoDetalles = new daoDetallesPais();
export default daoDetalles;