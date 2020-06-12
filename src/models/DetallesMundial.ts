import DetallesCovid from './DetallesCovid';

export default class DetallesMundial extends DetallesCovid {
    private paisesAfectados: number;

    constructor(cantConfirmados: number, cantFallecidos: number, cantRecuperados: number, fechaActualizacion: Date,
        nuevosCasos: number, nuevasMuertes: number, paisesAfectados: number){
        super(cantConfirmados, cantFallecidos, cantRecuperados, fechaActualizacion, nuevosCasos, nuevasMuertes);
        this.paisesAfectados = paisesAfectados;
    }

    public getCantPaisesAfectados(): number {
        return this.paisesAfectados;
    }
    public getPorcentajeRecuperados(){
        return Math.round((((this.getCantRecuperados() / this.getCantConfirmados())*100)*100)/100);
    }
    public getPorcentajeLetalidad(): number{
        return Math.round((((this.getCantFallecidos() / this.getCantConfirmados())*100)*100)/100);
    }
}

export interface IDetallesMundial {
    cantConfirmados: number,
    cantFallecidos: number,
    cantRecuperados: number,
    fechaActualizacion: Date,
    nuevosCasos: number,
    nuevasMuertes: number,
    paisesAfectados: number,
    getPorcentajeRecuperados(): number,
    getPorcentajeLetalidad(): number
}