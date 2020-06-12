import daoPais from './paises.controller';
import {Request, Response} from 'express';
import Continente from '../models/Continente'

export default class ContinenteController {
    private listContinentes: Array<string> = [];
    private static daoContinente: ContinenteController;

    constructor() {}
    // Singleton
    public static getDaoContinente(): ContinenteController {
        if (!ContinenteController.daoContinente) {
            ContinenteController.daoContinente = new ContinenteController();
        }

        return ContinenteController.daoContinente;
    }

    public getNombresContinentes(){
        let arrayAux: string[] = []
        daoPais.getDaoPais().getPaises().forEach((pais) => {
            if(arrayAux.indexOf(pais.region) === -1 && pais.region.length>0){
                arrayAux.push(pais.region);
            }
        });
        this.listContinentes = arrayAux;
        return this.listContinentes;
    }

    public getMoreInfoContinent(){
        const dataPaises: Continente [] = []
        this.getNombresContinentes().forEach((item) => {
            let counter = 0;
            daoPais.getDaoPais().getPaises().forEach((oel) => {
                if(oel.region === item){
                    counter++;
                }
            });
            const continente = new Continente(item, counter);
            dataPaises.push(continente);
        })
        return {dataPaises, cantidad: dataPaises.length};
    }

    public setContinentPage(req: Request, res: Response){
        res.render('continents', {
            continents: ContinenteController.getDaoContinente().getMoreInfoContinent(),
            fecha: new Date().toDateString(),
        });
    }
}
