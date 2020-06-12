export default abstract class DetallesCovid {
    private cantConfirmados: number;
    private cantFallecidos: number;
    private cantRecuperados: number;
    private fechaActualizacion: Date;
    private nuevosCasos: number;
    private nuevasMuertes: number;

    constructor(cantConfirmados: number, cantFallecidos: number, cantRecuperados: number, fechaActualizacion: Date,
        nuevosCasos: number, nuevasMuertes: number){
            this.cantConfirmados = cantConfirmados;
            this.cantFallecidos = cantFallecidos;
            this.cantRecuperados = cantRecuperados;
            this.fechaActualizacion = fechaActualizacion;
            this.nuevosCasos = nuevosCasos;
            this.nuevasMuertes = nuevasMuertes;
    }

    public getCantConfirmados(): number{
        return this.cantConfirmados;
    }
    public getCantFallecidos(): number{
        return this.cantFallecidos;
    }
    public getCantRecuperados(): number{
        return this.cantRecuperados;
    }
    public getFechaActualizacion(): string{
        return this.fechaActualizacion.toTimeString();
    }
    public getNuevosCasos(): number{
        return this.nuevosCasos;
    }
    public getNuevasMuertes(): number{
        return this.nuevasMuertes;
    }
    /* public getPorcentajeRecuperados(){
        return Math.round(((this.cantRecuperados / this.cantConfirmados)*100) /100);
    }
    public getPorcentajeLetalidad(): number{
        return Math.round(((this.cantFallecidos / this.cantConfirmados)*100) /100);
    } */
}
