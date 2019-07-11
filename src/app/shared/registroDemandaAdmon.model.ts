import { Proveedor } from './proveedor.model';
import { Determinante } from './determinante.model';

export class RegistroDemandaAdmon {

    constructor(
        public folioDemanda: string,
        public oficio: string,
        public expediente: string,
        public fechaNotificacion: Date,
        public autoridadImpositora: Proveedor,
        public fechaDemanda: Date,
        public tipoDemanda: number,
        public participaTercero: number,
        public motivoDemanda: string,
        public sociedad: string,
        public determinante: Determinante,
        public participaWalmart: number,
        public importeHistorico: number
    ) { }
}
