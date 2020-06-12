export default class Pais {
    private nombre: string;
    private codigo: string;
    private region: string;
    private capital: string;
    private poblacion: number;
    private bandera: string;

    constructor(nombre: string, codigo: string, region: string, capital: string, poblacion: number, bandera: string){
        this.nombre = nombre;
        this.codigo = codigo;
        this.region = region;
        this.capital = capital; 
        this.poblacion = poblacion;
        this.bandera = bandera;
    }

    getNombre(): string{
        return this.nombre;
    }
    getCodigo(): string{
        return this.codigo;
    }
    getRegion(): string{
        return this.region;
    }
    getCapital(): string{
        return this.capital;
    }
    getPoblacion(): number{
        return this.poblacion;
    }
    getBandera(): string{
        return this.bandera;
    }
}

export interface IPais {
    nombre: string,
    codigo: string,
    region: string,
    capital: string,
    poblacion: number,
    bandera: string
}