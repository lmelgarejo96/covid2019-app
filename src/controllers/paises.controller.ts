import Pais, { IPais } from '../models/Pais';
import requestAPI from 'request';

export default class daoPais {
    
    private static daop: daoPais;
    private paises: IPais[] = [];

    constructor() {
        
    }
    //Singleton
    public static getDaoPais(): daoPais{
        if (!daoPais.daop) {
            daoPais.daop = new daoPais();
        }

        return daoPais.daop;
    }

    public getPaises(){
        return this.paises;
    }
    public getInitialData(){
        try {
            this.paises = [];
            requestAPI('https://restcountries.eu/rest/v2/all',  (error, response, body: any) => {
                if (error || response.statusCode != 200) return [];
                const respuestaAPI = JSON.parse(body);
                this.paises = respuestaAPI.map((item: any, index: number) => {
                        const pais = new Pais(
                            item.name,
                            item.alpha2Code,
                            item.region,
                            item.capital,
                            item.population,
                            item.flag,
                            
                        )
                        return pais;
                });
                this.getContinentNames();
            });
        } catch (error) {}
    }
    searchCountry(countryCode: string): Object {
        try {
            let country= {};
            for(let i = 0; i< this.paises.length; i++){
                if(this.paises[i].codigo === countryCode){
                    country = this.paises[i];
                    break;
                }
            }
            return country;
        } catch (error) {
            return {}
        }
    }
    public searchCountryByNameAndRegion(countryCode: string, namePais: string): Array<Object> {
        try {
            let countries= [];
            for(let i = 0; i< this.paises.length; i++){
                if(this.paises[i].codigo === countryCode && this.paises[i].nombre.indexOf(namePais)>-1){
                    countries.push(this.paises[i]);
                }
            }
            return countries;
        } catch (error) {
            return []
        }
    }
    public getContinentNames(){
        let arrayAux: Object[] = []
        this.getPaises().forEach((pais) => {
            if(arrayAux.indexOf(pais.region) === -1 && pais.region.length>0){
                arrayAux.push(pais.region);
            }
        });
        return arrayAux;
    }
}