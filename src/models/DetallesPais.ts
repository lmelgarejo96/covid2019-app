import DetallesCovid from './DetallesCovid';

export default class DetallesPais extends DetallesCovid {
    private codPais: string;
    private nuevosRecuperados: number;

    constructor(cantConfirmados: number, cantFallecidos: number, cantRecuperados: number, fechaActualizacion: Date,
        nuevosCasos: number, nuevasMuertes: number, codPais: string, nuevosRecuperados: number){
        super(cantConfirmados, cantFallecidos, cantRecuperados, fechaActualizacion, nuevosCasos, nuevasMuertes);
        this.codPais = codPais;
        this.nuevosRecuperados = nuevosRecuperados;
    }

    public getCodPais(): string{
        return this.codPais;
    }
    public getNuevosRecuperados(): number{
        return this.nuevosRecuperados;
    }
    public getPorcentajeRecuperados(){
        return Math.round((((this.getCantRecuperados() / this.getCantConfirmados())*100)*100)/100);
    }
    public getPorcentajeLetalidad(): number{
        return Math.round((((this.getCantFallecidos() / this.getCantConfirmados())*100)*100)/100);
    }

}

export interface IDetallesPais {
    cantConfirmados: number,
    cantFallecidos: number,
    cantRecuperados: number,
    fechaActualizacion: Date,
    nuevosCasos: number,
    nuevasMuertes: number,
    codPais: string,
    nuevosRecuperados: number,
    getCodPais(): string,
    getNuevosRecuperados(): number,
}